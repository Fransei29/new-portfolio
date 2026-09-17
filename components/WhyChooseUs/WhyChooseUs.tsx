'use client';

import React from 'react';
import { Unplug, KeyRound, Eye } from 'lucide-react';
import styles from './WhyChooseUs.module.scss';
import { useLanguage } from '../../contexts/LanguageContext';

/**
 * Los tres argumentos de cierre, en una grilla de tres tarjetas.
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
 * SIN SCROLL HORIZONTAL: esto llegó a ser una sección pineada donde el scroll
 * vertical desplazaba las tarjetas en horizontal. No funcionaba: el
 * `scroll-snap-type: y mandatory` que html/body tienen en globals.css salta de
 * anclaje en anclaje y se comía el tramo pineado entero, así que el scrub nunca
 * corría — y desactivar el snap sólo para esta sección arrastraba a que el
 * ancho del riel dejara de respetar el container. Con tres tarjetas que entran
 * cómodas en una fila, el efecto no pagaba su costo.
 */

interface Benefit {
  key: string;
  icon: React.ReactNode;
}

const BENEFITS: Benefit[] = [
  // Unplug: literal, "sin intermediarios" — nada enchufado en el medio.
  { key: 'expertise', icon: <Unplug size={24} aria-hidden /> },
  // KeyRound: la llave, propiedad del código.
  { key: 'delivery', icon: <KeyRound size={24} aria-hidden /> },
  // Eye: visibilidad del avance.
  { key: 'collaboration', icon: <Eye size={24} aria-hidden /> },
];

const WhyChooseUs = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.whyChooseUs}>
      <div className={styles.container}>
        <div className={styles.headerSection}>
          <p className="highlight">{t('whyChooseUs.title')}</p>
          <p className={styles.subtitle}>{t('whyChooseUs.subtitle')}</p>
        </div>

        <div className={styles.grid}>
          {BENEFITS.map((benefit) => (
            <article key={benefit.key} className={styles.benefitCard}>
              {/* Icono y texto en una fila: el icono ocupa la altura que antes
                  gastaba una línea propia, y el eyebrow entra arriba del título
                  sin sumar bloque. Es lo que baja la tarjeta. */}
              <div className={styles.benefitHead}>
                <div className={styles.benefitIconWrapper}>{benefit.icon}</div>

                <div className={styles.benefitHeadText}>
                  <p className={styles.benefitEyebrow}>
                    {t(`whyChooseUs.${benefit.key}.eyebrow`)}
                  </p>
                  <h3 className={styles.benefitTitle}>
                    {t(`whyChooseUs.${benefit.key}.title`)}
                  </h3>
                </div>
              </div>

              {/* Las descripciones pueden traer `\n` para forzar un corte de
                  línea. Se parte y se intercala un <br /> en vez de usar
                  dangerouslySetInnerHTML con un <br> escrito en el JSON: el
                  texto de traducción sigue siendo texto plano y no puede
                  inyectar markup. Mismo patrón que CallToAction. */}
              <p className={styles.benefitDescription}>
                {t(`whyChooseUs.${benefit.key}.description`)
                  .split('\n')
                  .map((line, i, lines) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < lines.length - 1 && <br />}
                    </React.Fragment>
                  ))}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
