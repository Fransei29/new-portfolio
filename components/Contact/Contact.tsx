import styles from './Contact.module.scss';
import { Mail, Github, Linkedin, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useScrollAnimation } from '../../hooks/Scroll';
import '../../app/globals.css'

const ContactSection = () => {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();
  const elementsRef = useScrollAnimation();

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
    <div className={styles.contactSectionContainer}> 
      <div className={styles.contactSection}>
        <section ref={el => { elementsRef.current[0] = el; }} className="fade-in-right">
          <div className={styles.contactFirst}>
            <p className={styles.contactSubtitle}>
              {t('contact.subtitle')}
            </p>
            <p className={styles.contactDescription}>
              {t('contact.description')}
              <strong> {t('contact.reachOut')}</strong>
            </p>
          </div>
        </section>

        <div className={styles.contactGrid}>
          <section ref={el => { elementsRef.current[1] = el; }} className="fade-in-right">
            <div className={styles.contactMethods}>
              <div 
                className={styles.contactCard}
                onClick={openEmail}
              >
                <div className={styles.cardContent}>
                  <Mail className={styles.cardIcon} size={24} />
                  <div className={styles.cardInfo}>
                    <h3 className={styles.cardTitle}>{t('contact.email')}</h3>
                    <p className={styles.cardSubtitle}>seilerfranco317@gmail.com</p>
                  </div>
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
                <div className={styles.cardContent}>
                  <Github className={styles.cardIcon} size={24} />
                  <div className={styles.cardInfo}>
                    <h3 className={styles.cardTitle}>GitHub</h3>
                    <p className={styles.cardSubtitle}>@Fransei29</p>
                  </div>
                </div>
              </div>

              <div 
                className={styles.contactCard}
                onClick={() => window.open('https://www.linkedin.com/in/franco-seiler/', '_blank')}
              >
                <div className={styles.cardContent}>
                  <Linkedin className={styles.cardIcon} size={24} />
                  <div className={styles.cardInfo}>
                    <h3 className={styles.cardTitle}>LinkedIn</h3>
                    <p className={styles.cardSubtitle}>franco-seiler</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
