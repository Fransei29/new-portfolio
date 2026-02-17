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
    // If translation exists and is different from the key (meaning it was found), use it
    // Check that it doesn't start with 'projects.items.' which means it wasn't found
    if (translated && translated !== key && !translated.startsWith('projects.items.') && translated.length > 0) {
      return translated;
    }
    // Otherwise, return the original English value from the project data
    return (project as any)[field] || '';
  };

  const translatedSubtitle = getTranslatedField('subtitle');
  const translatedWhatIs = getTranslatedField('whatIs');
  const translatedProblemSolved = getTranslatedField('problemSolved');

  return (
    <ProjectDetailComponent
      title={project.title}
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

