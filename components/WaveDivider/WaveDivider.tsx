import styles from './WaveDivider.module.scss';

export type WaveDividerVariant = 'aToB' | 'bToA' | 'aToCta';

const variantClass: Record<WaveDividerVariant, string> = {
  aToB: styles.aToB,
  bToA: styles.bToA,
  aToCta: styles.aToCta,
};

interface WaveDividerProps {
  variant: WaveDividerVariant;
}

/**
 * Curva en 52u + franja 52→56u del mismo fill. Los 4u extra son overshoot: sin
 * ellos el borde inferior del path cae JUSTO sobre el borde del viewBox y el
 * navegador lo antialiasea contra el fondo del .root (el lado del que viene la
 * curva). En mobile, donde el alto de 52px no cae en píxel exacto del device,
 * esa fila a medias se ve como una línea clara bajo el wave. El mismo truco que
 * ya usaba WAVE_CTA_D. La curva no se toca: mismos puntos de control, misma
 * costura — sólo se extiende el relleno fuera de la caja visible.
 *
 * Son 4u (antes 2) porque el bloque que contiene al wave puede formar su propia
 * capa de composición, y con zoom o devicePixelRatio fraccionario los bordes de
 * las dos capas no redondean al mismo píxel: ver el comentario de .svg en el
 * módulo.
 */
const WAVE_VIEW_H = 56;
const WAVE_D = 'M0,26 C480,52 960,0 1440,26 L1440,56 L0,56 Z';

/**
 * Curva en 28u + franja 28→30u mismo fill: cubre antialiasing y encaja con margin-top negativo del CTA.
 */
const WAVE_CTA_VIEW_H = 30;
const WAVE_CTA_D =
  'M0,14 C480,28 960,0 1440,14 L1440,28 L1440,30 L0,30 L0,28 Z';

export default function WaveDivider({ variant }: WaveDividerProps) {
  if (variant === 'aToCta') {
    return (
      <div className={`${styles.root} ${variantClass[variant]} wave-static`}>
        <svg
          className={styles.svgCta}
          viewBox={`0 0 1440 ${WAVE_CTA_VIEW_H}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path className={styles.pathCta} d={WAVE_CTA_D} />
        </svg>
      </div>
    );
  }

  return (
    <div className={`${styles.root} ${variantClass[variant]} wave-static`}>
      <svg
        className={styles.svg}
        viewBox={`0 0 1440 ${WAVE_VIEW_H}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d={WAVE_D} />
      </svg>
    </div>
  );
}
