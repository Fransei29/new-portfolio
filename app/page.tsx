'use client';

import React from 'react';
import ClientLayout from '../components/ClientLayout/ClientLayout';
import './globals.css';
import SkillsSummary from '../components/Skills/SkillsSummary';
import { useScrollAnimation } from '../hooks/Scroll';
import HomeText from '../components/HomeText/HomeText';
import ScrollExplodeDashboard from '../components/HeroDashboard/ScrollExplodeDashboard';
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
          <ScrollExplodeDashboard />
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

          <div ref={(el) => {elementsRef.current[6] = el;}} className="fade-in-left section-bg-ink">
            <WaveDivider variant="bToA" />
            <HowWeWork />
          </div>

          <div className="section-bg-lila">
            <div ref={(el) => {elementsRef.current[8] = el;}} className="fade-in-left section-bg-ink">
              <WaveDivider variant="aToB" />
              <WhyChooseUs />
            </div>

            <WaveDivider variant="bToA" />
          </div>

          <div ref={(el) => {elementsRef.current[11] = el;}} className="fade-in-right">
            <ProjectsSection variant="tutorials" />
          </div>

          {/* El panda "programando" se ancla al borde superior de este bloque
              (la CRESTA de la curva del wave gris) y asoma hacia arriba. Va detrás
              del relleno gris (curva del wave + SkillsSummary) que lo tapa con la
              forma exacta de la curva. El fondo blanco del wave se hace
              transparente (variante toolsWave) para que NO tape al panda con la
              franja de 52px sobre la curva. */}
          <div ref={(el) => {elementsRef.current[9] = el;}} className="fade-in-left toolsPandaHost">
            <img
              className="toolsPanda"
              src="/isotipo-panda-programando.svg"
              alt=""
              aria-hidden
              loading="lazy"
            />
            <div className="toolsWave">
              <WaveDivider variant="aToB" />
            </div>
            <SkillsSummary />
          </div>

          <div ref={(el) => {elementsRef.current[10] = el;}} className="fade-in-right">
            <WaveDivider variant="bToA" />
            <Testimonials />
          </div>

          <div ref={(el) => {elementsRef.current[12] = el;}} className="fade-in-left">
            {/* CTA como contenedor separado: ancho contenido, centrado, esquinas
                redondeadas. Sin wave arriba. */}
            <div className="ctaWrap">
              <CallToAction />
            </div>
          </div>
      </section>

    </div>
    </ClientLayout>
  );
}
