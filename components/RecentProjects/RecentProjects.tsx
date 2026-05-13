'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './RecentProjects.module.scss';
import ProjectCard from '../ProjectCard/ProjectCard';
import Button from '../Button/Button';
import { useLanguage } from '../../contexts/LanguageContext';

type Project = {
  title: string;
  isTutorial?: boolean;
  description: string;
  link1?: string;
  link2?: string | null;
  link3?: string | null;
  previewImage?: string;
  logs?: string[];
  featured?: boolean;
};

const ROTATION_INTERVAL_MS = 7000;
const SLIDE_DURATION_MS = 900;
const PEEK_PERCENT_DESKTOP = 7;
const PEEK_PERCENT_MOBILE = 10;

const RecentProjects = () => {
  const [featured, setFeatured] = useState<Project[]>([]);
  const [offset, setOffset] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [isDesktop, setIsDesktop] = useState(true);
  const { t } = useLanguage();
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data: Project[] = await res.json();
        setFeatured(data.filter((p) => p.featured));
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth > 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const visibleCount = 2;
  // Same rotation cadence on both desktop and mobile: one step per cycle (mobile mirrors desktop)
  const stepSize = 1;

  useEffect(() => {
    if (featured.length <= visibleCount) return;
    const interval = setInterval(() => {
      if (isHoveredRef.current) return;
      setOffset((prev) => prev + stepSize);
    }, ROTATION_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [featured.length, visibleCount, stepSize]);

  // Once the track has slid past the original set, snap it back without animation
  useEffect(() => {
    if (featured.length === 0) return;
    if (offset >= featured.length) {
      const timeout = setTimeout(() => {
        setAnimate(false);
        setOffset(0);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setAnimate(true));
        });
      }, SLIDE_DURATION_MS);
      return () => clearTimeout(timeout);
    }
  }, [offset, featured.length]);

  // Desktop carousel: 2x featured to allow seamless wrap-around (track slides one slide-width per rotation)
  const trackItems = featured.length > 0 ? [...featured, ...featured] : [];
  const peekPercent = PEEK_PERCENT_DESKTOP;
  const stepPercent = (100 - peekPercent) / visibleCount;

  // Mobile: two stacked rows, each showing one card with a peek of the next.
  // Bottom row is offset by 1 so it shows the next-up project under the top row.
  const mobilePeek = PEEK_PERCENT_MOBILE;
  // Each row shows one card per slide; step equals the slide-width (in % of the track)
  const mobileStepPercent = 100 - mobilePeek;

  const transition = animate
    ? `transform ${SLIDE_DURATION_MS}ms cubic-bezier(0.65, 0.05, 0.36, 1)`
    : 'none';

  return (
    <section className={styles.recentProjects}>
      {/* Desktop carousel (hidden on mobile via CSS) */}
      <div
        className={styles.viewport}
        onMouseEnter={() => { isHoveredRef.current = true; }}
        onMouseLeave={() => { isHoveredRef.current = false; }}
        style={{
          '--visible-count': visibleCount,
          '--peek': `${peekPercent}%`,
        } as React.CSSProperties}
      >
        <div
          className={styles.track}
          style={{
            transform: `translateX(-${offset * stepPercent}%)`,
            transition,
          }}
        >
          {trackItems.map((project, i) => (
            <div key={`${project.title}-${i}`} className={styles.slide}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile stack: two horizontal mini-carousels (hidden on desktop via CSS) */}
      <div
        className={styles.mobileStack}
        onMouseEnter={() => { isHoveredRef.current = true; }}
        onMouseLeave={() => { isHoveredRef.current = false; }}
        style={{ '--peek': `${mobilePeek}%` } as React.CSSProperties}
      >
        {[0, 1].map((rowOffset) => (
          <div className={styles.mobileViewport} key={`row-${rowOffset}`}>
            <div
              className={styles.mobileTrack}
              style={{
                transform: `translateX(-${(offset + rowOffset) * mobileStepPercent}%)`,
                transition,
              }}
            >
              {trackItems.map((project, i) => (
                <div key={`${project.title}-${i}-${rowOffset}`} className={styles.mobileSlide}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.projectsButtonContainer}>
       <Button href="/projects" label={t('projects.goToProjects')} variant="secondary" />
      </div>
    </section>
  );
};

export default RecentProjects;
