'use client';

import { useScrollAnimation } from '../../hooks/Scroll';
import Image from 'next/image';
import styles from './SkillsSummary.module.scss';
import { useLanguage } from '../../contexts/LanguageContext';
import Button from '../Button/Button';
import { useEffect, useRef } from 'react';
import Sortable from 'sortablejs';

// SVG importados como componentes
import JavascriptIcon from '../icons/javascript.svg';
import TypescriptIcon from '../icons/typescript.svg';
import ReactIcon from '../icons/react.svg';
import NextIcon from '../icons/nextdotjs.svg';
import NodeIcon from '../icons/nodedotjs.svg';
import PyIcon from '../../public/icons/py.svg';
import PostgresIcon from '../icons/postgresql.svg';
import TailwindIcon from '../../public/icons/tai.svg';
import ExpressIcon from '../icons/express.svg';
import MongoIcon from '../icons/mongodb.svg';
import GitIcon from '../icons/github.svg';
import DockerIcon from '../icons/docker.svg';
import SassIcon from '../icons/sass.svg';
import MySqlIcon from '../../public/icons/mysql.svg';
import GraphqlIcon from '../icons/graphql.svg';
import NestIcon from '../../public/icons/nest.svg';

// Definir tipos para las habilidades
interface Skill {
  name: string;
  icon: React.ElementType | string;
}

// Stack principal - tecnologías más importantes
const mainSkills: Skill[] = [
  { name: "React", icon: ReactIcon },
  { name: "Next.js", icon: NextIcon },
  { name: "TypeScript", icon: TypescriptIcon },
  { name: "JavaScript", icon: JavascriptIcon },
  { name: "Node.js", icon: NodeIcon },
  { name: "Python", icon: PyIcon },
  { name: "PostgreSQL", icon: PostgresIcon },
  { name: "Tailwind", icon: TailwindIcon },
  { name: "Express", icon: ExpressIcon },
  { name: "MongoDB", icon: MongoIcon },
  { name: "Git", icon: GitIcon },
  { name: "Docker", icon: DockerIcon },
  { name: "Sass", icon: SassIcon },
  { name: "MySQL", icon: MySqlIcon },
  { name: "GraphQL", icon: GraphqlIcon },
  { name: "Nest.js", icon: NestIcon },
];

const SkillsSummary: React.FC = () => {
  const elementsRef = useScrollAnimation() as React.MutableRefObject<(HTMLDivElement | null)[]>;
  const { t } = useLanguage();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Configurar Sortable para el grid de skills summary
    if (gridRef.current) {
      Sortable.create(gridRef.current, {
        group: 'summary',
        animation: 150,
        ghostClass: styles.sortableGhost,
        chosenClass: styles.sortableChosen,
        dragClass: styles.sortableDrag,
      });
    }
  }, []);

  return (
    <section className={styles.skillsSummaryContainer}>
      <div className={styles.skillsSummarySection}>
        <p className={`${styles.highlight} ${styles.skillsTitle}`}>
          {t('skills.title')}
        </p>
        <p className={styles.subtitle}>
          {t('skills.summarySubtitle')}
        </p>

        <div ref={(el) => {elementsRef.current[0] = el;}} className="fade-in-left">
          <div className={styles.skillsGrid} ref={gridRef}>
            {mainSkills.map((skill, index) => {
              const isComponent = typeof skill.icon !== 'string';

              return (
                <div className={styles.skillsCard} key={index}>
                  {isComponent ? (
                    <skill.icon className={styles.skillsIconA} />
                  ) : (
                    <Image
                      src={typeof skill.icon === 'string' ? skill.icon : ''}
                      alt={`${skill.name} Icon`}
                      width={24}
                      height={24}
                      className={styles.skillIcon}
                    />
                  )}
                  <span className={styles.skillName}>{skill.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.buttonWrapper}>
          <Button href="/about" label={t('skills.viewFullStack')} />
        </div>
      </div>
    </section>
  );
};

export default SkillsSummary;

