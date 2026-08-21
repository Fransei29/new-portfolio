'use client';

import React from 'react';
import ClientLayout from '../../components/ClientLayout/ClientLayout';
import '../../app/globals.css';
import SkillsSummary from '../../components/Skills/SkillsSummary';
import { useScrollAnimation } from '../../hooks/Scroll';
import HomeText from '../../components/HomeText/HomeText';
import ScrollExplodeDashboard from '../../components/HeroDashboard/ScrollExplodeDashboard';
import ProjectsSection from '../../components/ProjectsSection/ProjectsSection';
import { Services } from '../../components/Services/ServicesComponent';
import { useLanguage } from '../../contexts/LanguageContext';
import Testimonials from '../../components/Testimonials/TestimonialsComponent';
import CallToAction from '../../components/CallToAction/CallToAction';
import WhyChooseUs from '../../components/WhyChooseUs/WhyChooseUs';
import AutomationComparison from '../../components/AutomationComparison/AutomationComparison';
import ComparisonMatrix from '../../components/ComparisonMatrix/ComparisonMatrix';
import HowWeWork from '../../components/HowWeWork/HowWeWork';
import BlogSection from '../../components/BlogSection/BlogSection';
import WaveDivider from '../../components/WaveDivider/WaveDivider';
// Desmontado del hero, se guarda para otro lugar del sitio. Ver el comentario
// en el <section> del hero, más abajo.
// import HeroParticles from '../../components/HeroParticles/HeroParticles';

export default function HomeContent() {
  const elementsRef = useScrollAnimation();
  const { t } = useLanguage();

  return (
    <ClientLayout>
    <div className='ContainerGeneralComplete'>
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


      <section className="containerGeneral">

          {/* El wave va DENTRO del bloque para que su sección y él aparezcan
              sincronizados (el bloque es el que observa el scroll). No se anima:
              lleva la clase wave-static, que lo exime del fade del padre. */}
          <div ref={(el) => {elementsRef.current[3] = el;}} className="assemble">
            <WaveDivider variant="aToB" />
            <Services />
          </div>

          <WaveDivider variant="bToA" />

          <div ref={(el) => {elementsRef.current[4] = el;}} className="assemble">
            <AutomationComparison />
          </div>

          <div ref={(el) => {elementsRef.current[5] = el;}} className="assemble">
            <WaveDivider variant="aToB" />
            <ProjectsSection variant="projects" />
          </div>

          {/* Va DESPUÉS de los case studies a propósito: la objeción real
              ("¿y por qué no una agencia?") recién aparece cuando ya vieron el
              trabajo. Antes de eso el visitante todavía no está comparando. */}
          <div ref={(el) => {elementsRef.current[14] = el;}} className="assemble">
            {/* Cierra el gris (B) de ProjectsSection y abre el blanco (A) de
                esta sección. Sin este wave las dos franjas se tocaban a filo
                recto y el bToA de HowWeWork salía de un color que no era el
                de arriba. */}
            <WaveDivider variant="bToA" />
            <ComparisonMatrix />
          </div>

          {/* wave-from-white: arriba quedó el blanco (A) de ComparisonMatrix,
              pero bToA pinta su franja con --wave-b (el gris). Ese gris ya no
              existe acá, así que el wave se veía como una banda suelta.
              La clase redefine --wave-b a blanco sólo para este bloque; el
              relleno de la curva sigue siendo --wave-a, que .section-bg-ink ya
              pisa con el lila profundo de HowWeWork. */}
          <div ref={(el) => {elementsRef.current[6] = el;}} className="assemble section-bg-ink wave-from-white">
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

            <div ref={(el) => {elementsRef.current[8] = el;}} className="assemble section-bg-ink">
              <WhyChooseUs />
            </div>

            <WaveDivider variant="bToA" />
          </div>

          <div ref={(el) => {elementsRef.current[11] = el;}} className="assemble">
            <ProjectsSection variant="tutorials" />
          </div>

          {/* El panda "programando" se ancla al borde superior de este bloque
              (la CRESTA de la curva del wave gris) y asoma hacia arriba. Va detrás
              del relleno gris (curva del wave + SkillsSummary) que lo tapa con la
              forma exacta de la curva. El fondo blanco del wave se hace
              transparente (variante toolsWave) para que NO tape al panda con la
              franja de 52px sobre la curva. */}
          <div ref={(el) => {elementsRef.current[9] = el;}} className="assemble toolsPandaHost">
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

          <div ref={(el) => {elementsRef.current[10] = el;}} className="assemble">
            <WaveDivider variant="bToA" />
            <Testimonials />
          </div>

          {/* Blog antes del CTA final: quien todavía no está listo para agendar
              encuentra algo más para leer, y quien sí lo está no se distrae
              antes de llegar al botón. */}
          {/* Wave arriba como el resto de la home, pero NO abajo: el CTA que
              sigue usa su propio contenedor flotante, así que un wave de cierre
              chocaría con esa forma. En su lugar el gris se desvanece a blanco
              dentro de la propia sección (ver .blogSection en su módulo). */}
          <div ref={(el) => {elementsRef.current[13] = el;}} className="assemble">
            <WaveDivider variant="aToB" />
            <BlogSection />
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
