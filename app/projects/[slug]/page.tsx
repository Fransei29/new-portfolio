// app/projects/[slug]/page.tsx

import ProjectDetailWrapper from '../../../components/ProjectDetail/ProjectDetailWrapper';
import { projects } from '../../data/projects';
import { notFound } from 'next/navigation';
import Breadcrumbs from '../../../components/Seo/Breadcrumbs';
import ClientLayout from '../../../components/ClientLayout/ClientLayout';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

const SITE_URL = 'https://www.francoseiler.com';

interface Props {
  params: Promise<{ slug: string }>;
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
    `${project.title} — case study by Franco Seiler.`;

  const url = `${SITE_URL}/projects/${project.slug}`;

  return {
    title: `${project.title} | Case Study`,
    description,
    keywords: project.techStack,
    alternates: {
      canonical: url,
      languages: { en: url, es: `${url}?lang=es` },
    },
    openGraph: {
      title: `${project.title} | Case Study`,
      description,
      url,
      type: 'article',
      images: project.screenshots?.[0]
        ? [{ url: project.screenshots[0], alt: project.title }]
        : undefined,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
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
    author: { '@type': 'Person', name: 'Franco Seiler', url: SITE_URL },
    creator: { '@type': 'Person', name: 'Franco Seiler', url: SITE_URL },
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
        items={[
          { name: 'Home', path: '' },
          { name: 'Case Studies', path: '/projects' },
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
