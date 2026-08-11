import type { Metadata } from 'next';

const SITE_URL = 'https://www.francoseiler.com';

export const metadata: Metadata = {
  title: 'About | Franco Seiler',
  description:
    'Full-stack developer based in Córdoba, Argentina, working with teams across the US, Canada and Europe. I lead projects end to end — you work directly with the person building your software.',
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
      'Full-stack developer based in Córdoba, Argentina, working with teams across the US, Canada and Europe.',
    url: `${SITE_URL}/about`,
    type: 'profile',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
