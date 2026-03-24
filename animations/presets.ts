/**
 * Reusable GSAP "from" vars — spread into gsap.from() / gsap.fromTo().
 *
 * Usage:
 *   tl.from(el, { ...FADE_UP, duration: 0.8 })
 *   tl.from(el, { ...FADE_LEFT, duration: 0.6 })
 */
import { gsap } from 'gsap';

export const FADE_UP: gsap.TweenVars = {
  opacity: 0,
  y: 40,
  ease: 'power3.out',
};

export const FADE_DOWN: gsap.TweenVars = {
  opacity: 0,
  y: -30,
  ease: 'power3.out',
};

export const FADE_LEFT: gsap.TweenVars = {
  opacity: 0,
  x: -40,
  ease: 'power3.out',
};

export const FADE_RIGHT: gsap.TweenVars = {
  opacity: 0,
  x: 40,
  ease: 'power3.out',
};

export const FADE_IN: gsap.TweenVars = {
  opacity: 0,
  ease: 'power2.out',
};

export const SCALE_IN: gsap.TweenVars = {
  opacity: 0,
  scale: 0.92,
  ease: 'power2.out',
};
