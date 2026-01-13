"use client";

import { JSX, useEffect, useRef } from "react";
import { FiCode,FiServer, FiGlobe, FiShoppingCart, FiDatabase, FiCpu } from "react-icons/fi";
import styles from "./ServicesComponent.module.scss";
import { useLanguage } from '../../contexts/LanguageContext';

interface Service {
  key: string;
  icon: JSX.Element;
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
      key: "webDevelopment",
      icon: <FiCode />,
      title: t('services.webDevelopment.title'),
      description: t('services.webDevelopment.description'),
    },
    {
      key: "aiIntegration",
      icon: <FiCpu />,
      title: t('services.aiIntegration.title'),
      description: t('services.aiIntegration.description'),
    },
    {
      key: "backendDevelopment",
      icon: <FiServer />,
      title: t('services.backendDevelopment.title'),
      description: t('services.backendDevelopment.description'),
    },
    
    {
      key: "webApplications",
      icon: <FiGlobe />,
      title: t('services.webApplications.title'),
      description: t('services.webApplications.description'),
    },
    {
      key: "ecommerceSolutions",
      icon: <FiShoppingCart />,
      title: t('services.ecommerceSolutions.title'),
      description: t('services.ecommerceSolutions.description'),
    },
    {
      key: "uiuxDesign",
      icon: <FiDatabase />,
      title: t('services.uiuxDesign.title'),
      description: t('services.uiuxDesign.description'),
    },
  ];
  
  
  return (
    <section ref={servicesRef} className={styles.services}>
      <div className={styles.container}>
       <p className={styles.highlight}>
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
                  {service.icon}
                </div>
              </div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
