'use client';

import React, { useState } from "react";
import styles from "./Experience.module.scss";
import "../../app/globals.css";
import { useScrollAnimation } from '../../hooks/Scroll';
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useLanguage } from '../../contexts/LanguageContext';

interface IsOpenState {
  [key: string]: boolean;
}

const Experience: React.FC = () => {
  const [isOpen, setIsOpen] = useState<IsOpenState>({});
  const elementsRef = useScrollAnimation();
  const { t } = useLanguage();

  const toggleDetail = (id: string): void => {
    setIsOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderIcon = () => (
    <span className={styles.timelineIcon}>
      <svg
        className={styles.timelineSvg}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
      </svg>
    </span>
  );

  return (
    <section className={styles.experienceContainer}>
      <div className={styles.experienceSection}>
        <p className={styles.highlight}>{t('experience.title')}</p>
        <p className={styles.subtitle}>{t('experience.subtitle')}</p>
        <ol className={styles.timeline}>

        <section ref={el => { elementsRef.current[1] = el; }} className="fade-in-left">
            <li className={styles.timelineItem} onClick={() => toggleDetail("freelance")}>
              <div className={styles.timelineLeft}><div className={styles.timelineIcon}>{renderIcon()}</div></div>
              <div className={styles.timelineRight}>
                <h3 className={styles.titleExperience}>
                  <div className={styles.titleExperienceContent}>
                    <span className={styles.jobTitle}>{t('experience.freelance.title')}</span>
                    <span className={styles.companyName}>{t('experience.freelance.company')}</span>
                  </div>
                  <HiOutlineArrowNarrowRight className={`${styles.clickIcon} ${isOpen.freelance ? styles.iconOpen : ''}`} />
                </h3>
                <time className={styles.experienceDate}>{t('experience.freelance.period')}</time>
                {isOpen.freelance && (
                  <ul className={styles.experienceList}>
                    <li dangerouslySetInnerHTML={{ __html: t('experience.freelance.responsibilities.0') }} />
                    <li dangerouslySetInnerHTML={{ __html: t('experience.freelance.responsibilities.1') }} />
                    <li dangerouslySetInnerHTML={{ __html: t('experience.freelance.responsibilities.2') }} />
                    <li dangerouslySetInnerHTML={{ __html: t('experience.freelance.responsibilities.3') }} />
                  </ul>
                )}
              </div>
            </li>
          </section>

        <section ref={el => { elementsRef.current[3] = el; }} className="fade-in-left">
            <li className={styles.timelineItem} onClick={() => toggleDetail("morseVerse")}>
              <div className={styles.timelineLeft}><div className={styles.timelineIcon}>{renderIcon()}</div></div>
              <div className={styles.timelineRight}>
                <h3 className={styles.titleExperience}>
                  <div className={styles.titleExperienceContent}>
                    <span className={styles.jobTitle}>{t('experience.morseVerse.title')}</span>
                    <span className={styles.companyName}>{t('experience.morseVerse.company')}</span>
                  </div>
                  <HiOutlineArrowNarrowRight className={`${styles.clickIcon} ${isOpen.morseVerse ? styles.iconOpen : ''}`} />
                </h3>
                <time className={styles.experienceDate}>{t('experience.morseVerse.period')}</time>
                {isOpen.morseVerse && (
                  <ul className={styles.experienceList}>
                    <li dangerouslySetInnerHTML={{ __html: t('experience.morseVerse.responsibilities.0') }} />
                    <li dangerouslySetInnerHTML={{ __html: t('experience.morseVerse.responsibilities.1') }} />
                    <li dangerouslySetInnerHTML={{ __html: t('experience.morseVerse.responsibilities.2') }} />
                    <li dangerouslySetInnerHTML={{ __html: t('experience.morseVerse.responsibilities.3') }} />
                  </ul>
                )}
              </div>
            </li>
          </section>

          <section ref={el => { elementsRef.current[0] = el; }} className="fade-in-right">
            <li className={styles.timelineItem} onClick={() => toggleDetail("coursfy")}>
              <div className={styles.timelineLeft}><div className={styles.timelineIcon}>{renderIcon()}</div></div>
              <div className={styles.timelineRight}>
                <h3 className={styles.titleExperience}>
                  <div className={styles.titleExperienceContent}>
                    <span className={styles.jobTitle}>{t('experience.intelligentApps.title')}</span>
                    <span className={styles.companyName}>{t('experience.intelligentApps.company')}</span>
                  </div>
                  <HiOutlineArrowNarrowRight className={`${styles.clickIcon} ${isOpen.coursfy ? styles.iconOpen : ''}`} />
                </h3>
                <time className={styles.experienceDate}>{t('experience.intelligentApps.period')}</time>
                {isOpen.coursfy && (
                  <ul className={styles.experienceList}>
                    <li dangerouslySetInnerHTML={{ __html: t('experience.intelligentApps.responsibilities.0') }} />
                    <li dangerouslySetInnerHTML={{ __html: t('experience.intelligentApps.responsibilities.1') }} />
                    <li dangerouslySetInnerHTML={{ __html: t('experience.intelligentApps.responsibilities.2') }} />
                    <li dangerouslySetInnerHTML={{ __html: t('experience.intelligentApps.responsibilities.3') }} />
                  </ul>
                )}
              </div>
            </li>
          </section>
  
  
          <section ref={el => { elementsRef.current[2] = el; }} className="fade-in-right">
            <li className={styles.timelineItem} onClick={() => toggleDetail("digitalInnovators")}>
              <div className={styles.timelineLeft}><div className={styles.timelineIcon}>{renderIcon()}</div></div>
              <div className={styles.timelineRight}>
                <h3 className={styles.titleExperience}>
                  <div className={styles.titleExperienceContent}>
                    <span className={styles.jobTitle}>{t('experience.digitalInnovators.title')}</span>
                    <span className={styles.companyName}>{t('experience.digitalInnovators.company')}</span>
                  </div>
                  <HiOutlineArrowNarrowRight className={`${styles.clickIcon} ${isOpen.digitalInnovators ? styles.iconOpen : ''}`} />
                </h3>
                <time className={styles.experienceDate}>{t('experience.digitalInnovators.period')}</time>
                {isOpen.digitalInnovators && (
                  <ul className={styles.experienceList}>
                    <li dangerouslySetInnerHTML={{ __html: t('experience.digitalInnovators.responsibilities.0') }} />
                    <li dangerouslySetInnerHTML={{ __html: t('experience.digitalInnovators.responsibilities.1') }} />
                    <li dangerouslySetInnerHTML={{ __html: t('experience.digitalInnovators.responsibilities.2') }} />
                    <li dangerouslySetInnerHTML={{ __html: t('experience.digitalInnovators.responsibilities.3') }} />
                  </ul>
                )}
              </div>
            </li>
          </section>
  
        </ol>
      </div>
    </section>
  );
}  
export default Experience;
