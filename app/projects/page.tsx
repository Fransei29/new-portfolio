'use client'

import { useEffect, useState } from 'react';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/Scroll';
import styles from '../projects/projects.module.scss';
import ClientLayout from '../../components/ClientLayout/ClientLayout';
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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
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
            Projects
          </p>
          <p className={styles.projectsSubtitle}>
          Selected works that reflect how I think, build, and solve problems
          </p>
          <div className={styles.projectsGrid}>
            {projects.map((project, index) => (
              <motion.div
                key={index}
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
