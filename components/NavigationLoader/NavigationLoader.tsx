'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinnerComponent';
import styles from './NavigationLoader.module.scss';

export default function NavigationLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  // When pathname changes → navigation is complete → hide
  useEffect(() => {
    if (loading) {
      // Brief pause so the new page has time to paint, then fade out
      const t = setTimeout(() => setLoading(false), 120);
      return () => clearTimeout(t);
    }
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (loading) {
      setVisible(true);
    } else {
      const t = setTimeout(() => setVisible(false), 350);
      return () => clearTimeout(t);
    }
  }, [loading]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Only internal navigation links that differ from current path
      const isInternal = href.startsWith('/') && !href.startsWith('//');
      const isDifferent = href.split('?')[0] !== pathname;
      const isNotAnchor = !href.startsWith('#');

      if (isInternal && isDifferent && isNotAnchor) {
        setLoading(true);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [pathname]);

  if (!visible) return null;

  return (
    <div className={`${styles.overlay} ${loading ? styles.show : styles.hide}`}>
      <LoadingSpinner />
    </div>
  );
}
