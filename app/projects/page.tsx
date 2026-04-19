'use client'

import { useEffect, useState } from 'react';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/Scroll';
import styles from '../projects/projects.module.scss';
import ClientLayout from '../../components/ClientLayout/ClientLayout';
import { useLanguage } from '../../contexts/LanguageContext';
import '../../app/styles/utilities.scss'; 

// Definir los tipos de los proyectos
interface Projects {
  title: string;
  isTutorial?: boolean;
  description: string;
  link1?: string;
  link2?: string;
  link3?: string;
  previewImage?: string;
  logs?: string[];
  category?: 'product' | 'platform' | 'landing';
  status?: 'latest';
}

type TabKey = 'all' | 'product' | 'platform' | 'landing';

const Projects = () => {
  const [projects, setProjects] = useState<Projects[]>([]);
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const elementsRef = useScrollAnimation();
  const { t, language } = useLanguage();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`/api/projects?lang=${language}`);
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, [language]);

  const tabs: { key: TabKey; labelKey: string }[] = [
    { key: 'all', labelKey: 'projects.tabs.all' },
    { key: 'product', labelKey: 'projects.badges.product' },
    { key: 'platform', labelKey: 'projects.badges.platform' },
    { key: 'landing', labelKey: 'projects.badges.landing' },
  ];

  const filteredProjects =
    activeTab === 'all'
      ? projects
      : projects.filter((p) => p.category === activeTab);

  return (
    <ClientLayout>
      <section className={styles.containerProjects}>
        <div className={styles.projectsContent}>
          <div ref={(el) => { elementsRef.current[0] = el; }} className="fade-in-right">
            <p className={styles.highlight}>
              {t('pages.projects.title')}
            </p>
            <p className={styles.projectsSubtitle}>
              {t('pages.projects.subtitle')}
            </p>

            <div className={styles.tabsBar} role="tablist">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  role="tab"
                  aria-selected={activeTab === tab.key}
                  className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : ''}`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {t(tab.labelKey)}
                </button>
              ))}
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
