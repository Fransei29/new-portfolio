// design-exploration/option-08 — "Consultora premium"
// Sobrio y confiable, como una firma de consultoría: principios, método y
// credenciales primero; los proyectos se presentan como compromisos con clientes.

import type { Metadata } from 'next';
import Image from 'next/image';
import { Source_Serif_4, Manrope } from 'next/font/google';
import Reveal from '../_shared/Reveal';
import { content, featuredProjects } from '../_shared/content';
import styles from './option.module.css';

const serif = Source_Serif_4({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--o8-serif',
  display: 'swap',
});

const sans = Manrope({
  subsets: ['latin'],
  variable: '--o8-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '08 · Consultora premium — Exploración',
};

const { profile, stats, markets, principles, process, services, experience, skills, testimonials, contact, footer } = content;

const NAV = [
  { href: '#firma', label: 'La firma' },
  { href: '#practica', label: 'Práctica' },
  { href: '#compromisos', label: 'Compromisos' },
  { href: '#trayectoria', label: 'Trayectoria' },
];

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

const selected = featuredProjects.slice(0, 6);
const others = featuredProjects.slice(6);

const firstParagraph = (s: string) => s.split('\n')[0];
const pad = (n: number) => String(n).padStart(2, '0');

function SectionLabel({ n, children, light }: { n: number; children: string; light?: boolean }) {
  return (
    <p className={`${styles.label} ${light ? styles.labelLight : ''}`}>
      <span className={styles.labelNum}>{ROMAN[n - 1]}</span>
      <span className={styles.labelRule} aria-hidden="true" />
      {children}
    </p>
  );
}

export default function OptionConsultora() {
  const fontVars = `${serif.variable} ${sans.variable}`;
  const year = new Date().getFullYear();
  const [lead, ...rest] = testimonials;

  return (
    <div className={`dx-root ${styles.root} ${fontVars}`} lang="es">
      <a className="dx-skip" href="#main">
        Saltar al contenido
      </a>

      {/* ───────────── Barra superior + header ───────────── */}
      <div className={styles.utility}>
        <div className={styles.container}>
          <span>{profile.location}</span>
          <span className={styles.utilityReach}>{profile.reach}</span>
        </div>
      </div>

      <header className={styles.header}>
        <div className={`${styles.container} ${styles.headerInner}`}>
          <a href="#main" className={styles.wordmark} aria-label={`${profile.name}, ${profile.studio}, inicio`}>
            <span className={styles.wordmarkName}>{profile.name}</span>
            <span className={styles.wordmarkStudio}>{profile.studio}</span>
          </a>
          <nav aria-label="Principal" className={styles.nav}>
            <ul>
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <a href="#contacto" className={styles.headerCta}>
            Contacto
          </a>
        </div>
      </header>

      <main id="main">
        {/* ───────────── Hero ───────────── */}
        <section className={styles.hero} aria-labelledby="o8-title">
          <div className={`${styles.container} ${styles.heroGrid}`}>
            <div className={styles.heroMain}>
              <p className={styles.eyebrow}>{profile.tagline}</p>
              <h1 id="o8-title" className={styles.heroTitle}>
                {profile.headline.before}
                <em>{profile.headline.highlight}</em>
                {profile.headline.after}
              </h1>
              <p className={styles.heroIntro}>{profile.intro}</p>
              <div className={styles.heroActions}>
                <a href="#contacto" className={styles.btnPrimary}>
                  {contact.cta}
                </a>
                <a href="#compromisos" className={styles.btnText}>
                  Ver compromisos <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            <aside className={styles.dossier} aria-label="Perfil de la firma">
              <p className={styles.dossierHead}>Perfil de la firma</p>
              <dl className={styles.dossierList}>
                <div>
                  <dt>Especialidad</dt>
                  <dd>{profile.role}</dd>
                </div>
                <div>
                  <dt>Sede</dt>
                  <dd>{profile.location}</dd>
                </div>
                <div>
                  <dt>Alcance</dt>
                  <dd>{profile.reach}</dd>
                </div>
                <div>
                  <dt>Ciudades con proyectos</dt>
                  <dd>
                    <ul className={styles.cityList}>
                      {markets.map((m) => (
                        <li key={m.city}>{m.city}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>

        {/* ───────────── I. La firma ───────────── */}
        <section id="firma" className={styles.section} aria-labelledby="o8-about">
          <div className={styles.container}>
            <div className={styles.split}>
              <Reveal className={styles.splitHead}>
                <SectionLabel n={1}>{profile.aboutSubtitle}</SectionLabel>
                <h2 id="o8-about" className={styles.h2}>
                  {profile.aboutTitle}
                </h2>
              </Reveal>
              <Reveal className={styles.bio}>
                <p className={styles.bioLead}>{profile.bio[0]}</p>
                <div className={styles.bioCols}>
                  {profile.bio.slice(1).map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </Reveal>
            </div>

            <dl className={styles.stats}>
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 100} className={styles.stat}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        {/* ───────────── II. Principios ───────────── */}
        <section className={`${styles.section} ${styles.dark}`} aria-labelledby="o8-principles">
          <div className={styles.container}>
            <Reveal className={styles.sectionHead}>
              <SectionLabel n={2} light>
                Forma de trabajo
              </SectionLabel>
              <h2 id="o8-principles" className={styles.h2}>
                Principios de trabajo
              </h2>
            </Reveal>
            <ol className={styles.principles}>
              {principles.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 100} className={styles.principle}>
                  <span className={styles.principleNum} aria-hidden="true">
                    {ROMAN[i]}
                  </span>
                  <p className={styles.principleEyebrow}>{p.eyebrow}</p>
                  <h3 className={styles.h3}>{p.title}</h3>
                  <p className={styles.principleText}>{p.description}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ───────────── III. Práctica ───────────── */}
        <section id="practica" className={styles.section} aria-labelledby="o8-services">
          <div className={`${styles.container} ${styles.split}`}>
            <div className={styles.splitHead}>
              <div className={styles.sticky}>
                <SectionLabel n={3}>Práctica</SectionLabel>
                <h2 id="o8-services" className={styles.h2}>
                  Servicios
                </h2>
                <p className={styles.headNote}>{footer.tagline}</p>
              </div>
            </div>
            <ol className={styles.services}>
              {services.map((s, i) => (
                <Reveal as="li" key={s.title} className={styles.service}>
                  <span className={styles.serviceNum} aria-hidden="true">
                    {pad(i + 1)}
                  </span>
                  <div>
                    <h3 className={styles.h3}>{s.title}</h3>
                    <p className={styles.serviceText}>{s.description}</p>
                    {s.tags.length > 0 && (
                      <ul className={styles.tags} aria-label="Especialidades">
                        {s.tags.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ───────────── IV. Metodología ───────────── */}
        <section className={`${styles.section} ${styles.tinted}`} aria-labelledby="o8-process">
          <div className={styles.container}>
            <Reveal className={styles.sectionHead}>
              <SectionLabel n={4}>Metodología</SectionLabel>
              <h2 id="o8-process" className={styles.h2}>
                Proceso de trabajo
              </h2>
            </Reveal>
            <ol className={styles.process}>
              {process.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 100} className={styles.phase}>
                  <p className={styles.phaseNum}>Fase {pad(i + 1)}</p>
                  <h3 className={styles.h3}>{p.title}</h3>
                  <p className={styles.phaseText}>{p.description}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ───────────── V. Compromisos ───────────── */}
        <section id="compromisos" className={styles.section} aria-labelledby="o8-work">
          <div className={styles.container}>
            <Reveal className={`${styles.sectionHead} ${styles.sectionHeadRow}`}>
              <div>
                <SectionLabel n={5}>Compromisos seleccionados</SectionLabel>
                <h2 id="o8-work" className={styles.h2}>
                  Proyectos destacados
                </h2>
              </div>
              <p className={styles.headNote}>{profile.bio[4]}</p>
            </Reveal>

            <ol className={styles.engagements}>
              {selected.map((p, i) => (
                <li key={p.slug} className={`${styles.engagement} ${i % 2 ? styles.engagementFlip : ''}`}>
                  <Reveal className={styles.engMedia}>
                    {p.image && (
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(min-width: 1100px) 680px, (min-width: 700px) 90vw, 100vw"
                        className={styles.engImg}
                      />
                    )}
                  </Reveal>
                  <Reveal className={styles.engBody} delay={80}>
                    <p className={styles.engIndex}>
                      <span>{pad(i + 1)}</span>
                      {p.industry}
                    </p>
                    <h3 className={styles.engTitle}>{p.title}</h3>
                    {p.subtitle && <p className={styles.engSub}>{p.subtitle}</p>}
                    <p className={styles.engDesc}>{firstParagraph(p.description)}</p>
                    <dl className={styles.engFacts}>
                      {p.role && (
                        <div>
                          <dt>Rol</dt>
                          <dd>{p.role}</dd>
                        </div>
                      )}
                      {p.engagement && (
                        <div>
                          <dt>Modalidad</dt>
                          <dd>{p.engagement}</dd>
                        </div>
                      )}
                      {p.locations.length > 0 && (
                        <div>
                          <dt>Ubicación</dt>
                          <dd>{p.locations.map((l) => l.label).join(' · ')}</dd>
                        </div>
                      )}
                      <div className={styles.engFactWide}>
                        <dt>Stack</dt>
                        <dd>{p.stack.slice(0, 7).join(' · ')}</dd>
                      </div>
                    </dl>
                    <div className={styles.engLinks}>
                      <a href={p.caseStudyUrl} className={styles.linkPrimary}>
                        Ver case study<span className={styles.srOnly}> de {p.title}</span> <span aria-hidden="true">→</span>
                      </a>
                      {p.liveUrl && (
                        <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.linkSecondary}>
                          Ver sitio<span className={styles.srOnly}> de {p.title} (se abre en otra pestaña)</span>{' '}
                          <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>

            {others.length > 0 && (
              <div className={styles.others}>
                <h3 className={styles.othersTitle}>Otros compromisos</h3>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th scope="col">Proyecto</th>
                      <th scope="col">Industria</th>
                      <th scope="col">Ubicación</th>
                      <th scope="col">
                        <span className={styles.srOnly}>Enlaces</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {others.map((p) => (
                      <tr key={p.slug}>
                        <th scope="row">
                          <span className={styles.tTitle}>{p.title}</span>
                          {p.subtitle && <span className={styles.tSub}>{p.subtitle}</span>}
                        </th>
                        <td data-label="Industria">{p.industry}</td>
                        <td data-label="Ubicación">{p.locations.map((l) => l.label).join(' · ') || '—'}</td>
                        <td className={styles.tLinks}>
                          <a href={p.caseStudyUrl}>
                            Case study<span className={styles.srOnly}> de {p.title}</span> <span aria-hidden="true">→</span>
                          </a>
                          {p.liveUrl && (
                            <a href={p.liveUrl} target="_blank" rel="noopener noreferrer">
                              Sitio<span className={styles.srOnly}> de {p.title} (se abre en otra pestaña)</span>{' '}
                              <span aria-hidden="true">↗</span>
                            </a>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        {/* ───────────── VI. Testimonios ───────────── */}
        <section className={`${styles.section} ${styles.tinted}`} aria-labelledby="o8-testi">
          <div className={styles.container}>
            <Reveal className={styles.sectionHead}>
              <SectionLabel n={6}>Referencias</SectionLabel>
              <h2 id="o8-testi" className={styles.h2}>
                Testimonios
              </h2>
            </Reveal>

            <Reveal as="figure" className={styles.leadQuote}>
              <blockquote>
                <p>{lead.quote}</p>
              </blockquote>
              <figcaption>
                <span className={styles.qName}>{lead.name}</span>
                <span className={styles.qRole}>{lead.role}</span>
              </figcaption>
            </Reveal>

            <ul className={styles.quotes}>
              {rest.map((t, i) => (
                <Reveal as="li" key={t.name} delay={(i % 3) * 80} className={styles.quoteItem}>
                  <figure>
                    <blockquote>
                      <p>{t.quote}</p>
                    </blockquote>
                    <figcaption>
                      <span className={styles.qName}>{t.name}</span>
                      <span className={styles.qRole}>{t.role}</span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ───────────── VII. Trayectoria ───────────── */}
        <section id="trayectoria" className={styles.section} aria-labelledby="o8-exp">
          <div className={styles.container}>
            <Reveal className={styles.sectionHead}>
              <SectionLabel n={7}>Trayectoria</SectionLabel>
              <h2 id="o8-exp" className={styles.h2}>
                Experiencia
              </h2>
            </Reveal>

            <ol className={styles.roles}>
              {experience.map((e) => (
                <Reveal as="li" key={e.company + e.period} className={styles.roleRow}>
                  <div className={styles.roleMeta}>
                    <p className={styles.rolePeriod}>{e.period}</p>
                    <h3 className={styles.roleCompany}>{e.company}</h3>
                    <p className={styles.roleTitle}>{e.role}</p>
                  </div>
                  <div className={styles.roleBody}>
                    <ul className={styles.roleHighlights}>
                      {e.highlights.slice(0, 3).map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                    <p className={styles.roleStack}>
                      <span className={styles.roleStackLabel}>Stack</span>
                      {e.stack.join(' · ')}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>

            <div className={styles.skills}>
              <h3 className={styles.skillsTitle}>Competencias técnicas</h3>
              <div className={styles.skillGrid}>
                {(
                  [
                    ['Frontend', skills.frontend],
                    ['Backend', skills.backend],
                    ['Herramientas', skills.tools],
                  ] as const
                ).map(([label, list]) => (
                  <div key={label} className={styles.skillCol}>
                    <h4 className={styles.skillLabel}>{label}</h4>
                    <ul>
                      {list.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───────────── Contacto ───────────── */}
        <section id="contacto" className={`${styles.contact} ${styles.dark}`} aria-labelledby="o8-contact">
          <div className={`${styles.container} ${styles.contactGrid}`}>
            <Reveal>
              <p className={`${styles.label} ${styles.labelLight}`}>
                <span className={styles.labelRule} aria-hidden="true" />
                {contact.cta}
              </p>
              <h2 id="o8-contact" className={styles.contactTitle}>
                {contact.title}
              </h2>
              <p className={styles.contactSub}>{contact.subtitle}</p>
            </Reveal>
            <div className={styles.contactCard}>
              <p className={styles.contactCardLabel}>Correo</p>
              <a href={`mailto:${contact.email}`} className={styles.contactEmail}>
                {contact.email}
              </a>
              <p className={styles.contactCardLabel}>Redes</p>
              <ul className={styles.socials}>
                {contact.socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer">
                      <span>{s.label}</span>
                      <span className={styles.srOnly}> (se abre en otra pestaña)</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
              <a href={`mailto:${contact.email}`} className={styles.btnGold}>
                {contact.cta}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.container} ${styles.footerGrid}`}>
          <div>
            <p className={styles.footerName}>{profile.name}</p>
            <p className={styles.footerStudio}>{profile.studio}</p>
            <p className={styles.footerTag}>{footer.tagline}</p>
          </div>
          <nav aria-label="Pie de página">
            <ul className={styles.footerNav}>
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
              <li>
                <a href="#contacto">Contacto</a>
              </li>
            </ul>
          </nav>
          <p className={styles.footerMeta}>
            <span>
              © {year} {profile.name}
            </span>
            <span>{profile.location}</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
