'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';
import { useLanguage, useLocalePath } from '../../contexts/LanguageContext';
import styles from './MobileShowcase.module.scss';

// Case studies en mobile: un proyecto grande arriba y los siguientes en lista.
// Reemplaza al carrusel: en el celular no había que adivinar que se podía
// deslizar, y cada tarjeta cargaba cuatro capas encima de la captura.
//
// El destacado va rotando solo entre los primeros QUEUE proyectos. La lista
// funciona como cola: muestra los que vienen, en el orden en que van a pasar.
// Tocar una fila NO navega: ese proyecto pasa a ser el destacado y la rotación
// se frena (la persona está eligiendo). Se entra al caso solo desde el
// destacado, que tiene su propio "Ver caso".

type ShowcaseProject = {
  slug?: string;
  title: string;
  subtitle?: string;
  previewImage?: string;
  category?: 'product' | 'platform' | 'landing';
  status?: 'latest';
};

const QUEUE = 5;
const ROTATE_MS = 5000;

export default function MobileShowcase({ projects }: { projects: ShowcaseProject[] }) {
  const { t } = useLanguage();
  const toLocale = useLocalePath();
  const items = projects.filter((p) => p.slug && p.previewImage).slice(0, QUEUE);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const featuredRef = useRef<HTMLAnchorElement>(null);

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

  const select = (slug?: string) => {
    const index = items.findIndex((p) => p.slug === slug);
    if (index < 0) return;
    setActive(index);
    setPaused(true);
    // Si el destacado quedó fuera de pantalla, se lo trae a la vista.
    featuredRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  if (items.length === 0) return null;

  const current = items[active % items.length];
  const queue = items.length > 1
    ? Array.from({ length: items.length - 1 }, (_, k) => items[(active + 1 + k) % items.length])
    : [];
  const label = (p: ShowcaseProject) =>
    [p.status === 'latest' && t('projects.badges.latest'), p.category && t(`projects.badges.${p.category}`)]
      .filter(Boolean)
      .join(' · ');

  return (
    <div className={styles.showcase}>
      <Link ref={featuredRef} href={toLocale(`/projects/${current.slug}`)} className={styles.featured}>
        <span className={styles.media}>
          {/* Todas las capturas montadas a la vez: el cambio es un fundido y no
              un parpadeo de carga. */}
          {items.map((p, i) => (
            <Image
              key={p.slug}
              src={p.previewImage as string}
              alt={i === active ? `${p.title}` : ''}
              fill
              sizes="(max-width: 1024px) 92vw, 1px"
              className={`${styles.image} ${i === active ? styles.imageOn : ''}`}
              priority={i === 0}
            />
          ))}
          {items.length > 1 && !paused && <span key={active} className={styles.progress} aria-hidden />}
        </span>
        <span className={styles.meta}>
          {label(current) && <span className={styles.label}>{label(current)}</span>}
          <span className={styles.title}>{current.title}</span>
          {current.subtitle && <span className={styles.subtitle}>{current.subtitle}</span>}
          <span className={styles.go}>
            {t('projects.viewProject')}
            <HiArrowRight className={styles.goArrow} aria-hidden />
          </span>
        </span>
      </Link>

      {queue.length > 0 && (
        <ul key={active} className={styles.list}>
          {queue.map((p) => (
            <li key={p.slug}>
              <button type="button" className={styles.row} onClick={() => select(p.slug)}>
                <span className={styles.thumb}>
                  <Image src={p.previewImage as string} alt="" fill sizes="120px" className={styles.thumbImage} />
                </span>
                <span className={styles.rowText}>
                  <span className={styles.rowTitle}>{p.title}</span>
                  {p.subtitle && <span className={styles.rowSubtitle}>{p.subtitle}</span>}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
