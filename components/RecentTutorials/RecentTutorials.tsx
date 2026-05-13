'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './RecentTutorials.module.scss';
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
};

const ROTATION_INTERVAL_MS = 7000;
const SLIDE_DURATION_MS = 900;
const PEEK_PERCENT_DESKTOP = 7;
const PEEK_PERCENT_MOBILE = 10;

const RecentTutorials = () => {
  const [tutorials, setTutorials] = useState<Project[]>([]);
  const [offset, setOffset] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [isDesktop, setIsDesktop] = useState(true);
  const { t } = useLanguage();
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const res = await fetch('/api/tutorials');
        const data: Project[] = await res.json();
        setTutorials(data);
      } catch (error) {
        console.error('Error fetching tutorials:', error);
      }
    };

    fetchTutorials();
  }, []);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth > 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const visibleCount = 2;
  // Same rotation cadence on both desktop and mobile (mobile mirrors desktop's slide animation)
  const stepSize = 1;

  useEffect(() => {
    if (tutorials.length <= visibleCount) return;
    const interval = setInterval(() => {
      if (isHoveredRef.current) return;
      setOffset((prev) => prev + stepSize);
    }, ROTATION_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [tutorials.length, visibleCount, stepSize]);

  useEffect(() => {
    if (tutorials.length === 0) return;
    if (offset >= tutorials.length) {
      const timeout = setTimeout(() => {
        setAnimate(false);
        setOffset(0);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setAnimate(true));
        });
      }, SLIDE_DURATION_MS);
      return () => clearTimeout(timeout);
    }
  }, [offset, tutorials.length]);

  // Desktop carousel
  const trackItems = tutorials.length > 0 ? [...tutorials, ...tutorials] : [];
  const peekPercent = PEEK_PERCENT_DESKTOP;
  const stepPercent = (100 - peekPercent) / visibleCount;

  // Mobile: two stacked rows, each a mini-carousel with a peek of the next item.
  const mobilePeek = PEEK_PERCENT_MOBILE;
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
       <Button href="/tutorials" label={t('projects.goToTutorials')} variant="secondary" />
      </div>
    </section>
  );
};

export default RecentTutorials;
