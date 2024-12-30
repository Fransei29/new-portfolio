"use client";

import './contact.css';
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {

  return (
    <div className="contact-section">
      <div className='title-contact-container'>
        <p className="tit-contact">Let&apos;s Connect</p>
        <p className="tit-contact1">I am actively seeking new professional challenges.</p>
        <p className="tit-contact2">Feel free to reach out to discuss potential projects or collaborations.</p>
      </div>
      <ContactForm></ContactForm>
    </div>
  );
}
