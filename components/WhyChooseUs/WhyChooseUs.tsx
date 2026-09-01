'use client';

import React, { useEffect, useRef } from 'react';
import { Unplug, KeyRound, Eye } from 'lucide-react';
import styles from './WhyChooseUs.module.scss';
import { useLanguage } from '../../contexts/LanguageContext';

/**
 * Los tres argumentos de cierre, en scroll horizontal pineado.
 *
 * QUÉ CAMBIÓ Y POR QUÉ: antes esto era "Backed by data" con tres tarjetas que
 * decían experiencia técnica / entrega eficiente / enfoque colaborativo. Tres
 * problemas: el título prometía datos que la sección no daba, y las tres cosas
 * las dice literalmente cualquier competidor — ninguno diría lo contrario, así
 * que no diferenciaban nada.
 *
 * Ahora cada tarjeta es una promesa que una agencia o una herramienta no-code
 * NO puede hacer. Es el mismo eje que la carta destacada de ComparisonMatrix,
 * dicho en positivo y desde lo que el cliente se lleva.
 *
 * CÓMO SE MUEVE: la sección se clava y el scroll vertical se traduce en
 * desplazamiento horizontal de las tarjetas. Rompe el eje después de una home
 * entera de secciones que entran de abajo hacia arriba, y con tres tarjetas es
 * corto — no llega a cansar.
 */

interface Benefit {
  key: string;
  icon: React.ReactNode;
}

const BENEFITS: Benefit[] = [
  // Unplug: literal, "sin intermediarios" — nada enchufado en el medio.
  { key: 'expertise', icon: <Unplug size={30} aria-hidden /> },
  // KeyRound: la llave, propiedad del código.
  { key: 'delivery', icon: <KeyRound size={30} aria-hidden /> },
  // Eye: visibilidad del avance.
  { key: 'collaboration', icon: <Eye size={30} aria-hidden /> },
];

const WhyChooseUs = () => {
  const { t } = useLanguage();
  const hostRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const track = trackRef.current;
    if (!host || !track || typeof window === 'undefined') return;

    // Dos casos en los que NO se pinea nada y la sección queda como una grilla
    // normal (ver el fallback en el SCSS):
    //   · reduced motion — el pin secuestra el scroll, que es justo lo que esta
    //     preferencia pide no hacer.
    //   · mobile — con 3 tarjetas a ancho casi completo el recorrido horizontal
    //     es mínimo, y pinear en un viewport bajo pelea con la barra de URL.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || window.innerWidth < 900) return;

    let cancelled = false;
    let ctx: { revert: () => void } | null = null;

    // Import dinámico: la sección está a varias pantallas de la home y no tiene
    // por qué pesar en el bundle inicial.
    import('../../animations/gsap.config').then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;

      // gsap.context aísla y limpia TODO lo creado adentro con un solo revert(),
      // incluidos los ScrollTrigger. Sin él habría que juntar cada instancia a
      // mano y alcanza con olvidar una para dejar un trigger colgado que sigue
      // midiendo un nodo que ya no existe.
      ctx = gsap.context(() => {
        // matchMedia deja que GSAP mate y rearme la animación solo cuando se
        // cruza el breakpoint. Sin esto, rotar el teléfono o achicar la ventana
        // deja el pin activo con medidas de otro layout.
        ScrollTrigger.matchMedia({
          '(min-width: 900px) and (prefers-reduced-motion: no-preference)': () => {
            // Cuánto tiene que viajar el track: su ancho total menos lo que ya
            // se ve. Se mide en cada refresh y no una sola vez, porque el ancho
            // depende de la fuente ya cargada y del viewport.
            const distance = () => Math.max(0, track.scrollWidth - host.offsetWidth);

            gsap.to(track, {
              x: () => -distance(),
              ease: 'none',
              scrollTrigger: {
                trigger: host,
                start: 'top top',
                // El recorrido vertical se ata a la distancia horizontal real:
                // así la velocidad del desplazamiento no depende de cuántas
                // tarjetas haya. Con un valor fijo, agregar una cuarta tarjeta
                // haría que todas pasaran más rápido.
                end: () => `+=${distance()}`,
                pin: true,
                scrub: 0.8,
                // El pin cambia la altura del documento; sin esto los triggers
                // de las secciones de abajo quedan calculados sobre la altura
                // vieja y disparan en el lugar equivocado.
                invalidateOnRefresh: true,
                anticipatePin: 1,
              },
            });
          },
        });
      }, host);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section className={styles.whyChooseUs} ref={hostRef}>
      {/* El contenedor NO lleva clases `piece-*` ni `assemble`: aplican
          `transform`, y un ancestro transformado crea un containing block que
          rompe el position:fixed del pin de ScrollTrigger. Es la misma trampa
          que ya estaba documentada en ComparisonMatrix y en la tabla anterior. */}
      <div className={styles.container}>
        <div className={styles.headerSection}>
          <p className="highlight">{t('whyChooseUs.title')}</p>
          <p className={styles.subtitle}>{t('whyChooseUs.subtitle')}</p>
        </div>

        <div className={styles.viewport}>
          <div className={styles.track} ref={trackRef}>
            {BENEFITS.map((benefit, i) => (
              <article key={benefit.key} className={styles.benefitCard}>
                <span className={styles.benefitIndex} aria-hidden>
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className={styles.benefitIconWrapper}>{benefit.icon}</div>

                <p className={styles.benefitEyebrow}>
                  {t(`whyChooseUs.${benefit.key}.eyebrow`)}
                </p>
                <h3 className={styles.benefitTitle}>
                  {t(`whyChooseUs.${benefit.key}.title`)}
                </h3>
                <p className={styles.benefitDescription}>
                  {t(`whyChooseUs.${benefit.key}.description`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
