'use client';

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
}

export default function CaseStudyTabs({
  tabs,
  activeId,
  onChange,
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

  // Lleva la pestaña activa a la vista moviendo solo la fila de tabs. Con
  // scrollIntoView también se movía la página: si los tabs quedaban debajo del
  // primer pantallazo, al cargar te bajaba hasta ellos.
  useEffect(() => {
    const list = listRef.current;
    const active = list?.querySelectorAll('button')[activeIndex] as HTMLElement | undefined;
    if (!list || !active) return;
    const left = active.offsetLeft - list.offsetLeft;
    const right = left + active.offsetWidth;
    if (left < list.scrollLeft) list.scrollLeft = left;
    else if (right > list.scrollLeft + list.clientWidth) list.scrollLeft = right - list.clientWidth;
  }, [activeIndex]);

  return (
    <div className={styles.wrap}>
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
