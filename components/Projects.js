import React from 'react';
import Link from 'next/link';

const ProjectsSection = () => {
  return (
    <section className="projects-section">
      <h2 className="highlight">Projects</h2>
      <p>
        My projects showcase my commitment to web development, focusing on applications designed to enhance user experience and ensure scalability.
      </p>
      <p>
        You can check my projects in <strong>My Projects Section</strong> to explore the applications I have built.
      </p>
      <p>
        Do not miss out the <strong>Tutorials Section</strong>, where you will find practical guides to help you to discover/practice <u><strong>+13 technologies</strong></u>, empowering you to create your own dynamic applications.
      </p>
      <div className='button-container'>
          <Link href="/projects">
            <button className="button-tutorials">Go to Projects</button>
          </Link>
          <Link href="/tutorials">
            <button className="button-tutorials">Go to Tutorials</button>
          </Link>   
      </div>
    </section>
  );
};

export default ProjectsSection;
