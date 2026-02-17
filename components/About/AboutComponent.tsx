'use client';

import React from 'react';
import styles from './AboutComponent.module.scss';
import Image from 'next/image';
import { useScrollAnimation } from '../../hooks/Scroll';
import { useLanguage } from '../../contexts/LanguageContext';
import { Briefcase, TrendingUp, Target, Sparkles } from 'lucide-react';

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
          <section ref={el => { elementsRef.current[1] = el; }} className="fade-in-right">
            <div className={styles.aboutSubtitle}>
              <div className={styles.paragraphWithIcon}>
                <Briefcase className={styles.paragraphIcon} size={20} />
                <p>
                  {t('about.personalStory')}
                </p>
              </div>
              <div className={styles.paragraphWithIcon}>
                <TrendingUp className={styles.paragraphIcon} size={20} />
                <p>
                  {t('about.newChapter')}
                </p>
              </div>
              <div className={styles.paragraphWithIcon}>
                <Target className={styles.paragraphIcon} size={20} />
                <p>
                  {t('about.dedication')}
                </p>
              </div>
              <div className={styles.paragraphWithIcon}>
                <Sparkles className={styles.paragraphIcon} size={20} />
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
