'use client';

import React, { type ReactNode } from 'react';
import ClientLayout from '../../components/ClientLayout/ClientLayout';
import '../../app/globals.css';
import { useScrollAnimation } from '../../hooks/Scroll';
import HomeText from '../../components/HomeText/HomeText';
import ScrollExplodeDashboard from '../../components/HeroDashboard/ScrollExplodeDashboard';
import ProjectsSection from '../../components/ProjectsSection/ProjectsSection';
import { Services } from '../../components/Services/ServicesComponent';
import { useLanguage } from '../../contexts/LanguageContext';
import Testimonials from '../../components/Testimonials/TestimonialsComponent';
import CallToAction from '../../components/CallToAction/CallToAction';
import FaqSection from '../../components/FaqSection/FaqSection';
import LearnSection from '../../components/LearnSection/LearnSection';
import BehindStudio from '../../components/BehindStudio/BehindStudio';
import type { FaqItem } from '../../lib/homeFaq';
import HowWeWork from '../../components/HowWeWork/HowWeWork';
import WaveDivider from '../../components/WaveDivider/WaveDivider';
// Desmontado del hero, se guarda para otro lugar del sitio. Ver el comentario
// en el <section> del hero, más abajo.
// import HeroParticles from '../../components/HeroParticles/HeroParticles';

type HomeContentProps = {
  /** Reemplaza el hero (la home pasa el hero 3D). Sin prop, el dashboard 2D. */
  hero?: ReactNode;
  /** El panda de "cómo trabajamos" en 3D (también de la home). */
  panda3d?: boolean;
  /** Preguntas frecuentes, leídas en el servidor (ver lib/homeFaq.ts). */
  faq?: FaqItem[];
};

export default function HomeContent({ hero, panda3d, faq = [] }: HomeContentProps = {}) {
  const elementsRef = useScrollAnimation();
  const { t } = useLanguage();

  return (
    <ClientLayout>
    <div className='ContainerGeneralComplete'>
    {hero ?? (
    <section ref={(el) => { elementsRef.current[0] = el;}} className="fade-in-right hero-section">
      {/* Campo de partículas que forma el isotipo del panda y se reorganiza en
          un grafo al scrollear. DESMONTADO a propósito: el efecto funciona pero
          se reserva para otro lugar del sitio, no para el hero.
          El componente y toda su infraestructura siguen en
          components/HeroParticles/ — para reactivarlo alcanza con descomentar
          esta línea (y su import arriba). */}
      {/* <HeroParticles /> */}

      <div className="home-text">
        <div className="home-textA">
          <HomeText />
        </div>

        <div className="home-textB">
          <ScrollExplodeDashboard />
        </div>

      </div>
    </section>
    )}


      <section className="containerGeneral">

          {/* El wave va DENTRO del bloque para que su sección y él aparezcan
              sincronizados (el bloque es el que observa el scroll). No se anima:
              lleva la clase wave-static, que lo exime del fade del padre. */}
          <div ref={(el) => {elementsRef.current[3] = el;}} className="assemble">
            <WaveDivider variant="aToB" />
            <Services />
          </div>

          {/* Servicios y case studies comparten el gris (B): van seguidos, sin
              wave entre medio. Antes los separaba AutomationComparison. */}
          <div ref={(el) => {elementsRef.current[5] = el;}} className="assemble">
            <ProjectsSection variant="projects" />
          </div>

          {/* bToA desde el gris de los case studies hacia el lila profundo:
              .section-bg-ink pisa --wave-a con el color de HowWeWork. */}
          <div ref={(el) => {elementsRef.current[6] = el;}} className="assemble section-bg-ink">
            <WaveDivider variant="bToA" />
            <HowWeWork panda3d={panda3d} />
          </div>

          {/* Este wave CIERRA HowWeWork, así que va FUERA de un bloque animado:
              el translateX del padre arrastraría la curva y la costura con la
              sección de arriba quedaría desfasada.
              section-bg-ink define --wave-a (el color del que VIENE la curva) y
              wave-from-white pone --wave-b en el blanco de Testimonios. */}
          <div className="section-bg-ink wave-from-white">
            <WaveDivider variant="aToB" />
          </div>

          {/* Testimonios pegados al trabajo y al proceso: la prueba social
              llega cuando el visitante todavía está evaluando. */}
          <div ref={(el) => {elementsRef.current[10] = el;}} className="assemble">
            <Testimonials />
          </div>

          {/* Preguntas frecuentes en la franja lila: responden las dudas que
              frenan la compra y llevan a contacto. */}
          <div className="section-bg-lila">
            <div ref={(el) => {elementsRef.current[7] = el;}} className="assemble">
              <WaveDivider variant="aToB" />
              <FaqSection items={faq} />
            </div>
            <div className="wave-to-gray">
              <WaveDivider variant="bToA" />
            </div>
          </div>

          {/* Quién está detrás, en lugar de la grilla de tecnologías (que sigue
              completa en /about). Sin wave propio: la curva de arriba ya pasa
              del lila de la FAQ a su gris. */}
          <div ref={(el) => {elementsRef.current[9] = el;}} className="assemble">
            <BehindStudio />
          </div>

          {/* Tutoriales, academy y blog como llamado a la acción. Va último
              antes del CTA: es lo menos comercial de la página. */}
          <div ref={(el) => {elementsRef.current[11] = el;}} className="assemble">
            <WaveDivider variant="bToA" />
            <LearnSection />
          </div>

          <div ref={(el) => {elementsRef.current[12] = el;}} className="assemble">
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
