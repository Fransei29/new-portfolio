'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';
import { useLanguage, useLocalePath } from '../../contexts/LanguageContext';
import styles from './MobileShowcase.module.scss';

// Case studies en mobile: una lista de tarjetas iguales que se van abriendo de
// a una. La abierta muestra la captura y el "Ver caso"; las demás quedan
// cerradas. Reemplaza al carrusel (en el celular no había que adivinar que se
// podía deslizar) y a la versión "destacado + lista", donde la tarjeta grande
// tenía otra sombra que las filas y se leían como dos cosas distintas.
//
// Para que el cambio se sienta controlado: la que se cierra y la que se abre
// se mueven a la vez, con la misma duración y curva (el alto total casi no
// varía), y el encabezado de cada tarjeta nunca cambia de tamaño — sólo se
// despliega el cuerpo.
//
// Rota sola cada ROTATE_MS. Tocar una tarjeta la abre y frena la rotación (la
// persona está eligiendo). Se entra al caso sólo desde "Ver caso" o la captura.

type ShowcaseProject = {
  slug?: string;
  title: string;
  subtitle?: string;
  previewImage?: string;
  category?: 'product' | 'platform' | 'landing';
  status?: 'latest';
};

const COUNT = 5;
const ROTATE_MS = 6500;

export default function MobileShowcase({ projects }: { projects: ShowcaseProject[] }) {
  const { t } = useLanguage();
  const toLocale = useLocalePath();
  const items = projects.filter((p) => p.slug && p.previewImage).slice(0, COUNT);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => {
      // Con la pestaña oculta no avanza: al volver sigue donde quedó.
      if (document.hidden) return;
      setActive((i) => (i + 1) % items.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [items.length, paused]);

  if (items.length === 0) return null;

  const label = (p: ShowcaseProject) =>
    [p.status === 'latest' && t('projects.badges.latest'), p.category && t(`projects.badges.${p.category}`)]
      .filter(Boolean)
      .join(' · ');

  return (
    <ul className={styles.showcase}>
      {items.map((p, i) => {
        const isOpen = i === active;
        const href = toLocale(`/projects/${p.slug}`);
        return (
          <li key={p.slug} className={`${styles.card} ${isOpen ? styles.open : ''}`}>
            <button
              type="button"
              className={styles.head}
              aria-expanded={isOpen}
              onClick={() => {
                setActive(i);
                setPaused(true);
              }}
            >
              <span className={styles.thumb}>
                <Image src={p.previewImage as string} alt="" fill sizes="120px" className={styles.thumbImage} />
              </span>
              <span className={styles.headText}>
                <span className={styles.title}>{p.title}</span>
                {p.subtitle && <span className={styles.subtitle}>{p.subtitle}</span>}
              </span>
              <span className={styles.chevron} aria-hidden>›</span>
            </button>

            <div className={styles.body} aria-hidden={!isOpen}>
              <div className={styles.bodyInner}>
                <Link href={href} className={styles.media} tabIndex={isOpen ? 0 : -1}>
                  <Image
                    src={p.previewImage as string}
                    alt={p.title}
                    fill
                    sizes="(max-width: 1024px) 90vw, 1px"
                    className={styles.image}
                  />
                </Link>
                <div className={styles.foot}>
                  {label(p) && <span className={styles.label}>{label(p)}</span>}
                  <Link href={href} className={styles.go} tabIndex={isOpen ? 0 : -1}>
                    {t('projects.viewProject')}
                    <HiArrowRight className={styles.goArrow} aria-hidden />
                  </Link>
                </div>
                {/* Cuánto falta para el próximo; se reinicia en cada cambio. */}
                {isOpen && !paused && items.length > 1 && (
                  <span key={active} className={styles.progress} aria-hidden />
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
