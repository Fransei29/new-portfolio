import React from 'react';
import Link from 'next/link';

const ProjectsSection = () => {
  return (
    <section className="projects-section">
      <h2 className="highlight">Projects</h2>
      <p>
        You can check my projects in <strong>My Projects Section</strong> to explore the applications I have built.
      </p>
      <p>
        Do not miss out the <strong>Tutorials Section</strong>, where you will find practical guides to help you to discover/practice <u>+13 technologies</u>, empowering you to create your own dynamic applications.
      </p>
      <div className='button-container'>
        <Link href="/projects">
          <button className="button-tutorials">
            Go to Projects <i className="fas fa-arrow-right arrow"></i>
          </button>
        </Link>
        <Link href="/tutorials">
          <button className="button-tutorials">
            Go to Tutorials <i className="fas fa-arrow-right arrow"></i>
          </button>
        </Link>   
      </div>
    </section>
  );
};

export default ProjectsSection;
