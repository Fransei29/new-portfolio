'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Workflow,
  Code2,
  Monitor,
  ShoppingCart,
  Server,
  Check,
  ArrowUpRight,
  ArrowRight,
} from 'lucide-react';
import ClientLayout from '../ClientLayout/ClientLayout';
import CallToAction from '../CallToAction/CallToAction';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  getServicesContent,
  type ServicesPageContent,
} from '../../lib/servicesContent';
import styles from './ServicesView.module.scss';
import '../../app/styles/utilities.scss';

/* El icono va por clave y no dentro del JSON de traducciones: un componente de
   React no viaja en un archivo de contenido, y la clave es la misma en los dos
   idiomas. Son los mismos iconos que usa la sección de la home. */
const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  aiIntegration: Sparkles,
  businessAutomation: Workflow,
  webDevelopment: Code2,
  webApplications: Monitor,
  ecommerceSolutions: ShoppingCart,
  scalableArchitecture: Server,
};

interface Props {
  /** Contenido resuelto en el servidor: es lo que ve un crawler sin JS. */
  initialContent: ServicesPageContent;
}

export default function ServicesView({ initialContent }: Props) {
  const { language } = useLanguage();
  const [content, setContent] = useState(initialContent);
  /* El detalle no scrollea: es un panel fijo debajo de la grilla que cambia
     según la tarjeta activa. Arranca en el primer servicio para que el panel
     nunca se vea vacío. */
  const [activeKey, setActiveKey] = useState(initialContent.services[0].key);

  /* El servidor ya mandó el contenido en inglés. Este efecto solo traduce
     cuando el visitante cambia de idioma — mismo criterio que ProjectsView. */
  useEffect(() => {
    setContent(language === 'en' ? initialContent : getServicesContent(language));
  }, [language, initialContent]);

  const { hero, labels, services } = content;
  const active = services.find((s) => s.key === activeKey) ?? services[0];
  const ActiveIcon = ICONS[active.key];

  return (
    <ClientLayout>
      <div className={styles.page}>
        {/* ---------- Encabezado ---------- */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <h1 className="highlight">{hero.eyebrow}</h1>
            <p className={styles.heroSubtitle}>{hero.subtitle}</p>
          </div>
        </section>

        {/* ---------- Selector + panel de detalle ----------
            Dos columnas: las tarjetas apiladas a la izquierda (30% del ancho) y
            el detalle a la derecha. Las tarjetas son las mismas que en la home
            (mismo icono, mismo título, misma etiqueta corta al pie), pero acá
            no navegan: seleccionan. El detalle se actualiza en el lugar, así la
            página entra casi sin scroll en vez de apilar seis bloques largos
            uno debajo del otro. */}
        <section className={styles.picker}>
          <div className={`${styles.container} ${styles.split}`}>
            <div className={styles.cardColumn} role="tablist" aria-label={hero.eyebrow}>
              {services.map((service) => {
                const Icon = ICONS[service.key];
                const isActive = service.key === activeKey;
                return (
                  <button
                    key={service.key}
                    type="button"
                    role="tab"
                    id={`tab-${service.key}`}
                    aria-selected={isActive}
                    aria-controls="service-panel"
                    className={`${styles.card} ${isActive ? styles.cardActive : ''}`}
                    onClick={() => setActiveKey(service.key)}
                  >
                    <span className={styles.iconWrapper}>
                      {Icon && <Icon size={18} className={styles.serviceIcon} />}
                    </span>

                    <span className={styles.cardBody}>
                      <span className={styles.cardTitle}>{service.name}</span>
                      <span className={styles.cardDescription}>{service.tagline}</span>
                    </span>

                    <span className={styles.cardArrow} aria-hidden="true">
                      <ArrowUpRight size={13} strokeWidth={2.25} />
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Panel fijo. `key` fuerza el remount al cambiar de servicio: sin
                eso la animación de entrada no se vuelve a disparar y el cambio
                pasa desapercibido. */}
            <div
              key={active.key}
              id="service-panel"
              role="tabpanel"
              aria-labelledby={`tab-${active.key}`}
              className={styles.panel}
            >
              {/* Encabezado a todo el ancho: nombre, tagline y la descripción
                  como bajada. Es la unidad de lectura que abre el panel. */}
              <header className={styles.panelHead}>
                <span className={styles.panelIcon}>
                  {ActiveIcon && <ActiveIcon size={20} className={styles.serviceIcon} />}
                </span>
                <h3 className={styles.panelTitle}>{active.name}</h3>
                <p className={styles.panelTagline}>{active.tagline}</p>
                <p className={styles.panelDescription}>{active.description}</p>
              </header>

              {/* Las dos listas, en columnas. Es lo que el visitante compara
                  entre un servicio y otro, así que van juntas y alineadas. */}
              <div className={styles.panelLists}>
                <section className={styles.detailGroup}>
                  <h4 className={styles.detailLabel}>{labels.includesLabel}</h4>
                  <ul className={styles.checkList}>
                    {active.includes.map((item) => (
                      <li key={item}>
                        <Check size={14} className={styles.checkIcon} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className={styles.detailGroup}>
                  <h4 className={styles.detailLabel}>{labels.deliverablesLabel}</h4>
                  <ul className={styles.checkList}>
                    {active.deliverables.map((item) => (
                      <li key={item}>
                        <Check size={14} className={styles.checkIcon} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              {/* Pie del panel: el criterio de auto-selección, el stack y el
                  CTA. `margin-top: auto` en el CSS lo empuja al fondo, que es
                  lo que iguala el alto del panel al de la columna de tarjetas. */}
              <footer className={styles.panelFoot}>
                <div className={styles.fitBox}>
                  <span className={styles.fitLabel}>{labels.fitLabel}</span>
                  <p className={styles.fitText}>{active.fit}</p>
                </div>

                <div className={styles.footRow}>
                  <ul className={styles.stackList} aria-label={labels.stackLabel}>
                    {active.stack.map((tech) => (
                      <li key={tech} className={styles.stackTag}>{tech}</li>
                    ))}
                  </ul>

                  <Link href="/contact" className={styles.panelCta}>
                    {labels.cta}
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </footer>
            </div>

            {/* Los otros cinco servicios también tienen que estar en el HTML
                servido, no solo el activo: si el detalle viviera únicamente en
                el estado de React, un crawler sin JS vería un único servicio.
                Se renderizan ocultos y solo para lectura de máquina. */}
            <div className={styles.seoOnly} aria-hidden="true">
              {services
                .filter((service) => service.key !== active.key)
                .map((service) => (
                  <article key={service.key}>
                    <h3>{service.name}</h3>
                    <p>{service.tagline}</p>
                    <p>{service.description}</p>
                    <p>{service.fit}</p>
                    <ul>
                      {[...service.includes, ...service.deliverables].map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                ))}
            </div>
          </div>
        </section>

        {/* ---------- CTA final ----------
            Mismo componente que cierra la home, para que el cierre de todas las
            páginas sea el mismo. */}
        {/* `ctaWrap` global (globals.css) y NO una clase del módulo: es la que
            le da el ancho contenido, el centrado, las esquinas redondeadas y la
            sombra. El módulo definía su propio ctaWrap con sólo padding, así
            que acá el CTA se estiraba a todo el ancho y no coincidía con el de
            la home. Con la clase global las dos páginas cierran igual. */}
        <div className="ctaWrap">
          <CallToAction />
        </div>
      </div>
    </ClientLayout>
  );
}
