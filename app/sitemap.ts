// app/sitemap.ts
// Sitemap dinámico: se regenera en cada build, así que agregar un .mdx en
// content/blog/ lo incluye sin tocar este archivo.

import type { MetadataRoute } from 'next';
import { projects } from './data/projects';
import { BLOG_LANGUAGES, getAllPosts } from '../lib/blog';
import { SITE_URL, postUrl } from '../lib/site';

const STATIC_ROUTES = [
  { path: '', priority: 1, changeFrequency: 'monthly' as const },
  { path: '/projects', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/blog', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/about', priority: 0.7, changeFrequency: 'yearly' as const },
  { path: '/tutorials', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.5, changeFrequency: 'yearly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const projectEntries: MetadataRoute.Sitemap = projects
    .filter((project) => Boolean(project.slug))
    .map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

  // Se emite una entrada por idioma, cada una declarando sus alternativas.
  const postEntries: MetadataRoute.Sitemap = BLOG_LANGUAGES.flatMap((language) =>
    getAllPosts(language).map((post) => ({
      url: postUrl(post.slug, language),
      lastModified: new Date(post.date),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          post.availableLanguages.map((alt) => [alt, postUrl(post.slug, alt)])
        ),
      },
    }))
  );

  return [...staticEntries, ...projectEntries, ...postEntries];
}
