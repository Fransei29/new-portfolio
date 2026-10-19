import type { Metadata } from 'next';
import { isLocale } from '../../../lib/i18n';
import { routeMetadata } from '../../../lib/seo';

/**
 * /tutorials era la única ruta del sitio sin metadatos propios: heredaba el
 * title y la description del layout raíz, así que en resultados de búsqueda
 * aparecía con el mismo texto que la home y competía con ella por la misma
 * intención.
 */
const META = {
  en: {
    title: 'Tutorials | Franco Seiler',
    description:
      'Hands-on tutorials on Node.js, React, Next.js, Redis, GraphQL, TypeScript and more — each one with the repository and the commands to run it locally.',
  },
  es: {
    title: 'Tutoriales | Franco Seiler',
    description:
      'Tutoriales prácticos de Node.js, React, Next.js, Redis, GraphQL, TypeScript y más, cada uno con su repositorio y los comandos para correrlo en local.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : 'en';
  return routeMetadata({ locale, path: '/tutorials', ...META[locale] });
}

export default function TutorialsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
