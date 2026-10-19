// design-exploration/mejoras/option-06 · Rótulos fijos
// Lectura editorial en dos columnas: el rótulo de cada sección (número, eyebrow,
// título y bajada) queda fijo a la izquierda mientras el contenido corre a la
// derecha. El proceso pasa a ser una línea de tiempo vertical, sin el zigzag.
// En mobile el rótulo se vuelve una barra fina sticky que indica la sección.
import type { Metadata } from 'next';
import Image from 'next/image';
import type { ReactNode } from 'react';
import Reveal from '../../_shared/Reveal';
import { content, featuredProjects } from '../../_shared/content';
import SectionBar from './SectionBar';
import styles from './option.module.css';

export const metadata: Metadata = {
  title: 'Mejora 06 · Rótulos fijos — Exploración',
};

const { profile, stats, principles, process, services, skills, testimonials, contact, footer } = content;

const SECTIONS = [
  { id: 'servicios', num: '01', label: 'Servicios' },
  { id: 'casos', num: '02', label: 'Case studies' },
  { id: 'por-que', num: '03', label: 'Por qué' },
  { id: 'proceso', num: '04', label: 'Proceso' },
  { id: 'stack', num: '05', label: 'Stack' },
  { id: 'testimonios', num: '06', label: 'Testimonios' },
  { id: 'contacto', num: '07', label: 'Contacto' },
];

const NAV = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#casos', label: 'Case studies' },
  { href: '#proceso', label: 'Proceso' },
  { href: '#testimonios', label: 'Testimonios' },
];

const SKILL_GROUPS: { key: keyof typeof skills; label: string }[] = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'tools', label: 'Herramientas' },
];

const CASES = featuredProjects.slice(0, 6);

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function Section({
  id,
  num,
  eyebrow,
  title,
  lead,
  tone,
  children,
}: {
  id: string;
  num: string;
  eyebrow: string;
  title: string;
  lead?: string;
  tone?: 'velo' | 'dark';
  children: ReactNode;
}) {
  const toneClass = tone === 'velo' ? styles.toneVelo : tone === 'dark' ? styles.toneDark : '';
  return (
    <section id={id} className={`${styles.section} ${toneClass}`} aria-labelledby={`${id}-title`}>
      <div className={styles.grid}>
        <div className={styles.rail}>
          <div className={styles.railSticky}>
            <p className={styles.railNum}>
              <span>{num}</span>
              <span className={styles.railTotal} aria-hidden="true">
                / 07
              </span>
            </p>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h2 id={`${id}-title`} className={styles.h2}>
              {title}
            </h2>
            {lead && <p className={styles.lead}>{lead}</p>}
          </div>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </section>
  );
}

