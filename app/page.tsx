'use client';

import React from 'react';

import ClientLayout from '../components/clientLayout/ClientLayout';
import './globals.css';
import Experience from '../components/experience/Experience';
import Skills from '../components/skills/Skills';
import SocialMedia from '../components/socialMedia/SocialMedia';
import ContactSection from '../components/contact/Contact';
import Image from 'next/image';
import { useScrollAnimation } from '../hooks/Scroll';
import HomeText from '../components/homeText/HomeText';
import ProjectsSection from '../components/projectsSection/ProjectsSection';
import Testimonials from '../components/Testimonials/TestimonialsComponent';

export default function Home() {  
  const elementsRef = useScrollAnimation();

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
          <SocialMedia />
        </div>
        
      </div>
    </section>


      

      <section className="containerGeneral">
         <div ref={(el) => {elementsRef.current[3] = el;}} className="fade-in-left">
            <ProjectsSection />
          </div>
          <div ref={(el) => {elementsRef.current[4] = el;}} className="fade-in-right">
            <Experience />
          </div>
          <div ref={(el) => {elementsRef.current[5] = el;}} className="fade-in-left">
            <Skills />
          </div>
          <div ref={(el) => {elementsRef.current[6] = el;}} className="fade-in-left">
            <Testimonials />
          </div>
      </section>

      <section ref={(el) => {elementsRef.current[7] = el;}} className="fade-in-right">
        <ContactSection/>
      </section>
    </div>
    </ClientLayout>
  );
}
