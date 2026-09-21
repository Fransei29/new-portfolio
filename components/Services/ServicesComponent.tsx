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

/**
 * Geometría del orbit de la tarjeta destacada.
 *
 * Vive acá, a nivel de módulo, porque la usan DOS capas: el orbit completo que
 * se ve en desktop (con labels, anillo y core) y la marca de agua de mobile,
 * que dibuja las mismas curvas muy tenues detrás del texto. Antes el cálculo
 * estaba inline dentro del JSX; sacarlo evita tener la misma trigonometría
 * escrita dos veces y que las dos versiones se desincronicen.
 */
const ORBIT_LABELS = ['API', 'RAG', 'DB', 'SEO', 'IO'] as const;

function orbitPaths({
  rLineEnd = 34,
  rCore = 11,
  wave = 6,
}: { rLineEnd?: number; rCore?: number; wave?: number } = {}) {
  const cx = 50;
  const cy = 50;
  return ORBIT_LABELS.map((label, i) => {
    const angle = (i / ORBIT_LABELS.length) * Math.PI * 2 - Math.PI / 2;
    const x1 = cx + Math.cos(angle) * rCore;
    const y1 = cy + Math.sin(angle) * rCore;
    const x2 = cx + Math.cos(angle) * rLineEnd;
    const y2 = cy + Math.sin(angle) * rLineEnd;
    // vector perpendicular unitario, para curvar la conexión de costado
    const px = -Math.sin(angle);
    const py = Math.cos(angle);
    // curva "S": se arquea para un lado en 1/3 y para el otro en 2/3
    const dir = i % 2 === 0 ? 1 : -1;
    const ax = x2 + (x1 - x2) * 0.33 + px * wave * dir;
    const ay = y2 + (y1 - y2) * 0.33 + py * wave * dir;
    const bx = x2 + (x1 - x2) * 0.66 - px * wave * dir;
    const by = y2 + (y1 - y2) * 0.66 - py * wave * dir;
    return { label, d: `M ${x2} ${y2} C ${ax} ${ay}, ${bx} ${by}, ${x1} ${y1}` };
  });
}

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
        <p className="highlight piece-l piece-delay-0">
          {t('services.title')}
        </p>
        {/* El `|` del locale marca dónde cortar la línea en mobile, para que la
            frase no parta en una palabra suelta. En desktop es un espacio más y
            el texto fluye solo (ver .subtitleBreak en el módulo). */}
        <p className={`${styles.subtitle} piece-r piece-delay-1`}>
          {t('services.subtitle').split('|').map((part, i, arr) => (
            <span key={i}>
              {part.trim()}
              {i < arr.length - 1 && (
                <>
                  <br className={styles.subtitleBreak} />{' '}
                </>
              )}
            </span>
          ))}
        </p>

        {/* assemble-stagger: las cards entran en cascada por orden en el DOM,
            sin numerarlas a mano (salen de un .map()). stagger-alt alterna el
            lado de origen, así convergen al centro en vez de venir todas de
            un costado. */}
        <div className={`${styles.grid} assemble-stagger stagger-alt`}>
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

            {/* Orbit de fondo, sólo en mobile.
                Tres intentos antes de esto: curvas sangrando por el borde
                (parecía un recorte roto), una miniatura en la esquina
                (calcomanía) y un fondo centrado y grande — ese ensuciaba,
                porque las curvas cruzaban por detrás del párrafo y el ojo
                detecta ruido justo donde está leyendo.
                La clave: el fondo no puede ocupar la zona del texto. Acá la
                figura se ancla al ÁNGULO INFERIOR DERECHO, que es la única
                región libre de la tarjeta (la última línea del párrafo es
                corta y el CTA no llega hasta ahí), y sale por el borde.
                Y se entiende porque se MUEVE: los pulsos viajan por las
                curvas hacia el núcleo, que es lo que vuelve legible la idea
                de integraciones convergiendo en un sistema. Un trazo quieto
                no comunicaba nada. */}
            <div className={styles.orbitBg} aria-hidden="true">
              <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                <circle className={styles.bgRing} cx="50" cy="50" r="33" fill="none" />
                {orbitPaths().map(({ label, d }, i) => (
                  <g key={label}>
                    <path className={styles.bgLine} d={d} fill="none" />
                    {/* El pulso recorre la curva desde el nodo hasta el núcleo.
                        Escalonados, para que siempre haya uno en viaje sin que
                        lleguen todos a la vez. */}
                    <circle className={styles.bgPulse} r="1.6">
                      <animateMotion
                        dur="5.6s"
                        begin={`${i * 1.12}s`}
                        repeatCount="indefinite"
                        path={d}
                        keyPoints="0;1"
                        keyTimes="0;1"
                        calcMode="linear"
                      />
                    </circle>
                  </g>
                ))}
                {orbitPaths().map(({ label }, i) => {
                  const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
                  return (
                    <circle
                      key={`dot-${label}`}
                      className={styles.bgNode}
                      cx={50 + Math.cos(angle) * 33}
                      cy={50 + Math.sin(angle) * 33}
                      r="1.9"
                    />
                  );
                })}
                <circle className={styles.bgCore} cx="50" cy="50" r="7" />
                {/* Latido del núcleo: recibe lo que llega por las curvas. */}
                <circle className={styles.bgCoreDot} cx="50" cy="50" r="2.6" />
              </svg>
            </div>

            <div className={styles.orbital} aria-hidden="true">
              {(() => {
                // Geometría unificada. Antes cada pieza usaba su propio radio
                // (curvas hasta 34, anillo al 66% del stage ≈ 33, labels a
                // 116px ≈ 44.6) y el dibujo no cerraba: las curvas morían en el
                // aire antes de llegar a los nodos y el anillo no tocaba nada.
                // Ahora el anillo es la referencia: las curvas terminan JUSTO
                // sobre él y los labels se apoyan del lado de afuera.
                const R_RING = 33;                 // radio del anillo, en % del stage
                // El <svg> ocupa el 88% del stage, así que sus unidades NO son
                // las del anillo: un 33 adentro del SVG cae en 0.88*33 ≈ 29%
                // del stage, y por eso las curvas morían antes de llegar. Se
                // divide por 0.88 para que el extremo caiga JUSTO sobre el aro.
                const SVG_SCALE = 0.88;
                const rNodePx = (R_RING / 100) * 260 + 32; // labels justo afuera
                const labels = ORBIT_LABELS;
                const paths = orbitPaths({ rLineEnd: R_RING / SVG_SCALE });
                return (
                  <div className={styles.orbitStage}>
                    <svg
                      className={styles.orbitLines}
                      viewBox="0 0 100 100"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      {paths.map(({ label, d: pathD }, i) => {
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
                      // Sin "nudge" por label: el de IO (-16px) lo sacaba de la
                      // circunferencia y rompía la simetría del conjunto. Si un
                      // label roza el borde, se ajusta el stage, no un caso.
                      return (
                        <span
                          key={label}
                          className={styles.orbitNode}
                          style={{
                            // translate(-50%,-50%) primero: ubica el CENTRO del
                            // nodo sobre la circunferencia, sin importar cuánto
                            // mida su texto.
                            transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${rNodePx}px) rotate(${-angle}deg)`,
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
            <a key={service.key} href={`/services#${service.key}`} className={styles.card}>
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

        <div className={`${styles.ctaContainer} piece-pop piece-delay-5`}>
          <Button
            href="/services"
            label={t('services.cta')}
            variant="secondary"
          />
        </div>
      </div>
    </section>
  );
};
