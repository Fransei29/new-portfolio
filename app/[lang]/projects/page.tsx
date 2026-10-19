// app/projects/page.tsx
// Server Component: la lista de case studies se arma acá y viaja dentro del
// HTML. Antes esta página era 'use client' y pedía /api/projects dentro de un
// useEffect, así que el HTML servido no traía ni un case study — para cualquier
// crawler que no ejecuta JavaScript la página estaba vacía.
//
// La interacción (tabs, filtros, animaciones) sigue en ProjectsView, que recibe
// la lista ya resuelta como prop.

import ProjectsView from '../../../components/ProjectsView/ProjectsView';
import Breadcrumbs from '../../../components/Seo/Breadcrumbs';
import { getProjectCards } from '../../../lib/projectCards';
import { isLocale } from '../../../lib/i18n';
import { absoluteUrl } from '../../../lib/seo';

export default async function ProjectsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : 'en';
  const cards = getProjectCards(locale);

  /* ItemList del índice. Sin esto la página es una grilla de tarjetas que el
     motor tiene que interpretar visualmente; con esto declara explícitamente
     qué case studies contiene y en qué orden. Solo lista lo que la página
     realmente muestra. */
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Case Studies — Franco Seiler',
    numberOfItems: cards.length,
    itemListElement: cards.map((card, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: card.title,
      url: absoluteUrl(locale, `/projects/${card.slug}`),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <Breadcrumbs
        locale={locale}
        items={[
          { name: locale === 'es' ? 'Inicio' : 'Home', path: '' },
          { name: locale === 'es' ? 'Casos de estudio' : 'Case Studies', path: '/projects' },
        ]}
      />
      <ProjectsView initialProjects={cards} />
    </>
  );
}
