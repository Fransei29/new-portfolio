import React from 'react';
import { FaReact } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { FaNodeJs } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import styles from './HomeText.module.scss'; 
import { useScrollAnimation } from '../../hooks/Scroll';
import { useLanguage } from '../../contexts/LanguageContext';

const HomeText: React.FC = () => {
  const elementsRef = useScrollAnimation();
  const { t } = useLanguage();

  return (
  <section className={styles.homeTextContainer}>
    <section ref={(el) => {elementsRef.current[0] = el;}} className="fade-in-right">
        <p className={styles.greeting}>{t('hero.title')}</p>
        <h1 className={styles.mainTitle}>{t('hero.subtitle')}</h1>
    </section>
    <section ref={(el) => {elementsRef.current[1] = el;}} className="fade-in-left">
       <h2 className={styles.subTitle}>{t('hero.description')}</h2>
    </section>
    <section ref={(el) => {elementsRef.current[2] = el;}} className="fade-in-right">
        <p className={styles.description}>
        {t('about.description')}
        </p>
        <div className={styles.techIcons}>
          <FaReact size={28} className={styles.icon} />
          <TbBrandNextjs size={28} className={styles.icon} />
          <FaNodeJs size={28} className={styles.icon} />
          <SiTypescript size={28} className={styles.icon} />
        </div>
    </section>
  </section>

  );
};

export default HomeText;
