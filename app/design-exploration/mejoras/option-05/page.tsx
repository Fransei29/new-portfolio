// design-exploration/mejoras/option-05 · Noche lila
// Versión oscura de punta a punta: Grafito y Lila Profundo como superficies,
// Lila Suave como luz. Glows contenidos detrás de los elementos clave, nunca
// un degradé de página entera.
import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Reveal from '../../_shared/Reveal';
import { content, featuredProjects } from '../../_shared/content';
import styles from './option.module.css';

export const metadata: Metadata = {
  title: 'Mejora 05 · Noche lila — Exploración',
};

const { profile, stats, markets, principles, process, services, skills, testimonials, contact, footer } = content;

const NAV = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#casos', label: 'Case studies' },
  { href: '#estudio', label: 'Estudio' },
  { href: '#proceso', label: 'Proceso' },
  { href: '#contacto', label: 'Contacto' },
];

const SKILL_GROUPS: { key: keyof typeof skills; label: string }[] = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend y datos' },
  { key: 'tools', label: 'Herramientas' },
];

const pad = (n: number) => String(n).padStart(2, '0');

const rootStyle = { '--dx-page-bg': '#1f1d29', '--dx-focus': '#b59cf8' } as CSSProperties;

export default function NocheLilaPage() {
  const [lead, ...others] = featuredProjects;
  const grid = others.slice(0, 6);
  const [mainQuote, ...otherQuotes] = testimonials;
  const cities = Array.from(new Set(markets.map((m) => m.city)));

  return (
    <div className={`dx-root ${styles.root}`} style={rootStyle} lang="es">
      <a className="dx-skip" href="#main">
        Saltar al contenido
      </a>

      {/* ───────────── Cabecera ───────────── */}
      <header className={styles.header}>
        <div className={`${styles.wrap} ${styles.headerInner}`}>
          <a href="#main" className={styles.logo} aria-label={`${profile.name} · ${profile.studio}, inicio`}>
            <img src="/brand-header-dark.svg" alt="" width={140} height={52} />
          </a>
          <nav aria-label="Principal" className={styles.navDesk}>
            <ul>
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <a href="#contacto" className={`${styles.btn} ${styles.btnPrimary} ${styles.headerCta}`}>
            {contact.cta}
          </a>
          <details className={styles.navMobile}>
            <summary aria-label="Abrir menú">
              <span className={styles.burger} aria-hidden="true" />
              Menú
            </summary>
            <nav aria-label="Principal (móvil)" className={styles.navPanel}>
              <ul>
                {NAV.map((n) => (
                  <li key={n.href}>
                    <a href={n.href}>{n.label}</a>
                  </li>
                ))}
              </ul>
              <a href="#contacto" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnBlock}`}>
                {contact.cta}
              </a>
            </nav>
          </details>
        </div>
      </header>

      <main id="main">
        {/* ───────────── Hero ───────────── */}
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={`${styles.wrap} ${styles.heroGrid}`}>
            <div className={styles.heroText}>
              <p className={styles.pill}>
                <span className={styles.dot} aria-hidden="true" />
                {profile.studio} <span aria-hidden="true">·</span> {profile.location}
              </p>
              <h1 id="hero-title" className={styles.h1}>
                {profile.headline.before}
                <span className={styles.highlight}>{profile.headline.highlight}</span>
                {profile.headline.after}
              </h1>
              <p className={styles.lede}>{profile.intro}</p>
              <div className={styles.ctaRow}>
                <a href="#contacto" className={`${styles.btn} ${styles.btnPrimary}`}>
                  {contact.cta}
                </a>
                <a href="#casos" className={`${styles.btn} ${styles.btnGhost}`}>
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

            <div className={styles.heroVisual}>
              <div className={styles.glowHero} aria-hidden="true" />
              <figure className={styles.browser}>
                <div className={styles.browserBar} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <em>{lead.liveUrl?.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}</em>
                </div>
                <div className={styles.browserShot}>
                  {lead.image && (
                    <Image
                      src={lead.image}
                      alt={`Captura de ${lead.title}`}
                      fill
                      priority
                      sizes="(min-width: 1024px) 600px, 100vw"
                      className={styles.cover}
                    />
                  )}
                </div>
                <figcaption className={styles.browserCap}>
                  <span className={styles.capLabel}>Último caso</span>
                  <a href={lead.caseStudyUrl}>
                    {lead.title} <span aria-hidden="true">·</span> {lead.subtitle}
                  </a>
                </figcaption>
              </figure>
            </div>
          </div>

          <div className={`${styles.wrap} ${styles.reach}`}>
            <p className={styles.reachLabel}>{profile.reach}</p>
            <ul className={styles.cities} aria-label="Ciudades con proyectos">
              {cities.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ───────────── Servicios ───────────── */}
        <section className={`${styles.section} ${styles.bgGrafito}`} aria-labelledby="servicios">
          <div className={styles.wrap}>
            <SectionHead eyebrow="Servicios" id="servicios" title="Lo que construimos" lede={profile.tagline} />
            <ul className={styles.services}>
              {services.map((s, i) => (
                <Reveal as="li" key={s.title} className={styles.card} delay={(i % 3) * 70}>
                  <div className={styles.serviceTop}>
                    <span className={styles.serviceNo} aria-hidden="true">
                      {pad(i + 1)}
                    </span>
                    <span className={styles.serviceShort}>{s.short}</span>
                  </div>
                  <h3 className={styles.h3}>{s.title}</h3>
                  <p className={styles.body}>{s.description}</p>
                  {s.tags.length > 0 && (
                    <ul className={styles.tags}>
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

        {/* ───────────── Case studies ───────────── */}
        <section className={styles.section} aria-labelledby="casos">
          <div className={styles.wrap}>
            <SectionHead eyebrow="Case studies" id="casos" title="Proyectos en producción" />

            <Reveal as="article" className={`${styles.card} ${styles.lead}`}>
              <div className={styles.leadShot}>
                <div className={styles.glowSmall} aria-hidden="true" />
                <div className={styles.shotFrame}>
                  {lead.screenshots[1] && (
                    <Image
                      src={lead.screenshots[1]}
                      alt={`Pantalla de ${lead.title}`}
                      fill
                      sizes="(min-width: 1024px) 640px, 100vw"
                      className={styles.cover}
                    />
                  )}
                </div>
              </div>
              <div className={styles.leadText}>
                <p className={styles.eyebrow}>{lead.industry}</p>
                <h3 className={styles.leadTitle}>
                  <a href={lead.caseStudyUrl} className={styles.stretch}>
                    {lead.title}
                  </a>
                </h3>
                {lead.subtitle && <p className={styles.subtitle}>{lead.subtitle}</p>}
                <p className={styles.body}>{lead.description}</p>
                {lead.role && (
                  <dl className={styles.meta}>
                    <div>
                      <dt>Rol</dt>
                      <dd>{lead.role}</dd>
                    </div>
                    {lead.locations[0] && (
                      <div>
                        <dt>Cliente en</dt>
                        <dd>{lead.locations[0].label}</dd>
                      </div>
                    )}
                  </dl>
                )}
                <ul className={styles.chips}>
                  {lead.stack.slice(0, 6).map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <span className={styles.cardLink} aria-hidden="true">
                  Ver caso →
                </span>
              </div>
            </Reveal>

            <ul className={styles.projects}>
              {grid.map((p, i) => (
                <Reveal as="li" key={p.slug} className={`${styles.card} ${styles.project}`} delay={(i % 3) * 70}>
                  <div className={styles.projectShot}>
                    {p.image && (
                      <Image
                        src={p.image}
                        alt={`Captura de ${p.title}`}
                        fill
                        sizes="(min-width: 1024px) 400px, (min-width: 700px) 50vw, 100vw"
                        className={styles.cover}
                      />
                    )}
                  </div>
                  <div className={styles.projectText}>
                    <p className={styles.eyebrow}>{p.industry}</p>
                    <h3 className={styles.h3}>
                      <a href={p.caseStudyUrl} className={styles.stretch}>
                        {p.title}
                      </a>
                    </h3>
                    {p.subtitle && <p className={styles.bodySm}>{p.subtitle}</p>}
                    <ul className={styles.chips}>
                      {p.stack.slice(0, 3).map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                    <span className={styles.cardLink} aria-hidden="true">
                      Ver caso →
                    </span>
                  </div>
                </Reveal>
              ))}
            </ul>

            <p className={styles.center}>
              <a href="/projects" className={`${styles.btn} ${styles.btnGhost}`}>
                Ver todos los case studies
              </a>
            </p>
          </div>
        </section>

        {/* ───────────── Estudio / principios ───────────── */}
        <section className={`${styles.section} ${styles.bgProfundo}`} aria-labelledby="estudio">
          <div className={styles.glowSection} aria-hidden="true" />
          <div className={`${styles.wrap} ${styles.studio}`}>
            <div className={styles.studioIntro}>
              <p className={styles.eyebrow}>{profile.aboutSubtitle}</p>
              <h2 id="estudio" className={styles.h2}>
                {profile.aboutTitle}
              </h2>
              <p className={styles.lede}>{profile.bio[0]}</p>
              <p className={styles.body}>
                {profile.bio[1]} {profile.bio[2]}
              </p>
              <div className={styles.panda}>
                <img src="/isotipo-panda-programando.svg" alt="" width={120} height={120} />
                <p className={styles.bodySm}>{profile.bio[3]}</p>
              </div>
            </div>
            <ol className={styles.principles}>
              {principles.map((p, i) => (
                <Reveal as="li" key={p.title} className={`${styles.card} ${styles.principle}`} delay={i * 80}>
                  <span className={styles.principleNo} aria-hidden="true">
                    {pad(i + 1)}
                  </span>
                  <div>
                    <p className={styles.eyebrow}>{p.eyebrow}</p>
                    <h3 className={styles.h3}>{p.title}</h3>
                    <p className={styles.body}>{p.description}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ───────────── Proceso ───────────── */}
        <section className={`${styles.section} ${styles.bgGrafito}`} aria-labelledby="proceso">
          <div className={styles.wrap}>
            <SectionHead eyebrow="Proceso" id="proceso" title="Cómo trabajamos" />
            <ol className={styles.process}>
              {process.map((s, i) => (
                <Reveal as="li" key={s.title} className={styles.step} delay={i * 80}>
                  <span className={styles.stepNo} aria-hidden="true">
                    {i + 1}
                  </span>
                  <h3 className={styles.h3}>{s.title}</h3>
                  <p className={styles.body}>{s.description}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ───────────── Stack ───────────── */}
        <section className={styles.section} aria-labelledby="stack">
          <div className={styles.wrap}>
            <SectionHead eyebrow="Stack" id="stack" title="Herramientas de trabajo" />
            <div className={styles.skills}>
              {SKILL_GROUPS.map((g, i) => (
                <Reveal key={g.key} className={`${styles.card} ${styles.skillCard}`} delay={i * 70}>
                  <h3 className={styles.skillTitle}>{g.label}</h3>
                  <ul className={styles.chips}>
                    {skills[g.key].map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── Testimonios ───────────── */}
        <section className={`${styles.section} ${styles.bgProfundo}`} aria-labelledby="voces">
          <div className={styles.wrap}>
            <SectionHead eyebrow="Testimonios" id="voces" title="Lo que dicen quienes trabajaron con nosotros" />
            <Reveal as="figure" className={styles.mainQuote}>
              <span className={styles.quoteMark} aria-hidden="true">
                “
              </span>
              <blockquote>
                <p>{mainQuote.quote}</p>
              </blockquote>
              <figcaption>
                <strong>{mainQuote.name}</strong>
                <span>{mainQuote.role}</span>
              </figcaption>
            </Reveal>
            <ul className={styles.quotes}>
              {otherQuotes.map((t, i) => (
                <Reveal as="li" key={t.name} className={`${styles.card} ${styles.quote}`} delay={(i % 3) * 70}>
                  <figure>
                    <blockquote>
                      <p>{t.quote}</p>
                    </blockquote>
                    <figcaption>
                      <span className={styles.avatar} aria-hidden="true">
                        {t.name
                          .split(' ')
                          .map((w) => w[0])
                          .join('')
                          .slice(0, 2)}
                      </span>
                      <span>
                        <strong>{t.name}</strong>
                        <span>{t.role}</span>
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </ul>
            <p className={styles.swipeHint} aria-hidden="true">
              Deslizá para ver más →
            </p>
          </div>
        </section>

        {/* ───────────── Contacto ───────────── */}
        <section className={`${styles.section} ${styles.contact}`} aria-labelledby="contacto">
          <div className={styles.wrap}>
            <Reveal className={styles.contactCard}>
              <div className={styles.glowContact} aria-hidden="true" />
              <img src="/brand-isotipo.svg" alt="" width={64} height={64} className={styles.contactIso} />
              <p className={styles.eyebrow}>Contacto</p>
              <h2 id="contacto" className={styles.contactTitle}>
                {contact.title}
              </h2>
              <p className={styles.lede}>{contact.subtitle}</p>
              <div className={`${styles.ctaRow} ${styles.ctaCenter}`}>
                <a href={`mailto:${contact.email}`} className={`${styles.btn} ${styles.btnPrimary}`}>
                  {contact.cta}
                </a>
              </div>
              <p className={styles.email}>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ───────────── Pie ───────────── */}
      <footer className={styles.footer}>
        <div className={`${styles.wrap} ${styles.footerGrid}`}>
          <div>
            <img src="/brand-header-dark.svg" alt={`${profile.name} · ${profile.studio}`} width={150} height={56} />
            <p className={styles.bodySm}>{footer.tagline}</p>
          </div>
          <nav aria-label="Secciones">
            <ul className={styles.footerList}>
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <ul className={styles.footerList}>
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
        <div className={`${styles.wrap} ${styles.footerBottom}`}>
          <span>{profile.name}</span>
          <span>
            {profile.location} <span aria-hidden="true">·</span> {profile.reach}
          </span>
        </div>
      </footer>
    </div>
  );
}

function SectionHead({ eyebrow, id, title, lede }: { eyebrow: string; id: string; title: string; lede?: string }) {
  return (
    <header className={styles.sectionHead}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 id={id} className={styles.h2}>
        {title}
      </h2>
      {lede && <p className={styles.lede}>{lede}</p>}
    </header>
  );
}
