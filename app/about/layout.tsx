import type { Metadata } from 'next';

const SITE_URL = 'https://www.francoseiler.com';

export const metadata: Metadata = {
  title: 'About | Franco Seiler',
  description:
    'Software studio based in Córdoba, Argentina, working with teams across the US, Canada and Europe. We take projects end to end — you work directly with the team building your software.',
  alternates: {
    canonical: `${SITE_URL}/about`,
    languages: {
      en: `${SITE_URL}/about`,
      es: `${SITE_URL}/about?lang=es`,
    },
  },
  openGraph: {
    title: 'About | Franco Seiler',
    description:
      'Software studio based in Córdoba, Argentina, working with teams across the US, Canada and Europe.',
    url: `${SITE_URL}/about`,
    type: 'website',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
