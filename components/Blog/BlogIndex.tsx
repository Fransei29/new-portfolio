// components/Blog/BlogIndex.tsx
// Presentación del listado. Recibe los posts ya resueltos en el servidor, así
// que el HTML inicial contiene los títulos reales (crawleables) y no un skeleton.

import Link from 'next/link';
import type { BlogLanguage, PostMeta } from '../../lib/blog';
import BlogCard from './BlogCard';
import BlogSearch from './BlogSearch';
import NewsletterForm from '../Newsletter/NewsletterForm';
import styles from './BlogIndex.module.scss';

const COPY = {
  es: {
    title: 'Blog',
    subtitle:
      'Notas sobre desarrollo web, arquitectura y las decisiones técnicas detrás de los productos que construyo.',
    all: 'Todos',
    empty: 'Todavía no hay artículos publicados en esta categoría.',
    emptyAll: 'Los primeros artículos están en camino.',
    featured: 'Destacado',
  },
  en: {
    title: 'Blog',
    subtitle:
      'Notes on web development, architecture, and the technical decisions behind the products I build.',
    all: 'All',
    empty: 'No articles published in this category yet.',
    emptyAll: 'The first articles are on their way.',
    featured: 'Featured',
  },
} as const;

interface Props {
  posts: PostMeta[];
  tags: { tag: string; count: number }[];
  activeTag: string | null;
  language: BlogLanguage;
}

/** Preserva ?lang= al navegar entre filtros, para no perder el idioma elegido. */
const hrefFor = (tag: string | null, language: BlogLanguage) => {
  const params = new URLSearchParams();
  if (language === 'es') params.set('lang', 'es');
  if (tag) params.set('tag', tag);
  const query = params.toString();
  return query ? `/blog?${query}` : '/blog';
};

/** A partir de acá el buscador aporta más de lo que ocupa. */
const SEARCH_THRESHOLD = 6;

export default function BlogIndex({ posts, tags, activeTag, language }: Props) {
  const copy = COPY[language];
  const [lead, ...rest] = posts;
  const showSearch = posts.length >= SEARCH_THRESHOLD;

  return (
    <section className={styles.containerBlog}>
      <div className={styles.blogContent}>
        <h1 className="highlight">{copy.title}</h1>
        <p className={styles.blogSubtitle}>{copy.subtitle}</p>

        {tags.length > 0 && (
          <div className={styles.tabsBarWrap}>
            {/* Mismo guiño de marca que en /projects: el panda asoma sobre la línea. */}
            <div className={styles.peekPandaClip} aria-hidden>
              {/* eslint-disable-next-line @next/next/no-img-element -- SVG: next/image no lo optimiza */}
              <img
                className={styles.peekPanda}
                src="/isotipo-panda.svg"
                alt=""
                aria-hidden
                loading="lazy"
              />
            </div>
            <div className={styles.tabsBar} role="tablist">
              <Link
                href={hrefFor(null, language)}
                role="tab"
                aria-selected={activeTag === null}
                className={`${styles.tab} ${activeTag === null ? styles.tabActive : ''}`}
              >
                <span className={styles.tabLabel}>{copy.all}</span>
                <span className={styles.tabCount}>{posts.length}</span>
              </Link>
              {tags.map(({ tag, count }) => (
                <Link
                  key={tag}
                  href={hrefFor(tag, language)}
                  role="tab"
                  aria-selected={activeTag === tag}
                  className={`${styles.tab} ${activeTag === tag ? styles.tabActive : ''}`}
                >
                  <span className={styles.tabLabel}>{tag}</span>
                  <span className={styles.tabCount}>{count}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {posts.length === 0 ? (
          <p className={styles.emptyState}>{activeTag ? copy.empty : copy.emptyAll}</p>
        ) : showSearch ? (
          // Con pocos posts el buscador es ruido; recién a partir de SEARCH_THRESHOLD
          // aporta. Al activarse reemplaza al destacado, porque un post fijo arriba
          // confundiría al filtrar.
          <BlogSearch posts={posts} language={language} />
        ) : (
          <>
            {/* El más reciente ocupa el ancho completo: jerarquía visual y un
                enlace interno prominente hacia el contenido más fresco. */}
            <BlogCard post={lead} language={language} variant="lead" />

            {rest.length > 0 && (
              <div className={styles.blogGrid}>
                {rest.map((post) => (
                  <BlogCard key={post.slug} post={post} language={language} />
                ))}
              </div>
            )}
          </>
        )}

        <NewsletterForm language={language} variant="inline" />
      </div>
    </section>
  );
}
