'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './ProjectDetailComponent.module.scss';
import { Github, ExternalLink, ChevronLeft, ChevronRight, ArrowLeft, Lock, X, FileText, Target, Code2, GraduationCap, Link2 } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

// SVG iconos importados como componentes
import JavascriptIcon from '../icons/javascript.svg';
import TypescriptIcon from '../icons/typescript.svg';
import ReactIcon from '../icons/react.svg';
import NextIcon from '../icons/nextdotjs.svg';
import SassIcon from '../icons/sass.svg';
import CssIcon from '../icons/css.svg';
import NodeIcon from '../icons/nodedotjs.svg';
import ExpressIcon from '../icons/express.svg';
import SequelizeIcon from '../icons/sequelize.svg';
import PostgresIcon from '../icons/postgresql.svg';
import DockerIcon from '../icons/docker.svg';
import JestIcon from '../icons/jest.svg';
import TailwindIcon from '../../public/icons/tai.svg';
import NestIcon from '../../public/icons/nest.svg';

interface ProjectProps {
  title: string;
  subtitle?: string;
  whatIs?: string;
  problemSolved?: string;
  techStack?: string[];
  learnings?: string[];
  screenshots?: string[];
  videoUrl?: string;
  githubLink?: string;
  liveDemoLink?: string;
}

interface TechIcon {
  name: string;
  icon: React.ElementType | string;
}

// Función para mapear nombres de tecnologías a iconos
const getTechIcon = (techName: string): TechIcon | null => {
  // Normalizar: remover versiones, paréntesis, espacios extra, etc.
  const normalized = techName
    .toLowerCase()
    .trim()
    .replace(/\s*\([^)]*\)/g, '') // Remover contenido entre paréntesis
    .replace(/\s*v?\d+\.?\d*\.?\d*/g, '') // Remover versiones (v4, 15.4.2, etc.)
    .replace(/\s*modules?/gi, '') // Remover "modules" o "module"
    .replace(/\s*\(modular\)/gi, '') // Remover "(modular)"
    .trim();
  
  // Mapeo de tecnologías a iconos (ordenado por especificidad)
  const techMap: { [key: string]: TechIcon } = {
    'next.js': { name: 'Next.js', icon: NextIcon },
    'nextjs': { name: 'Next.js', icon: NextIcon },
    'react': { name: 'React', icon: ReactIcon },
    'typescript': { name: 'TypeScript', icon: TypescriptIcon },
    'javascript': { name: 'JavaScript', icon: JavascriptIcon },
    'node.js': { name: 'Node.js', icon: NodeIcon },
    'nodejs': { name: 'Node.js', icon: NodeIcon },
    'express': { name: 'Express', icon: ExpressIcon },
    'postgresql': { name: 'PostgreSQL', icon: PostgresIcon },
    'postgres': { name: 'PostgreSQL', icon: PostgresIcon },
    'sequelize': { name: 'Sequelize', icon: SequelizeIcon },
    'docker': { name: 'Docker', icon: DockerIcon },
    'jest': { name: 'Jest', icon: JestIcon },
    'tailwind css': { name: 'Tailwind CSS', icon: TailwindIcon },
    'tailwind': { name: 'Tailwind CSS', icon: TailwindIcon },
    'nestjs': { name: 'NestJS', icon: NestIcon },
    'nest.js': { name: 'NestJS', icon: NestIcon },
    'sass': { name: 'Sass', icon: SassIcon },
    'scss': { name: 'SCSS', icon: SassIcon },
    'css': { name: 'CSS', icon: CssIcon },
  };

  // Buscar coincidencias exactas primero
  if (techMap[normalized]) {
    return techMap[normalized];
  }

  // Buscar coincidencias parciales (el nombre normalizado contiene la clave o viceversa)
  for (const [key, value] of Object.entries(techMap)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return value;
    }
  }

  // Si no hay coincidencia, retornar null para mostrar solo texto
  return null;
};

