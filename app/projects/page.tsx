'use client'

import { useEffect, useState } from 'react';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/Scroll';
import '../projects/projects.css';

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
    <div className="titlepro">
      <div ref={(el) => { elementsRef.current[0] = el; }} className="fade-in-right">
        <div className="tit2">
          <p className="tit-project">
            Welcome to <span style={{ color: 'rgb(236, 3, 119)' }}>Projects Section</span>
          </p>
          <p className="tit-project1">
            Explore a selection of my projects, where I bring ideas to life through code, design, and creativity.
          </p>
          <p className="tit-project2">Discover how I turn ideas into interactive experiences.</p>
        </div>
      </div>
      <div className="projects1">
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
  );
};

export default Projects;
