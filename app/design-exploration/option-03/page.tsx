// design-exploration/option-03/page.tsx
// Dirección 03 · Brutalista. Grilla dura con líneas visibles (gap negro sobre
// fondo negro), bordes gruesos, Archivo Black para todo lo que grita y Space
// Mono para todo lo que informa. Naranja y amarillo sólo como bloques, siempre
// con texto negro encima para mantener el contraste AA.
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Archivo_Black, Space_Mono } from 'next/font/google';
import Reveal from '../_shared/Reveal';
import { content, featuredProjects } from '../_shared/content';
import styles from './option.module.css';

const display = Archivo_Black({ subsets: ['latin'], weight: '400', variable: '--b-display', display: 'swap' });
const mono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--b-mono', display: 'swap' });
const fontVars = `${display.variable} ${mono.variable}`;

export const metadata: Metadata = {
  title: '03 · Brutalista — Exploración',
};

const { profile, stats, markets, principles, process, services, experience, skills, testimonials, contact, footer } = content;

const nav = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#experiencia', label: 'Experiencia' },
  { href: '#contacto', label: 'Contacto' },
];

const pad = (n: number) => String(n).padStart(2, '0');

/** Cuántos highlights se muestran antes del "ver más" de cada experiencia. */
const VISIBLE_HIGHLIGHTS = 3;
/** Cuántas tecnologías se muestran por tarjeta de proyecto. */
const VISIBLE_STACK = 6;

function Marquee({ tone }: { tone: 'orange' | 'black' }) {
  const items = markets.map((m) => `${m.flag} ${m.city}`);
  const row = (hidden: boolean) => (
    <ul className={styles.marqueeRow} aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <li key={i}>
          {item}
          <span className={styles.marqueeSep} aria-hidden="true">
            ■
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`${styles.marquee} ${tone === 'black' ? styles.marqueeBlack : ''}`}>
      <p className={styles.srOnly}>Proyectos entregados en: {markets.map((m) => m.city).join(', ')}.</p>
      <div className={styles.marqueeTrack} aria-hidden="true">
        {row(true)}
        {row(true)}
      </div>
    </div>
  );
}

