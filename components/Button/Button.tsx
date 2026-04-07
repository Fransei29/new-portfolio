'use client';

import Link from 'next/link';
import React from 'react';
import { ExternalLink } from 'lucide-react';
import styles from './Button.module.scss';

type ButtonVariant = 'primary' | 'secondary';

interface ReusableButtonProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  small?: boolean;
  text?: string; // texto opcional arriba del botón
  variant?: ButtonVariant;
}

const Button: React.FC<ReusableButtonProps> = ({
  href,
  label,
  icon = <ExternalLink />,
  small = false,
  text,
  variant = 'primary',
}) => {
  const isExternalLink = href.startsWith('http://') || href.startsWith('https://');

  const buttonClass = [
    styles.button,
    styles[variant],
    small ? styles.buttonSmall : '',
  ]
    .filter(Boolean)
    .join(' ');

  const buttonContent = (
    <p className={buttonClass}>
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
