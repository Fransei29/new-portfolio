'use client';

// components/Blog/TableOfContents.tsx
// Índice sticky con resaltado de la sección visible.

import { useEffect, useRef, useState } from 'react';
import type { HeadingNode } from '../../lib/blog';
import styles from './TableOfContents.module.scss';

const LABEL = { es: 'En esta página', en: 'On this page' } as const;

interface Props {
  headings: HeadingNode[];
  language: 'es' | 'en';
}

export default function TableOfContents({ headings, language }: Props) {
  const [activeId, setActiveId] = useState<string>('');
  // Se guarda en ref para que el efecto no dependa del estado y se re-cree
  // el observer en cada scroll.
  const activeRef = useRef('');

  useEffect(() => {
    if (headings.length === 0) return;

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Entre las secciones visibles gana la más alta en la página; así el
        // resaltado no salta hacia atrás al entrar una sección por abajo.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          const id = visible[0].target.id;
          if (id !== activeRef.current) {
            activeRef.current = id;
            setActiveId(id);
          }
          return;
        }

        // Sin nada en la zona de detección (secciones largas), se mantiene el
        // último encabezado que quedó por encima del viewport.
        const above = elements.filter((element) => element.getBoundingClientRect().top < 120);
        const fallback = above[above.length - 1]?.id;
        if (fallback && fallback !== activeRef.current) {
          activeRef.current = fallback;
          setActiveId(fallback);
        }
      },
      // Banda estrecha cerca del tope: marca como activa la sección que el
      // lector tiene efectivamente delante, no la que apenas asoma abajo.
      { rootMargin: '-80px 0px -70% 0px', threshold: [0, 1] }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [headings]);

  // Con menos de 3 secciones el índice estorba más de lo que ayuda.
  if (headings.length < 3) return null;

  return (
    <nav className={styles.toc} aria-label={LABEL[language]}>
      <p className={styles.title}>{LABEL[language]}</p>
      <ul className={styles.list}>
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`${styles.item} ${heading.level === 3 ? styles.nested : ''}`}
          >
            <a
              href={`#${heading.id}`}
              className={`${styles.link} ${activeId === heading.id ? styles.active : ''}`}
              aria-current={activeId === heading.id ? 'location' : undefined}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
