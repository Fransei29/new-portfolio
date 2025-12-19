'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './ProjectDetailComponent.module.scss';
import { Github, ExternalLink, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
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
  subtitle?:string;
  whatIs?: string;
  problemSolved?: string;
  techStack?: string[];
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
  screenshots,
  videoUrl,
  githubLink,
  liveDemoLink,
}: ProjectProps) {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const validScreenshots = screenshots?.filter(Boolean) || [];
  const hasMultipleImages = validScreenshots.length > 1;

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? validScreenshots.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => 
      prev === validScreenshots.length - 1 ? 0 : prev + 1
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
            <div className={styles.overviewSection}>
              <h2>Overview</h2>
              <p>{whatIs}</p>
            </div>
            <div className={styles.goalSection}>
              <h2>Goal</h2>
              <p>{problemSolved}</p>
            </div>
            <div className={styles.builtWithSection}>
              <h2>Built With</h2>
              {techStack && techStack.length > 0 ? (
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
              ) : (
                <p>No tech stack information provided.</p>
              )}
            </div>
            <div className={styles.links}>
              {githubLink && (
                <a href={githubLink} target="_blank" rel="noopener noreferrer">
                  GitHub Repository  <Github className={styles.iconSmall}  />
                </a>
              )}
              {liveDemoLink && (
                <a href={liveDemoLink} target="_blank" rel="noopener noreferrer">
                  Live Demo  <ExternalLink className={styles.iconSmall} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Columna derecha: Contenido (Carrusel + Video) */}
        <div className={styles.rightColumn}>
          {/* Carrusel de imágenes */}
          {validScreenshots.length > 0 && (
            <div className={styles.imageCarouselContainer}>
              <div className={styles.imageCarousel}>
                {validScreenshots.map((screenshot, index) => (
                  <div
                    key={index}
                    className={`${styles.carouselImage} ${index === currentImageIndex ? styles.active : ''}`}
                  >
                    <Image
                      src={screenshot}
                      alt={`${title} screenshot ${index + 1}`}
                      fill
                      className={styles.carouselImg}
                      priority={index === 0}
                    />
                  </div>
                ))}
              </div>
              
              {hasMultipleImages && (
                <>
                  <button
                    className={`${styles.carouselNavButton} ${styles.carouselNavButtonLeft}`}
                    onClick={goToPrevious}
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    className={`${styles.carouselNavButton} ${styles.carouselNavButtonRight}`}
                    onClick={goToNext}
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                  
                  <div className={styles.carouselIndicators}>
                    {validScreenshots.map((_, index) => (
                      <button
                        key={index}
                        className={`${styles.indicator} ${index === currentImageIndex ? styles.active : ''}`}
                        onClick={() => setCurrentImageIndex(index)}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Video */}
          {videoUrl && (
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
    </div>
  );
}
