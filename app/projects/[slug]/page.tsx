// app/projects/[slug]/page.tsx

import ProjectDetailComponent from '../../../components/ProjectDetail/ProjectDetailComponent';
import { projects } from '../../data/projects';
import { notFound } from 'next/navigation';
import ClientLayout from '../../../components/ClientLayout/ClientLayout';
import LoadingWrapper from '../../../components/LoadingWrapper/LoadingWrapper';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  const project = projects.find((proj) => proj.slug === slug);

  if (!project) return notFound();

  return (
    <ClientLayout>
      <LoadingWrapper>
        <ProjectDetailComponent
          title={project.title}
          subtitle={project.subtitle}
          whatIs={project.whatIs}
          problemSolved={project.problemSolved}
          techStack={project.techStack}
          learnings={project.learnings}
          screenshots={project.screenshots}
          githubLink={project.githubLink}
          liveDemoLink={project.liveDemoLink}
        />
      </LoadingWrapper>
    </ClientLayout>
  );
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}
