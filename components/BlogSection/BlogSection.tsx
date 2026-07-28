'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HiArrowRight } from 'react-icons/hi';
import styles from './BlogSection.module.scss';
import { useScrollAnimation } from '../../hooks/Scroll';
import { useLanguage } from '../../contexts/LanguageContext';

/**
 * Subconjunto de PostMeta que expone /api/blog. No se importa PostMeta de
 * lib/blog porque ese módulo lee del filesystem: arrastrarlo acá lo metería en
 * el bundle de cliente.
 */
interface HomePost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  cover: string | null;
  coverAlt: string | null;
  readingMinutes: number;
}

const LOCALE: Record<string, string> = { es: 'es-AR', en: 'en-US' };

const formatDate = (date: string, language: string) =>
  new Date(date).toLocaleDateString(LOCALE[language] ?? 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });

const BlogSection: React.FC = () => {
  const elementsRef = useScrollAnimation();
  const { t, language } = useLanguage();
  const [posts, setPosts] = useState<HomePost[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch(`/api/blog?lang=${language}&limit=3`)
      .then((res) => (res.ok ? res.json() : { posts: [] }))
      .then((data) => {
        if (cancelled) return;
        setPosts(Array.isArray(data.posts) ? data.posts : []);
        setLoaded(true);
      })
      .catch(() => {
        // Un fallo de red no debe romper el home: la sección simplemente no se
        // pinta (ver el early return de abajo).
        if (!cancelled) setLoaded(true);
      });

    return () => {
      cancelled = true;
    };
  }, [language]);

  // Mientras carga no se reserva un hueco vacío, y si no hay posts la sección
  // desaparece por completo en vez de mostrar un bloque vacío con título.
  if (!loaded || posts.length === 0) return null;

  const blogHref = language === 'es' ? '/blog?lang=es' : '/blog';
  const postHref = (slug: string) =>
    language === 'es' ? `/blog/${slug}?lang=es` : `/blog/${slug}`;

  return (
    <section className={styles.blogSection}>
      <div className={styles.container}>
        <section ref={(el) => { elementsRef.current[0] = el; }} className="fade-in-right">
          <h2 className="highlight">{t('blogSection.title')}</h2>
        </section>

        <section ref={(el) => { elementsRef.current[1] = el; }} className="fade-in-left">
          <p className={styles.subtitle}>{t('blogSection.subtitle')}</p>
        </section>

        {/* El modificador `single` evita que una sola tarjeta se estire a todo
            el ancho de la grilla: con un post publicado se vería como un banner,
            no como una tarjeta. */}
        <div
          className={`${styles.grid} ${posts.length === 1 ? styles.gridSingle : ''} ${
            posts.length === 2 ? styles.gridPair : ''
          }`}
        >
          {posts.map((post, index) => (
            <article
              key={post.slug}
              ref={(el) => { elementsRef.current[index + 2] = el; }}
              className={`${styles.card} ${index % 2 === 0 ? 'fade-in-left' : 'fade-in-right'}`}
            >
              <Link href={postHref(post.slug)} className={styles.cardLink}>
                {post.cover && (
                  <div className={styles.coverWrap}>
                    <Image
                      src={post.cover}
                      alt={post.coverAlt ?? ''}
                      fill
                      className={styles.cover}
                      sizes="(max-width: 900px) 100vw, 380px"
                    />
                  </div>
                )}

                <div className={styles.body}>
                  <div className={styles.meta}>
                    <time dateTime={post.date}>{formatDate(post.date, language)}</time>
                    <span className={styles.metaDot} aria-hidden>·</span>
                    <span>
                      {post.readingMinutes} {t('blogSection.readingSuffix')}
                    </span>
                  </div>

                  <h3 className={styles.cardTitle}>{post.title}</h3>
                  <p className={styles.cardDescription}>{post.description}</p>

                  {post.tags.length > 0 && (
                    <ul className={styles.tags}>
                      {post.tags.slice(0, 3).map((tag) => (
                        <li key={tag} className={styles.tag}>{tag}</li>
                      ))}
                    </ul>
                  )}

                  <span className={styles.readMore}>
                    {t('blogSection.readMore')}
                    <HiArrowRight className={styles.arrow} />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className={styles.ctaContainer}>
          <Link href={blogHref} className={styles.ctaButton}>
            {t('blogSection.viewAll')}
            <HiArrowRight className={styles.arrow} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
