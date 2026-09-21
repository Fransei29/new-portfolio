'use client';

import React from 'react';
import styles from './AutomationComparison.module.scss';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  Clock,
  AlertTriangle,
  UserMinus,
  FileWarning,
  RefreshCw,
  CheckCheck,
  FileCheck2,
  LayoutGrid,
} from 'lucide-react';

const INDICES = [0, 1, 2, 3];

// Ítems que no se muestran en mobile (clase `.hideOnMobile`), por lado.
//
// En mobile las columnas se apilan una debajo de la otra, así que cada lado se
// lee como su propia lista y no hay pares enfrentados que mantener: por eso se
// puede ocultar una tarjeta de un lado sin tocar la del otro.
//
//   izquierda: se va "Single points of failure" (2) + "Data everywhere" (3)
//   derecha:   se va "Repetition in the background" (0) + "One place for your data" (3)
//
// Quedan 2 tarjetas por lado. En desktop siguen estando las cuatro de cada uno.
const MOBILE_HIDDEN_WITHOUT = [2, 3];
const MOBILE_HIDDEN_WITH = [0, 3];

// Distinct minimal icons per row
const WITHOUT_ICONS = [Clock, AlertTriangle, UserMinus, FileWarning];
const WITH_ICONS = [RefreshCw, CheckCheck, FileCheck2, LayoutGrid];

const AutomationComparison = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.container}>
      <div className={styles.section}>
        <p className="highlight piece-l piece-delay-0">{t('automation.title')}</p>
        <p className={`${styles.subtitle} piece-r piece-delay-1`}>
          {t('automation.subtitleLine2')}
        </p>

        <div className={`${styles.grid} assemble-stagger stagger-alt`}>
          {/* WITHOUT side */}
          <div className={styles.column}>
            <div className={styles.headerRow}>
              <div className={`${styles.eyebrow} ${styles.eyebrowWithout}`}>
                <span className={styles.eyebrowDot} />
                {t('automation.withoutTitle')}
              </div>
              <div className={`${styles.statBlock} ${styles.statBlockWithout}`}>
                <div className={styles.statValue}>{t('automation.withoutStat')}</div>
                <div className={styles.statLabel}>{t('automation.withoutStatLabel')}</div>
              </div>
            </div>

            <h3 className={`${styles.headline} ${styles.headlineWithout}`}>
              {t('automation.withoutHeadline')}{' '}
              <span className={styles.headlineStrike}>
                {t('automation.withoutHeadlineStrike')}
              </span>
            </h3>

            <ul className={styles.list}>
              {INDICES.map((index) => {
                const Icon = WITHOUT_ICONS[index];
                return (
                  <li
                    key={index}
                    className={`${styles.listItem} ${MOBILE_HIDDEN_WITHOUT.includes(index) ? styles.hideOnMobile : ''}`}
                  >
                    <span className={`${styles.itemIcon} ${styles.itemIconWithout}`}>
                      <Icon size={16} aria-hidden />
                    </span>
                    <div className={styles.listText}>
                      <span className={styles.listTitle}>{t(`automation.without.${index}.title`)}</span>
                      <span className={styles.listDescription}>{t(`automation.without.${index}.description`)}</span>
                    </div>
                    <span className={`${styles.itemStat} ${styles.itemStatWithout}`}>
                      {t(`automation.without.${index}.stat`)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* WITH side */}
          <div className={`${styles.column} ${styles.columnWith}`}>
            <div className={styles.headerRow}>
              <div className={`${styles.eyebrow} ${styles.eyebrowWith}`}>
                <span className={styles.eyebrowDot} />
                {t('automation.withTitle')}
              </div>
              <div className={`${styles.statBlock} ${styles.statBlockWith}`}>
                <div className={styles.statValue}>{t('automation.withStat')}</div>
                <div className={styles.statLabel}>{t('automation.withStatLabel')}</div>
              </div>
            </div>

            <h3 className={`${styles.headline} ${styles.headlineWith}`}>
              {t('automation.withHeadline')}{' '}
              <em className={styles.headlineAccent}>
                {t('automation.withHeadlineAccent')}
              </em>
            </h3>

            <ul className={styles.list}>
              {INDICES.map((index) => {
                const Icon = WITH_ICONS[index];
                return (
                  <li
                    key={index}
                    className={`${styles.listItem} ${MOBILE_HIDDEN_WITH.includes(index) ? styles.hideOnMobile : ''}`}
                  >
                    <span className={`${styles.itemIcon} ${styles.itemIconWith}`}>
                      <Icon size={16} aria-hidden />
                    </span>
                    <div className={styles.listText}>
                      <span className={styles.listTitle}>{t(`automation.with.${index}.title`)}</span>
                      <span className={styles.listDescription}>{t(`automation.with.${index}.description`)}</span>
                    </div>
                    <span className={`${styles.itemStat} ${styles.itemStatWith}`}>
                      {t(`automation.with.${index}.stat`)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutomationComparison;
