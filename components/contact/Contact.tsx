import styles from './Contact.module.scss';
import ContactForm from '../contactForm/ContactForm';
import '../../app/globals.css'
import { ScrollToTop } from '../ScrollToTop/ScrollToTop';

const ContactSection = () => {
  return (
    <div className={styles.contactSectionContainer}> 
      <div className={styles.contactSection}>
        <div className={styles.contactFirst}>
        <p className={styles.highlight}>
            Get in Touch
          </p>
          <p className={styles.contactSubtitle}>
            I am always open to hearing about new ideas and work opportunities.
          </p>
          <p className={styles.contactSubtitle}>
            If you are looking for a developer passionate about building effective solutions,
            <strong> reach out.</strong>
          </p>
        </div> 
        <div className={styles.contactSecond}>
          <ContactForm />
          <ScrollToTop/>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
