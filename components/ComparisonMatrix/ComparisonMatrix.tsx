'use client';

import React from 'react';
import Image from 'next/image';
import styles from './ComparisonMatrix.module.scss';
import { useLanguage } from '../../contexts/LanguageContext';
import { Check, X, Users, Building2, Blocks, PenLine } from 'lucide-react';

// Los cinco criterios, en el orden en que se leen las columnas.
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

// En mobile la matriz se apila en cards y las 5 opciones obligaban a un scroll
// larguísimo. Se dejan las 3 que un cliente realmente compara cuando ya decidió
// construir algo: la propuesta, la agencia y el no-code.
//
// `inhouse` sale porque su perfil es casi idéntico al de `agency` (sólo cambia
// ownership), y `manual` porque el "no hacer nada" ya lo cubre la sección de
// arriba (operational architecture). En desktop siguen apareciendo las cinco.
const MOBILE_HIDDEN_ROWS = ['inhouse', 'manual'];

const ComparisonMatrix = () => {
  const { t } = useLanguage();

  const Mark = ({ on }: { on: boolean }) => (
    <span className={`${styles.mark} ${on ? styles.markOn : styles.markOff}`}>
      {on ? <Check size={20} aria-hidden /> : <X size={20} aria-hidden />}
      <span className={styles.srOnly}>{on ? t('comparison.yes') : t('comparison.no')}</span>
    </span>
  );

  return (
    <section className={styles.container}>
      <div className={styles.section}>
        {/* .highlight es el título de sección compartido del sitio (mismo que
            usan Services y AutomationComparison): así esta sección no inventa
            una jerarquía propia. */}
        <h2 className="highlight piece-l piece-delay-0">{t('comparison.title')}</h2>
        <p className={`${styles.subtitle} piece-r piece-delay-1`}>{t('comparison.subtitle')}</p>

        {/* piece-u: la tabla es ancha y scrollea en horizontal en mobile; una
            entrada lateral le agregaría desborde. */}
        {/* La animación de entrada (`piece-u`) NO puede ir en un ancestro de la
            tabla: aplica `transform`, y un ancestro con transform crea un
            containing block que ANULA el `position: sticky` de las cabeceras
            —incluso en su estado final `translate3d(0,0,0)`, porque el transform
            sigue declarado—. Por eso el wrap queda limpio y el efecto se aplica
            sólo al <caption>, que no envuelve a los <th>. */}
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <caption className={styles.srOnly}>{t('comparison.subtitle')}</caption>
            <thead>
              <tr>
                {/* El rótulo era `srOnly` porque las filas se explican solas.
                    Ahora que la cabecera es sticky y acompaña el scroll, la
                    esquina vacía dejaba la barra coja: se muestra el texto para
                    que la fila de cabecera se lea completa de lado a lado. */}
                <th scope="col" className={styles.rowHeadCol}>
                  {t('comparison.criteria.option')}
                </th>
                {CRITERIA.map((criterion) => (
                  <th key={criterion} scope="col" className={styles.criterionHead}>
                    {t(`comparison.criteria.${criterion}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => {
                const isMe = row.key === 'me';
                return (
                  <tr
                    key={row.key}
                    className={[
                      styles.row,
                      isMe ? styles.rowFeatured : '',
                      MOBILE_HIDDEN_ROWS.includes(row.key) ? styles.hideOnMobile : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <th scope="row" className={styles.rowHead}>
                      {/* Wrapper flex propio: el <th> mantiene su display de
                          tabla y el layout icono/texto se resuelve acá adentro. */}
                      <span className={styles.rowHeadInner}>
                        <span className={styles.rowIcon}>
                          {isMe ? (
                            <Image
                              src="/isotipo-panda.svg"
                              alt=""
                              width={46}
                              height={46}
                              aria-hidden
                            />
                          ) : (
                            row.icon
                          )}
                        </span>
                        <span className={styles.rowText}>
                          <span className={styles.rowName}>
                            {t(`comparison.rows.${row.key}.name`)}
                          </span>
                          <span className={styles.rowDescription}>
                            {t(`comparison.rows.${row.key}.description`)}
                          </span>
                        </span>
                      </span>
                    </th>

                    {CRITERIA.map((criterion) => (
                      <td key={criterion} className={styles.cell}>
                        {/* En mobile la tabla colapsa a cards y las columnas
                            pierden su cabecera, así que cada celda repite el
                            criterio con data-label. */}
                        <span className={styles.cellLabel} aria-hidden>
                          {t(`comparison.criteria.${criterion}`)}
                        </span>
                        <Mark on={row.values[criterion]} />
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
};

export default ComparisonMatrix;
