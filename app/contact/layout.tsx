import type { Metadata } from 'next';

const SITE_URL = 'https://www.francoseiler.com';

export const metadata: Metadata = {
  title: 'Contact | Franco Seiler',
  description:
    'Tell us about your project. Custom software and automation for teams in the US, Canada, Europe and Latin America — you work directly with the team building your software.',
  alternates: {
    canonical: `${SITE_URL}/contact`,
    languages: {
      en: `${SITE_URL}/contact`,
      es: `${SITE_URL}/contact?lang=es`,
    },
  },
  openGraph: {
    title: 'Contact | Franco Seiler',
    description:
      'Tell us about your project. Custom software and automation for teams in the US, Canada, Europe and Latin America.',
    url: `${SITE_URL}/contact`,
    type: 'website',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
