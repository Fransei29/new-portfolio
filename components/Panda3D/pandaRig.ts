// components/Panda3D/pandaRig.ts
// El panda 3D de la marca, listo para poner en cualquier escena de three.
// El modelo (public/hero3d/panda.glb) sale de scripts/hero3d/panda3d.py a partir
// del isotipo (public/isotipo-panda.svg): cabeza, ojos aparte para parpadear y
// dos patitas.
//
// Quien lo usa ubica `root` (posición, orientación, escala) y llama a
// `update()` en cada cuadro. El rig se encarga de los gestos: mirar (a un
// punto o pasear solo), parpadear, el salto con giro y el modo oscuro.
// Lo usa el hero 3D (SystemHero).
import * as THREE from 'three';
import type { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export const PANDA_URL = '/hero3d/panda.glb';
/** Alto de la cabeza con escala 1, en unidades del modelo. */
export const PANDA_HEIGHT = 1.066;

const INK = { light: '#2e2d3b', dark: '#4a475f' };
const SPIN = 0.95;

export type PandaRig = {
  /** Lo ubica quien lo usa. Mira hacia +Z, arriba +Y. */
  root: THREE.Group;
  /**
   * Las patitas [izq, der], sueltas (fuera de root): quien lo usa las agrega a
   * la escena y las apoya donde quiera. Cada una mira a +Z con los deditos
   * hacia +Y, como la cabeza; su escala es la del panda.
   */
  paws: THREE.Group[];
  meshes: THREE.Object3D[];
  /**
   * look: hacia dónde mirar, en -1..1 (x a la derecha, y hacia abajo), o null
   * para que pasee solo. pitch: cuánto baja la vista además (radianes).
   * roll: cuánto está inclinado root en pantalla (radianes, antihorario): la
   * mirada se pasa a los ejes de la cabeza para que "a la derecha" sea a la
   * derecha de la pantalla y no de la cabeza cruzada.
   */
  update: (time: number, look: { x: number; y: number } | null, pitch?: number, roll?: number) => void;
  /** Salto con giro. hop: altura del salto en unidades de la escena. */
  poke: (time: number) => void;
  /** Cuánto está subida la cabeza por el salto (0..1): para que las patitas la acompañen. */
  hopAt: (time: number) => number;
  hit: (ray: THREE.Raycaster) => boolean;
  setDark: (dark: boolean) => void;
  dispose: () => void;
};

const clamp = (x: number, a: number, b: number) => Math.min(b, Math.max(a, x));
const smooth = (x: number) => x * x * (3 - 2 * x);

export async function loadPandaRig(
  loader: GLTFLoader,
  // gltf: el modelo ya pedido (p. ej. apenas cargó el módulo), si lo hay.
  opts: { scale: number; still: boolean; hop?: number; gltf?: Promise<GLTF> },
): Promise<PandaRig> {
  const gltf = await (opts.gltf ?? loader.loadAsync(PANDA_URL));
  const H = PANDA_HEIGHT * opts.scale;
  const hop = opts.hop ?? 0.2 * H;

  const root = new THREE.Group();
  const body = new THREE.Group(); // gestos: mirada, salto
  root.add(body);
  gltf.scene.scale.setScalar(opts.scale);
  body.add(gltf.scene);
  root.updateMatrixWorld(true);

  const meshes: THREE.Object3D[] = [];
  const mats: THREE.MeshStandardMaterial[] = [];
  let ink: THREE.MeshStandardMaterial | null = null;
  gltf.scene.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh) return;
    meshes.push(o);
    for (const m of Array.isArray(mesh.material) ? mesh.material : [mesh.material]) {
      const sm = m as THREE.MeshStandardMaterial;
      mats.push(sm);
      if (m.name === 'panda_ink') {
        ink = sm;
        // Un poco menos de brillo en el carbón: que se note el volumen, sin reflejo.
        sm.roughness = 0.62;
      }
      // El barniz del modelo hacía brillar mucho los ojos: mate, como el 2D.
      if (m.name === 'panda_eye') {
        (sm as unknown as { clearcoat: number }).clearcoat = 0;
        sm.roughness = 0.6;
      }
    }
  });
  const eyes = ['panda_eye_l', 'panda_eye_r']
    .map((n) => gltf.scene.getObjectByName(n))
    .filter((o): o is THREE.Object3D => !!o);
  // Las patitas salen del modelo y quedan cada una en su grupo, con la
  // rotación base del nodo raíz del GLB adentro: así el grupo se orienta igual
  // que root.
  const base = gltf.scene.getObjectByName('panda');
  const paws: THREE.Group[] = [];
  for (const n of ['panda_paw_l', 'panda_paw_r']) {
    const m = gltf.scene.getObjectByName(n);
    if (!m || !base) continue;
    m.removeFromParent();
    m.position.set(0, 0, 0);
    m.quaternion.copy(base.quaternion);
    const g = new THREE.Group();
    g.add(m);
    g.scale.setScalar(opts.scale);
    paws.push(g);
  }

  const look = { x: 0, y: 0 };
  let blinkAt = 2 + Math.random() * 2;
  let blinkT0 = -1;
  let spinT0 = -1;

  return {
    root,
    paws,
    meshes,
    update(time, target, pitch = 0, roll = 0) {
      // Primero en ejes de pantalla (x a la derecha, y hacia abajo)...
      let sx: number;
      let sy: number;
      if (target) {
        sx = clamp(target.x * 0.7, -0.65, 0.65);
        sy = clamp(target.y * 0.55, -0.35, 0.4);
      } else if (opts.still) {
        sx = 0;
        sy = 0;
      } else {
        // Pasea de lado a lado, con la vista apenas hacia abajo (al contenido).
        sx = Math.sin(time * 0.55) * 0.35 + Math.sin(time * 0.21) * 0.15;
        sy = Math.sin(time * 0.43) * 0.06 + 0.08;
      }
      sy += pitch;
      // ...y después en los de la cabeza, que puede estar cruzada.
      const c = Math.cos(roll);
      const sn = Math.sin(roll);
      const tx = sx * c - sy * sn;
      const ty = sx * sn + sy * c;
      look.x += (tx - look.x) * 0.08;
      look.y += (ty - look.y) * 0.08;

      const s = spinT0 < 0 ? 1 : clamp((time - spinT0) / SPIN, 0, 1);
      const spin = s < 1 ? smooth(s) * Math.PI * 2 : 0;
      body.rotation.set(look.y, look.x + spin, opts.still ? 0 : Math.sin(time * 0.9) * 0.035);
      body.position.set(0, s < 1 ? Math.sin(Math.PI * s) * hop : 0, 0);

      // Parpadeo cada 2.5–5.5 s: los ojos se aplastan en su eje vertical (z del nodo).
      if (!opts.still && time > blinkAt) {
        blinkT0 = time;
        blinkAt = time + 2.5 + Math.random() * 3;
      }
      const b = blinkT0 < 0 ? 1 : (time - blinkT0) / 0.16;
      const lid = b < 1 ? 1 - 0.88 * Math.sin(Math.PI * b) : 1;
      for (const e of eyes) e.scale.z = lid;
    },
    hopAt(time) {
      const s = spinT0 < 0 ? 1 : clamp((time - spinT0) / SPIN, 0, 1);
      return s < 1 ? Math.sin(Math.PI * s) : 0;
    },
    poke(time) {
      if (opts.still || (spinT0 >= 0 && time - spinT0 < SPIN)) return;
      spinT0 = time;
    },
    hit(ray) {
      return ray.intersectObjects(meshes, false).length > 0;
    },
    setDark(dark) {
      (ink as THREE.MeshStandardMaterial | null)?.color.set(dark ? INK.dark : INK.light);
    },
    dispose() {
      for (const o of meshes) (o as THREE.Mesh).geometry.dispose();
      for (const m of mats) m.dispose();
    },
  };
}
