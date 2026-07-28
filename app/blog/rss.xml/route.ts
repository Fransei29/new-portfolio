// app/blog/rss.xml/route.ts
// Feed RSS 2.0. Incluye los posts de ambos idiomas ordenados por fecha.

import { BLOG_LANGUAGES, getAllPosts } from '../../../lib/blog';
import { AUTHOR, BLOG_DESCRIPTION, SITE_NAME, SITE_URL, postUrl } from '../../../lib/site';

export const dynamic = 'force-static';

/** Escapa los caracteres que romperían el XML. */
const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export async function GET() {
  const posts = BLOG_LANGUAGES.flatMap((language) => getAllPosts(language)).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const lastBuildDate = posts.length
    ? new Date(posts[0].date).toUTCString()
    : new Date(0).toUTCString();

  const items = posts
    .map((post) => {
      const url = postUrl(post.slug, post.language);
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <dc:creator>${escapeXml(post.author ?? AUTHOR.name)}</dc:creator>
      <dc:language>${post.language}</dc:language>
${(post.tags ?? []).map((tag) => `      <category>${escapeXml(tag)}</category>`).join('\n')}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(`Blog | ${SITE_NAME}`)}</title>
    <link>${SITE_URL}/blog</link>
    <description>${escapeXml(BLOG_DESCRIPTION.es)}</description>
    <language>es</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
