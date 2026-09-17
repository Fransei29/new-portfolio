'use client';

// components/Blog/BlogSearch.tsx
// Búsqueda client-side sobre los posts ya presentes en la página.
//
// No hay índice ni servicio externo: con decenas de posts, filtrar en memoria es
// instantáneo y evita una dependencia. Si el blog llegara a cientos, convendría
// un índice pre-construido.

import { useMemo, useState } from 'react';
import type { BlogLanguage, PostMeta } from '../../lib/blog';
import BlogCard from './BlogCard';
import styles from './BlogSearch.module.scss';

const COPY = {
  es: {
    placeholder: 'Buscar artículos…',
    clear: 'Limpiar búsqueda',
    results: (n: number) => (n === 1 ? '1 resultado' : `${n} resultados`),
    empty: 'No encontramos artículos para esa búsqueda.',
  },
  en: {
    placeholder: 'Search articles…',
    clear: 'Clear search',
    results: (n: number) => (n === 1 ? '1 result' : `${n} results`),
    empty: 'No articles matched that search.',
  },
} as const;

/** Normaliza para que "arquitectura" encuentre "Arquitectura" y "codigo" encuentre "código". */
const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

interface Props {
  posts: PostMeta[];
  language: BlogLanguage;
}

export default function BlogSearch({ posts, language }: Props) {
  const copy = COPY[language];
  const [query, setQuery] = useState('');

  // Se indexa una vez por lista de posts, no en cada tecla.
  const index = useMemo(
    () =>
      posts.map((post) => ({
        post,
        haystack: normalize(
          [post.title, post.description, ...(post.tags ?? [])].join(' ')
        ),
      })),
    [posts]
  );

  const trimmed = query.trim();
  const results = useMemo(() => {
    if (!trimmed) return posts;
    // Todos los términos deben aparecer (AND), para que agregar palabras afine.
    const terms = normalize(trimmed).split(/\s+/).filter(Boolean);
    return index
      .filter(({ haystack }) => terms.every((term) => haystack.includes(term)))
      .map(({ post }) => post);
  }, [index, posts, trimmed]);

  return (
    <>
      <div className={styles.searchRow}>
        <div className={styles.inputWrap}>
          <label htmlFor="blog-search" className={styles.srOnly}>
            {copy.placeholder}
          </label>
          <input
            id="blog-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy.placeholder}
            className={styles.input}
            autoComplete="off"
          />
          {trimmed && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className={styles.clear}
              aria-label={copy.clear}
            >
              ×
            </button>
          )}
        </div>

        {/* aria-live para que los lectores de pantalla anuncien el recuento. */}
        <p className={styles.count} aria-live="polite">
          {trimmed ? copy.results(results.length) : ''}
        </p>
      </div>

      {results.length === 0 ? (
        <p className={styles.empty}>{copy.empty}</p>
      ) : (
        <div className={styles.grid}>
          {results.map((post) => (
            <BlogCard key={post.slug} post={post} language={language} />
          ))}
        </div>
      )}
    </>
  );
}
