import React from 'react';
import Link from 'next/link';
import '../app/globals.css';
import { ExternalLink } from 'lucide-react';

const ProjectsSection = () => {
  return (
    <section className="projects-section">
      <div className='button-container'>
      <Link href="/projects" legacyBehavior>
        <a className="button-tutorials">
          Go to Projects <ExternalLink className="iconSmallA" size={19} />
        </a>
      </Link>

      <Link href="/tutorials" legacyBehavior>
        <a className="button-tutorials">
          Go to Tutorials <ExternalLink className="iconSmallA" size={19} />
        </a>
      </Link> 
      </div>
    </section>
  );
};

export default ProjectsSection;
