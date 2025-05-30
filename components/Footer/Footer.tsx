import React from 'react';
import styles from './Footer.module.scss';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

      <div className={styles.brand}>
          <Image src='/dev3.png' alt="Franco Seiler Logo" width={40} height={40} />
        </div>

        <p>&copy; 2025 Franco Seiler</p>
        <div className={styles.socials}>
          <a href="https://github.com/francoseiler" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/francoseiler" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
