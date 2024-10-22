import Image from 'next/image';

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
  { name: "Sequelize", icon: "/icons/sequelize.png" },
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
    <h3>{title}</h3>
    <div className="skills-grid">
      {skills.map((skill, index) => (
        <div className="skill-card" key={index}>
          <Image 
            src={skill.icon} 
            alt={`${skill.name} Icon`} 
            width={28} 
            height={28} 
            className="skill-icon" 
          />
          <span className="skill-name">{skill.name}</span>
        </div>
      ))}
    </div>
  </div>
);

const Skills = () => {
  return (
    <section className="skills-section">
      <h2 className="highlight">Skills</h2>
      <SkillsSection id='title-first' title="Frontend" skills={frontEndSkills} />
      <SkillsSection title="Backend" skills={backEndSkills} />
      <SkillsSection title="Tools" skills={toolsSkills} />
    </section>
  );
};

export default Skills;
