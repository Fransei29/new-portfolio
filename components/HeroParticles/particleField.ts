/**
 * Capa de POSICIONES del campo de partículas — matemática pura, sin three y sin DOM.
 *
 * FASE 2 (implementada): las partículas ya no viven en un volumen al azar. Cada
 * una tiene DOS anclas — una en el isotipo del panda y otra en el grafo de
 * nodos — y el campo interpola entre ambas según el progress del scroll. La
 * apuesta de diseño del archivo original se cumplió tal cual: formar una figura
 * terminó siendo "escribir otras anclas", no reescribir la simulación. El
 * resorte que ya existía hace la transición sin cambios.
 *
 * Contrato con el resto del sistema:
 *   - el campo es dueño de un solo Float32Array de posiciones y lo MUTA in place;
 *   - `update()` no aloca nada (se llama a 60fps);
 *   - el renderer lee ese mismo buffer y sólo marca needsUpdate.
 */

/** Estado externo que empuja al campo. Lo arma el loop, no el campo. */
export interface FieldInput {
  /** 0→1: avance del scroll sobre el hero. Gobierna deriva y disipación. */
  progress: number;
  /** Mouse en coordenadas de mundo (mismo espacio que las partículas). */
  pointerX: number;
  pointerY: number;
  /** Si el puntero no está sobre el hero no hay push, pero sí retorno. */
  pointerActive: boolean;
  /** Segundos desde el frame anterior, ya clampeado por el loop. */
  dt: number;
  /** Segundos acumulados. Alimenta la deriva ambiente. */
  elapsed: number;
}

export interface ParticleFieldOptions {
  count: number;
  /** Semi-ancho y semi-alto del volumen, en unidades de mundo. */
  spreadX: number;
  spreadY: number;
  /** Profundidad: da parallax real vía atenuación de tamaño en el shader. */
  spreadZ: number;
  /** Radio de influencia del mouse, en unidades de mundo. */
  pointerRadius: number;
  /** Cuánto empuja el mouse hacia afuera. */
  pointerStrength: number;
  /** Rigidez del resorte que devuelve la partícula a su ancla. */
  springStiffness: number;
  /** Amortiguación del resorte. Alto = vuelve sin rebotar. */
  springDamping: number;
  /** Amplitud del vaivén ambiente (respiración del campo). */
  driftAmplitude: number;
  /** Cuánto sube el campo entero al scrollear (unidades de mundo). */
  scrollDrift: number;
  /** Semilla: misma distribución en cada carga, sin sorpresas visuales. */
  seed: number;
  /**
   * Ventana de stagger de la transición, en unidades de progress.
   * 0 = todas las partículas salen juntas (se lee como un bloque rígido, mal).
   * Cerca de 1 = la última recién arranca cuando la primera terminó. El valor
   * útil está en el medio: el morfeo se lee como una ola que barre la figura.
   */
  morphStagger: number;
  /**
   * Progress en el que la ÚLTIMA partícula termina de morfear.
   * Comprime toda la transición dentro de [0, morphEndAt] para que el grafo
   * quede armado mientras el campo todavía está a opacidad plena.
   */
  morphEndAt: number;
}

/**
 * PRNG determinístico (mulberry32). Math.random() daría un campo distinto en
 * cada carga y en cada resize, y con partículas tan tenues un cambio de
 * distribución se lee como parpadeo. Con semilla fija el fondo es siempre el
 * mismo objeto.
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

/**
 * Campo de partículas con anclas + resorte + morfeo entre dos figuras.
 *
 * Cada partícula tiene: dos anclas de figura (panda y grafo), una posición
 * actual y una velocidad. El ancla EFECTIVA de cada frame es la interpolación
 * entre las dos según el progress; el mouse desplaza la posición y el resorte la
 * trae de vuelta a esa ancla efectiva.
 *
 * Ese encadenamiento es lo que hace que la transición se sienta física y no como
 * un tween: la partícula nunca es teletransportada a la posición interpolada,
 * sino que la PERSIGUE. Cuando la interpolación se mueve rápido, la partícula
 * queda atrás y se estira; cuando se frena, la alcanza con un poco de inercia.
 * Gratis, porque el resorte ya estaba.
 */
export class ParticleField {
  readonly count: number;
  /** xyz intercalado; es el buffer que consume el BufferAttribute. */
  readonly positions: Float32Array;
  /** Semilla de fase por partícula: desincroniza la deriva ambiente. */
  private readonly phases: Float32Array;
  /** Escala de tamaño por partícula, para que el campo no se vea uniforme. */
  readonly scales: Float32Array;

