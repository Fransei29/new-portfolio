"use client";

import { useEffect, useState } from 'react';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/Scroll';
import styles from '../projects/projects.module.scss';
import ClientLayout from '../../components/ClientLayout/ClientLayout';
import { useLanguage } from '../../contexts/LanguageContext';

// Definir los tipos de los proyectos
interface Projects {
  id: string;
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
  const { t } = useLanguage();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/tutorials'); // Consumir los tutoriales en lugar de proyectos
        const data = await res.json();
        setProjects(data); // Establecer los tutoriales en el estado
      } catch (error) {
        console.error('Error fetching tutorials:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <ClientLayout>
      <section className={styles.containerProjects}>
        <div className={styles.projectsContent}>        
          <div ref={(el) => { elementsRef.current[0] = el; }} className="fade-in-right">
          <p className={styles.highlight}>
            {t('pages.tutorials.title')}
          </p>
          <p className={styles.projectsSubtitle}>
            {t('pages.tutorials.subtitle')}
          </p>
      <div className={styles.projectsGrid}>
        {projects
          .filter((project) => project.isTutorial) // Filtrar solo los tutoriales
          .map((project, index) => (
            <motion.div
              key={project.id}
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
