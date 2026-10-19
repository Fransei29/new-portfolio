// app/projects/[slug]/page.tsx

import ProjectDetailWrapper from '../../../../components/ProjectDetail/ProjectDetailWrapper';
import { projects } from '../../../data/projects';
import { notFound } from 'next/navigation';
import Breadcrumbs from '../../../../components/Seo/Breadcrumbs';
import ClientLayout from '../../../../components/ClientLayout/ClientLayout';
import type { Metadata } from 'next';
import { OG_IMAGE } from '../../../../lib/site';
import { isLocale, type Locale } from '../../../../lib/i18n';
import { absoluteUrl, routeMetadata } from '../../../../lib/seo';
import esProjects from '../../../../locales/es/projects.json';

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

const findProject = (slug: string) =>
  projects.find((proj) => proj.slug?.toLowerCase() === slug?.trim().toLowerCase());

/** Título, subtítulo y whatIs en el idioma de la página: el español sale de
 *  locales/es (projects.items.<slug>), con el inglés del archivo de datos como
 *  fallback, igual que hace ProjectDetailWrapper con el cuerpo. */
const localized = (project: (typeof projects)[number], locale: Locale) => {
  const tr: Partial<Record<'title' | 'subtitle' | 'whatIs', string>> =
    locale === 'es' ? (esProjects.projects.items as Record<string, any>)[project.slug ?? ''] ?? {} : {};
  return {
    title: tr.title ?? project.title,
    subtitle: tr.subtitle ?? project.subtitle,
    whatIs: tr.whatIs ?? project.whatIs,
  };
};

/**
 * Sin esto los ~22 case studies compartían el título y la descripción del
 * layout raíz, o sea que Google los veía como 22 duplicados de la home. Son las
 * páginas con contenido más específico del sitio y las que mejor pueden
 * posicionar por búsquedas concretas ("integración Mercado Pago Next.js"), así
 * que cada una necesita su propio título y su propia descripción.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lang } = await params;
  const locale = isLocale(lang) ? lang : 'en';
  const project = findProject(slug);

  if (!project) return { title: 'Case study not found | Franco Seiler' };

  const { title: name, subtitle, whatIs } = localized(project, locale);
  const label = locale === 'es' ? 'Caso de estudio' : 'Case Study';

  // El subtítulo es la síntesis mejor escrita que hay del proyecto; whatIs es
  // el fallback, recortado porque suele ser varios párrafos.
  const description =
    subtitle ??
    whatIs?.split('\n')[0]?.slice(0, 300) ??
    `${name} — ${label} · Franco Seiler Software Studio.`;

  // El subtítulo dice qué es el proyecto ("HOA Financial Management Platform"),
  // que es lo que alguien busca; el nombre del cliente solo no lo busca nadie.
  // Si no entra en ~65 caracteres se corta en el resultado, así que queda el
  // título corto.
  const withSubtitle = subtitle && `${name}: ${subtitle} | ${label}`;
  const title = withSubtitle && withSubtitle.length <= 65 ? withSubtitle : `${name} | ${label}`;

  // Todos los case studies están traducidos en locales/es, así que cada idioma
  // es su propia canonical y las dos versiones se declaran como alternates.
  return {
    ...routeMetadata({
      locale,
      path: `/projects/${project.slug}`,
      title,
      description,
      ogType: 'article',
      images: project.screenshots?.[0] ? [{ url: project.screenshots[0], alt: name }] : [OG_IMAGE],
    }),
    keywords: project.techStack,
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
  const { title: name, subtitle, whatIs } = localized(project, locale);
  const url = absoluteUrl(locale, `/projects/${project.slug}`);
  const projectJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name,
    headline: name,
    description: subtitle ?? whatIs?.split('\n')[0],
    url,
    inLanguage: locale,
    author: { '@type': 'Organization', name: 'Franco Seiler', url: absoluteUrl('en', '/') },
    creator: { '@type': 'Organization', name: 'Franco Seiler', url: absoluteUrl('en', '/') },
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
          { name, path: `/projects/${project.slug}` },
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