  /**
   * Peso visual por partícula (0→1). Lo consume el shader para que los rasgos
   * de la figura (ojos y orejas del panda, nodos del grafo) se dibujen más
   * grandes y opacos que el relleno. Sin esto el panda es una mancha con
   * contorno de panda: legible como silueta, ilegible como cara.
   */
  readonly weights: Float32Array;

  /** Anclas de la figura A (panda) y B (grafo), en unidades de mundo, xyz. */
  private readonly anchorsA: Float32Array;
  private readonly anchorsB: Float32Array;
  /** Peso de cada partícula en cada figura; se interpolan igual que la posición. */
  private readonly weightsA: Float32Array;
  private readonly weightsB: Float32Array;

  private readonly velocities: Float32Array;
  private readonly opts: ParticleFieldOptions;

  /**
   * Offset de stagger por partícula (0→1). Define CUÁNDO le toca morfear.
   * Se calcula una sola vez y se guarda: recalcularlo por frame sería gratis en
   * flops pero nos obligaría a tener las posiciones de figura a mano, y este
   * array es más barato que esa dependencia.
   */
  private readonly staggerOffset: Float32Array;

  constructor(opts: ParticleFieldOptions) {
    this.opts = opts;
    this.count = opts.count;
    this.positions = new Float32Array(opts.count * 3);
    this.anchorsA = new Float32Array(opts.count * 3);
    this.anchorsB = new Float32Array(opts.count * 3);
    this.weightsA = new Float32Array(opts.count);
    this.weightsB = new Float32Array(opts.count);
    this.weights = new Float32Array(opts.count);
    this.velocities = new Float32Array(opts.count * 3);
    this.phases = new Float32Array(opts.count);
    this.scales = new Float32Array(opts.count);
    this.staggerOffset = new Float32Array(opts.count);

    this.reseed();
  }

