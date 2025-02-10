import React from 'react';
import Link from 'next/link';

const ProjectsSection = () => {
  return (
    <section className="projects-section">
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
