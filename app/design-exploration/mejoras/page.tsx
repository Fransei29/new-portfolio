// app/design-exploration/mejoras/page.tsx
// Índice de la ronda 2: una tarjeta por mejora con el problema que ataca, la
// propuesta y la captura del primer pantallazo en desktop y en mobile.
import Link from 'next/link';
import type { Metadata } from 'next';
import { mejoras } from './_shared/mejoras';
import styles from './index.module.css';

export const metadata: Metadata = {
  title: 'Mejoras de diseño | Franco Seiler',
};

export default function MejorasIndex() {
  return (
    <div className={`dx-root ${styles.root}`} lang="es">
      <a className="dx-skip" href="#main">
        Saltar al contenido
      </a>
      <main id="main" className={styles.main}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Franco Seiler · Exploración de diseño · Ronda 2</p>
          <h1 className={styles.title}>{mejoras.length} mejoras sobre el sitio actual</h1>
          <p className={styles.lead}>
            La marca no cambia: misma paleta lila, mismas tipografías, mismo panda y el mismo contenido. Cada opción
            ataca un problema concreto de la home de hoy, en desktop y en mobile. Recorrelas con la barra de abajo o
            con las flechas ← →.
          </p>
          <p className={styles.alt}>
            <Link href="/design-exploration">Ver la ronda 1 (rediseños totales) →</Link>
          </p>
        </header>

        <ol className={styles.list}>
          {mejoras.map((m) => (
            <li key={m.slug}>
              <Link href={`/design-exploration/mejoras/${m.slug}`} className={styles.card}>
                <div className={styles.shots} aria-hidden="true">
                  <span className={styles.desk}>
                    {/* eslint-disable-next-line @next/next/no-img-element -- captura estática */}
                    <img src={`/design-exploration/mejoras/${m.slug}-desktop.png`} alt="" loading="lazy" />
                  </span>
                  <span className={styles.mob}>
                    {/* eslint-disable-next-line @next/next/no-img-element -- captura estática */}
                    <img src={`/design-exploration/mejoras/${m.slug}-mobile.png`} alt="" loading="lazy" />
                  </span>
                </div>
                <div className={styles.body}>
                  <h2 className={styles.cardTitle}>
                    <span className={styles.num}>{m.number}</span> {m.name}
                  </h2>
                  <p className={styles.concept}>{m.concept}</p>
                  <dl className={styles.facts}>
                    <div>
                      <dt>Problema de hoy</dt>
                      <dd>{m.problem}</dd>
                    </div>
                    <div>
                      <dt>Desktop</dt>
                      <dd>{m.desktop}</dd>
                    </div>
                    <div>
                      <dt>Mobile</dt>
                      <dd>{m.mobile}</dd>
                    </div>
                  </dl>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
}
