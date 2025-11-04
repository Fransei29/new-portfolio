'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import styles from './ScrollToTop.module.scss';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 200);
    };

    window.addEventListener('scroll', handleScroll);
    // Verificar posición inicial
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
