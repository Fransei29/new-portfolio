'use client';

import { useLanguage } from '../../contexts/LanguageContext';
import ProjectDetailComponent from './ProjectDetailComponent';
import { projects } from '../../app/data/projects';

interface ProjectDetailWrapperProps {
  slug: string;
}

export default function ProjectDetailWrapper({ slug }: ProjectDetailWrapperProps) {
  const { t } = useLanguage();
  
  const project = projects.find((proj) => proj.slug === slug);
  
  if (!project) {
    return null;
  }

  // Get translated content - if translation doesn't exist, fall back to original
  const getTranslatedField = (field: 'title' | 'subtitle' | 'whatIs' | 'problemSolved'): string => {
    const key = `projects.items.${slug}.${field}`;
    const translated = t(key);
    // If translation exists and is different from the key, use it
    if (translated && translated !== key) {
      return translated;
    }
    // Otherwise, return the original English value
    return (project as any)[field] || '';
  };

  const translatedTitle = getTranslatedField('title');
  const translatedSubtitle = getTranslatedField('subtitle');
  const translatedWhatIs = getTranslatedField('whatIs');
  const translatedProblemSolved = getTranslatedField('problemSolved');

  return (
    <ProjectDetailComponent
      title={translatedTitle || project.title}
      subtitle={translatedSubtitle || project.subtitle}
      whatIs={translatedWhatIs || project.whatIs}
      problemSolved={translatedProblemSolved || project.problemSolved}
      techStack={project.techStack}
      screenshots={project.screenshots}
      videoUrl={project.videoUrl}
      githubLink={project.githubLink}
      liveDemoLink={project.liveDemoLink}
    />
  );
}

