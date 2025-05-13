import styles from './ProjectsSection.module.scss';
import RecentProjects from '../recentProjects/RecentProjects';
import RecentTutorials from '../recentTutorials/RecentTutorials';

const ProjectsSection = () => {
  return (
    <section className={styles.projectsSectionContainer}>
        <div className={styles.projectsSection}>
            <p className={styles.highlight}>
                Recent Work
            </p>
            <RecentProjects/>
            <RecentTutorials/>
        </div>
    </section>
  );
};

export default ProjectsSection;