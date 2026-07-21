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
        // threshold: 0 + rootMargin dispara en cuanto el borde superior del bloque
        // (donde vive el wave) entra al viewport, independientemente de la altura
        // del contenido. Con threshold:0.1 los bloques altos disparaban tarde y los
        // bajos temprano, así que el wave y su sección aparecían desfasados.
        { threshold: 0, rootMargin: '0px 0px -12% 0px' }
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
