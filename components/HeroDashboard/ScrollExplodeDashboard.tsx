'use client';

import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../animations/gsap.config';
import HeroDashboard from './HeroDashboard';
import styles from './ScrollExplodeDashboard.module.scss';

// Per-piece dispersion vectors. Coordinates are roughly aligned with the
// reference storyboard (cards drift up-right, bars/badges arc out, pills fly
// to opposite corners). Tweak these to retune the choreography.
type Vector = { x: number; y: number; rot: number; scale?: number };

// Each piece "shatters" — it tilts hard, drifts a bit, fades out and shrinks,
// like a card cracking off the dashboard. The motion is intentionally messy:
// rotations are large (60-180°), opacity drops to ~0, scale shrinks toward 0.
type ShatterSpec = Vector & { opacity?: number };
const PIECE_VECTORS: Record<string, ShatterSpec | ShatterSpec[]> = {
  // Browser shell collapses onto itself and fades out completely
  browser:           { x:   0, y:  40, rot:  -4, scale: 0.92, opacity: 0 },
  'browser-chrome':  { x:  18, y: -60, rot:  35, scale: 0.7, opacity: 0 },
  'browser-dots':    { x: -50, y: -80, rot: -90, scale: 0.5, opacity: 0 },
  'url-bar':         { x:  40, y: -90, rot: -25, scale: 0.6, opacity: 0 },
  'live-badge':      { x:  80, y: -60, rot: 110, scale: 0.5, opacity: 0 },
  'metric-pill':     { x: -90, y: -80, rot: -120, scale: 0.4, opacity: 0 },
  'testimonial-pill':{ x: 110, y:  80, rot:  90, scale: 0.5, opacity: 0 },
  'chart-card':      { x:  20, y:  60, rot:  -15, scale: 0.7, opacity: 0 },
  'stat-card': [
    { x:  -70, y:  90, rot:  -90, scale: 0.4, opacity: 0 },   // tumbles down-left
    { x:   10, y: 120, rot:   45, scale: 0.5, opacity: 0 },   // drops straight
    { x:   80, y:  90, rot:  120, scale: 0.4, opacity: 0 },   // tumbles down-right
  ],
  'stack-row': [
    { x:  -60, y: 100, rot:  -55, scale: 0.5, opacity: 0 },
    { x:   20, y: 130, rot:   25, scale: 0.5, opacity: 0 },
    { x:   80, y: 110, rot:   70, scale: 0.5, opacity: 0 },
  ],
};

const CONFETTI_COLORS = [
  'var(--primary-color)',
  '#f472b6',
  '#fde68a',
  '#86efac',
  '#7dd3fc',
  '#c4b5fd',
  '#fca5a5',
  '#0b0d12',
];

const CONFETTI_COUNT = 28;

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

