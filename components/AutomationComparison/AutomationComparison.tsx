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
            <ul className={styles.list}>
              {INDICES.map((index) => (
                <li key={index} className={styles.listItem}>
                  <XCircle size={18} className={styles.cardIconWithout} aria-hidden />
                  <div className={styles.listText}>
                    <span className={styles.listTitle}>{t(`automation.without.${index}.title`)}</span>
                    <span className={styles.listDescription}>{t(`automation.without.${index}.description`)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.column}>
            <div className={styles.columnHeader}>
              <CheckCircle2 size={24} className={styles.iconWith} aria-hidden />
              <h3 className={styles.columnTitle}>{t('automation.withTitle')}</h3>
            </div>
            <ul className={styles.list}>
              {INDICES.map((index) => (
                <li key={index} className={styles.listItem}>
                  <CheckCircle2 size={18} className={styles.cardIconWith} aria-hidden />
                  <div className={styles.listText}>
                    <span className={styles.listTitle}>{t(`automation.with.${index}.title`)}</span>
                    <span className={styles.listDescription}>{t(`automation.with.${index}.description`)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutomationComparison;
