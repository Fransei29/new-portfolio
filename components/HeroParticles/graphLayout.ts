/**
 * Genera el SEGUNDO estado de la figura: un grafo de nodos conectados.
 *
 * QUÉ TIENE QUE COMUNICAR:
 * el pitch es "convierto tu operación en un sistema". La primera forma (el
 * panda) es la marca; ésta es la promesa. Para que se LEA como sistema y no como
 * puntos sueltos, la mayoría de las partículas no van en los nodos sino
 * distribuidas SOBRE LAS ARISTAS: lo que hace legible un diagrama son las
 * líneas, no los círculos. Un grafo dibujado sólo con nodos es indistinguible
 * del campo de ruido que esto viene a reemplazar.
 *
 * POR QUÉ PROCEDURAL Y NO UN SVG:
 * el grafo tiene que adaptarse a la cantidad de partículas y al aspect ratio del
 * hero. Generarlo con una topología explícita (capas tipo pipeline) además da
 * control sobre la LECTURA: entrada → proceso → salida, izquierda a derecha, que
 * es exactamente cómo se lee un diagrama de sistema.
 *
 * Salida en el mismo formato que shapeSampler: xy normalizado en [-1, 1] con el
 * centro en el origen, para que interpolar entre ambos estados sea un lerp.
 */

export interface GraphShape {
  /** xy intercalado, normalizado a [-1, 1]. */
  points: Float32Array;
  /** 1 por punto: 1 = es un nodo (más brillante), 0 = está en una arista. */
  ink: Float32Array;
  count: number;
}

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

export interface GraphOptions {
  count: number;
  seed: number;
  /**
   * Cantidad de nodos por columna, de izquierda a derecha.
   * Esta topología es el diagrama: una entrada, un fan-out a procesos, una
   * capa de trabajo ancha, y una convergencia a la salida. Se lee como un
   * pipeline porque LO ES.
   */
  layers: readonly number[];
  /** Fracción de partículas que se quedan formando los nodos (el resto va a aristas). */
  nodeShare: number;
  /**
   * Radio del cúmulo que forma cada nodo, en unidades normalizadas.
   * Es lo que hace que un nodo se lea como "cosa" y no como un punto más de la
   * línea. Muy chico y desaparece; muy grande y las aristas nacen difusas.
   */
  nodeRadius: number;
  /** Desorden posicional de los nodos. Cero se ve como planilla de cálculo. */
  jitter: number;
  /** Grosor del reguero de partículas sobre cada arista. */
  edgeSpread: number;
}

/**
 * Construye el grafo y distribuye las partículas.
 *
 * Las aristas son SIEMPRE entre capas consecutivas: un grafo con conexiones
 * arbitrarias se ve como una madeja, y una madeja no comunica "sistema
 * ordenado" sino "quilombo". La dirección izquierda→derecha es la que hace que
 * el ojo recorra el diagrama en vez de mirarlo como textura.
 */
