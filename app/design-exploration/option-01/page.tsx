// design-exploration/option-01 · Editorial
// Mucho blanco, serif grande y ritmo de lectura pausado: el portafolio compuesto
// como un ensayo. Grilla con columna de margen para rótulos y números de sección.
import type { Metadata } from 'next';
import Image from 'next/image';
import { Inter, Newsreader } from 'next/font/google';
import Reveal from '../_shared/Reveal';
import { content, featuredProjects } from '../_shared/content';
import styles from './option.module.css';

const serif = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--ed-serif',
  display: 'swap',
});
const sans = Inter({ subsets: ['latin'], variable: '--ed-sans', display: 'swap' });

export const metadata: Metadata = {
  title: '01 · Editorial — Exploración',
};

const { profile, stats, principles, process, services, experience, skills, testimonials, contact, footer } = content;

const NAV = [
  { href: '#estudio', label: 'Estudio' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#trayectoria', label: 'Trayectoria' },
  { href: '#contacto', label: 'Contacto' },
];

const SKILL_GROUPS: { key: keyof typeof skills; label: string }[] = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'tools', label: 'Herramientas' },
];

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function SectionHead({ numeral, label, id, title }: { numeral: string; label: string; id: string; title: string }) {
  return (
    <header className={styles.sectionHead}>
      <p className={styles.margin}>
        <span className={styles.numeral}>{numeral}</span>
        <span className={styles.marginLabel}>{label}</span>
      </p>
      <h2 id={id} className={styles.h2}>
        {title}
      </h2>
    </header>
  );
}

