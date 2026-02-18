'use client';

import ClientLayout from '../../components/ClientLayout/ClientLayout';
import ContactPage from '../../components/ContactPage/ContactPage';
import styles from './ContactPage.module.scss';

export default function Contact() {
  return (
    <ClientLayout>
      <main className={styles.container}>
        <ContactPage />
      </main>
    </ClientLayout>
  );
}

