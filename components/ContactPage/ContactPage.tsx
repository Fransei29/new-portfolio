'use client';

import { useState } from 'react';
import { Mail, Github, Linkedin, Copy, Check } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './ContactPage.module.scss';

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('seilerfranco317@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const openEmail = () => {
    window.location.href = 'mailto:seilerfranco317@gmail.com';
  };

  return (
    <div className={styles.contactPageContainer}>
      <div className={styles.contactPageContent}>
        <div className={styles.contactHeader}>
          <p className={styles.highlight}>{t('contactPage.title')}</p>
          <p className={styles.subtitle}>{t('contactPage.subtitle')}</p>
        </div>

        <div className={styles.contactMethods}>
          <div 
            className={styles.contactCard}
            onClick={openEmail}
          >
            <div className={styles.cardIconWrapper}>
              <Mail className={styles.cardIcon} size={28} />
            </div>
            <div className={styles.cardInfo}>
              <h3 className={styles.cardTitle}>{t('contactPage.email')}</h3>
              <p className={styles.cardSubtitle}>seilerfranco317@gmail.com</p>
            </div>
            <button 
              className={styles.copyButton}
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard();
              }}
              title={t('contact.copyEmail')}
            >
              {copied ? (
                <Check className={styles.copyIcon} size={18} />
              ) : (
                <Copy className={styles.copyIcon} size={18} />
              )}
            </button>
          </div>
          
          <div 
            className={styles.contactCard}
            onClick={() => window.open('https://github.com/Fransei29', '_blank')}
          >
            <div className={styles.cardIconWrapper}>
              <Github className={styles.cardIcon} size={28} />
            </div>
            <div className={styles.cardInfo}>
              <h3 className={styles.cardTitle}>GitHub</h3>
              <p className={styles.cardSubtitle}>@Fransei29</p>
            </div>
          </div>

          <div 
            className={styles.contactCard}
            onClick={() => window.open('https://www.linkedin.com/in/franco-seiler/', '_blank')}
          >
            <div className={styles.cardIconWrapper}>
              <Linkedin className={styles.cardIcon} size={28} />
            </div>
            <div className={styles.cardInfo}>
              <h3 className={styles.cardTitle}>LinkedIn</h3>
              <p className={styles.cardSubtitle}>franco-seiler</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

