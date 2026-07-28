// components/Blog/BlogCard.tsx

import Link from 'next/link';
import Image from 'next/image';
import type { BlogLanguage, PostMeta } from '../../lib/blog';
import styles from './BlogCard.module.scss';

interface Props {
  post: PostMeta;
  language: BlogLanguage;
  variant?: 'grid' | 'lead';
}

const LOCALE: Record<BlogLanguage, string> = { es: 'es-AR', en: 'en-US' };
const READ_LABEL: Record<BlogLanguage, string> = { es: 'min de lectura', en: 'min read' };

export const formatDate = (date: string, language: BlogLanguage) =>
  new Date(date).toLocaleDateString(LOCALE[language], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });

export default function BlogCard({ post, language, variant = 'grid' }: Props) {
  const href = language === 'es' ? `/blog/${post.slug}?lang=es` : `/blog/${post.slug}`;
  const isLead = variant === 'lead';

  return (
    <article className={`${styles.card} ${isLead ? styles.cardLead : ''}`}>
      <Link href={href} className={styles.cardLink}>
        {post.cover && (
          <div className={styles.coverWrap}>
            <Image
              src={post.cover}
              alt={post.coverAlt ?? ''}
              fill
              className={styles.cover}
              sizes={isLead ? '(max-width: 900px) 100vw, 1100px' : '(max-width: 900px) 100vw, 380px'}
              priority={isLead}
            />
          </div>
        )}

        <div className={styles.body}>
          <div className={styles.meta}>
            <time dateTime={post.date}>{formatDate(post.date, language)}</time>
            <span className={styles.metaDot} aria-hidden>
              ·
            </span>
            <span>
              {post.readingMinutes} {READ_LABEL[language]}
            </span>
          </div>

          <h2 className={styles.title}>{post.title}</h2>
          <p className={styles.description}>{post.description}</p>

          {(post.tags ?? []).length > 0 && (
            <ul className={styles.tags}>
              {(post.tags ?? []).slice(0, 3).map((tag) => (
                <li key={tag} className={styles.tag}>
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Link>
    </article>
  );
}