export default function RotulosFijosPage() {
  const [mainQuote, ...otherQuotes] = testimonials;

  return (
    <div className={`dx-root ${styles.root}`} lang="es">
      <a className="dx-skip" href="#main">
        Saltar al contenido
      </a>

      {/* ───────────── Header ───────────── */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="#main" className={styles.logo} aria-label={`${profile.name} · Inicio`}>
            <img src="/brand-header.svg" alt="" width={1080} height={402} />
          </a>
          <nav aria-label="Principal" className={styles.nav}>
            <ul>
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className={styles.navLink}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a href="#contacto" className={`${styles.btn} ${styles.btnSm}`}>
            <span className={styles.ctaLong}>{contact.cta}</span>
            <span className={styles.ctaShort}>Contacto</span>
          </a>
        </div>
      </header>

      <main id="main">
        {/* ───────────── Hero ───────────── */}
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.grid}>
            <div className={styles.heroRail}>
              <p className={styles.railNum}>
                <span>00</span>
                <span className={styles.railTotal} aria-hidden="true">
                  / 07
                </span>
              </p>
              <p className={styles.eyebrow}>{profile.studio}</p>
              <dl className={styles.heroMeta}>
                <div>
                  <dt>Con</dt>
                  <dd>{profile.name}</dd>
                </div>
                <div>
                  <dt>Desde</dt>
                  <dd>{profile.location}</dd>
                </div>
                <div>
                  <dt>Para</dt>
                  <dd>{profile.reach}</dd>
                </div>
              </dl>
            </div>
            <div className={styles.heroBody}>
              <h1 id="hero-title" className={styles.h1}>
                {profile.headline.before}
                <span className={styles.highlight}>{profile.headline.highlight}</span>
                {profile.headline.after}
              </h1>
              <p className={styles.heroIntro}>{profile.intro}</p>
              <div className={styles.heroCtas}>
                <a href="#contacto" className={styles.btn}>
                  {contact.cta}
                </a>
                <a href="#casos" className={styles.btnGhost}>
                  Ver case studies
                </a>
              </div>
              <ul className={styles.stats}>
                {stats.map((s) => (
                  <li key={s.label}>
                    <span className={styles.statValue}>{s.value}</span>
                    <span className={styles.statLabel}>{s.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Índice de lectura: anticipa el recorrido de la home. */}
          <nav aria-label="Secciones de la página" className={styles.index}>
            <ol>
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className={styles.indexLink}>
                    <span className={styles.indexNum}>{s.num}</span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </section>

        <SectionBar items={SECTIONS} />

        {/* ───────────── 01 Servicios ───────────── */}
        <Section
          id="servicios"
          num="01"
          eyebrow="Servicios"
          title="Lo que construimos"
          lead={profile.tagline}
        >
          <ol className={styles.services}>
            {services.map((s, i) => (
              <Reveal as="li" key={s.title} className={styles.service}>
                <span className={styles.serviceNo} aria-hidden="true">
                  {pad(i + 1)}
                </span>
                <div className={styles.serviceHead}>
                  <h3 className={styles.h3}>{s.title}</h3>
                  {s.tags.length > 0 && (
                    <ul className={styles.tags} aria-label="Especialidades">
                      {s.tags.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <p className={styles.serviceDesc}>{s.description}</p>
              </Reveal>
            ))}
          </ol>
        </Section>

        {/* ───────────── 02 Case studies ───────────── */}
        <Section
          id="casos"
          num="02"
          eyebrow="Case studies"
          title="Proyectos seleccionados"
          lead={profile.bio[4]}
          tone="velo"
        >
          <ol className={styles.cases}>
            {CASES.map((p, i) => (
              <Reveal as="li" key={p.slug}>
                <article className={styles.case}>
                  <a href={p.caseStudyUrl} className={styles.caseFigure} tabIndex={-1} aria-hidden="true">
                    {p.image && (
                      <Image
                        src={p.image}
                        alt=""
                        fill
                        sizes="(min-width: 1100px) 300px, (min-width: 700px) 40vw, 100vw"
                        className={styles.caseImg}
                        priority={i === 0}
                      />
                    )}
                  </a>
                  <div className={styles.caseText}>
                    <p className={styles.caseMeta}>
                      <span className={styles.caseIdx}>{pad(i + 1)}</span>
                      {p.industry && <span>{p.industry}</span>}
                    </p>
                    <h3 className={styles.caseTitle}>
                      <a href={p.caseStudyUrl} className={styles.caseLink}>
                        {p.title}
                      </a>
                    </h3>
                    {p.subtitle && <p className={styles.caseSub}>{p.subtitle}</p>}
                    <ul className={styles.chips} aria-label="Stack">
                      {p.stack.slice(0, 4).map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                    <p className={styles.caseActions}>
                      <a href={p.caseStudyUrl} className={styles.textLink}>
                        Ver caso<span className={styles.srOnly}> de {p.title}</span>
                        <span aria-hidden="true"> →</span>
                      </a>
                      {p.liveUrl && (
                        <a href={p.liveUrl} className={styles.textLinkMuted} target="_blank" rel="noopener noreferrer">
                          Sitio en vivo<span className={styles.srOnly}> de {p.title} (abre en una pestaña nueva)</span>
                          <span aria-hidden="true"> ↗</span>
                        </a>
                      )}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ol>
          <p className={styles.moreRow}>
            <a href="/projects" className={styles.btnGhost}>
              Ver todos los case studies
            </a>
          </p>
        </Section>

        {/* ───────────── 03 Por qué ───────────── */}
        <Section id="por-que" num="03" eyebrow={profile.aboutSubtitle} title={profile.aboutTitle} lead={profile.bio[0]}>
          <ol className={styles.principles}>
            {principles.map((p, i) => (
              <Reveal as="li" key={p.title} className={styles.principle} delay={i * 60}>
                <p className={styles.principleEyebrow}>{p.eyebrow}</p>
                <h3 className={styles.h3}>{p.title}</h3>
                <p className={styles.small}>{p.description}</p>
              </Reveal>
            ))}
          </ol>
          <div className={styles.bio}>
            {profile.bio.slice(1, 4).map((b) => (
              <p key={b}>{b}</p>
            ))}
          </div>
        </Section>

        {/* ───────────── 04 Proceso ───────────── */}
        <Section
          id="proceso"
          num="04"
          eyebrow="Proceso"
          title="Cómo trabajamos"
          lead={principles[2].description}
          tone="velo"
        >
          <ol className={styles.timeline}>
            {process.map((s, i) => (
              <Reveal as="li" key={s.title} className={styles.step}>
                <span className={styles.node} aria-hidden="true">
                  {pad(i + 1)}
                </span>
                <div className={styles.stepBody}>
                  <p className={styles.stepLabel}>Etapa {i + 1}</p>
                  <h3 className={styles.h3}>{s.title}</h3>
                  <p className={styles.small}>{s.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Section>

        {/* ───────────── 05 Stack ───────────── */}
        <Section id="stack" num="05" eyebrow="Stack" title="Herramientas de oficio">
          <div className={styles.skillGroups}>
            {SKILL_GROUPS.map((g) => (
              <Reveal key={g.key} className={styles.skillGroup}>
                <h3 className={styles.skillTitle}>{g.label}</h3>
                <ul className={styles.skillList}>
                  {skills[g.key].map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ───────────── 06 Testimonios ───────────── */}
        <Section id="testimonios" num="06" eyebrow="Testimonios" title="Lo que dicen" tone="velo">
          <Reveal as="figure" className={styles.pullquote}>
            <blockquote>
              <p>“{mainQuote.quote}”</p>
            </blockquote>
            <figcaption>
              <strong>{mainQuote.name}</strong>
              <span>{mainQuote.role}</span>
            </figcaption>
          </Reveal>
          <div className={styles.quotes}>
            {otherQuotes.map((t) => (
              <Reveal as="figure" key={t.name} className={styles.quote}>
                <blockquote>
                  <p>{t.quote}</p>
                </blockquote>
                <figcaption>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </figcaption>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ───────────── 07 Contacto ───────────── */}
        <Section id="contacto" num="07" eyebrow="Contacto" title={contact.title} lead={contact.subtitle} tone="dark">
          <div className={styles.contactBox}>
            <p className={styles.contactBig}>{contact.cta}</p>
            <a href={`mailto:${contact.email}`} className={styles.btnLight}>
              Escribinos
            </a>
            <p className={styles.contactEmail}>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
            <ul className={styles.socials}>
              {contact.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                    <span className={styles.srOnly}> (abre en una pestaña nueva)</span>
                    <span aria-hidden="true"> ↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <img src="/brand-header-dark.svg" alt={profile.name} width={1080} height={402} className={styles.footerLogo} />
          <p className={styles.footerTag}>{footer.tagline}</p>
          <p className={styles.footerMeta}>
            {profile.location} <span aria-hidden="true">·</span> {profile.reach}
          </p>
        </div>
      </footer>
    </div>
  );
}
