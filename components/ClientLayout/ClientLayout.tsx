'use client';

import { ReactNode } from 'react';
import styles from './ClientLayout.module.scss';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Contenido principal con espacio para el navbar */}
      <main className={styles.mainContent}>
        <div />
        {children}
      </main>
    </>
  );
}
