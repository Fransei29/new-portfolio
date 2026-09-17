// components/Blog/BlogArticle.tsx

import Link from 'next/link';
import Image from 'next/image';
import type { Post, PostMeta } from '../../lib/blog';
import NewsletterForm from '../Newsletter/NewsletterForm';
import ReadingAnalytics from './ReadingAnalytics';
import TableOfContents from './TableOfContents';
import { formatDate } from './BlogCard';
import styles from './BlogArticle.module.scss';

const COPY = {
  es: {
    back: 'Volver al blog',
    readingSuffix: 'min de lectura',
    related: 'Seguí leyendo',
    by: 'Por',
    otherLanguage: 'Read in English',
  },
  en: {
    back: 'Back to blog',
    readingSuffix: 'min read',
    related: 'Keep reading',
    by: 'By',
    otherLanguage: 'Leer en español',
  },
} as const;

interface Props {
  post: Post;
  related: PostMeta[];
}

export default function BlogArticle({ post, related }: Props) {
  const copy = COPY[post.language];
  const backHref = post.language === 'es' ? '/blog?lang=es' : '/blog';
  const otherLanguage = post.language === 'es' ? 'en' : 'es';
  const hasTranslation = post.availableLanguages.includes(otherLanguage);

  return (
    <article className={styles.container}>
      <ReadingAnalytics slug={post.slug} language={post.language} />
      <div className={styles.inner}>
        <header className={styles.header}>
          <Link href={backHref} className={styles.back}>
            ← {copy.back}
          </Link>

          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.description}>{post.description}</p>

          <div className={styles.meta}>
            <span>
              {copy.by} {post.author ?? 'Franco Seiler'}
            </span>
            <span className={styles.metaDot} aria-hidden>
              ·
            </span>
            <time dateTime={post.date}>{formatDate(post.date, post.language)}</time>
            <span className={styles.metaDot} aria-hidden>
              ·
            </span>
            <span>
              {post.readingMinutes} {copy.readingSuffix}
            </span>

            {hasTranslation && (
              <Link
                href={
                  otherLanguage === 'es' ? `/blog/${post.slug}?lang=es` : `/blog/${post.slug}`
                }
                className={styles.langSwitch}
                hrefLang={otherLanguage}
              >
                {copy.otherLanguage}
              </Link>
            )}
          </div>

          {(post.tags ?? []).length > 0 && (
            <ul className={styles.tags}>
              {(post.tags ?? []).map((tag) => (
                <li key={tag}>
                  <Link
                    href={
                      post.language === 'es'
                        ? `/blog?lang=es&tag=${encodeURIComponent(tag)}`
                        : `/blog?tag=${encodeURIComponent(tag)}`
                    }
                    className={styles.tag}
                  >
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </header>

        {post.cover && (
          <div className={styles.coverWrap}>
            <Image
              src={post.cover}
              alt={post.coverAlt ?? ''}
              fill
              className={styles.cover}
              sizes="(max-width: 900px) 100vw, 820px"
              priority
            />
          </div>
        )}

        {/* Dos columnas en desktop: texto + índice sticky. El índice se oculta
            solo por CSS cuando no hay ancho para una columna lateral. */}
        <div className={styles.bodyGrid}>
          {/* HTML generado por remark desde el Markdown del post. El contenido es
              propio y versionado en el repo, no input de usuarios. */}
          <div
            className={styles.prose}
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          <TableOfContents headings={post.headings} language={post.language} />
        </div>

        {/* Va después del texto: pedir el mail recién cuando el artículo ya
            demostró que vale la pena convierte mucho mejor que un popup. */}
        <NewsletterForm language={post.language} />

        {related.length > 0 && (
          <aside className={styles.related}>
            <h2 className={styles.relatedTitle}>{copy.related}</h2>
            <ul className={styles.relatedList}>
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={
                      item.language === 'es' ? `/blog/${item.slug}?lang=es` : `/blog/${item.slug}`
                    }
                    className={styles.relatedLink}
                  >
                    <span className={styles.relatedItemTitle}>{item.title}</span>
                    <span className={styles.relatedItemMeta}>
                      {item.readingMinutes} {copy.readingSuffix}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>
    </article>
  );
}
