import { NextResponse } from 'next/server';
import { getAllPosts, type BlogLanguage } from '../../../lib/blog';

/**
 * Listado de posts para consumo desde el CLIENTE.
 *
 * El home es un Client Component (usa LanguageContext), pero lib/blog.ts lee
 * del filesystem y sólo corre en servidor. Este endpoint es el puente: expone
 * la metadata ya filtrada (sin drafts) y ordenada por fecha.
 *
 * `limit` viene acotado para que un query manipulado no fuerce a serializar
 * todos los posts del sitio.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const language: BlogLanguage = searchParams.get('lang') === 'es' ? 'es' : 'en';

  const rawLimit = Number.parseInt(searchParams.get('limit') ?? '3', 10);
  const limit = Number.isFinite(rawLimit) ? Math.min(Math.max(rawLimit, 1), 12) : 3;

  const posts = getAllPosts(language)
    .slice(0, limit)
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      date: post.date,
      tags: post.tags ?? [],
      cover: post.cover ?? null,
      coverAlt: post.coverAlt ?? null,
      readingMinutes: post.readingMinutes,
    }));

  return NextResponse.json({ posts });
}
