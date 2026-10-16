// components/SystemHero/systemEngine.ts
// El hero 3D: el producto como objeto en tres capas (Frontend & UI, Backend &
// APIs, Infra & DevOps). El modelo sale de Blender (public/hero3d/system.glb,
// armado, con un nodo por capa); acá recibe luz de estudio y la timeline del
// scroll. Misma receta que el hero de Tecnomar: el componente escribe un
// progreso 0..1 y este loop sólo lo lee en cada cuadro.
//
// El panda de la marca (components/Panda3D/pandaRig.ts): de frente se asoma
// por el borde izquierdo del dashboard, cruzado y con las patitas agarradas
// al borde, como el panda 2D de siempre. Cuando el sistema se acuesta se
// esconde atrás y reaparece por el borde de atrás, sobre la capa de arriba,
// lejos de las etiquetas. Sigue el puntero con la mirada, parpadea, y si lo
// tocan pega un salto con giro.
//
// Timeline:
//   0.00–0.02  de frente a la cámara: el dashboard se lee como hoy
//   0.02–0.16  se acuesta y queda en vista tres cuartos
//   0.12–0.32  se abre en capas; aparecen las etiquetas
//   0.70–0.84  se vuelve a armar
//   0.85–1.00  se para de nuevo de frente
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { loadPandaRig, PANDA_HEIGHT, type PandaRig } from '../Panda3D/pandaRig';

export type LabelPos = { x: number; y: number; opacity: number };
export type Rect = { x: number; y: number; w: number; h: number };

export type SystemEngine = {
  ready: Promise<void>;
  setProgress: (t: number) => void;
  setPointer: (x: number, y: number) => void;
  /** Deja de seguir al puntero (en el celu, un rato después del toque): vuelve a mirar solo. */
  releasePointer: () => void;
  /** Empujón a la mirada (radianes, + hacia abajo), p. ej. por el scroll. Se va solo. */
  nudge: (pitch: number) => void;
  setRunning: (on: boolean) => void;
  /** overscan: cuánto más ancho es el canvas que el lugar del encuadre (sobresale parejo). */
  resize: (w: number, h: number, overscan?: number) => void;
  /** Se llama en cada cuadro con la posición en px de cada capa (arriba → abajo). */
  onFrame: (cb: (labels: LabelPos[]) => void) => void;
  /** Dónde queda la pantalla del dashboard de frente (px del canvas): ahí va el póster. */
  screenRect: () => Rect;
  /** Coordenadas normalizadas del stage (-1..1, y hacia abajo): ¿está el panda ahí? */
  hitPanda: (x: number, y: number) => boolean;
  /** Salto con giro. */
  poke: () => void;
  /** En modo oscuro el carbón del panda se aclara un poco para no perderse en el fondo. */
  setDark: (dark: boolean) => void;
  dispose: () => void;
};

const MODEL_URL = '/hero3d/system.glb';
const SCREEN_URL = '/hero3d/screen.webp';

// Medidas del modelo (las mismas del script de Blender).
const W = 3.2;
const D = 2.84;
const T = 0.14;
const GAPS = { assembled: [0, 0.42, 0.84], exploded: [0, 1.55, 3.1] };
const LAYERS = ['frontend', 'backend', 'infra'] as const;

// Pantalla del modelo (el plano "screen" de Blender). Se agranda hasta cubrir
// la placa: de frente no queda marco, se ve la captura como en el hero 2D.
const SCREEN = { w: 2.94, d: 2.581, y: 0.142, grow: 1.088 };

// Dónde se asoma el panda, en coordenadas de la placa de arriba: por el borde
// izquierdo (-X) a un tercio de la altura (la barra de URL es -Z).
const PANDA_FACE = { x: -W / 2, z: -D / 2 + D * 0.32 };
// Las patitas, más chicas que en el modelo: se leen como manos agarrándose.
const PAW_SCALE = 0.62;
// Inclinación de frente (como el 2D, cruzado sacando la cabeza).
const PANDA_ROLL = 0.85;
const PANDA_SCALE = { desktop: 0.95, lite: 0.95 };
// De frente, el dashboard se corre a la derecha para dejarle lugar al panda.
// En el celu el stage ocupa todo el ancho: hay que alejarse más para que el
// panda no quede cortado por el borde de la pantalla.
const FACE_SHIFT = { desktop: 0.26, lite: 0.5 };
const FACE_DIST = { desktop: 7.6, lite: 8.9 };
// Abierto en el celu: más lejos y corrido a la derecha, para que las etiquetas
// (a la izquierda) no pisen las capas.
const OPEN_LITE = { dist: 14.6, shift: 0.95 };

