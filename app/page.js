"use client";

import Link from 'next/link';
import { useState } from 'react';
import './globals.css';
import ProjectsSection from '@/components/Projects';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import SocialMedia from '@/components/SocialMedia';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from 'next-themes';  // Importa useTheme de next-themes
import Image from 'next/image';
import ThemeWrapper from '@/components/ThemeWrapper';

export default function Home() {
  const { theme, setTheme } = useTheme();  // Obtén el tema actual y la función para cambiarlo
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true); // Cuando la imagen se carga, activamos la clase 'loaded'
  };

  return (
    <>
    <ThemeWrapper>
      <div className="home-text">
        <h1 className="title">
          Hi, <span className="name-highlight"> I&apos;m Franco</span> <span className="waving-hand">👋</span>
        </h1>
        <div  className="subtitle">
        <p className='subtitle2'>
          Curious <strong>Designer</strong> and <strong>Developer</strong> specializing in building scalable, user-centric web applications. With expertise in <strong>JavaScript</strong>, modern frameworks, and databases, I deliver seamless solutions across the <strong>full stack.</strong> 
        </p>
        <div className='fotofrancocontainer'>
        <Image
            src="/img/f.jpg"
            alt="Modo Claro"
            className={`fotofranco ${loaded ? 'loaded' : ''}`} // Añadimos la clase 'loaded' cuando la imagen se haya cargado
            width={190}
            height={190}
            onLoadingComplete={handleImageLoad} // Llama a la función cuando la imagen se haya cargado
          />
         </div> 
        </div>

        {/* Botón para cambiar el tema */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}  // Cambia el tema
          className={`theme-toggle-button ${theme === 'dark' ? 'dark' : ''}`}
        >
          {theme === 'light' ? (
            <Image
              src="/icons/sun.png" // Ruta correcta a la imagen del sol
              alt="Modo Claro"
              width={28}
              height={28}
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

        <SocialMedia />
        <FontAwesomeIcon icon={faAnglesDown} className="scroll-arrow" />
      </div>

      <div className="containerGeneral">
        <ProjectsSection />
        <Experience />
        <Skills />
        
        <h2 className="highlight contact-page-title">Get in Touch</h2>
        <p className="tit-contact2">I am always open to hearing about new ideas and work opportunities.</p>
        <p className="tit-contact1">
          If you are looking for a developer passionate about building effective solutions, do not hesitate to<strong> reach out.</strong>
        </p>
        
        <div className='button-container-to-go'>
          <Link href="/contact">
            <button className="button-to-go">Contact</button>
          </Link>
        </div>
      </div>
      </ThemeWrapper>
    </>
  );
}
