'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useScrollAnimation } from '../../hooks/Scroll';
import styles from './ClientLayout.module.scss'; 
import ThemeToggleButton from '../ThemeToggleButton/ThemeToggleButton';
import { Menu, X } from 'lucide-react';
import { ReactNode } from 'react';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const elementsRef = useScrollAnimation();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
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
            <div className={styles.logoContainer}>
              <Image
                src="/dev3.png"
                alt="Logo"
                width={90}
                height={90}
                className={styles.logo}
              />
            </div>
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
              <p className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}>Home</p>
            </Link>
            <Link href="/projects" passHref>
              <p className={`${styles.navLink} ${pathname === '/projects' ? styles.active : ''}`}>Projects</p>
            </Link>
            <Link href="/tutorials" passHref>
              <p className={`${styles.navLink} ${pathname === '/tutorials' ? styles.active : ''}`}>Tutorials</p>
            </Link>
            <Link href="/about" passHref>
              <p className={`${styles.navLink} ${pathname === '/about' ? styles.active : ''}`}>About</p>
            </Link>
            <Link href="/contact" passHref>
              <p className={`${styles.navLink} ${pathname === '/contact' ? styles.active : ''}`}>Contact</p>
            </Link>
          </section>

          {/* Toggle theme */}
          <section className={styles.desktopOnly}>
            <div className={styles.rightContainer}>
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
              <p className={styles.mobileNavLink}>Home</p>
            </Link>
            <Link href="/projects" passHref>
              <p className={styles.mobileNavLink}>Projects</p>
            </Link>
            <Link href="/tutorials" passHref>
              <p className={styles.mobileNavLink}>Tutorials</p>
            </Link>
            <Link href="/about" passHref>
              <p className={styles.mobileNavLink}>About</p>
            </Link>
            <Link href="/contact" passHref>
              <p className={styles.mobileNavLink}>Contact</p>
            </Link>
            <div className={styles.mobileThemeToggle}>
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
    </>
  );
}
