import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './HomeText.module.scss';
import { useLanguage } from '../../contexts/LanguageContext';
import StartIcon from '../../public/NewBrand/icons/star-arrow-right-start-20-regular.svg';
import SearchIcon from '../../public/NewBrand/icons/search.svg';

const HomeText: React.FC = () => {
  const { t, language } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const subtitleBefore = isMobile ? t('hero.subtitle.mobile.before') : t('hero.subtitle.before');
  const subtitleHighlight = t('hero.subtitle.highlight');
  const subtitleAfter = isMobile ? t('hero.subtitle.mobile.after') : t('hero.subtitle.after');

  return (
  <section className={styles.homeTextContainer}>
    <section className="hero-piece hero-piece-1">
        <h1 className={styles.mainTitle}>
          {subtitleBefore}
          <br />
          <span className={styles.highlight}>{subtitleHighlight}</span>
          <br />
          {subtitleAfter}
        </h1>
    </section>
    <section className="hero-piece hero-piece-2">
       <h2 className={styles.subTitle}>{t('hero.description')}</h2>
    </section>
    <section className="hero-piece hero-piece-3">
        {t('about.description') && (
          <p className={styles.description}>
            {t('about.description')}
          </p>
        )}
        <div className={styles.ctaButtons}>
          <a
            href="https://calendly.com/seilerfranco317/30min"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnPrimary}
          >
            {t('hero.cta.contact')}
            <StartIcon className={styles.ctaIcon} />
          </a>
          <Link href="/projects" className={styles.btnSecondary}>
            {t('hero.cta.projects')}
            <SearchIcon className={styles.ctaIcon} />
          </Link>
        </div>
        <div className={styles.socialProof} aria-label={t('hero.socialProof.label') ?? 'Trusted by clients'}>
          <div className={styles.avatarStack}>
            <Image
              src="/img/img/Testimonials/tomi.webp"
              alt="Tomás"
              width={40}
              height={40}
              className={styles.avatarCircle}
            />
            <Image
              src="/img/img/Testimonials/Edi.webp"
              alt="Edison"
              width={40}
              height={40}
              className={styles.avatarCircle}
            />
            <Image
              src="/img/img/Testimonials/isma.webp"
              alt="Ismael"
              width={40}
              height={40}
              className={styles.avatarCircle}
            />
          </div>
          <p className={styles.socialProofCopy}>
            <span className={styles.socialProofPlus}>+</span>
            <span>{t('hero.socialProof.sub')}</span>
          </p>
          <span className={styles.socialProofDivider} aria-hidden />
          <p className={styles.socialProofStat}>
            <span className={styles.socialProofStatNumber}>22+</span>
            <span className={styles.socialProofStatLabel}>{t('hero.socialProof.projects')}</span>
          </p>
        </div>
    </section>
  </section>

  );
};

export default HomeText;
