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

/** Imagen de compartir por defecto (la genera app/og.png/route.tsx). Cada ruta
 *  que declara su propio `openGraph` tiene que incluirla explícitamente: Next
 *  no mezcla el `openGraph` del layout con el de la página, lo reemplaza. */
export const OG_IMAGE = {
  url: `${SITE_URL}/og.png`,
  width: 1200,
  height: 630,
  alt: 'Franco Seiler — Custom software & business automation',
};

export const BLOG_TITLE: Record<'es' | 'en', string> = {
  es: 'Blog | Franco Seiler',
  en: 'Blog | Franco Seiler',
};

export const BLOG_DESCRIPTION: Record<'es' | 'en', string> = {
  es: 'Artículos sobre desarrollo web, arquitectura de software y las decisiones técnicas detrás de los productos que construimos.',
  en: 'Articles on web development, software architecture, and the technical decisions behind the products we build.',
};

/** URL canónica de un post: el español vive bajo /es (ver lib/i18n.ts). */
export const postUrl = (slug: string, language: 'es' | 'en') =>
  language === 'en' ? `${SITE_URL}/blog/${slug}` : `${SITE_URL}/es/blog/${slug}`;

export const blogUrl = (language: 'es' | 'en') =>
  language === 'en' ? `${SITE_URL}/blog` : `${SITE_URL}/es/blog`;
