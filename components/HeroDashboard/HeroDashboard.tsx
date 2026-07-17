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

  // Stats driven by current task — animate on change
  const conversion = useAnimatedNumber(currentTask.stats.conversion);
  const latency = useAnimatedNumber(currentTask.stats.latency);
  const infraProgress = useAnimatedNumber(currentTask.stats.infraProgress);

  return (
    <div className={styles.wrapper} aria-hidden>
      {/* Panel minimalista estilo Vercel: derecho, centrado, hairline sobrio */}
      <div className={styles.browser}>
        {/* Chrome sobrio: dots + ruta discreta */}
        <div className={styles.browserChrome}>
          <div className={styles.browserDots}>
            <span />
            <span />
            <span />
          </div>
          <div className={styles.urlBar}>
            <span className={styles.urlPath}>app.francoseiler.com</span>
          </div>
          <div className={styles.liveBadge}>
            <span className={styles.liveDot} />
            LIVE
          </div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Encabezado del proyecto — calmo */}
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
          </div>

          {/* Stats: solo dos, centradas y sobrias */}
          <div className={`${styles.statsRow} ${statsFlash ? styles.statsFlash : ''}`}>
            <div className={styles.statCard}>
              <div className={styles.statValue}>
                +{Math.round(conversion)}<span className={styles.statUnit}>%</span>
              </div>
              <div className={styles.statLabel}>Conversion</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>
                {Math.round(latency)}<span className={styles.statUnit}>ms</span>
              </div>
              <div className={styles.statLabel}>P95 Latency</div>
            </div>
          </div>

          {/* Progreso del trabajo — dos filas, limpias */}
          <div className={styles.stackRows}>
            <div className={styles.stackRow}>
              <div className={styles.stackInfo}>
                <div className={styles.stackTitleRow}>
                  <span className={styles.stackTitle}>Frontend &amp; UI</span>
                  <span className={styles.stackPercent}>100%</span>
                </div>
                <div className={styles.progressBar}>
                  <span className={`${styles.progressFill} ${styles.progressDone}`} style={{ '--w': '100%' } as React.CSSProperties} />
                </div>
              </div>
            </div>
            <div className={styles.stackRow}>
              <div className={styles.stackInfo}>
                <div className={styles.stackTitleRow}>
                  <span className={styles.stackTitle}>Backend &amp; APIs</span>
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
  );
};

export default HeroDashboard;
