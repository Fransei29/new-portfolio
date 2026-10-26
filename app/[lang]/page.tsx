// app/page.tsx
// Server Component a propósito: la home es la página más importante del sitio y
// necesita su propio title, description y canonical. Un componente cliente no
// puede exportar `metadata`, así que la UI (que sí es interactiva: scroll,
// idioma, animaciones) vive en components/HomeContent y esta capa solo declara
// los metadatos.
//
// Sin esto la home heredaba el title y la description del layout raíz, que es
// exactamente lo que prohíbe la regla de "metadatos únicos por ruta": la página
// que más tiene para decir era la única sin canonical propio.

import type { Metadata } from 'next';
import HomeContent from '../../components/HomeContent/HomeContent';
import SystemHero from '../../components/SystemHero/SystemHero';
import { isLocale } from '../../lib/i18n';
import { routeMetadata } from '../../lib/seo';
import { getHomeFaq } from '../../lib/homeFaq';

const META = {
  en: {
    title: 'Franco Seiler | Custom Software & Business Automation',
    description:
      'Software studio building custom platforms and automations for teams whose operations have outgrown spreadsheets. You work directly with the team building your software.',
  },
  es: {
    title: 'Franco Seiler | Software a Medida y Automatización',
    description:
      'Estudio de software que construye plataformas a medida y automatizaciones para equipos cuyas operaciones ya superaron las planillas. Trabajás directamente con el equipo que construye tu software.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : 'en';
  return routeMetadata({ locale, path: '/', ...META[locale] });
}

// Lo que necesita el hero 3D, pedido desde el HTML: así baja en paralelo con el
// resto de la página y no recién cuando el hero se hidrata (si no, el panda
// aparecía bastante después que todo lo demás). Van como fetch con CORS porque
// GLTFLoader y DRACOLoader los piden con fetch().
const PRELOAD = ['/hero3d/system.glb', '/hero3d/panda.glb', '/draco/draco_wasm_wrapper.js', '/draco/draco_decoder.wasm'];

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : 'en';
  const faq = getHomeFaq(locale);

  // Las mismas preguntas que muestra la sección, para que Google y los
  // asistentes de IA puedan citar las respuestas tal cual.
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <>
      {faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      {PRELOAD.map((href) => (
        <link key={href} rel="preload" as="fetch" href={href} crossOrigin="anonymous" />
      ))}
      {/* Con CORS, como la pide el TextureLoader (y el póster): una sola descarga. */}
      <link rel="preload" as="image" href="/hero3d/screen.webp" crossOrigin="anonymous" />
      <HomeContent hero={<SystemHero />} panda3d faq={faq} />
    </>
  );
}
