'use client';

// app/fun/PandaMascot.tsx
// El panda de la marca como mascota del modo fun. Quieto por defecto (el
// flotado constante ya se descartó en el hero del sitio); reacciona sólo a la
// interacción: se inclina con el hover y salta y habla al tocarlo.

import Image from 'next/image';
import { useState } from 'react';
import styles from './fun.module.css';

interface PandaMascotProps {
  hello: string;
  lines: readonly string[];
  label: string;
}

export default function PandaMascot({ hello, lines, label }: PandaMascotProps) {
  const [index, setIndex] = useState(-1);
  // Cambiar la key reinicia la animación de salto en cada toque.
  const [jumpKey, setJumpKey] = useState(0);

  const poke = () => {
    setIndex((i) => (i + 1) % lines.length);
    setJumpKey((k) => k + 1);
  };

  const bubble = index === -1 ? hello : lines[index];

  return (
    <div className={styles.mascot}>
      <p className={styles.mascotBubble} aria-live="polite">
        {bubble}
      </p>
      <button type="button" className={styles.mascotButton} onClick={poke} aria-label={label}>
        <span key={jumpKey} className={`${styles.mascotBody} ${jumpKey > 0 ? styles.mascotJump : ''}`}>
          <Image src="/isotipo-panda.svg" alt="" width={220} height={211} priority unoptimized />
        </span>
        <span className={styles.mascotShadow} aria-hidden="true" />
      </button>
    </div>
  );
}
