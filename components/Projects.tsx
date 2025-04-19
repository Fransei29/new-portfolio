'use client';

import React from 'react';
import Link from 'next/link';
import '../app/globals.css';
import { ExternalLink } from 'lucide-react';

const ProjectsSection: React.FC = () => {
  return (
    <section className="projects-section">
      <div className="button-container">
        <Link href="/projects" legacyBehavior>
          <p className="button-tutorials">
            Go to Projects <ExternalLink className="iconSmallA" size={19} />
          </p>
        </Link>

        <Link href="/tutorials" legacyBehavior>
          <p className="button-tutorials" >
            Go to Tutorials <ExternalLink className="iconSmallA" size={19} />
          </p>
        </Link>
      </div>
    </section>
  );
};

export default ProjectsSection;
