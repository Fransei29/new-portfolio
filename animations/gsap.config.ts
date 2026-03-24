/**
 * GSAP central config — import gsap/ScrollTrigger from here, never directly.
 * Plugins are registered once at module level; safe to call multiple times (GSAP deduplicates).
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