  /**
   * Inicializa lo que NO depende de las figuras: fases, escalas y un volumen de
   * dispersión por defecto. Las figuras se cargan después (el panda requiere
   * bajar y rasterizar un SVG, que es asíncrono), así que hasta que lleguen el
   * campo tiene que verse como algo — y ese algo es la distribución original.
   */
  reseed(): void {
    const { count, spreadX, spreadY, spreadZ, seed } = this.opts;
    const rand = mulberry32(seed);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Distribución uniforme con un sesgo hacia los bordes en Y: hasta que
      // llegue la figura, el centro tiene que quedar despejado porque ahí vive
      // el texto del hero. `y³` empuja masa hacia arriba y abajo.
      const ry = rand() * 2 - 1;
      const biasedY = ry * ry * ry;

      const x = (rand() * 2 - 1) * spreadX;
      const y = biasedY * spreadY;
      const z = (rand() * 2 - 1) * spreadZ;

      this.anchorsA[i3] = x;
      this.anchorsA[i3 + 1] = y;
      this.anchorsA[i3 + 2] = z;
      this.anchorsB[i3] = x;
      this.anchorsB[i3 + 1] = y;
      this.anchorsB[i3 + 2] = z;

      this.positions[i3] = x;
      this.positions[i3 + 1] = y;
      this.positions[i3 + 2] = z;

      this.velocities[i3] = 0;
      this.velocities[i3 + 1] = 0;
      this.velocities[i3 + 2] = 0;

      this.phases[i] = rand() * Math.PI * 2;
      // Rango angosto: partículas muy dispares se leen como "estrellas" y
      // llaman la atención. Queremos textura, no constelación.
      this.scales[i] = 0.65 + rand() * 0.6;

      this.weightsA[i] = 0;
      this.weightsB[i] = 0;
      this.weights[i] = 0;
    }
  }

  /**
   * Carga la figura A (el isotipo). `points` viene normalizado en [-1, 1] desde
   * shapeSampler; acá se escala al tamaño de mundo y se le agrega profundidad.
   *
   * La Z NO viene de la figura (es 2D) sino de ruido acotado: sin nada de Z el
   * panda se ve como una calcomanía plana, y con demasiada se despedaza. Un
   * pelín de espesor le da cuerpo sin romper la silueta.
   *
   * `offsetX/offsetY` desplazan la figura entera dentro del mundo. Existen
   * porque el hero NO está vacío: la columna de texto ocupa la izquierda y la
   * tarjeta del dashboard (opaca) la derecha, así que una figura centrada en el
   * origen queda comida por ambas. Quien llama decide el corrimiento contra el
   * layout real; el campo sólo lo aplica.
   */
  setShapeA(
    points: Float32Array,
    ink: Float32Array,
    scaleX: number,
    scaleY: number,
    depth: number,
    offsetX: number = 0,
    offsetY: number = 0,
    available: number = this.count
  ): void {
    const rand = mulberry32(this.opts.seed ^ 0x9e3779b9);
    // El sampler puede devolver MENOS puntos de los pedidos (agota los intentos
    // del rejection sampling). Si leyéramos el buffer entero igual, la cola
    // vendría en cero y todas esas partículas se apilarían en el origen: una
    // mancha densa en el centro exacto de la figura, que es el peor artefacto
    // posible. Reusar puntos ciclando sólo densifica un poco la silueta.
    const src = Math.max(Math.min(available, this.count), 1);

    for (let i = 0; i < this.count; i++) {
      const i3 = i * 3;
      const s = i % src;
      this.anchorsA[i3] = points[s * 2] * scaleX + offsetX;
      this.anchorsA[i3 + 1] = points[s * 2 + 1] * scaleY + offsetY;
      this.anchorsA[i3 + 2] = (rand() * 2 - 1) * depth;
      this.weightsA[i] = ink[s];
    }

    this.computeStagger();
  }

  /**
   * Carga la figura B (el grafo). Mismo contrato que setShapeA.
   * X e Y se escalan por separado porque el grafo es deliberadamente más ancho
   * que alto (un diagrama de flujo se lee horizontal), mientras que el panda
   * tiene que conservar su proporción.
   */
  setShapeB(
    points: Float32Array,
    ink: Float32Array,
    scaleX: number,
    scaleY: number,
    depth: number,
    offsetX: number = 0,
    offsetY: number = 0
  ): void {
    const rand = mulberry32(this.opts.seed ^ 0x85ebca6b);

    for (let i = 0; i < this.count; i++) {
      const i3 = i * 3;
      this.anchorsB[i3] = points[i * 2] * scaleX + offsetX;
      this.anchorsB[i3 + 1] = points[i * 2 + 1] * scaleY + offsetY;
      this.anchorsB[i3 + 2] = (rand() * 2 - 1) * depth;
      this.weightsB[i] = ink[i];
    }

    this.computeStagger();
  }

  /**
   * Reparte el retraso de cada partícula en la transición.
   *
   * El orden NO es aleatorio ni por índice: es por posición X en la figura de
   * destino. Así el morfeo barre de izquierda a derecha, en la misma dirección
   * en la que se lee el grafo (entrada → salida). Un stagger aleatorio se ve
   * como hervor; uno espacial se ve como una ola, y encima refuerza la lectura
   * del diagrama porque el sistema se "construye" en el orden en que fluye.
   */
  private computeStagger(): void {
    // Se normaliza contra la extensión REAL del destino, no contra el volumen
    // del campo: si usáramos spreadX, un grafo que ocupa la mitad del ancho
    // usaría sólo la mitad de la ventana de stagger y la ola quedaría corta.
    let minX = Infinity;
    let maxX = -Infinity;
    for (let i = 0; i < this.count; i++) {
      const x = this.anchorsB[i * 3];
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
    }
    const span = Math.max(maxX - minX, 0.001);

    for (let i = 0; i < this.count; i++) {
      // De X en mundo a 0→1. El destino manda: es la figura que se está
      // construyendo, y queremos que el barrido sea legible al llegar.
      const nx = (this.anchorsB[i * 3] - minX) / span;
      this.staggerOffset[i] = nx < 0 ? 0 : nx > 1 ? 1 : nx;
    }
  }

  /**
   * Cambia el volumen (resize). NO llama a reseed: eso reventaría las figuras
   * ya cargadas y el panda volvería a ser ruido. Quien llama vuelve a setear las
   * figuras con la escala nueva.
   */
  resize(spreadX: number, spreadY: number): void {
    this.opts.spreadX = spreadX;
    this.opts.spreadY = spreadY;
  }

  /**
   * Avanza la simulación un frame. Muta `positions` in place: cero allocations,
   * porque esto corre 60 veces por segundo y cualquier objeto nuevo acá termina
   * siendo presión de GC en el hilo que menos la tolera.
   */
  update(input: FieldInput): void {
    const {
      pointerRadius,
      pointerStrength,
      springStiffness,
      springDamping,
      driftAmplitude,
      scrollDrift,
      morphStagger,
      morphEndAt,
    } = this.opts;

    const { progress, pointerX, pointerY, pointerActive, dt, elapsed } = input;

    const radiusSq = pointerRadius * pointerRadius;
    // El campo entero sube al scrollear: refuerza la sensación de que el hero
    // se va, sin necesidad de mover la cámara.
    const scrollY = progress * scrollDrift;

    // La transición ENTERA se comprime dentro de [0, morphEndAt] del scroll del
    // hero, no del recorrido completo. Normalizando contra 1, la ÚLTIMA
    // partícula recién llegaba en progress 1.0 — o sea después de que el campo
    // ya se hubiera disipado, y el grafo terminado no se veía nunca. Con el
    // techo acá el sistema queda armado y quieto un tramo antes del fade.
    const p = Math.min(progress / Math.max(morphEndAt, 0.001), 1);

    // Ventana que le queda a cada partícula una vez descontado su retraso.
    const morphSpan = Math.max(1 - morphStagger, 0.001);

    for (let i = 0; i < this.count; i++) {
      const i3 = i * 3;

      // Progress LOCAL de esta partícula: el global corrido por su offset de
      // stagger y renormalizado. Cada una recorre igual su 0→1, pero empieza en
      // un momento distinto — eso es lo que convierte un bloque que se traslada
      // en una ola que barre la figura.
      let m = (p - this.staggerOffset[i] * morphStagger) / morphSpan;
      m = m < 0 ? 0 : m > 1 ? 1 : m;
      // Smoothstep: arranca y termina con velocidad cero. Con interpolación
      // lineal la partícula pega un tirón al salir y un frenazo al llegar, y a
      // esta escala los dos se notan.
      const t = m * m * (3 - 2 * m);

      const phase = this.phases[i];
      // Deriva ambiente: dos senos con frecuencias no múltiplas para que el
      // patrón no se repita de forma legible. Barato y suficiente — un ruido
      // Perlin acá costaría más de lo que aporta a esta amplitud.
      // Se ATENÚA en el medio de la transición (t≈0.5) y se restituye en los
      // extremos: mientras la figura está formada la respiración le da vida,
      // pero durante el vuelo sólo agrega ruido a un movimiento que ya es
      // grande. `4*t*(1-t)` vale 0 en los extremos y 1 en el medio.
      const flight = 4 * t * (1 - t);
      const driftScale = driftAmplitude * (1 - flight * 0.75);
      const driftX = Math.sin(elapsed * 0.18 + phase) * driftScale;
      const driftY = Math.cos(elapsed * 0.13 + phase * 1.7) * driftScale;

      // Interpolación entre las dos figuras. Ésta es toda la fase 2: el resto
      // del sistema (resorte, puntero, deriva) no se enteró de nada.
      const ax0 = this.anchorsA[i3];
      const ay0 = this.anchorsA[i3 + 1];
      const az0 = this.anchorsA[i3 + 2];
      const anchorX = ax0 + (this.anchorsB[i3] - ax0) * t;
      const anchorY = ay0 + (this.anchorsB[i3 + 1] - ay0) * t;
      const anchorZ = az0 + (this.anchorsB[i3 + 2] - az0) * t;

      // El peso visual viaja con la posición: si no, los ojos del panda se
      // apagarían de golpe al empezar el scroll en vez de convertirse en nodos.
      const w0 = this.weightsA[i];
      this.weights[i] = w0 + (this.weightsB[i] - w0) * t;

      const targetX = anchorX + driftX;
      const targetY = anchorY + driftY + scrollY;
      const targetZ = anchorZ;

      let px = this.positions[i3];
      let py = this.positions[i3 + 1];
      let pz = this.positions[i3 + 2];

      // Resorte hacia el target. Fuerza = k * desplazamiento - c * velocidad;
      // el damping alto evita el rebote elástico, que en un fondo se lee como
      // gelatina y distrae.
      let ax = (targetX - px) * springStiffness;
      let ay = (targetY - py) * springStiffness;
      let az = (targetZ - pz) * springStiffness;

      if (pointerActive) {
        const dx = px - pointerX;
        const dy = py - pointerY;
        const distSq = dx * dx + dy * dy;

        if (distSq < radiusSq && distSq > 0.0001) {
          // Caída cuadrática en vez de lineal: concentra el efecto cerca del
          // cursor y lo apaga rápido, así el empuje se siente local y no como
          // que se mueve la pantalla entera.
          const falloff = 1 - distSq / radiusSq;
          const dist = Math.sqrt(distSq);
          const push = (falloff * falloff * pointerStrength) / dist;

          ax += dx * push;
          ay += dy * push;
        }
      }

      let vx = (this.velocities[i3] + ax * dt) * springDamping;
      let vy = (this.velocities[i3 + 1] + ay * dt) * springDamping;
      let vz = (this.velocities[i3 + 2] + az * dt) * springDamping;

      px += vx * dt;
      py += vy * dt;
      pz += vz * dt;

      this.velocities[i3] = vx;
      this.velocities[i3 + 1] = vy;
      this.velocities[i3 + 2] = vz;

      this.positions[i3] = px;
      this.positions[i3 + 1] = py;
      this.positions[i3 + 2] = pz;
    }
  }
}
