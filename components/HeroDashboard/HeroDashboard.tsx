'use client';

import React, { useEffect, useState, useRef } from 'react';
import styles from './HeroDashboard.module.scss';
import { useLanguage } from '../../contexts/LanguageContext';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Contador animado, versión tranquila.
 *
 * Antes los tres números arrancaban juntos con easeOutCubic: entraban rápido y
 * frenaban de golpe, lo que leía como parpadeo. Ahora usan easeInOutQuart —
 * arranca y termina quieto, todo el movimiento pasa en el medio — con un
 * `delay` distinto por tarjeta para que la fila se actualice en cascada en vez
 * de saltar en bloque.
 *
 * El valor se redondea acá y solo se llama a setValue cuando el entero cambia:
 * evita un re-render por frame (60/s) para un número que muestra 2 dígitos.
 */
function useAnimatedNumber(target: number, { duration = 1100, delay = 0 } = {}) {
  const [value, setValue] = useState(target);
  const raf = useRef<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Se lee de un ref para que el efecto no dependa de `value` y se reinicie solo
  // cuando cambia el target.
  const valueRef = useRef(target);
  valueRef.current = value;

  useEffect(() => {
    const start = valueRef.current;
    if (start === target) return;

    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }

    const run = () => {
      const startTime = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        // easeInOutQuart: entra y sale sin sobresalto.
        const eased =
          progress < 0.5
            ? 8 * progress * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 4) / 2;
        const next = Math.round(start + (target - start) * eased);
        setValue((prev) => (prev === next ? prev : next));
        if (progress < 1) raf.current = requestAnimationFrame(tick);
      };
      raf.current = requestAnimationFrame(tick);
    };

    if (delay > 0) timer.current = setTimeout(run, delay);
    else run();

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [target, duration, delay]);

  return value;
}

// ---------------------------------------------------------------------------
// Sparkline de conversion
//
// Antes el `d` del path era una constante: la curva era la MISMA para las cinco
// tareas aunque el número de conversion cambiara, así que línea y dato se
// contradecían. Ahora cada tarea trae su serie y el path se deriva de ella.
//
// Se hace a mano (no Chart.js) a propósito: son ~30 líneas contra ~200KB de
// librería, el SVG sigue siendo animable pieza por pieza para el efecto de
// explosión al scroll, y el control estético queda acá y no en los defaults de
// un tercero.
// ---------------------------------------------------------------------------
const CHART = { w: 400, h: 58, padX: 8, padTop: 11, padBottom: 12 };

/**
 * Catmull-Rom a bézier cúbica: pasa por todos los puntos con tangentes
 * continuas, así que la curva queda suave sin los picos de una polilínea.
 * `tension` 6 es el valor estándar (curva natural); más alto = más recta.
 */
