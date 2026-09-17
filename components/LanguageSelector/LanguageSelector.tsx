'use client';

import React from 'react';
import LanguageIcon from '../../public/NewBrand/icons/language.svg';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './LanguageSelector.module.scss';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  return (
    <div className={styles.languageSelector}>
      <button
        className={`${styles.languageButton} ${styles.active}`}
        onClick={toggleLanguage}
        title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
        aria-label={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
      >
        <LanguageIcon className={styles.globeIcon} />
      </button>
    </div>
  );
};

export default LanguageSelector;