// Encuadres calculados en Blender (camera_fit_coords) para cada estado.
const VIEW_DIR = new THREE.Vector3(-4.265, 5.0031, 5.5007).normalize();
const DIST = { assembled: 9.1, exploded: 12.6 };
const TARGET_Y = { assembled: 0.49, exploded: 1.62 };
// Lente de 55 mm sobre sensor de 36 mm, como la cámara de Blender.
const HFOV = 2 * Math.atan(18 / 55);

const clamp = (x: number, a: number, b: number) => Math.min(b, Math.max(a, x));
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a), 0, 1);
const smooth = (x: number) => x * x * (3 - 2 * x);
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

export function timeline(t: number) {
  const lie = smooth(seg(t, 0.02, 0.16)) * (1 - smooth(seg(t, 0.85, 1)));
  const open = smooth(seg(t, 0.12, 0.32)) * (1 - smooth(seg(t, 0.7, 0.84)));
  const labels = LAYERS.map(
    (_, i) => smooth(seg(t, 0.22 + i * 0.04, 0.28 + i * 0.04)) * (1 - smooth(seg(t, 0.66, 0.72))),
  );
  return { face: 1 - lie, open, labels };
}

/** Rotación que deja la cara de arriba (la pantalla) mirando a la cámara, derecha. */
function faceQuaternion() {
  const n = VIEW_DIR.clone();
  const up = new THREE.Vector3(0, 1, 0).sub(n.clone().multiplyScalar(n.y)).normalize();
  // En el modelo, el borde de arriba del dashboard (la barra de URL) apunta a -Z.
  const z = up.clone().negate();
  const x = new THREE.Vector3().crossVectors(n, z);
  const m = new THREE.Matrix4().makeBasis(x, n, z);
  return new THREE.Quaternion().setFromRotationMatrix(m);
}

