'use client';

import { useScrollAnimation } from '../../hooks/Scroll';
import Image from 'next/image';
import styles from './Skills.module.scss';
import { useLanguage } from '../../contexts/LanguageContext';
import { useEffect, useRef } from 'react';
import Sortable from 'sortablejs';

// SVG importados como componentes
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
import PyIcon from '../../public/icons/py.svg';
import N8nIcon from '../icons/n8n.svg';
import TailwindIcon from '../../public/icons/tai.svg';
import NestIcon from '../../public/icons/nest.svg';
import FastApiIcon from '../../public/icons/fast.svg';
import MySqlIcon from '../../public/icons/mysql.svg';
import CypressIcon from '../../public/icons/cyy.svg';
import AwsIcon from '../../public/icons/aws.svg';
import ReactQueryIcon from '../../public/icons/rq.svg';
import FramerMotionIcon from '../../public/icons/fm.svg';

// Definir tipos para las habilidades
interface Skill {
  name: string;
  icon: React.ElementType | string;
}

// Arrays de skills
const frontEndSkills: Skill[] = [
  { name: "JavaScript", icon: JavascriptIcon },
  { name: "TypeScript", icon: TypescriptIcon },
  { name: "React", icon: ReactIcon },
  { name: "Next.js", icon: NextIcon },
  { name: "Redux", icon: ReduxIcon },
  { name: "Sass", icon: SassIcon },
  { name: "Tailwind CSS", icon: TailwindIcon },
  { name: "React Query", icon: ReactQueryIcon },
  { name: "Framer Motion", icon: FramerMotionIcon },
  { name: "HTML5", icon: HtmlIcon },
  { name: "CSS3", icon: CssIcon },
  { name: "Bootstrap", icon: BootstrapIcon },
];

const backEndSkills: Skill[] = [
  { name: "Python", icon: PyIcon },
  { name: "Node.js", icon: NodeIcon },
  { name: "Express", icon: ExpressIcon },
  { name: "Nest.js", icon: NestIcon },
  { name: "FastAPI", icon: FastApiIcon },
  { name: "GraphQL", icon: GraphqlIcon },
  { name: "Sequelize", icon: SequelizeIcon },
  { name: "MongoDB", icon: MongoIcon },
  { name: "PostgreSQL", icon: PostgresIcon },
  { name: "MySQL", icon: MySqlIcon },
  { name: "Redis", icon: RedisIcon },
  { name: "Airtable", icon: AirtableIcon },
];

const toolsSkills: Skill[] = [
  { name: "Git", icon: GitIcon },
  { name: "Docker", icon: DockerIcon },
  { name: "Wordpress", icon: WordpressIcon },
  { name: "Figma", icon: FigmaIcon },
  { name: "Jest", icon: JestIcon },
  { name: "N8N", icon: N8nIcon },
  { name: "Cypress", icon: CypressIcon },
  { name: "AWS", icon: AwsIcon },
];

// Componente de sección
interface SkillsSectionProps {
  title: string;
  skills: Skill[];
  gridRef: React.RefObject<HTMLDivElement | null>;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ title, skills, gridRef }) => (
  <div className={styles.skillsCategory}>
    <p className={styles.skillsTitleDivide}>{title}</p>
    <div className={styles.skillsGrid} ref={gridRef}>
      {skills.map((skill, index) => {
        const isComponent = typeof skill.icon !== 'string';

        return (
          <div className={styles.skillsCard} key={index}>
            {isComponent ? (
              <skill.icon className={styles.skillsIconA} />
            ) : (
              <Image
                src={typeof skill.icon === 'string' ? skill.icon : ''}
                alt={`${skill.name} Icon`}
                width={20}
                height={20}
                className={styles.skillIcon}
              />
            )}
            <span className={styles.skillName}>{skill.name}</span>
          </div>
        );
      })}
    </div>
  </div>
);

// Componente principal
const Skills: React.FC = () => {
  const elementsRef = useScrollAnimation() as React.MutableRefObject<(HTMLDivElement | null)[]>;
  const { t } = useLanguage();
  
  // Refs para los grids de cada sección
  const frontendGridRef = useRef<HTMLDivElement>(null);
  const backendGridRef = useRef<HTMLDivElement>(null);
  const toolsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Configurar Sortable para Frontend
    if (frontendGridRef.current) {
      Sortable.create(frontendGridRef.current, {
        group: 'frontend',
        animation: 150,
        ghostClass: styles.sortableGhost,
        chosenClass: styles.sortableChosen,
        dragClass: styles.sortableDrag,
      });
    }

    // Configurar Sortable para Backend
    if (backendGridRef.current) {
      Sortable.create(backendGridRef.current, {
        group: 'backend',
        animation: 150,
        ghostClass: styles.sortableGhost,
        chosenClass: styles.sortableChosen,
        dragClass: styles.sortableDrag,
      });
    }

    // Configurar Sortable para Tools
    if (toolsGridRef.current) {
      Sortable.create(toolsGridRef.current, {
        group: 'tools',
        animation: 150,
        ghostClass: styles.sortableGhost,
        chosenClass: styles.sortableChosen,
        dragClass: styles.sortableDrag,
      });
    }
  }, []);

  return (
    <section className={styles.skillsSectionContainer}>
      <div className={styles.skillsSection}>
        <p className={`${styles.highlight} ${styles.skillsTitle}`}>
          {t('skills.title')}
        </p>

        <div className={styles.skillsCards}>
          <div ref={(el) => {elementsRef.current[0] = el;}} className="fade-in-left">
              <SkillsSection title={t('skills.frontend')} skills={frontEndSkills} gridRef={frontendGridRef} />
            </div>

            <div ref={(el) => {elementsRef.current[1] = el;}} className="fade-in-right">
              <SkillsSection title={t('skills.backend')} skills={backEndSkills} gridRef={backendGridRef} />
            </div>

            <div ref={(el) => {elementsRef.current[2] = el;}} className="fade-in-left">
              <SkillsSection title={t('skills.tools')} skills={toolsSkills} gridRef={toolsGridRef} />
            </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
