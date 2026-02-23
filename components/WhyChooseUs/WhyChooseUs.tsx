'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './WhyChooseUs.module.scss';
import { useScrollAnimation } from '../../hooks/Scroll';
import { useLanguage } from '../../contexts/LanguageContext';
import { Award, Users, Briefcase, Code } from 'lucide-react';

interface Benefit {
  key: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Stat {
  key: string;
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
}

const WhyChooseUs = () => {
  const elementsRef = useScrollAnimation();
  const { t } = useLanguage();
  const [counters, setCounters] = useState<{ [key: string]: number }>({});
  const hasAnimated = useRef<{ [key: string]: boolean }>({});

  const stats: Stat[] = [
    {
      key: 'projects',
      icon: <Briefcase size={28} />,
      value: 20,
      suffix: '+',
      label: t('statsNumbers.projects.label'),
    },
    {
      key: 'experience',
      icon: <Code size={28} />,
      value: 3,
      suffix: '+',
      label: t('statsNumbers.experience.label'),
    },
    {
      key: 'technologies',
      icon: <Award size={28} />,
      value: 15,
      suffix: '+',
      label: t('statsNumbers.technologies.label'),
    },
    {
      key: 'commitment',
      icon: <Users size={28} />,
      value: 100,
      suffix: '%',
      label: t('statsNumbers.commitment.label'),
    },
  ];

  const benefits: Benefit[] = [
    {
      key: 'expertise',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" className={styles.benefitIcon}>
          <g fill="none">
            <path fill="currentColor" d="m15 22l-.416.624A.75.75 0 0 0 15.75 22zm-3-2l.416-.624a.75.75 0 0 0-.832 0zm-3 2h-.75a.75.75 0 0 0 1.166.624zM8.75 3.537l-.06.748zm1.685-.697l-.572-.486zM6.532 5.686l-.748.06zm2.154-2.154l.06-.748zM5.84 7.435l.486.57zm.697-1.684l.748-.06zm-.747 4.772l-.486.571zm0-3.046l-.486-.571zm.747 4.772l-.747-.06zm-.697-1.684l.486-.57zm2.846 3.903l.06.748zm-2.154-2.154l.747.06zm3.903 2.846l.57-.486zm-1.684-.697l-.06-.748zm4.772.747l.571.486zm-3.046 0l-.571.486zm4.772-.747l.06-.748zm-1.684.697l-.57-.486zm3.903-2.846l.748-.06zm-2.154 2.154l-.06.748zm2.846-3.903l.486.572zm-.697 1.684l-.748.06zm.747-4.772l.486-.571zm0 3.046l-.486-.571zm-.747-4.772l-.748-.06zm.697 1.684l-.486.57zm-2.846-3.903l-.06-.748zm2.154 2.154l.748.06zM13.565 2.84l.572-.486zm1.684.697l.06.748zm-1.726-.747l-.571.486zm-3.046 0l.571.486zM9 14.458l.033-.749zm6.416 6.918l-3-2l-.832 1.248l3 2zm-3.832-2l-3 2l.832 1.248l3-2zm1.368-16.1l.042.05l1.143-.972l-.043-.05zm2.357 1.009l.065-.006l-.12-1.495l-.065.006zm1.412 1.34l-.006.066l1.495.12l.006-.065zm.953 2.38l.05.043l.972-1.142l-.05-.043zm.05 1.947l-.05.042l.972 1.143l.05-.043zm-1.009 2.357l.006.065l1.495-.12l-.006-.065zm-1.34 1.412l-.066-.006l-.12 1.495l.065.006zm-2.38.953l-.043.05l1.142.972l.043-.05zm-1.947.05l-.042-.05l-1.143.972l.043.05zm-2.357-1.009l-.065.005l.12 1.496l.065-.005zm-1.412-1.34l.006-.066l-1.495-.12l-.006.065zm-.953-2.38l-.05-.043l-.972 1.142l.05.043zm-.05-1.947l.05-.042l-.972-1.143l-.05.043zm1.009-2.357l-.006-.065l-1.495.12l.006.065zm1.34-1.412l.066.006l.12-1.495l-.065-.006zm2.38-.953l.043-.05l-1.142-.972l-.043.05zm-2.314.959a2.75 2.75 0 0 0 2.315-.96l-1.143-.971a1.25 1.25 0 0 1-1.052.436zm-1.412 1.34A1.25 1.25 0 0 1 8.626 4.28l.12-1.495a2.75 2.75 0 0 0-2.962 2.962zm-.953 2.38a2.75 2.75 0 0 0 .959-2.314l-1.495.12c.032.4-.13.792-.436 1.052zm-.05 1.947a1.25 1.25 0 0 1 0-1.904l-.972-1.142a2.75 2.75 0 0 0 0 4.188zm1.009 2.357a2.75 2.75 0 0 0-.96-2.315l-.971 1.143c.306.26.468.652.436 1.052zm1.34 1.412a1.25 1.25 0 0 1-1.346-1.347l-1.495-.12a2.75 2.75 0 0 0 2.962 2.962zm4.327 1.003a1.25 1.25 0 0 1-1.904 0l-1.142.972a2.75 2.75 0 0 0 4.188 0zm3.769-2.35a1.25 1.25 0 0 1-1.347 1.346l-.12 1.496a2.75 2.75 0 0 0 2.962-2.962zm.953-2.38a2.75 2.75 0 0 0-.959 2.315l1.495-.12c-.032-.4.13-.792.436-1.052zm.05-1.946a1.25 1.25 0 0 1 0 1.904l.972 1.142a2.75 2.75 0 0 0 0-4.188zm-1.009-2.357a2.75 2.75 0 0 0 .96 2.315l.971-1.143a1.25 1.25 0 0 1-.436-1.052zm-1.34-1.412a1.25 1.25 0 0 1 1.346 1.347l1.495.12a2.75 2.75 0 0 0-2.962-2.962zm-2.38-.953a2.75 2.75 0 0 0 2.314.959l-.12-1.495a1.25 1.25 0 0 1-1.052-.436zm1.1-1.022a2.75 2.75 0 0 0-4.19 0l1.143.972a1.25 1.25 0 0 1 1.904 0zm-3.09 12.37a2.75 2.75 0 0 0-1.972-.965l-.066 1.499c.344.015.67.172.896.438zm-1.972-.965a3 3 0 0 0-.342.006l.12 1.495q.078-.006.156-.002zM9.75 22v-7.542h-1.5V22zm5.56-8.285a3 3 0 0 0-.343-.006l.066 1.499q.078-.004.156.002zm-.343-.006a2.75 2.75 0 0 0-1.973.965l1.143.972a1.25 1.25 0 0 1 .896-.438zm-.717.75V22h1.5v-7.542z"/>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m14 8l-3 3l-1-1"/>
          </g>
        </svg>
      ),
      title: t('whyChooseUs.expertise.title'),
      description: t('whyChooseUs.expertise.description'),
    },
    {
      key: 'delivery',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" className={styles.benefitIcon}>
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.59 14.37q.159.666.16 1.38a6 6 0 0 1-6 6v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.9 14.9 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.9 14.9 0 0 0-2.58 5.84m2.699 2.7q-.155.032-.311.06a15 15 0 0 1-2.448-2.448l.06-.312m-2.24 2.39a4.49 4.49 0 0 0-1.757 4.306q.341.054.696.054a4.5 4.5 0 0 0 3.61-1.812M16.5 9a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0"/>
        </svg>
      ),
      title: t('whyChooseUs.delivery.title'),
      description: t('whyChooseUs.delivery.description'),
    },
    {
      key: 'collaboration',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 28 28" className={styles.benefitIcon}>
          <path fill="currentColor" d="M14 19a2 2 0 0 1-1.839-1.212a8 8 0 0 1-.951-.288l-.017-.006A8 8 0 0 1 8.708 16a8 8 0 1 1 13.257-6.75c.039.413-.3.75-.715.75c-.414 0-.745-.337-.793-.749A6.5 6.5 0 1 0 11.496 16l.04.017q.3.123.616.217a2 2 0 0 1 3.785 1.266A2 2 0 0 1 14 19m-7-1.5h1.169a9.6 9.6 0 0 1-1.518-1.48A3 3 0 0 0 4 19v.715C4 23.433 8.21 26 14 26s10-2.708 10-6.285V19a3 3 0 0 0-3-3h-3.645a3.5 3.5 0 0 1 .11 1.5H21l.145.007A1.5 1.5 0 0 1 22.5 19v.715l-.005.161c-.14 2.52-3.569 4.624-8.495 4.624c-5.111 0-8.5-2.111-8.5-4.785V19l.007-.145A1.5 1.5 0 0 1 7 17.5M19 10a5 5 0 0 1-2.644 4.411A3.5 3.5 0 0 0 14 13.5a3.5 3.5 0 1 0 0-7a3.5 3.5 0 0 0 0 7c-.908 0-1.734.346-2.355.912a5 5 0 0 1-1.932-1.838A5 5 0 1 1 19 10"/>
        </svg>
      ),
      title: t('whyChooseUs.collaboration.title'),
      description: t('whyChooseUs.collaboration.description'),
    },
  ];

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          stats.forEach((stat) => {
            if (!hasAnimated.current[stat.key]) {
              hasAnimated.current[stat.key] = true;
              animateCounter(stat.key, stat.value);
            }
          });
        }
      });
    }, observerOptions);

    const statsElement = elementsRef.current[2];
    if (statsElement) {
      observer.observe(statsElement as Element);
    }

    return () => {
      if (statsElement) {
        observer.unobserve(statsElement as Element);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animateCounter = (key: string, target: number) => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCounters((prev) => ({ ...prev, [key]: target }));
        clearInterval(timer);
      } else {
        setCounters((prev) => ({ ...prev, [key]: Math.floor(current) }));
      }
    }, duration / steps);
  };

  return (
    <section className={styles.whyChooseUs}>
      <div className={styles.container}>
        {/* Header Section - Left Aligned */}
        <div className={styles.headerSection}>
          <section ref={el => { elementsRef.current[0] = el; }} className="fade-in-right">
            <p className={styles.highlight}>
              {t('whyChooseUs.title')}
            </p>
            <p className={styles.subtitle}>
              {t('whyChooseUs.subtitle')}
            </p>
          </section>
        </div>

        {/* Stats Section - Horizontal Bar Style */}
        <section ref={el => { elementsRef.current[2] = el; }} className="fade-in-left">
          <div className={styles.statsBar}>
            {stats.map((stat, index) => {
              return (
                <div
                  key={stat.key}
                  className={styles.statItem}
                >
                  <div className={styles.statValue}>
                    <span className={styles.statNumber}>
                      {counters[stat.key] || 0}
                    </span>
                    <span className={styles.statSuffix}>{stat.suffix}</span>
                  </div>
                  <p className={styles.statLabel}>{stat.label}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Benefits Section - Grid Layout */}
        <section ref={el => { elementsRef.current[3] = el; }} className="fade-in-left">
          <div className={styles.benefitsSection}>
            {benefits.map((benefit) => {
              return (
                <div
                  key={benefit.key}
                  className={styles.benefitCard}
                >
                  <div className={styles.benefitIconWrapper}>
                    {benefit.icon}
                  </div>
                  <div className={styles.benefitText}>
                    <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                    <p className={styles.benefitDescription}>{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
};

export default WhyChooseUs;

