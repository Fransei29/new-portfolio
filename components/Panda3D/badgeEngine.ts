// components/Panda3D/badgeEngine.ts
// Un panda 3D suelto en un canvas chico (lo usa PandaBadge). Mira a cámara,
// sigue el puntero con la mirada (o pasea solo en el celu), parpadea, y salta
// con giro cuando se lo piden. Corre sólo mientras el canvas está a la vista.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { loadPandaRig, PANDA_HEIGHT, type PandaRig } from './pandaRig';

export type BadgeEngine = {
  ready: Promise<void>;
  /** Puntero en coordenadas de la ventana. */
  setPointer: (x: number, y: number) => void;
  poke: () => void;
  setDark: (dark: boolean) => void;
  setRunning: (on: boolean) => void;
  resize: (w: number, h: number) => void;
  dispose: () => void;
};

// Cuánto del alto del canvas ocupa la cabeza: deja aire para el salto y el giro.
const FILL = 0.52;

export function createBadgeEngine(canvas: HTMLCanvasElement, opts: { lite: boolean }): BadgeEngine {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = env;
  scene.environmentIntensity = 0.7;
  pmrem.dispose();
  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(-2, 3, 3);
  scene.add(key);
  // Contraluz lila fuerte: la sección es lila oscuro y el carbón del panda se
  // perdería en el fondo sin un borde de luz.
  const rim = new THREE.DirectionalLight(0xc9b8ff, 2.4);
  rim.position.set(2.5, 2, -3);
  scene.add(rim);

  const cam = new THREE.PerspectiveCamera(24, 1, 0.1, 50);
  // Distancia para que la cabeza ocupe FILL del alto con este FOV.
  const dist = PANDA_HEIGHT / FILL / (2 * Math.tan((24 * Math.PI) / 180 / 2));
  cam.position.set(0, 0, dist);

  let rig: PandaRig | null = null;
  let running = false;
  let raf = 0;
  let dark = true;
  const pointer = { x: 0, y: 0, seen: false };
  const t0 = performance.now();

  const ready = (async () => {
    const draco = new DRACOLoader().setDecoderPath('/draco/');
    rig = await loadPandaRig(new GLTFLoader().setDRACOLoader(draco), { scale: 1, still: false, hop: 0.22 });
    draco.dispose();
    // Sin patitas: acá el panda viaja solo por el eje, no se agarra de nada.
    scene.add(rig.root);
    rig.setDark(dark);
    render();
  })();

  function render() {
    const time = (performance.now() - t0) / 1000;
    if (rig) {
      let look: { x: number; y: number } | null = null;
      if (pointer.seen) {
        const r = canvas.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        // Normalizado a media ventana: mira de verdad hacia donde está el mouse.
        look = { x: (pointer.x - cx) / (window.innerWidth * 0.5), y: (pointer.y - cy) / (window.innerHeight * 0.5) };
      }
      rig.update(time, look);
    }
    renderer.render(scene, cam);
  }

  function loop() {
    render();
    raf = requestAnimationFrame(loop);
  }

  return {
    ready,
    setPointer(x, y) {
      if (opts.lite) return;
      pointer.x = x;
      pointer.y = y;
      pointer.seen = true;
    },
    poke() {
      rig?.poke((performance.now() - t0) / 1000);
    },
    setDark(on) {
      dark = on;
      rig?.setDark(on);
      if (!running) render();
    },
    setRunning(on) {
      if (on === running) return;
      running = on;
      if (on) loop();
      else cancelAnimationFrame(raf);
    },
    resize(w, h) {
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      cam.aspect = w / h;
      cam.updateProjectionMatrix();
      if (!running) render();
    },
    dispose() {
      cancelAnimationFrame(raf);
      running = false;
      rig?.dispose();
      env.dispose();
      renderer.dispose();
    },
  };
}
