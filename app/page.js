"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import './globals.css';
import ProjectsSection from '@/components/Projects';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import SocialMedia from '@/components/SocialMedia';
import ContactForm from '@/components/ContactForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from 'next-themes';  
import Image from 'next/image';
import ThemeWrapper from '@/components/ThemeWrapper';
import { useScrollAnimation } from '../hooks/Scroll';
import { FaReact } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { FaNodeJs } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import { Typewriter } from 'react-simple-typewriter';
import { motion } from "framer-motion";


const texts = [
  "Front End Developer",
  "Creative Problem Solver",
];

export default function Home() {
  const { theme, setTheme } = useTheme();  
  const elementsRef = useScrollAnimation();
  const [currentText, setCurrentText] = useState(texts[0]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % texts.length;
      setCurrentText(texts[index]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);


  const handleImageLoad = () => {
    setLoaded(true); 
  };

  return (
    <>
    <ThemeWrapper>

      <div ref={(el) => (elementsRef.current[0] = el)} className="fade-in-left">

      <div className="home-text">
          <div className="home-textA">
            <h3 className="title">
              Hi, <span className="name-highlight"> I&apos;m Franco</span>
            </h3>
            <div className="subtitle">
                <div className="subtitle-text">
                  <p className='changing-text-container'>
                    <span className='changing-text'>
                      <Typewriter
                          words={texts}
                          loop={0}
                          cursor
                          cursorStyle=""
                          typeSpeed={60}
                          deleteSpeed={60}
                          delaySpeed={2000}
                        />
                    </span>
                  </p>
                  <div className="subtitle-textA">
                  <p className="introduction-text">
                    JavaScript developer with 1.5+ years of experience and expertise in 
                    <span className="tech-words"> Next</span>, 
                    <span className="tech-words"> React</span>, 
                    <span className="tech-words"> Node</span> and 
                    <span className="tech-words"> TypeScript</span>.
                    <br />
                    I create web apps and help others learn to code.
                  </p>
                  </div>
                  <p className='tech-icons'>
                    <FaReact size={40} color="rgb(151, 0, 76)" />
                    <TbBrandNextjs size={40} color="rgb(151, 0, 76)" />
                    <FaNodeJs size={40} color="rgb(151, 0, 76)" />
                    <SiTypescript size={40} color="rgb(151, 0, 76)" />
                  </p>
                </div>
            </div>

            <div className='container-social'>
              <div>
                {/* Botón para cambiar el tema */}
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}  
                  className={`theme-toggle-button ${theme === 'dark' ? 'dark' : ''}`}
                >
                  {theme === 'light' ? (
                    <Image
                      src="/icons/sun.png" 
                      alt="Modo Claro"
                      width={32}
                      height={32}
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#fff"
                      width="24px"
                      height="24px"
                    >
                      <path d="M21.64 13A9 9 0 1111 2.36 7 7 0 0021.64 13z" />
                    </svg>
                  )}
                </button>
              </div>
            </div> 
          </div>
          <div className='home-textB'>
                  <Image
                      src="/img/f.jpg"
                      alt="Modo Claro"
                      className="fotofranco"
                      width={300}
                      height={300}
                      onLoadingComplete={handleImageLoad} 
                  />
                  <SocialMedia />
          </div>
          </div>
      </div>

      <div className="containerGeneral">
        <div ref={(el) => (elementsRef.current[1] = el)} className="fade-in-right">
          <ProjectsSection />
        </div>
        <div ref={(el) => (elementsRef.current[2] = el)} className="fade-in-left">
          <Experience />
        </div>
        <div ref={(el) => (elementsRef.current[3] = el)} className="fade-in-right">
          <Skills />
        </div>
      </div>

      <div ref={(el) => (elementsRef.current[4] = el)} className="fade-in-left"> 
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
        
        <ContactForm/>
      </div>
      </div>
      </ThemeWrapper>
    </>
  );
}
