/**
 * ScrollTrigger helpers — reusable factories for common scroll patterns.
 *
 * Usage:
 *   createReveal(el, () => gsap.to(el, { opacity: 1, y: 0 }))
 *   createBatch(elements, { onEnter: batch => gsap.from(batch, FADE_UP) })
 */
import { gsap, ScrollTrigger } from './gsap.config';
import { FADE_UP } from './presets';

// ─── Single element reveal ────────────────────────────────────────────────────

/**
 * Triggers `onEnter` once when the element scrolls into view.
 * Returns the ScrollTrigger instance so the caller can kill() it if needed.
 */
export function createReveal(
  trigger: string | Element,
  onEnter: () => void,
  config?: Partial<ScrollTrigger.Vars>,
): ScrollTrigger {
  return ScrollTrigger.create({
    trigger,
    start: 'top 80%',
    once: true,
    onEnter,
    ...config,
  });
}

// ─── Batch reveal (staggered lists / grids) ───────────────────────────────────

interface BatchConfig {
  /** Called with the visible batch; use gsap.from(batch, vars) here. */
  onEnter?: (batch: Element[]) => void;
  start?: string;
  stagger?: number;
}

/**
 * Stagger-reveals a set of elements as they scroll into view.
 * Ideal for card grids and feature lists.
 *
 * Default: FADE_UP with 0.15s stagger.
 */
export function createBatch(elements: string | Element[], config: BatchConfig = {}): void {
  const { onEnter, start = 'top 85%', stagger = 0.15 } = config;

  ScrollTrigger.batch(elements, {
    start,
    once: true,
    onEnter: onEnter ?? ((batch) => {
      gsap.from(batch, { ...FADE_UP, duration: 0.7, stagger });
    }),
  });
}

// ─── Pin / parallax ──────────────────────────────────────────────────────────

/**
 * Applies a subtle vertical parallax on scroll to an element (e.g. hero bg).
 * `speed` controls how many px it moves per 100px scrolled (default 0.3 → 30px per 100px).
 */
export function createParallax(element: Element, speed = 0.3): ScrollTrigger {
  return ScrollTrigger.create({
    trigger: element,
    start: 'top top',
    end: 'bottom top',
    scrub: true,
    onUpdate: (self) => {
      gsap.set(element, { y: self.progress * 100 * speed * -1 });
    },
  });
}
