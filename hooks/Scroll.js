import { useEffect, useRef } from 'react';

export const useScrollAnimation = () => {
  const elementsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 } // Se activa cuando el 20% del elemento está en pantalla
    );

    elementsRef.current.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return elementsRef;
};
