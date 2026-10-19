// app/design-exploration/page.tsx
// Índice de la exploración: una tarjeta por dirección con su idea, paleta y
// tipografías. Cada tarjeta muestra el nombre escrito con la fuente display de
// esa opción, para que se note la diferencia sin tener que entrar.
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Newsreader,
  JetBrains_Mono,
  Archivo_Black,
  Inter_Tight,
  Geist,
  Instrument_Serif,
  Unbounded,
  Source_Serif_4,
  DM_Serif_Display,
  IBM_Plex_Sans_Condensed,
  Inter,
} from 'next/font/google';
import { directions } from './_shared/directions';
import { content } from './_shared/content';
import styles from './index.module.css';

const ui = Inter({ subsets: ['latin'], display: 'swap' });

// Sólo el peso y los glifos necesarios para el título de cada tarjeta.
const f01 = Newsreader({ subsets: ['latin'], weight: '500', display: 'swap' });
const f02 = JetBrains_Mono({ subsets: ['latin'], weight: '500', display: 'swap' });
const f03 = Archivo_Black({ subsets: ['latin'], weight: '400', display: 'swap' });
const f04 = Inter_Tight({ subsets: ['latin'], weight: '700', display: 'swap' });
const f05 = Geist({ subsets: ['latin'], weight: '600', display: 'swap' });
const f06 = Instrument_Serif({ subsets: ['latin'], weight: '400', display: 'swap' });
const f07 = Unbounded({ subsets: ['latin'], weight: '700', display: 'swap' });
const f08 = Source_Serif_4({ subsets: ['latin'], weight: '600', display: 'swap' });
const f09 = DM_Serif_Display({ subsets: ['latin'], weight: '400', display: 'swap' });
const f10 = IBM_Plex_Sans_Condensed({ subsets: ['latin'], weight: '600', display: 'swap' });

const displayFonts: Record<string, { className: string }> = {
  'option-01': f01,
  'option-02': f02,
  'option-03': f03,
  'option-04': f04,
  'option-05': f05,
  'option-06': f06,
  'option-07': f07,
  'option-08': f08,
  'option-09': f09,
  'option-10': f10,
};

function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string) {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
}

export const metadata: Metadata = {
  title: 'Exploración de diseño | Franco Seiler',
};

export default function DesignExplorationIndex() {
  return (
    <div className={`dx-root ${styles.root} ${ui.className}`} lang="es">
      <a className="dx-skip" href="#main">
        Saltar al contenido
      </a>
      <main id="main" className={styles.main}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{content.profile.name} · Exploración de diseño</p>
          <h1 className={styles.title}>{directions.length} direcciones para el portafolio</h1>
          <p className={styles.lead}>
            Todas usan exactamente el mismo contenido, así se comparan por diseño y no por texto. Recorrelas con la
            barra de abajo o con las flechas ← → del teclado.
          </p>
          <p className={styles.lead}>
            <Link href="/design-exploration/mejoras">Ronda 2: 7 mejoras dentro de la marca →</Link>
          </p>
        </header>

        <ol className={styles.grid}>
          {directions.map((d) => {
            const bg = d.palette[0].hex;
            const accent = d.palette[d.palette.length - 1].hex;
            // El texto de la previsualización es el color de la paleta que más contrasta con el fondo.
            const fg = d.palette.slice(1).reduce((best, p) => (contrast(bg, p.hex) > contrast(bg, best) ? p.hex : best), d.palette[1].hex);
            return (
              <li key={d.slug}>
                <Link href={`/design-exploration/${d.slug}`} className={styles.card}>
                  <div
                    className={styles.preview}
                    style={{ background: bg, color: fg, ['--accent' as string]: accent }}
                    aria-hidden="true"
                  >
                    <span className={styles.previewNum}>{d.number}</span>
                    <span className={`${styles.previewName} ${displayFonts[d.slug]?.className ?? ''}`}>{d.name}</span>
                    <span className={styles.previewBar} />
                  </div>
                  <div className={styles.body}>
                    <h2 className={styles.cardTitle}>
                      <span className={styles.cardNum}>{d.number}</span> {d.name}
                    </h2>
                    <p className={styles.concept}>{d.concept}</p>
                    <ul className={styles.swatches} aria-label="Paleta">
                      {d.palette.map((p) => (
                        <li key={p.hex} className={styles.swatch}>
                          <span className={styles.chip} style={{ background: p.hex }} aria-hidden="true" />
                          <span>
                            {p.name} <span className={styles.hex}>{p.hex}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className={styles.fonts}>
                      <span className={styles.label}>Tipografías</span> {d.fonts.display}
                      {d.fonts.body !== d.fonts.display ? ` + ${d.fonts.body}` : ''}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </main>
    </div>
  );
}
