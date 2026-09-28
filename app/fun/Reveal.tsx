'use client';

// app/fun/Reveal.tsx
// Aparición suave al entrar en pantalla. Un IntersectionObserver por elemento,
// sin librerías. Con prefers-reduced-motion el contenido se muestra directo.
//
// Sin JavaScript (o antes de hidratar) el contenido ya está visible: el estado
// oculto sólo se aplica cuando el observer está listo, así nada queda en blanco.

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Retraso en ms, para escalonar elementos de una misma fila. */
  delay?: number;
  /** Desplazamiento inicial en px. */
  y?: number;
}

export default function Reveal({ children, as: Tag = 'div', className, delay = 0, y = 16 }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [state, setState] = useState<'idle' | 'hidden' | 'shown'>('idle');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setState('shown');
      return;
    }
    // Lo que ya está en pantalla al cargar no se anima: evita el parpadeo del hero.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      setState('shown');
      return;
    }
    setState('hidden');
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('shown');
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style: CSSProperties =
    state === 'idle'
      ? {}
      : {
          opacity: state === 'shown' ? 1 : 0,
          transform: state === 'shown' ? 'none' : `translateY(${y}px)`,
          transition: `opacity 600ms ease ${delay}ms, transform 600ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
        };

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
