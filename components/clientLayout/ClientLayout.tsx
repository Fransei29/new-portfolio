'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useScrollAnimation } from '../../hooks/Scroll';
import styles from './ClientLayout.module.scss'; 
import ThemeToggleButton from '../themeToggleButton/ThemeToggleButton';
import { Menu, X } from 'lucide-react';
import { ReactNode } from 'react';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const elementsRef = useScrollAnimation();
  const pathname = usePathname();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);


  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>

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



          {/* Botón hamburguesa (solo en mobile) */}
          <motion.div
            className={styles.mobileMenuButton}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button onClick={toggleMobileMenu} aria-label="Abrir menú de navegación">
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </motion.div>

          {/* Menú desktop oculto en mobile */}
          <motion.section
            ref={(el) => { elementsRef.current[1] = el; }}
            className={`${styles.centerMenu} ${styles.desktopOnly}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/" passHref>
              <p className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}>Home</p>
            </Link>
            <Link href="/projects" passHref>
              <p className={`${styles.navLink} ${pathname === '/projects' ? styles.active : ''}`}>Projects</p>
            </Link>
            <Link href="/tutorials" passHref>
              <p className={`${styles.navLink} ${pathname === '/tutorials' ? styles.active : ''}`}>Tutorials</p>
            </Link>
          </motion.section>

          {/* Botón modo oscuro desktop */}
          <motion.section
            ref={(el) => { elementsRef.current[2] = el; }}
            className={styles.desktopOnly}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className={styles.rightContainer}>
              <ThemeToggleButton />
            </div>
          </motion.section>
        </nav>

        {/* Menú desplegable en mobile */}
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
            <div className={styles.mobileThemeToggle}>
              <ThemeToggleButton />
            </div>
          </motion.div>
        )}
      </header>

      {/* Contenido */}
      <motion.main
        className={`transition-opacity duration-700 ease-in ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}
        ref={ref}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
        transition={{ duration: 0.7 }}
      >
        {children}
      </motion.main>
    </>
  );
}
