'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../contexts/LanguageContext';
import { HiArrowRight } from 'react-icons/hi';
import styles from './CallToAction.module.scss';

export default function CallToAction() {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  // Observer propio en vez de depender del wrapper de la página: este CTA se
  // reutiliza en la home (dentro de un .assemble) y en /services y /about
  // (donde no hay ninguno). Sin esto la pieza se quedaba en opacity:0 para
  // siempre en esas páginas.
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;

    // Si ya vive dentro de un .assemble, ese wrapper lo dispara: no hace falta
    // un segundo observer compitiendo por el mismo elemento.
    if (el.closest('.assemble')) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px -12% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const buttonText = isMobile 
    ? (t('aboutPage.buttonTextMobile') ?? t('aboutPage.buttonText') ?? '')
    : (t('aboutPage.buttonText') ?? '');

  return (
    <section ref={ctaRef} className={`${styles.ctaContainer} assemble`}>
      {/* Panda asomándose por el borde derecho del contenedor; el overflow:hidden
          del ctaContainer lo recorta en ese borde. */}
      {/* eslint-disable-next-line @next/next/no-img-element -- SVG: next/image no lo optimiza */}
      <img
        className={styles.peekPanda}
        src="/isotipo-panda-contorno.svg"
        alt=""
        aria-hidden
        loading="lazy"
      />
      <div className={`${styles.ctaContent} piece-pop piece-delay-1`}>
        <p className={styles.ctaText}>
          {buttonText.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < buttonText.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
        {t('aboutPage.description') && (
          <p className={styles.ctaDescription}>
            {t('aboutPage.description')}
          </p>
        )}
        <Link href="/contact" className={styles.ctaButton}>
          {t('aboutPage.buttonLabel') ?? ''}
          <HiArrowRight className={styles.arrow} />
        </Link>
      </div>
    </section>
  );
}

