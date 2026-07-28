'use client';

import { useEffect, useLayoutEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import ProjectDetailComponent from './ProjectDetailComponent';
import ScrollProgress from '../ScrollProgress/ScrollProgress';
import { projects } from '../../app/data/projects';

// useLayoutEffect runs synchronously before paint (client-only); falls back to useEffect on SSR
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface ProjectDetailWrapperProps {
  slug: string;
}

export default function ProjectDetailWrapper({ slug }: ProjectDetailWrapperProps) {
  const { t } = useLanguage();

  // scroll-snap-type en html/body rompe position:sticky; aplicar ANTES del primer paint
  useIsomorphicLayoutEffect(() => {
    document.documentElement.classList.add('project-detail-page');
    return () => document.documentElement.classList.remove('project-detail-page');
  }, []);
  
  const project = projects.find((proj) => proj.slug === slug);
  
  if (!project) {
    return null;
  }

  // Get translated content - if translation doesn't exist, fall back to original
  const getTranslatedField = (
    field: 'title' | 'subtitle' | 'whatIs' | 'problemSolved' | 'role' | 'engagement' | 'industry' | 'duration' | 'client'
  ): string => {
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

  // Use translated learnings array when available (locale has projects.items.<slug>.learnings)
  let learningsToShow: string[] | undefined = (project as { learnings?: string[] }).learnings;
  const learningsKey = `projects.items.${slug}.learnings`;
  const learningsTranslated = t(learningsKey);
  if (learningsTranslated && learningsTranslated !== learningsKey && !learningsTranslated.startsWith('projects.items.')) {
    try {
      const parsed = JSON.parse(learningsTranslated);
      if (Array.isArray(parsed) && parsed.length > 0) learningsToShow = parsed;
    } catch {
      // keep learningsToShow from project
    }
  }

  return (
    <>
    <ScrollProgress />
    <ProjectDetailComponent
      title={getTranslatedField('title') || project.title}
      subtitle={translatedSubtitle || project.subtitle}
      whatIs={translatedWhatIs || project.whatIs}
      problemSolved={translatedProblemSolved || project.problemSolved}
      techStack={project.techStack}
      learnings={learningsToShow}
      screenshots={project.screenshots}
      videoUrl={project.videoUrl}
      githubLink={project.githubLink}
      liveDemoLink={project.liveDemoLink}
      // Campos de case study. Los proyectos que todavía no los tienen pasan
      // undefined y el bloque no se renderiza.
      // role e industry se traducen igual que el resto del contenido: la clave
      // projects.items.<slug>.<campo> en locales/, con fallback al valor inglés
      // del archivo de datos.
      role={getTranslatedField('role') || project.role}
      engagement={getTranslatedField('engagement') || project.engagement}
      duration={getTranslatedField('duration') || project.duration}
      client={getTranslatedField('client') || project.client}
      industry={getTranslatedField('industry') || project.industry}
      year={project.year}
      outcomes={project.outcomes}
      testimonial={project.testimonial}
    />
    </>
  );
}

