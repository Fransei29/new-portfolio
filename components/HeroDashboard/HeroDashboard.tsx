'use client';

import React, { useEffect, useState, useRef } from 'react';
import styles from './HeroDashboard.module.scss';

// Animated counter — transitions from previous value to new target
function useAnimatedNumber(target: number, duration = 900) {
  const [value, setValue] = useState(target);
  const raf = useRef<number | null>(null);
  const fromRef = useRef(target);
  useEffect(() => {
    fromRef.current = value;
    const startTime = performance.now();
    const start = fromRef.current;
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setValue(start + (target - start) * eased);
      if (progress < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
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
    stats: { conversion: 23, latency: 140, incidents: 0, checks: 47, infraProgress: 92 },
  },
  {
    slug: 'auth-flow-redesign',
    week: 'Week 3 of 3',
    stats: { conversion: 18, latency: 85, incidents: 0, checks: 32, infraProgress: 88 },
  },
  {
    slug: 'checkout-optimization',
    week: 'Week 4 of 4',
    stats: { conversion: 41, latency: 210, incidents: 0, checks: 58, infraProgress: 96 },
  },
  {
    slug: 'dashboard-v2',
    week: 'Week 8 of 8',
    stats: { conversion: 12, latency: 320, incidents: 1, checks: 74, infraProgress: 85 },
  },
  {
    slug: 'payments-integration',
    week: 'Week 2 of 2',
    stats: { conversion: 31, latency: 95, incidents: 0, checks: 26, infraProgress: 94 },
  },
];

const HeroDashboard = () => {
  // Rotating "shipped tasks" — strike-through cycle
  const [taskIndex, setTaskIndex] = useState(0);
  const [taskPhase, setTaskPhase] = useState<'enter' | 'striking' | 'done' | 'leave'>('enter');
  const [statsFlash, setStatsFlash] = useState(false);
  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const run = () => {
      setTaskPhase('enter');
      timeouts.push(setTimeout(() => setTaskPhase('striking'), 1200));
      timeouts.push(setTimeout(() => setTaskPhase('done'), 2100));
      timeouts.push(setTimeout(() => setTaskPhase('leave'), 3500));
      timeouts.push(setTimeout(() => {
        setTaskIndex((prev) => (prev + 1) % TASKS.length);
        setStatsFlash(true);
        setTimeout(() => setStatsFlash(false), 500);
      }, 3900));
    };
    run();
    const id = setInterval(run, 3900);
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
      }, 450);
    }, 3800);
    return () => clearInterval(id);
  }, []);
  const currentTestimonial = TESTIMONIALS[testimonialIndex];

  // Stats driven by current task — animate on change
  const conversion = useAnimatedNumber(currentTask.stats.conversion);
  const latency = useAnimatedNumber(currentTask.stats.latency);
  const incidents = useAnimatedNumber(currentTask.stats.incidents);
  const infraProgress = useAnimatedNumber(currentTask.stats.infraProgress);
  const checksCount = currentTask.stats.checks;

  return (
    <div className={styles.wrapper} aria-hidden>
      {/* Floating metric pill (top-left, breaks the frame) */}
      <div className={`${styles.floatingPill} ${styles.metricPill}`}>
        <span className={styles.metricValue}>12+</span>
        <span className={styles.metricLabel}>
          PRODUCTS
          <br />
          <span className={styles.metricLabelSub}>/ SHIPPED</span>
        </span>
      </div>

      {/* Browser window */}
      <div className={styles.browser}>
        {/* Browser chrome */}
        <div className={styles.browserChrome}>
          <div className={styles.browserDots}>
            <span />
            <span />
            <span />
          </div>
          <div className={styles.urlBar}>
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
            <div className={styles.liveBadge}>
              <span className={styles.liveDot} />
              LIVE
            </div>
          </div>

          {/* Stats row */}
          <div className={`${styles.statsRow} ${statsFlash ? styles.statsFlash : ''}`}>
            <div className={styles.statCard}>
              <div className={styles.statValue}>
                +{Math.round(conversion)}<span className={styles.statUnit}>%</span>
              </div>
              <div className={styles.statLabel}>CONVERSION</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>
                −{Math.round(latency)}<span className={styles.statUnit}>ms</span>
              </div>
              <div className={styles.statLabel}>P95 LATENCY</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{Math.round(incidents)}</div>
              <div className={styles.statLabel}>INCIDENTS</div>
            </div>
          </div>

          {/* Chart */}
          <div className={styles.chartCard}>
            <div className={styles.chartLabel}>
              CONVERSION <span className={styles.chartLabelLight}>· LAST 30D</span>
            </div>
            <svg
              className={styles.chartSvg}
              viewBox="0 0 400 90"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="heroChartFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="var(--primary-color)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                className={styles.chartFill}
                d="M0,75 L20,72 L45,70 L75,68 L105,60 L140,58 L170,50 L200,48 L235,38 L270,32 L300,28 L335,20 L370,14 L400,8 L400,90 L0,90 Z"
                fill="url(#heroChartFill)"
              />
              <path
                className={styles.chartLine}
                d="M0,75 L20,72 L45,70 L75,68 L105,60 L140,58 L170,50 L200,48 L235,38 L270,32 L300,28 L335,20 L370,14 L400,8"
                fill="none"
                stroke="var(--primary-color)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Pulsing dot at the end of the chart line */}
              <circle
                className={styles.chartDotOuter}
                cx="398"
                cy="8"
                r="6"
                fill="var(--primary-color)"
                opacity="0.35"
              />
              <circle
                className={styles.chartDot}
                cx="398"
                cy="8"
                r="3.5"
                fill="var(--primary-color)"
              />
            </svg>
          </div>

          {/* Work area rows — live progress indicators */}
          <div className={styles.stackRows}>
            <div className={styles.stackRow}>
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
            <div className={styles.stackRow}>
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
            <div className={styles.stackRow}>
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
                    <span className={styles.pulseDot} /> live
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
      >
        <img
          className={styles.avatarImg}
          src={currentTestimonial.image}
          alt={currentTestimonial.name}
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
