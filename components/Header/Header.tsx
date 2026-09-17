'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useScrollAnimation } from '../../hooks/Scroll';
import { useScrollDetection } from '../../hooks/useScrollDetection';
import styles from './Header.module.scss'; 
import ThemeToggleButton from '../ThemeToggleButton/ThemeToggleButton';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import { X, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Header() {
  const elementsRef = useScrollAnimation();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isScrolled = useScrollDetection();
  const { t, language } = useLanguage();
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Cerrar con Escape. El menú ocupa TODA la pantalla, así que el viejo
  // "cerrar al hacer clic fuera" no tenía un afuera donde hacer clic (y su
  // overlay está en display:none). Escape es la única salida por teclado.
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Con el menú abierto la página de atrás seguía scrolleando bajo el panel.
  // Se restaura el valor previo en vez de asumir '': otra parte de la app puede
  // estar bloqueando el scroll por su cuenta.
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [isMobileMenuOpen]);

  // Red de seguridad: si una navegación ocurre por cualquier vía que no sea el
  // onClick de un link (back/forward del navegador, un redirect), el menú se
  // cierra igual en vez de quedar tapando la página nueva.
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <nav className={styles.nav}>
        {/* Logo */}
        <section
          id="banner"
          ref={(el) => { if (el) elementsRef.current[0] = el; }}
        >
          <Link href="/" passHref className={styles.logoLink}>
            <div className={styles.logoContainer}>
              {/* Imagotipo horizontal (panda + wordmark). Se muestra la variante
                  clara u oscura según el tema vía CSS (sin hydration mismatch). */}
              <Image
                src="/brand-header.svg"
                alt="Franco Seiler — Software Studio"
                width={430}
                height={160}
                className={`${styles.logo} ${styles.logoLight}`}
                priority
                unoptimized
              />
              <Image
                src="/brand-header-dark.svg"
                alt="Franco Seiler — Software Studio"
                width={430}
                height={160}
                className={`${styles.logo} ${styles.logoDark}`}
                priority
                unoptimized
              />
            </div>
          </Link>
        </section>

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
              {t('nav.home')}
            </p>
          </Link>
          <Link href="/projects" passHref>
            <p className={`${styles.navLink} ${pathname === '/projects' ? styles.active : ''}`}>
              {t('nav.projects')}
            </p>
          </Link>
          <Link href="/services" passHref>
            <p className={`${styles.navLink} ${pathname === '/services' ? styles.active : ''}`}>
              {t('nav.services')}
            </p>
          </Link>
          <Link href="/blog" passHref>
            {/* startsWith para que el link siga activo dentro de /blog/[slug] */}
            <p className={`${styles.navLink} ${pathname?.startsWith('/blog') ? styles.active : ''}`}>
              {t('nav.blog')}
            </p>
          </Link>
          <Link href="/tutorials" passHref>
            <p className={`${styles.navLink} ${pathname === '/tutorials' ? styles.active : ''}`}>
              {t('nav.tutorials')}
            </p>
          </Link>
          <Link href="/about" passHref>
            <p className={`${styles.navLink} ${pathname === '/about' ? styles.active : ''}`}>
              {t('nav.about')}
            </p>
          </Link>
          <Link href="/contact" passHref>
            <p className={`${styles.navLink} ${pathname === '/contact' ? styles.active : ''}`}>
              {t('nav.contact')}
            </p>
          </Link>
          <a
            href="https://www.youtube.com/@francoseiler1710"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navLink}
            aria-label={t('nav.youtube')}
          >
            {t('nav.youtube')}
            <ArrowUpRight size={14} className={styles.externalArrow} />
          </a>
          <a
            href={`https://bootcamp.francoseiler.com/${language}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navLink}
          >
            {t('nav.bootcamp')}
            <ArrowUpRight size={14} className={styles.externalArrow} />
          </a>
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
        {/* Logo dentro del menú: a pantalla completa el header queda tapado, así
            que sin esto se pierde la referencia de marca y el camino al home.
            Mismas dos variantes light/dark que el header, alternadas por CSS. */}
        <Link href="/" passHref onClick={toggleMobileMenu} className={styles.mobileMenuLogo}>
          <Image
            src="/brand-header.svg"
            alt="Franco Seiler — Software Studio"
            width={430}
            height={160}
            className={`${styles.logo} ${styles.logoLight}`}
            unoptimized
          />
          <Image
            src="/brand-header-dark.svg"
            alt="Franco Seiler — Software Studio"
            width={430}
            height={160}
            className={`${styles.logo} ${styles.logoDark}`}
            unoptimized
          />
        </Link>

        <button 
          className={styles.closeButton}
          onClick={toggleMobileMenu}
          aria-label="Cerrar menú"
        >
          <X size={24} />
        </button>
        
        {/* Sin iconos: la lista se lee como tipografía sola. El estado activo lo
            marca el color del link, no un adorno a la izquierda. */}
        <Link href="/" passHref onClick={toggleMobileMenu}>
          <p className={`${styles.mobileNavLink} ${pathname === '/' ? styles.mobileActive : ''}`}>
            {t('nav.home')}
          </p>
        </Link>
        <Link href="/projects" passHref onClick={toggleMobileMenu}>
          <p className={`${styles.mobileNavLink} ${pathname === '/projects' ? styles.mobileActive : ''}`}>
            {t('nav.projects')}
          </p>
        </Link>
        <Link href="/services" passHref onClick={toggleMobileMenu}>
          <p className={`${styles.mobileNavLink} ${pathname === '/services' ? styles.mobileActive : ''}`}>
            {t('nav.services')}
          </p>
        </Link>
        <Link href="/blog" passHref onClick={toggleMobileMenu}>
          {/* startsWith, igual que en desktop: sigue activo dentro de /blog/[slug] */}
          <p className={`${styles.mobileNavLink} ${pathname?.startsWith('/blog') ? styles.mobileActive : ''}`}>
            {t('nav.blog')}
          </p>
        </Link>
        <Link href="/tutorials" passHref onClick={toggleMobileMenu}>
          <p className={`${styles.mobileNavLink} ${pathname === '/tutorials' ? styles.mobileActive : ''}`}>
            {t('nav.tutorials')}
          </p>
        </Link>
        <Link href="/about" passHref onClick={toggleMobileMenu}>
          <p className={`${styles.mobileNavLink} ${pathname === '/about' ? styles.mobileActive : ''}`}>
            {t('nav.about')}
          </p>
        </Link>
        <Link href="/contact" passHref onClick={toggleMobileMenu}>
          <p className={`${styles.mobileNavLink} ${pathname === '/contact' ? styles.mobileActive : ''}`}>
            {t('nav.contact')}
          </p>
        </Link>
        <a
          href={`https://bootcamp.francoseiler.com/${language}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={toggleMobileMenu}
          className={`${styles.mobileNavLink} ${styles.mobileNavExternal}`}
        >
          {t('nav.bootcamp')}
          <ArrowUpRight size={15} className={styles.mobileExternalArrow} />
        </a>
        <a
          href="https://www.youtube.com/@francoseiler1710"
          target="_blank"
          rel="noopener noreferrer"
          onClick={toggleMobileMenu}
          className={`${styles.mobileNavLink} ${styles.mobileNavExternal}`}
        >
          {t('nav.youtube')}
          <ArrowUpRight size={15} className={styles.mobileExternalArrow} />
        </a>

        <div className={styles.mobileMenuControls}>
          <LanguageSelector />
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
}

