'use client';

// Tarjeta tipo vitrina de /projects. La captura va chica, dentro de una compu
// (mismo recurso que los posts de Instagram), y la info se reparte en piezas
// que se leen de un vistazo: tipo, una línea de qué es, tres etiquetas de lo
// que incluye y el rubro. La descripción larga queda para el detalle del caso.

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import styles from './ProjectShopCard.module.scss';
import { useLanguage, useLocalePath } from '../../contexts/LanguageContext';
import type { ProjectCard } from '../../lib/projectCards';

interface Props {
  project: ProjectCard;
  /** Primera fila de la grilla: es el LCP de /projects. */
  priority?: boolean;
}

const ProjectShopCard = ({ project, priority = false }: Props) => {
  const { t } = useLanguage();
  const toLocale = useLocalePath();
  // link3 es el sitio en vivo; null significa proyecto privado de cliente.
  const isLive = Boolean(project.link3);

  return (
    <Link href={toLocale(`/projects/${project.slug}`)} className={styles.card}>
      <div className={styles.stage}>
        {project.category && (
          <span className={styles.category}>{t(`projects.badges.${project.category}`)}</span>
        )}
        <div className={styles.laptop} aria-hidden>
          <div className={styles.screen}>
            {(project.shopImage || project.previewImage) && (
              <Image
                src={(project.shopImage || project.previewImage) as string}
                alt=""
                fill
                priority={priority}
                className={styles.screenImage}
                sizes="(max-width: 768px) 80vw, 300px"
              />
            )}
          </div>
          <div className={styles.base} />
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>{project.title}</h2>
          <span className={isLive ? styles.live : styles.private}>
            {isLive ? t('projects.live') : t('projects.private')}
          </span>
        </div>
        {project.subtitle && <p className={styles.oneLiner}>{project.subtitle}</p>}
        {project.tags && project.tags.length > 0 && (
          <ul className={styles.tags}>
            {project.tags.map((tag) => (
              <li key={tag} className={styles.tag}>{tag}</li>
            ))}
          </ul>
        )}
        <div className={styles.footer}>
          <span className={styles.sector}>{project.sector}</span>
          <span className={styles.cta}>
            {t('projects.viewProject')}
            <span className={styles.ctaIcon} aria-hidden>
              <ArrowRight size={13} strokeWidth={2.4} />
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProjectShopCard;
