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
import BlogSection from '../components/BlogSection/BlogSection';
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

          {/* El wave va DENTRO del bloque para que su sección y él aparezcan
              sincronizados (el bloque es el que observa el scroll). No se anima:
              lleva la clase wave-static, que lo exime del fade del padre. */}
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
            {/* Este wave CIERRA HowWeWork (no abre WhyChooseUs), así que es el
                único que va FUERA del bloque animado.
                `wave-static` no alcanzaba acá: exime al wave de su propio fade,
                pero el bloque padre sigue aplicando translateX(-50px) y un
                transform arrastra a todo su subárbol — el wave viajaba igual.
                En los otros waves no se nota porque abren su sección y entran
                junto con ella; este cierra la anterior, y el desfase queda a la
                vista al terminar de leer HowWeWork.
                Conserva section-bg-ink: esa clase define --wave-a (#2e294e), el
                color del lado del que VIENE la curva. Sin ella la costura con
                HowWeWork deja de calzar. */}
            <div className="section-bg-ink">
              <WaveDivider variant="aToB" />
            </div>

            <div ref={(el) => {elementsRef.current[8] = el;}} className="fade-in-left section-bg-ink">
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
            {/* eslint-disable-next-line @next/next/no-img-element -- SVG: next/image no lo optimiza */}
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

          {/* Blog antes del CTA final: quien todavía no está listo para agendar
              encuentra algo más para leer, y quien sí lo está no se distrae
              antes de llegar al botón. */}
          <div ref={(el) => {elementsRef.current[13] = el;}} className="fade-in-left">
            <BlogSection />
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
