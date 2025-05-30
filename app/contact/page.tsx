'use client';

import ClientLayout from '../../components/ClientLayout/ClientLayout';
import styles from './ContactPage.module.scss';
import { useScrollAnimation } from '../../hooks/Scroll';
import '../../app/styles/utilities.scss';
import ContactSection from '../../components/Contact/Contact';

export default function AboutPage() {
  const elementsRef = useScrollAnimation();

  return (
    <ClientLayout>
      <main className={styles.container}>

      <div className={styles.containerContent}> 

        <div ref={(el) => { elementsRef.current[0] = el; }} className="fade-in-right">
          <ContactSection />
        </div>
        
      </div>

      </main>
    </ClientLayout>
  );
}
