import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import '../../app/globals.css'; 
import styles from './SocialMedia.module.scss';

const SocialMedia = () => {
  return (
    <div className={styles.socialMedia}>
      {/* GitHub Link */}
      <a
        href="https://github.com/Fransei29"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <Github className={styles.soicon}/>
      </a>

      {/* LinkedIn Link */}
      <a
        href="https://www.linkedin.com/in/franco-seiler/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <Linkedin className={styles.soicon} />
      </a>

    </div>
  );
};

export default SocialMedia;
