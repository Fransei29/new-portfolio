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
}

const Projects = () => {
  const [projects, setProjects] = useState<Projects[]>([]);
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
          <div className={styles.projectsGrid}>
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                style={{ 
                  willChange: 'opacity',
                  minHeight: 'inherit'
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
