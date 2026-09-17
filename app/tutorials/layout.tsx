import type { Metadata } from 'next';
import { SITE_URL } from '../../lib/site';

/**
 * /tutorials era la única ruta del sitio sin metadatos propios: heredaba el
 * title y la description del layout raíz, así que en resultados de búsqueda
 * aparecía con el mismo texto que la home y competía con ella por la misma
 * intención.
 */
const title = 'Tutorials | Franco Seiler';
const description =
  'Hands-on tutorials on Node.js, React, Next.js, Redis, GraphQL, TypeScript and more — each one with the repository and the commands to run it locally.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${SITE_URL}/tutorials`,
    languages: {
      en: `${SITE_URL}/tutorials`,
      es: `${SITE_URL}/tutorials?lang=es`,
      'x-default': `${SITE_URL}/tutorials`,
    },
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/tutorials`,
    title,
    description,
  },
};

export default function TutorialsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
