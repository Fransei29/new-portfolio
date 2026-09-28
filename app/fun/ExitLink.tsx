'use client';

// app/fun/ExitLink.tsx
// Link de vuelta al sitio clásico con la transición de salida. Es un link real:
// con Ctrl/Cmd+clic o con movimiento reducido navega directo.

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { MouseEvent, ReactNode } from 'react';
import { EXIT_NAV_DELAY, playExit, prefersReducedMotion } from '../../components/FunModeButton/funTransition';

interface ExitLinkProps {
  className?: string;
  children: ReactNode;
  'aria-label'?: string;
}

export default function ExitLink({ className, children, ...rest }: ExitLinkProps) {
  const router = useRouter();

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (prefersReducedMotion()) return;
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    playExit(rect.left + rect.width / 2, rect.top + rect.height / 2);
    window.setTimeout(() => router.push('/'), EXIT_NAV_DELAY);
  };

  return (
    <Link href="/" className={className} onClick={onClick} onMouseEnter={() => router.prefetch('/')} {...rest}>
      {children}
    </Link>
  );
}
