'use client';

import React from 'react';
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
      >
        {language === 'es' ? 'ES' : 'EN'}
      </button>
    </div>
  );
};

export default LanguageSelector; 