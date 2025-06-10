import Image from 'next/image';
import styles from './ProjectDetailComponent.module.scss';
import { Github, ExternalLink } from 'lucide-react';

interface ProjectProps {
  title: string;
  subtitle?:string;
  whatIs?: string;
  problemSolved?: string;
  techStack?: string[];
  learnings?: string[];
  screenshots?: string[];
  githubLink?: string;
  liveDemoLink?: string;
}

export default function ProjectDetailComponent({
  title,
  subtitle,
  whatIs,
  problemSolved,
  techStack,
  learnings,
  screenshots,
  githubLink,
  liveDemoLink,
}: ProjectProps) {
  return (
    <div className={styles.projectContainer}>


    <div className={styles.alternatingSection}>
      <div className={styles.textLeft}>
        <h1>
          {title}
        </h1>
        <p className={styles.subtitle}>
          {subtitle}
        </p>

        {/* Links abajo dentro del mismo contenedor */}
        <div className={styles.links}>
          {githubLink && (
            <a href={githubLink} target="_blank" rel="noopener noreferrer">
              GitHub Repository  <Github className={styles.iconSmall}  />
            </a>
          )}
          {liveDemoLink && (
            <a href={liveDemoLink} target="_blank" rel="noopener noreferrer">
              Live Demo  <ExternalLink className={styles.iconSmall} />
            </a>
          )}
        </div>
      </div>
      {screenshots?.[0] && (
        <div className={styles.imageRight}>
          <Image
            src={screenshots[0]}
            alt={`${title} screenshot`}
            layout="responsive"
            width={800}
            height={400}
            priority
          />
        </div>
      )}
    </div>


      {/* SECTION 1 */}
      <div className={styles.alternatingSection}>
        <div className={styles.textLeft}>
          <h2>Overview</h2>
          <p>{whatIs}</p>
        </div>
        {screenshots?.[1] && (
          <div className={styles.imageRight}>
            <Image
              src={screenshots[1]}
              alt="What is it screenshot"
              layout="responsive"
              width={800}
              height={500}
            />
          </div>
        )}
      </div>

      {/* SECTION 2 */}
      <div className={styles.alternatingSection}>
        <div className={styles.textLeft}>
          <h2>Goal</h2>
          <p>{problemSolved}</p>
        </div>
        {screenshots?.[2] && (
          <div className={styles.imageRight}>
            <Image
              src={screenshots[2]}
              alt="Problem solved screenshot"
              layout="responsive"
              width={800}
              height={500}
            />
          </div>
        )}
      </div>

      {/* SECTION 3 */}
      <div className={styles.alternatingSection}>
        <div className={styles.textLeft}>
          <h2>Built With</h2>
          {techStack && techStack.length > 0 ? (
            <ul className={styles.techList}>
              {techStack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          ) : (
            <p>No tech stack information provided.</p>
          )}
        </div>
        {screenshots?.[3] && (
          <div className={styles.imageRight}>
            <Image
              src={screenshots[3]}
              alt="Tech stack screenshot"
              layout="responsive"
              width={800}
              height={500}
            />
          </div>
        )}
      </div>

      {/* SECTION 4 */}
      <div className={styles.alternatingSection}>
        <div className={styles.textLeft}>
          <h2>Learnings</h2>
          {learnings && learnings.length > 0 ? (
            <ul className={styles.learnList}>
              {learnings.map((item, i) => (
                <li key={i}>
                  <span className={styles.bullet}>✓</span> {item}
                </li>
              ))}
          </ul>
          ) : (
            <p>No learnings provided.</p>
          )}
        </div>
        {screenshots?.[4] && (
          <div className={styles.imageRight}>
            <Image
              src={screenshots[4]}
              alt="Learnings screenshot"
              layout="responsive"
              width={800}
              height={500}
            />
          </div>
        )}
      </div>

      
    </div>
  );
}
