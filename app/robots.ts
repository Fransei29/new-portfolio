import type { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/site';

// Crawlers de buscadores y de motores de respuesta nombrados uno por uno. El
// `*` ya los deja pasar; listarlos deja la decisión documentada por crawler
// (lo pide el playbook, fase 0.2) y sobrevive si algún día se endurece el `*`.
// OAI-SearchBot es el que alimenta ChatGPT Search; GPTBot es entrenamiento.
const SEARCH_AND_AI_CRAWLERS = [
  'Googlebot',
  'Bingbot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'GPTBot',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot',
  'Applebot-Extended',
];

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
      {
        userAgent: SEARCH_AND_AI_CRAWLERS,
        allow: '/',
        disallow: ['/api/', '/newsletter/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
