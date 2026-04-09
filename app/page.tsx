'use client';

import React, { useEffect, useRef } from 'react';
import { FaReact } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { FaNodeJs } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import ClientLayout from '../components/ClientLayout/ClientLayout';
import './globals.css';
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
import WhyChooseUs from '../components/WhyChooseUs/WhyChooseUs';
import AutomationComparison from '../components/AutomationComparison/AutomationComparison';
import HowWeWork from '../components/HowWeWork/HowWeWork';
import WaveDivider from '../components/WaveDivider/WaveDivider';

export default function Home() {  
  const elementsRef = useScrollAnimation();
  const { t } = useLanguage();
  const shapeARef = useParallax({ speed: 0.15, direction: 'down', rotationSpeed: 0.018 });
  const shapeBRef = useParallax({ speed: 0.35, direction: 'down', rotationSpeed: -0.024 });

  const shapeAMouseRef = useRef<HTMLDivElement>(null);
  const shapeBMouseRef = useRef<HTMLDivElement>(null);
  const heroRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let targetAX = 0, targetAY = 0, targetARot = 0;
    let targetBX = 0, targetBY = 0, targetBRot = 0;
    let curAX = 0, curAY = 0, curARot = 0;
    let curBX = 0, curBY = 0, curBRot = 0;
    let rafId: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      curAX = lerp(curAX, targetAX, 0.06);
      curAY = lerp(curAY, targetAY, 0.06);
      curARot = lerp(curARot, targetARot, 0.06);
      curBX = lerp(curBX, targetBX, 0.08);
      curBY = lerp(curBY, targetBY, 0.08);
      curBRot = lerp(curBRot, targetBRot, 0.08);
      if (shapeAMouseRef.current)
        shapeAMouseRef.current.style.transform = `translate(${curAX}px, ${curAY}px) rotate(${curARot}deg)`;
      if (shapeBMouseRef.current)
        shapeBMouseRef.current.style.transform = `translate(${curBX}px, ${curBY}px) rotate(${curBRot}deg)`;
      rafId = requestAnimationFrame(tick);
    };

    const handleMouse = (e: MouseEvent) => {
      const hero = heroRightRef.current;
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const nx = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2)));
      const ny = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)));
      // Both follow same direction, B faster (closer/front), A slower (farther/back)
      targetAX = nx * 18;
      targetAY = ny * 14;
      targetARot = nx * 4;
      targetBX = nx * 30;
      targetBY = ny * 22;
      targetBRot = -nx * 5;
    };

    rafId = requestAnimationFrame(tick);
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('mousemove', handleMouse); };
  }, []);

  return (
    <ClientLayout>
    <div className='ContainerGeneralComplete'>
    <section ref={(el) => { elementsRef.current[0] = el;}} className="fade-in-right hero-section">
      <div className="home-text">
        <div className="home-textA">
          <HomeText />
        </div>

        <div className="home-textB" ref={heroRightRef}>
          <div className="svg-duo">
            <div ref={shapeAMouseRef}>
              <section ref={shapeARef} className="parallax-shape">
                <Image
                  src="/img/img/Shapes/shapeA.svg"
                  alt="Figura geométrica 1"
                  className="svg-overlap shape-a"
                  width={120}
                  height={170}
                  priority
                  loading="eager"
                />
              </section>
            </div>

            <div ref={shapeBMouseRef}>
              <section ref={shapeBRef} className="parallax-shape">
                <Image
                  src="/img/img/Shapes/shapeB.svg"
                  alt="Figura geométrica 2"
                  className="svg-overlap shape-b"
                  width={120}
                  height={170}
                  priority
                  loading="eager"
                />
              </section>
            </div>
          </div>
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
            <HowWeWork />
          </div>

          <div ref={(el) => {elementsRef.current[8] = el;}} className="fade-in-left">
            <WaveDivider variant="bToA" />
            <WhyChooseUs />
          </div>

          <div ref={(el) => {elementsRef.current[11] = el;}} className="fade-in-right">
            <WaveDivider variant="aToB" />
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
