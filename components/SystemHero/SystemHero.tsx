'use client';

// components/SystemHero/SystemHero.tsx
// Hero de prueba con el producto en 3D (ruta /hero-3d). El texto es el mismo
// HomeText de la home; a la derecha, en vez del dashboard 2D, el sistema en
// capas con el panda de la marca asomado atrás. Mientras carga el modelo se ve
// el póster (la captura del dashboard), ubicado justo donde cae el primer
// cuadro 3D, así el cambio no salta; el panda entra después, asomándose.
//
// El scroll no maneja nada (pinear el hero para animarlo se sentía trabado):
// el dashboard queda de frente con el panda asomado, y se abre en capas a
// pedido, con un clic en el dashboard o en el botón de abajo; otro clic lo
// vuelve a armar. En desktop el panda sigue el mouse con la mirada; en el celu
// mira solo. Tocar al panda lo hace saltar (no abre nada).
// Reduced motion o sin WebGL: queda el póster, con el panda plano.
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import HomeText from '../HomeText/HomeText';
import HeroDashboard from '../HeroDashboard/HeroDashboard';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './SystemHero.module.scss';
import type { LabelPos, SystemEngine } from './systemEngine';

const LABELS = [
  { title: 'Frontend & UI', es: 'Lo que usan tus clientes', en: 'What your customers use' },
  { title: 'Backend & APIs', es: 'Lógica, pagos e integraciones', en: 'Logic, payments and integrations' },
  { title: 'Infra & DevOps', es: 'Servidores, datos y monitoreo', en: 'Servers, data and monitoring' },
];

// Hasta dónde avanza la timeline del motor al abrir: acostado, en capas y con
// las etiquetas a la vista.
const OPEN_AT = 0.4;
const OPEN_MS = 1300;
const CLOSE_MS = 1050;

function webglAvailable() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

