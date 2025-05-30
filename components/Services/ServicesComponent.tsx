"use client";

import { JSX, useEffect, useRef } from "react";
import { FiCode,FiServer, FiGlobe, FiShoppingCart, FiUsers, FiPenTool, FiSettings } from "react-icons/fi";
import styles from "./ServicesComponent.module.scss";

 
interface Service {
  key: string;
  icon: JSX.Element;
  title: string;
  description: string;
  features: string[];
}

export const Services = () => {
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    if (servicesRef.current) observer.observe(servicesRef.current);

    return () => {
      if (servicesRef.current) observer.unobserve(servicesRef.current);
    };
  }, []);

  const services: Service[] = [
    {
      key: "webDevelopment",
      icon: <FiCode className={styles.icon} />,
      title: "Web Development",
      description:
        "Clean, responsive websites with SEO and accessibility in mind.",
      features: [
        "Responsive layouts",
        "Semantic HTML5 & CSS3",
        "Modern JavaScript (ES6+)",
        "SEO optimization",
      ],
    },
    {
      key: "backendDevelopment",
      icon: <FiServer className={styles.icon} />,
      title: "Backend & Support",
      description: "APIs, databases y mantenimiento continuo.",
      features: [
        "REST & GraphQL con Express.js",
        "Bases de datos relacionales y no relacionales",
        "Cacheo con Redis y ORM Sequelize",
        "Soporte, seguridad y optimización",
      ],
    },
    
    {
      key: "webApplications",
      icon: <FiGlobe className={styles.icon} />,
      title: "Web Applications",
      description:
        "Scalable apps with smooth client-server rendering and API integration.",
      features: [
        "React & Next.js",
        "State management",
        "REST & GraphQL APIs",
        "Server-side rendering",
      ],
    },
    {
      key: "ecommerceSolutions",
      icon: <FiShoppingCart className={styles.icon} />,
      title: "E-commerce Solutions",
      description:
        "Custom stores with secure payments and inventory control.",
      features: [
        "Payment gateway integration",
        "User authentication",
        "Cart & order management",
        "Performance optimization",
      ],
    },
    {
      key: "technicalConsulting",
      icon: <FiUsers className={styles.icon} />,
      title: "Technical Consulting",
      description:
        "Guidance on architecture, best practices, and agile workflows.",
      features: [
        "Architecture & code reviews",
        "Agile planning & mentoring",
        "Version control with Git",
        "Containerization with Docker",
      ],
    },
    {
      key: "uiuxDesign",
      icon: <FiPenTool className={styles.icon} />,
      title: "UI/UX Collaboration",
      description:
        "Turning wireframes into responsive, accessible interfaces.",
      features: [
        "Responsive UI with Tailwind CSS or Sass",
        "Accessibility standards",
        "User-focused design",
        "Cross-browser testing",
      ],
    },
  ];
  
  
  return (
    <section ref={servicesRef} className={styles.services}>
      <div className={styles.container}>
       <p className={styles.highlight}>
            Services
          </p>
        <p className={styles.servicesSubtitle}>
          Customized development services to boost your online presence and streamline your business operations.
        </p>
        <div className={styles.grid}>
          {services.map((service) => (
            <div key={service.key} className={styles.card}>
              <div className={styles.icon}>{service.icon}</div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>
              <ul className={styles.features}>
                {service.features.map((feature, i) => (
                  <li key={i} className={styles.feature}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
