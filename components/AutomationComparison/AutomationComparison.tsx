'use client';

import React from 'react';
import styles from './AutomationComparison.module.scss';
import { useScrollAnimation } from '../../hooks/Scroll';
import { useLanguage } from '../../contexts/LanguageContext';
import { XCircle, CheckCircle2 } from 'lucide-react';

const INDICES = [0, 1, 2, 3];

const AutomationComparison = () => {
  const elementsRef = useScrollAnimation();
  const { t } = useLanguage();

  return (
    <section className={styles.container}>
      <div className={styles.section}>
        <p className="highlight">{t('automation.title')}</p>
        <p className={styles.subtitle}>
          {t('automation.subtitleLine1')}
          <br />
          {t('automation.subtitleLine2')}
        </p>

        <div ref={(el) => { elementsRef.current[0] = el; }} className={styles.grid}>
          <div className={styles.column}>
            <div className={styles.columnHeader}>
              <XCircle size={24} className={styles.iconWithout} aria-hidden />
              <h3 className={styles.columnTitle}>{t('automation.withoutTitle')}</h3>
            </div>
            <div className={styles.cardList}>
              {INDICES.map((index) => (
                <div key={index} className={`${styles.card} ${styles.cardWithout}`}>
                  <XCircle size={20} className={styles.cardIconWithout} aria-hidden />
                  <div className={styles.cardBody}>
                    <h4 className={styles.cardTitle}>{t(`automation.without.${index}.title`)}</h4>
                    <p className={styles.cardDescription}>{t(`automation.without.${index}.description`)}</p>
                    <span className={styles.badge}>{t(`automation.without.${index}.badge`)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.column}>
            <div className={styles.columnHeader}>
              <CheckCircle2 size={24} className={styles.iconWith} aria-hidden />
              <h3 className={styles.columnTitle}>{t('automation.withTitle')}</h3>
            </div>
            <div className={styles.cardList}>
              {INDICES.map((index) => (
                <div key={index} className={`${styles.card} ${styles.cardWith}`}>
                  <CheckCircle2 size={20} className={styles.cardIconWith} aria-hidden />
                  <div className={styles.cardBody}>
                    <h4 className={styles.cardTitle}>{t(`automation.with.${index}.title`)}</h4>
                    <p className={styles.cardDescription}>{t(`automation.with.${index}.description`)}</p>
                    <span className={styles.badge}>{t(`automation.with.${index}.badge`)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutomationComparison;
