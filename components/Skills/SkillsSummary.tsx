'use client';

import Image from 'next/image';
import styles from './SkillsSummary.module.scss';
import { useLanguage } from '../../contexts/LanguageContext';
import Button from '../Button/Button';

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

// Reparte los skills en 4 filas (de a 4). Cada fila se desliza en marquee
// automático, alternando dirección: izq, der, izq, der.
const ROWS = 4;
const skillRows: Skill[][] = Array.from({ length: ROWS }, (_, r) =>
  mainSkills.filter((_, i) => i % ROWS === r)
);

const SkillCardItem: React.FC<{ skill: Skill }> = ({ skill }) => {
  const isComponent = typeof skill.icon !== 'string';
  return (
    <div className={styles.skillsCard}>
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
};

const SkillsSummary: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.skillsSummaryContainer}>
      <div className={styles.skillsSummarySection}>
        <p className="highlight piece-l piece-delay-0">
          {t('skills.title')}
        </p>
        <p className={`${styles.subtitle} piece-r piece-delay-1`}>
          {t('skills.summarySubtitle')}
        </p>

        {/* piece-u y no piece-l/r: el marquee ya se desplaza en horizontal por
            su cuenta, así que una entrada lateral pelea con ese movimiento. */}
        <div className="piece-u piece-delay-2">
          <div className={styles.marquee}>
            {skillRows.map((row, r) => {
              // Filas pares (0,2) → izquierda; impares (1,3) → derecha
              const dirClass = r % 2 === 0 ? styles.toLeft : styles.toRight;
              // Repetimos la fila para llenar el ancho (evita huecos en desktop),
              // luego duplicamos ese bloque para que el loop a -50% no tenga costura.
              const base = [...row, ...row, ...row];
              const loop = [...base, ...base];
              return (
                <div className={styles.marqueeRow} key={r}>
                  <div className={`${styles.marqueeTrack} ${dirClass}`}>
                    {loop.map((skill, i) => (
                      <SkillCardItem skill={skill} key={`${r}-${i}`} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.buttonWrapper}>
          <Button href="/about" label={t('skills.viewFullStack')} variant="secondary" />
        </div>
      </div>
    </section>
  );
};

export default SkillsSummary;

