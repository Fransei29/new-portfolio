'use client';

import styles from './ProjectsSection.module.scss';
import RecentProjects from '../RecentProjects/RecentProjects';
import RecentTutorials from '../RecentTutorials/RecentTutorials';
import { useScrollAnimation } from '../../hooks/Scroll';
import { useLanguage } from '../../contexts/LanguageContext';

type ProjectsSectionProps = {
  variant?: 'projects' | 'tutorials';
};

const ProjectsSection = ({ variant = 'projects' }: ProjectsSectionProps) => {
  const elementsRef = useScrollAnimation();
  const { t } = useLanguage();

  const isTutorials = variant === 'tutorials';
  const titleKey = isTutorials ? 'projects.tutorials' : 'projects.projects';
  const subtitleKey = isTutorials ? 'projects.tutorialsSubtitle' : 'projects.projectsSubtitle';

  return (
    <section className={styles.projectsSectionContainer}>
      <div className={styles.projectsSection}>
        <p className="highlight">
          {t(titleKey)}
        </p>
        <p className={styles.subtitle}>
          {t(subtitleKey)}
        </p>
        <div className={styles.singleColumn}>
          <section ref={(el) => { elementsRef.current[0] = el; }} className="fade-in-right">
            {isTutorials ? <RecentTutorials /> : <RecentProjects />}
          </section>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
