const SITE_URL = 'https://www.francoseiler.com';

/**
 * Datos estructurados de sitio. Van en el layout, así que aplican a todas las
 * rutas.
 *
 * Esto es lo que leen los motores de respuesta (ChatGPT, Perplexity, Google
 * AI Overviews) para saber QUIÉN hace QUÉ y DÓNDE. Sin esto un modelo tiene que
 * inferirlo del texto suelto de la página, y suele equivocarse o directamente
 * no citar. `areaServed` y `knowsAbout` son los dos campos que más pesan para
 * que aparezca en respuestas del tipo "desarrollador de software en X que hace Y".
 *
 * @id + referencias cruzadas: sin ellos cada bloque se lee como una entidad
 * suelta. Con ellos, Organization y ProfessionalService son la misma entidad,
 * y la Person queda solo como fundador (que es lo que es).
 */
const orgId = `${SITE_URL}/#studio`;
const personId = `${SITE_URL}/#franco`;
const serviceId = `${SITE_URL}/#service`;

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': orgId,
      name: 'Franco Seiler',
      url: SITE_URL,
      description:
        'Software studio building custom platforms and automations for businesses whose operations have outgrown spreadsheets and manual processes.',
      founder: { '@id': personId },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Córdoba',
        addressRegion: 'Córdoba',
        addressCountry: 'AR',
      },
      availableLanguage: ['English', 'Spanish'],
      knowsAbout: [
        'Custom software development',
        'Business process automation',
        'Next.js',
        'React',
        'TypeScript',
        'Node.js',
        'Backend architecture',
        'Payment integrations',
        'Multi-tenancy',
        'API design',
      ],
      /* Deben ser las URLs reales: sameAs es lo que usan los motores para
         confirmar que el sitio y los perfiles son la misma entidad. Una URL
         rota acá rompe esa asociación en vez de reforzarla. */
      sameAs: [
        'https://linkedin.com/in/francoseiler',
        'https://github.com/Fransei29',
      ],
    },
    {
      /* La persona sigue existiendo en el grafo, pero como fundador del
         estudio, no como el proveedor del servicio. */
      '@type': 'Person',
      '@id': personId,
      name: 'Franco Seiler',
      url: SITE_URL,
      worksFor: { '@id': orgId },
      sameAs: [
        'https://linkedin.com/in/francoseiler',
        'https://github.com/Fransei29',
      ],
    },
    {
      '@type': 'ProfessionalService',
      '@id': serviceId,
      name: 'Franco Seiler — Software Studio',
      url: SITE_URL,
      description:
        'Custom software and automations for teams whose operations have outgrown spreadsheets and manual processes. You work directly with the team building your software.',
      founder: { '@id': personId },
      provider: { '@id': orgId },
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Córdoba',
        addressRegion: 'Córdoba',
        addressCountry: 'AR',
      },
      /* El negocio es remoto: la dirección dice desde dónde, areaServed dice
         hasta dónde. Sin este segundo campo los motores asumen alcance local y
         no lo ofrecen a búsquedas de US/Canadá/Europa. */
      areaServed: [
        { '@type': 'Country', name: 'United States' },
        { '@type': 'Country', name: 'Canada' },
        { '@type': 'Country', name: 'Argentina' },
        { '@type': 'Place', name: 'Europe' },
        { '@type': 'Place', name: 'Latin America' },
      ],
      availableLanguage: ['English', 'Spanish'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services',
        itemListElement: [
          'Custom web application development',
          'Business process automation',
          'Payment and billing integrations',
          'AI integration',
          'E-commerce development',
        ].map((service) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: service },
        })),
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Franco Seiler',
      publisher: { '@id': orgId },
      inLanguage: ['en', 'es'],
    },
  ],
};

export default function SiteJsonLd() {
  return (
    <script
      type="application/ld+json"
      // El JSON se arma acá, no viene de input de usuario: no hay superficie de
      // inyección. dangerouslySetInnerHTML es la vía estándar para ld+json.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
