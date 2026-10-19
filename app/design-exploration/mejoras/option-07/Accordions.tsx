'use client';

// mejoras/option-07 · Acordeones que en desktop quedan desplegados.
// Son <details>/<summary> nativos: funcionan sin JS. Este wrapper sólo los abre
// todos a partir de 900px y evita que se cierren ahí, donde se leen como columnas.

import { useEffect, useRef, type ReactNode } from 'react';

const DESKTOP = '(min-width: 900px)';

export default function Accordions({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const mq = window.matchMedia(DESKTOP);
    const items = () => Array.from(root.querySelectorAll('details'));
    const sync = () => {
      if (mq.matches) items().forEach((d) => (d.open = true));
      else items().forEach((d, i) => (d.open = i === 0));
    };
    const guard = (e: Event) => {
      if (mq.matches && (e.target as HTMLElement).closest('summary')) e.preventDefault();
    };
    sync();
    mq.addEventListener('change', sync);
    root.addEventListener('click', guard);
    return () => {
      mq.removeEventListener('change', sync);
      root.removeEventListener('click', guard);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
