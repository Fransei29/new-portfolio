// app/projects/[slug]/page.tsx

import ProjectDetailWrapper from '../../../../components/ProjectDetail/ProjectDetailWrapper';
import { projects } from '../../../data/projects';
import { notFound } from 'next/navigation';
import Breadcrumbs from '../../../../components/Seo/Breadcrumbs';
import ClientLayout from '../../../../components/ClientLayout/ClientLayout';
import type { Metadata } from 'next';
import { OG_IMAGE, SITE_URL } from '../../../../lib/site';
import { isLocale } from '../../../../lib/i18n';

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

const findProject = (slug: string) =>
  projects.find((proj) => proj.slug?.toLowerCase() === slug?.trim().toLowerCase());

/**
 * Sin esto los ~22 case studies compartían el título y la descripción del
 * layout raíz, o sea que Google los veía como 22 duplicados de la home. Son las
 * páginas con contenido más específico del sitio y las que mejor pueden
 * posicionar por búsquedas concretas ("integración Mercado Pago Next.js"), así
 * que cada una necesita su propio título y su propia descripción.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);

  if (!project) return { title: 'Case study not found | Franco Seiler' };

  // El subtítulo es la síntesis mejor escrita que hay del proyecto; whatIs es
  // el fallback, recortado porque suele ser varios párrafos.
  const description =
    project.subtitle ??
    project.whatIs?.split('\n')[0]?.slice(0, 300) ??
    `${project.title} — case study by Franco Seiler Software Studio.`;

  // El cuerpo de los case studies está solo en inglés: /es/projects/x existe
  // para navegar con la interfaz en español, pero su canonical es la versión
  // inglesa y no se declara como traducción (sería contenido duplicado).
  // Cuando un case study se traduzca, pasa a usar routeMetadata como el resto.
  const url = `${SITE_URL}/projects/${project.slug}`;

  // El subtítulo dice qué es el proyecto ("HOA Financial Management Platform"),
  // que es lo que alguien busca; el nombre del cliente solo no lo busca nadie.
  // Si no entra en ~65 caracteres se corta en el resultado, así que queda el
  // título corto.
  const withSubtitle = project.subtitle && `${project.title}: ${project.subtitle} | Case Study`;
  const title =
    withSubtitle && withSubtitle.length <= 65 ? withSubtitle : `${project.title} | Case Study`;

  return {
    title,
    description,
    keywords: project.techStack,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      images: project.screenshots?.[0]
        ? [{ url: project.screenshots[0], alt: project.title }]
        : [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [project.screenshots?.[0] ?? OG_IMAGE.url],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug, lang } = await params;
  const locale = isLocale(lang) ? lang : 'en';
  const normalizedSlug = slug?.trim().toLowerCase();

  const project = projects.find((proj) => proj.slug?.toLowerCase() === normalizedSlug);

  if (!project) return notFound();

  /* Schema por case study. Es lo que permite que un motor de respuesta cite el
     proyecto como trabajo concreto ("quién construyó X") en vez de tratar la
     página como texto suelto. `about` con el stack es lo que conecta el
     proyecto con las tecnologías por las que puede aparecer. */
  const projectJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    headline: project.title,
    description: project.subtitle ?? project.whatIs?.split('\n')[0],
    url: `${SITE_URL}/projects/${project.slug}`,
    author: { '@type': 'Organization', name: 'Franco Seiler', url: SITE_URL },
    creator: { '@type': 'Organization', name: 'Franco Seiler', url: SITE_URL },
    ...(project.year ? { dateCreated: project.year } : {}),
    ...(project.industry ? { genre: project.industry } : {}),
    ...(project.techStack?.length
      ? { about: project.techStack.map((tech) => ({ '@type': 'Thing', name: tech })) }
      : {}),
    ...(project.screenshots?.[0] ? { image: project.screenshots[0] } : {}),
  };

  return (
    <>
      {/* Disable scroll-snap server-side so position:sticky works from the first paint */}
      <style>{`html, html body { scroll-snap-type: none !important; }`}</style>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <Breadcrumbs
        locale={locale}
        items={[
          { name: locale === 'es' ? 'Inicio' : 'Home', path: '' },
          { name: locale === 'es' ? 'Casos de estudio' : 'Case Studies', path: '/projects' },
          { name: project.title, path: `/projects/${project.slug}` },
        ]}
      />
      <ClientLayout>
        <ProjectDetailWrapper slug={slug} />
      </ClientLayout>
    </>
  );
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}
