"use client";

import { useEffect, useState } from 'react';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/Scroll';
import '../projects/projects.css';
import ClientLayout from '../../components/clientLayout/ClientLayout';

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
    <section className="containerProjects">
    <div className="titlepro">
      <div ref={(el) => { elementsRef.current[0] = el; }} className="fade-in-right">
        <div className="tit2">
          <p className="tit-project">
            Welcome to <span style={{ color: 'rgb(236, 3, 119)' }}>Tutorials Section</span>
          </p>
          <p className="tit-project1">
            Discover a collection of tutorials to help you learn new technologies and enhance your skills.
          </p>
          <p className="tit-project2">Feel free to dive in!</p>
        </div>
      </div>
      <div className="projects1">
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
    </section>
    </ClientLayout>
  );
};

export default Projects;
