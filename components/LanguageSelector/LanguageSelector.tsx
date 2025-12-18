'use client';

import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './LanguageSelector.module.scss';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={styles.languageSelector}>
      <button
        className={`${styles.languageButton} ${language === 'es' ? styles.active : ''}`}
        onClick={() => setLanguage('es')}
        title="Español"
      >
        ES
      </button>
      <button
        className={`${styles.languageButton} ${language === 'en' ? styles.active : ''}`}
        onClick={() => setLanguage('en')}
        title="English"
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSelector; 