import { useEffect, useRef } from 'react';

interface ParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down';
  mouseIntensity?: number;
  invertMouseX?: boolean;
  rotationSpeed?: number;
}

export const useParallax = (options: ParallaxOptions = {}) => {
  const elementRef = useRef<HTMLElement>(null);
  const {
    speed = 0.3,
    direction = 'down',
    mouseIntensity = 0,
    invertMouseX = false,
    rotationSpeed = 0,
  } = options;

  const scrollY = useRef(0);
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const updateTransform = () => {
      const rate = scrollY.current * speed;
      const translateY = direction === 'down' ? rate : -rate;
      const rotation = scrollY.current * rotationSpeed;
      const mx = invertMouseX ? -mouseX.current : mouseX.current;
      const my = mouseY.current;

      element.style.transform =
        `translateY(${translateY}px) translate(${mx}px, ${my}px) rotate(${rotation}deg) translateZ(0)`;
    };

    const handleScroll = () => {
      scrollY.current = window.pageYOffset;
      updateTransform();
    };

    const handleMouse = (e: MouseEvent) => {
      if (mouseIntensity === 0) return;
      mouseX.current = (e.clientX - window.innerWidth / 2) * mouseIntensity;
      mouseY.current = (e.clientY - window.innerHeight / 2) * mouseIntensity;
      updateTransform();
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    if (mouseIntensity > 0) {
      window.addEventListener('mousemove', handleMouse, { passive: true });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, [speed, direction, mouseIntensity, invertMouseX, rotationSpeed]);

  return elementRef;
};
