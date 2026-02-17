'use client';

import Link from 'next/link';
import React from 'react';
import { ExternalLink } from 'lucide-react';
import styles from './Button.module.scss';

interface ReusableButtonProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  small?: boolean;
  text?: string; // ✅ nuevo texto opcional arriba del botón
}

const Button: React.FC<ReusableButtonProps> = ({
  href,
  label,
  icon = <ExternalLink />,
  small = false,
  text,
}) => {
  const isExternalLink = href.startsWith('http://') || href.startsWith('https://');
  
  const buttonContent = (
    <p className={`${styles.button} ${small ? styles.buttonSmall : ''}`}>
      {label} 
    </p>
  );

  return (
    <div className={styles.buttonWrapper}>
      {text && <p className={styles.title}>{text}</p>}
      <div className={styles.buttonContainer}>
        {isExternalLink ? (
          <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.buttonLink}
          >
            {buttonContent}
          </a>
        ) : (
          <Link href={href} className={styles.buttonLink}>
            {buttonContent}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Button;
