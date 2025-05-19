'use client';

import Image from 'next/image';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FileText, Github, ExternalLink } from 'lucide-react';
import styles from './ProjectCard.module.scss';
import React, { JSX } from 'react';

// Definir tipos para el proyecto
interface Project {
  title: string;
  isTutorial?: boolean;
  description: string;
  icon?: string;
  previewImage?: string;
  link1?: string;
  link2?: string;
  link3?: string;
  technologies?: string[]; // Add technologies property
}

interface ProjectCardProps {
  project: Project;
  showDocumentation?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, showDocumentation = true }) => {
  return (
    <section className={styles.firstCardSection}>
      <article
        className={styles.projectCard}
        id={project.title.toLowerCase().replace(/\s/g, '')}
      >
        <section className={styles.firstCardSection}>
          {/* Imagen arriba */}
          {project.previewImage && (
            <div className={styles.projectPreview}>
              <Image
                src={project.previewImage}
                alt={`${project.title} Preview`}
                quality={100}
                fill
                className={styles.projectImage}
              />
            </div>
          )}
        </section>

        <section className={styles.secondCardSection}>
          {/* Título e ícono */}
            <header className={styles.projectHeader}>
              <div className={styles.projectTitleContainerCard}>
                <div className={styles.projectTitle}>
                  {project.icon &&
                    (typeof project.icon === 'string' ? (
                      <Image
                        src={project.icon}
                        alt={`${project.title} Icon`}
                        width={28}
                        height={28}
                        className={styles.projectIcon}
                      />
                    ) : (
                      React.createElement(project.icon, { className: styles.projectIcon })
                    ))}
                  <p className={styles.projectTitleX}>{project.title}</p>
                </div>
              </div>
              {/* Technologies section on the right */}
              {project.technologies && project.technologies.length > 0 && (
                <div className={styles.technologiesContainer}>
                  {project.technologies.map((tech, index) => (
                    <span key={index} className={styles.technology}>
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* Footer con descripción y enlaces */}
            <footer className={styles.projectFooter}>
              <div className={styles.projectLinks}>
                {showDocumentation && project.link1 && (
                  <a href={project.link1} target="_blank" rel="noopener noreferrer">
                    <FileText className={styles.iconSmall} size={22} />
                  </a>
                )}
                {project.link2 && (
                  <a href={project.link2} target="_blank" rel="noopener noreferrer">
                    <Github className={styles.iconSmall} size={22} />
                  </a>
                )}
                {project.link3 && (
                  <a href={project.link3} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className={styles.iconSmall} size={22} />
                  </a>
                )}
              </div>

              {/* Contenedor con descripción animada */}
              <div className={styles.infoWrapper}>
                <div className={styles.infoText}>
                  <p style={{ whiteSpace: 'pre-line' }}>{project.description}</p>
                </div>
              </div>
            </footer>
        </section>
        
      </article>
    </section>

  );
};


export default ProjectCard;
