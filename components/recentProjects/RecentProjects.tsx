import { useEffect, useState } from 'react';
import styles from './RecentProjects.module.scss';
import ProjectCard from '../ProjectCard/ProjectCard';
import ProjectsButton from '../projectsButton/ProjectsButton';

type Project = {
  title: string;
  isTutorial?: boolean;
  description: string;
  link1?: string;
  link2?: string;
  link3?: string;
  previewImage?: string;
  logs?: string[];
};

const RecentProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data: Project[] = await res.json();
        const firstTwo = data.slice(0, 2);
        setProjects(firstTwo);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className={styles.recentProjects}>
      <p className={styles.title}>Projects</p>
      <div className={styles.projectsContainer}>
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
      <div className={styles.projectsButtonContainer}>
       <ProjectsButton/>
      </div>
    </section>
  );
};

export default RecentProjects;
