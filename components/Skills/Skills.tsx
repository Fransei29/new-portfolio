import { useScrollAnimation } from '../../hooks/Scroll';
import Image from 'next/image';
import styles from './Skills.module.scss';

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
  { name: "HTML5", icon: HtmlIcon },
  { name: "CSS3", icon: CssIcon },
  { name: "Bootstrap", icon: BootstrapIcon },
  { name: "Sass", icon: SassIcon }
];

const backEndSkills: Skill[] = [
  { name: "Node.js", icon: NodeIcon },
  { name: "Express", icon: ExpressIcon },
  { name: "GraphQL", icon: GraphqlIcon },
  { name: "Sequelize", icon: SequelizeIcon },
  { name: "MongoDB", icon: MongoIcon },
  { name: "PostgreSQL", icon: PostgresIcon },
  { name: "Redis", icon: RedisIcon },
  { name: "Airtable", icon: AirtableIcon },
];

const toolsSkills: Skill[] = [
  { name: "Git", icon: GitIcon },
  { name: "Docker", icon: DockerIcon },
  { name: "Wordpress", icon: WordpressIcon },
  { name: "Figma", icon: FigmaIcon },
  { name: "Jest", icon: JestIcon },
];

// Componente de sección
interface SkillsSectionProps {
  title: string;
  skills: Skill[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ title, skills }) => (
  <div className={styles.skillsCategory}>
    <p className={styles.skillsTitleDivide}>{title}</p>
    <div className={styles.skillsGrid}>
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

  return (
    <section className={styles.skillsSectionContainer}>
      <div className={styles.skillsSection}>
        <p className={`${styles.highlight} ${styles.skillsTitle}`}>
          Skills
        </p>

        <div className={styles.skillsCards}>
          <div ref={(el) => {elementsRef.current[0] = el;}} className="fade-in-left">
              <SkillsSection title="Frontend" skills={frontEndSkills} />
            </div>

            <div ref={(el) => {elementsRef.current[1] = el;}} className="fade-in-right">
              <SkillsSection title="Backend" skills={backEndSkills} />
            </div>

            <div ref={(el) => {elementsRef.current[2] = el;}} className="fade-in-left">
              <SkillsSection title="Tools" skills={toolsSkills} />
            </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
