"use client";

import { JSX, useEffect, useRef } from "react";
import styles from "./ServicesComponent.module.scss";
import { useLanguage } from '../../contexts/LanguageContext';
import Button from '../Button/Button';
import {
  Sparkles,
  Workflow,
  Code2,
  Monitor,
  ShoppingCart,
  ArrowUpRight,
} from 'lucide-react';

interface Service {
  key: string;
  Icon: (props: { size?: number; className?: string }) => JSX.Element;
  title: string;
  titleAccent: string;
  description: string;
  slug: string;
}

export const Services = () => {
  const servicesRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const ref = servicesRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref) observer.observe(ref);

    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, []);

  const featured: Service = {
    key: "aiIntegration",
    Icon: ({ size = 22, className }) => <Sparkles size={size} className={className} />,
    title: t('services.aiIntegration.title'),
    titleAccent: t('services.aiIntegration.titleAccent'),
    description: t('services.aiIntegration.description'),
    slug: t('services.aiIntegration.slug'),
  };

  const others: Service[] = [
    {
      key: "businessAutomation",
      Icon: ({ size = 22, className }) => <Workflow size={size} className={className} />,
      title: t('services.businessAutomation.title'),
      titleAccent: t('services.businessAutomation.titleAccent'),
      description: t('services.businessAutomation.description'),
      slug: t('services.businessAutomation.slug'),
    },
    {
      key: "ecommerceSolutions",
      Icon: ({ size = 22, className }) => <ShoppingCart size={size} className={className} />,
      title: t('services.ecommerceSolutions.title'),
      titleAccent: t('services.ecommerceSolutions.titleAccent'),
      description: t('services.ecommerceSolutions.description'),
      slug: t('services.ecommerceSolutions.slug'),
    },
    {
      key: "webDevelopment",
      Icon: ({ size = 22, className }) => <Code2 size={size} className={className} />,
      title: t('services.webDevelopment.title'),
      titleAccent: t('services.webDevelopment.titleAccent'),
      description: t('services.webDevelopment.description'),
      slug: t('services.webDevelopment.slug'),
    },
    {
      key: "webApplications",
      Icon: ({ size = 22, className }) => <Monitor size={size} className={className} />,
      title: t('services.webApplications.title'),
      titleAccent: t('services.webApplications.titleAccent'),
      description: t('services.webApplications.description'),
      slug: t('services.webApplications.slug'),
    },
  ];

  return (
    <section ref={servicesRef} className={styles.services}>
      <div className={styles.container}>
        <p className="highlight">
          {t('services.title')}
        </p>
        <p className={styles.subtitle}>
          {t('services.subtitle')}
        </p>

        <div className={styles.grid}>
          {/* Featured card */}
          <article className={`${styles.card} ${styles.featuredCard}`}>
            <div className={styles.cardTop}>
              <div className={styles.iconWrapper}>
                <featured.Icon size={22} className={styles.serviceIcon} />
              </div>
            </div>

            <div className={styles.featuredBody}>
              <h3 className={styles.featuredTitle}>
                {featured.title}
                {featured.titleAccent && (
                  <>
                    {' '}
                    <em className={styles.titleAccent}>{featured.titleAccent}</em>
                  </>
                )}
              </h3>
              <p className={styles.featuredDescription}>{featured.description}</p>
            </div>

            <div className={styles.orbital} aria-hidden="true">
              {(() => {
                const labels = ['API', 'RAG', 'DB', 'SEO', 'IO'];
                const cx = 50;
                const cy = 50;
                const rNodePx = 116; // px radius where node labels sit (stage is 260px)
                const rLineEnd = 34; // line end radius in SVG units (line stops short of the node)
                const rCore = 11; // line start radius in SVG units (edge of the core)
                const wave = 6; // how much the connection bows sideways (SVG units)
                return (
                  <div className={styles.orbitStage}>
                    <svg
                      className={styles.orbitLines}
                      viewBox="0 0 100 100"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      {labels.map((label, i) => {
                        const angle = (i / labels.length) * Math.PI * 2 - Math.PI / 2;
                        const x1 = cx + Math.cos(angle) * rCore;
                        const y1 = cy + Math.sin(angle) * rCore;
                        const x2 = cx + Math.cos(angle) * rLineEnd;
                        const y2 = cy + Math.sin(angle) * rLineEnd;
                        // perpendicular unit vector, to bow the connection sideways
                        const px = -Math.sin(angle);
                        const py = Math.cos(angle);
                        // wavy "S" curve: bow one way at 1/3, the other way at 2/3
                        const dir = i % 2 === 0 ? 1 : -1;
                        const ax = x2 + (x1 - x2) * 0.33 + px * wave * dir;
                        const ay = y2 + (y1 - y2) * 0.33 + py * wave * dir;
                        const bx = x2 + (x1 - x2) * 0.66 - px * wave * dir;
                        const by = y2 + (y1 - y2) * 0.66 - py * wave * dir;
                        // pulse travels from the node end (x2,y2) toward the core (x1,y1)
                        const pathD = `M ${x2} ${y2} C ${ax} ${ay}, ${bx} ${by}, ${x1} ${y1}`;
                        return (
                          <g key={label}>
                            <path
                              className={styles.orbitLine}
                              d={pathD}
                              fill="none"
                            />
                            <circle
                              className={styles.orbitPulse}
                              r={0.9}
                              style={{ animationDelay: `${i * 0.6}s` }}
                            >
                              <animateMotion
                                dur="4.2s"
                                begin={`${i * 0.6}s`}
                                repeatCount="indefinite"
                                path={pathD}
                                keyPoints="0;1"
                                keyTimes="0;1"
                                calcMode="linear"
                              />
                            </circle>
                          </g>
                        );
                      })}
                    </svg>

                    <div className={styles.orbitRing} />

                    <div className={styles.orbitCore}>
                      <featured.Icon size={17} className={styles.orbitCoreIcon} />
                    </div>

                    {labels.map((label, i) => {
                      const angle = (i / labels.length) * 360 - 90;
                      // small per-label horizontal nudge (px), positive = right
                      const nudgeX = label === 'IO' ? -16 : 0;
                      return (
                        <span
                          key={label}
                          className={styles.orbitNode}
                          style={{
                            transform: `rotate(${angle}deg) translateX(${rNodePx}px) rotate(${-angle}deg) translateX(${nudgeX}px)`,
                          }}
                        >
                          {label}
                        </span>
                      );
                    })}
                  </div>
                );
              })()}
            </div>

            <a href="/projects" className={styles.featuredCta}>
              <span className={styles.featuredCtaText}>{t('services.seeCaseStudies')}</span>
              <span className={styles.featuredCtaArrow}>
                <ArrowUpRight size={15} />
              </span>
            </a>
          </article>

          {/* Other cards */}
          {others.map((service) => (
            <a key={service.key} href="/contact" className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.iconWrapper}>
                  <service.Icon size={20} className={styles.serviceIcon} />
                </div>
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDescription}>{service.description}</p>
              </div>

              <div className={styles.cardFooter}>
                <span className={styles.footerSlug}>{service.slug}</span>
                <span className={styles.footerDot} aria-hidden="true">
                  <ArrowUpRight size={13} strokeWidth={2.25} className={styles.footerDotIcon} />
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className={styles.ctaContainer}>
          <Button
            href="/about"
            label={t('services.cta')}
            variant="secondary"
          />
        </div>
      </div>
    </section>
  );
};
