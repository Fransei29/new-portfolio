// app/blog/page.tsx
// Server Component a propósito: el HTML del listado sale traducido desde el
// servidor, sin depender de LanguageContext (que traduce en cliente y por eso
// Google solo ve la versión en inglés en el resto del sitio).

import type { Metadata } from 'next';
import ClientLayout from '../../components/ClientLayout/ClientLayout';
import BlogIndex from '../../components/Blog/BlogIndex';
import { getAllPosts, getAllTags, type BlogLanguage } from '../../lib/blog';
import { BLOG_DESCRIPTION, blogUrl } from '../../lib/site';

interface Props {
  searchParams: Promise<{ lang?: string; tag?: string }>;
}

const resolveLanguage = (value?: string): BlogLanguage => (value === 'es' ? 'es' : 'en');

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { lang } = await searchParams;
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
      locale: language === 'es' ? 'es_ES' : 'en_US',
      // La imagen la genera opengraph-image.tsx por convención.
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function BlogPage({ searchParams }: Props) {
  const { lang, tag } = await searchParams;
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