/** Sombra de contacto suave, dibujada una vez en un canvas. */
function shadowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d')!;
  const grd = g.createRadialGradient(128, 128, 10, 128, 128, 128);
  grd.addColorStop(0, 'rgba(46,41,78,0.55)');
  grd.addColorStop(0.55, 'rgba(46,41,78,0.18)');
  grd.addColorStop(1, 'rgba(46,41,78,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * matrix3d (CSS, con transform-origin 0 0) que lleva el rectángulo 0,0–w,h a
 * los cuatro puntos dst [arriba izq, arriba der, abajo izq, abajo der]. Es una
 * homografía: exacta para una superficie plana vista en perspectiva.
 */
function quadToQuad(w: number, h: number, dst: readonly (readonly [number, number])[]): number[] | null {
  const src = [
    [0, 0],
    [w, 0],
    [0, h],
    [w, h],
  ];
  // Sistema 8×8: x' = (a x + b y + c) / (g x + h y + 1), y' = (d x + e y + f) / (g x + h y + 1).
  const A: number[][] = [];
  const B: number[] = [];
  for (let i = 0; i < 4; i++) {
    const [x, y] = src[i];
    const [X, Y] = dst[i];
    A.push([x, y, 1, 0, 0, 0, -X * x, -X * y]);
    B.push(X);
    A.push([0, 0, 0, x, y, 1, -Y * x, -Y * y]);
    B.push(Y);
  }
  // Eliminación gaussiana con pivoteo parcial.
  for (let c = 0; c < 8; c++) {
    let p = c;
    for (let r = c + 1; r < 8; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r;
    if (Math.abs(A[p][c]) < 1e-12) return null;
    [A[c], A[p]] = [A[p], A[c]];
    [B[c], B[p]] = [B[p], B[c]];
    for (let r = 0; r < 8; r++) {
      if (r === c) continue;
      const f = A[r][c] / A[c][c];
      for (let k = c; k < 8; k++) A[r][k] -= f * A[c][k];
      B[r] -= f * B[c];
    }
  }
  const [a, b, cc, d, e, f, g, hh] = B.map((v, i) => v / A[i][i]);
  // Columnas de matrix3d (column-major), con z sin tocar.
  return [a, d, 0, g, b, e, 0, hh, 0, 0, 1, 0, cc, f, 0, 1];
}

/**
 * Sombra del dashboard parado de frente (la del hero 2D, pero en 3D: se mueve
 * con el objeto). Un rectángulo redondeado desenfocado, dibujado una vez.
 */
function faceShadowTexture() {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 456;
  const g = c.getContext('2d')!;
  // El rectángulo se dibuja fuera del canvas y sólo entra su sombra (shadowBlur
  // anda en todos los navegadores; ctx.filter no).
  g.shadowColor = 'rgba(46,41,78,0.5)';
  g.shadowBlur = 48;
  g.shadowOffsetX = 2000;
  g.fillStyle = '#000';
  g.beginPath();
  g.roundRect(70 - 2000, 70, 512 - 140, 456 - 140, 24);
  g.fill();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createSystemEngine(
  canvas: HTMLCanvasElement,
  opts: {
    lite: boolean;
    still: boolean;
    paws: boolean;
    /**
     * La pantalla real del dashboard (HTML). Si viene, se calza sobre la
     * pantalla del modelo con una transformación de perspectiva (matrix3d) que
     * lleva sus cuatro esquinas a donde caen las del modelo en pantalla: el
     * texto lo dibuja el navegador y queda nítido en cualquier ángulo. La
     * pantalla 3D pasa a ser sólo profundidad (no se ve, pero tapa al panda).
     * Tiene que estar en una capa del mismo tamaño y lugar que el canvas, debajo.
     */
    screenEl?: HTMLElement;
  },
): SystemEngine {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  // Siempre a 2x (aunque la pantalla sea 1x): el texto de la captura del
  // dashboard se lee mucho mejor dibujado al doble y achicado.
  renderer.setPixelRatio(2);
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1.0;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = env;
  scene.environmentIntensity = 0.62;
  pmrem.dispose();
  // PMREM deja el clear opaco: el canvas tiene que quedar transparente sobre el hero.
  renderer.setClearColor(0x000000, 0);
  const key = new THREE.DirectionalLight(0xffffff, 2.3);
  key.position.set(-3.5, 9.5, 2.5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xd9d0ff, 1.2);
  rim.position.set(5.5, 5, -5.5);
  scene.add(rim);

  const cam = new THREE.PerspectiveCamera(30, 1, 0.1, 100);

  // Ejes de pantalla: hacia la cámara, "arriba" y "derecha" en pantalla. El
  // panda siempre mira a cámara, derecho; así de frente queda en el plano del
  // dashboard.
  const toCam = VIEW_DIR.clone();
  const upS = new THREE.Vector3(0, 1, 0).sub(toCam.clone().multiplyScalar(toCam.y)).normalize();
  const rightS = new THREE.Vector3().crossVectors(upS, toCam);
  const qPanda = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(rightS, upS, toCam));
  const pandaScale = opts.lite ? PANDA_SCALE.lite : PANDA_SCALE.desktop;
  const faceShift = opts.lite ? FACE_SHIFT.lite : FACE_SHIFT.desktop;
  const faceDist = opts.lite ? FACE_DIST.lite : FACE_DIST.desktop;
  const PANDA_H = PANDA_HEIGHT * pandaScale;
  let rig: PandaRig | null = null;
  let dark = false;
  const qRoll = new THREE.Quaternion();
  const eRoll = new THREE.Euler();
  const pandaAt = new THREE.Vector3();
  const pawAt = new THREE.Vector3();
  const ndc = new THREE.Vector3();
  const ray = new THREE.Raycaster();
  const rayPt = new THREE.Vector2();
  let pointerSeen = false;
  let kick = 0;
  let pandaT0 = Infinity;

  // pivot en el centro del sistema armado: ahí gira para pararse de frente.
  const pivot = new THREE.Group();
  pivot.position.set(0, TARGET_Y.assembled, 0);
  scene.add(pivot);
  const model = new THREE.Group();
  model.position.set(0, -TARGET_Y.assembled, 0);
  pivot.add(model);

  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(W * 1.9, D * 1.9),
    new THREE.MeshBasicMaterial({ map: shadowTexture(), transparent: true, depthWrite: false, toneMapped: false }),
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -0.002;
  scene.add(shadow);

  // De frente, la sombra va atrás del sistema (debajo de la capa de abajo) y
  // apenas corrida hacia abajo de la pantalla; viaja con él cuando se inclina.
  const faceShadowMat = new THREE.MeshBasicMaterial({
    map: faceShadowTexture(),
    transparent: true,
    depthWrite: false,
    toneMapped: false,
  });
  const faceShadow = new THREE.Mesh(new THREE.PlaneGeometry(W * 1.38, D * 1.38), faceShadowMat);
  faceShadow.rotation.x = -Math.PI / 2;
  faceShadow.position.set(0, -0.08, 0.2);
  model.add(faceShadow);

  // Columnas de luz entre capas: sólo con el sistema abierto.
  const columnMat = new THREE.MeshBasicMaterial({ color: 0xc4b3fa, transparent: true, opacity: 0, toneMapped: false });
  const columnGeo = new THREE.CylinderGeometry(0.006, 0.006, 1, 8);
  columnGeo.translate(0, 0.5, 0);
  const columns: THREE.Mesh[] = [];
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const c = new THREE.Mesh(columnGeo, columnMat);
      c.position.set(sx * (W / 2 - 0.32), T, sz * (D / 2 - 0.32));
      model.add(c);
      columns.push(c);
    }
  }

  const layers: Partial<Record<(typeof LAYERS)[number], THREE.Object3D>> = {};
  const qFace = faceQuaternion();
  const qFlat = new THREE.Quaternion();
  const qTilt = new THREE.Quaternion();
  const eTilt = new THREE.Euler();
  const target = new THREE.Vector3();
  const corner = new THREE.Vector3();
  const pointer = { x: 0, y: 0, sx: 0, sy: 0 };

  // Pantalla HTML: esquinas de la pantalla del modelo, en su espacio local
  // (salen de la geometría: el plano del GLB es unitario y la medida va en la escala).
  const html = opts.screenEl ?? null;
  let quadLocal: [number, number][] = [];
  const qp = new THREE.Vector3();
  let screenMesh: THREE.Mesh | null = null;
  let screenMat: THREE.MeshBasicMaterial | null = null;
  let screenSharp: THREE.Texture | null = null;
  let screenMip: THREE.Texture | null = null;
  let progress = 0;
  let running = false;
  let raf = 0;
  let width = 1;
  let height = 1;
  let frameCb: ((l: LabelPos[]) => void) | null = null;
  const t0 = performance.now();

  const ready = (async () => {
    const draco = new DRACOLoader().setDecoderPath('/draco/');
    const loader = new GLTFLoader().setDRACOLoader(draco);
    const [gltf, screenTex, pandaRig] = await Promise.all([
      loader.loadAsync(MODEL_URL),
      new THREE.TextureLoader().loadAsync(SCREEN_URL),
      loadPandaRig(loader, { scale: pandaScale, still: opts.still }),
    ]);
    draco.dispose();
    screenTex.colorSpace = THREE.SRGBColorSpace;
    screenTex.flipY = false;
    screenTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    // Dos versiones de la captura: de frente, sin mipmaps (nítida: con mipmaps
    // se mezcla con la versión a media resolución y el texto se lava); en
    // ángulo, con mipmaps (si no, titila).
    screenSharp = screenTex.clone();
    screenSharp.generateMipmaps = false;
    screenSharp.minFilter = THREE.LinearFilter;
    screenSharp.needsUpdate = true;
    screenMip = screenTex;
    gltf.scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (mat.name.startsWith('screen')) {
        // Colores exactos de la captura, sin luz ni tone mapping encima.
        screenMat = new THREE.MeshBasicMaterial({ map: screenSharp, transparent: true, toneMapped: false });
        mesh.material = screenMat;
        screenMesh = mesh;
        mesh.geometry.computeBoundingBox();
        const bb = mesh.geometry.boundingBox!;
        quadLocal = [
          [bb.min.x, bb.min.z], // arriba izquierda (la barra de URL es -Z)
          [bb.max.x, bb.min.z], // arriba derecha
          [bb.min.x, bb.max.z], // abajo izquierda
          [bb.max.x, bb.max.z], // abajo derecha
        ];
        if (html) {
          // Sólo profundidad, y primero (opaca: las transparentes van al final):
          // así tapa lo que está atrás y deja ver la pantalla HTML de abajo.
          screenMat.transparent = false;
          screenMat.colorWrite = false;
          mesh.renderOrder = -1;
        }
        mesh.scale.multiplyScalar(SCREEN.grow);
      } else if (mat.name === 'ui_body') {
        // La placa de arriba casi blanca: al girar, su canto se lee como el
        // espesor del equipo, no como un marco lila.
        mat.color.set('#f1eff8');
        mat.roughness = 0.38;
      } else if (mat.emissiveIntensity > 1) {
        // Las pistas de luz: en Cycles se ven bien con 6–8, acá saturan.
        mat.emissiveIntensity = Math.min(mat.emissiveIntensity, 3.5);
      }
    });
    for (const name of LAYERS) layers[name] = gltf.scene.getObjectByName(name) ?? undefined;
    model.add(gltf.scene);

    rig = pandaRig;
    rig.setDark(dark);
    // Las patitas van sueltas en la escena: se apoyan en el borde del
    // dashboard, no en la cabeza (que gira para mirar).
    for (const p of rig.paws) {
      if (opts.paws) scene.add(p);
      else p.removeFromParent();
    }
    scene.add(rig.root);
    // Se asoma un ratito después de que aparece el sistema.
    pandaT0 = (performance.now() - t0) / 1000 + 0.5;
    render();
  })();

  function layout(t: number, time: number) {
    const { face, open } = timeline(t);
    // Capas: del armado al abierto.
    const order = ['infra', 'backend', 'frontend'] as const;
    order.forEach((name, i) => {
      const l = layers[name];
      if (l) l.position.y = lerp(GAPS.assembled[i], GAPS.exploded[i], open);
    });
    const front = lerp(GAPS.assembled[2], GAPS.exploded[2], open);
    for (const c of columns) c.scale.y = Math.max(front - T, 0.001);
    columnMat.opacity = open * 0.9;

    // Parado de frente ↔ acostado, más una inclinación mínima con el mouse.
    pointer.sx += (pointer.x - pointer.sx) * 0.08;
    pointer.sy += (pointer.y - pointer.sy) * 0.08;
    eTilt.set(pointer.sy * 0.06, pointer.sx * 0.1, 0);
    qTilt.setFromEuler(eTilt);
    pivot.quaternion.slerpQuaternions(qFlat, qFace, face).premultiply(qTilt);
    pivot.position.y = TARGET_Y.assembled + (opts.still ? 0 : Math.sin(time * 1.1) * 0.03);
    (shadow.material as THREE.MeshBasicMaterial).opacity = (1 - face) * 0.9;
    faceShadowMat.opacity = face * face;
    if (screenMat) screenMat.map = face > 0.92 ? screenSharp : screenMip;

    // Cámara: siempre sobre la misma dirección; cambia la distancia y la altura del foco.
    const dist = lerp(lerp(DIST.assembled, faceDist, face), opts.lite ? OPEN_LITE.dist : DIST.exploded, open);
    target.set(0, lerp(TARGET_Y.assembled, TARGET_Y.exploded, open), 0);
    // De frente, el dashboard corrido a la derecha (lugar para el panda).
    target.addScaledVector(rightS, -faceShift * face - (opts.lite ? OPEN_LITE.shift * open : 0));
    cam.position.copy(VIEW_DIR).multiplyScalar(dist).add(target);
    cam.lookAt(target);

    pandaLayout(time, face);
  }

  const easeOutBack = (x: number) => 1 + 2.4 * (x - 1) ** 3 + 1.4 * (x - 1) ** 2;

  function pandaLayout(time: number, face: number) {
    const front = layers.frontend;
    if (!front || !rig) return;
    pivot.updateMatrixWorld(true);
    // Siempre en el borde izquierdo. Cuando el sistema se acuesta para abrirse,
    // el panda se mete atrás (como si entrara a mostrarlo) y se esconde del
    // todo; al volver de frente se asoma de nuevo.
    pandaAt.set(PANDA_FACE.x, T, PANDA_FACE.z).applyMatrix4(front.matrixWorld);
    const rise = opts.still ? 1 : easeOutBack(clamp((time - pandaT0) / 0.75, 0, 1));
    const peek = rise * smooth(seg(face, 0.55, 1));
    // Atrás de la placa (sobre la línea de mirada, así no cambia dónde se ve) y
    // asomado hacia la izquierda.
    const root = rig.root;
    root.visible = peek > 0.01;
    root.position
      .copy(pandaAt)
      .addScaledVector(toCam, -0.62)
      .addScaledVector(rightS, lerp(0.6, -0.34, peek) * PANDA_H);
    eRoll.set(0, 0, PANDA_ROLL);
    qRoll.setFromEuler(eRoll);
    root.quaternion.copy(qPanda).multiply(qRoll);

    // Patitas: sobre el borde izquierdo, apenas adentro del dashboard y por
    // delante de la pantalla, los deditos hacia la derecha. Sólo de frente.
    const paws = rig.paws;
    // Se sueltan antes de que la cabeza se esconda: nunca quedan solas en el borde.
    const grip = smooth(seg(face, 0.82, 1)) * rise;
    paws.forEach((p, i) => {
      pawAt.set(PANDA_FACE.x, T, PANDA_FACE.z + (i === 0 ? 0.36 : -0.04)).applyMatrix4(front.matrixWorld);
      p.position
        .copy(pawAt)
        .addScaledVector(toCam, 0.08)
        .addScaledVector(rightS, 0.07 * pandaScale)
        .addScaledVector(upS, (1 - grip) * -0.25);
      eRoll.set(0, 0, -Math.PI / 2 + (i === 0 ? -0.15 : 0.12));
      qRoll.setFromEuler(eRoll);
      p.quaternion.copy(qPanda).multiply(qRoll);
      p.scale.setScalar(Math.max(grip, 0.0001) * pandaScale * PAW_SCALE);
      p.visible = grip > 0.01;
    });

    // Mirada: al puntero si hay mouse; si no, pasea. Con el sistema abierto baja
    // un poco la vista, hacia las capas.
    let look: { x: number; y: number } | null = null;
    if (pointerSeen) {
      ndc.copy(root.position).project(cam);
      look = { x: pointer.x - ndc.x, y: pointer.y + ndc.y };
    }
    kick *= 0.93;
    rig.update(time, look, kick, PANDA_ROLL);
  }

  function labels(t: number): LabelPos[] {
    const op = timeline(t).labels;
    scene.updateMatrixWorld();
    return LAYERS.map((name, i) => {
      const l = layers[name];
      if (!l) return { x: 0, y: 0, opacity: 0 };
      // La esquina de la placa que queda más a la izquierda en pantalla.
      let best = { x: Infinity, y: 0 };
      for (const sx of [-1, 1]) {
        for (const sz of [-1, 1]) {
          corner.set((sx * W) / 2, T / 2, (sz * D) / 2).applyMatrix4(l.matrixWorld).project(cam);
          const x = ((corner.x + 1) / 2) * width;
          if (x < best.x) best = { x, y: ((1 - corner.y) / 2) * height };
        }
      }
      return { ...best, opacity: op[i] };
    });
  }

  function render() {
    const time = (performance.now() - t0) / 1000;
    layout(progress, time);
    renderer.render(scene, cam);
    if (html && screenMesh) placeHtml(html, screenMesh);
    frameCb?.(labels(progress));
  }

  /** Calza la ventana HTML sobre la pantalla del modelo (ver opts.screenEl). */
  function placeHtml(el: HTMLElement, mesh: THREE.Mesh) {
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    if (!w || !h || quadLocal.length < 4) return;
    const dst = quadLocal.map(([x, z]) => {
      qp.set(x, 0, z).applyMatrix4(mesh.matrixWorld).project(cam);
      return [((qp.x + 1) / 2) * width, ((1 - qp.y) / 2) * height] as const;
    });
    const m = quadToQuad(w, h, dst);
    if (!m) return;
    el.style.transform = `matrix3d(${m.map((v) => v.toFixed(9)).join(',')})`;
    el.style.visibility = 'visible';
  }

  function loop() {
    render();
    raf = requestAnimationFrame(loop);
  }

  return {
    ready,
    setProgress(t) {
      progress = t;
      if (!running) render();
    },
    setPointer(x, y) {
      if (opts.still) return;
      pointer.x = x;
      pointer.y = y;
      pointerSeen = true;
    },
    releasePointer() {
      pointerSeen = false;
      pointer.x = 0;
      pointer.y = 0;
    },
    nudge(pitch) {
      kick = clamp(kick + pitch, -0.4, 0.4);
    },
    screenRect() {
      // El primer cuadro (de frente, sin inclinación), calculado aparte.
      pivot.quaternion.copy(qFace);
      pivot.position.y = TARGET_Y.assembled;
      target.set(0, TARGET_Y.assembled, 0).addScaledVector(rightS, -faceShift);
      cam.position.copy(VIEW_DIR).multiplyScalar(faceDist).add(target);
      cam.lookAt(target);
      scene.updateMatrixWorld();
      const xs: number[] = [];
      const ys: number[] = [];
      const top = GAPS.assembled[2] + SCREEN.y;
      for (const sx of [-1, 1]) {
        for (const sz of [-1, 1]) {
          corner
            .set((sx * SCREEN.w * SCREEN.grow) / 2, top, (sz * SCREEN.d * SCREEN.grow) / 2)
            .applyMatrix4(model.matrixWorld)
            .project(cam);
          xs.push(((corner.x + 1) / 2) * width);
          ys.push(((1 - corner.y) / 2) * height);
        }
      }
      render();
      const x = Math.min(...xs);
      const y = Math.min(...ys);
      return { x, y, w: Math.max(...xs) - x, h: Math.max(...ys) - y };
    },
    hitPanda(x, y) {
      if (!rig) return false;
      rayPt.set(x, -y);
      ray.setFromCamera(rayPt, cam);
      return rig.hit(ray);
    },
    setDark(on) {
      dark = on;
      rig?.setDark(on);
      if (!running) render();
    },
    poke() {
      rig?.poke((performance.now() - t0) / 1000);
    },
    setRunning(on) {
      if (on === running) return;
      running = on;
      if (on) loop();
      else cancelAnimationFrame(raf);
    },
    resize(w, h, overscan = 1) {
      if (!w || !h) return;
      width = w;
      height = h;
      renderer.setSize(w, h, false);
      cam.aspect = w / h;
      // Mismo ancho de encuadre que en Blender, a cualquier proporción. El canvas
      // sobresale del stage: se abre el FOV en la misma medida, así el objeto
      // queda del mismo tamaño y hay lugar para que nada se corte al desarmarse.
      cam.fov = THREE.MathUtils.radToDeg(
        2 * Math.atan((Math.tan(HFOV / 2) * overscan) / Math.min(cam.aspect, 1.6)),
      );
      cam.updateProjectionMatrix();
      if (!running) render();
    },
    onFrame(cb) {
      frameCb = cb;
    },
    dispose() {
      cancelAnimationFrame(raf);
      running = false;
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (!m.isMesh) return;
        m.geometry.dispose();
        const mat = m.material as THREE.MeshBasicMaterial;
        mat.map?.dispose();
        mat.dispose();
      });
      env.dispose();
      renderer.dispose();
    },
  };
}
