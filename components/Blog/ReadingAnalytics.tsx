'use client';

// components/Blog/ReadingAnalytics.tsx
// Mide profundidad de lectura con el Vercel Analytics que ya usa el sitio.
//
// Emite un evento por hito (25/50/75/100%) una sola vez por carga, en vez de
// muestrear scroll continuo: alcanza para saber qué artículos se leen enteros y
// cuáles se abandonan, sin inflar el volumen de eventos.

import { useEffect, useRef } from 'react';
import { track } from '@vercel/analytics';

const MILESTONES = [25, 50, 75, 100] as const;

interface Props {
  slug: string;
  language: 'es' | 'en';
}

export default function ReadingAnalytics({ slug, language }: Props) {
  const reached = useRef<Set<number>>(new Set());

  useEffect(() => {
    // Respeta a quien pidió menos actividad de fondo.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ticking = false;

    const measure = () => {
      ticking = false;

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      // Página más corta que el viewport: no hay nada que medir.
      if (scrollable <= 0) return;

      const percent = Math.min(100, Math.round((window.scrollY / scrollable) * 100));

      for (const milestone of MILESTONES) {
        if (percent >= milestone && !reached.current.has(milestone)) {
          reached.current.add(milestone);
          track('blog_read_depth', { slug, language, depth: milestone });
        }
      }
    };

    // rAF en vez de listener directo: el handler corre una vez por frame como
    // máximo, no en cada evento de scroll.
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    measure(); // por si el artículo entra completo sin scrollear

    return () => window.removeEventListener('scroll', onScroll);
  }, [slug, language]);

  return null;
}
