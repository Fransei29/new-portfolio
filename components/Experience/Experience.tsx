'use client';

import React, { useState } from 'react';
import styles from './Experience.module.scss';
import '../../app/globals.css';
import { useScrollAnimation } from '../../hooks/Scroll';
import { useLanguage } from '../../contexts/LanguageContext';

// The locale data is keyed by job (experience.<key>.title / company / period /
// responsibilities[]). We list the keys in display order (most recent first)
// and resolve each field through t() at render time.
const JOB_KEYS = ['freelance', 'morseVerse', 'intelligentApps', 'digitalInnovators'] as const;

const Experience: React.FC = () => {
  const { t } = useLanguage();
  const elementsRef = useScrollAnimation();

  // Master-detail: one job is always active; clicking another swaps the detail
  // panel in place, which keeps the layout fixed and easy to scan.
  const [activeKey, setActiveKey] = useState<string>(JOB_KEYS[0]);

  // responsibilities/tags are arrays in the locale JSON, but this project's t()
  // returns non-string values as JSON.stringify(...), so we parse them back.
  const getArray = (key: string): string[] => {
    try {
      const parsed = JSON.parse(t(key));
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  return (
    <section className={styles.experienceContainer}>
      <div className={styles.experienceSection}>
        <p className={styles.highlight}>{t('experience.title')}</p>
        <p className={styles.subtitle}>{t('experience.subtitle')}</p>

        <div
          ref={(el) => { elementsRef.current[0] = el; }}
          className={styles.layout}
        >
          {/* Master: the list of roles */}
          <ul className={styles.list} role="tablist" aria-label={t('experience.title')}>
            {JOB_KEYS.map((key) => {
              const selected = key === activeKey;
              return (
                <li key={key}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    className={`${styles.listItem} ${selected ? styles.listItemActive : ''}`}
                    onClick={() => setActiveKey(key)}
                  >
                    <span className={styles.listText}>
                      <span className={styles.listRole}>{t(`experience.${key}.title`)}</span>
                      <span className={styles.listCompany}>{t(`experience.${key}.company`)}</span>
                      <span className={styles.listPeriod}>{t(`experience.${key}.period`)}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Detail: re-keyed on activeKey so its fade replays on each swap. */}
          <div className={styles.detail} role="tabpanel" key={activeKey}>
            <div className={styles.detailHeader}>
              <div className={styles.detailHeading}>
                <h3 className={styles.detailRole}>{t(`experience.${activeKey}.title`)}</h3>
                <span className={styles.detailCompany}>{t(`experience.${activeKey}.company`)}</span>
              </div>
              <span className={styles.detailPeriod}>{t(`experience.${activeKey}.period`)}</span>
            </div>
            <ul className={styles.detailList}>
              {getArray(`experience.${activeKey}.responsibilities`).map((item, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>

            {getArray(`experience.${activeKey}.tags`).length > 0 && (
              <ul className={styles.tags} aria-label="Tech stack">
                {getArray(`experience.${activeKey}.tags`).map((tag, i) => (
                  <li key={i} className={styles.tag}>{tag}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
