/**
 * Capa de RENDER: todo lo que toca three vive acá.
 *
 * El campo (particleField.ts) no sabe que existe WebGL y este archivo no sabe
 * cómo se calculan las posiciones — sólo consume el Float32Array que el campo
 * mutó. Esa frontera es la que permite que fase 2 (anclas baricéntricas en
 * mallas) toque un solo lado.
 *
 * three no trae tipos propios en 0.171 y no hay @types/three instalado, así que
 * el módulo se tipa con `typeof import('three')` sobre el import dinámico. Eso
 * mantiene el tipado sin sumar una dependencia sólo para compilar.
 */

type ThreeModule = typeof import('three');
type Renderer = InstanceType<ThreeModule['WebGLRenderer']>;
type Scene = InstanceType<ThreeModule['Scene']>;
type Camera = InstanceType<ThreeModule['PerspectiveCamera']>;
type Points = InstanceType<ThreeModule['Points']>;
type Geometry = InstanceType<ThreeModule['BufferGeometry']>;
type Material = InstanceType<ThreeModule['ShaderMaterial']>;

/**
 * El punto se dibuja como círculo con borde suave, no como quad.
 * `gl_PointCoord` da la coordenada dentro del sprite; el smoothstep sobre la
 * distancia al centro recorta el cuadrado y difumina el borde. Sin ese fade el
 * punto se ve aliaseado y a este tamaño el diente de sierra canta.
 */
const VERTEX_SHADER = /* glsl */ `
  attribute float aScale;
  // Peso visual (0→1): 0 = relleno de la figura, 1 = rasgo (ojo, oreja, nodo).
  attribute float aWeight;

  uniform float uPointSize;
  uniform float uPixelRatio;
  uniform float uWeightBoost;

  varying float vFade;
  varying float vWeight;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Atenuación por distancia: las partículas del fondo del volumen se ven
    // más chicas. Es lo que convierte el spread en Z en profundidad percibida
    // en vez de ruido plano.
    float attenuation = 1.0 / max(-mvPosition.z, 0.1);

    // Los rasgos se dibujan más grandes. Es LA razón por la que la figura se
    // reconoce: con puntos de tamaño uniforme el panda queda como una nube con
    // silueta correcta pero sin cara, y una cara es lo único que el ojo humano
    // detecta a esta escala. Mismo mecanismo le da cuerpo a los nodos del grafo.
    float weighted = aScale * (1.0 + aWeight * uWeightBoost);
    gl_PointSize = uPointSize * weighted * uPixelRatio * attenuation * 10.0;

    // Las lejanas además se atenúan en alpha. Sin esto el campo se ve como una
    // capa uniforme y pierde la sensación de volumen.
    vFade = clamp(attenuation * 1.6, 0.0, 1.0);
    vWeight = aWeight;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  precision mediump float;

  uniform vec3 uColor;
  uniform vec3 uAccentColor;
  uniform float uOpacity;

  varying float vFade;
  varying float vWeight;

  void main() {
    // Distancia al centro del sprite: 0 en el medio, 0.5 en el borde.
    float dist = length(gl_PointCoord - vec2(0.5));

    // Borde suave y largo (0.5 → 0.15): el punto queda con halo en vez de
    // canto duro, que es lo que lo hace leer como grano de luz y no como disco.
    float alpha = smoothstep(0.5, 0.15, dist);

    if (alpha < 0.01) discard;

    // Los rasgos van en el color de acento y con más opacidad. El contraste
    // tonal es la segunda mitad del truco de legibilidad (la primera es el
    // tamaño): así ojos y orejas se separan del cuerpo como en el isotipo real.
    vec3 color = mix(uColor, uAccentColor, vWeight);
    float weightAlpha = mix(1.0, 1.45, vWeight);

    gl_FragColor = vec4(color, alpha * uOpacity * vFade * weightAlpha);
  }
`;

/**
 * Parámetros de cámara. Están acá arriba y no adentro del constructor porque el
 * loop necesita saber CUÁNTO mundo se ve antes de tener un renderer: el campo se
 * dimensiona contra el viewport y el renderer se construye con los buffers del
 * campo ya creados. Sin esto habría que instanciar un WebGLRenderer descartable
 * sólo para leer dos números — y descartarlo implica forceContextLoss() sobre el
 * mismo canvas que después queremos volver a usar, que es justamente la forma de
 * quedarse sin contexto.
 */
const CAMERA_FOV = 55;
const CAMERA_Z = 10;

/**
 * Semi-alto y semi-ancho del plano z=0 que entra en cámara. Función pura: la
 * usan el canvas (antes de montar nada) y la propia clase (en cada resize), y
 * tienen que dar exactamente lo mismo o el mapeo del mouse se desfasa.
 */
