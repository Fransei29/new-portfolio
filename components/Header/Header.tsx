'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useScrollAnimation } from '../../hooks/Scroll';
import { useScrollDetection } from '../../hooks/useScrollDetection';
import styles from './Header.module.scss'; 
import ThemeToggleButton from '../ThemeToggleButton/ThemeToggleButton';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import { X, Home, FolderOpen, BookOpen, User, Mail } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Header() {
  const elementsRef = useScrollAnimation();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const isScrolled = useScrollDetection();
  const { t } = useLanguage();
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), 700);
    return () => clearTimeout(timer);
  }, []);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest(`.${styles.mobileMenu}`) && !target.closest(`.${styles.mobileMenuButton}`)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <nav className={styles.nav}>
        {/* Logo */}
        <motion.section
          id="banner"
          ref={(el) => { if (el) elementsRef.current[0] = el; }}
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          key="header-logo"
          >
            <Link href="/" passHref className={styles.logoLink}>
              <div className={styles.logoContainer}>
                <Image
                  src="/dev3.png"
                  alt="Logo"
                  width={60}
                  height={60}
                  className={styles.logo}
                  priority
                  unoptimized
                  key="logo-image"
                />
              </div>
            </Link>
        </motion.section>

        {/* Botón hamburguesa */}
        <div className={styles.mobileMenuButton}>
          <button 
            onClick={toggleMobileMenu} 
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            className={isMobileMenuOpen ? styles.open : ''}
          >
            <span className={styles.hamburgerIcon}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>

        {/* Menú desktop */}
        <section className={`${styles.centerMenu} ${styles.desktopOnly}`}>
          <Link href="/" passHref>
            <p className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}>
              <Home size={20} className={styles.navIcon} />
              {t('nav.home')}
            </p>
          </Link>
          <Link href="/projects" passHref>
            <p className={`${styles.navLink} ${pathname === '/projects' ? styles.active : ''}`}>
              <FolderOpen size={20} className={styles.navIcon} />
              {t('nav.projects')}
            </p>
          </Link>
          <Link href="/tutorials" passHref>
            <p className={`${styles.navLink} ${pathname === '/tutorials' ? styles.active : ''}`}>
              <BookOpen size={20} className={styles.navIcon} />
              {t('nav.tutorials')}
            </p>
          </Link>
          <Link href="/about" passHref>
            <p className={`${styles.navLink} ${pathname === '/about' ? styles.active : ''}`}>
              <User size={20} className={styles.navIcon} />
              {t('nav.about')}
            </p>
          </Link>
        </section>

        {/* Toggle theme y Language selector */}
        <section className={styles.desktopOnly}>
          <div className={styles.rightContainer}>
            <LanguageSelector />
            <ThemeToggleButton />
          </div>
        </section>
      </nav>

      {/* Overlay para cerrar menú */}
      {isMobileMenuOpen && (
        <div 
          className={styles.menuOverlay}
          onClick={toggleMobileMenu}
        />
      )}

      {/* Menú mobile */}
      <div
        className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}
      >
        <button 
          className={styles.closeButton}
          onClick={toggleMobileMenu}
          aria-label="Cerrar menú"
        >
          <X size={24} />
        </button>
        
        <Link href="/" passHref onClick={toggleMobileMenu}>
          <p className={styles.mobileNavLink}>
            <Home size={18} className={styles.mobileNavIcon} />
            {t('nav.home')}
          </p>
        </Link>
        <Link href="/projects" passHref onClick={toggleMobileMenu}>
          <p className={styles.mobileNavLink}>
            <FolderOpen size={18} className={styles.mobileNavIcon} />
            {t('nav.projects')}
          </p>
        </Link>
        <Link href="/tutorials" passHref onClick={toggleMobileMenu}>
          <p className={styles.mobileNavLink}>
            <BookOpen size={18} className={styles.mobileNavIcon} />
            {t('nav.tutorials')}
          </p>
        </Link>
        <Link href="/about" passHref onClick={toggleMobileMenu}>
          <p className={styles.mobileNavLink}>
            <User size={18} className={styles.mobileNavIcon} />
            {t('nav.about')}
          </p>
        </Link>
        <div className={styles.mobileThemeToggle}>
          <LanguageSelector />
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
}

