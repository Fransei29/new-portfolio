"use client";

import { JSX, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./ServicesComponent.module.scss";
import { useLanguage } from '../../contexts/LanguageContext';
import Button from '../Button/Button';

interface Service {
  key: string;
  icon: string;
  title: string;
  description: string;
}

export const Services = () => {
  const servicesRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const ref = servicesRef.current; // ✅ esta es la clave
  
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
      if (ref) observer.unobserve(ref); // ✅ usar la variable local
    };
  }, []);
  
  const services: Service[] = [
    {
      key: "aiIntegration",
      icon: "/services/ai.svg",
      title: t('services.aiIntegration.title'),
      description: t('services.aiIntegration.description'),
    },
    {
      key: "businessAutomation",
      icon: "/services/api.svg",
      title: t('services.businessAutomation.title'),
      description: t('services.businessAutomation.description'),
    },
    {
      key: "scalableArchitecture",
      icon: "/services/database.svg",
      title: t('services.scalableArchitecture.title'),
      description: t('services.scalableArchitecture.description'),
    },
    {
      key: "webDevelopment",
      icon: "/services/website.svg",
      title: t('services.webDevelopment.title'),
      description: t('services.webDevelopment.description'),
    },
    {
      key: "webApplications",
      icon: "/services/app.svg",
      title: t('services.webApplications.title'),
      description: t('services.webApplications.description'),
    },
    {
      key: "ecommerceSolutions",
      icon: "/services/e-commerce.svg",
      title: t('services.ecommerceSolutions.title'),
      description: t('services.ecommerceSolutions.description'),
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
          {services.map((service) => (
            <div key={service.key} className={styles.card}>
              <div className={styles.iconContainer}>
                <div className={styles.iconWrapper}>
                  <Image
                    src={service.icon}
                    alt={service.title}
                    width={36}
                    height={36}
                    className={styles.serviceIcon}
                  />
                </div>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDescription}>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.ctaContainer}>
          <Button
            href="/about"
            label={t('services.cta')}
          />
        </div>
      </div>
    </section>
  );
};