export default function EditorialPage() {
  const fontVars = `${serif.variable} ${sans.variable}`;
  const [lead, ...rest] = featuredProjects;
  const [firstBio, ...moreBio] = profile.bio;
  const [mainQuote, ...otherQuotes] = testimonials;

  return (
    <div className={`dx-root ${styles.root} ${fontVars}`} lang="es">
      <a className="dx-skip" href="#main">
        Saltar al contenido
      </a>

      <header className={styles.masthead}>
        <div className={styles.mastInner}>
          <a href="#main" className={styles.wordmark}>
            {profile.name}
            <span className={styles.wordmarkStudio}>{profile.studio}</span>
          </a>
          <nav aria-label="Principal">
            <ul className={styles.nav}>
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className={styles.navLink}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main id="main">
        {/* ───────────── Portada ───────────── */}
        <section className={styles.hero} aria-labelledby="hero-title">
          <p className={styles.kicker}>
            {profile.studio} <span aria-hidden="true">·</span> {profile.location}
          </p>
          <h1 id="hero-title" className={styles.h1}>
            {profile.headline.before}
            <em className={styles.accent}>{profile.headline.highlight}</em>
            {profile.headline.after}
          </h1>
          <div className={styles.heroFoot}>
            <p className={styles.intro}>{profile.intro}</p>
            <dl className={styles.heroMeta}>
              <div>
                <dt>Con</dt>
                <dd>{profile.name}</dd>
              </div>
              <div>
                <dt>Rol</dt>
                <dd>{profile.role}</dd>
              </div>
              <div>
                <dt>Alcance</dt>
                <dd>{profile.reach}</dd>
              </div>
            </dl>
          </div>
          <p className={styles.heroCta}>
            <a href="#proyectos" className={styles.textLink}>
              Leer los proyectos
            </a>
            <span aria-hidden="true" className={styles.sep}>
              /
            </span>
            <a href={`mailto:${contact.email}`} className={styles.textLink}>
              {contact.cta}
            </a>
          </p>
        </section>

        {/* ───────────── I. Estudio ───────────── */}
        <section className={styles.section} aria-labelledby="estudio" id="estudio-sec">
          <SectionHead numeral="I" label={profile.aboutSubtitle} id="estudio" title={profile.aboutTitle} />
          <div className={styles.body}>
            <Reveal>
              <p className={`${styles.prose} ${styles.dropcap}`}>{firstBio}</p>
            </Reveal>
            {moreBio.map((p, i) => (
              <Reveal key={i}>
                <p className={styles.prose}>{p}</p>
              </Reveal>
            ))}

            <Reveal>
              <ul className={styles.stats}>
                {stats.map((s) => (
                  <li key={s.label} className={styles.stat}>
                    <span className={styles.statValue}>{s.value}</span>
                    <span className={styles.statLabel}>{s.label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <ol className={styles.principles}>
              {principles.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 80} className={styles.principle}>
                  <p className={styles.eyebrow}>{p.eyebrow}</p>
                  <h3 className={styles.h3}>{p.title}</h3>
                  <p className={styles.small}>{p.description}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ───────────── II. Proyectos ───────────── */}
        <section className={styles.section} aria-labelledby="proyectos" id="proyectos-sec">
          <SectionHead numeral="II" label="Case studies" id="proyectos" title="Proyectos seleccionados" />

          <Reveal as="article" className={styles.lead}>
            <div className={styles.leadFigure}>
              {lead.image && (
                <Image
                  src={lead.image}
                  alt={lead.title}
                  fill
                  sizes="(min-width: 1100px) 760px, 100vw"
                  className={styles.img}
                  priority
                />
              )}
            </div>
            <div className={styles.leadText}>
              <p className={styles.figNo}>Fig. 01 — {lead.industry}</p>
              <h3 className={styles.leadTitle}>
                <a href={lead.caseStudyUrl} className={styles.titleLink}>
                  {lead.title}
                </a>
              </h3>
              {lead.subtitle && <p className={styles.subtitle}>{lead.subtitle}</p>}
              <p className={styles.small}>{lead.description}</p>
              <p className={styles.stack}>{lead.stack.join(' · ')}</p>
              <ProjectLinks caseStudyUrl={lead.caseStudyUrl} liveUrl={lead.liveUrl} title={lead.title} />
            </div>
          </Reveal>

          <ol className={styles.projectGrid}>
            {rest.map((p, i) => (
              <Reveal as="li" key={p.slug} className={styles.project} delay={(i % 2) * 90}>
                <article>
                  <div className={styles.figure}>
                    {p.image && (
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(min-width: 1100px) 540px, (min-width: 768px) 45vw, 100vw"
                        className={styles.img}
                      />
                    )}
                  </div>
                  <p className={styles.figNo}>
                    Fig. {pad(i + 2)} — {p.industry}
                  </p>
                  <h3 className={styles.projectTitle}>
                    <a href={p.caseStudyUrl} className={styles.titleLink}>
                      {p.title}
                    </a>
                  </h3>
                  {p.subtitle && <p className={styles.subtitleSm}>{p.subtitle}</p>}
                  <p className={styles.stack}>{p.stack.slice(0, 6).join(' · ')}</p>
                  <ProjectLinks caseStudyUrl={p.caseStudyUrl} liveUrl={p.liveUrl} title={p.title} />
                </article>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* ───────────── III. Servicios ───────────── */}
        <section className={styles.section} aria-labelledby="servicios">
          <SectionHead numeral="III" label="Servicios" id="servicios" title="Lo que hacemos" />
          <dl className={styles.services}>
            {services.map((s, i) => (
              <Reveal key={s.title} className={styles.service} delay={(i % 2) * 80}>
                <dt className={styles.serviceTitle}>
                  <span className={styles.serviceNo} aria-hidden="true">
                    {pad(i + 1)}
                  </span>
                  {s.title}
                </dt>
                <dd className={styles.small}>{s.description}</dd>
              </Reveal>
            ))}
          </dl>
        </section>

        {/* ───────────── IV. Método ───────────── */}
        <section className={styles.section} aria-labelledby="metodo">
          <SectionHead numeral="IV" label="Proceso" id="metodo" title="Cómo trabajamos" />
          <ol className={styles.process}>
            {process.map((s, i) => (
              <Reveal as="li" key={s.title} className={styles.step} delay={i * 80}>
                <span className={styles.stepNo} aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className={styles.h3}>{s.title}</h3>
                <p className={styles.small}>{s.description}</p>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* ───────────── V. Trayectoria ───────────── */}
        <section className={styles.section} aria-labelledby="trayectoria" id="trayectoria-sec">
          <SectionHead numeral="V" label="Experiencia" id="trayectoria" title="Trayectoria" />
          <ol className={styles.timeline}>
            {experience.map((job) => (
              <Reveal as="li" key={job.company + job.period} className={styles.job}>
                <p className={styles.period}>{job.period}</p>
                <div>
                  <h3 className={styles.jobTitle}>
                    {job.role}
                    <span className={styles.company}>{job.company}</span>
                  </h3>
                  <ul className={styles.highlights}>
                    {job.highlights.slice(0, 3).map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                  {job.highlights.length > 3 && (
                    <details className={styles.more}>
                      <summary>Seguir leyendo</summary>
                      <ul className={styles.highlights}>
                        {job.highlights.slice(3).map((h) => (
                          <li key={h}>{h}</li>
                        ))}
                      </ul>
                    </details>
                  )}
                  <p className={styles.stack}>{job.stack.join(' · ')}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <div className={styles.skills}>
            <h3 className={styles.skillsTitle}>Herramientas de oficio</h3>
            <div className={styles.skillCols}>
              {SKILL_GROUPS.map((g) => (
                <div key={g.key}>
                  <h4 className={styles.eyebrow}>{g.label}</h4>
                  <ul className={styles.skillList}>
                    {skills[g.key].map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── VI. Voces ───────────── */}
        <section className={styles.section} aria-labelledby="voces">
          <SectionHead numeral="VI" label="Testimonios" id="voces" title="Lo que dicen" />
          <Reveal as="figure" className={styles.pullquote}>
            <blockquote>
              <p>{mainQuote.quote}</p>
            </blockquote>
            <figcaption>
              {mainQuote.name}, <span>{mainQuote.role}</span>
            </figcaption>
          </Reveal>
          <div className={styles.quotes}>
            {otherQuotes.map((t, i) => (
              <Reveal as="figure" key={t.name} className={styles.quote} delay={(i % 3) * 70}>
                <blockquote>
                  <p>{t.quote}</p>
                </blockquote>
                <figcaption>
                  {t.name}, <span>{t.role}</span>
                </figcaption>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ───────────── Colofón / contacto ───────────── */}
        <section className={styles.contact} aria-labelledby="contacto" id="contacto-sec">
          <p className={styles.kicker}>VII · Contacto</p>
          <h2 id="contacto" className={styles.contactTitle}>
            {contact.title}
          </h2>
          <p className={styles.intro}>{contact.subtitle}</p>
          <p>
            <a href={`mailto:${contact.email}`} className={styles.email}>
              {contact.email}
            </a>
          </p>
          <ul className={styles.socials}>
            {contact.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} className={styles.textLink} target="_blank" rel="noopener noreferrer">
                  {s.label}
                  <span className={styles.srOnly}> (abre en una pestaña nueva)</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerName}>{profile.name}</p>
        <p className={styles.footerTag}>{footer.tagline}</p>
        <p className={styles.footerMeta}>
          {profile.location} <span aria-hidden="true">·</span> {profile.reach}
        </p>
      </footer>
    </div>
  );
}

function ProjectLinks({ caseStudyUrl, liveUrl, title }: { caseStudyUrl: string; liveUrl: string | null; title: string }) {
  return (
    <p className={styles.links}>
      <a href={caseStudyUrl} className={styles.textLink}>
        Ver case study<span className={styles.srOnly}> de {title}</span>
      </a>
      {liveUrl && (
        <a href={liveUrl} className={styles.textLink} target="_blank" rel="noopener noreferrer">
          Ver sitio<span className={styles.srOnly}> de {title} (abre en una pestaña nueva)</span>
          <span aria-hidden="true"> ↗</span>
        </a>
      )}
    </p>
  );
}
