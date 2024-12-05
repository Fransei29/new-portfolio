import React from 'react';

const Experience = () => {
  return (
    <section className="experience-section">
      <h2 className="highlight">Experience</h2>
      <h1 className='title-experience'>Front-End Developer at Digital Innovators</h1>
      <p>
        I significantly enhanced user engagement by building and 
        maintaining SPAs with <strong>React</strong> and 
        <strong> Redux</strong>, resulting in a 15% increase in user retention.
      </p>
      <p>
        My optimizations led to a <strong>20% </strong>improvement in conversion rates, 
        and my contributions to an internal component library reduced future development 
        time by 30%.
      </p> 
      <hr className="divider" />
      <h1 className='title-experience'>Freelance Full-Stack Developer</h1>
      <p>
        I have worked on numerous Full-Stack projects, delivering tailored solutions that meet diverse client needs. My work spans both frontend development with <strong>Next.js</strong> and React, and backend functionality using <strong>Node.js</strong> and <strong>Express</strong>.
      </p>
      <p>
        Additionally, I have integrated databases like <strong>PostgreSQL</strong> and  <strong>MongoDB</strong> to provide scalable and efficient data solutions.
      </p>
    </section>
  );
};

export default Experience;

