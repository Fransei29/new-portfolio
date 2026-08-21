'use client';

import styles from './ProjectsSection.module.scss';
import RecentProjects from '../RecentProjects/RecentProjects';
import RecentTutorials from '../RecentTutorials/RecentTutorials';
import { useLanguage } from '../../contexts/LanguageContext';

type ProjectsSectionProps = {
  variant?: 'projects' | 'tutorials';
};

const ProjectsSection = ({ variant = 'projects' }: ProjectsSectionProps) => {
  const { t } = useLanguage();

  const isTutorials = variant === 'tutorials';
  const titleKey = isTutorials ? 'projects.tutorials' : 'projects.projects';
  const subtitleKey = isTutorials ? 'projects.tutorialsSubtitle' : 'projects.projectsSubtitle';

  return (
    <section className={`${styles.projectsSectionContainer} ${isTutorials ? styles.tutorialsVariant : ''}`}>
      <div className={styles.projectsSection}>
        <p className={`highlight piece-l piece-delay-0`}>
          {t(titleKey)}
        </p>
        <p className={`${styles.subtitle} piece-r piece-delay-1`}>
          {t(subtitleKey)}
        </p>
        <div className={styles.singleColumn}>
          <section className="piece-u piece-delay-2">
            {isTutorials ? <RecentTutorials /> : <RecentProjects />}
          </section>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
