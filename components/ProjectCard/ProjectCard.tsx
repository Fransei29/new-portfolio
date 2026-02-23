'use client';

import Link from 'next/link';
import Image from 'next/image';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FileText, Github, ExternalLink, Lock } from 'lucide-react';
import { HiArrowRight } from 'react-icons/hi';
import styles from './ProjectCard.module.scss';
import React, { JSX, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import JavascriptIcon from '../icons/javascript.svg';
import TypescriptIcon from '../icons/typescript.svg';
import ReactIcon from '../icons/react.svg';
import NextIcon from '../icons/nextdotjs.svg';
import ReduxIcon from '../icons/redux.svg';
import HtmlIcon from '../icons/html5.svg';
import CssIcon from '../icons/css.svg';
import BootstrapIcon from '../icons/bootstrap.svg';
import SassIcon from '../icons/sass.svg';
import NodeIcon from '../icons/nodedotjs.svg';
import ExpressIcon from '../icons/express.svg';
import GraphqlIcon from '../icons/graphql.svg';
import SequelizeIcon from '../icons/sequelize.svg';
import MongoIcon from '../icons/mongodb.svg';
import PostgresIcon from '../icons/postgresql.svg';
import RedisIcon from '../icons/redis.svg';
import AirtableIcon from '../icons/airtable.svg';
import GitIcon from '../icons/github.svg';
import DockerIcon from '../icons/docker.svg';
import WordpressIcon from '../icons/wordpress.svg';
import FigmaIcon from '../icons/figma.svg';
import JestIcon from '../icons/jest.svg';
import Axios from  '../icons/axios.svg';

const technologyIcons: { [key: string]: JSX.Element } = {
  JavaScript: <JavascriptIcon />,
  TypeScript: <TypescriptIcon />,
  React: <ReactIcon />,
  'Next.js': <NextIcon />,
  Redux: <ReduxIcon />,
  HTML: <HtmlIcon />,
  CSS: <CssIcon />,
  Bootstrap: <BootstrapIcon />,
  Sass: <SassIcon />,
  Node: <NodeIcon />,
  'Node.js': <NodeIcon />,
  Express: <ExpressIcon />,
  GraphQL: <GraphqlIcon />,
  Sequelize: <SequelizeIcon />,
  MongoDB: <MongoIcon />,
  PostgreSQL: <PostgresIcon />,
  Redis: <RedisIcon />,
  Airtable: <AirtableIcon />,
  GitHub: <GitIcon />,
  Docker: <DockerIcon />,
  WordPress: <WordpressIcon />,
  Figma: <FigmaIcon />,
  Jest: <JestIcon />,
  Axios: <Axios />,
};


// Definir tipos para el proyecto
interface Project {
  slug?: string;
  title: string;
  isTutorial?: boolean;
  description: string;
  icon?: string;
  previewImage?: string;
  link1?: string;
  link2?: string | null;
  link3?: string;
  technologies?: string[];
}

interface ProjectCardProps {
  project: Project;
  showDocumentation?: boolean;
}
const ProjectCard: React.FC<ProjectCardProps> = ({ project, showDocumentation = true }) => {
  const [isActive, setIsActive] = useState(false);
  const { t } = useLanguage();

  const toggleDescription = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsActive((prev) => !prev);
  };

  // Este onClick se usará solo si NO hay slug
  const handleCardClick = (e: React.MouseEvent) => {
    if (!project.slug) {
      toggleDescription(e);
    }
  };

  return (
    <article
      className={`
        ${styles.projectCard} 
        ${isActive ? styles.active : ''} 
        ${!project.slug ? styles.clickable : ''}
      `}
      id={project.title.toLowerCase().replace(/\s/g, '')}
      onClick={handleCardClick}
    >
      {project.previewImage && (
        <div className={styles.projectPreview}>
          <Image
            src={project.previewImage}
            alt={`${project.title} Preview`}
            fill
            className={styles.projectImage}
            sizes="(max-width: 768px) 100vw, 900px"
            unoptimized
          />
        </div>
      )}

      {/* Contenido sobre el degradado */}
      <div className={styles.contentOverlay}>
        <div className={styles.contentContainer}>
          {/* Título a la izquierda */}
          <div className={styles.projectTitleContainer}>
            <div className={styles.projectTitle}>
              {project.icon &&
                (typeof project.icon === 'string' ? (
                  <Image
                    src={project.icon}
                    alt={`${project.title} Icon`}
                    width={28}
                    height={28}
                    className={`${styles.projectIcon} ${project.isTutorial ? styles.tutorialIcon : ''}`}
                  />
                ) : (
                  React.createElement(project.icon, { className: `${styles.projectIcon} ${project.isTutorial ? styles.tutorialIcon : ''}` })
                ))}
              <p className={styles.projectTitleX}>{project.title}</p>
            </div>
          </div>

          {/* Botones a la derecha */}
          <div className={styles.buttonsContainer}>
            <div className={styles.projectLinks}>
              {showDocumentation && project.link1 && (
                <a href={project.link1} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                  <FileText className={styles.iconSmall} size={18} />
                </a>
              )}
              {project.link2 ? (
                <a href={project.link2} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                  <Github className={styles.iconSmall} size={18} />
                </a>
              ) : project.link2 === null ? (
                <div className={styles.privateButton} title="Código privado">
                  <Lock className={styles.iconSmall} size={18} />
                </div>
              ) : null}
              {project.link3 && !project.isTutorial && (
                <a href={project.link3} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                  <ExternalLink className={styles.iconSmall} size={18} />
                </a>
              )}
            </div>
            {project.slug && (
              <Link
                href={`/projects/${project.slug}`}
                className={styles.viewMoreButton}
                onClick={(e) => e.stopPropagation()} 
              >
                <span>{t('projects.learnMore')}</span>
                <HiArrowRight className={styles.arrow} />
              </Link>
            )}
          </div>
        </div>

        {/* Descripción expandible */}
        <div className={styles.infoWrapper}>
          <div className={styles.infoText}>
            <p className={styles.infoTextDescription} style={{ whiteSpace: 'pre-line' }}>
              {project.description}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
