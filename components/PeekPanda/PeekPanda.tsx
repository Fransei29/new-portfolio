'use client';

import React from 'react';
import styles from './PeekPanda.module.scss';

interface PeekPandaProps {
  /** Lado desde el que asoma. Por defecto 'right'. */
  side?: 'left' | 'right';
  /** Ajuste fino opcional. */
  className?: string;
}

/**
 * Isotipo panda que se asoma desde detrás de un borde/wave, con la parte
 * inferior recortada (mismo guiño que el panda del dashboard del hero).
 * Debe colocarse dentro de un contenedor con `position: relative`; se ancla
 * al borde inferior de ese contenedor.
 */
const PeekPanda: React.FC<PeekPandaProps> = ({ side = 'right', className }) => {
  return (
    <div
      className={`${styles.clip} ${side === 'left' ? styles.left : styles.right} ${className ?? ''}`}
      aria-hidden
    >
      <img
        className={styles.panda}
        src="/isotipo-panda.svg"
        alt=""
        aria-hidden
        loading="lazy"
      />
    </div>
  );
};

export default PeekPanda;
