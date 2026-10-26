'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';
import { ArrowUpRight, BookOpen, Github, GraduationCap, PlayCircle } from 'lucide-react';
import { useLanguage, useLocalePath } from '../../contexts/LanguageContext';
import { tutorials } from '../../lib/tutorialCards';
import styles from './LearnSection.module.scss';

// Reemplaza al carrusel de tutoriales: en vez de mostrar el contenido, ofrece
// las dos puertas de aprendizaje (tutoriales y academy) como llamado a la
// acción, sin competir con los case studies.

// Tutoriales que tienen repo para clonar: la terminal los va recorriendo.
const WITH_REPO = tutorials
  .map((tut) => ({
    title: tut.title.trim(),
    clone: tut.logs?.find((line) => line.startsWith('git clone')),
  }))
  .filter((tut): tut is { title: string; clone: string } => Boolean(tut.clone))
  .slice(0, 6);

const ROTATE_MS = 2800;

export default function LearnSection() {
  const { t, language } = useLanguage();
  const toLocale = useLocalePath();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (WITH_REPO.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % WITH_REPO.length), ROTATE_MS);
    return () => window.clearInterval(id);
  }, []);

  const current = WITH_REPO[active];

  return (
    <section className={styles.learnSection}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <h2 className="highlight piece-l piece-delay-0">{t('learn.title')}</h2>
          <p className={`${styles.subtitle} piece-r piece-delay-1`}>{t('learn.subtitle')}</p>
        </div>

        <div className={styles.cards}>
          <Link href={toLocale('/tutorials')} className={`${styles.card} piece-u piece-delay-2`}>
            <div className={styles.cardHead}>
              <span className={styles.cardIcon} aria-hidden>
                <BookOpen size={22} strokeWidth={1.75} />
              </span>
              <h3 className={styles.cardTitle}>{t('learn.tutorialsTitle')}</h3>
            </div>

            {current && (
              <div className={styles.terminal} aria-hidden>
                <div className={styles.termBar}>
                  <i /><i /><i />
                </div>
                <p key={current.title} className={styles.termLine}>
                  <span className={styles.prompt}>$</span> {current.clone.replace('https://', '')}
                </p>
                <p className={styles.termLine}>
                  <span className={styles.prompt}>$</span> npm install<span className={styles.cursor} />
                </p>
              </div>
            )}

            <p className={styles.cardTextMuted}>
              {(t('learn.tutorialsDescription') ?? '').replace('{count}', String(tutorials.length))}
            </p>

            <span className={styles.go}>
              {t('learn.tutorialsButton')}
              <HiArrowRight className={styles.arrow} />
            </span>
          </Link>

          <a
            href={`https://bootcamp.francoseiler.com/${language}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.card} ${styles.cardDark} piece-u piece-delay-3`}
          >
            <div className={styles.cardHead}>
              <span className={styles.cardIcon} aria-hidden>
                <GraduationCap size={22} strokeWidth={1.75} />
              </span>
              <h3 className={styles.cardTitle}>{t('learn.academyTitle')}</h3>
            </div>
            <p className={styles.cardText}>{t('learn.academyDescription')}</p>
            {/* Lo que trae cada módulo (ver bootcamp.json: video y repo). */}
            <ul className={styles.features}>
              <li>
                <PlayCircle size={18} strokeWidth={1.75} aria-hidden />
                {t('learn.academyVideos')}
              </li>
              <li>
                <Github size={18} strokeWidth={1.75} aria-hidden />
                {t('learn.academyCode')}
              </li>
            </ul>

            <span className={styles.go}>
              {t('learn.academyButton')}
              <ArrowUpRight size={16} className={styles.arrowOut} />
            </span>

            {/* El panda programando en su versión con borde claro: la de siempre
                se perdía sobre el lila profundo. Asoma por la esquina. */}
            {/* eslint-disable-next-line @next/next/no-img-element -- SVG: next/image no lo optimiza */}
            <img
              className={styles.panda}
              src="/isotipo-panda-programando-claro.svg"
              alt=""
              aria-hidden
              loading="lazy"
            />
          </a>
        </div>

        {/* El blog salió de la home como sección: queda como una línea acá. */}
        <p className={`${styles.blog} piece-u piece-delay-4`}>
          {t('learn.blogText')}{' '}
          <Link href={toLocale('/blog')} className={styles.blogLink}>
            {t('learn.blogLink')}
            <HiArrowRight className={styles.arrow} />
          </Link>
        </p>
      </div>
    </section>
  );
}
