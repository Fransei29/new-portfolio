// app/services/page.tsx
// Server Component: los seis servicios, el proceso y las FAQ se arman acá y
// viajan dentro del HTML. Es la página que responde "¿qué hacés y cuánto
// cuesta trabajar con vos?", así que tiene que ser legible para un crawler que
// no ejecuta JavaScript — mismo criterio que /projects.
//
// La interacción (acordeón de FAQ, cambio de idioma, animaciones de scroll)
// vive en ServicesView, que recibe el contenido ya resuelto como prop.

import type { Metadata } from 'next';
import ServicesView from '../../components/ServicesPage/ServicesView';
import Breadcrumbs from '../../components/Seo/Breadcrumbs';
import { getServicesContent } from '../../lib/servicesContent';
import { SITE_URL } from '../../lib/site';

const title = 'Services | Custom Software, Automation & AI Integration';
const description =
  'Custom software development, business automation, AI integration, web applications, e-commerce and scalable architecture. Fixed scope, fixed price, and you work directly with the developer building it.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${SITE_URL}/services`,
    languages: {
      en: `${SITE_URL}/services`,
      es: `${SITE_URL}/services?lang=es`,
      'x-default': `${SITE_URL}/services`,
    },
  },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/services`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function ServicesPage() {
  const content = getServicesContent('en');

  /* Un Service por bloque de la página. Sin esto el buscador tiene que deducir
     de un texto corrido qué se ofrece; con esto queda declarado, con su
     descripción y su proveedor. Solo lista lo que la página realmente muestra. */
  const serviceList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Services — Franco Seiler',
    numberOfItems: content.services.length,
    itemListElement: content.services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.name,
        description: service.description,
        url: `${SITE_URL}/services#${service.key}`,
        serviceType: service.name,
        provider: {
          '@type': 'Person',
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
        items={[
          { name: 'Home', path: '' },
          { name: 'Services', path: '/services' },
        ]}
      />
      <ServicesView initialContent={content} />
    </>
  );
}
