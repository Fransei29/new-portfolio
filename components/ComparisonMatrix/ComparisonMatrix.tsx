'use client';

import React from 'react';
import Image from 'next/image';
import styles from './ComparisonMatrix.module.scss';
import { useLanguage } from '../../contexts/LanguageContext';
import { Check, X, Users, Building2, Blocks, PenLine } from 'lucide-react';

// Los cinco criterios, en el orden en que se leen.
const CRITERIA = ['speed', 'cost', 'maintainable', 'scales', 'ownership'] as const;

type Criterion = (typeof CRITERIA)[number];

interface Row {
  key: string;
  icon: React.ReactNode | null;
  values: Record<Criterion, boolean>;
}

/**
 * El eje son MODELOS de resolución, no proveedores. Un portfolio de dev solo no
 * puede copiar el eje de Superside (ahí "freelancer" es una columna negativa y
 * quedaríamos del lado malo de nuestra propia tabla).
 *
 * `ownership` es el criterio que define la sección: es el único que ni no-code
 * ni una agencia pueden marcar, y es el argumento real de la propuesta.
 */
const ROWS: Row[] = [
  {
    key: 'me',
    icon: null, // usa el isotipo
    values: { speed: true, cost: true, maintainable: true, scales: true, ownership: true },
  },
  {
    key: 'inhouse',
    icon: <Users size={24} aria-hidden />,
    values: { speed: false, cost: false, maintainable: true, scales: true, ownership: true },
  },
  {
    key: 'agency',
    icon: <Building2 size={24} aria-hidden />,
    values: { speed: false, cost: false, maintainable: true, scales: true, ownership: false },
  },
  {
    key: 'nocode',
    icon: <Blocks size={24} aria-hidden />,
    values: { speed: true, cost: true, maintainable: false, scales: false, ownership: false },
  },
  {
    key: 'manual',
    icon: <PenLine size={24} aria-hidden />,
    values: { speed: false, cost: true, maintainable: false, scales: false, ownership: true },
  },
];

/**
 * ORDEN DE LECTURA: la propuesta va ÚLTIMA, no primera.
 *
 * En la tabla `me` iba arriba porque una tabla se lee de un vistazo y la fila
 * destacada tiene que saltar. Acá el recorrido es temporal: las cartas se apilan
 * una sobre otra y la que queda ARRIBA DE TODO al final es la que el visitante
 * se lleva. Poner la propuesta primero significaría taparla con las cuatro
 * alternativas — literalmente enterrar el argumento bajo las objeciones.
 *
 * Así el recorrido descarta opciones y llega a la propuesta como conclusión.
 */
const STACK_ORDER = ['manual', 'nocode', 'agency', 'inhouse', 'me'];

const ComparisonMatrix = () => {
  const { t } = useLanguage();

  const cards = STACK_ORDER
    .map((key) => ROWS.find((r) => r.key === key))
    .filter((r): r is Row => Boolean(r));

  return (
    <section className={styles.container}>
      <div className={styles.section}>
        {/* .highlight es el título de sección compartido del sitio (mismo que
            usan Services y AutomationComparison): así esta sección no inventa
            una jerarquía propia. */}
        <h2 className="highlight piece-l piece-delay-0">{t('comparison.title')}</h2>
        <p className={`${styles.subtitle} piece-r piece-delay-1`}>{t('comparison.subtitle')}</p>

        {/* El apilado es CSS puro (position: sticky). No lleva `piece-*` ni
            ninguna clase de entrada: esas animaciones aplican `transform`, y un
            ancestro con transform crea un containing block que ANULA el sticky
            de las cartas — incluso en su estado final translate3d(0,0,0),
            porque la propiedad sigue declarada. Es la misma trampa que tenía la
            cabecera sticky de la tabla anterior. */}
        <ol className={styles.stack}>
          {cards.map((row, i) => {
            const isMe = row.key === 'me';
            return (
              <li
                key={row.key}
                className={`${styles.card} ${isMe ? styles.cardFeatured : ''}`}
                /* Cada carta se clava un poco más abajo que la anterior, así el
                   borde superior de las que quedaron debajo sigue asomando y se
                   ve el mazo acumulado. Sin esto cada carta taparía a la
                   anterior por completo y el efecto se leería como un simple
                   cambio de slide. */
                style={{ '--i': i } as React.CSSProperties}
              >
                <div className={styles.cardInner}>
                  <header className={styles.cardHead}>
                    <span className={styles.cardIndex} aria-hidden>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={styles.rowIcon}>
                      {isMe ? (
                        <Image src="/isotipo-panda.svg" alt="" width={46} height={46} aria-hidden />
                      ) : (
                        row.icon
                      )}
                    </span>
                    <span className={styles.rowText}>
                      <h3 className={styles.rowName}>{t(`comparison.rows.${row.key}.name`)}</h3>
                      <p className={styles.rowDescription}>
                        {t(`comparison.rows.${row.key}.description`)}
                      </p>
                    </span>
                  </header>

                  <ul className={styles.criteria}>
                    {CRITERIA.map((criterion) => {
                      const on = row.values[criterion];
                      return (
                        <li
                          key={criterion}
                          className={`${styles.criterion} ${on ? styles.criterionOn : styles.criterionOff}`}
                        >
                          <span className={styles.mark}>
                            {on ? <Check size={18} aria-hidden /> : <X size={18} aria-hidden />}
                          </span>
                          <span className={styles.criterionLabel}>
                            {t(`comparison.criteria.${criterion}`)}
                          </span>
                          {/* El icono solo no dice "sí" o "no" a un lector de
                              pantalla: el estado va en texto, oculto a la vista. */}
                          <span className={styles.srOnly}>
                            {on ? t('comparison.yes') : t('comparison.no')}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default ComparisonMatrix;