function seriesToPath(series: number[]) {
  const { w, h, padX, padTop, padBottom } = CHART;
  if (series.length < 2) return '';

  const min = Math.min(...series);
  const max = Math.max(...series);
  // Rango mínimo de 1 para que una serie plana no divida por cero ni se pegue
  // al borde superior.
  const span = Math.max(max - min, 1);

  const pts = series.map((v, i) => ({
    x: padX + (i * (w - padX * 2)) / (series.length - 1),
    y: padTop + (1 - (v - min) / span) * (h - padTop - padBottom),
  }));

  let d = `M${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
  }
  return d;
}

/** Cierra la curva contra la base para el área con degradado. */
function pathToArea(d: string) {
  const { w, h, padX } = CHART;
  return d ? `${d} L${w - padX},${h} L${padX},${h} Z` : '';
}

/** Último punto de la serie — ahí va el dot final. */
function seriesEndPoint(series: number[]) {
  const { w, h, padX, padTop, padBottom } = CHART;
  const min = Math.min(...series);
  const max = Math.max(...series);
  const span = Math.max(max - min, 1);
  const last = series[series.length - 1];
  return {
    x: w - padX,
    y: padTop + (1 - (last - min) / span) * (h - padTop - padBottom),
  };
}

const TASKS = [
  {
    slug: 'starton-rebuild',
    week: 'Week 6 of 6',
    stats: { conversion: 27, latency: 140, incidents: 0, checks: 47, infraProgress: 98 },
    series: [11, 13, 12, 16, 19, 18, 22, 24, 27],
  },
  {
    slug: 'auth-flow-redesign',
    week: 'Week 3 of 3',
    stats: { conversion: 24, latency: 118, incidents: 0, checks: 32, infraProgress: 97 },
    series: [9, 10, 14, 13, 16, 18, 17, 21, 24],
  },
  {
    slug: 'dashboard-v2',
    week: 'Week 8 of 8',
    stats: { conversion: 25, latency: 165, incidents: 1, checks: 74, infraProgress: 96 },
    series: [12, 11, 15, 14, 18, 17, 20, 22, 25],
  },
  {
    slug: 'payments-integration',
    week: 'Week 2 of 2',
    stats: { conversion: 30, latency: 110, incidents: 0, checks: 26, infraProgress: 98 },
    series: [13, 15, 18, 17, 21, 20, 24, 27, 30],
  },
];

/**
 * Plazas donde hay trabajo entregado.
 *
 * Derivadas a mano de las `locations` de app/data/projects.ts — no se importan
 * de ahí a propósito: ese módulo arrastra el catálogo entero de case studies
 * (decenas de KB de prosa) y esto es un adorno del hero que sólo necesita un
 * puñado de strings. El contrato es el comentario: si se suma un país en
 * projects.ts, se suma acá.
 *
 * El orden no es alfabético sino de peso: primero donde más se entregó, para
 * que las primeras vueltas del ciclo muestren lo más representativo. Igual se
 * alternan los países, que dos ciudades seguidas de la misma bandera se leen
 * como un cambio a medias.
 *
 * Lo que se muestra es `city` + bandera; `country` sólo alimenta el conteo del
 * texto de lector de pantalla.
 */
const MARKETS = [
  { flag: '🇨🇦', city: 'Toronto', country: 'Canada' },
  { flag: '🇦🇷', city: 'Buenos Aires', country: 'Argentina' },
  { flag: '🇺🇸', city: 'California', country: 'United States' },
  { flag: '🇮🇹', city: 'Torino', country: 'Italy' },
  { flag: '🇪🇸', city: 'Andalucía', country: 'Spain' },
  { flag: '🇨🇦', city: 'Vancouver', country: 'Canada' },
  { flag: '🇨🇱', city: 'Santiago', country: 'Chile' },
  { flag: '🇦🇷', city: 'Córdoba', country: 'Argentina' },
] as const;

/** Países distintos en MARKETS: sólo para el texto de lector de pantalla. */
const MARKET_COUNTRIES = new Set(MARKETS.map((m) => m.country)).size;

const HeroDashboard = () => {
  const { language } = useLanguage();
  // El dominio de la barra es un placeholder para que el visitante se vea a si
  // mismo, asi que se traduce como cualquier otro texto de la interfaz.
  const demoDomain = language === 'es' ? 'TuNegocio' : 'YourBusiness';

  // ---------------------------------------------------------------------
  // Un solo reloj para todo el dashboard.
  //
  // Antes había dos intervalos sueltos — tareas cada 8s, plazas cada 3s — y al
  // no ser múltiplos, los cambios caían en momentos arbitrarios: mientras se
  // tachaba una tarea saltaba el país, y un rato después los números. Eso es lo
  // que hacía sentir el panel "revuelto": no era la cantidad de movimiento sino
  // que nada estaba sincronizado.
  //
  // Ahora hay un único tick de 8s que ordena todo por fases dentro del ciclo:
  //
  //   t=0.0s  entra la tarea nueva y CAMBIA LA PLAZA (mismo instante)
  //   t=2.0s  arranca el tachado
  //   t=3.2s  tachado completo
  //   t=4.0s  cambia la plaza otra vez (mitad exacta del ciclo)
  //   t=7.3s  la tarea se va
  //   t=8.0s  siguiente vuelta
  //
  // La plaza va al doble de frecuencia que el resto, pero derivada del MISMO
  // reloj: 4s es la mitad exacta de 8s, así que cada cambio cae en el tick o
  // justo en el medio, nunca en un punto arbitrario. Es la diferencia con los
  // 3s de antes, que contra un ciclo de 8 no cerraban nunca.
  //
  // Las stats no siguen este ciclo: se actualizan cada STATS_EVERY vueltas
  // (24s) para que los números sean el dato que cambia "de vez en cuando" y no
  // otra cosa parpadeando cada 8 segundos.
  // ---------------------------------------------------------------------
  const CYCLE_MS = 8000;
  const STATS_EVERY = 3;

  const [tick, setTick] = useState(0);
  // Contador de medios ciclos: sólo lo usa la plaza, que rota al doble.
  const [halfTick, setHalfTick] = useState(0);
  const [taskPhase, setTaskPhase] = useState<'enter' | 'striking' | 'done' | 'leave'>('enter');

  useEffect(() => {
    // Sin movimiento: queda la primera tarea y la primera plaza, fijas. El
    // dashboard sigue leyéndose entero, sólo que no rota.
    if (prefersReducedMotion()) {
      setTaskPhase('done');
      return;
    }

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const run = () => {
      // Tarea y plaza entran juntas: un solo cambio que leer, no dos.
      setTaskPhase('enter');
      timeouts.push(setTimeout(() => setTaskPhase('striking'), 2000));
      timeouts.push(setTimeout(() => setTaskPhase('done'), 3200));
      timeouts.push(setTimeout(() => setTaskPhase('leave'), 7300));
      // Segundo cambio de plaza, a mitad del ciclo.
      timeouts.push(setTimeout(() => setHalfTick((prev) => prev + 1), CYCLE_MS / 2));
      timeouts.push(setTimeout(() => {
        setHalfTick((prev) => prev + 1);
        setTick((prev) => prev + 1);
      }, CYCLE_MS));
    };
    run();
    const id = setInterval(run, CYCLE_MS);
    return () => {
      clearInterval(id);
      timeouts.forEach(clearTimeout);
    };
  }, []);

  const currentTask = TASKS[tick % TASKS.length];
  // La plaza avanza cada medio ciclo (4s): una vez junto con la tarea y otra a
  // mitad de camino, cuando el tachado ya terminó y no hay nada más en curso.
  const market = MARKETS[halfTick % MARKETS.length];
  // La plaza saliente, para cruzarla con la entrante. Renderizar las dos a la
  // vez es lo que convierte el cambio en un relevo: antes el `key` reemplazaba
  // el nodo y la ciudad vieja se cortaba de golpe mientras la nueva entraba
  // sola, que es de donde venía la sensación de salto.
  const prevMarket = MARKETS[(halfTick - 1 + MARKETS.length) % MARKETS.length];
  // Primer render: no hay de dónde venir, así que no se cruza nada.
  const isFirst = halfTick === 0;
  // La bandera sólo se anima si el emoji efectivamente cambia. Entre dos
  // ciudades del mismo país (Toronto → Vancouver) el glifo es el mismo y
  // re-animarlo se veía como un parpadeo sin causa.
  const flagChanged = !isFirst && prevMarket.flag !== market.flag;

  // Stats: cambian cada 3 vueltas (24s). Se congela el índice dividiendo el
  // tick, así que entre actualizaciones los números quedan realmente quietos.
  const statsTask = TASKS[Math.floor(tick / STATS_EVERY) % TASKS.length];

  // El delay escalonado hace que la fila se actualice de izquierda a derecha en
  // vez de saltar los tres a la vez.
  const conversion = useAnimatedNumber(statsTask.stats.conversion, { delay: 0 });
  const latency = useAnimatedNumber(statsTask.stats.latency, { delay: 180 });
  const incidents = useAnimatedNumber(statsTask.stats.incidents, { delay: 360 });
  const infraProgress = useAnimatedNumber(statsTask.stats.infraProgress, {
    duration: 2600,
    delay: 500,
  });
  const checksCount = statsTask.stats.checks;

  // Curva derivada de la MISMA serie que alimenta las stats, no de la tarea en
  // pantalla: la línea y el número de conversion son el mismo dato, así que si
  // la curva se moviera cada 8s contradiría al número que está quieto. Las dos
  // cambian juntas cada STATS_EVERY vueltas (useMemo: recalcular en cada render
  // no aporta nada).
  const chartPath = React.useMemo(() => seriesToPath(statsTask.series), [statsTask.series]);
  const chartArea = React.useMemo(() => pathToArea(chartPath), [chartPath]);
  const chartEnd = React.useMemo(() => seriesEndPoint(statsTask.series), [statsTask.series]);

  // El trazado ya no se relanza en cada tarea: antes un `key` derivado de
  // taskIndex remontaba los <path> y el barrido de 1.4s se repetía cada 8s sin
  // parar. Sin remount, los nodos persisten y el cambio de serie se resuelve
  // con la transición CSS del atributo `d` — el dato se actualiza, el gráfico
  // no se rearma.

  return (
    <div className={styles.wrapper} data-explode-root>
      {/* El dashboard entero es decorativo (aria-hidden más abajo), pero el
          alcance sí es información: se expone una vez, como texto plano, para
          que un lector de pantalla la reciba sin narrar la maqueta. */}
      <p className={styles.srOnly}>
        {language === 'es'
          ? `Proyectos entregados en ${MARKET_COUNTRIES} países.`
          : `Delivered projects across ${MARKET_COUNTRIES} countries.`}
      </p>
      <div className={styles.inner} aria-hidden>
      {/* Isotipo panda que se asoma por el borde derecho — como con vida.
          Van los dos variantes y el CSS muestra uno según el tema: en dark el
          panda plano se funde con el fondo oscuro, así que ahí entra el de
          contorno. Se resuelve por CSS y no por estado para que no haya
          parpadeo del isotipo equivocado al cambiar de tema. */}
      {/* eslint-disable-next-line @next/next/no-img-element -- SVG: next/image no lo optimiza */}
      <img
        className={`${styles.peekPanda} ${styles.peekPandaLight}`}
        src="/NewBrand/SVG (Curvas_Canva)/Isotipo-Programando-Oscuro.svg"
        alt=""
        aria-hidden
        loading="lazy"
      />
      {/* eslint-disable-next-line @next/next/no-img-element -- SVG: next/image no lo optimiza */}
      <img
        className={`${styles.peekPanda} ${styles.peekPandaDark}`}
        src="/isotipo-panda-contorno.svg"
        alt=""
        aria-hidden
        loading="lazy"
      />

      {/* Browser window */}
      <div className={styles.browser} data-explode-piece="browser">
        {/* Browser chrome */}
        <div className={styles.browserChrome} data-explode-piece="browser-chrome">
          <div className={styles.browserDots} data-explode-piece="browser-dots">
            <span />
            <span />
            <span />
          </div>
          <div className={styles.urlBar} data-explode-piece="url-bar">
            <span className={styles.urlTyped}>
              <span className={styles.urlTypedSegment}>
                <span className={styles.urlAccent}>{demoDomain}</span>
                <span className={styles.urlLight}>.com/analytics</span>
              </span>
              <span className={styles.urlCaret} aria-hidden />
            </span>
          </div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Top row: project meta + live */}
          <div className={styles.topRow}>
            <div className={styles.projectMeta}>
              <span className={`${styles.projectTitle} ${styles[`task_${taskPhase}`]}`}>
                <span className={styles.taskText}>{currentTask.slug}</span>
                <span className={styles.strikeLine} aria-hidden />
              </span>
              <span className={styles.projectSubline}>
                {currentTask.week} · {taskPhase === 'done' || taskPhase === 'leave' ? 'shipped' : 'in progress'}
              </span>
            </div>
            <div className={styles.topRowRight}>
              {/* Plaza activa: bandera y ciudad, nada más. El conteo de países
                  salió de acá — se dice una sola vez, en el texto de lector de
                  pantalla de arriba. El `key` remonta el nodo en cada cambio y
                  con eso vuelve a disparar el fade del CSS, sin manejar estado
                  de animación a mano. */}
              <div className={styles.marketBadge} data-explode-piece="market-badge">
                <span className={styles.marketPlace}>
                  {/* La bandera vive fuera de los nodos con `key`: no se
                      remonta ni se desplaza al rotar. Es la ranura fija contra
                      la que se lee el cambio. Sólo hace su micro-gesto cuando
                      el emoji cambia de verdad. */}
                  <span
                    key={`flag-${flagChanged ? halfTick : 'steady'}`}
                    className={`${styles.marketFlag} ${flagChanged ? styles.marketFlagSwap : ''}`}
                  >
                    {market.flag}
                  </span>
                  <span className={styles.marketCityViewport}>
                    {/* Dos capas superpuestas: la saliente se va hacia arriba
                        mientras la entrante sube desde abajo. Se cruzan en el
                        medio, así que la ranura nunca queda vacía. */}
                    {!isFirst && (
                      <span
                        key={`out-${halfTick}`}
                        className={`${styles.marketPlaceInner} ${styles.marketOut}`}
                        aria-hidden
                      >
                        {prevMarket.city}
                      </span>
                    )}
                    <span key={`in-${halfTick}`} className={styles.marketPlaceInner}>
                      {market.city}
                    </span>
                  </span>
                </span>
              </div>
              <div className={styles.liveBadge} data-explode-piece="live-badge">
                <span className={styles.liveDot} />
                LIVE
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className={styles.statsRow}>
            <div className={styles.statCard} data-explode-piece="stat-card" data-explode-index="0">
              <div className={styles.statValue}>
                +{Math.round(conversion)}<span className={styles.statUnit}>%</span>
              </div>
              <div className={styles.statLabel}>CONVERSION</div>
            </div>
            <div className={styles.statCard} data-explode-piece="stat-card" data-explode-index="1">
              <div className={styles.statValue}>
                −{Math.round(latency)}<span className={styles.statUnit}>ms</span>
              </div>
              <div className={styles.statLabel}>LATENCY</div>
            </div>
            <div className={styles.statCard} data-explode-piece="stat-card" data-explode-index="2">
              <div className={styles.statValue}>{Math.round(incidents)}</div>
              <div className={styles.statLabel}>INCIDENTS</div>
            </div>
          </div>

          {/* Chart */}
          <div className={styles.chartCard} data-explode-piece="chart-card">
            <div className={styles.chartLabel}>
              CONVERSION <span className={styles.chartLabelLight}>· LAST 30D</span>
            </div>
            <svg
              className={styles.chartSvg}
              viewBox="0 0 400 58"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="heroChartFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c9b8f5" stopOpacity="0.16" />
                  <stop offset="100%" stopColor="#c9b8f5" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Grilla punteada de fondo — moderna, tenue */}
              <g className={styles.chartGrid} stroke="var(--primary-color)" strokeWidth="1" strokeDasharray="1 5" strokeLinecap="round">
                <line x1="8" y1="16" x2="392" y2="16" />
                <line x1="8" y1="32" x2="392" y2="32" />
                <line x1="8" y1="48" x2="392" y2="48" />
              </g>

              {/* Área bajo la curva — degradado suave, curva bezier */}
              <path
                className={styles.chartFill}
                d={chartArea}
                fill="url(#heroChartFill)"
              />

              {/* Línea de conversión — curva suave */}
              <path
                className={styles.chartLine}
                d={chartPath}
                fill="none"
                stroke="#c9b8f5"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Punto final — con margen para que no se corte */}
              <circle
                className={styles.chartDotOuter}
                cx={chartEnd.x}
                cy={chartEnd.y}
                r="6.5"
                fill="#c9b8f5"
                opacity="0.18"
              />
              <circle
                className={styles.chartDot}
                cx={chartEnd.x}
                cy={chartEnd.y}
                r="3.8"
                fill="#ffffff"
                stroke="#c9b8f5"
                strokeWidth="2.5"
              />
            </svg>
          </div>

          {/* Work area rows — live progress indicators */}
          <div className={styles.stackRows}>
            {/* En mobile queda sólo Infra & DevOps: es la única fila con dato
                vivo (el % contando y los checks), así que las dos de 100% fijo
                se ocultan y el panel no se estira (ver .hideOnMobile en el
                scss). En desktop van las tres. */}
            <div className={`${styles.stackRow} ${styles.hideOnMobile}`} data-explode-piece="stack-row" data-explode-index="0">
              <div className={`${styles.stackIcon} ${styles.stackIconFrontend}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="3" y="4" width="18" height="14" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                </svg>
              </div>
              <div className={styles.stackInfo}>
                <div className={styles.stackTitleRow}>
                  <span className={styles.stackTitle}>Frontend & UI</span>
                  <span className={styles.stackPercent}>100%</span>
                </div>
                <div className={styles.progressBar}>
                  <span className={`${styles.progressFill} ${styles.progressDone}`} style={{ '--w': '100%' } as React.CSSProperties} />
                </div>
              </div>
            </div>
            <div className={`${styles.stackRow} ${styles.hideOnMobile}`} data-explode-piece="stack-row" data-explode-index="1">
              <div className={`${styles.stackIcon} ${styles.stackIconBackend}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                  <path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6" />
                </svg>
              </div>
              <div className={styles.stackInfo}>
                <div className={styles.stackTitleRow}>
                  <span className={styles.stackTitle}>Backend & APIs</span>
                  <span className={styles.stackPercent}>100%</span>
                </div>
                <div className={styles.progressBar}>
                  <span className={`${styles.progressFill} ${styles.progressDone}`} style={{ '--w': '100%' } as React.CSSProperties} />
                </div>
              </div>
            </div>
            <div className={styles.stackRow} data-explode-piece="stack-row" data-explode-index="2">
              <div className={`${styles.stackIcon} ${styles.stackIconInfra}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="2" y="3" width="20" height="6" rx="1" />
                  <rect x="2" y="15" width="20" height="6" rx="1" />
                  <line x1="6" y1="6" x2="6.01" y2="6" />
                  <line x1="6" y1="18" x2="6.01" y2="18" />
                </svg>
              </div>
              <div className={styles.stackInfo}>
                <div className={styles.stackTitleRow}>
                  <span className={styles.stackTitle}>
                    Infra & DevOps
                    <span className={styles.stackChecks}>
                      <span className={styles.stackChecksCount}>{checksCount}</span>{' '}checks
                    </span>
                  </span>
                  <span className={`${styles.stackPercent} ${styles.stackPercentLive}`}>
                    <span className={styles.pulseDot} /> {Math.round(infraProgress)}%
                  </span>
                </div>
                <div className={styles.progressBar}>
                  <span
                    className={`${styles.progressFill} ${styles.progressLive}`}
                    style={{ width: `${Math.round(infraProgress)}%` } as React.CSSProperties}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

    </div>
  );
};

export default HeroDashboard;
