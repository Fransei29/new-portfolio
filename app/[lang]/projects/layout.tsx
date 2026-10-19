import type { Metadata } from 'next';
import { isLocale } from '../../../lib/i18n';
import { routeMetadata } from '../../../lib/seo';

/**
 * La página es un Client Component (usa hooks de idioma y animaciones), y esos
 * no pueden exportar `metadata`. Este layout existe sólo para eso: sin él la
 * ruta heredaba título y descripción del layout raíz y Google la veía como un
 * duplicado de la home.
 */
const META = {
  en: {
    title: 'Case Studies | Custom Software & Automation Projects',
    description:
      'Custom software, automations and web applications built for businesses in the US, Canada, Europe and Latin America. Architecture decisions, payment integrations and the results each project delivered.',
  },
  es: {
    title: 'Casos de Estudio | Software a Medida y Automatización',
    description:
      'Software a medida, automatizaciones y aplicaciones web para empresas de Estados Unidos, Canadá, Europa y Latinoamérica. Decisiones de arquitectura, integraciones de pago y los resultados de cada proyecto.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : 'en';
  return routeMetadata({ locale, path: '/projects', ...META[locale] });
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
