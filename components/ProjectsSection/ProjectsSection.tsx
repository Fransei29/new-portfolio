import styles from './ProjectsSection.module.scss';
import RecentProjects from '../RecentProjects/RecentProjects';
import RecentTutorials from '../RecentTutorials/RecentTutorials';
import { useScrollAnimation } from '../../hooks/Scroll';

const ProjectsSection = () => {
  const elementsRef = useScrollAnimation();

  return (
    <section className={styles.projectsSectionContainer}>
        <div className={styles.projectsSection}>
            <p className={styles.highlight}>
                Recent Work
            </p>
            <section id="banner" ref={(el) => { elementsRef.current[0] = el;}} className="fade-in-right">
              <RecentProjects/>
            </section>
            <section id="banner" ref={(el) => { elementsRef.current[1] = el;}} className="fade-in-left"> 
              <RecentTutorials/>
            </section>
        </div>
    </section>
  );
};

export default ProjectsSection;