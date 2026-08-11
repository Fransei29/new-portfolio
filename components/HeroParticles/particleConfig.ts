/**
 * Todos los números que se tunean, en un solo lugar.
 *
 * Están acá y no dispersos en el renderer porque este efecto se ajusta a ojo:
 * uno cambia opacidad, mira, cambia el push, mira de nuevo. Tener que buscar
 * cada constante entre el código de WebGL hace que ese ciclo sea tedioso y
 * termina en un fondo mal calibrado.
 *
 * CAMBIO DE CRITERIO respecto de la versión original: esto ya no es fondo. Las
 * partículas forman el isotipo de la marca y se reorganizan en un grafo al
 * scrollear, así que ahora son CONTENIDO del hero y tienen que verse. Los
 * valores de opacidad y cantidad subieron en consecuencia — un campo tenue era
 * lo correcto para textura ambiente y es lo incorrecto para una figura que
 * tiene que reconocerse.
 */

export const PARTICLE_CONFIG = {
  /**
   * Cantidad de partículas por breakpoint.
   *
   * Este número ahora define QUÉ TAN RECONOCIBLE es la figura, no sólo el
   * costo. Debajo de ~2500 el panda pierde los rasgos finos (el hocico son tres
   * o cuatro partículas) y se lee como mancha. El costo sigue siendo del loop de
   * CPU, no de la GPU: 5000 puntos es nada para dibujar.
   */
  countDesktop: 5200,
  countTablet: 3600,
  countMobile: 2400,

  /**
   * Debajo de este ancho NO se monta nada.
   *
   * REEVALUADO: la versión original cortaba en 768 porque un campo de ruido en
   * un hero de teléfono es batería tirada. Con una FIGURA la cuenta cambia — el
   * isotipo se reconoce igual a 360px de ancho, y es justamente la marca. Lo
   * bajamos a 380 (excluye sólo teléfonos muy angostos, donde el hero es texto
   * apretado y no hay lugar para nada más) y compensamos con menos partículas.
   */
  minWidthToMount: 380,
  /** Ancho a partir del cual se usa countTablet en vez de countMobile. */
  tabletBreakpoint: 768,

  /** Profundidad del volumen. Da parallax vía atenuación de tamaño. */
  spreadZ: 3.5,

  /**
   * Tamaño base del punto en px (a dpr 1). El shader lo atenúa por distancia.
   * Bajó respecto del original (3.4): con la densidad nueva, puntos grandes
   * empastan la silueta y el panda pierde definición justo donde más importa
   * (el contorno de los ojos). Grano fino + mucha cantidad lee mejor que grano
   * grueso + poca.
   */
  pointSize: 2.6,

  /**
   * Cuánto más grande se dibuja un rasgo (ojo, oreja, nodo) que el relleno.
   * Junto con `countDesktop` es el parámetro que más manda sobre si la figura se
   * reconoce. En 0 el panda es una mancha uniforme; arriba de ~2 los rasgos se
   * empastan entre sí y los ojos se vuelven dos borrones.
   */
  weightBoost: 1.15,

  /**
   * Opacidad máxima del campo. El número más importante del archivo.
   * Subió respecto del original porque cambió el rol: antes era textura de
   * fondo que no debía notarse, ahora es la figura de marca y tiene que
   * leerse. Light y dark difieren porque sobre fondo claro el lila rinde más
   * contraste.
   */
  opacityLight: 0.95,
  opacityDark: 1.0,

  /** Radio de influencia del mouse, en unidades de mundo. */
  pointerRadius: 1.9,

  /**
   * Fuerza del empuje radial.
   * BAJÓ bastante respecto del original (9.0). Con una figura reconocible, el
   * mouse dejó de ser el protagonista del efecto y pasó a ser un detalle: si
   * empuja fuerte, DESTRUYE el panda al pasar por encima, que es exactamente lo
   * contrario de lo que queremos. Ahora sólo lo hace ondular al tacto.
   */
  pointerStrength: 4.0,

  /**
   * Resorte de retorno: qué tan rápido vuelven al ancla.
   * SUBIÓ (era 3.2) porque ahora el ancla es un punto de la figura y no de una
   * nube: cuanto más rápido converge, más nítida se ve la silueta. Con valores
   * bajos el panda queda permanentemente "borroso" por partículas que nunca
   * terminan de llegar.
   */
  springStiffness: 5.5,
  /**
   * Amortiguación por frame. Cerca de 1 = flota mucho; bajo = vuelve seco.
   * 0.88 deja un retorno con algo de inercia pero sin rebote elástico — el
   * rebote acá se vería como la figura "temblando" al asentarse.
   */
  springDamping: 0.88,

  /**
   * Amplitud del vaivén ambiente. Muy chico a propósito: es respiración.
   * Bajó respecto del original porque ahora desdibuja una silueta en vez de
   * animar una nube. Es lo que evita que la figura se vea como un PNG estático.
   */
  driftAmplitude: 0.045,

  /**
   * Cuánto sube el campo entero a lo largo del scroll del hero.
   * Bajó (era 1.8): con una figura que además está morfeando, sumarle una
   * traslación grande hace que el grafo nunca se vea quieto. Un toque de deriva
   * alcanza para que acompañe al scroll.
   */
  scrollDrift: 0.7,

  /**
   * Progress en el que EMPIEZA a bajar la opacidad. Hasta acá el campo está a
   * opacidad plena.
   *
   * Tiene que ser MAYOR que `morphEndAt`, y esa relación es la regla de oro del
   * timing: si el fade arranca antes de que el morfeo termine, el usuario ve la
   * transición pero nunca el grafo terminado, que es justamente lo que el efecto
   * viene a mostrar. El hueco entre ambos (0.70 → 0.82) es el tramo de scroll en
   * el que el sistema se queda quieto y legible.
   */
  fadeStartAt: 0.82,

  /**
   * Progress en el que el campo termina de disiparse del todo.
   * Después de esto el hero ya se está yendo de pantalla.
   */
  fadeOutAt: 0.96,

  /** Cap de devicePixelRatio: arriba de 2 se paga resolución que nadie ve. */
  maxPixelRatio: 2,

  /** Semilla fija: el campo se ve igual en cada carga. */
  seed: 20260811,

  // --- FIGURA A: el isotipo del panda ---

  /** De dónde sale la silueta. Ver shapeSampler para el método. */
  shapeSrc: '/isotipo-panda.svg',

  /**
   * Resolución del canvas de muestreo (lado, en px).
   * Es el techo de detalle de la figura: por debajo de ~140 el hocico y los
   * ojos se pierden en el rasterizado y ya no importa cuántas partículas haya.
   * Por encima de ~300 no se gana nada (no tenemos tantas partículas como para
   * resolver ese detalle) y el getImageData empieza a costar.
   */
  shapeResolution: 220,

  /**
   * Fracción de partículas asignadas a los rasgos oscuros del isotipo.
   * Los rasgos ocupan poca área, así que un muestreo proporcional los dejaría
   * casi vacíos. Sobre-representarlos es lo que dibuja la cara. Muy alto y el
   * cuerpo se vacía; muy bajo y vuelve a ser una mancha.
   */
  shapeInkShare: 0.42,

  /**
   * Semi-tamaño del panda en unidades de mundo (la figura ocupa ±este valor).
   * Junto con la cantidad de partículas, es lo que decide si se reconoce: una
   * figura chica con pocos puntos es un borrón. Se recalcula contra el viewport
   * en HeroParticlesCanvas para que no se salga en pantallas bajas.
   */
  shapeScale: 3.1,

  /**
   * Techos de la escala del panda como fracción del semi-viewport.
   *
   * El de ALTO evita que la figura salga cortada en pantallas bajas.
   * El de ANCHO es el que importa en desktop: mantiene el borde derecho del
   * panda antes de la tarjeta del dashboard (opaca, ~480px pegada a la derecha).
   * Subirlo agranda la figura pero le mete la cara debajo de la tarjeta, que es
   * peor que tenerla un poco más chica.
   */
  shapeMaxHeightRatio: 0.92,
  shapeMaxWidthRatio: 0.3,

  /**
   * Techo de ancho en una sola columna (mobile), donde no hay tarjeta que
   * esquivar y el limitante vuelve a ser el borde de la pantalla. Sin esto la
   * figura llegaba a ocupar el 99% del ancho y se cortaba en los costados.
   */
  shapeMaxWidthRatioNarrow: 0.72,

  /**
   * Espesor en Z de la figura. El isotipo es 2D; sin nada de Z se ve como una
   * calcomanía y se pierde la atenuación que da volumen. Con demasiado, la
   * silueta se despedaza porque los puntos del fondo se achican de más.
   */
  shapeDepth: 0.55,

  /**
   * Corrimiento horizontal del panda, como fracción del semi-ancho visible.
   *
   * POR QUÉ NO VA CENTRADO: el hero está ocupado. A la izquierda vive el texto
   * (transparente, pero las letras igual pisan la silueta) y a la derecha la
   * tarjeta del dashboard, que es OPACA y taparía medio panda. El hueco real
   * está apenas a la izquierda del centro, entre el final del texto y el borde
   * de la tarjeta. Negativo = hacia la izquierda.
   *
   * Es el parámetro que hay que tocar primero si el panda queda tapado: en un
   * viewport de 1440px, cada 0.05 mueve la figura unos 36px.
   *
   * -0.06 deja el centro de la figura apenas a la izquierda del centro del
   * viewport (~47%): pisa el final de la columna de texto (que es transparente,
   * sólo las letras tapan) y frena antes del borde de la tarjeta del dashboard,
   * que es la única superficie opaca del hero.
   */
  shapeOffsetXRatio: -0.06,

  /**
   * Corrimiento vertical, como fracción del semi-alto visible. Levemente hacia
   * arriba: el bloque de botones y el social proof de HomeText viven en la
   * mitad inferior, así que ahí abajo hay más cosas opacas que arriba.
   */
  shapeOffsetYRatio: 0.06,

  // --- FIGURA B: el grafo de sistema ---

  /**
   * Nodos por columna, de izquierda a derecha. ES la topología del diagrama:
   * una entrada → fan-out → capa ancha de proceso → convergencia a una salida.
   * Se lee como pipeline porque lo es. Cambiar esto cambia qué "sistema" se ve.
   */
  graphLayers: [2, 4, 5, 4, 2],

  /** Fracción de partículas que forman los nodos; el resto va a las aristas. */
  graphNodeShare: 0.3,

  /** Radio del cúmulo de cada nodo, en unidades normalizadas [-1,1]. */
  graphNodeRadius: 0.045,

  /** Desorden de la grilla de nodos. En 0 se ve como planilla de cálculo. */
  graphJitter: 0.05,

  /** Grosor del reguero de partículas sobre cada arista. */
  graphEdgeSpread: 0.012,

  /**
   * Semi-tamaño del grafo en mundo. Más ancho que alto: es un diagrama.
   *
   * El ancho es DELIBERADAMENTE mayor que el del panda (~3.1). Ese contraste es
   * la mitad del mensaje: la marca se abre y se despliega en un sistema. Con el
   * grafo del mismo ancho que el panda, el morfeo se lee como "los puntos se
   * movieron un poco" en vez de como una reorganización.
   *
   * El techo real no es el viewport sino la tarjeta opaca del dashboard a la
   * derecha; por eso el grafo crece hacia la IZQUIERDA (ver graphOffsetXRatio),
   * donde sólo hay texto transparente.
   */
  graphScaleX: 5.2,
  graphScaleY: 2.6,

  /** Espesor en Z del grafo. Menos que el panda: un diagrama se lee plano. */
  graphDepth: 0.3,

  /**
   * Corrimiento del grafo, en fracción del semi-viewport.
   *
   * Más a la izquierda que el panda porque el grafo es más ancho y su borde
   * derecho es el que no puede meterse debajo de la tarjeta del dashboard: todo
   * el crecimiento extra tiene que ir para el lado del texto, que es
   * transparente. Ajustar junto con `graphScaleX` — si uno crece, el otro se
   * corre, o el diagrama termina tapado justo en su salida.
   */
  graphOffsetXRatio: -0.19,
  graphOffsetYRatio: 0.04,

  // --- TRANSICIÓN ---

  /**
   * Ventana de stagger, en unidades de progress (0→1).
   * Es EL parámetro de timing. Reparte el retraso de arranque entre partículas
   * según su X de destino, así el morfeo barre de izquierda a derecha en vez de
   * moverse en bloque. En 0 todas salen juntas (rígido); cerca de 1 la última
   * arranca cuando la primera ya llegó (lentísimo). 0.45 deja una ola clara y
   * el grafo armado antes de que empiece el fade.
   */
  morphStagger: 0.45,

  /**
   * Progress en el que la ÚLTIMA partícula termina de llegar al grafo.
   *
   * Es el otro parámetro de timing, y va de la mano de `fadeStartAt` (0.82):
   * todo el morfeo entra en [0, 0.70] y después queda un tramo con el sistema
   * armado y todavía a opacidad plena. Bajarlo acelera la transición entera
   * (más brusca, más tiempo de grafo quieto); subirlo la estira, pero pasando
   * `fadeStartAt` el grafo terminado deja de verse.
   */
  morphEndAt: 0.7,
} as const;

/**
 * Colores del campo por tema.
 *
 * Ahora son DOS por tema, no uno: `base` pinta el relleno de la figura y
 * `accent` los rasgos (ojos, orejas y contorno del panda; nodos del grafo). El
 * contraste entre ambos es la mitad de lo que hace legible al isotipo — la otra
 * mitad es el tamaño, ver `weightBoost`.
 *
 * En light el relleno va en lila corporativo (#7d68d8) y el acento en el tinta
 * de marca (#2e294e), que es el mismo par de la identidad. En dark se invierte
 * la lógica: el relleno en lila suave (#b59cf8) y el acento en casi blanco,
 * porque sobre fondo oscuro el rasgo tiene que ser MÁS luminoso, no más oscuro.
 */
export const PARTICLE_COLORS = {
  light: {
    base: { r: 0.49, g: 0.408, b: 0.847 },
    accent: { r: 0.18, g: 0.161, b: 0.306 },
  },
  dark: {
    base: { r: 0.71, g: 0.612, b: 0.973 },
    accent: { r: 0.93, g: 0.91, b: 1.0 },
  },
} as const;
