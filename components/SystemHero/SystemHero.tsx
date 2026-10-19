'use client';

// components/SystemHero/SystemHero.tsx
// Hero de la home con el producto en 3D. El texto es el mismo
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
import type { HeadPos, LabelPos, SystemEngine } from './systemEngine';

// El motor (three.js) empieza a bajar apenas se carga este módulo, no recién
// cuando corre el efecto del hero.
const enginePromise = typeof window === 'undefined' ? null : import('./systemEngine');

// El globito del isotipo programando (public/isotipo-panda-programando.svg).
const BUBBLE_FILL = 'M777.74,294.42v48.4c0,11-8.92,19.92-19.95,19.92h-134.32c-7.34,13.98-32.23,24.26-61.8,24.26-2.08,0-4.14-.06-6.17-.17,18.98-1.31,34.54-11.11,39.4-24.09h-8.17c-11,0-19.92-8.92-19.92-19.92v-48.4c0-11,8.92-19.95,19.92-19.95h171.05c11.03,0,19.95,8.95,19.95,19.95Z';
const BUBBLE_OUTLINE = 'M757.79,274.47c11.03,0,19.95,8.95,19.95,19.95v48.4c0,11-8.92,19.92-19.95,19.92h-134.32c-7.33,13.98-32.23,24.26-61.79,24.26-2.08,0-4.14-.06-6.17-.17,18.98-1.31,34.54-11.11,39.4-24.09h-8.17c-11,0-19.92-8.92-19.92-19.92v-48.4c0-11,8.92-19.95,19.92-19.95h171.05M757.79,262.21h-171.05c-17.75,0-32.19,14.45-32.19,32.21v48.4c0,11.85,6.44,22.22,15.99,27.81-4.62,2.15-10.08,3.57-15.88,3.97-6.46.44-11.47,5.84-11.42,12.32.04,6.48,5.12,11.8,11.59,12.16,2.24.12,4.54.19,6.84.19,30.11,0,55.76-9.32,68.23-24.26h127.88c17.76,0,32.21-14.44,32.21-32.18v-48.4c0-17.76-14.45-32.21-32.21-32.21h0Z';
const BUBBLE_CODE = [
  'M654.62,338.29l-33.3-14.15v-14.87l33.3-14.06v12.21l-23.6,8.97v1.21l23.6,8.97v11.72Z',
  'M656.88,350.98l20.05-64.75h10.75l-20.13,64.75h-10.67Z',
  'M689.94,338.29v-11.72l23.6-8.97v-1.21l-23.6-8.97v-12.21l33.3,14.06v14.87l-33.3,14.15Z',
];

const LABELS = [
  { title: 'Frontend & UI', es: 'Lo que usan tus clientes', en: 'What your customers use' },
  { title: 'Backend & APIs', es: 'Lógica, pagos e integraciones', en: 'Logic, payments and integrations' },
  { title: 'Infra & DevOps', es: 'Servidores, datos y monitoreo', en: 'Servers, data and monitoring' },
];

