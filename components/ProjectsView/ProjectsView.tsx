'use client'

import { useEffect, useState } from 'react';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/Scroll';
import styles from '../../app/projects/projects.module.scss';
import ClientLayout from '../../components/ClientLayout/ClientLayout';
import { useLanguage } from '../../contexts/LanguageContext';
import '../../app/styles/utilities.scss'; 

import type { ProjectCard as ProjectCardData } from '../../lib/projectCards';

type TabKey = 'featured' | 'all' | 'product' | 'platform' | 'landing';

interface Props {
  /** Lista renderizada en el servidor. Es lo que ven los crawlers sin JS. */
  initialProjects: ProjectCardData[];
}

const Projects = ({ initialProjects }: Props) => {
  const [projects, setProjects] = useState<ProjectCardData[]>(initialProjects);
  // Arranca en 'all': entrar a case studies y ver un subconjunto filtrado
  // esconde la mayor parte del trabajo. El destacado queda a un clic, al lado.
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const elementsRef = useScrollAnimation();
  const { t, language } = useLanguage();

  /* El servidor ya mandó la lista en inglés dentro del HTML. Este efecto solo
     corre para traducirla cuando el visitante cambia el idioma: si pidiera
     siempre, volveríamos a depender de JS para mostrar contenido que ya está. */
  useEffect(() => {
    if (language === 'en') {
      setProjects(initialProjects);
      return;
    }

    let cancelled = false;
    fetch(`/api/projects?lang=${language}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setProjects(data);
      })
      .catch((error) => console.error('Error fetching projects:', error));

    return () => {
      cancelled = true;
    };
  }, [language, initialProjects]);

  const tabs: { key: TabKey; labelKey: string }[] = [
    // 'all' primero porque es el estado por defecto: el tab activo al entrar
    // tiene que ser el de la izquierda, si no se lee como que algo se saltó.
    { key: 'all', labelKey: 'projects.tabs.all' },
    { key: 'featured', labelKey: 'projects.tabs.featured' },
    { key: 'product', labelKey: 'projects.badges.product' },
    { key: 'platform', labelKey: 'projects.badges.platform' },
    { key: 'landing', labelKey: 'projects.badges.landing' },
  ];

  const getTabCount = (key: TabKey) => {
    if (key === 'featured') return projects.filter((p) => p.featured).length;
    if (key === 'all') return projects.length;
    return projects.filter((p) => p.category === key).length;
  };

  const filteredProjects =
    activeTab === 'featured'
      ? projects.filter((p) => p.featured)
      : activeTab === 'all'
      ? projects
      : projects.filter((p) => p.category === activeTab);

  return (
    <ClientLayout>
      <section className={styles.containerProjects}>
        <div className={styles.projectsContent}>
          <div ref={(el) => { elementsRef.current[0] = el; }} className="fade-in-right">
            <h1 className="highlight">
              {t('pages.projects.title')}
            </h1>
            <p className={styles.projectsSubtitle}>
              {t('pages.projects.subtitle')}
            </p>

            <div className={styles.tabsBarWrap}>
              {/* Isotipo panda que se asoma por encima de la línea, a la derecha
                  (mismo guiño que el panda del dashboard del hero). El clip lo
                  recorta justo en la línea: solo asoma la mitad superior. */}
              <div className={styles.peekPandaClip} aria-hidden>
                {/* eslint-disable-next-line @next/next/no-img-element -- SVG: next/image no lo optimiza */}
                <img
                  className={styles.peekPanda}
                  src="/isotipo-panda.svg"
                  alt=""
                  aria-hidden
                  loading="lazy"
                />
              </div>
              <div className={styles.tabsBar} role="tablist">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    role="tab"
                    aria-selected={activeTab === tab.key}
                    className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    <span className={styles.tabLabel}>{t(tab.labelKey)}</span>
                    <span className={styles.tabCount}>{getTabCount(tab.key)}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.projectsGrid}>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={`${activeTab}-${project.title}-${index}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  style={{
                    willChange: 'opacity, transform',
                    minHeight: 'inherit',
                  }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </ClientLayout>
  );
};

export default Projects;
