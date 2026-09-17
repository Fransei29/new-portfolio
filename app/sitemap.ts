import type { MetadataRoute } from 'next';
import { projects } from './data/projects';
import { getAllPosts, BLOG_LANGUAGES } from '../lib/blog';

const SITE_URL = 'https://www.francoseiler.com';

/**
 * Sitemap generado en build. Sin esto Google tenía que descubrir los ~22 case
 * studies y los posts rastreando enlaces, y las páginas más profundas (un case
 * study concreto) quedaban a varios saltos de la home.
 *
 * El idioma vive en el cliente y se pasa por `?lang=es`, así que cada ruta se
 * declara con sus dos variantes vía `alternates.languages`: es la forma de
 * decirle a Google que la versión en español existe sin cambiar el routing.
 */
const withLanguages = (path: string) => ({
  languages: {
    en: `${SITE_URL}${path}`,
    es: `${SITE_URL}${path}${path.includes('?') ? '&' : '?'}lang=es`,
  },
});

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Rutas fijas. La prioridad ordena la importancia relativa dentro del sitio:
  // la home primero, después las que convierten (contacto, case studies).
  const staticRoutes: MetadataRoute.Sitemap = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/projects', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/blog', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/tutorials', priority: 0.6, changeFrequency: 'monthly' as const },
  ].map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
    alternates: withLanguages(path),
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
    alternates: withLanguages(`/projects/${project.slug}`),
  }));

  /* Los posts sí tienen fecha real de publicación, así que `lastModified` deja
     de ser una aproximación. Se recorren los dos idiomas y se deduplica por
     slug: un mismo artículo es una URL con dos variantes de idioma, no dos
     URLs distintas. */
  const seen = new Set<string>();
  const postRoutes: MetadataRoute.Sitemap = [];

  for (const language of BLOG_LANGUAGES) {
    for (const post of getAllPosts(language)) {
      if (seen.has(post.slug)) continue;
      seen.add(post.slug);
      postRoutes.push({
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'yearly',
        priority: 0.6,
        alternates: withLanguages(`/blog/${post.slug}`),
      });
    }
  }

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
