'use client';

import { useEffect, useState } from 'react';
import styles from './RecentProjects.module.scss';
import ProjectCard from '../ProjectCard/ProjectCard';
import Button from '../Button/Button';
import { useLanguage } from '../../contexts/LanguageContext';

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
  const { t } = useLanguage();

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
      <p className={styles.title}>{t('projects.projects')}</p>
      <div className={styles.projectsContainer}>
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
      <div className={styles.projectsButtonContainer}>
       <Button href="/projects" label={t('projects.goToProjects')} />
      </div>
    </section>
  );
};

export default RecentProjects;
