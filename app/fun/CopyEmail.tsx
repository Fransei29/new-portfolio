'use client';

// app/fun/CopyEmail.tsx
// Copia el email con un "¡Copiado!" como respuesta. Si el navegador no deja
// escribir en el portapapeles, lo avisa en vez de fallar en silencio.

import { useEffect, useState } from 'react';

interface CopyEmailProps {
  email: string;
  label: string;
  copiedLabel: string;
  failedLabel: string;
  className?: string;
  doneClassName?: string;
}

export default function CopyEmail({ email, label, copiedLabel, failedLabel, className, doneClassName }: CopyEmailProps) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');

  useEffect(() => {
    if (state === 'idle') return;
    const t = setTimeout(() => setState('idle'), 2200);
    return () => clearTimeout(t);
  }, [state]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState('copied');
    } catch {
      setState('failed');
    }
  };

  return (
    <button type="button" onClick={copy} className={`${className ?? ''} ${state === 'copied' ? doneClassName ?? '' : ''}`}>
      <span aria-live="polite">{state === 'copied' ? copiedLabel : state === 'failed' ? failedLabel : label}</span>
    </button>
  );
}