// Hasta dónde avanza la timeline del motor al abrir: acostado, en capas y con
// las etiquetas a la vista.
const OPEN_AT = 0.4;
const OPEN_MS = 1300;
// Sin interacción, el sistema se abre solo: después de que el panda se asoma
// y el globito tuvo su rato.
const AUTO_OPEN_MS = 7000;
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
  // Si el usuario ya abrió o cerró, no se abre solo.
  const touchedRef = useRef(false);
  // El clic que abrió no tiene que cerrarlo en el listener de toda la página.
  const handledRef = useRef<Event | null>(null);
  const toggle = (e?: { nativeEvent: Event }) => {
    if (e) handledRef.current = e.nativeEvent;
    touchedRef.current = true;
    openRef.current = !openRef.current;
    setOpen(openRef.current);
    toggleRef.current?.(openRef.current);
  };
  // El globito del panda invita a abrir: al tocarlo, el panda salta y se abre.
  const pokeRef = useRef<(() => void) | null>(null);
  const openFromPanda = (e: React.MouseEvent) => {
    pokeRef.current?.();
    toggle(e);
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
    let autoOpen = 0;
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

    (enginePromise ?? import('./systemEngine')).then(({ createSystemEngine }) => {
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
      // Posición suavizada de cada etiqueta: el sistema flota y se inclina con
      // el mouse, y seguirlo al píxel entero la hacía temblar.
      const smoothed: ({ x: number; y: number } | null)[] = [];
      e.onFrame((labels: LabelPos[], head: HeadPos) => {
        const [ox, oy] = off();
        // El globito sale de la cabeza del panda: la sigue cuadro a cuadro.
        stage.style.setProperty('--hx', `${(head.x + ox).toFixed(1)}px`);
        stage.style.setProperty('--hy', `${(head.y + oy).toFixed(1)}px`);
        labels.forEach((l, i) => {
          const el = labelRefs.current[i];
          if (!el) return;
          el.style.opacity = l.opacity.toFixed(3);
          if (l.opacity < 0.01) {
            smoothed[i] = null;
            return;
          }
          // A la izquierda de la placa; en pantallas angostas no pasa del borde de la página.
          const minLeft = 4 - stage.getBoundingClientRect().left;
          // En el celu la etiqueta se mete un poco sobre el borde de su placa:
          // así quedan pegadas al sistema y no contra el borde de la pantalla.
          const gap = lite ? -26 : 14;
          const x = Math.max(l.x + ox - gap - el.offsetWidth, minLeft);
          const y = l.y + oy - el.offsetHeight / 2;
          // Al aparecer va directo; después sigue al sistema con retardo.
          const sm = (smoothed[i] ??= { x, y });
          sm.x += (x - sm.x) * 0.12;
          sm.y += (y - sm.y) * 0.12;
          // Medios píxeles con translate3d: se mueve parejo en vez de a saltos de 1px.
          el.style.transform = `translate3d(${sm.x.toFixed(2)}px, ${sm.y.toFixed(2)}px, 0)`;
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
          // Si nadie lo toca, a los pocos segundos se abre solo, una vez.
          autoOpen = window.setTimeout(() => {
            if (touchedRef.current || openRef.current) return;
            touchedRef.current = true;
            openRef.current = true;
            setOpen(true);
            toggleRef.current?.(true);
          }, AUTO_OPEN_MS);
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
      // Abierto, un clic en cualquier lado de la página lo vuelve a armar.
      const onDocClick = (ev: MouseEvent) => {
        if (!openRef.current || handledRef.current === ev) return;
        touchedRef.current = true;
        openRef.current = false;
        setOpen(false);
        toggleRef.current?.(false);
      };
      document.addEventListener('click', onDocClick);
      cleanups.push(() => {
        document.removeEventListener('click', onDocClick);
        window.clearTimeout(autoOpen);
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
    // Abierto, el listener de toda la página lo cierra.
    if (t.closest('button') || !live || openRef.current) return;
    const r = (canvasRef.current ?? e.currentTarget).getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 2 - 1;
    const y = ((e.clientY - r.top) / r.height) * 2 - 1;
    if (hitRef.current?.(x, y)) return;
    toggle(e);
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
                <img className={styles.posterScreen} src="/hero3d/screen.webp" alt="" crossOrigin="anonymous" />
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
                // El globito del isotipo programando, tal cual y sin texto:
                // abre el sistema. Entra un rato después de que el panda se asoma.
                <button
                  type="button"
                  className={styles.pandaBubble}
                  onClick={openFromPanda}
                  aria-label={lang === 'es' ? 'Ver cómo está hecho' : 'See how it is built'}
                  title={lang === 'es' ? 'Ver cómo está hecho' : 'See how it is built'}
                >
                  <svg viewBox="554 262 236 113" overflow="visible" aria-hidden="true">
                    {/* Espejado: la cabeza está inclinada a la izquierda, así que el
                        globo se abre hacia arriba a la izquierda (al aire, no sobre
                        el dashboard) y la colita, abajo a la derecha, sale de la
                        coronilla. El </> queda derecho. */}
                    <g transform="translate(1344.5 0) scale(-1 1)">
                      <path className={styles.bubbleFill} d={BUBBLE_FILL} />
                      <path className={styles.bubbleInk} d={BUBBLE_OUTLINE} />
                    </g>
                    <g className={styles.bubbleInk}>
                      {BUBBLE_CODE.map((c) => (
                        <path key={c} d={c} />
                      ))}
                    </g>
                  </svg>
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
