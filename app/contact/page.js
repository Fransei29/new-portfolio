"use client";

import './contact.css';
import ContactForm from '@/components/ContactForm';
import { useScrollAnimation } from '../../hooks/Scroll';

export default function ContactPage() {
  const elementsRef = useScrollAnimation();

  return (
    <div className="contact-section">
      {/* Sección About Me */}  
      <div className="about-me-section">
      <div ref={(el) => (elementsRef.current[0] = el)} className="fade-in-right">
        <p className="tit-tutorial highlight">About Me</p>
        <div className='info-about-text'>
          <p>
            As a Full Stack Developer, I specialize in React, Next.js, Node.js, and database management, with a strong emphasis on Front End design and develop that brings interfaces to life.
          </p>
          <p>
             My international experience has not only enriched my technical expertise but also taught me the value of diverse perspectives and collaborative problem-solving.
          </p>   
        </div>
      </div>
      </div>
      

      <div ref={(el) => (elementsRef.current[2] = el)} className="fade-in-right">
        <div className='title-contact-container'>
            <p className="tit-tutorial highlight">
              Let&apos;s Connect
            </p>
            <p className="tit-contact1">
              I am actively seeking new professional challenges where I can apply my technical expertise and creative problem-solving skills. 
            </p>
            <p className="tit-contact2">
              I invite you to reach out if you have any exciting projects or potential collaborations in mind.
            </p>
        </div>
      </div>
      <div ref={(el) => (elementsRef.current[3] = el)} className="fade-in-left">
        <ContactForm />
      </div>
    </div>
  );
}
