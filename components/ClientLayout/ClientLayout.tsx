'use client';

import { ReactNode } from 'react';
import ChatWidget from '../ChatWidget/ChatWidget';
import styles from './ClientLayout.module.scss';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Contenido principal con espacio para el navbar */}
      <main className={styles.mainContent}>
        <div />
        {children}
      </main>
      
      {/* Chat Widget */}
      <ChatWidget />
    </>
  );
}
