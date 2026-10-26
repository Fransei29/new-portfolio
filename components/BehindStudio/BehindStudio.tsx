'use client';

import Image from 'next/image';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';
import { useLanguage, useLocalePath } from '../../contexts/LanguageContext';
import styles from './BehindStudio.module.scss';

// Reemplaza a la grilla de tecnologías: a quien compra le importa con quién va
// a trabajar, no el stack (que sigue completo en /about). La cita va dentro de
// su propia tarjeta y firmada, para que no se confunda con el título; los datos
// van al costado, junto al link a /about.
const NUMBERS = ['years', 'projects'] as const;

export default function BehindStudio() {
  const { t } = useLanguage();
  const toLocale = useLocalePath();

  return (
    <section className={styles.behindStudio}>
      <div className={styles.inner}>
        <h2 className="highlight piece-l piece-delay-0">{t('behindStudio.title')}</h2>

        <div className={styles.grid}>
          <figure className={`${styles.quoteCard} piece-l piece-delay-1`}>
            <span className={styles.quoteMark} aria-hidden>“</span>
            <blockquote className={styles.quote}>{t('behindStudio.quote')}</blockquote>
            <figcaption className={styles.author}>
              <Image
                className={styles.avatar}
                src="/franco-avatar-fundador.jpg"
                alt=""
                width={112}
                height={112}
                sizes="56px"
              />
              <span>
                <span className={styles.name}>{t('behindStudio.name')}</span>
                <span className={styles.role}>{t('behindStudio.role')}</span>
              </span>
            </figcaption>
          </figure>

          <div className={`${styles.side} piece-r piece-delay-2`}>
            <dl className={styles.stats}>
              {NUMBERS.map((key) => (
                <div key={key} className={styles.stat}>
                  <dt>{t(`behindStudio.${key}Label`)}</dt>
                  <dd>{t(`behindStudio.${key}Value`)}</dd>
                </div>
              ))}
              {/* El alcance no es un número: etiqueta arriba y las regiones. */}
              <div className={`${styles.stat} ${styles.statReach}`}>
                <dt className={styles.reachKicker}>{t('behindStudio.reachKicker')}</dt>
                <dd>{t('behindStudio.reachValue')}</dd>
              </div>
            </dl>

            <Link href={toLocale('/about')} className={styles.button}>
              {t('behindStudio.button')}
              <HiArrowRight className={styles.arrow} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
