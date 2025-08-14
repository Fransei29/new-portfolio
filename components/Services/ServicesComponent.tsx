"use client";

import { JSX, useEffect, useRef } from "react";
import { FiCode,FiServer, FiGlobe, FiShoppingCart, FiDatabase, FiCpu } from "react-icons/fi";
import styles from "./ServicesComponent.module.scss";
import { useLanguage } from '../../contexts/LanguageContext';
import Sortable from 'sortablejs';

 
interface Service {
  key: string;
  icon: JSX.Element;
  title: string;
  description: string;
}

export const Services = () => {
  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesGridRef = useRef<HTMLDivElement>(null);
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

  // Configurar SortableJS para los servicios
  useEffect(() => {
    if (servicesGridRef.current) {
      Sortable.create(servicesGridRef.current, {
        group: 'services',
        animation: 200,
        ghostClass: styles.sortableGhost,
        chosenClass: styles.sortableChosen,
        dragClass: styles.sortableDrag,
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      });
    }
  }, []);
  
  const services: Service[] = [
    {
      key: "webDevelopment",
      icon: <FiCode className={styles.icon} />,
      title: t('services.webDevelopment.title'),
      description: t('services.webDevelopment.description'),
    },
    {
      key: "aiIntegration",
      icon: <FiCpu className={styles.icon} />,
      title: t('services.aiIntegration.title'),
      description: t('services.aiIntegration.description'),
    },
    {
      key: "backendDevelopment",
      icon: <FiServer className={styles.icon} />,
      title: t('services.backendDevelopment.title'),
      description: t('services.backendDevelopment.description'),
    },
    
    {
      key: "webApplications",
      icon: <FiGlobe className={styles.icon} />,
      title: t('services.webApplications.title'),
      description: t('services.webApplications.description'),
    },
    {
      key: "ecommerceSolutions",
      icon: <FiShoppingCart className={styles.icon} />,
      title: t('services.ecommerceSolutions.title'),
      description: t('services.ecommerceSolutions.description'),
    },
    {
      key: "uiuxDesign",
      icon: <FiDatabase className={styles.icon} />,
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
        <div className={styles.grid} ref={servicesGridRef}>
          {services.map((service) => (
            <div key={service.key} className={styles.card}>
              <div className={styles.icon}>{service.icon}</div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
