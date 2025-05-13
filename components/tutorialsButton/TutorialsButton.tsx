'use client';

import React from 'react';
import Link from 'next/link';
import '../../app/globals.css';
import { ExternalLink } from 'lucide-react';
import styles from './TutorialsButton.module.scss';

const ProjectsSection: React.FC = () => {
  return (
    <section className={styles.projectsSection}>
      <div className={styles.buttonContainer}>
        <Link href="/tutorials" legacyBehavior>
        <p className={styles.buttonTutorials}>
            Go to Tutorials <ExternalLink className={styles.iconSmallA}  size={19} />
          </p>
        </Link>
      </div>
    </section>
  );
};

export default ProjectsSection;
