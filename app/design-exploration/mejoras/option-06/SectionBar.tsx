'use client';

// mejoras/option-06/SectionBar.tsx
// Barra fina sticky (sólo mobile) que reemplaza a la columna de rótulos:
// muestra el número y el nombre de la sección que se está leyendo.
// Es decorativa para lectores de pantalla: los h2 de cada sección ya orientan.

import { useEffect, useState } from 'react';
import styles from './option.module.css';

interface Item {
  id: string;
  num: string;
  label: string;
}

export default function SectionBar({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      // La sección actual es la última cuyo tope ya pasó por debajo de header + barra.
      const line = 60 + 44 + 8;
      let idx = 0;
      items.forEach((it, i) => {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top <= line) idx = i;
      });
      setActive(idx);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [items]);

  const current = items[active];
  const progress = ((active + 1) / items.length) * 100;

  return (
    <div className={styles.sectionBar} aria-hidden="true">
      <div className={styles.sectionBarInner}>
        <span className={styles.sectionBarNum}>{current.num}</span>
        <span className={styles.sectionBarLabel}>{current.label}</span>
        <span className={styles.sectionBarTotal}>
          / {items[items.length - 1].num}
        </span>
      </div>
      <span className={styles.sectionBarTrack}>
        <span className={styles.sectionBarFill} style={{ width: `${progress}%` }} />
      </span>
    </div>
  );
}
