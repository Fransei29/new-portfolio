'use client';

import { useEffect, useRef } from 'react';

interface GsapParallaxOptions {
  scrollDistance?: number;   // px to move on scroll (positive = down)
  rotation?: number;         // degrees to rotate over scroll range
  mouseIntensity?: number;   // x drift on mouse move (e.g. 0.015)
  invertX?: boolean;         // invert mouse x direction
}

export function useGsapParallax(options: GsapParallaxOptions = {}) {
  const ref = useRef<HTMLElement>(null);
  const {
    scrollDistance = 60,
    rotation = 0,
    mouseIntensity = 0,
    invertX = false,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined') return;

    let gsapInstance: typeof import('gsap').gsap;
    let ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger;
    let triggers: { kill: () => void }[] = [];
    let xTo: ((value: number) => void) | null = null;

    import('../animations/gsap.config').then(({ gsap, ScrollTrigger: ST }) => {
      gsapInstance = gsap;
      ScrollTrigger = ST;

      // Scroll → y parallax + rotation
      const tween = gsap.to(el, {
        y: scrollDistance,
        rotation: rotation,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      });
      triggers.push(tween.scrollTrigger as { kill: () => void });

      // Mouse → smooth x drift via quickTo
      if (mouseIntensity > 0) {
        xTo = gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power3.out' });
      }
    });

    const handleMouse = (e: MouseEvent) => {
      if (!xTo) return;
      const rawX = (e.clientX - window.innerWidth / 2) * mouseIntensity;
      xTo(invertX ? -rawX : rawX);
    };

    if (mouseIntensity > 0) {
      window.addEventListener('mousemove', handleMouse, { passive: true });
    }

    return () => {
      triggers.forEach(t => t?.kill());
      window.removeEventListener('mousemove', handleMouse);
    };
  }, [scrollDistance, rotation, mouseIntensity, invertX]);

  return ref;
}
