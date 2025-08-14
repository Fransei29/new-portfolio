import { useEffect, useRef } from 'react';

interface ParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down';
}

export const useParallax = (options: ParallaxOptions = {}) => {
  const elementRef = useRef<HTMLElement>(null);
  const { speed = 0.3, direction = 'down' } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * speed;
      
      if (direction === 'down') {
        element.style.transform = `translateY(${rate}px)`;
      } else {
        element.style.transform = `translateY(-${rate}px)`;
      }
    };

    // Aplicar efecto inicial
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction]);

  return elementRef;
}; 