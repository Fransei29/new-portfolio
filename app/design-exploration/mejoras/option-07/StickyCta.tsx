'use client';

// mejoras/option-07 · Barra inferior fija con el CTA principal, al alcance del
// pulgar. Sólo existe en mobile (lo decide el CSS) y se esconde cuando el
// contacto o el pie ya están en pantalla: ahí repetirla sólo taparía.

import { useEffect, useState } from 'react';
import styles from './option.module.css';

export default function StickyCta({ href, label, note }: { href: string; label: string; note: string }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const targets = ['contacto-sec', 'pie'].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!targets.length || !('IntersectionObserver' in window)) return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
        setHidden(visible.size > 0);
      },
      { rootMargin: '0px 0px -120px 0px' }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <div className={`${styles.sticky} ${hidden ? styles.stickyHidden : ''}`} aria-hidden={hidden}>
      <img src="/brand-isotipo.svg" alt="" width={36} height={36} className={styles.stickyLogo} />
      <p className={styles.stickyNote}>{note}</p>
      <a href={href} className={styles.stickyBtn} tabIndex={hidden ? -1 : undefined}>
        {label}
      </a>
    </div>
  );
}
