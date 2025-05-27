'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import styles from './ScrollToTop.module.scss'; // Ensure this file exists and is correctly imported

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    console.log('ScrollToTop component mounted'); // Log to confirm component is mounted

    const handleScroll = () => {
      console.log('Scroll event triggered'); // Log to confirm the event is firing
      const scrollTop = window.scrollY;
      console.log('handleScroll executed, Scroll position:', scrollTop); // Log to confirm execution
      setIsVisible(scrollTop > 200);
    };

    console.log('Adding scroll event listener'); // Log to confirm listener is added
    window.addEventListener('scroll', handleScroll);

    return () => {
      console.log('Removing scroll event listener'); // Log to confirm listener is removed
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <a
      href="#banner"
      className={styles.scrollToTop} 
      aria-label="Volver arriba"
    >
      <ChevronUp size={24} />
    </a>
  );
};
