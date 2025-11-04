'use client';

import styles from "./TestimonialsComponent.module.scss";
import { FaLinkedin } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '../../contexts/LanguageContext';
import { useRef, useEffect, useState } from 'react';


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
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  const testimonials: Testimonial[] = [
    {
      name: t('testimonials.matias.name'),
      role: t('testimonials.matias.role'),
      message: t('testimonials.matias.message'),
      image: "/img/Mati.webp",
      linkedin: "https://www.linkedin.com/in/matirivarola1/",
    },
    {
      name: t('testimonials.edison.name'),
      role: t('testimonials.edison.role'),
      message: t('testimonials.edison.message'),
      image: "/img/Edi.webp",
      linkedin: "https://www.linkedin.com/in/edisonlamar/",
    },
    {
      name: t('testimonials.adrian.name'),
      role: t('testimonials.adrian.role'),
      message: t('testimonials.adrian.message'),
      image: "/img/Adrian.webp",
      linkedin: "https://www.linkedin.com/in/adrian-rodriguez-053020304/",
    },
    {
      name: t('testimonials.franklin.name'),
      role: t('testimonials.franklin.role'),
      message: t('testimonials.franklin.message'),
      image: "/img/frank.webp",
      linkedin: "https://www.linkedin.com/in/franklin-gomez-pacoricona/",
    },
    {
      name: t('testimonials.ismael.name'),
      role: t('testimonials.ismael.role'),
      message: t('testimonials.ismael.message'),
      image: "/img/isma.webp",
      linkedin: "https://www.linkedin.com/in/ismael-rivarola/",
    },
    {
      name: t('testimonials.valentin.name'),
      role: t('testimonials.valentin.role'),
      message: t('testimonials.valentin.message'),
      image: "/img/vale.webp",
      linkedin: "https://www.linkedin.com/in/valentin-carniel/",
    },
    {
      name: t('testimonials.tomas.name'),
      role: t('testimonials.tomas.role'),
      message: t('testimonials.tomas.message'),
      image: "/img/tomi.webp",
      linkedin: "https://www.linkedin.com/in/tomas-del-pino/",
    },
  ];

  // Duplicar testimonios para crear un loop infinito
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  const cardWidth = 350; // Ancho fijo de cada tarjeta
  const gap = 32; // Gap entre tarjetas (2rem = 32px)
  const scrollAmount = cardWidth + gap;

  const scrollLeft = () => {
    if (carouselRef.current) {
      setIsAutoScrolling(false);
      carouselRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      setIsAutoScrolling(false);
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Auto-scroll infinito
  useEffect(() => {
    if (!carouselRef.current || !isAutoScrolling) return;

    const interval = setInterval(() => {
      if (carouselRef.current) {
        const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
        const currentScroll = carouselRef.current.scrollLeft;

        if (currentScroll >= maxScroll - 10) {
          // Si llegamos al final, volver al inicio suavemente
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carouselRef.current.scrollBy({ left: 1, behavior: 'auto' });
        }
      }
    }, 50); // Velocidad suave

    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  // Detectar cuando el usuario hace scroll manual
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      setScrollPosition(carousel.scrollLeft);
    };

    carousel.addEventListener('scroll', handleScroll);
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.testimonialsContainer}>
      <section className={styles.testimonials}>
        <p className={styles.highlight}>{t('testimonials.title')}</p>
        <div className={styles.carouselWrapper}>
          <button 
            className={styles.navButton}
            onClick={scrollLeft}
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
          <div 
            className={styles.carousel}
            ref={carouselRef}
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
                    <div className={styles.author}>
                      <strong>{t.name}</strong>
                      <span>{t.role}</span>
                    </div>
                    
                    <div className={styles.secondSection}>
                      {t.linkedin && (
                        <a
                          href={t.linkedin}
                          className={styles.linkedinButton}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${t.name}'s LinkedIn profile`}
                          title={`View ${t.name} on LinkedIn`}
                        >
                          <FaLinkedin size={22} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button 
            className={styles.navButton}
            onClick={scrollRight}
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </section>
    </div>
  );
}
