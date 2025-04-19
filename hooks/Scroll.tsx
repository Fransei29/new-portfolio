import { useEffect, useRef } from 'react';

export const useScrollAnimation = () => {
  // Usamos useRef para almacenar las referencias de los elementos
  const elementsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 } // Se activa cuando el 20% del elemento está en pantalla
    );

    // Observamos todos los elementos referenciados
    elementsRef.current.forEach((el) => {
      if (el) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return elementsRef;
};
