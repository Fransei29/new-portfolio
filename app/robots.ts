import type { MetadataRoute } from 'next';

const SITE_URL = 'https://www.francoseiler.com';

/**
 * Los crawlers de LLM (GPTBot, ClaudeBot, PerplexityBot…) quedan permitidos a
 * propósito: el objetivo es que los motores de respuesta puedan leer y citar
 * los case studies y el blog. Bloquearlos es lo que hace la mayoría por
 * reflejo, y equivale a quedar fuera de ese canal.
 *
 * `/api/` y `/newsletter/` sí se bloquean: no son contenido, y las páginas de
 * estado del newsletter (confirmado, error) son ruido en el índice.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/newsletter/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
