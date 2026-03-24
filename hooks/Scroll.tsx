import { useEffect, useRef } from 'react';

export const useScrollAnimation = () => {
  // Usamos useRef para almacenar las referencias de los elementos
  const elementsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        { threshold: 0.1 }
      );

      elementsRef.current.forEach((el) => {
        if (el) observer.observe(el);
      });

      return () => observer.disconnect();
    }, 120);

    return () => clearTimeout(timeout);
  }, []);

  return elementsRef;
};