export default function OptionBrutalist() {
  const year = new Date().getFullYear();

  return (
    <div className={`dx-root ${styles.root} ${fontVars}`} lang="es">
      <a className="dx-skip" href="#main">
        Saltar al contenido
      </a>

      {/* ───────── Header ───────── */}
      <header className={styles.header}>
        <a href="#top" className={styles.brand}>
          <span className={styles.brandMark} aria-hidden="true">
            FS
          </span>
          <span className={styles.brandText}>
            {profile.name}
            <small>{profile.studio}</small>
          </span>
        </a>
        <nav aria-label="Principal" className={styles.nav}>
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a href={`mailto:${contact.email}`} className={styles.headerCta}>
          Escribinos →
        </a>
      </header>

      <main id="main">
        {/* ───────── Hero ───────── */}
        <section id="top" className={styles.hero} aria-labelledby="hero-title">
          <ul className={styles.heroMeta}>
            <li>
              <span>Rol</span>
              {profile.role}
            </li>
            <li>
              <span>Base</span>
              {profile.location}
            </li>
            <li>
              <span>Alcance</span>
              {profile.reach}
            </li>
          </ul>

          <h1 id="hero-title" className={styles.heroName}>
            <span>Franco</span>
            <span>Seiler</span>
          </h1>

          <div className={styles.heroBody}>
            <p className={styles.heroHeadline}>
              {profile.headline.before}
              <mark>{profile.headline.highlight}</mark>
              {profile.headline.after}
            </p>
            <div className={styles.heroSide}>
              <p className={styles.heroIntro}>{profile.intro}</p>
              <p className={styles.heroTagline}>{profile.tagline}</p>
              <div className={styles.heroActions}>
                <a href="#contacto" className={`${styles.btn} ${styles.btnYellow}`}>
                  {contact.cta} →
                </a>
                <a href="#proyectos" className={`${styles.btn} ${styles.btnGhost}`}>
                  Ver proyectos
                </a>
              </div>
            </div>
          </div>
        </section>

        <Marquee tone="orange" />

        {/* ───────── Sobre ───────── */}
        <section id="sobre" className={styles.section} aria-labelledby="sobre-title">
          <div className={styles.sectionHead}>
            <span className={styles.sectionIndex}>/01</span>
            <p className={styles.eyebrow}>{profile.aboutSubtitle}</p>
            <h2 id="sobre-title" className={styles.sectionTitle}>
              {profile.aboutTitle}
            </h2>
          </div>

          <div className={styles.stats}>
            {stats.map((s, i) => (
              <Reveal key={s.label} className={styles.stat} delay={i * 80}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </Reveal>
            ))}
          </div>

          <div className={styles.about}>
            <p className={styles.aboutLead}>{profile.bio[0]}</p>
            <div className={styles.aboutRest}>
              {profile.bio.slice(1).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          <ol className={styles.principles}>
            {principles.map((p, i) => (
              <li key={p.title} className={styles.principle}>
                <span className={styles.principleNo}>{pad(i + 1)}</span>
                <p className={styles.eyebrow}>{p.eyebrow}</p>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ───────── Servicios ───────── */}
        <section id="servicios" className={`${styles.section} ${styles.sectionYellow}`} aria-labelledby="servicios-title">
          <div className={styles.sectionHead}>
            <span className={styles.sectionIndex}>/02</span>
            <p className={styles.eyebrow}>Qué hacemos</p>
            <h2 id="servicios-title" className={styles.sectionTitle}>
              Servicios
            </h2>
          </div>
          <ul className={styles.services}>
            {services.map((s, i) => (
              <li key={s.title} className={styles.service}>
                <div className={styles.serviceTop}>
                  <span className={styles.serviceNo}>{pad(i + 1)}</span>
                  <span className={styles.serviceShort} aria-hidden="true">
                    {s.short}
                  </span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                {s.tags.length > 0 && (
                  <ul className={styles.tags} aria-label="Especialidades">
                    {s.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* ───────── Proyectos ───────── */}
        <section id="proyectos" className={styles.section} aria-labelledby="proyectos-title">
          <div className={`${styles.sectionHead} ${styles.sectionHeadSplit}`}>
            <div>
              <span className={styles.sectionIndex}>/03</span>
              <p className={styles.eyebrow}>Case studies</p>
              <h2 id="proyectos-title" className={styles.sectionTitle}>
                Proyectos
              </h2>
            </div>
            <p className={styles.bigCount} aria-hidden="true">
              {pad(featuredProjects.length)}
            </p>
          </div>

          <ul className={styles.projects}>
            {featuredProjects.map((p, i) => {
              const extra = p.stack.length - VISIBLE_STACK;
              const lead = i === 0;
              return (
                <li key={p.slug} className={`${styles.project} ${lead ? styles.projectLead : ''}`}>
                  <div className={styles.projectMedia}>
                    {p.image && (
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes={lead ? '(min-width: 1100px) 60vw, 100vw' : '(min-width: 1100px) 33vw, (min-width: 700px) 50vw, 100vw'}
                        className={styles.projectImg}
                        priority={i === 0}
                      />
                    )}
                    <span className={styles.projectNo}>#{pad(i + 1)}</span>
                  </div>
                  <div className={styles.projectBody}>
                    <p className={styles.projectMeta}>
                      {[p.industry, p.engagement].filter(Boolean).join(' / ')}
                    </p>
                    <h3 className={styles.projectTitle}>{p.title}</h3>
                    {p.subtitle && <p className={styles.projectSubtitle}>{p.subtitle}</p>}
                    {lead && <p className={styles.projectDesc}>{p.description}</p>}
                    <ul className={styles.stack} aria-label="Stack">
                      {p.stack.slice(0, VISIBLE_STACK).map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                      {extra > 0 && <li className={styles.stackMore}>+{extra}</li>}
                    </ul>
                    <div className={styles.projectLinks}>
                      <Link href={p.caseStudyUrl} className={`${styles.btn} ${styles.btnBlack}`}>
                        Ver case study<span className={styles.srOnly}>: {p.title}</span> →
                      </Link>
                      {p.liveUrl && (
                        <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className={`${styles.btn} ${styles.btnGhost}`}>
                          Ver sitio<span className={styles.srOnly}>: {p.title} (se abre en otra pestaña)</span> ↗
                        </a>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        {/* ───────── Proceso ───────── */}
        <section id="proceso" className={`${styles.section} ${styles.sectionBlack}`} aria-labelledby="proceso-title">
          <div className={styles.sectionHead}>
            <span className={styles.sectionIndex}>/04</span>
            <p className={styles.eyebrow}>Cómo trabajamos</p>
            <h2 id="proceso-title" className={styles.sectionTitle}>
              Proceso
            </h2>
          </div>
          <ol className={styles.process}>
            {process.map((step, i) => (
              <li key={step.title} className={styles.step}>
                <span className={styles.stepNo}>{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ───────── Experiencia + skills ───────── */}
        <section id="experiencia" className={styles.section} aria-labelledby="experiencia-title">
          <div className={styles.sectionHead}>
            <span className={styles.sectionIndex}>/05</span>
            <p className={styles.eyebrow}>Trayectoria</p>
            <h2 id="experiencia-title" className={styles.sectionTitle}>
              Experiencia
            </h2>
          </div>

          <ol className={styles.jobs}>
            {experience.map((job) => (
              <li key={job.company + job.period} className={styles.job}>
                <div className={styles.jobHead}>
                  <p className={styles.jobPeriod}>{job.period}</p>
                  <h3 className={styles.jobCompany}>{job.company}</h3>
                  <p className={styles.jobRole}>{job.role}</p>
                </div>
                <div className={styles.jobBody}>
                  <ul className={styles.jobList}>
                    {job.highlights.slice(0, VISIBLE_HIGHLIGHTS).map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                  {job.highlights.length > VISIBLE_HIGHLIGHTS && (
                    <details className={styles.more}>
                      <summary>+ {job.highlights.length - VISIBLE_HIGHLIGHTS} más</summary>
                      <ul className={styles.jobList}>
                        {job.highlights.slice(VISIBLE_HIGHLIGHTS).map((h) => (
                          <li key={h}>{h}</li>
                        ))}
                      </ul>
                    </details>
                  )}
                  <ul className={styles.stack} aria-label="Stack">
                    {job.stack.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>

          <div className={styles.skillsHead}>
            <h3 className={styles.skillsTitle}>Skills</h3>
          </div>
          <div className={styles.skills}>
            {(
              [
                ['Frontend', skills.frontend],
                ['Backend', skills.backend],
                ['Herramientas', skills.tools],
              ] as const
            ).map(([label, list]) => (
              <div key={label} className={styles.skillCol}>
                <h4>
                  {label}
                  <span>{pad(list.length)}</span>
                </h4>
                <ul>
                  {list.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ───────── Testimonios ───────── */}
        <section id="testimonios" className={`${styles.section} ${styles.sectionYellow}`} aria-labelledby="testimonios-title">
          <div className={styles.sectionHead}>
            <span className={styles.sectionIndex}>/06</span>
            <p className={styles.eyebrow}>Lo que dicen</p>
            <h2 id="testimonios-title" className={styles.sectionTitle}>
              Testimonios
            </h2>
          </div>
          <ul className={styles.quotes}>
            {testimonials.map((t, i) => (
              <li key={t.name} className={`${styles.quote} ${i === 0 ? styles.quoteLead : ''}`}>
                <figure>
                  <blockquote>
                    <p>{t.quote}</p>
                  </blockquote>
                  <figcaption>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>

        <Marquee tone="black" />

        {/* ───────── Contacto ───────── */}
        <section id="contacto" className={styles.contact} aria-labelledby="contacto-title">
          <div className={styles.contactInner}>
            <span className={styles.sectionIndex}>/07</span>
            <p className={styles.eyebrow}>{contact.title}</p>
            <h2 id="contacto-title" className={styles.contactTitle}>
              {contact.cta}
            </h2>
            <p className={styles.contactSub}>{contact.subtitle}</p>
          </div>
          <a href={`mailto:${contact.email}`} className={styles.contactMail}>
            <span className={styles.contactMailLabel}>Email</span>
            <span className={styles.contactMailValue}>{contact.email}</span>
            <span className={styles.contactArrow} aria-hidden="true">
              →
            </span>
          </a>
          <ul className={styles.socials}>
            {contact.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                  <span className={styles.srOnly}> (se abre en otra pestaña)</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* ───────── Footer ───────── */}
      <footer className={styles.footer}>
        <p className={styles.footerName} aria-hidden="true">
          Seiler
        </p>
        <div className={styles.footerRow}>
          <p>{footer.tagline}</p>
          <p>
            © {year} {profile.name} — {profile.studio}
          </p>
          <a href="#top">Volver arriba ↑</a>
        </div>
      </footer>
    </div>
  );
}
