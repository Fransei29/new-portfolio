'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './IntroOverlay.module.scss';

interface IntroOverlayProps {
  onComplete: () => void;
}

export default function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const closeTimer = setTimeout(() => setClosing(true), 900);
    const doneTimer = setTimeout(() => onComplete(), 2300);
    return () => {
      clearTimeout(closeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div className={`${styles.container} ${closing ? styles.closing : ''}`}>
      <div className={styles.layer} />
      <div className={styles.layer} />
      <div className={styles.layer} />

      <div className={`${styles.content} ${closing ? styles.contentFade : ''}`}>
        <div className={styles.rings}>
          <div className={styles.ring} />
          <div className={styles.ring} />
          <div className={styles.ring} />
          <div className={styles.ring} />
        </div>
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
