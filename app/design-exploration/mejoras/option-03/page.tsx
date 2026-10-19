// design-exploration/mejoras/option-03 · Casos primero
// La marca no cambia; cambia el orden. Hero compacto y, enseguida, el trabajo:
// un caso destacado a todo el ancho con captura limpia y ficha (problema, rol,
// industria, ubicación, stack), después filas alternadas imagen / texto y un
// link a todos los case studies. El resto de la home sigue, más compacto.
import type { Metadata } from 'next';
import Image from 'next/image';
import Reveal from '../../_shared/Reveal';
import { content, featuredProjects, type Project } from '../../_shared/content';
import styles from './option.module.css';

export const metadata: Metadata = {
  title: 'Mejora 03 · Casos primero — Exploración',
};

const { profile, stats, principles, process, services, skills, testimonials, contact, footer } = content;

const NAV = [
  { href: '#casos', label: 'Case studies' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#proceso', label: 'Proceso' },
  { href: '#contacto', label: 'Contacto' },
];

const SKILL_GROUPS: { key: keyof typeof skills; label: string }[] = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'tools', label: 'Herramientas' },
];

const pad = (n: number) => String(n).padStart(2, '0');
/** Primer párrafo del problema: el resto vive en el case study. */
const firstParagraph = (text?: string) => text?.split('\n')[0]?.trim();
const locationsLabel = (p: Project) => p.locations.map((l) => l.label).join(' · ');

