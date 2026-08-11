/**
 * Convierte una imagen (el isotipo del panda) en una nube de anclas.
 *
 * POR QUÉ RASTERIZAR EN VEZ DE PARSEAR LOS PATHS:
 * el isotipo son dos <path> con curvas bézier y una regla de relleno; sacar
 * puntos INTERIORES de eso a mano implica implementar point-in-path con
 * winding. El browser ya sabe hacerlo — dibujarlo en un canvas y leer píxeles
 * resuelve el problema exacto en 20 líneas, y encima nos da gratis la
 * separación por color, que es lo que hace legible al panda (ver más abajo).
 *
 * POR QUÉ IMPORTA EL COLOR Y NO SÓLO EL ALPHA:
 * el isotipo tiene dos capas tonales: `.cls-1` (#f3f2f4, el cuerpo claro) y
 * `.cls-2` (#2e2d3b, contornos + orejas + ojos + hocico). Si muestreáramos sólo
 * "alpha > 0" tendríamos una mancha con forma de panda pero SIN cara: ojos y
 * orejas son justamente lo que hace que el cerebro lea "panda" y no "borrón".
 * Por eso cada punto se etiqueta con `ink` (0 = cuerpo, 1 = rasgo oscuro) y el
 * shader lo usa para darle a los rasgos más peso y opacidad.
 *
 * Todo esto corre UNA vez al montar. El resultado es un Float32Array que se
 * queda cacheado; el loop nunca vuelve a tocar un canvas 2D.
 */

/** Umbral de alpha para considerar que un píxel es parte de la figura. */
const ALPHA_THRESHOLD = 128;

/**
 * Por debajo de esta luminancia (0→1) el píxel se considera rasgo oscuro.
 * El SVG usa #2e2d3b (lum ≈ 0.18) y #f3f2f4 (lum ≈ 0.95), así que 0.5 separa
 * limpio. Es un umbral con muchísimo margen: no hace falta afinarlo salvo que
 * cambien los colores del isotipo.
 */
const INK_LUMINANCE_THRESHOLD = 0.5;

export interface SampledShape {
  /** xy intercalado, normalizado a [-1, 1] con el centro de masa en el origen. */
  points: Float32Array;
  /** 1 por punto: 0 = cuerpo claro, 1 = rasgo oscuro (ojos, orejas, contorno). */
  ink: Float32Array;
  count: number;
}

/**
 * PRNG local. El sampler necesita azar propio y determinístico: si la nube de
 * puntos del panda cambiara entre cargas, la figura "temblaría" de una visita a
 * la otra. Duplicamos mulberry32 acá en vez de importarlo del campo para que
 * este módulo siga siendo independiente (se puede usar con cualquier figura).
 */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Carga la imagen. Falla suave: quien llama decide qué hacer sin la figura. */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    // El SVG es same-origin (/public), pero pedir CORS explícito evita que el
    // canvas quede "tainted" si algún día se sirve desde un CDN — getImageData
    // sobre un canvas tainted tira SecurityError y la figura se perdería sin
    // aviso claro.
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`No se pudo cargar ${src}`));
    img.src = src;
  });
}

export interface SampleOptions {
  src: string;
  /** Lado del canvas de muestreo. Ver comentario en el default del caller. */
  resolution: number;
  /** Cuántos puntos devolver. Normalmente = cantidad de partículas. */
  count: number;
  seed: number;
  /**
   * Fracción de `count` reservada a los rasgos oscuros.
   * Los rasgos ocupan MUCHA menos área que el cuerpo, así que un muestreo
   * uniforme por área les daría cuatro partículas y la cara desaparecería.
   * Sobre-representarlos es lo que hace que el panda se lea como panda.
   */
  inkShare: number;
}

/**
 * Muestrea la figura por rejection sampling.
 *
 * Se tiran puntos al azar dentro del bounding box y se quedan sólo los que caen
 * sobre píxel opaco. Es O(intentos) y no O(área), y comparado con recorrer todos
 * los píxeles y elegir un subconjunto tiene la ventaja de que la distribución
 * queda naturalmente uniforme dentro de la silueta, sin patrones de grilla —
 * que a esta cantidad de puntos se ven como muaré.
 */
