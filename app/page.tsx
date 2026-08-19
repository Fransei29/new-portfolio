// app/page.tsx
// Server Component a propósito: la home es la página más importante del sitio y
// necesita su propio title, description y canonical. Un componente cliente no
// puede exportar `metadata`, así que la UI (que sí es interactiva: scroll,
// idioma, animaciones) vive en components/HomeContent y esta capa solo declara
// los metadatos.
//
// Sin esto la home heredaba el title y la description del layout raíz, que es
// exactamente lo que prohíbe la regla de "metadatos únicos por ruta": la página
// que más tiene para decir era la única sin canonical propio.

import type { Metadata } from 'next';
import HomeContent from '../components/HomeContent/HomeContent';
import { SITE_URL } from '../lib/site';

const title = 'Franco Seiler | Custom Software & Business Automation';
const description =
  'Full-stack developer building custom software and automations for teams whose operations have outgrown spreadsheets. You work directly with the developer building your software.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: SITE_URL,
    languages: {
      en: SITE_URL,
      es: `${SITE_URL}?lang=es`,
      'x-default': SITE_URL,
    },
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title,
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function Home() {
  return <HomeContent />;
}
