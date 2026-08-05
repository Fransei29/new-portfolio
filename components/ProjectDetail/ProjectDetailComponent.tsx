'use client';

import Image from 'next/image';
import styles from './ProjectDetailComponent.module.scss';
import { Github, ExternalLink, ChevronLeft, ChevronRight, Lock, X, FileText, Target, Code2, GraduationCap, Link2, MapPin, Layers, Server } from 'lucide-react';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import CaseStudyMeta from './CaseStudyMeta';
import CaseStudyTabs, { type CaseStudyTab } from './CaseStudyTabs';
import DeepDiveSection from './DeepDiveSection';
import type { CaseStudyDeepDive, CaseStudyOutcome, CaseStudyTestimonial } from '../../app/data/caseStudy';
import { gsap } from '../../animations/gsap.config';
import { FADE_UP } from '../../animations/presets';

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
  // null es válido: varios proyectos son privados y no tienen repo público.
  githubLink?: string | null;
  liveDemoLink?: string | null;
  // Campos de case study — opcionales, ver app/data/caseStudy.ts
  role?: string;
  engagement?: string;
  duration?: string;
  client?: string;
  industry?: string;
  year?: string;
  location?: string;
  locationFlag?: string;
  locations?: { flag?: string; label: string }[];
  outcomes?: CaseStudyOutcome[];
  testimonial?: CaseStudyTestimonial;
  // Pestañas técnicas — ver app/data/caseStudy.ts
  architecture?: CaseStudyDeepDive;
  payments?: CaseStudyDeepDive;
  infra?: CaseStudyDeepDive;
  deliverables?: CaseStudyDeepDive;
}

interface TechIcon {
  name: string;
  icon: React.ElementType | string;
}

const STICKY_OFFSET = 104;

/** Alto de la barra de tabs, para dejarla visible por encima del panel. */
const TABS_HEIGHT = 58;

/** Cada cuánto avanza el carrusel solo. */
const AUTOPLAY_INTERVAL_MS = 4500;