export function buildGraphShape(opts: GraphOptions): GraphShape {
  const { count, seed, layers, nodeShare, nodeRadius, jitter, edgeSpread } = opts;
  const rand = mulberry32(seed);

  // --- 1. Posicionar los nodos ---
  const totalNodes = layers.reduce((a, b) => a + b, 0);
  const nodeX = new Float32Array(totalNodes);
  const nodeY = new Float32Array(totalNodes);
  // Índice del primer nodo de cada capa: evita recalcular offsets al armar aristas.
  const layerStart: number[] = [];

  let n = 0;
  for (let l = 0; l < layers.length; l++) {
    layerStart.push(n);
    const inLayer = layers[l];
    // Las capas se reparten el ancho completo [-1, 1]. Con una sola capa iría al
    // centro, pero eso no pasa con las topologías que usamos.
    const x = layers.length === 1 ? 0 : (l / (layers.length - 1)) * 2 - 1;

    for (let k = 0; k < inLayer; k++) {
      // Los nodos se reparten el alto de su capa dejando margen arriba y abajo:
      // el factor 0.82 impide que los de los extremos toquen el borde del
      // volumen, donde quedarían cortados por el viewport.
      const y = inLayer === 1 ? 0 : ((k / (inLayer - 1)) * 2 - 1) * 0.82;

      nodeX[n] = x + (rand() * 2 - 1) * jitter;
      nodeY[n] = y + (rand() * 2 - 1) * jitter;
      n++;
    }
  }

  // --- 2. Armar la lista de aristas ---
  // Cada nodo se conecta a un subconjunto de la capa siguiente. No a todos: un
  // grafo completo entre capas satura y vuelve a ser textura. Dos o tres
  // conexiones por nodo es lo que se lee como diagrama.
  const edgeA: number[] = [];
  const edgeB: number[] = [];

  for (let l = 0; l < layers.length - 1; l++) {
    const aStart = layerStart[l];
    const bStart = layerStart[l + 1];
    const aCount = layers[l];
    const bCount = layers[l + 1];

    for (let i = 0; i < aCount; i++) {
      // El nodo "espejo" en la capa siguiente: conectar por posición relativa
      // (y no al azar) mantiene las aristas cortas y aproximadamente paralelas,
      // que es lo que evita la madeja.
      const mirror = Math.floor((i / Math.max(aCount - 1, 1)) * (bCount - 1));
      const fan = 1 + Math.floor(rand() * 2); // 1 o 2 destinos, más el espejo

      edgeA.push(aStart + i);
      edgeB.push(bStart + mirror);

      for (let f = 0; f < fan; f++) {
        // Vecinos del espejo, no destinos arbitrarios: la conexión sigue siendo
        // local y el diagrama conserva su dirección.
        const off = rand() < 0.5 ? -1 : 1;
        const target = mirror + off * (1 + Math.floor(rand() * 2));
        if (target >= 0 && target < bCount) {
          edgeA.push(aStart + i);
          edgeB.push(bStart + target);
        }
      }
    }
  }

  const edgeCount = edgeA.length;

  // --- 3. Repartir las partículas ---
  const points = new Float32Array(count * 2);
  const ink = new Float32Array(count);

  const nodeParticles = Math.min(Math.floor(count * nodeShare), count);
  const edgeParticles = count - nodeParticles;

  // Nodos: cúmulo gaussiano-ish alrededor del centro. Usamos sqrt(rand) sobre el
  // radio para que la densidad sea uniforme por área — sin eso los puntos se
  // amontonan en el centro y el nodo se ve como un pinchazo en vez de un disco.
  for (let i = 0; i < nodeParticles; i++) {
    const node = i % totalNodes;
    const angle = rand() * Math.PI * 2;
    const r = Math.sqrt(rand()) * nodeRadius;

    points[i * 2] = nodeX[node] + Math.cos(angle) * r;
    points[i * 2 + 1] = nodeY[node] + Math.sin(angle) * r;
    ink[i] = 1; // los nodos son el "rasgo" de esta figura, igual que los ojos del panda
  }

  // Aristas: se recorre t ∈ [0,1] entre los dos extremos. Repartir por índice
  // (y no al azar) garantiza que TODAS las aristas reciban partículas: con
  // muestreo aleatorio, a esta cantidad, algunas aristas quedarían casi vacías
  // y el diagrama se vería roto.
  for (let i = 0; i < edgeParticles; i++) {
    const p = nodeParticles + i;

    if (edgeCount === 0) {
      // Sin aristas (topología de una sola capa) el resto va a los nodos.
      const node = i % totalNodes;
      points[p * 2] = nodeX[node];
      points[p * 2 + 1] = nodeY[node];
      ink[p] = 1;
      continue;
    }

    const e = i % edgeCount;
    const t = rand();
    const ax = nodeX[edgeA[e]];
    const ay = nodeY[edgeA[e]];
    const bx = nodeX[edgeB[e]];
    const by = nodeY[edgeB[e]];

    // Perpendicular normalizada, para dispersar a los costados de la línea sin
    // que el grosor dependa del largo de la arista.
    const dx = bx - ax;
    const dy = by - ay;
    const len = Math.hypot(dx, dy) || 1;
    const px = -dy / len;
    const py = dx / len;
    const off = (rand() * 2 - 1) * edgeSpread;

    points[p * 2] = ax + dx * t + px * off;
    points[p * 2 + 1] = ay + dy * t + py * off;
    ink[p] = 0;
  }

  return { points, ink, count };
}
