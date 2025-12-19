'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './ProjectDetailComponent.module.scss';
import { Github, ExternalLink, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

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
            <h1>{title}</h1>
            <p className={styles.subtitle}>{subtitle}</p>
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
                <ul className={styles.techList}>
                  {techStack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
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
