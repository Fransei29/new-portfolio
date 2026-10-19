// app/blog/[slug]/page.tsx

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ClientLayout from '../../../../components/ClientLayout/ClientLayout';
import BlogArticle from '../../../../components/Blog/BlogArticle';
import {
  getAllPostParams,
  getPost,
  getRelatedPosts,
  type BlogLanguage,
} from '../../../../lib/blog';
import { AUTHOR, OG_IMAGE, SITE_NAME, SITE_URL, postUrl } from '../../../../lib/site';
import { OG_LOCALE } from '../../../../lib/i18n';

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

const resolveLanguage = (value?: string): BlogLanguage => (value === 'es' ? 'es' : 'en');

export async function generateStaticParams({ params }: { params: { lang: string } }) {
  // Los posts de ese idioma: /es/blog/x solo si existe la versión en español.
  const language = resolveLanguage(params.lang);
  return getAllPostParams()
    .filter((param) => param.language === language)
    .map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lang } = await params;
  const language = resolveLanguage(lang);

  const post = (await getPost(slug, language)) ?? (await getPost(slug, 'en'));
  if (!post) return { title: 'Post no encontrado' };

  const url = postUrl(post.slug, post.language);

  // Solo se declaran las alternativas que existen en disco, para no prometerle
  // a Google una traducción que devolvería 404.
  const languages = Object.fromEntries(
    post.availableLanguages.map((alt) => [alt, postUrl(post.slug, alt)])
  );

  return {
    title: `${post.title} | ${SITE_NAME}`,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author ?? AUTHOR.name }],
    alternates: {
      canonical: url,
      languages: {
        ...languages,
        'x-default': postUrl(post.slug, post.availableLanguages.includes('en') ? 'en' : post.language),
      },
    },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.description,
      siteName: SITE_NAME,
      locale: OG_LOCALE[post.language],
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author ?? AUTHOR.name],
      tags: post.tags,
      // og:image y twitter:image los inyecta opengraph-image.tsx por convención.
      // Declararlos acá los pisaría con la portada del post.
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      creator: AUTHOR.twitter,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug, lang } = await params;
  const language = resolveLanguage(lang);

  // Si el post no existe en el idioma pedido, se cae al inglés antes de 404.
  const post = (await getPost(slug, language)) ?? (await getPost(slug, 'en'));
  if (!post) return notFound();

  const related = getRelatedPosts(post);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.cover ? `${SITE_URL}${post.cover}` : OG_IMAGE.url,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    inLanguage: post.language === 'es' ? 'es-ES' : 'en-US',
    keywords: (post.tags ?? []).join(', '),
    wordCount: post.raw.split(/\s+/).length,
    author: {
      '@type': 'Person',
      name: post.author ?? AUTHOR.name,
      url: AUTHOR.url,
    },
    publisher: {
      /* BlogPosting.publisher tiene que ser una Organization: Google descarta
         el dato si es una Person. El author de arriba si va como Person. */
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl(post.slug, post.language),
    },
  };

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: postUrl(post.slug, post.language),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      {/* Dos ajustes para que el índice lateral se pegue al scrollear:
          - scroll-snap global interfiere con el desplazamiento del sticky;
          - `body { overflow: auto }` (globals.css) crea su propio contenedor de
            scroll, y position:sticky se ancla a ese contenedor en vez de al
            viewport. Es el mismo arreglo que usa html.project-detail-page. */}
      <style>{`
        html, html body { scroll-snap-type: none !important; }
        html body { overflow: visible; }
      `}</style>
      <ClientLayout>
        <BlogArticle post={post} related={related} />
      </ClientLayout>
    </>
  );
}
