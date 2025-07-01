'use client';

import React from 'react';
import styles from './AboutComponent.module.scss';
import Image from 'next/image';
import { useScrollAnimation } from '../../hooks/Scroll';
import { useLanguage } from '../../contexts/LanguageContext';

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
       
        <section ref={el => { elementsRef.current[1] = el; }} className="fade-in-right">
          <div className={styles.secondPart}>
              <div className={styles.aboutSubtitle}>
                <p>
                {t('about.personalStory')}
                </p>
                <p>
                {t('about.newChapter')}
                </p>
                <p>
                {t('about.dedication')}
                </p>
                <p>
                {t('about.interests')}
                </p>
              </div>
            <div className={styles.imageSection}>
              
                <div className={styles.imageWrapper}>
                    <Image
                        src='/img/franco.jpg'
                        alt="Franco Seiler"
                        width={200}
                        height={200}
                        className={styles.image}
                    />
                </div>
            </div>       
        </div>
        </section>
      </div>
    </section>
  );
};

export default About;
