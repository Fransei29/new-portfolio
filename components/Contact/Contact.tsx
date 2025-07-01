import styles from './Contact.module.scss';
import ContactForm from '../ContactForm/ContactForm';
import { MdEmail } from 'react-icons/md';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import '../../app/globals.css'

const ContactSection = () => {
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

  return (
    <div className={styles.contactSectionContainer}> 
      <div className={styles.contactSection}>
        <div className={styles.contactFirst}>
          <p className={styles.highlight}>
            {t('contact.title')}
          </p>
          <p className={styles.contactSubtitle}>
            {t('contact.subtitle')}
          </p>
          <p className={styles.contactSubtitle}>
            {t('contact.description')}
            <strong> {t('contact.reachOut')}</strong>
          </p>

          <div className={styles.contactSecond}>
          {/* CONTACT METHODS */}
          <div className={styles.contactMethods}>
            <div className={styles.methods}>
              <div className={styles.method}>
                <MdEmail className={styles.icon} />
                <span className={styles.info} >{t('contact.email')}</span>
                <button 
                  className={styles.copyButton}
                  onClick={copyToClipboard}
                  title={t('contact.copyEmail')}
                >
                  {copied ? (
                    <Check className={styles.copyIcon} size={16} />
                  ) : (
                    <Copy className={styles.copyIcon} size={16} />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className={styles.contactForm}>
            <ContactForm />
          </div>
          
          </div> 
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
