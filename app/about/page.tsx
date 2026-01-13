'use client';

import ClientLayout from '../../components/ClientLayout/ClientLayout';
import styles from './AboutPage.module.scss';
import About from '../../components/About/AboutComponent';
import { useScrollAnimation } from '../../hooks/Scroll';
import '../../app/styles/utilities.scss';
import { useLanguage } from '../../contexts/LanguageContext';
import ContactSection from '../../components/Contact/Contact';
import Skills from '../../components/Skills/Skills';

export default function AboutPage() {
  const elementsRef = useScrollAnimation();
  const { t } = useLanguage();

  return (
    <ClientLayout>
      <main className={styles.container}>

        <div className={styles.containerContent}>
          {/* About section */}
          <div ref={(el) => { elementsRef.current[0] = el; }} className="fade-in-right">
            <About />
          </div>
          
          {/* Skills section */}
          <div ref={(el) => { elementsRef.current[1] = el; }} className="fade-in-left">
            <Skills />
          </div>

          {/* Contact section */}
          <div ref={(el) => { elementsRef.current[2] = el; }} className="fade-in-right">
            <ContactSection />
          </div>
        </div>
      </main>
    </ClientLayout>
  );
}
