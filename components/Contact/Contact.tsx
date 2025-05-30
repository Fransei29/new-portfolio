import styles from './Contact.module.scss';
import ContactForm from '../ContactForm/ContactForm';
import { MdEmail } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import '../../app/globals.css'

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

          <div className={styles.contactSecond}>
          {/* CONTACT METHODS */}
          <div className={styles.contactMethods}>
            <div className={styles.methods}>
             <div className={styles.method}>
                <MdEmail className={styles.icon} />
                <span className={styles.info} >seilerfranco317@gmail.com</span>
              </div>
              <div className={styles.method}>
                <FaWhatsapp className={styles.icon} />
                <span className={styles.info} >+31620375952</span>
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
