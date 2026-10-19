// app/blog/page.tsx
// Server Component a propósito: el HTML del listado sale traducido desde el
// servidor, sin depender de LanguageContext (que traduce en cliente y por eso
// Google solo ve la versión en inglés en el resto del sitio).

import type { Metadata } from 'next';
import ClientLayout from '../../../components/ClientLayout/ClientLayout';
import BlogIndex from '../../../components/Blog/BlogIndex';
import { getAllPosts, getAllTags, type BlogLanguage } from '../../../lib/blog';
import { BLOG_DESCRIPTION, blogUrl } from '../../../lib/site';
import { OG_LOCALE } from '../../../lib/i18n';

interface Props {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ tag?: string }>;
}

const resolveLanguage = (value?: string): BlogLanguage => (value === 'es' ? 'es' : 'en');

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const language = resolveLanguage(lang);

  const title = language === 'es' ? 'Blog | Franco Seiler' : 'Blog | Franco Seiler';
  const description = BLOG_DESCRIPTION[language];

  return {
    title,
    description,
    alternates: {
      canonical: blogUrl(language),
      languages: {
        es: blogUrl('es'),
        en: blogUrl('en'),
        'x-default': blogUrl('en'),
      },
    },
    openGraph: {
      type: 'website',
      url: blogUrl(language),
      title,
      description,
      locale: OG_LOCALE[language],
      // La imagen la genera opengraph-image.tsx por convención.
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function BlogPage({ params, searchParams }: Props) {
  const [{ lang }, { tag }] = await Promise.all([params, searchParams]);
  const language = resolveLanguage(lang);

  const allPosts = getAllPosts(language);
  const tags = getAllTags(language);
  const posts = tag ? allPosts.filter((post) => (post.tags ?? []).includes(tag)) : allPosts;

  return (
    <ClientLayout>
      <BlogIndex posts={posts} tags={tags} activeTag={tag ?? null} language={language} />
    </ClientLayout>
  );
}
