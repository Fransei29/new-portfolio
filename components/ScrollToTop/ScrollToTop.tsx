"use client";

import styles from './ScrollToTop.module.scss';
import { ChevronUp } from 'lucide-react';

export const ScrollToTop = () => {
  return (
    <a href="#banner" className={styles.scrollToTop} aria-label="Volver arriba">
      <ChevronUp size={24} />
    </a>
  );
};
