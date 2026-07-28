// lib/blog.ts
// Capa de lectura del blog. Corre SOLO en el servidor (usa fs), lo que permite
// que los posts se rendericen en HTML desde el primer byte — a diferencia del
// resto del sitio, que traduce en cliente vía LanguageContext.

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';

export type BlogLanguage = 'es' | 'en';

export const BLOG_LANGUAGES: BlogLanguage[] = ['es', 'en'];

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  cover?: string;
  coverAlt?: string;
  author?: string;
  featured?: boolean;
  /** Si es true, el post no aparece en listados, sitemap ni RSS. */
  draft?: boolean;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
  language: BlogLanguage;
  readingMinutes: number;
  /** Idiomas en los que existe este mismo slug — se usa para hreflang. */
  availableLanguages: BlogLanguage[];
}

export interface HeadingNode {
  /** Ancla del encabezado; coincide con el id inyectado en el HTML. */
  id: string;
  text: string;
  /** 2 o 3 — los h1 los ocupa el título del post. */
  level: number;
}

export interface Post extends PostMeta {
  /** Markdown crudo, por si se necesita para extractos o búsqueda. */
  raw: string;
  /** HTML ya renderizado, listo para dangerouslySetInnerHTML. */
  html: string;
  /** Encabezados del artículo, para el índice de contenidos. */
  headings: HeadingNode[];
}

const isPublishable = (data: PostFrontmatter) =>
  process.env.NODE_ENV === 'development' || !data.draft;

const languageDir = (language: BlogLanguage) => path.join(BLOG_DIR, language);

/** Lista los slugs presentes en el directorio de un idioma. */
function slugsForLanguage(language: BlogLanguage): string[] {
  const dir = languageDir(language);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .map((file) => file.replace(/\.mdx?$/, ''));
}

function resolvePostFile(slug: string, language: BlogLanguage): string | null {
  for (const extension of ['.mdx', '.md']) {
    const candidate = path.join(languageDir(language), `${slug}${extension}`);
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

/**
 * Idiomas en los que existe un slug dado. Al mantener el mismo slug en es/ y en/,
 * las alternativas hreflang se derivan del filesystem en vez de duplicarse a mano
 * en el frontmatter (donde se desincronizarían).
 */
function availableLanguagesFor(slug: string): BlogLanguage[] {
  return BLOG_LANGUAGES.filter((language) => resolvePostFile(slug, language) !== null);
}

function toMeta(slug: string, language: BlogLanguage, raw: string): PostMeta {
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;

  return {
    ...frontmatter,
    tags: frontmatter.tags ?? [],
    slug,
    language,
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
    availableLanguages: availableLanguagesFor(slug),
  };
}

/** Metadatos de todos los posts de un idioma, del más reciente al más antiguo. */
export function getAllPosts(language: BlogLanguage): PostMeta[] {
  return slugsForLanguage(language)
    .map((slug) => {
      const file = resolvePostFile(slug, language);
      if (!file) return null;
      const raw = fs.readFileSync(file, 'utf8');
      const { data } = matter(raw);
      if (!isPublishable(data as PostFrontmatter)) return null;
      return toMeta(slug, language, raw);
    })
    .filter((post): post is PostMeta => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Ancla legible a partir del texto de un encabezado. Se quitan los acentos
 * (NFD + rango de diacríticos) para que "Configuración" produzca
 * "configuracion" y no un id con caracteres escapados en la URL.
 */
function slugifyHeading(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

/** Quita las etiquetas del HTML interno de un encabezado (ej. `código`, **negrita**). */
const stripTags = (html: string) => html.replace(/<[^>]+>/g, '').trim();

/**
 * Extrae los h2/h3 del HTML y les inyecta un id para poder enlazarlos.
 *
 * Se hace con regex en vez de un plugin de rehype porque el pipeline actual
 * termina en remark-html (string), no en un árbol. Es suficiente: la entrada es
 * HTML que generamos nosotros desde Markdown propio, no marcado arbitrario.
 *
 * Los ids duplicados reciben sufijo -2, -3… para que dos secciones con el mismo
 * título no colisionen.
 */
function withHeadingAnchors(html: string): { html: string; headings: HeadingNode[] } {
  const headings: HeadingNode[] = [];
  const used = new Map<string, number>();

  const output = html.replace(
    /<h([23])>([\s\S]*?)<\/h\1>/g,
    (_match, level: string, inner: string) => {
      const text = stripTags(inner);
      const base = slugifyHeading(text) || 'seccion';

      const seen = used.get(base) ?? 0;
      used.set(base, seen + 1);
      const id = seen === 0 ? base : `${base}-${seen + 1}`;

      headings.push({ id, text, level: Number(level) });
      return `<h${level} id="${id}">${inner}</h${level}>`;
    }
  );

  return { html: output, headings };
}

/** Un post con su HTML renderizado, o null si no existe en ese idioma. */
export async function getPost(slug: string, language: BlogLanguage): Promise<Post | null> {
  const file = resolvePostFile(slug, language);
  if (!file) return null;

  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(raw);
  if (!isPublishable(data as PostFrontmatter)) return null;

  const processed = await remark().use(remarkGfm).use(remarkHtml).process(content);
  const { html, headings } = withHeadingAnchors(processed.toString());

  return {
    ...toMeta(slug, language, raw),
    raw: content,
    html,
    headings,
  };
}

/** Todos los pares slug/idioma publicables — alimenta generateStaticParams, sitemap y RSS. */
export function getAllPostParams(): { slug: string; language: BlogLanguage }[] {
  return BLOG_LANGUAGES.flatMap((language) =>
    getAllPosts(language).map((post) => ({ slug: post.slug, language }))
  );
}

/** Tags únicos de un idioma, ordenados por frecuencia de uso. */
export function getAllTags(language: BlogLanguage): { tag: string; count: number }[] {
  const counts = new Map<string, number>();

  for (const post of getAllPosts(language)) {
    for (const tag of post.tags ?? []) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/**
 * Posts relacionados por tags compartidos. Se usa al pie de cada artículo:
 * el enlazado interno reparte autoridad entre posts y sube el tiempo en sitio.
 */
export function getRelatedPosts(post: PostMeta, limit = 3): PostMeta[] {
  const tags = new Set(post.tags ?? []);

  return getAllPosts(post.language)
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      candidate,
      shared: (candidate.tags ?? []).filter((tag) => tags.has(tag)).length,
    }))
    .sort((a, b) => b.shared - a.shared)
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}