export function computeViewSize(width: number, height: number): { viewWidth: number; viewHeight: number } {
  const fovRad = (CAMERA_FOV * Math.PI) / 180;
  const viewHeight = Math.tan(fovRad / 2) * CAMERA_Z;
  return { viewHeight, viewWidth: viewHeight * (width / height) };
}

export interface RendererInit {
  THREE: ThreeModule;
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  pixelRatio: number;
  positions: Float32Array;
  scales: Float32Array;
  /** Peso por partícula. Muta cada frame (interpola entre figuras). */
  weights: Float32Array;
  pointSize: number;
  /** Cuánto agranda el peso al punto. Ver comentario en el vertex shader. */
  weightBoost: number;
}

/**
 * Envuelve la escena three. Expone sólo lo que el loop necesita: subir
 * posiciones, cambiar color/opacidad, resize y dispose.
 */
export class ParticleRenderer {
  private readonly THREE: ThreeModule;
  private readonly renderer: Renderer;
  private readonly scene: Scene;
  private readonly camera: Camera;
  private readonly geometry: Geometry;
  private readonly material: Material;
  private readonly points: Points;

  /** Semi-alto del plano z=0 visible por la cámara. Lo usa el mapeo de mouse. */
  viewHeight: number;
  viewWidth: number;

  constructor(init: RendererInit) {
    const {
      THREE,
      canvas,
      width,
      height,
      pixelRatio,
      positions,
      scales,
      weights,
      pointSize,
      weightBoost,
    } = init;
    this.THREE = THREE;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false, // los puntos ya salen suavizados por el shader; el MSAA acá sería costo puro
      powerPreference: 'low-power',
    });
    this.renderer.setSize(width, height, false);
    this.renderer.setPixelRatio(pixelRatio);
    // Sin clear color opaco: el canvas es una capa sobre el fondo del hero.
    this.renderer.setClearAlpha(0);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(CAMERA_FOV, width / height, 0.1, 100);
    this.camera.position.z = CAMERA_Z;

    this.viewHeight = 1;
    this.viewWidth = 1;
    this.updateViewSize(width, height);

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    this.geometry.setAttribute('aWeight', new THREE.BufferAttribute(weights, 1));

    this.material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
      // depthWrite off + additive-free: los puntos se superponen sin recortarse
      // entre sí. Con depth write activo, los cercanos borran a los lejanos y
      // el campo pierde densidad visual.
      depthWrite: false,
      depthTest: false,
      uniforms: {
        uColor: { value: new THREE.Color(1, 1, 1) },
        uAccentColor: { value: new THREE.Color(1, 1, 1) },
        uOpacity: { value: 0 },
        uPointSize: { value: pointSize },
        uPixelRatio: { value: pixelRatio },
        uWeightBoost: { value: weightBoost },
      },
    });

    this.points = new THREE.Points(this.geometry, this.material);
    // El frustum culling calcula bounding sphere sobre posiciones que mutan
    // cada frame; acá siempre está en cámara, así que es cálculo tirado.
    this.points.frustumCulled = false;
    this.scene.add(this.points);
  }

  /**
   * Alto/ancho visible en el plano z=0. Necesario para mapear el mouse de px a
   * unidades de mundo sin que el push se desfase respecto del cursor.
   */
  private updateViewSize(width: number, height: number): void {
    const { viewWidth, viewHeight } = computeViewSize(width, height);
    this.viewWidth = viewWidth;
    this.viewHeight = viewHeight;
  }

  setColor(r: number, g: number, b: number): void {
    (this.material.uniforms.uColor.value as InstanceType<ThreeModule['Color']>).setRGB(r, g, b);
  }

  /** Color de los rasgos (ojos, orejas, nodos). Ver el mix en el fragment. */
  setAccentColor(r: number, g: number, b: number): void {
    (this.material.uniforms.uAccentColor.value as InstanceType<ThreeModule['Color']>).setRGB(
      r,
      g,
      b
    );
  }

  setOpacity(value: number): void {
    this.material.uniforms.uOpacity.value = value;
  }

  /**
   * Marca los buffers como sucios. El campo ya los mutó in place.
   * El peso sube junto con la posición porque también interpola entre figuras:
   * subir uno sin el otro deja los rasgos desfasados respecto de la forma.
   */
  commitPositions(): void {
    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.aWeight.needsUpdate = true;
  }

  resize(width: number, height: number, pixelRatio: number): void {
    this.renderer.setSize(width, height, false);
    this.renderer.setPixelRatio(pixelRatio);
    this.material.uniforms.uPixelRatio.value = pixelRatio;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.updateViewSize(width, height);
  }

  render(): void {
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Libera TODO lo que ocupa memoria de GPU. Sin esto, cada montaje del hero
   * (navegación cliente incluida) deja atrás un contexto WebGL y los browsers
   * cortan alrededor de 16 contextos vivos.
   */
  dispose(): void {
    this.scene.remove(this.points);
    this.geometry.dispose();
    this.material.dispose();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
  }
}
