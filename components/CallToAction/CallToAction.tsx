'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../contexts/LanguageContext';
import { HiArrowRight } from 'react-icons/hi';
import styles from './CallToAction.module.scss';

export default function CallToAction() {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const buttonText = isMobile 
    ? (t('aboutPage.buttonTextMobile') ?? t('aboutPage.buttonText') ?? '')
    : (t('aboutPage.buttonText') ?? '');

  return (
    <section className={styles.ctaContainer}>
      <div className={styles.ctaContent}>
        <p className={styles.ctaText}>
          {buttonText.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < buttonText.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
        {t('aboutPage.description') && (
          <p className={styles.ctaDescription}>
            {t('aboutPage.description')}
          </p>
        )}
        <Link href="/contact" className={styles.ctaButton}>
          {t('aboutPage.buttonLabel') ?? ''}
          <HiArrowRight className={styles.arrow} />
        </Link>
      </div>
    </section>
  );
}

