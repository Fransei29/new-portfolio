'use client';

import { useState, useEffect } from 'react';
import './globals.css';
import ProjectsSection from '../components/Projects';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import SocialMedia from '../components/SocialMedia';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer'; 
import Image from 'next/image';
import { useScrollAnimation } from '../hooks/Scroll';
import HomeText from '../components/HomeText';

const text = [
  "ront End Developer",
  "ull Stack Developer",
];


export default function Home() {  
  const elementsRef = useScrollAnimation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
     <section ref={(el) => {elementsRef.current[0] = el;}} className="fade-in-left">
        <div className="home-text">
          <div className="home-textA">
            <HomeText texts={text} />
          </div>
          <div className='home-textB'>
            <Image
              src="/img/f.jpg"
              alt="Modo Claro"
              className="fotofranco"
              width={300}
              height={300}
            />
            <SocialMedia />
          </div>
        </div>
      </section>

      <section className="containerGeneral">
         <div ref={(el) => {elementsRef.current[1] = el;}} className="fade-in-right">
            <ProjectsSection />
          </div>
          <div ref={(el) => {elementsRef.current[2] = el;}} className="fade-in-left">
            <Experience />
          </div>
          <div ref={(el) => {elementsRef.current[3] = el;}} className="fade-in-right">
            <Skills />
          </div>
      </section>

      <section ref={(el) => {elementsRef.current[4] = el;}} className="fade-in-left">
        <div className='contact-section-container'> 
          <div className='contact-section-first'>
            <p className="highlight contact-page-title">
              Get in Touch
            </p>
            <p className="tit-contact2 tit-contact-start">
              I am always open to hearing about new ideas and work opportunities.
            </p>
            <p className="tit-contact1 tit-contact-end">
              If you are looking for a developer passionate about building effective solutions,<strong> reach out.</strong>
            </p>
          </div> 
          <div className='contact-section-second'>
            <ContactForm/>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}
