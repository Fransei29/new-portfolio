import type { Metadata } from 'next';
import { isLocale } from '../../../lib/i18n';
import { routeMetadata } from '../../../lib/seo';

const META = {
  en: {
    title: 'Contact | Start Your Custom Software Project',
    description:
      'Tell us about your project. Custom software and automation for teams in the US, Canada, Europe and Latin America — you work directly with the team building your software.',
  },
  es: {
    title: 'Contacto | Empezá tu Proyecto de Software a Medida',
    description:
      'Contanos tu proyecto. Software a medida y automatización para equipos de Estados Unidos, Canadá, Europa y Latinoamérica: trabajás directamente con el equipo que construye tu software.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : 'en';
  return routeMetadata({ locale, path: '/contact', ...META[locale] });
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
