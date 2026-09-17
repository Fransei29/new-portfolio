'use client';

import React from 'react';
import styles from './AboutComponent.module.scss';
import Image from 'next/image';
import { useLanguage } from '../../contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.aboutContainer}>
      <div className={styles.aboutSection}>
        <section>
          <div className={styles.firstPart}>
            <h1 className="highlight piece-l piece-delay-0">
              {t('about.whoIAm')}
            </h1>
          </div>
        </section>
       
        <div className={styles.contentGrid}>
          <section className={`${styles.leftColumn} piece-l piece-delay-1`}>
            <div className={styles.introSection}>
              <p className={styles.introParagraph}>
                {t('about.personalStory')}
              </p>
              <p className={styles.introParagraph}>
                {t('about.teamNote')}
              </p>
              <p className={styles.introParagraph}>
                {t('about.newChapter')}
              </p>
            </div>

            {/* Antes había dos tarjetas con frases genéricas ("ship small,
                measure, iterate") que cualquiera podría firmar. Acá van hechos
                verificables: en una sección de identidad, un dato prueba más
                que una declaración de principios. */}
            <dl className={styles.statsRow}>
              <div className={styles.stat}>
                <dt className={styles.statLabel}>{t('about.dedicationTitle')}</dt>
                <dd className={styles.statValue}>{t('about.dedication')}</dd>
              </div>
              <div className={styles.stat}>
                <dt className={styles.statLabel}>{t('about.interestsTitle')}</dt>
                <dd className={styles.statValue}>{t('about.interests')}</dd>
              </div>
              <div className={styles.stat}>
                <dt className={styles.statLabel}>{t('about.reachTitle')}</dt>
                <dd className={styles.statValue}>{t('about.reach')}</dd>
              </div>
            </dl>
          </section>

          <section className={`${styles.imageSection} piece-r piece-delay-2`}>
            <div className={styles.imageWrapper}>
              <Image
                src='/yo.jpg'
                alt="Franco Seiler"
                width={200}
                height={200}
                className={styles.image}
              />
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default About;