export default function SystemHero() {
  const { language } = useLanguage();
  const lang = language === 'es' ? 'es' : 'en';
  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [live, setLive] = useState(false);
  const [open, setOpen] = useState(false);
  // Sin 3D: el póster queda para siempre y lleva el panda plano.
  const [flat, setFlat] = useState(false);
  // El efecto deja acá cómo pedirle al motor que abra o cierre.
  const toggleRef = useRef<((open: boolean) => void) | null>(null);
  const hitRef = useRef<((x: number, y: number) => boolean) | null>(null);
  const openRef = useRef(false);
  const toggle = () => {
    openRef.current = !openRef.current;
    setOpen(openRef.current);
    toggleRef.current?.(openRef.current);
  };
  // El globito del panda invita a abrir: al tocarlo, el panda salta y se abre.
  const pokeRef = useRef<(() => void) | null>(null);
  const openFromPanda = () => {
    pokeRef.current?.();
    toggle();
  };

  // La pantalla del dashboard es el HeroDashboard de verdad (HTML vivo y
  // nítido). Se monta por portal en un nodo de la capa .cssLayer, y el motor lo
  // calza en 3D sobre la pantalla del modelo.
  const cssLayerRef = useRef<HTMLDivElement>(null);
  const [screenEl, setScreenEl] = useState<HTMLDivElement | null>(null);
  const [noHtml, setNoHtml] = useState(false);
  useEffect(() => {
    const layer = cssLayerRef.current;
    // En el celu el HeroDashboard cambia de diseño (sus media queries miran la
    // ventana, no el contenedor) y calzado en 3D queda estirado: ahí va la
    // captura como textura.
    if (!layer || window.matchMedia('(max-width: 768px)').matches) {
      setScreenEl(null);
      setNoHtml(true);
      return;
    }
    const el = document.createElement('div');
    el.className = styles.cssScreen;
    layer.appendChild(el);
    setScreenEl(el);
    return () => el.remove();
  }, []);

  useEffect(() => {
    if (!screenEl && !noHtml) return;
    const track = trackRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!track || !stage || !canvas) return;

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (still || !webglAvailable()) {
      setFlat(true);
      return;
    }
    const mobile = window.matchMedia('(max-width: 768px)').matches;
    const lite = mobile || window.matchMedia('(pointer: coarse)').matches;

    let engine: SystemEngine | null = null;
    let disposed = false;
    const cleanups: (() => void)[] = [];

    // Abrir/cerrar: la timeline va de 0 (de frente) a OPEN_AT en un tiempo fijo
    // con aceleración y frenado parejos (no una curva que arranca de golpe y
    // frena eterno). Si se interrumpe, sigue desde donde está.
    let p = 0;
    let goal = 0;
    let tween = 0;
    let from = 0;
    let t0 = 0;
    let dur = 1;
    let loaded = false;
    const update = () => {
      engine?.setProgress(p);
      // El póster (la captura) sólo mientras carga el 3D.
      if (posterRef.current) posterRef.current.style.opacity = loaded ? '0' : '1';
    };
    const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2);
    const step = (now: number) => {
      const k = Math.min(1, (now - t0) / dur);
      p = from + (goal - from) * easeInOut(k);
      update();
      tween = k < 1 ? requestAnimationFrame(step) : 0;
    };
    toggleRef.current = (o) => {
      goal = o ? OPEN_AT : 0;
      from = p;
      t0 = performance.now();
      // Abrir un poco más lento que cerrar; un tramo parcial dura en proporción.
      dur = (o ? OPEN_MS : CLOSE_MS) * Math.max(0.35, Math.abs(goal - from) / OPEN_AT);
      cancelAnimationFrame(tween);
      tween = requestAnimationFrame(step);
    };
    // Coordenadas del puntero normalizadas al canvas (-1..1, y hacia abajo).
    // El canvas sobresale del stage (ver .canvas): todo lo del motor va en su espacio.
    const local = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return [((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1] as const;
    };
    const onPointer = (e: PointerEvent) => {
      const [x, y] = local(e);
      engine?.setPointer(x, y);
      // Todo el stage es clickeable (abre/cierra); el panda, además, salta.
      if (Math.abs(x) <= 1 && Math.abs(y) <= 1) stage.style.cursor = 'pointer';
    };
    // En el celu no hay mouse: el panda mira hacia donde tocás (y un rato
    // después vuelve a mirar solo), sigue la inclinación del teléfono si el
    // navegador la da sin pedir permiso, y el scroll le mueve la mirada.
    let release = 0;
    const lookAtTouch = (e: PointerEvent) => {
      if (!lite) return;
      const [x, y] = local(e);
      engine?.setPointer(x, y);
      window.clearTimeout(release);
      release = window.setTimeout(() => engine?.releasePointer(), 2500);
    };
    let tilt0: { b: number; g: number } | null = null;
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.beta == null || e.gamma == null || !engine) return;
      // Relativo a cómo se agarró el teléfono al principio.
      tilt0 ??= { b: e.beta, g: e.gamma };
      const x = Math.max(-1.5, Math.min(1.5, (e.gamma - tilt0.g) / 18));
      const y = Math.max(-1.5, Math.min(1.5, (e.beta - tilt0.b) / 18));
      if (Math.abs(x) + Math.abs(y) < 0.08) return;
      engine.setPointer(x, y);
      window.clearTimeout(release);
      release = window.setTimeout(() => engine?.releasePointer(), 1500);
    };
    let lastY = window.scrollY;
    const onScroll = () => {
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      // Bajás: mira para abajo; subís: para arriba.
      engine?.nudge(Math.max(-0.08, Math.min(0.08, dy * 0.004)));
    };
    const onTap = (e: PointerEvent) => {
      lookAtTouch(e);
      const [x, y] = local(e);
      if (Math.abs(x) > 1 || Math.abs(y) > 1 || !engine) return;
      if (engine.hitPanda(x, y)) engine.poke();
    };
    // Del espacio del canvas al del stage.
    const off = () => [canvas.offsetLeft, canvas.offsetTop] as const;
    const fit = (e: SystemEngine) => e.resize(canvas.clientWidth, canvas.clientHeight, canvas.clientWidth / stage.clientWidth);
    const placePoster = (e: SystemEngine) => {
      const r = e.screenRect();
      const [ox, oy] = off();
      // El rectángulo del dashboard de frente, para ubicar el globito del panda.
      stage.style.setProperty('--dx', `${r.x + ox}px`);
      stage.style.setProperty('--dy', `${r.y + oy}px`);
      stage.style.setProperty('--dw', `${r.w}px`);
      stage.style.setProperty('--dh', `${r.h}px`);
      for (const box of [posterRef.current]) {
        if (!box) continue;
        box.style.left = `${r.x + ox}px`;
        box.style.top = `${r.y + oy}px`;
        box.style.width = `${r.w}px`;
        box.style.height = `${r.h}px`;
      }
    };

    import('./systemEngine').then(({ createSystemEngine }) => {
      if (disposed) return;
      // ?patitas=0 las saca, para comparar.
      const paws = new URLSearchParams(window.location.search).get('patitas') !== '0';
      const e = createSystemEngine(canvas, {
        lite,
        still: false,
        paws,
        screenEl: screenEl ?? undefined,
      });
      engine = e;
      hitRef.current = (x, y) => e.hitPanda(x, y);
      pokeRef.current = () => e.poke();
      e.onFrame((labels: LabelPos[]) => {
        const [ox, oy] = off();
        labels.forEach((l, i) => {
          const el = labelRefs.current[i];
          if (!el) return;
          el.style.opacity = l.opacity.toFixed(3);
          // A la izquierda de la placa; en pantallas angostas no pasa del borde de la página.
          const minLeft = 4 - stage.getBoundingClientRect().left;
          const left = Math.max(l.x + ox - 14 - el.offsetWidth, minLeft);
          // Píxeles enteros (y el -50% resuelto acá): con medios píxeles el texto se desenfoca.
          const top = Math.round(l.y + oy - el.offsetHeight / 2);
          el.style.transform = `translate(${Math.round(left)}px, ${top}px)`;
        });
      });
      fit(e);
      placePoster(e);
      update();
      const html = document.documentElement;
      const syncTheme = () => e.setDark(html.classList.contains('dark'));
      syncTheme();
      const mo = new MutationObserver(syncTheme);
      mo.observe(html, { attributes: true, attributeFilter: ['class'] });
      cleanups.push(() => mo.disconnect());
      e.ready
        .then(() => {
          if (disposed) return;
          loaded = true;
          update();
          setLive(true);
        })
        .catch(() => {
          // Si el modelo no carga, queda el póster.
        });

      const ro = new ResizeObserver(() => {
        fit(e);
        placePoster(e);
        update();
      });
      ro.observe(stage);
      const io = new IntersectionObserver(([entry]) => e.setRunning(entry.isIntersecting));
      io.observe(stage);
      window.addEventListener('pointerdown', onTap, { passive: true });
      if (!lite) window.addEventListener('pointermove', onPointer, { passive: true });
      if (lite) {
        window.addEventListener('pointermove', lookAtTouch, { passive: true });
        window.addEventListener('deviceorientation', onTilt);
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      cleanups.push(() => {
        ro.disconnect();
        io.disconnect();
        window.removeEventListener('pointerdown', onTap);
        window.removeEventListener('pointermove', onPointer);
        window.removeEventListener('pointermove', lookAtTouch);
        window.removeEventListener('deviceorientation', onTilt);
        window.removeEventListener('scroll', onScroll);
        window.clearTimeout(release);
        e.dispose();
      });
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(tween);
      toggleRef.current = null;
      cleanups.forEach((fn) => fn());
    };
  }, [screenEl, noHtml]);

  // Clic en el stage: abre/cierra, salvo que sea el panda (ese salta).
  const onStageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const t = e.target as HTMLElement;
    if (t.closest('button') || !live) return;
    const r = (canvasRef.current ?? e.currentTarget).getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 2 - 1;
    const y = ((e.clientY - r.top) / r.height) * 2 - 1;
    if (hitRef.current?.(x, y)) return;
    toggle();
  };

  return (
    <section ref={trackRef} data-system-hero>
      <div className="hero-section">
        <div className="home-text">
          <div className="home-textA">
            <HomeText />
          </div>
          <div className="home-textB">
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions -- el botón de abajo es la versión accesible */}
            <div ref={stageRef} className={`${styles.stage} ${live ? styles.live : ''}`} onClick={onStageClick}>
              {/* Póster: el dashboard plano donde cae el primer cuadro 3D. El panda no:
                  aparece ya en 3D, asomándose apenas carga el modelo. */}
              <div ref={posterRef} className={styles.poster} aria-hidden="true">
                {flat && (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element -- SVG: next/image no lo optimiza */}
                    <img className={`${styles.posterPanda} ${styles.pandaLight}`} src="/isotipo-panda.svg" alt="" />
                    {/* eslint-disable-next-line @next/next/no-img-element -- SVG: next/image no lo optimiza */}
                    <img className={`${styles.posterPanda} ${styles.pandaDark}`} src="/isotipo-panda-contorno.svg" alt="" />
                  </>
                )}
                {/* eslint-disable-next-line @next/next/no-img-element -- póster que coincide con el primer cuadro 3D */}
                <img className={styles.posterScreen} src="/hero3d/screen.webp" alt="" />
              </div>
              <div ref={cssLayerRef} className={styles.cssLayer} aria-hidden="true" />
              <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
              {screenEl && createPortal(<HeroDashboard bare />, screenEl)}
              {LABELS.map((l, i) => (
                <div
                  key={l.title}
                  ref={(el) => {
                    labelRefs.current[i] = el;
                  }}
                  className={styles.label}
                >
                  <b>{l.title}</b>
                  <small>{l[lang]}</small>
                </div>
              ))}
              {live && !open && (
                // El panda "dice" que se puede mirar adentro (como el </> del
                // isotipo programando). Entra un rato después de que se asoma.
                <button type="button" className={styles.pandaBubble} onClick={openFromPanda}>
                  <span className={styles.bubbleCode} aria-hidden="true">
                    {'</>'}
                  </span>
                  {lang === 'es' ? '¿Espiamos?' : 'Peek inside?'}
                </button>
              )}
              {live && open && (
                <button
                  type="button"
                  className={styles.backButton}
                  onClick={toggle}
                  aria-label={lang === 'es' ? 'Volver al dashboard' : 'Back to the dashboard'}
                  title={lang === 'es' ? 'Volver al dashboard' : 'Back to the dashboard'}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                    <path
                      d="M9 14 4 9l5-5M4 9h10.5a5.5 5.5 0 0 1 0 11H11"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
