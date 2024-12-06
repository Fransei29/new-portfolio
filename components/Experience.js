import React from 'react';

const Experience = () => {
  return (
    <section className="experience-section">
      <h2 className="highlight">Experience</h2>
      <h1 className='title-experience'>Front-End Developer at Digital Innovators</h1>
      <p className="experience-date">June 2023 - March 2024</p>
      <p>
        Enhanced user engagement by building and 
        maintaining SPAs with <strong>React</strong> and 
        <strong> Redux</strong>, resulting in a 15% increase in user retention.
      </p>
      <p className="special-text">
        Optimizations to a <strong>20% </strong>improvement in conversion rates, 
        and contributions to an internal component library reduced future development 
        time by 30%.
      </p> 
      <hr className="divider" />
      <h1 className='title-experience'>Freelance Full-Stack Developer</h1>
      <p className="experience-date">March 2023 - Present</p>
      <p>
        Worked on numerous Full-Stack projects, delivering tailored solutions that meet diverse client needs. My work spans both frontend development with <strong>Next.js</strong> and React, and backend functionality using <strong>Node.js</strong> and <strong>Express</strong>.
      </p>
      <p>
        Integrated databases like <strong>PostgreSQL</strong> and  <strong>MongoDB</strong> to provide scalable and efficient data solutions.
      </p>
    </section>
  );
};

export default Experience;

