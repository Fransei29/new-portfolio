"use client";

import Link from 'next/link';
import './globals.css';
import ProjectsSection from '@/components/Projects';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import SocialMedia from '@/components/SocialMedia';
import ContactForm from '@/components/ContactForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons'; // Importar el ícono de aquí



export default function Home() {
  return (
    <>
     <div className="home-text">
            <h1 className="title">Hi, <span className="name-highlight"> I&apos;m Franco</span> <span className="waving-hand">👋</span></h1>
            <p className="subtitle">Curious <strong>Designer</strong> and <strong>Developer</strong> specializing in building scalable, user-centric web applications. With expertise in <strong>JavaScript</strong>, modern frameworks, and databases, I deliver seamless solutions across the <strong>full stack.</strong> 
            </p>
            <SocialMedia></SocialMedia>
            <FontAwesomeIcon icon={faAnglesDown} className="scroll-arrow" />
      </div>
      <div className="containerGeneral"> 
        <ProjectsSection></ProjectsSection>
        <Experience></Experience>
        <Skills></Skills>
        <h2 className="highlight contact-page-title">Get in Touch</h2>
        <p className="tit-contact2">I am always open to hearing about new ideas and work opportunities.</p>
        <p className="tit-contact1">If you are looking for a developer passionate about building effective solutions, do not hesitate to reach out.</p>
        <div className='button-container-to-go'>
          <Link href="/contact">
            <button className="button-to-go">Contact</button>
          </Link>
      </div>
      </div>
    </>
  );
}