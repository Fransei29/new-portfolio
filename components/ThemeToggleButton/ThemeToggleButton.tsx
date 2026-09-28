'use client';

import { useEffect, useState } from 'react';
import { useThemeTransition } from '../../hooks/useThemeTransition';
import MoonIcon from '../../public/NewBrand/icons/mode-dark.svg';
import SunIcon from '../../public/NewBrand/icons/sun-light.svg';
import HeaderTooltip from '../HeaderTooltip/HeaderTooltip';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './ThemeToggleButton.module.scss';

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useThemeTransition();
  const { language } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  // El tooltip nombra el modo al que se pasa, igual que el ícono.
  const tip =
    theme === 'light'
      ? language === 'es' ? 'Modo oscuro' : 'Dark mode'
      : language === 'es' ? 'Modo claro' : 'Light mode';

  return (
    <HeaderTooltip label={tip}>
      <button
        onClick={toggleTheme}
        className={`${styles.themeToggleButton} ${theme === 'dark' ? styles.dark : ''}`}
        aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      >
        {/* En light se muestra la luna (la acción: pasar a dark) y en dark el sol.
            Los SVG de marca miden 1em: el tamaño lo fija font-size en .icon. */}
        {theme === 'light' ? (
          <MoonIcon className={styles.icon} />
        ) : (
          <SunIcon className={styles.icon} />
        )}
      </button>
    </HeaderTooltip>
  );
}
