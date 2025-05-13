'use client';

import React from 'react';
import Link from 'next/link';
import '../../app/globals.css';
import { ExternalLink } from 'lucide-react';
import styles from './ProjectsButton.module.scss';

const ProjectsButton: React.FC = () => {
  return (
    <section className={styles.projectsSection}>
      <div className={styles.buttonContainer}>
        <Link href="/projects" legacyBehavior>
          <p className={styles.buttonTutorials}>
            Go to Projects <ExternalLink className={styles.iconSmallA} size={19} />
          </p>
        </Link>
      </div>
    </section>
  );
};

export default ProjectsButton;
