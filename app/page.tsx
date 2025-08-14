'use client';

import React from 'react';
import { FaReact } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { FaNodeJs } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import ClientLayout from '../components/ClientLayout/ClientLayout';
import './globals.css';
import Experience from '../components/Experience/Experience';
import Skills from '../components/Skills/Skills';
import Image from 'next/image';
import { useScrollAnimation } from '../hooks/Scroll';
import HomeText from '../components/HomeText/HomeText';
import ProjectsSection from '../components/ProjectsSection/ProjectsSection';
import { Services } from '../components/Services/ServicesComponent';
import Button from '../components/Button/Button';
import { useLanguage } from '../contexts/LanguageContext';
import Testimonials from '../components/Testimonials/TestimonialsComponent';

export default function Home() {  
  const elementsRef = useScrollAnimation();
  const { t } = useLanguage();

  return (
    <ClientLayout>
    <div className='ContainerGeneralComplete'>
    <section ref={(el) => { elementsRef.current[0] = el;}} className="fade-in-right">
      <div className="home-text">
        <div className="home-textA">
          <HomeText />
        </div>

        <div className="home-textB">
          <div className="svg-duo">
            <section ref={(el) => {elementsRef.current[1] = el;}}className="fade-in-left">
              <Image
                src="/img/shapeA.svg"
                alt="Figura geométrica 1"
                className="svg-overlap shape-a"
                width={130}
                height={170}
              />
            </section>

            <section ref={(el) => { elementsRef.current[2] = el; }} className="fade-in-right">
              <Image
                src="/img/shapeB.svg"
                alt="Figura geométrica 2"
                className="svg-overlap shape-b"
                width={130}
                height={170}
              />
            </section>
          </div>
        </div>
        
      </div>
    </section>


      

      <section className="containerGeneral">
         
         <div ref={(el) => {elementsRef.current[3] = el;}} className="fade-in-left">
            <ProjectsSection />
          </div>

          <div ref={(el) => {elementsRef.current[4] = el;}} className="fade-in-right">
           <Services />
          </div>


          <div ref={(el) => {elementsRef.current[5] = el;}} className="fade-in-left">
            <Skills />
          </div>
          
          <div ref={(el) => {elementsRef.current[6] = el;}} className="fade-in-right">
            <Experience />
          </div>

          
          <div ref={(el) => {elementsRef.current[7] = el;}} className="fade-in-left">
            <Testimonials />
          </div>

          <div className='containerButton'>
            <div className='buttonContainer'>
              <Button
                text={t('aboutPage.buttonText') ?? ''}
                href="/contact"
                label={t('aboutPage.buttonLabel') ?? ''}
              />
            </div>
          </div>
      </section>

    </div>
    </ClientLayout>
  );
}
