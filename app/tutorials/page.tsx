"use client";

import { useEffect, useState } from 'react';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/Scroll';
import styles from '../projects/projects.module.scss';
import ClientLayout from '../../components/ClientLayout/ClientLayout';

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
            Tutorials
          </p>
          <p className={styles.projectsSubtitle}>
          From theory to implementation — focused tutorials for real development
          </p>
      <div className={styles.projectsGrid}>
        {projects
          .filter((project) => project.isTutorial) // Filtrar solo los tutoriales
          .map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.4 }}
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
