// app/projects/[slug]/page.tsx

import ProjectDetailWrapper from '../../../components/ProjectDetail/ProjectDetailWrapper';
import { projects } from '../../data/projects';
import { notFound } from 'next/navigation';
import ClientLayout from '../../../components/ClientLayout/ClientLayout';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const normalizedSlug = slug?.trim().toLowerCase();

  const project = projects.find((proj) => proj.slug?.toLowerCase() === normalizedSlug);

  if (!project) return notFound();

  return (
    <>
      {/* Disable scroll-snap server-side so position:sticky works from the first paint */}
      <style>{`html, html body { scroll-snap-type: none !important; }`}</style>
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
