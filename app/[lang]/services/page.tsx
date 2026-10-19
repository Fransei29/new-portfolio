// app/[lang]/services/page.tsx
// Server Component: los servicios, el proceso y las FAQ se arman acá y
// viajan dentro del HTML. Es la página que responde "¿qué hacés y cuánto
// cuesta trabajar con vos?", así que tiene que ser legible para un crawler que
// no ejecuta JavaScript — mismo criterio que /projects.
//
// La interacción (acordeón de FAQ, cambio de idioma, animaciones de scroll)
// vive en ServicesView, que recibe el contenido ya resuelto como prop.

import type { Metadata } from 'next';
import ServicesView from '../../../components/ServicesPage/ServicesView';
import Breadcrumbs from '../../../components/Seo/Breadcrumbs';
import { getServicesContent } from '../../../lib/servicesContent';
import { SITE_URL } from '../../../lib/site';
import { isLocale, type Locale } from '../../../lib/i18n';
import { absoluteUrl, routeMetadata } from '../../../lib/seo';

interface Props {
  params: Promise<{ lang: string }>;
}

const META = {
  en: {
    title: 'Services | Custom Software, Automation & AI Integration',
    description:
      'Custom software development, business automation, AI integration, immersive 3D websites, web applications, e-commerce and scalable architecture. Fixed scope, fixed price, and you work directly with the developer building it.',
  },
  es: {
    title: 'Servicios | Software a Medida, Automatización e IA',
    description:
      'Desarrollo de software a medida, automatización de procesos, integración de IA, sitios 3D inmersivos, aplicaciones web, e-commerce y arquitectura escalable. Alcance cerrado, precio cerrado, y trabajás directamente con quien lo construye.',
  },
};

const resolve = async (params: Props['params']): Promise<Locale> => {
  const { lang } = await params;
  return isLocale(lang) ? lang : 'en';
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolve(params);
  return routeMetadata({ locale, path: '/services', ...META[locale] });
}

export default async function ServicesPage({ params }: Props) {
  const locale = await resolve(params);
  const content = getServicesContent(locale);

  /* Un Service por bloque de la página. Sin esto el buscador tiene que deducir
     de un texto corrido qué se ofrece; con esto queda declarado, con su
     descripción y su proveedor. Solo lista lo que la página realmente muestra. */
  const serviceList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Services — Franco Seiler Software Studio',
    numberOfItems: content.services.length,
    itemListElement: content.services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.name,
        description: service.description,
        url: `${absoluteUrl(locale, '/services')}#panel-${service.key}`,
        serviceType: service.name,
        provider: {
          '@type': 'Organization',
          name: 'Franco Seiler',
          url: SITE_URL,
        },
        areaServed: ['US', 'CA', 'EU', 'AR'],
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceList) }}
      />
      <Breadcrumbs
        locale={locale}
        items={[
          { name: locale === 'es' ? 'Inicio' : 'Home', path: '' },
          { name: locale === 'es' ? 'Servicios' : 'Services', path: '/services' },
        ]}
      />
      <ServicesView initialContent={content} />
    </>
  );
}
