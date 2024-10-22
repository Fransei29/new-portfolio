"use client";

import './contact.css';
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {

  return (
    <div className="contact-section">
      <div className='title-contact-container'>
        <p className="tit-contact">Let's Connect</p>
        <p className="tit-contact1">I'm actively seeking new professional challenges. If you think I could be a good fit for your team, let's talk.</p>
        <p className="tit-contact2">Feel free to reach out to discuss potential projects or collaborations.</p>
      </div>
      <ContactForm></ContactForm>
    </div>
  );
}
