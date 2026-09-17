'use client';

import { useEffect, useState } from 'react';

import { ChevronUp } from 'lucide-react';
import styles from './ScrollToTop.module.scss';

export const ScrollToTop = () => {
  /* Aparece recien cuando hay algo arriba a lo que volver: en el hero, con la
     pagina sin scrollear, el boton no tiene destino. */
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={styles.scrollToTop} 
      aria-label="Volver arriba"
      type="button"
    >
      <ChevronUp size={24} />
    </button>
  );
};
