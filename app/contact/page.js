"use client";

import './contact.css';
import ContactForm from '@/components/ContactForm';
import { useScrollAnimation } from '../../hooks/Scroll';

export default function ContactPage() {
  const elementsRef = useScrollAnimation();

  return (
    <div className="contact-section">
      <div ref={(el) => (elementsRef.current[0] = el)} className="fade-in-right">
      <div className='title-contact-container'>
        <p className="tit-contact">Let&apos;s Connect</p>
        <p className="tit-contact1">I am actively seeking new professional challenges.</p>
        <p className="tit-contact2">Feel free to reach out to discuss potential projects or collaborations.</p>
      </div>
      </div>
      <div ref={(el) => (elementsRef.current[1] = el)} className="fade-in-left">
      <ContactForm></ContactForm>
      </div>
    </div>
  );
}
