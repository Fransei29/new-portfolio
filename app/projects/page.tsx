// app/projects/page.tsx
// Server Component: la lista de case studies se arma acá y viaja dentro del
// HTML. Antes esta página era 'use client' y pedía /api/projects dentro de un
// useEffect, así que el HTML servido no traía ni un case study — para cualquier
// crawler que no ejecuta JavaScript la página estaba vacía.
//
// La interacción (tabs, filtros, animaciones) sigue en ProjectsView, que recibe
// la lista ya resuelta como prop.

import ProjectsView from '../../components/ProjectsView/ProjectsView';
import Breadcrumbs from '../../components/Seo/Breadcrumbs';
import { getProjectCards } from '../../lib/projectCards';
import { SITE_URL } from '../../lib/site';

export default function ProjectsPage() {
  const cards = getProjectCards('en');

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
      url: `${SITE_URL}/projects/${card.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <Breadcrumbs
        items={[
          { name: 'Home', path: '' },
          { name: 'Case Studies', path: '/projects' },
        ]}
      />
      <ProjectsView initialProjects={cards} />
    </>
  );
}
