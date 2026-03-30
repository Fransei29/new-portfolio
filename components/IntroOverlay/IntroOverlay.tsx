'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './IntroOverlay.module.scss';

interface IntroOverlayProps {
  onComplete: () => void;
  onClosingStart?: () => void;
}

export default function IntroOverlay({ onComplete, onClosingStart }: IntroOverlayProps) {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

    // Menos tiempo en pantalla, pero salida MUY suave (sin corte).
    // En reduce-motion, salteamos casi todo.
    // Más smooth (más aire) sin cortar la animación.
    // closeAt + maxDelay + transitionDuration ≈ 450 + 400 + 1100 = 1950ms
    const closeAt = reduceMotion ? 20 : 450;
    const doneAt = reduceMotion ? 120 : 1950;

    const closeTimer = setTimeout(() => {
      onClosingStart?.();
      setClosing(true);
    }, closeAt);
    const doneTimer = setTimeout(() => onComplete(), doneAt);
    return () => {
      clearTimeout(closeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete, onClosingStart]);

  return (
    <div className={`${styles.container} ${closing ? styles.closing : ''}`}>
      <div className={styles.layer} />
      <div className={styles.layer} />
      <div className={styles.layer} />

      <div className={`${styles.content} ${closing ? styles.contentFade : ''}`}>
        <Image
          src="/Logo.svg"
          alt="Logo"
          width={72}
          height={72}
          className={styles.logo}
          priority
          unoptimized
        />
      </div>
    </div>
  );
}
