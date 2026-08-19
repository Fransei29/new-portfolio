"use client";

import ProjectCard from '../../components/ProjectCard/ProjectCard';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/Scroll';
import styles from '../../app/projects/projects.module.scss';
import ClientLayout from '../../components/ClientLayout/ClientLayout';
import { useLanguage } from '../../contexts/LanguageContext';

import type { TutorialCard } from '../../lib/tutorialCards';

interface Props {
  /** Lista renderizada en el servidor: es lo que ve un crawler sin JS. */
  tutorials: TutorialCard[];
}

const Projects = ({ tutorials }: Props) => {
  const projects = tutorials;
  const elementsRef = useScrollAnimation();
  const { t } = useLanguage();

  return (
    <ClientLayout>
      <section className={styles.containerProjects}>
        <div className={styles.projectsContent}>        
          <div ref={(el) => { elementsRef.current[0] = el; }} className="fade-in-right">
          <h1 className="highlight">
            {t('pages.tutorials.title')}
          </h1>
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
