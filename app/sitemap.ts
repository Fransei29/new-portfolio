import type { MetadataRoute } from 'next';
import { projects } from './data/projects';
import { getAllPosts, BLOG_LANGUAGES } from '../lib/blog';
import { LOCALES } from '../lib/i18n';
import { absoluteUrl } from '../lib/seo';

/**
 * Sitemap generado en build. Sin esto Google tenía que descubrir los ~22 case
 * studies y los posts rastreando enlaces, y las páginas más profundas (un case
 * study concreto) quedaban a varios saltos de la home.
 *
 * Cada página traducida aparece una vez por idioma (/services y /es/services),
 * las dos con el mismo bloque de alternates: así lo pide Google para hreflang
 * en sitemaps. Los case studies también: están traducidos en locales/es y cada
 * versión es su propia canonical.
 *
 * Sin `lastModified` en las rutas fijas y los case studies: la fecha de build
 * cambia en cada deploy aunque el contenido no, y Google aprende a ignorar un
 * lastmod que siempre miente. Mejor no mandar nada que mandar ruido.
 */
const alternatesFor = (path: string, locales: readonly ('en' | 'es')[] = LOCALES) => ({
  languages: {
    ...Object.fromEntries(locales.map((locale) => [locale, absoluteUrl(locale, path)])),
    'x-default': absoluteUrl('en', path),
  },
});

export default function sitemap(): MetadataRoute.Sitemap {
  // Rutas fijas. La prioridad ordena la importancia relativa dentro del sitio:
  // la home primero, después las que convierten (contacto, case studies).
  const staticRoutes: MetadataRoute.Sitemap = [
    { path: '/', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/projects', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/blog', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/tutorials', priority: 0.6, changeFrequency: 'monthly' as const },
  ].flatMap(({ path, priority, changeFrequency }) =>
    LOCALES.map((locale) => ({
      url: absoluteUrl(locale, path),
      changeFrequency,
      // La versión en español un escalón abajo: es la secundaria del sitio.
      priority: locale === 'en' ? priority : Math.round(priority * 0.9 * 10) / 10,
      alternates: alternatesFor(path),
    }))
  );

  const projectRoutes: MetadataRoute.Sitemap = projects.flatMap((project) => {
    const path = `/projects/${project.slug}`;
    return LOCALES.map((locale) => ({
      url: absoluteUrl(locale, path),
      changeFrequency: 'monthly' as const,
      priority: locale === 'en' ? 0.7 : 0.6,
      alternates: alternatesFor(path),
    }));
  });

  /* Los posts sí tienen fecha real de publicación, así que `lastModified` deja
     de ser una aproximación. Cada versión de idioma es una URL propia y declara
     solo las traducciones que existen en disco. */
  const postRoutes: MetadataRoute.Sitemap = [];
  const languagesBySlug = new Map<string, ('en' | 'es')[]>();
  for (const language of BLOG_LANGUAGES) {
    for (const post of getAllPosts(language)) {
      languagesBySlug.set(post.slug, [...(languagesBySlug.get(post.slug) ?? []), language]);
    }
  }
  for (const language of BLOG_LANGUAGES) {
    for (const post of getAllPosts(language)) {
      const path = `/blog/${post.slug}`;
      postRoutes.push({
        url: absoluteUrl(language, path),
        lastModified: new Date(post.date),
        changeFrequency: 'yearly',
        priority: 0.6,
        alternates: alternatesFor(path, languagesBySlug.get(post.slug)),
      });
    }
  }

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
