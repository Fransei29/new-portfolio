'use client';

// option-07/CopyEmail.tsx
// Botón para copiar el email con un pequeño "¡Copiado!" como feedback.
// El estado se anuncia por aria-live para lectores de pantalla.

import { useEffect, useState } from 'react';

export default function CopyEmail({ email, className, doneClassName }: { email: string; className?: string; doneClassName?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button type="button" onClick={copy} className={`${className ?? ''} ${copied ? doneClassName ?? '' : ''}`}>
      <span aria-live="polite">{copied ? '¡Copiado!' : 'Copiar email'}</span>
    </button>
  );
}
