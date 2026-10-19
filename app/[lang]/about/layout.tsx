import type { Metadata } from 'next';
import { isLocale } from '../../../lib/i18n';
import { routeMetadata } from '../../../lib/seo';

const META = {
  en: {
    title: 'About | Software Studio in Córdoba, Argentina',
    description:
      'Software studio based in Córdoba, Argentina, working with teams across the US, Canada and Europe. We take projects end to end — you work directly with the team building your software.',
  },
  es: {
    title: 'Nosotros | Estudio de Software en Córdoba, Argentina',
    description:
      'Estudio de software con base en Córdoba, Argentina, que trabaja con equipos de Estados Unidos, Canadá y Europa. Tomamos proyectos de punta a punta: trabajás directamente con el equipo que construye tu software.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : 'en';
  return routeMetadata({ locale, path: '/about', ...META[locale] });
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