/** Cuánto se queda quieto después de que alguien lo mueve a mano. */
const AUTOPLAY_PAUSE_MS = 12000;


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
  role,
  engagement,
  duration,
  client,
  industry,
  year,
  location,
  locationFlag,
  locations,
  outcomes,
  testimonial,
  architecture,
  payments,
  infra,
  deliverables,
}: ProjectProps) {
  const { t, language } = useLanguage();
  
  const validScreenshots = screenshots?.filter(Boolean) || [];
  const hasVideo = Boolean(videoUrl);
  const midPoint = Math.ceil(validScreenshots.length / 2);
  const firstHalf = hasVideo ? validScreenshots : validScreenshots.slice(0, midPoint);
  const secondHalf = hasVideo ? [] : validScreenshots.slice(midPoint);
  
  const [currentImageIndex1, setCurrentImageIndex1] = useState(0);
  const [currentImageIndex2, setCurrentImageIndex2] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  // Interactuar con el carrusel lo pausa, pero solo un rato: la rotación se
  // retoma sola pasado ese tiempo. Detenerla para siempre dejaba el carrusel
  // muerto después de un único click en la flecha.
  const [pausedUntil, setPausedUntil] = useState(0);
  const pauseAutoPlay = useCallback(() => {
    setPausedUntil(Date.now() + AUTOPLAY_PAUSE_MS);
  }, []);

  
  const hasMultipleImages1 = firstHalf.length > 1;
  const hasMultipleImages2 = secondHalf.length > 1;

  // GSAP staggered entrance animations
  const textContentRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  const panelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textContentRef.current) return;
    const header = textContentRef.current.querySelector(`.${styles.titleHeader}`);

    if (header) {
      gsap.set(header, { opacity: 0, y: 30 });
      gsap.to(header, { ...FADE_UP, opacity: 1, y: 0, duration: 0.6, delay: 0.15 });
    }

    if (mediaRef.current) {
      gsap.fromTo(
        mediaRef.current.children,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.7, stagger: 0.15, ease: 'power2.out' }
      );
    }
  }, []);

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
    pauseAutoPlay();
    if (carousel === 'first') {
      setLightboxImageIndex(imageIndex);
    } else {
      setLightboxImageIndex(midPoint + imageIndex);
    }
    setIsLightboxOpen(true);
  };

  const goToPrevious1 = () => {
    pauseAutoPlay();
    setCurrentImageIndex1((prev) =>
      prev === 0 ? firstHalf.length - 1 : prev - 1
    );
  };

  const goToNext1 = () => {
    pauseAutoPlay();
    setCurrentImageIndex1((prev) =>
      prev === firstHalf.length - 1 ? 0 : prev + 1
    );
  };

  const goToPrevious2 = () => {
    pauseAutoPlay();
    setCurrentImageIndex2((prev) =>
      prev === 0 ? secondHalf.length - 1 : prev - 1
    );
  };

  const goToNext2 = () => {
    pauseAutoPlay();
    setCurrentImageIndex2((prev) =>
      prev === secondHalf.length - 1 ? 0 : prev + 1
    );
  };

  // Avance automático mientras nadie interviene. El lightbox lo congela: ver
  // una foto en grande mientras el carrusel de atrás sigue rotando desincroniza
  // lo que mirás de lo que creés estar mirando.
  useEffect(() => {
    if (isLightboxOpen) return;
    if (firstHalf.length < 2 && secondHalf.length < 2) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    // El intervalo corre siempre y salta los ticks que caen dentro de la pausa.
    // Así la rotación se reanuda sola sin necesidad de reprogramar timers.
    const id = setInterval(() => {
      if (Date.now() < pausedUntil) return;
      if (firstHalf.length > 1) {
        setCurrentImageIndex1((prev) => (prev + 1) % firstHalf.length);
      }
      if (secondHalf.length > 1) {
        setCurrentImageIndex2((prev) => (prev + 1) % secondHalf.length);
      }
    }, AUTOPLAY_INTERVAL_MS);

    return () => clearInterval(id);
  }, [isLightboxOpen, pausedUntil, firstHalf.length, secondHalf.length]);

  const hasCaseStudyMeta = Boolean(
    role || engagement || duration || client || industry || year
  );

  /** Si el proyecto ya desglosa lo técnico, los `learnings` sobran: lo repiten. */
  const hasTechnicalTabs = Boolean(architecture || payments || infra || deliverables);

  // Un chip por lugar, cada uno con su bandera. `locations` gana sobre el par
  // suelto location/locationFlag, que se mantiene para los proyectos que solo
  // operan en un país.
  const locationChips =
    locations && locations.length > 0
      ? locations
      : location
        ? [{ flag: locationFlag, label: location }]
        : [];

  // Las pestañas nombran disciplinas de ingeniería, no tareas:
  //
  //   Overview        → qué es el producto y qué había que resolver
  //   Architecture    → cómo está diseñado el sistema
  //   Payments        → cómo se mueve el dinero (el diferencial)
  //   Infrastructure  → cómo corre y se sostiene en producción
  //   Key Deliverables→ qué se entregó y dónde verlo
  //
  // Una pestaña sin datos cargados no se muestra, así que un proyecto viejo no
  // ofrece solapas vacías.
  const tabs: CaseStudyTab[] = useMemo(() => {
    const list: CaseStudyTab[] = [];
    if (whatIs || problemSolved || hasCaseStudyMeta) {
      list.push({ id: 'overview', label: t('projects.tabOverview') });
    }
    // Arquitectura e infraestructura van juntas: cómo está diseñado el sistema
    // y cómo corre en producción son la misma historia en dos capas, y por
    // separado no entraban en una fila de tabs.
    if (architecture || infra) list.push({ id: 'engineering', label: t('projects.tabEngineering') });
    if (payments) list.push({ id: 'payments', label: t('projects.tabPayments') });
    if (techStack && techStack.length > 0) {
      list.push({ id: 'tools', label: t('projects.tabTools') });
    }
    list.push({ id: 'deliverables', label: t('projects.tabDeliverables') });
    return list;
  }, [whatIs, problemSolved, hasCaseStudyMeta, architecture, payments, infra, techStack, t]);

  const [activeTab, setActiveTab] = useState<string>('overview');

  // Si la pestaña activa no existe en este proyecto (o el idioma cambió el set),
  // se cae a la primera disponible en vez de quedar en blanco.
  useEffect(() => {
    if (tabs.length > 0 && !tabs.some((tab) => tab.id === activeTab)) {
      setActiveTab(tabs[0].id);
    }
  }, [tabs, activeTab]);

  // La pestaña queda en la URL para poder compartir el link a una parte puntual
  // del case study; al volver, se restaura.
  useEffect(() => {
    const fromHash = window.location.hash.replace('#', '');
    if (fromHash && tabs.some((tab) => tab.id === fromHash)) {
      setActiveTab(fromHash);
    }
    // Solo al montar: después manda la interacción del usuario.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTabChange = useCallback((id: string) => {
    setActiveTab(id);
    window.history.replaceState(null, '', `#${id}`);

    // Si la página está scrolleada, el panel nuevo aparece por su mitad. Se
    // sube hasta el inicio del contenido para empezar a leer desde arriba.
    //
    // La referencia es el contenedor de paneles y no la barra de tabs: la barra
    // es sticky, así que una vez pegada su rect devuelve la posición fija en
    // pantalla y no la del documento.
    const panels = panelsRef.current;
    if (!panels) return;
    const panelsTop = panels.getBoundingClientRect().top + window.scrollY;
    // Se descuenta el alto de la barra para que quede visible sobre el panel.
    const target = panelsTop - STICKY_OFFSET - TABS_HEIGHT;
    if (window.scrollY > target) {
      const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: target, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  }, []);

  // Entrada escalonada del panel en cada cambio de pestaña. Sin esto el
  // contenido aparece de golpe y el cambio se siente como un corte.
  useEffect(() => {
    const panel = panelsRef.current;
    if (!panel) return;

    const blocks = panel.querySelectorAll(`.${styles.detailSection}, [data-case-section]`);
    if (blocks.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        blocks,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.07, ease: 'power2.out', overwrite: 'auto' }
      );
    }, panel);

    return () => ctx.revert();
  }, [activeTab]);

  return (
    <div className={styles.projectContainer}>
      {/* El Back vive dentro de la barra de tabs: es navegación igual que ellos,
          y como botón suelto arriba dejaba 200px de aire muerto entre el navbar
          y el contenido. */}

      {/* Grid principal: Contenido izquierda, Info derecha */}
      <div className={styles.mainGrid}>
        {/* Columna izquierda: Contenido (carruseles / video) */}
        <div className={styles.rightColumn} ref={mediaRef}>
          {/* Primer carrusel - Primera mitad de imágenes */}
          {firstHalf.length > 0 && (
            <div className={styles.imageCarouselContainer}>
              {!loadedImages.has(firstHalf[0]) && <div className={styles.skeleton} />}
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
                      onLoad={() => setLoadedImages(prev => new Set(prev).add(screenshot))}
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
                        onClick={() => { pauseAutoPlay(); setCurrentImageIndex1(index); }}
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
              {!loadedImages.has(secondHalf[0]) && <div className={styles.skeleton} />}
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
                      onLoad={() => setLoadedImages(prev => new Set(prev).add(screenshot))}
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
                        onClick={() => { pauseAutoPlay(); setCurrentImageIndex2(index); }}
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

        {/* Columna derecha: Info */}
        <div className={styles.leftColumn}>
          <div className={styles.textContent} ref={textContentRef}>
            <div className={styles.titleHeader}>
              <div className={styles.titleBlock}>
                <h1 className={styles.projectTitle}>{title}</h1>
                {subtitle && <p className={styles.titleSubtitle}>{subtitle}</p>}
              </div>

              {locationChips.length > 0 && (
                <div className={styles.locationChips}>
                  {locationChips.map((place) => (
                    <span
                      key={place.label}
                      className={styles.locationChip}
                      title={t('projects.clientLocation')}
                    >
                      {place.flag ? (
                        <span className={styles.locationFlag} aria-hidden>{place.flag}</span>
                      ) : (
                        <MapPin className={styles.locationPin} size={13} aria-hidden />
                      )}
                      {place.label}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Tabs fijos: el control de navegación no se pierde con el scroll,
                y cada pestaña cambia el contenido en vez de saltar dentro de un
                documento largo. */}
            <CaseStudyTabs
              tabs={tabs}
              activeId={activeTab}
              onChange={handleTabChange}
              backLabel={t('projects.back')}
              projectTitle={title}
            />

            <div className={styles.tabPanels} ref={panelsRef}>
              {/* ---------- Overview: qué es y qué había que resolver ---------- */}
              {activeTab === 'overview' && (
                <div
                  className={styles.tabPanel}
                  role="tabpanel"
                  id="panel-overview"
                  aria-labelledby="tab-overview"
                >
                  <CaseStudyMeta
                    language={language === 'es' ? 'es' : 'en'}
                    role={role}
                    engagement={engagement}
                    duration={duration}
                    client={client}
                    industry={industry}
                    year={year}
                    // Los resultados y el testimonio viven en la pestaña de
                    // resultados; acá solo el contexto.
                  />

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
                        <div className={styles.privateLink} title={t('projects.privateProjectTooltip')}>
                          {t('projects.githubRepository')} <Lock className={styles.iconSmall} />
                        </div>
                      ) : null}
                      {liveDemoLink ? (
                        <a href={liveDemoLink} target="_blank" rel="noopener noreferrer">
                          {t('projects.liveDemo')} <ExternalLink className={styles.iconSmall} />
                        </a>
                      ) : liveDemoLink === null ? (
                        <div className={styles.privateLink} title={t('projects.privateProjectTooltip')}>
                          {t('projects.liveDemo')} <Lock className={styles.iconSmall} />
                        </div>
                      ) : null}
                    </div>
                    {(githubLink === null || liveDemoLink === null) && (
                      <p className={styles.privateNote}>
                        <Lock className={styles.iconInline} size={14} />
                        <span>{t('projects.privateProject')}</span>
                      </p>
                    )}
                  </section>
                </div>
              )}

              {/* ---------- Engineering: cómo está diseñado y cómo corre ----------
                  Arquitectura e infraestructura en una sola vista: el diseño
                  del sistema y su operación son la misma historia, y separarlas
                  obligaba a saltar de pestaña para entender una decisión. */}
              {activeTab === 'engineering' && (architecture || infra) && (
                <div
                  className={styles.tabPanel}
                  role="tabpanel"
                  id="panel-engineering"
                  aria-labelledby="tab-engineering"
                >
                  {/* Los encabezados solo aparecen si hay dos bloques: con uno
                      solo, titular la sección con el nombre de la pestaña es
                      repetirse. */}
                  {architecture && (
                    <DeepDiveSection
                      dive={architecture}
                      heading={infra ? t('projects.sectionArchitecture') : undefined}
                      icon={<Layers size={22} aria-hidden />}
                    />
                  )}
                  {infra && (
                    <DeepDiveSection
                      dive={infra}
                      heading={architecture ? t('projects.sectionInfra') : undefined}
                      icon={<Server size={22} aria-hidden />}
                    />
                  )}

                </div>
              )}

              {/* ---------- Tools: el stack, en su propia pestaña ---------- */}
              {activeTab === 'tools' && techStack && techStack.length > 0 && (
                <div
                  className={styles.tabPanel}
                  role="tabpanel"
                  id="panel-tools"
                  aria-labelledby="tab-tools"
                >
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
                </div>
              )}

              {/* ---------- Payments: cómo se mueve el dinero ---------- */}
              {activeTab === 'payments' && payments && (
                <div
                  className={styles.tabPanel}
                  role="tabpanel"
                  id="panel-payments"
                  aria-labelledby="tab-payments"
                >
                  <DeepDiveSection dive={payments} />
                </div>
              )}

              {/* ---------- Key Deliverables: qué se entregó y dónde verlo ----------
                  Se llama "entregables" y no "resultados" a propósito: acá hay
                  entregas y enlaces, no métricas. Prometer resultados y mostrar
                  links es peor que no prometer nada. Cuando un proyecto cargue
                  `outcomes` reales, aparecen arriba de todo. */}
              {activeTab === 'deliverables' && (
                <div
                  className={styles.tabPanel}
                  role="tabpanel"
                  id="panel-deliverables"
                  aria-labelledby="tab-deliverables"
                >
                  <CaseStudyMeta
                    language={language === 'es' ? 'es' : 'en'}
                    outcomes={outcomes}
                    testimonial={testimonial}
                  />

                  {deliverables && <DeepDiveSection dive={deliverables} />}

                  {/* Los `learnings` son un resumen de todo el proyecto. En los
                      case studies que ya desglosan arquitectura, pagos e infra
                      en pestañas propias repetirlos acá es ruido, así que solo
                      se muestran cuando no hay ese desglose. */}
                  {learnings && learnings.length > 0 && !hasTechnicalTabs && (
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
                </div>
              )}
            </div>
          </div>
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
