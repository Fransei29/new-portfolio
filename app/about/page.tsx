'use client';

import ClientLayout from '../../components/ClientLayout/ClientLayout';
import styles from './AboutPage.module.scss';
import About from '../../components/About/AboutComponent';
import Testimonials from '../../components/Testimonials/TestimonialsComponent';
import { useScrollAnimation } from '../../hooks/Scroll';
import '../../app/styles/utilities.scss';
import { Services } from '../../components/Services/ServicesComponent';
import Button from '../../components/Button/Button';

export default function AboutPage() {
  const elementsRef = useScrollAnimation();

  return (
    <ClientLayout>
      <main className={styles.container}>

        <div className={styles.containerContent}>
          {/* About section */}
          <div ref={(el) => { elementsRef.current[0] = el; }} className="fade-in-right">
            <About />
          </div>

          <div ref={(el) => { elementsRef.current[1] = el; }} className="fade-in-left">
           <Services />
          </div>

          {/* Testimonials section */}
          <div ref={(el) => { elementsRef.current[2] = el; }} className="fade-in-right">
            <Testimonials />
          </div>

          <div className={styles.buttonContainer}>
          <Button
            text="Would you like to know more about me?"
            href="/contact"
            label="Let’s connect"
          />
          </div>
        </div>
      </main>
    </ClientLayout>
  );
}
