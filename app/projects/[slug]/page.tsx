// app/projects/[slug]/page.tsx

import ProjectDetailWrapper from '../../../components/ProjectDetail/ProjectDetailWrapper';
import { projects } from '../../data/projects';
import { notFound } from 'next/navigation';
import ClientLayout from '../../../components/ClientLayout/ClientLayout';
import LoadingWrapper from '../../../components/LoadingWrapper/LoadingWrapper';

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
    <ClientLayout>
      <LoadingWrapper>
        <ProjectDetailWrapper slug={slug} />
      </LoadingWrapper>
    </ClientLayout>
  );
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}
