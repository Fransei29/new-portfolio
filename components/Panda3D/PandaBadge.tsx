'use client';

// components/Panda3D/PandaBadge.tsx
// El panda 3D en chico, para poner en lugar de un isotipo 2D (ver
// badgeEngine.ts). El contenedor lo ubica quien lo usa, con su clase y estilo;
// el canvas es más grande que el contenedor (sobresale parejo) para que el
// salto y el giro no se corten.
// Cada vez que cambia `spinKey`, salta con giro.
// Sin WebGL o con reduced motion muestra `fallback` (el isotipo 2D).
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import styles from './PandaBadge.module.scss';
import type { BadgeEngine } from './badgeEngine';

type Props = {
  className?: string;
  style?: CSSProperties;
  spinKey: number;
  fallback: ReactNode;
};

function webglAvailable() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

export default function PandaBadge({ className, style, spinKey, fallback }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<BadgeEngine | null>(null);
  const [mode, setMode] = useState<'loading' | '3d' | 'flat'>('loading');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !webglAvailable()) {
      setMode('flat');
      return;
    }
    const lite = window.matchMedia('(pointer: coarse)').matches;
    let disposed = false;
    const cleanups: (() => void)[] = [];
    const onPointer = (e: PointerEvent) => engineRef.current?.setPointer(e.clientX, e.clientY);

    import('./badgeEngine').then(({ createBadgeEngine }) => {
      if (disposed) return;
      const e = createBadgeEngine(canvas, { lite });
      engineRef.current = e;
      e.resize(canvas.clientWidth, canvas.clientHeight);
      e.ready.then(() => !disposed && setMode('3d')).catch(() => !disposed && setMode('flat'));
      const ro = new ResizeObserver(() => e.resize(canvas.clientWidth, canvas.clientHeight));
      ro.observe(canvas);
      const io = new IntersectionObserver(([entry]) => e.setRunning(entry.isIntersecting));
      io.observe(canvas);
      if (!lite) window.addEventListener('pointermove', onPointer, { passive: true });
      cleanups.push(() => {
        ro.disconnect();
        io.disconnect();
        window.removeEventListener('pointermove', onPointer);
        e.dispose();
        engineRef.current = null;
      });
    });

    return () => {
      disposed = true;
      cleanups.forEach((fn) => fn());
    };
  }, []);

  // Salto con giro en cada cambio (no en el primero).
  const firstSpin = useRef(true);
  useEffect(() => {
    if (firstSpin.current) {
      firstSpin.current = false;
      return;
    }
    engineRef.current?.poke();
  }, [spinKey]);

  return (
    <span className={className} style={style} aria-hidden>
      {mode !== '3d' && fallback}
      <canvas ref={canvasRef} className={`${styles.canvas} ${mode === '3d' ? styles.live : ''}`} />
    </span>
  );
}
