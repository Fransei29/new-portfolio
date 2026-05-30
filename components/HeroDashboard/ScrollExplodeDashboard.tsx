'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from '../../animations/gsap.config';
import HeroDashboard from './HeroDashboard';
import styles from './ScrollExplodeDashboard.module.scss';

// One quiet entrance — no scroll-linked motion.
//
// The dashboard used to be tied to the scroll: it drifted up and faded as you
// scrolled past, which read as gimmicky. The dashboard sits above the fold in
// the hero, so instead it simply rises and fades in once on mount, then stays
// put. A single, professional gesture that gives it life without ever getting
// in the way of the scroll.
const ScrollExplodeDashboard = () => {
  const hostRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const stage = stageRef.current;
    if (!host || !stage) return;

    // Respect prefers-reduced-motion: render in place, no entrance animation.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      // Plays once on mount — no ScrollTrigger, since the dashboard is already
      // on screen when the page loads.
      gsap.from(stage, {
        y: 24,
        opacity: 0,
        duration: 1.1,
        delay: 0.15,
        ease: 'power3.out',
      });
    }, host);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={hostRef} className={styles.pinHost}>
      <div ref={stageRef} className={styles.stage}>
        <HeroDashboard />
      </div>
    </div>
  );
};

export default ScrollExplodeDashboard;