export default function ProjectDetailComponent({
  title,
  subtitle,
  whatIs,
  problemSolved,
  techStack,
  learnings,
  screenshots,
  videoUrl,
  githubLink,
  liveDemoLink,
}: ProjectProps) {
  const { t } = useLanguage();
  
  const validScreenshots = screenshots?.filter(Boolean) || [];
  const hasVideo = Boolean(videoUrl);
  const midPoint = Math.ceil(validScreenshots.length / 2);
  const firstHalf = hasVideo ? validScreenshots : validScreenshots.slice(0, midPoint);
  const secondHalf = hasVideo ? [] : validScreenshots.slice(midPoint);
  
  const [currentImageIndex1, setCurrentImageIndex1] = useState(0);
  const [currentImageIndex2, setCurrentImageIndex2] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
  
  const hasMultipleImages1 = firstHalf.length > 1;
  const hasMultipleImages2 = secondHalf.length > 1;

  // Navegar en el lightbox
  const goToPreviousLightbox = useCallback(() => {
    setLightboxImageIndex((prev) => 
      prev === 0 ? validScreenshots.length - 1 : prev - 1
    );
  }, [validScreenshots.length]);

  const goToNextLightbox = useCallback(() => {
    setLightboxImageIndex((prev) => 
      prev === validScreenshots.length - 1 ? 0 : prev + 1
    );
  }, [validScreenshots.length]);

  // Cerrar lightbox con ESC y navegar con flechas
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;

      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowLeft') {
        goToPreviousLightbox();
      } else if (e.key === 'ArrowRight') {
        goToNextLightbox();
      }
    };

    if (isLightboxOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevenir scroll del body
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isLightboxOpen, goToPreviousLightbox, goToNextLightbox]);

  // Abrir lightbox con la imagen seleccionada
  const openLightbox = (imageIndex: number, carousel: 'first' | 'second') => {
    if (carousel === 'first') {
      setLightboxImageIndex(imageIndex);
    } else {
      setLightboxImageIndex(midPoint + imageIndex);
    }
    setIsLightboxOpen(true);
  };

  const goToPrevious1 = () => {
    setCurrentImageIndex1((prev) => 
      prev === 0 ? firstHalf.length - 1 : prev - 1
    );
  };

  const goToNext1 = () => {
    setCurrentImageIndex1((prev) => 
      prev === firstHalf.length - 1 ? 0 : prev + 1
    );
  };

  const goToPrevious2 = () => {
    setCurrentImageIndex2((prev) => 
      prev === 0 ? secondHalf.length - 1 : prev - 1
    );
  };

  const goToNext2 = () => {
    setCurrentImageIndex2((prev) => 
      prev === secondHalf.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className={styles.projectContainer}>
      {/* Botón de navegación Back */}
      <Link href="/projects" className={styles.backButton}>
        <ArrowLeft size={18} />
        <span>{t('projects.back')}</span>
      </Link>

      {/* Grid principal: Info izquierda, Contenido derecha */}
      <div className={styles.mainGrid}>
        {/* Columna izquierda: Info */}
        <div className={styles.leftColumn}>
          <div className={styles.textContent}>
            <div className={styles.titleHeader}>
              <h1>{title}</h1>
              <p className={styles.subtitle}>{subtitle}</p>
            </div>

            {whatIs && (
              <section className={styles.detailSection}>
                <div className={styles.sectionHeader}>
                  <FileText className={styles.sectionIcon} size={22} aria-hidden />
                  <h2>{t('projects.overview')}</h2>
                </div>
                <div className={styles.formattedText} style={{ whiteSpace: 'pre-line' }}>
                  {whatIs}
                </div>
              </section>
            )}

            {problemSolved && (
              <section className={styles.detailSection}>
                <div className={styles.sectionHeader}>
                  <Target className={styles.sectionIcon} size={22} aria-hidden />
                  <h2>{t('projects.challenge')}</h2>
                </div>
                <div className={styles.formattedText} style={{ whiteSpace: 'pre-line' }}>
                  {problemSolved}
                </div>
              </section>
            )}

            {learnings && learnings.length > 0 && (
              <section className={styles.detailSection}>
                <div className={styles.sectionHeader}>
                  <GraduationCap className={styles.sectionIcon} size={22} aria-hidden />
                  <h2>{t('projects.learnings')}</h2>
                </div>
                <ul className={styles.learningsList}>
                  {learnings.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {techStack && techStack.length > 0 && (
              <section className={styles.detailSection}>
                <div className={styles.sectionHeader}>
                  <Code2 className={styles.sectionIcon} size={22} aria-hidden />
                  <h2>{t('projects.builtWith')}</h2>
                </div>
                <div className={styles.techStackGrid}>
                  {techStack.map((tech, index) => {
                    const techIcon = getTechIcon(tech);
                    const isComponent = techIcon && typeof techIcon.icon !== 'string';
                    return (
                      <div key={index} className={styles.techCard}>
                        {techIcon ? (
                          isComponent ? (
                            <techIcon.icon className={styles.techIcon} />
                          ) : (
                            <Image
                              src={typeof techIcon.icon === 'string' ? techIcon.icon : ''}
                              alt={`${techIcon.name} Icon`}
                              width={22}
                              height={22}
                              className={styles.techIconImage}
                            />
                          )
                        ) : null}
                        <span className={styles.techName}>{techIcon?.name || tech}</span>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            <section className={styles.detailSection}>
              <div className={styles.sectionHeader}>
                <Link2 className={styles.sectionIcon} size={22} aria-hidden />
                <h2>{t('projects.links')}</h2>
              </div>
              <div className={styles.links}>
                {githubLink ? (
                  <a href={githubLink} target="_blank" rel="noopener noreferrer">
                    {t('projects.githubRepository')} <Github className={styles.iconSmall} />
                  </a>
                ) : githubLink === null || githubLink === '' ? (
                  <div className={styles.privateLink} title="Código privado">
                    {t('projects.githubRepository')} <Lock className={styles.iconSmall} />
                  </div>
                ) : null}
                {liveDemoLink && (
                  <a href={liveDemoLink} target="_blank" rel="noopener noreferrer">
                    {t('projects.liveDemo')} <ExternalLink className={styles.iconSmall} />
                  </a>
                )}
              </div>
            </section>
          </div>
        </div>

        {/* Columna derecha: Contenido (Dos carruseles de imágenes) */}
        <div className={styles.rightColumn}>
          {/* Primer carrusel - Primera mitad de imágenes */}
          {firstHalf.length > 0 && (
            <div className={styles.imageCarouselContainer}>
              <div className={styles.imageCarousel}>
                {firstHalf.map((screenshot, index) => (
                  <div
                    key={index}
                    className={`${styles.carouselImage} ${index === currentImageIndex1 ? styles.active : ''}`}
                    onClick={() => openLightbox(index, 'first')}
                  >
                    <Image
                      src={screenshot}
                      alt={`${title} screenshot ${index + 1}`}
                      fill
                      className={styles.carouselImg}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
              
              {hasMultipleImages1 && (
                <>
                  <button
                    className={`${styles.carouselNavButton} ${styles.carouselNavButtonLeft}`}
                    onClick={goToPrevious1}
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    className={`${styles.carouselNavButton} ${styles.carouselNavButtonRight}`}
                    onClick={goToNext1}
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                  
                  <div className={styles.carouselIndicators}>
                    {firstHalf.map((_, index) => (
                      <button
                        key={index}
                        className={`${styles.indicator} ${index === currentImageIndex1 ? styles.active : ''}`}
                        onClick={() => setCurrentImageIndex1(index)}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Segundo carrusel - solo cuando NO hay video (para ocupar espacio) */}
          {!hasVideo && secondHalf.length > 0 && (
            <div className={styles.imageCarouselContainer}>
              <div className={styles.imageCarousel}>
                {secondHalf.map((screenshot, index) => (
                  <div
                    key={index}
                    className={`${styles.carouselImage} ${index === currentImageIndex2 ? styles.active : ''}`}
                    onClick={() => openLightbox(index, 'second')}
                  >
                    <Image
                      src={screenshot}
                      alt={`${title} screenshot ${midPoint + index + 1}`}
                      fill
                      className={styles.carouselImg}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
              
              {hasMultipleImages2 && (
                <>
                  <button
                    className={`${styles.carouselNavButton} ${styles.carouselNavButtonLeft}`}
                    onClick={goToPrevious2}
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    className={`${styles.carouselNavButton} ${styles.carouselNavButtonRight}`}
                    onClick={goToNext2}
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                  
                  <div className={styles.carouselIndicators}>
                    {secondHalf.map((_, index) => (
                      <button
                        key={index}
                        className={`${styles.indicator} ${index === currentImageIndex2 ? styles.active : ''}`}
                        onClick={() => setCurrentImageIndex2(index)}
                        aria-label={`Go to image ${midPoint + index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Video debajo del carrusel cuando hay video */}
          {hasVideo && videoUrl && (
            <div className={styles.videoContainer}>
              <video
                src={videoUrl}
                controls
                className={styles.video}
                preload="metadata"
                playsInline
                style={{ width: '100%', height: '100%' }}
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className={styles.lightboxOverlay} onClick={() => setIsLightboxOpen(false)}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.lightboxClose}
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close lightbox"
            >
              <X size={28} />
            </button>
            
            {validScreenshots.length > 1 && (
              <>
                <button
                  className={`${styles.lightboxNavButton} ${styles.lightboxNavButtonLeft}`}
                  onClick={goToPreviousLightbox}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  className={`${styles.lightboxNavButton} ${styles.lightboxNavButtonRight}`}
                  onClick={goToNextLightbox}
                  aria-label="Next image"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            <div className={styles.lightboxImageContainer}>
              <Image
                src={validScreenshots[lightboxImageIndex]}
                alt={`${title} screenshot ${lightboxImageIndex + 1}`}
                fill
                className={styles.lightboxImage}
                sizes="100vw"
                unoptimized
              />
            </div>

            {validScreenshots.length > 1 && (
              <div className={styles.lightboxIndicators}>
                {validScreenshots.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.lightboxIndicator} ${index === lightboxImageIndex ? styles.active : ''}`}
                    onClick={() => setLightboxImageIndex(index)}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}

            <div className={styles.lightboxCounter}>
              {lightboxImageIndex + 1} / {validScreenshots.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
