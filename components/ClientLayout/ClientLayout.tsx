'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useScrollAnimation } from '../../hooks/Scroll';
import styles from './ClientLayout.module.scss'; 
import ThemeToggleButton from '../ThemeToggleButton/ThemeToggleButton';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import { Menu, X } from 'lucide-react';
import { ReactNode } from 'react';
import ChatWidget from '../ChatWidget/ChatWidget';
import { useLanguage } from '../../contexts/LanguageContext';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const elementsRef = useScrollAnimation();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const { t } = useLanguage();
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), 700); // navbar se anima solo al montar
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <header className={`${styles.header} fixed top-0 left-0 w-full z-50`}>
        <nav className={styles.nav}>
          {/* Logo */}
          <motion.section
            id="banner"
            ref={(el) => { elementsRef.current[0] = el; }}
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Link href="/" passHref className={styles.logoLink}>
                <div className={styles.logoContainer}>
                  <Image
                    src="/dev3.png"
                    alt="Logo"
                    width={90}
                    height={90}
                    className={styles.logo}
                  />
                </div>
              </Link>
          </motion.section>

          {/* Botón hamburguesa */}
          <div className={styles.mobileMenuButton}>
            <button onClick={toggleMobileMenu} aria-label="Abrir menú">
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Menú desktop */}
          <section className={`${styles.centerMenu} ${styles.desktopOnly}`}>
            <Link href="/" passHref>
              <p className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}>{t('nav.home')}</p>
            </Link>
            <Link href="/projects" passHref>
              <p className={`${styles.navLink} ${pathname === '/projects' ? styles.active : ''}`}>{t('nav.projects')}</p>
            </Link>
            <Link href="/tutorials" passHref>
              <p className={`${styles.navLink} ${pathname === '/tutorials' ? styles.active : ''}`}>{t('nav.tutorials')}</p>
            </Link>
            <Link href="/about" passHref>
              <p className={`${styles.navLink} ${pathname === '/about' ? styles.active : ''}`}>{t('nav.about')}</p>
            </Link>
            <Link href="/contact" passHref>
              <p className={`${styles.navLink} ${pathname === '/contact' ? styles.active : ''}`}>{t('nav.contact')}</p>
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

        {/* Menú mobile */}
        {isMobileMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Link href="/" passHref>
              <p className={styles.mobileNavLink}>{t('nav.home')}</p>
            </Link>
            <Link href="/projects" passHref>
              <p className={styles.mobileNavLink}>{t('nav.projects')}</p>
            </Link>
            <Link href="/tutorials" passHref>
              <p className={styles.mobileNavLink}>Tutorials</p>
            </Link>
            <Link href="/about" passHref>
              <p className={styles.mobileNavLink}>{t('nav.about')}</p>
            </Link>
            <Link href="/contact" passHref>
              <p className={styles.mobileNavLink}>{t('nav.contact')}</p>
            </Link>
            <div className={styles.mobileThemeToggle}>
              <LanguageSelector />
              <ThemeToggleButton />
            </div>
          </motion.div>
        )}
      </header>

      {/* Contenido principal con espacio para el navbar */}
      <main className={styles.mainContent}>
        <div />
        {children}
      </main>
      
      {/* Chat Widget */}
      <ChatWidget />
    </>
  );
}
