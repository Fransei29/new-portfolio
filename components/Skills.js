import Image from 'next/image';
import { useScrollAnimation } from '../hooks/Scroll';

const frontEndSkills = [
  { name: "JavaScript", icon: "/icons/java1.png" },
  { name: "TypeScript", icon: "/icons/type.png" },
  { name: "React", icon: "/icons/react.png" },
  { name: "Next.js", icon: "/icons/next.png" },
  { name: "Redux", icon: "/icons/redux.png" },
  { name: "HTML5", icon: "/icons/html.png" },
  { name: "CSS3", icon: "/icons/css.png" },
  { name: "Bootstrap", icon: "/icons/boot.png" },
  { name: "Sass", icon: "/icons/sass.png" }
];

const backEndSkills = [
  { name: "Node.js", icon: "/icons/node2.png" },
  { name: "Express", icon: "/icons/ex.png" },
  { name: "RESTful", icon: "/icons/rest.png" },
  { name: "GraphQL", icon: "/icons/gra.png" },
  { name: "Sequelize", icon: "/icons/sequ.png" },
  { name: "MongoDB", icon: "/icons/mongo.png" },
  { name: "PostgreSQL", icon: "/icons/post.png" },
  { name: "Redis", icon: "/icons/redis.png" },
];

const toolsSkills = [
  { name: "Git", icon: "/icons/git.png" },
  { name: "Docker", icon: "/icons/dock.png" },
  { name: "Wordpress", icon: "/icons/word.png" },
  { name: "Figma", icon: "/icons/figma.png" },
  { name: "Jest", icon: "/icons/jest.png" },
];

const SkillsSection = ({ title, skills }) => (
  <div className="skills-category">
    <p  className="skills-title-divide">{title}</p>
    <div className="skills-grid">
      {skills.map((skill, index) => (
        <div className="skill-card" key={index}>
          <Image 
            src={skill.icon} 
            alt={`${skill.name} Icon`} 
            width={32} 
            height={32} 
            className="skill-icon" 
          />
          <span className="skill-name">{skill.name}</span>
        </div>
      ))}
    </div>
  </div>
);

const Skills = () => {
  const elementsRef = useScrollAnimation();

  return (
    <section className="skills-section">
      <p className="highlight">Skills</p>
      <div ref={(el) => (elementsRef.current[0] = el)} className="fade-in-left">
         <SkillsSection id='title-first' title="Frontend" skills={frontEndSkills} />
      </div>
      <div ref={(el) => (elementsRef.current[1] = el)} className="fade-in-right">
      <SkillsSection title="Backend" skills={backEndSkills} />
      </div>
      <div ref={(el) => (elementsRef.current[2] = el)} className="fade-in-left">
      <SkillsSection title="Tools" skills={toolsSkills} />
      </div>
    </section>
  );
};

export default Skills;
