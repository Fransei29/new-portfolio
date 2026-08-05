'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useCallback, useEffect, useRef } from 'react';
import styles from './CaseStudyTabs.module.scss';

export interface CaseStudyTab {
  id: string;
  label: string;
}

interface Props {
  tabs: CaseStudyTab[];
  activeId: string;
  onChange: (id: string) => void;
  backLabel: string;
  projectTitle: string;
}

export default function CaseStudyTabs({
  tabs,
  activeId,
  onChange,
  backLabel,
  projectTitle,
}: Props) {
  const listRef = useRef<HTMLDivElement>(null);
  const activeIndex = tabs.findIndex((tab) => tab.id === activeId);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      const delta =
        event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
      if (delta === 0) return;
      event.preventDefault();
      const next = (activeIndex + delta + tabs.length) % tabs.length;
      onChange(tabs[next].id);
      const buttons = listRef.current?.querySelectorAll('button');
      buttons?.[next]?.focus();
    },
    [activeIndex, tabs, onChange]
  );

  useEffect(() => {
    const buttons = listRef.current?.querySelectorAll('button');
    const active = buttons?.[activeIndex] as HTMLElement | undefined;
    active?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [activeIndex]);

  return (
    <div className={styles.wrap}>
      {/* Volver y contexto viven acá adentro: son navegación, igual que los
          tabs, y ocupaban 217px de aire muerto arriba de la página. */}
      <Link
        href="/projects"
        className={styles.back}
        aria-label={`${backLabel} — ${projectTitle}`}
        title={backLabel}
      >
        <ArrowLeft size={16} aria-hidden />
      </Link>

      <div className={styles.list} role="tablist" ref={listRef}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
              onClick={() => onChange(tab.id)}
              onKeyDown={handleKeyDown}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
