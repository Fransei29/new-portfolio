'use client';

import styles from "./TestimonialsComponent.module.scss";
import { FaLinkedin } from "react-icons/fa";
import Image from 'next/image';
import { useLanguage } from '../../contexts/LanguageContext';
import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';


type Testimonial = {
  name: string;
  role: string;
  message: string;
  image?: string;
  linkedin?: string;
};

export default function Testimonials() {
  const { t } = useLanguage();
  const carouselRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const animationRef = useRef<any>(null);

  const testimonials: Testimonial[] = [
    {
      name: t('testimonials.matias.name'),
      role: t('testimonials.matias.role'),
      message: t('testimonials.matias.message'),
      image: "/img/img/Testimonials/tomi.webp",
      linkedin: "https://www.linkedin.com/in/matirivarola1/",
    },
    {
      name: t('testimonials.edison.name'),
      role: t('testimonials.edison.role'),
      message: t('testimonials.edison.message'),
      image: "/img/img/Testimonials/Edi.webp",
      linkedin: "https://www.linkedin.com/in/edisonlamar/",
    },
    {
      name: t('testimonials.adrian.name'),
      role: t('testimonials.adrian.role'),
      message: t('testimonials.adrian.message'),
      image: "/img/img/Testimonials/Adrian.webp",
      linkedin: "https://www.linkedin.com/in/adrian-rodriguez-053020304/",
    },
    {
      name: t('testimonials.franklin.name'),
      role: t('testimonials.franklin.role'),
      message: t('testimonials.franklin.message'),
      image: "/img/img/Testimonials/frank.webp",
      linkedin: "https://www.linkedin.com/in/franklingp/",
    },
    {
      name: t('testimonials.ismael.name'),
      role: t('testimonials.ismael.role'),
      message: t('testimonials.ismael.message'),
      image: "/img/img/Testimonials/isma.webp",
      linkedin: "https://www.linkedin.com/in/ismaelrivarola/",
    },
    {
      name: t('testimonials.valentin.name'),
      role: t('testimonials.valentin.role'),
      message: t('testimonials.valentin.message'),
      image: "/img/img/Testimonials/vale.webp",
      linkedin: "https://www.linkedin.com/in/valentin-carniel-139043300/",
    },
    {
      name: t('testimonials.tomas.name'),
      role: t('testimonials.tomas.role'),
      message: t('testimonials.tomas.message'),
      image: "/img/img/Testimonials/tomi.webp",
      linkedin: "https://www.linkedin.com/in/tomas-del-pino-0234932a7/",
    },
  ];

  // Duplicar testimonios para crear un loop infinito
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  // Detectar si es mobile
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const cardWidth = isMobile ? 160 : 300; // Ancho fijo de cada tarjeta (más pequeño en mobile)
  const gap = isMobile ? 8 : 32; // Gap entre tarjetas (mobile: 0.5rem, desktop: 2rem)
  const totalWidth = testimonials.length * (cardWidth + gap);

  const startAutoScroll = () => {
    // Detener cualquier animación previa
    if (animationRef.current) {
      animationRef.current.stop();
    }
    
    // Obtener la posición actual y asegurar que estamos dentro de los límites
    const currentX = x.get();
    const startX = Math.max(-totalWidth, Math.min(0, currentX));
    
    if (startX !== currentX) {
      x.set(startX);
    }
    
    // Animación continua: de startX a -totalWidth, luego reset a 0
    const animateLoop = () => {
      const currentPos = x.get();
      const targetX = -totalWidth;
      
      // Verificar mobile dentro de la función para obtener el valor actualizado
      const checkMobile = window.innerWidth <= 768;
      // Duración ajustada - carrusel un poco más rápido en mobile
      const animationDuration = checkMobile ? 65 : 70;
      
      animationRef.current = animate(x, targetX, {
        duration: animationDuration,
        ease: "linear",
        onComplete: () => {
          // Resetear a 0 sin animación para crear el loop infinito
          x.set(0);
          // Llamar recursivamente para continuar el loop
          animateLoop();
        }
      });
    };
    
    // Iniciar el loop
    animateLoop();
  };

  // Iniciar la animación automática al montar
  useEffect(() => {
    // Esperar un momento para asegurar que todo esté montado
    const timer = setTimeout(() => {
      startAutoScroll();
    }, 100);
    
    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, [totalWidth, isMobile]);

  return (
    <div className={styles.testimonialsContainer}>
      <section className={styles.testimonials}>
        <div className={styles.titleWrapper}>
          <p className={styles.highlight}>{t('testimonials.title')}</p>
        </div>
        <div className={styles.carouselWrapper}>
          <div 
            className={styles.carousel}
            ref={carouselRef}
          >
            <motion.div
              className={styles.carouselInner}
              style={{ x }}
            >
              {duplicatedTestimonials.map((t, index) => (
                <div key={index} className={styles.card}>
                  <p className={styles.message}>&quot;{t.message}&quot;</p>
                  
                  <div className={styles.authorSection}>
                    {t.image && (
                      <Image
                        src={t.image}
                        alt={t.name}
                        width={100}  
                        height={100} 
                        className={styles.avatar}
                      />
                    )}
                    
                    <div className={styles.authorInfo}>
                      <div className={styles.authorRow}>
                        <div className={styles.author}>
                          <strong>{t.name}</strong>
                          <span>{t.role}</span>
                        </div>
                        {t.linkedin && (
                          <a
                            href={t.linkedin}
                            className={styles.linkedinButton}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${t.name}'s LinkedIn profile`}
                            title={`View ${t.name} on LinkedIn`}
                          >
                            <FaLinkedin size={isMobile ? 14 : 18} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
