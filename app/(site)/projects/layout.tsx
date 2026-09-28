import type { Metadata } from 'next';

const SITE_URL = 'https://www.francoseiler.com';

/**
 * La página es un Client Component (usa hooks de idioma y animaciones), y esos
 * no pueden exportar `metadata`. Este layout existe sólo para eso: sin él la
 * ruta heredaba título y descripción del layout raíz y Google la veía como un
 * duplicado de la home.
 */
export const metadata: Metadata = {
  title: 'Case Studies | Franco Seiler',
  description:
    'Custom software, automations and web applications built for businesses in the US, Canada, Europe and Latin America. Architecture decisions, payment integrations and the results each project delivered.',
  alternates: {
    canonical: `${SITE_URL}/projects`,
    languages: {
      en: `${SITE_URL}/projects`,
      es: `${SITE_URL}/projects?lang=es`,
    },
  },
  openGraph: {
    title: 'Case Studies | Franco Seiler',
    description:
      'Custom software, automations and web applications built for businesses in the US, Canada, Europe and Latin America.',
    url: `${SITE_URL}/projects`,
    type: 'website',
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
