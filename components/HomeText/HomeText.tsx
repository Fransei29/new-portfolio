import React from 'react';
import Link from 'next/link';
import styles from './HomeText.module.scss'; 
import { useScrollAnimation } from '../../hooks/Scroll';
import { useLanguage } from '../../contexts/LanguageContext';
import { HiArrowRight } from 'react-icons/hi';

const HomeText: React.FC = () => {
  const elementsRef = useScrollAnimation();
  const { t } = useLanguage();

  return (
  <section className={styles.homeTextContainer}>
    <section ref={(el) => {elementsRef.current[0] = el;}} className="fade-in-right">
        <p className={styles.greeting}>{t('hero.title')}</p>
        <h1 className={styles.mainTitle}>
          {t('hero.subtitle.before')}
          <span className={styles.highlight}>{t('hero.subtitle.highlight')}</span>
          {t('hero.subtitle.after')}
        </h1>
    </section>
    <section ref={(el) => {elementsRef.current[1] = el;}} className="fade-in-left">
       <h2 className={styles.subTitle}>{t('hero.description')}</h2>
    </section>
    <section ref={(el) => {elementsRef.current[2] = el;}} className="fade-in-right">
        {t('about.description') && (
          <p className={styles.description}>
            {t('about.description')}
          </p>
        )}
        <div className={styles.ctaButtons}>
          <Link href="/projects" className={styles.btnPrimary}>
            {t('hero.cta.projects')}
            <HiArrowRight className={styles.arrow} />
          </Link>
          <a 
            href="https://calendly.com/seilerfranco317/30min" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.btnSecondary}
          >
            {t('hero.cta.contact')}
            <HiArrowRight className={styles.arrow} />
          </a>
          {/* <Link href="/bootcamp" className={styles.btnTertiary}>
            {t('hero.cta.bootcamp')}
            <HiArrowRight className={styles.arrow} />
          </Link> */}
        </div>
    </section>
  </section>

  );
};

export default HomeText;
