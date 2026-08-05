'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import styles from './HeroDashboard.module.scss';

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
function useAnimatedNumber(target: number, { duration = 2200, delay = 0 } = {}) {
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

const TESTIMONIALS = [
  {
    name: 'Edison, DevOps',
    quote: 'Exceptional attention to detail.',
    image: '/img/img/Testimonials/Edi.webp',
  },
  {
    name: 'Matias, Frontend',
    quote: 'Always delivered high-quality code.',
    image: '/img/img/Testimonials/Mati.webp',
  },
  {
    name: 'Adrian, Developer',
    quote: 'Proactive, reflective, reliable.',
    image: '/img/img/Testimonials/Adrian.webp',
  },
  {
    name: 'Tomas, Web Dev',
    quote: 'Key developer on our scaling work.',
    image: '/img/img/Testimonials/tomi.webp',
  },
  {
    name: 'Franklin, Full Stack',
    quote: 'Mastery in React and TypeScript.',
    image: '/img/img/Testimonials/frank.webp',
  },
  {
    name: 'Valentin, Backend',
    quote: 'Proactive and efficient. Fully recommended.',
    image: '/img/img/Testimonials/vale.webp',
  },
  {
    name: 'Ismael, Software Dev',
    quote: 'Exceptional full stack developer.',
    image: '/img/img/Testimonials/isma.webp',
  },
];

const TASKS = [
  {
    slug: 'starton-rebuild',
    week: 'Week 6 of 6',
    stats: { conversion: 23, latency: 140, incidents: 0, checks: 47, infraProgress: 98 },
  },
  {
    slug: 'auth-flow-redesign',
    week: 'Week 3 of 3',
    stats: { conversion: 18, latency: 85, incidents: 0, checks: 32, infraProgress: 97 },
  },
  {
    slug: 'checkout-optimization',
    week: 'Week 4 of 4',
    stats: { conversion: 41, latency: 210, incidents: 0, checks: 58, infraProgress: 99 },
  },
  {
    slug: 'dashboard-v2',
    week: 'Week 8 of 8',
    stats: { conversion: 12, latency: 320, incidents: 1, checks: 74, infraProgress: 96 },
  },
  {
    slug: 'payments-integration',
    week: 'Week 2 of 2',
    stats: { conversion: 31, latency: 95, incidents: 0, checks: 26, infraProgress: 98 },
  },
];

const HeroDashboard = () => {
  // Rotating "shipped tasks" — strike-through cycle
  const [taskIndex, setTaskIndex] = useState(0);
  const [taskPhase, setTaskPhase] = useState<'enter' | 'striking' | 'done' | 'leave'>('enter');
  // Ciclo tranquilo: más reposo entre cambios para que no se sienta "movido".
  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const run = () => {
      setTaskPhase('enter');
      timeouts.push(setTimeout(() => setTaskPhase('striking'), 2000));
      timeouts.push(setTimeout(() => setTaskPhase('done'), 3200));
      timeouts.push(setTimeout(() => setTaskPhase('leave'), 7300));
      // El cambio de tarea ya se comunica por el conteo animado de las stats;
      // el flash de fondo que había acá encima sumaba parpadeo, no información.
      timeouts.push(setTimeout(() => {
        setTaskIndex((prev) => (prev + 1) % TASKS.length);
      }, 8000));
    };
    run();
    const id = setInterval(run, 8000);
    return () => {
      clearInterval(id);
      timeouts.forEach(clearTimeout);
    };
  }, []);
  const currentTask = TASKS[taskIndex];

  // Rotating testimonials with fade transition
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [testimonialFading, setTestimonialFading] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      setTestimonialFading(true);
      setTimeout(() => {
        setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
        setTestimonialFading(false);
      }, 800);
    }, 8000);
    return () => clearInterval(id);
  }, []);
  const currentTestimonial = TESTIMONIALS[testimonialIndex];

  // Stats driven by current task. El delay escalonado hace que la fila se
  // actualice de izquierda a derecha en vez de saltar los tres a la vez.
  const conversion = useAnimatedNumber(currentTask.stats.conversion, { delay: 0 });
  const latency = useAnimatedNumber(currentTask.stats.latency, { delay: 180 });
  const incidents = useAnimatedNumber(currentTask.stats.incidents, { delay: 360 });
  const infraProgress = useAnimatedNumber(currentTask.stats.infraProgress, {
    duration: 2600,
    delay: 500,
  });
  const checksCount = currentTask.stats.checks;

  return (
    <div className={styles.wrapper} aria-hidden data-explode-root>
      {/* Isotipo panda que se asoma por el borde derecho — como con vida. */}
      {/* eslint-disable-next-line @next/next/no-img-element -- SVG: next/image no lo optimiza */}
      <img
        className={styles.peekPanda}
        src="/isotipo-panda.svg"
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
                <span className={styles.urlLight}>app.</span>
                <span className={styles.urlAccent}>francoseiler</span>
                <span className={styles.urlLight}>.com/dashboard</span>
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
            <div className={styles.liveBadge} data-explode-piece="live-badge">
              <span className={styles.liveDot} />
              LIVE
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
              <div className={styles.statLabel}>P95 LATENCY</div>
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
                d="M8,46 C70,43 110,38 170,33 S280,20 392,11 L392,58 L8,58 Z"
                fill="url(#heroChartFill)"
              />

              {/* Línea de conversión — curva suave */}
              <path
                className={styles.chartLine}
                d="M8,46 C70,43 110,38 170,33 S280,20 392,11"
                fill="none"
                stroke="#c9b8f5"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Punto final — con margen para que no se corte */}
              <circle
                className={styles.chartDotOuter}
                cx="392"
                cy="11"
                r="6.5"
                fill="#c9b8f5"
                opacity="0.18"
              />
              <circle
                className={styles.chartDot}
                cx="392"
                cy="11"
                r="3.8"
                fill="#ffffff"
                stroke="#c9b8f5"
                strokeWidth="2.5"
              />
            </svg>
          </div>

          {/* Work area rows — live progress indicators */}
          <div className={styles.stackRows}>
            <div className={styles.stackRow} data-explode-piece="stack-row" data-explode-index="0">
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
            <div className={styles.stackRow} data-explode-piece="stack-row" data-explode-index="1">
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

      {/* Floating testimonial pill (bottom-right, breaks the frame) */}
      <div
        className={`${styles.floatingPill} ${styles.testimonialPill} ${testimonialFading ? styles.testimonialFading : ''}`}
        data-explode-piece="testimonial-pill"
      >
        {/* next/image sirve el avatar redimensionado a 24px en vez del .webp
            completo. Los demás <img> de este archivo son SVG, que el
            optimizador no procesa — ahí no aportaría nada. */}
        <Image
          className={styles.avatarImg}
          src={currentTestimonial.image}
          alt={currentTestimonial.name}
          width={24}
          height={24}
          loading="lazy"
        />
        <span className={styles.testimonialText}>
          <span className={styles.testimonialName}>{currentTestimonial.name}</span>
          <span className={styles.testimonialQuote}>&ldquo;{currentTestimonial.quote}&rdquo;</span>
        </span>
      </div>
    </div>
  );
};

export default HeroDashboard;
