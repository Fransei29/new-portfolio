import { SITE_URL } from '../../lib/site';

/**
 * BreadcrumbList en JSON-LD.
 *
 * Le dice al motor dónde encaja la página dentro del sitio: sin esto, un case
 * study es una URL suelta y Google no puede mostrar la ruta
 * ("francoseiler.com › Case Studies › Acer0") debajo del resultado.
 *
 * No renderiza nada visible a propósito: la navegación de vuelta ya existe en
 * la UI de cada página, y el schema solo debe describir lo que la página
 * realmente sostiene.
 */
export interface Crumb {
  /** Texto del nivel. */
  name: string;
  /** Ruta relativa desde la raíz, con barra inicial. La última puede omitirla. */
  path: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
