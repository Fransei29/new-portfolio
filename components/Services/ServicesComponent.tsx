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
              <div className={styles.orbitRing} />
              <div className={`${styles.orbitRing} ${styles.orbitRingOuter}`} />
              <div className={styles.orbitCenter}>
                <span>α</span>
              </div>
              <span className={`${styles.orbitNode} ${styles.orbitNodeApi}`}>API</span>
              <span className={`${styles.orbitNode} ${styles.orbitNodeRag}`}>RAG</span>
              <span className={`${styles.orbitNode} ${styles.orbitNodeDb}`}>DB</span>
              <span className={`${styles.orbitNode} ${styles.orbitNodeGpt}`}>GPT</span>
              <span className={`${styles.orbitNode} ${styles.orbitNodeSeo}`}>SEO</span>
              <span className={`${styles.orbitNode} ${styles.orbitNodeIo}`}>IO</span>
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
            <article key={service.key} className={styles.card}>
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
            </article>
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
