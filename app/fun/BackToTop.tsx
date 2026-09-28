'use client';

// app/fun/BackToTop.tsx
// Botón flotante para volver arriba. Aparece después de bajar una pantalla y
// media; en mobile, donde la página es larga, ahorra mucho scroll.

import { useEffect, useState } from 'react';
import styles from './fun.module.css';

export default function BackToTop({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 1.5);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      className={`${styles.toTop} ${visible ? styles.toTopVisible : ''}`}
      onClick={toTop}
      aria-label={label}
      tabIndex={visible ? 0 : -1}
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}
