'use client';

import React from 'react';
import { FaReact } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { FaNodeJs } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import ClientLayout from '../components/ClientLayout/ClientLayout';
import './globals.css';
import Experience from '../components/Experience/Experience';
import SkillsSummary from '../components/Skills/SkillsSummary';
import Image from 'next/image';
import { useScrollAnimation } from '../hooks/Scroll';
import { useParallax } from '../hooks/useParallax';
import HomeText from '../components/HomeText/HomeText';
import ProjectsSection from '../components/ProjectsSection/ProjectsSection';
import { Services } from '../components/Services/ServicesComponent';
import { useLanguage } from '../contexts/LanguageContext';
import Testimonials from '../components/Testimonials/TestimonialsComponent';
import CallToAction from '../components/CallToAction/CallToAction';

export default function Home() {  
  const elementsRef = useScrollAnimation();
  const { t } = useLanguage();
  const shapeARef = useParallax({ speed: 0.2, direction: 'down' });          
  const shapeBRef = useParallax({ speed: 0.4, direction: 'down' });            

  return (
    <ClientLayout>
    <div className='ContainerGeneralComplete'>
    <section ref={(el) => { elementsRef.current[0] = el;}} className="fade-in-right hero-section">
      <div className="home-text">
        <div className="home-textA">
          <HomeText />
        </div>

        <div className="home-textB">
          <div className="svg-duo">
            <section ref={shapeARef} className="parallax-shape">
              <Image
                src="/img/img/Shapes/shapeA.svg"
                alt="Figura geométrica 1"
                className="svg-overlap shape-a"
                width={120}
                height={170}
                priority
                loading="eager"
                style={{ 
                  willChange: 'transform',
                  transform: 'translateZ(0)',
                  WebkitTransform: 'translateZ(0)'
                }}
              />
            </section>

            <section ref={shapeBRef} className="parallax-shape">
              <Image
                src="/img/img/Shapes/shapeB.svg"
                alt="Figura geométrica 2"
                className="svg-overlap shape-b"
                width={120}
                height={170}
                priority
                loading="eager"
                style={{ 
                  willChange: 'transform',
                  transform: 'translateZ(0)',
                  WebkitTransform: 'translateZ(0)'
                }}
              />
            </section>
          </div>
        </div>
        
      </div>
    </section>


      <section className="containerGeneral">
         
         <div ref={(el) => {elementsRef.current[3] = el;}} className="fade-in-left">
           <Services />
          </div>

          <div ref={(el) => {elementsRef.current[4] = el;}} className="fade-in-right">
            <ProjectsSection />
          </div>


          <div ref={(el) => {elementsRef.current[5] = el;}} className="fade-in-left">
            <SkillsSummary />
          </div>
          
          <div ref={(el) => {elementsRef.current[6] = el;}} className="fade-in-right">
            <Experience />
          </div>

          
          <div ref={(el) => {elementsRef.current[7] = el;}} className="fade-in-left">
            <Testimonials />
          </div>

          <div ref={(el) => {elementsRef.current[8] = el;}} className="fade-in-right">
            <CallToAction />
          </div>
      </section>

    </div>
    </ClientLayout>
  );
}
