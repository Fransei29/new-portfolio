// lib/site.ts
// Constantes compartidas por metadata, sitemap, robots, RSS y JSON-LD.
// Un solo lugar donde cambiar el dominio si algún día se muda.

export const SITE_URL = 'https://www.francoseiler.com';

export const SITE_NAME = 'Franco Seiler';

export const AUTHOR = {
  name: 'Franco Seiler',
  email: 'seilerfranco317@gmail.com',
  url: SITE_URL,
  twitter: '@francoseiler',
};

export const BLOG_TITLE: Record<'es' | 'en', string> = {
  es: 'Blog | Franco Seiler',
  en: 'Blog | Franco Seiler',
};

export const BLOG_DESCRIPTION: Record<'es' | 'en', string> = {
  es: 'Artículos sobre desarrollo web, arquitectura de software y las decisiones técnicas detrás de los productos que construyo.',
  en: 'Articles on web development, software architecture, and the technical decisions behind the products I build.',
};

/** URL canónica de un post. El idioma va como query param para no romper el routing actual. */
export const postUrl = (slug: string, language: 'es' | 'en') =>
  language === 'en' ? `${SITE_URL}/blog/${slug}` : `${SITE_URL}/blog/${slug}?lang=es`;

export const blogUrl = (language: 'es' | 'en') =>
  language === 'en' ? `${SITE_URL}/blog` : `${SITE_URL}/blog?lang=es`;