const ScrollExplodeDashboard = () => {
  const hostRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const confettiLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const stage = stageRef.current;
    const confettiLayer = confettiLayerRef.current;
    if (!host || !stage || !confettiLayer) return;

    // Mobile uses a shorter scroll range so the explosion doesn't take up the
    // whole viewport — the next section is closer on small screens.
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // Respect prefers-reduced-motion: skip the explode entirely.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      // 1. Generate confetti DOM lazily inside the layer.
      const confettiNodes: HTMLDivElement[] = [];
      for (let i = 0; i < CONFETTI_COUNT; i++) {
        const node = document.createElement('div');
        const variant = i % 7 === 0 ? 'bar' : i % 3 === 0 ? 'dot' : '';
        node.className = `${styles.confettiPiece} ${variant ? styles[variant] : ''}`.trim();
        node.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
        confettiLayer.appendChild(node);
        confettiNodes.push(node);
      }

      // 2. Build the master timeline (scrubbed by ScrollTrigger).
      // The browser card has overflow:hidden so its own children stay inside the
      // rounded frame. During the explode we let them escape so chrome / url-bar
      // / live-badge can fly out properly.
      const browserEl = stage.querySelector<HTMLElement>('[data-explode-piece="browser"]');

      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: host,
          // Use absolute scroll coords (scrollY 0 → 25vh) so the explosion is
          // tied to "how much the user has scrolled" — not to where the
          // dashboard happens to sit in the hero. start:0 guarantees progress=0
          // at page load, no matter where the dashboard is centered.
          start: 0,
          end: () => window.innerHeight * (isMobile ? 0.95 : 0.65),
          scrub: 0.3,
          // Desktop: pin so the explosion plays IN PLACE while Services scrolls
          // up behind/under it — the dashboard stays visible "over" the next
          // section, which gives the immersive overlap.
          // Mobile: no pin (avoids leaving a gap between dashboard and the text above).
          pin: !isMobile,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter:      () => browserEl && (browserEl.style.overflow = 'visible'),
          onEnterBack:  () => browserEl && (browserEl.style.overflow = 'visible'),
          onLeaveBack:  () => browserEl && (browserEl.style.overflow = ''),
        },
      });

      // 3. Animate each tagged piece outward.
      const pieces = stage.querySelectorAll<HTMLElement>('[data-explode-piece]');
      // The testimonial pill leaves slightly earlier than the rest — gives the
      // explosion a more layered, choreographed feel.
      const EARLY_LEAVERS = new Set(['testimonial-pill']);

      pieces.forEach((piece) => {
        const key = piece.dataset.explodePiece!;
        const idx = Number(piece.dataset.explodeIndex ?? 0);
        const spec = PIECE_VECTORS[key];
        if (!spec) return;
        const vec = Array.isArray(spec) ? spec[idx] ?? spec[0] : spec;

        const isEarly = EARLY_LEAVERS.has(key);
        // Mobile gets a slower, more drawn-out fade — pieces stay visible
        // longer before dissolving so the explosion feels less abrupt.
        const motionStart = 0;
        const motionDuration = isEarly ? 0.35 : 0.7;
        const fadeStart = isEarly ? 0.4 : (isMobile ? 0.7 : 0.35);
        const fadeDuration = isEarly ? 0.25 : (isMobile ? 0.3 : 0.3);

        // Motion phase: piece tilts/falls/scales while staying visible
        tl.to(
          piece,
          {
            x: vec.x,
            y: vec.y,
            rotation: vec.rot,
            scale: vec.scale ?? 1,
            ease: 'power2.in',
            duration: motionDuration,
          },
          motionStart,
        );
        // Fade phase: piece dissolves
        const targetOpacity = vec.opacity ?? 1;
        if (targetOpacity < 1) {
          tl.to(
            piece,
            { opacity: targetOpacity, ease: 'none', duration: fadeDuration },
            fadeStart,
          );
        }
      });

      // 4. Confetti — burst from center with random vectors.
      // Confetti lives in the FIRST half of the timeline so it doesn't
      // outlast the dashboard pieces (which fade between 0.7 and 1.0).
      // Burst out fast → fade out before the pieces dissolve.
      confettiNodes.forEach((node, i) => {
        const angle = randomBetween(0, Math.PI * 2);
        const distance = randomBetween(40, 140);
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance - randomBetween(10, 50);
        const rot = randomBetween(-180, 180);
        const delay = (i / CONFETTI_COUNT) * 0.1;

        tl.fromTo(
          node,
          { x: 0, y: 0, rotation: 0, opacity: 0, scale: 0.4 },
          {
            x,
            y,
            rotation: rot,
            opacity: 1,
            scale: randomBetween(0.6, 1.1),
            duration: 0.35,
            ease: 'power2.out',
          },
          delay,
        );
        tl.to(node, { opacity: 0, duration: 0.3, ease: 'power1.in' }, 0.4 + delay);
      });
    }, host);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={hostRef} className={styles.pinHost}>
      <div ref={stageRef} className={styles.stage}>
        <HeroDashboard />
        <div ref={confettiLayerRef} className={styles.confettiLayer} aria-hidden />
      </div>
    </div>
  );
};

export default ScrollExplodeDashboard;
