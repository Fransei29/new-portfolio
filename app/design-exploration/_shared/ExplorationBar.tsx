'use client';

// design-exploration/_shared/ExplorationBar.tsx
// Barra flotante para recorrer las opciones: anterior / índice / siguiente.
// También responde a las flechas ← → del teclado (salvo mientras se escribe).

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { directions as round1 } from './directions';
import { mejoras } from '../mejoras/_shared/mejoras';
import styles from './ExplorationBar.module.css';

export default function ExplorationBar() {
  const pathname = usePathname();
  const router = useRouter();
  // Dos rondas: /design-exploration/option-NN y /design-exploration/mejoras/option-NN.
  const parts = pathname?.split('/') ?? [];
  const isMejoras = parts[2] === 'mejoras';
  const base = isMejoras ? '/design-exploration/mejoras' : '/design-exploration';
  const directions = isMejoras ? mejoras : round1;
  const slug = isMejoras ? parts[3] : parts[2];
  const index = directions.findIndex((d) => d.slug === slug);
  const current = index >= 0 ? directions[index] : null;

  // En el índice, "siguiente" lleva a la primera opción y "anterior" a la última.
  const prev = index > 0 ? directions[index - 1] : index === 0 ? null : directions[directions.length - 1];
  const next = index >= 0 ? directions[index + 1] ?? null : directions[0];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (e.metaKey || e.ctrlKey || e.altKey || target.closest('input, textarea, select, [contenteditable]')) return;
      if (e.key === 'ArrowLeft' && prev) router.push(`${base}/${prev.slug}`);
      if (e.key === 'ArrowRight' && next) router.push(`${base}/${next.slug}`);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next, router]);

  return (
    <nav className={styles.bar} aria-label="Navegación de la exploración de diseño">
      {prev ? (
        <Link className={styles.btn} href={`${base}/${prev.slug}`} aria-label={`Anterior: ${prev.name}`}>
          <span aria-hidden="true">←</span>
          <span className={styles.hideSm}>{prev.number}</span>
        </Link>
      ) : (
        <span className={`${styles.btn} ${styles.disabled}`} aria-hidden="true">←</span>
      )}

      <Link className={`${styles.btn} ${styles.home}`} href={base}>
        {current ? (
          <>
            <span className={styles.num}>{current.number}</span>
            <span className={styles.name}>{current.name}</span>
          </>
        ) : (
          <span className={styles.name}>Índice</span>
        )}
      </Link>

      {next ? (
        <Link className={styles.btn} href={`${base}/${next.slug}`} aria-label={`Siguiente: ${next.name}`}>
          <span className={styles.hideSm}>{next.number}</span>
          <span aria-hidden="true">→</span>
        </Link>
      ) : (
        <span className={`${styles.btn} ${styles.disabled}`} aria-hidden="true">→</span>
      )}
    </nav>
  );
}
