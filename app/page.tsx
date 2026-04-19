'use client';

import React from 'react';
import ClientLayout from '../components/ClientLayout/ClientLayout';
import './globals.css';
import SkillsSummary from '../components/Skills/SkillsSummary';
import { useScrollAnimation } from '../hooks/Scroll';
import HomeText from '../components/HomeText/HomeText';
import HeroDashboard from '../components/HeroDashboard/HeroDashboard';
import ProjectsSection from '../components/ProjectsSection/ProjectsSection';
import { Services } from '../components/Services/ServicesComponent';
import { useLanguage } from '../contexts/LanguageContext';
import Testimonials from '../components/Testimonials/TestimonialsComponent';
import CallToAction from '../components/CallToAction/CallToAction';
import WhyChooseUs from '../components/WhyChooseUs/WhyChooseUs';
import AutomationComparison from '../components/AutomationComparison/AutomationComparison';
import HowWeWork from '../components/HowWeWork/HowWeWork';
import WaveDivider from '../components/WaveDivider/WaveDivider';

export default function Home() {
  const elementsRef = useScrollAnimation();
  const { t } = useLanguage();

  return (
    <ClientLayout>
    <div className='ContainerGeneralComplete'>
    <section ref={(el) => { elementsRef.current[0] = el;}} className="fade-in-right hero-section">
      <div className="home-text">
        <div className="home-textA">
          <HomeText />
        </div>

        <div className="home-textB">
          <HeroDashboard />
        </div>

      </div>
    </section>


      <section className="containerGeneral">
         
         <div ref={(el) => {elementsRef.current[3] = el;}} className="fade-in-left">
            <WaveDivider variant="aToB" />
           <Services />
          </div>

          <WaveDivider variant="bToA" />

          <div ref={(el) => {elementsRef.current[4] = el;}} className="fade-in-right">
            <AutomationComparison />
          </div>

          <div ref={(el) => {elementsRef.current[5] = el;}} className="fade-in-right">
            <WaveDivider variant="aToB" />
            <ProjectsSection variant="projects" />
          </div>

          <div ref={(el) => {elementsRef.current[6] = el;}} className="fade-in-left">
            <WaveDivider variant="bToA" />
            <HowWeWork />
          </div>

          <div ref={(el) => {elementsRef.current[8] = el;}} className="fade-in-left">
            <WaveDivider variant="aToB" />
            <WhyChooseUs />
          </div>

          <div ref={(el) => {elementsRef.current[11] = el;}} className="fade-in-right">
            <WaveDivider variant="bToA" />
            <ProjectsSection variant="tutorials" />
          </div>

          <div ref={(el) => {elementsRef.current[9] = el;}} className="fade-in-left">
            <WaveDivider variant="aToB" />
            <SkillsSummary />
          </div>

          <div ref={(el) => {elementsRef.current[10] = el;}} className="fade-in-right">
            <WaveDivider variant="bToA" />
            <Testimonials />
          </div>

          <div ref={(el) => {elementsRef.current[12] = el;}} className="fade-in-left">
            <WaveDivider variant="aToCta" />
            <CallToAction />
          </div>
      </section>

    </div>
    </ClientLayout>
  );
}
