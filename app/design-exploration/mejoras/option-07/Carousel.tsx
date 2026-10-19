'use client';

// mejoras/option-07 · Carrusel con scroll-snap para el celular.
// La lista es un <ul> nativo que se desplaza con el dedo; los botones, el
// contador y los puntos sólo acompañan. En desktop el CSS la abre en grilla y
// los controles desaparecen, así que este componente no decide el layout.

import { useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './option.module.css';

interface CarouselProps {
  label: string;
  count: number;
  trackClassName?: string;
  children: ReactNode;
}

export default function Carousel({ label, count, trackClassName, children }: CarouselProps) {
  const trackRef = useRef<HTMLUListElement | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const first = track.firstElementChild as HTMLElement | null;
        if (!first) return;
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        const step = first.offsetWidth + gap;
        const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
        setIndex(atEnd ? count - 1 : Math.min(count - 1, Math.round(track.scrollLeft / step)));
      });
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [count]);

  const go = (dir: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const first = track.firstElementChild as HTMLElement | null;
    if (!first) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({ left: dir * (first.offsetWidth + gap), behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <div className={styles.carousel} role="group" aria-roledescription="carrusel" aria-label={label}>
      <ul ref={trackRef} className={`${styles.track} ${trackClassName ?? ''}`} tabIndex={0} aria-label={label}>
        {children}
      </ul>
      <div className={styles.controls}>
        <p className={styles.counter}>
          <span className={styles.counterNow}>{String(index + 1).padStart(2, '0')}</span>
          <span aria-hidden="true"> / </span>
          <span className={styles.srOnly}> de </span>
          {String(count).padStart(2, '0')}
        </p>
        <span className={styles.dots} aria-hidden="true">
          {Array.from({ length: count }, (_, i) => (
            <span key={i} className={`${styles.dot} ${i === index ? styles.dotOn : ''}`} />
          ))}
        </span>
        <span className={styles.arrows}>
          <button type="button" className={styles.arrow} onClick={() => go(-1)} disabled={index === 0} aria-label="Anterior">
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => go(1)}
            disabled={index === count - 1}
            aria-label="Siguiente"
          >
            <span aria-hidden="true">→</span>
          </button>
        </span>
      </div>
    </div>
  );
}
