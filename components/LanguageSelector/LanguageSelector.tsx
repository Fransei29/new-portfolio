'use client';

import React from 'react';
import LanguageIcon from '../../public/NewBrand/icons/language.svg';
import { useLanguage } from '../../contexts/LanguageContext';
import HeaderTooltip from '../HeaderTooltip/HeaderTooltip';
import styles from './LanguageSelector.module.scss';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  return (
    <div className={styles.languageSelector}>
      <HeaderTooltip label={language === 'es' ? 'Ver en inglés' : 'View in Spanish'}>
        <button
          className={`${styles.languageButton} ${styles.active}`}
          onClick={toggleLanguage}
          aria-label={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
        >
          <LanguageIcon className={styles.globeIcon} />
        </button>
      </HeaderTooltip>
    </div>
  );
};

export default LanguageSelector;
