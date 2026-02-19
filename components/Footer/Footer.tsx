'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Footer.module.scss';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';
import { useLanguage } from '../../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const copyEmail = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const email = 'seilerfranco317@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Brand Section */}
        <div className={styles.brandSection}>
          <div className={styles.brand}>
            <Image src='/Logo.svg' alt="Franco Seiler Logo" width={55} height={55} className={styles.logo} />
          </div>
          <div className={styles.socials}>
            <a 
              href="https://github.com/francoseiler" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub"
              className={styles.socialLink}
            >
              <FaGithub />
            </a>
            <a 
              href="https://linkedin.com/in/francoseiler" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn"
              className={styles.socialLink}
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Navigation Section */}
        <div className={styles.navSection}>
          <h3 className={styles.sectionTitle}>{t('footer.navigation')}</h3>
          <nav className={styles.navLinks}>
            <Link href="/" className={styles.navLink}>
              {t('nav.home')}
            </Link>
            <Link href="/projects" className={styles.navLink}>
              {t('nav.projects')}
            </Link>
            <Link href="/tutorials" className={styles.navLink}>
              {t('nav.tutorials')}
            </Link>
            <Link href="/about" className={styles.navLink}>
              {t('nav.about')}
            </Link>
          </nav>
        </div>

        {/* Contact Section */}
        <div className={styles.contactSection}>
          <h3 className={styles.sectionTitle}>{t('footer.contact')}</h3>
          <div className={styles.contactInfo}>
            <a 
              href="mailto:seilerfranco317@gmail.com" 
              className={styles.contactLink}
              onClick={copyEmail}
              title={copied ? 'Copied!' : 'Click to copy email'}
            >
              <span className={styles.emailText}>{copied ? 'Copied!' : 'seilerfranco317@gmail.com'}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <p>&copy; 2025 {t('footer.by')}. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