export async function sampleShapeFromSvg(opts: SampleOptions): Promise<SampledShape> {
  const { src, resolution, count, seed, inkShare } = opts;

  const img = await loadImage(src);

  const canvas = document.createElement('canvas');
  canvas.width = resolution;
  canvas.height = resolution;
  // willReadFrequently: vamos a hacer un solo getImageData grande, pero el flag
  // le dice al browser que no suba la superficie a GPU para después bajarla.
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('Sin contexto 2D para muestrear la figura');

  // El isotipo es 1080x1034 (casi cuadrado). Lo dibujamos con "contain" dentro
  // del cuadrado de muestreo para no deformarlo: un panda estirado se lee peor
  // que uno chico.
  const scale = Math.min(resolution / img.width, resolution / img.height);
  const drawW = img.width * scale;
  const drawH = img.height * scale;
  ctx.drawImage(img, (resolution - drawW) / 2, (resolution - drawH) / 2, drawW, drawH);

  const data = ctx.getImageData(0, 0, resolution, resolution).data;

  // Primera pasada: clasificar píxeles y medir el bounding box real de la tinta.
  // Necesitamos el bbox para normalizar: el viewBox del SVG tiene aire alrededor
  // de la figura y, si normalizáramos contra el canvas entero, el panda quedaría
  // más chico de lo pedido y descentrado.
  let minX = resolution;
  let minY = resolution;
  let maxX = 0;
  let maxY = 0;
  let bodyPixels = 0;
  let inkPixels = 0;

  // Máscara compacta: 0 = vacío, 1 = cuerpo, 2 = rasgo oscuro. Un Uint8Array de
  // resolution² es despreciable (40KB a 200px) y evita releer `data` (4 bytes
  // por píxel) en cada intento del rejection sampling.
  const mask = new Uint8Array(resolution * resolution);

  for (let y = 0; y < resolution; y++) {
    for (let x = 0; x < resolution; x++) {
      const idx = (y * resolution + x) * 4;
      if (data[idx + 3] < ALPHA_THRESHOLD) continue;

      // Luminancia perceptual (Rec. 601). Alcanza y sobra para separar dos
      // colores tan distantes como #2e2d3b y #f3f2f4.
      const lum = (0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2]) / 255;
      const isInk = lum < INK_LUMINANCE_THRESHOLD;

      mask[y * resolution + x] = isInk ? 2 : 1;
      if (isInk) inkPixels++;
      else bodyPixels++;

      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }

  if (bodyPixels + inkPixels === 0) {
    throw new Error('La figura muestreada salió vacía');
  }

  const bboxW = Math.max(maxX - minX, 1);
  const bboxH = Math.max(maxY - minY, 1);
  // Escala única para X e Y: preservar aspect ratio. El lado mayor manda, así
  // la figura entra completa en [-1, 1].
  const norm = 2 / Math.max(bboxW, bboxH);
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;

  const points = new Float32Array(count * 2);
  const ink = new Float32Array(count);
  const rand = mulberry32(seed);

  // Cuántos puntos van a rasgos oscuros. Se capa contra la disponibilidad real:
  // si la figura tuviera poca tinta oscura, forzar la cuota amontonaría todo en
  // los ojos y perderíamos el cuerpo.
  const inkTarget = inkPixels > 0 ? Math.floor(count * inkShare) : 0;

  let filled = 0;
  let inkFilled = 0;
  // Techo de intentos: si algo salió mal (imagen vacía, umbral imposible) el
  // rejection sampling sería un while(true). Con 200 intentos por punto
  // cualquier figura razonable termina; el resto se rellena abajo.
  const maxAttempts = count * 200;
  let attempts = 0;

  while (filled < count && attempts < maxAttempts) {
    attempts++;

    const px = Math.floor(minX + rand() * bboxW);
    const py = Math.floor(minY + rand() * bboxH);
    const m = mask[py * resolution + px];
    if (m === 0) continue;

    const isInk = m === 2;
    // Cuotas: primero llenamos la cuota de tinta oscura y el resto de cuerpo.
    // Rechazar por cuota (en vez de muestrear cada capa por separado) mantiene
    // una sola pasada y una sola fuente de azar.
    if (isInk) {
      if (inkFilled >= inkTarget) continue;
      inkFilled++;
    } else if (filled - inkFilled >= count - inkTarget) {
      continue;
    }

    // A coordenadas de figura: X hacia la derecha, Y hacia ARRIBA (el canvas 2D
    // crece hacia abajo, el mundo de three hacia arriba — invertir acá evita que
    // el panda salga cabeza abajo).
    points[filled * 2] = (px - cx) * norm;
    points[filled * 2 + 1] = -(py - cy) * norm;
    ink[filled] = isInk ? 1 : 0;
    filled++;
  }

  // Relleno de emergencia: si las cuotas dejaron huecos (figura degenerada),
  // completamos con cualquier píxel válido. Peor una figura imperfecta que un
  // Float32Array con ceros, que dibujaría una mancha densa en el origen.
  while (filled < count && attempts < maxAttempts * 2) {
    attempts++;
    const px = Math.floor(minX + rand() * bboxW);
    const py = Math.floor(minY + rand() * bboxH);
    const m = mask[py * resolution + px];
    if (m === 0) continue;
    points[filled * 2] = (px - cx) * norm;
    points[filled * 2 + 1] = -(py - cy) * norm;
    ink[filled] = m === 2 ? 1 : 0;
    filled++;
  }

  return { points, ink, count: filled };
}
