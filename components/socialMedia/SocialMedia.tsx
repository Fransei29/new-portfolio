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

      {/* Email Link */}
      <a
        href="mailto:seilerfranco317@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Email"
      >
        <Mail className={styles.soicon}/>
      </a>

      {/* CV Link */}
      <Link href="/FrancoCV.pdf" passHref legacyBehavior>
        <a href="/FrancoCV.pdf" target="_blank" rel="noopener noreferrer" className={styles.logoLink} aria-label="CV">
          <Image
            src="/dev6.png"
            alt="CV Logo"
            width={40}
            height={40}
            className={styles.cvIcon}
          />
        </a>
      </Link>
    </div>
  );
};

export default SocialMedia;
