'use client';

import React from 'react';
import styles from './AboutComponent.module.scss';
import Image from 'next/image';
import { useScrollAnimation } from '../../hooks/Scroll';
import { useLanguage } from '../../contexts/LanguageContext';
import { Target, Sparkles } from 'lucide-react';

const About = () => {
  const elementsRef = useScrollAnimation();
  const { t } = useLanguage();

  return (
    <section className={styles.aboutContainer}>
      <div className={styles.aboutSection}>
        <section ref={el => { elementsRef.current[0] = el; }} className="fade-in-right">
          <div className={styles.firstPart}>
            <p className={styles.highlight}>
              {t('about.whoIAm')}
            </p>
          </div>   
        </section>
       
        <div className={styles.contentGrid}>
          <section ref={el => { elementsRef.current[1] = el; }} className={`${styles.leftColumn} fade-in-right`}>
            <div className={styles.introSection}>
              <p className={styles.introParagraph}>
                {t('about.personalStory')}
              </p>
              <p className={styles.introParagraph}>
                {t('about.newChapter')}
              </p>
            </div>

            <div className={styles.cardsRow}>
              <div className={styles.paragraphWithIcon}>
                <div className={styles.cardHeader}>
                  <Target className={styles.paragraphIcon} size={20} />
                  <h4 className={styles.cardTitle}>{t('about.dedicationTitle')}</h4>
                </div>
                <p>
                  {t('about.dedication')}
                </p>
              </div>
              <div className={styles.paragraphWithIcon}>
                <div className={styles.cardHeader}>
                  <Sparkles className={styles.paragraphIcon} size={20} />
                  <h4 className={styles.cardTitle}>{t('about.interestsTitle')}</h4>
                </div>
                <p>
                  {t('about.interests')}
                </p>
              </div>
            </div>
          </section>

          <section className={styles.imageSection}>
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
