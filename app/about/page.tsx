'use client';

import ClientLayout from '../../components/ClientLayout/ClientLayout';
import styles from './AboutPage.module.scss';
import About from '../../components/About/AboutComponent';
import Testimonials from '../../components/Testimonials/TestimonialsComponent';
import { useScrollAnimation } from '../../hooks/Scroll';
import '../../app/styles/utilities.scss';
import Button from '../../components/Button/Button';
import { useLanguage } from '../../contexts/LanguageContext';

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
          {/* Testimonials section */}
          <div ref={(el) => { elementsRef.current[2] = el; }} className="fade-in-left">
            <Testimonials />
          </div>

          <div className={styles.buttonContainer}>
          <Button
            text={t('aboutPage.buttonText')}
            href="/contact"
            label={t('aboutPage.buttonLabel')}
          />
          </div>
        </div>
      </main>
    </ClientLayout>
  );
}