export default function CasosPrimeroPage() {
  const [lead, ...others] = featuredProjects;
  const rows = others.slice(0, 5);
  const [q1, q2, q3, ...moreQuotes] = testimonials;

  return (
    <div className={`dx-root ${styles.root}`} lang="es">
      <a className="dx-skip" href="#main">
        Saltar al contenido
      </a>

      {/* ───────────── Cabecera ───────────── */}
      <header className={styles.header}>
        <div className={`${styles.wrap} ${styles.headerInner}`}>
          <a href="#main" className={styles.logo} aria-label={`${profile.name} · ${profile.studio}, inicio`}>
            <img src="/brand-header.svg" alt="" width={1080} height={402} />
          </a>
          <nav aria-label="Principal" className={styles.navDesktop}>
            <ul className={styles.navList}>
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className={styles.navLink}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a href="#contacto" className={`${styles.btn} ${styles.btnSm} ${styles.headerCta}`}>
            Hablemos
          </a>
          <details className={styles.menu}>
            <summary className={styles.menuBtn}>
              <span className={styles.srOnly}>Abrir menú</span>
              <span className={styles.burger} aria-hidden="true" />
            </summary>
            <nav aria-label="Principal (móvil)" className={styles.menuPanel}>
              <ul>
                {NAV.map((n) => (
                  <li key={n.href}>
                    <a href={n.href} className={styles.menuLink}>
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </details>
        </div>
      </header>

      <main id="main" className={styles.main}>
        {/* ───────────── Hero compacto ───────────── */}
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={`${styles.wrap} ${styles.heroGrid}`}>
            <div>
              <p className={styles.eyebrow}>
                {profile.studio} <span aria-hidden="true">·</span> {profile.location}
              </p>
              <h1 id="hero-title" className={styles.h1}>
                {profile.headline.before}
                <span className={styles.highlight}>{profile.headline.highlight}</span>
                {profile.headline.after}
              </h1>
            </div>
            <div className={styles.heroSide}>
              <p className={styles.lede}>{profile.intro}</p>
              <div className={styles.ctaRow}>
                <a href="#casos" className={styles.btn}>
                  Ver case studies
                </a>
                <a href="#contacto" className={`${styles.btn} ${styles.btnGhost}`}>
                  {contact.cta}
                </a>
              </div>
            </div>
          </div>
          <div className={styles.wrap}>
            <ul className={styles.stats} aria-label="El estudio en cifras">
              {stats.map((s) => (
                <li key={s.label}>
                  <span className={styles.statValue}>{s.value}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </li>
              ))}
              <li className={styles.statReach}>
                <span className={styles.statLabel}>Mercados</span>
                <span className={styles.reach}>{profile.reach}</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ───────────── Case studies ───────────── */}
        <section className={styles.cases} aria-labelledby="casos" id="casos-sec">
          <div className={styles.wrap}>
            <header className={styles.sectionHead}>
              <p className={styles.eyebrow}>Trabajo seleccionado</p>
              <h2 id="casos" className={styles.h2}>
                Case studies
              </h2>
            </header>

            {/* Caso destacado */}
            <Reveal as="article" className={styles.lead}>
              <a href={lead.caseStudyUrl} className={styles.leadShot} tabIndex={-1} aria-hidden="true">
                {lead.image && (
                  <Image
                    src={lead.image}
                    alt=""
                    width={1722}
                    height={914}
                    sizes="(min-width: 1320px) 1240px, 100vw"
                    className={styles.shotImg}
                    priority
                  />
                )}
              </a>
              <div className={styles.leadBody}>
                <div className={styles.leadMain}>
                  <p className={styles.caseNo}>
                    <span>{pad(1)}</span> {lead.industry}
                  </p>
                  <h3 className={styles.leadTitle}>
                    <a href={lead.caseStudyUrl} className={styles.titleLink}>
                      {lead.title}
                    </a>
                  </h3>
                  {lead.subtitle && <p className={styles.leadSub}>{lead.subtitle}</p>}
                  {lead.problem && (
                    <div className={styles.problem}>
                      <h4 className={styles.metaLabel}>El problema</h4>
                      <p>{firstParagraph(lead.problem)}</p>
                    </div>
                  )}
                  <CaseLinks project={lead} />
                </div>
                <CaseMeta project={lead} className={styles.leadMeta} />
              </div>
            </Reveal>

            {/* Filas alternadas */}
            <ol className={styles.rows}>
              {rows.map((p, i) => (
                <Reveal as="li" key={p.slug} className={`${styles.row} ${i % 2 ? styles.rowFlip : ''}`}>
                  <article className={styles.rowInner}>
                    <a href={p.caseStudyUrl} className={styles.rowShot} tabIndex={-1} aria-hidden="true">
                      {p.image && (
                        <Image
                          src={p.image}
                          alt=""
                          width={1722}
                          height={914}
                          sizes="(min-width: 1100px) 680px, 100vw"
                          className={styles.shotImg}
                        />
                      )}
                    </a>
                    <div className={styles.rowBody}>
                      <p className={styles.caseNo}>
                        <span>{pad(i + 2)}</span> {p.industry}
                      </p>
                      <h3 className={styles.rowTitle}>
                        <a href={p.caseStudyUrl} className={styles.titleLink}>
                          {p.title}
                        </a>
                      </h3>
                      {p.subtitle && <p className={styles.rowSub}>{p.subtitle}</p>}
                      {p.problem && <p className={styles.rowProblem}>{firstParagraph(p.problem)}</p>}
                      <CaseMeta project={p} compact />
                      <CaseLinks project={p} />
                    </div>
                  </article>
                </Reveal>
              ))}
            </ol>

            <p className={styles.allCases}>
              <a href="/projects" className={`${styles.btn} ${styles.btnGhost}`}>
                Ver todos los case studies <span aria-hidden="true">→</span>
              </a>
            </p>
          </div>
        </section>

        {/* ───────────── Servicios ───────────── */}
        <section className={styles.services} aria-labelledby="servicios" id="servicios-sec">
          <div className={styles.wrap}>
            <header className={styles.sectionHeadSplit}>
              <div>
                <p className={styles.eyebrow}>Servicios</p>
                <h2 id="servicios" className={styles.h2}>
                  Lo que construimos
                </h2>
              </div>
              <p className={styles.sectionLede}>{profile.tagline}</p>
            </header>
            <ul className={styles.serviceGrid}>
              {services.map((s, i) => (
                <Reveal as="li" key={s.title} className={styles.service} delay={(i % 3) * 70}>
                  <p className={styles.serviceShort}>{s.short}</p>
                  <h3 className={styles.h3}>{s.title}</h3>
                  <p className={styles.small}>{s.description}</p>
                  {s.tags.length > 0 && (
                    <ul className={styles.tags} aria-label="Especialidades">
                      {s.tags.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  )}
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ───────────── Por qué / principios ───────────── */}
        <section className={styles.why} aria-labelledby="estudio">
          <div className={`${styles.wrap} ${styles.whyGrid}`}>
            <div className={styles.whyIntro}>
              <p className={styles.eyebrowDark}>{profile.aboutSubtitle}</p>
              <h2 id="estudio" className={styles.h2Dark}>
                {profile.aboutTitle}
              </h2>
              <p className={styles.whyText}>{profile.bio[0]}</p>
              <p className={styles.whyText}>{profile.bio[1]}</p>
            </div>
            <ol className={styles.principles}>
              {principles.map((p, i) => (
                <Reveal as="li" key={p.title} className={styles.principle} delay={i * 70}>
                  <p className={styles.principleEyebrow}>{p.eyebrow}</p>
                  <h3 className={styles.principleTitle}>{p.title}</h3>
                  <p className={styles.principleText}>{p.description}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ───────────── Proceso ───────────── */}
        <section className={styles.process} aria-labelledby="proceso" id="proceso-sec">
          <div className={styles.wrap}>
            <header className={styles.sectionHead}>
              <p className={styles.eyebrow}>Proceso</p>
              <h2 id="proceso" className={styles.h2}>
                Cómo trabajamos
              </h2>
            </header>
            <ol className={styles.steps}>
              {process.map((s, i) => (
                <Reveal as="li" key={s.title} className={styles.step} delay={i * 70}>
                  <span className={styles.stepNo} aria-hidden="true">
                    {pad(i + 1)}
                  </span>
                  <h3 className={styles.h3}>{s.title}</h3>
                  <p className={styles.small}>{s.description}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ───────────── Stack ───────────── */}
        <section className={styles.stack} aria-labelledby="stack">
          <div className={styles.wrap}>
            <div className={styles.stackGrid}>
              <header>
                <p className={styles.eyebrow}>Stack</p>
                <h2 id="stack" className={styles.h2}>
                  Herramientas
                </h2>
              </header>
              <div className={styles.skillCols}>
                {SKILL_GROUPS.map((g) => (
                  <div key={g.key}>
                    <h3 className={styles.metaLabel}>{g.label}</h3>
                    <ul className={styles.chips}>
                      {skills[g.key].map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───────────── Testimonios ───────────── */}
        <section className={styles.voices} aria-labelledby="testimonios">
          <div className={styles.wrap}>
            <header className={styles.sectionHead}>
              <p className={styles.eyebrow}>Testimonios</p>
              <h2 id="testimonios" className={styles.h2}>
                Lo que dicen
              </h2>
            </header>
            <div className={styles.quoteGrid}>
              {[q1, q2, q3].map((t, i) => (
                <Quote key={t.name} t={t} delay={i * 70} />
              ))}
            </div>
            {moreQuotes.length > 0 && (
              <details className={styles.moreQuotes}>
                <summary className={styles.moreSummary}>Ver {moreQuotes.length} testimonios más</summary>
                <div className={styles.quoteGrid}>
                  {moreQuotes.map((t) => (
                    <Quote key={t.name} t={t} />
                  ))}
                </div>
              </details>
            )}
          </div>
        </section>

        {/* ───────────── Contacto ───────────── */}
        <section className={styles.contact} aria-labelledby="contacto" id="contacto-sec">
          <div className={`${styles.wrap} ${styles.contactInner}`}>
            <img src="/brand-isotipo.svg" alt="" className={styles.contactPanda} width={96} height={96} />
            <h2 id="contacto" className={styles.contactTitle}>
              {contact.title}
            </h2>
            <p className={styles.contactText}>{contact.subtitle}</p>
            <div className={styles.ctaRowCenter}>
              <a href={`mailto:${contact.email}`} className={`${styles.btn} ${styles.btnLight}`}>
                {contact.cta}
              </a>
            </div>
            <p className={styles.contactEmail}>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
          </div>
        </section>
      </main>

      {/* ───────────── Pie ───────────── */}
      <footer className={styles.footer}>
        <div className={`${styles.wrap} ${styles.footerInner}`}>
          <div>
            <img
              src="/brand-header-dark.svg"
              alt={`${profile.name} · ${profile.studio}`}
              className={styles.footerLogo}
              width={1080}
              height={402}
            />
            <p className={styles.footerTag}>{footer.tagline}</p>
          </div>
          <div className={styles.footerMeta}>
            <p>{profile.location}</p>
            <p>{profile.reach}</p>
            <ul className={styles.socials}>
              {contact.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                    {s.label}
                    <span className={styles.srOnly}> (abre en una pestaña nueva)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CaseMeta({ project: p, compact, className }: { project: Project; compact?: boolean; className?: string }) {
  const stack = compact ? p.stack.slice(0, 6) : p.stack;
  return (
    <dl className={`${styles.meta} ${compact ? styles.metaCompact : ''} ${className ?? ''}`}>
      {p.role && (
        <div>
          <dt className={styles.metaLabel}>Rol</dt>
          <dd>{p.role}</dd>
        </div>
      )}
      {!compact && p.industry && (
        <div className={styles.metaIndustry}>
          <dt className={styles.metaLabel}>Industria</dt>
          <dd>{p.industry}</dd>
        </div>
      )}
      {p.locations.length > 0 && (
        <div>
          <dt className={styles.metaLabel}>Ubicación</dt>
          <dd>{locationsLabel(p)}</dd>
        </div>
      )}
      {stack.length > 0 && (
        <div className={styles.metaStack}>
          <dt className={styles.metaLabel}>Stack</dt>
          <dd>
            <ul className={styles.chips}>
              {stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
              {compact && p.stack.length > stack.length && (
                <li className={styles.chipMore}>+{p.stack.length - stack.length}</li>
              )}
            </ul>
          </dd>
        </div>
      )}
    </dl>
  );
}

function CaseLinks({ project: p }: { project: Project }) {
  return (
    <p className={styles.caseLinks}>
      <a href={p.caseStudyUrl} className={`${styles.btn} ${styles.btnSm}`}>
        Ver caso<span className={styles.srOnly}> de {p.title}</span> <span aria-hidden="true">→</span>
      </a>
      {p.liveUrl && (
        <a href={p.liveUrl} className={styles.textLink} target="_blank" rel="noopener noreferrer">
          Ver sitio<span className={styles.srOnly}> de {p.title} (abre en una pestaña nueva)</span>
          <span aria-hidden="true"> ↗</span>
        </a>
      )}
    </p>
  );
}

function Quote({ t, delay = 0 }: { t: (typeof testimonials)[number]; delay?: number }) {
  return (
    <Reveal as="figure" className={styles.quote} delay={delay}>
      <blockquote>
        <p>“{t.quote}”</p>
      </blockquote>
      <figcaption>
        <span className={styles.quoteName}>{t.name}</span>
        <span className={styles.quoteRole}>{t.role}</span>
      </figcaption>
    </Reveal>
  );
}
