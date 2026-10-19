// design-exploration/option-04/page.tsx
// Dirección 04 · Suizo. Estilo tipográfico internacional: una grilla de 12
// columnas que manda sobre todo, una sola familia (Inter Tight), jerarquía por
// tamaño, peso y posición, texto alineado a la izquierda en bandera y el rojo
// reservado para señalar (marcadores, números de sección, hover).
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Inter_Tight } from 'next/font/google';
import Reveal from '../_shared/Reveal';
import { content, featuredProjects } from '../_shared/content';
import styles from './option.module.css';

const inter = Inter_Tight({ subsets: ['latin'], variable: '--s-font', display: 'swap' });
const fontVars = inter.variable;

export const metadata: Metadata = {
  title: '04 · Suizo — Exploración',
};

const { profile, stats, principles, process, services, experience, skills, testimonials, contact, footer } = content;

const nav = [
  { href: '#sobre', label: 'Sobre nosotros', no: '02' },
  { href: '#servicios', label: 'Servicios', no: '03' },
  { href: '#proyectos', label: 'Proyectos', no: '04' },
  { href: '#experiencia', label: 'Experiencia', no: '06' },
  { href: '#contacto', label: 'Contacto', no: '08' },
];

const pad = (n: number) => String(n).padStart(2, '0');

/** Los primeros N proyectos van en filas grandes; el resto en la grilla de 3. */
const LEAD_PROJECTS = 4;
const VISIBLE_HIGHLIGHTS = 3;

function SectionHead({ no, label, title, id }: { no: string; label: string; title: string; id: string }) {
  return (
    <header className={`${styles.grid} ${styles.sectionHead}`}>
      <p className={styles.sectionLabel}>
        <span className={styles.sectionNo}>{no}</span>
        {label}
      </p>
      <h2 id={id} className={styles.sectionTitle}>
        {title}
      </h2>
    </header>
  );
}

export default function OptionSwiss() {
  const year = new Date().getFullYear();
  const lead = featuredProjects.slice(0, LEAD_PROJECTS);
  const rest = featuredProjects.slice(LEAD_PROJECTS);
  const [firstQuote, ...otherQuotes] = testimonials;

  return (
    <div className={`dx-root ${styles.root} ${fontVars}`} lang="es">
      <a className="dx-skip" href="#main">
        Saltar al contenido
      </a>

      <header className={styles.header}>
        <div className={`${styles.wrap} ${styles.grid} ${styles.headerInner}`}>
          <a href="#top" className={styles.brand}>
            <strong>{profile.name}</strong>
            <span>{profile.studio}</span>
          </a>
          <p className={styles.headerMeta}>
            {profile.role}
            <br />
            {profile.location}
          </p>
          <nav aria-label="Principal" className={styles.nav}>
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>
                    <span aria-hidden="true">{item.no}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main id="main">
        {/* 01 · Hero */}
        <section id="top" className={styles.hero} aria-labelledby="hero-title">
          <div className={`${styles.wrap} ${styles.heroWrap}`}>
            <div className={`${styles.grid} ${styles.columns}`} aria-hidden="true">
              {Array.from({ length: 12 }, (_, i) => (
                <span key={i} />
              ))}
            </div>

            <div className={`${styles.grid} ${styles.heroTop}`}>
              <p className={styles.heroIndex}>
                <span className={styles.redSquare} aria-hidden="true" />
                01
              </p>
              <p className={styles.heroReach}>{profile.reach}</p>
            </div>

            <h1 id="hero-title" className={styles.heroName}>
              Franco
              <br />
              Seiler
            </h1>

            <div className={`${styles.grid} ${styles.heroBottom}`}>
              <p className={styles.heroStudio}>{profile.studio}</p>
              <p className={styles.heroHeadline}>
                {profile.headline.before}
                <em>{profile.headline.highlight}</em>
                {profile.headline.after}
              </p>
              <div className={styles.heroAside}>
                <p>{profile.intro}</p>
                <a href="#contacto" className={styles.arrowLink}>
                  {contact.cta}
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 02 · Sobre */}
        <section id="sobre" className={styles.section} aria-labelledby="sobre-title">
          <div className={styles.wrap}>
            <SectionHead no="02" label={profile.aboutSubtitle} title={profile.aboutTitle} id="sobre-title" />

            <div className={styles.grid}>
              <p className={styles.lead}>{profile.bio[0]}</p>
              <div className={styles.bioCols}>
                {profile.bio.slice(1).map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>

            <dl className={`${styles.grid} ${styles.stats}`}>
              {stats.map((s, i) => (
                <Reveal key={s.label} className={styles.stat} delay={i * 90}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </Reveal>
              ))}
            </dl>

            <ol className={`${styles.grid} ${styles.principles}`}>
              {principles.map((p, i) => (
                <li key={p.title} className={styles.principle}>
                  <p className={styles.micro}>
                    {pad(i + 1)} — {p.eyebrow}
                  </p>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 03 · Servicios */}
        <section id="servicios" className={styles.section} aria-labelledby="servicios-title">
          <div className={styles.wrap}>
            <SectionHead no="03" label="Qué hacemos" title="Servicios" id="servicios-title" />
            <ul className={styles.services}>
              {services.map((s, i) => (
                <li key={s.title} className={`${styles.grid} ${styles.service}`}>
                  <span className={styles.serviceNo}>{pad(i + 1)}</span>
                  <span className={styles.serviceShort}>{s.short}</span>
                  <h3 className={styles.serviceTitle}>{s.title}</h3>
                  <div className={styles.serviceBody}>
                    <p>{s.description}</p>
                    {s.tags.length > 0 && <p className={styles.micro}>{s.tags.join(' / ')}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 04 · Proyectos */}
        <section id="proyectos" className={styles.section} aria-labelledby="proyectos-title">
          <div className={styles.wrap}>
            <SectionHead no="04" label={`Case studies · ${pad(featuredProjects.length)}`} title="Proyectos destacados" id="proyectos-title" />

            <ol className={styles.leadProjects}>
              {lead.map((p, i) => (
                <li key={p.slug} className={`${styles.grid} ${styles.leadProject}`}>
                  <div className={styles.leadText}>
                    <p className={styles.projectNo}>{pad(i + 1)}</p>
                    <h3 className={styles.leadTitle}>{p.title}</h3>
                    {p.subtitle && <p className={styles.leadSubtitle}>{p.subtitle}</p>}
                    <dl className={styles.facts}>
                      {p.industry && (
                        <div>
                          <dt>Industria</dt>
                          <dd>{p.industry}</dd>
                        </div>
                      )}
                      {p.role && (
                        <div>
                          <dt>Rol</dt>
                          <dd>{p.role}</dd>
                        </div>
                      )}
                      <div>
                        <dt>Stack</dt>
                        <dd>{p.stack.join(', ')}</dd>
                      </div>
                    </dl>
                    <div className={styles.projectLinks}>
                      <Link href={p.caseStudyUrl} className={styles.arrowLink}>
                        Ver case study<span className={styles.srOnly}>: {p.title}</span>
                        <span aria-hidden="true">→</span>
                      </Link>
                      {p.liveUrl && (
                        <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.plainLink}>
                          Ver sitio<span className={styles.srOnly}>: {p.title} (se abre en otra pestaña)</span>
                          <span aria-hidden="true"> ↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                  <div className={styles.leadMedia}>
                    {p.image && (
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(min-width: 900px) 62vw, 100vw"
                        className={styles.img}
                        priority={i === 0}
                      />
                    )}
                  </div>
                </li>
              ))}
            </ol>

            <ol className={`${styles.grid} ${styles.moreProjects}`} start={LEAD_PROJECTS + 1}>
              {rest.map((p, i) => (
                <li key={p.slug} className={styles.card}>
                  <div className={styles.cardMedia}>
                    {p.image && (
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(min-width: 1100px) 30vw, (min-width: 700px) 45vw, 100vw"
                        className={styles.img}
                      />
                    )}
                  </div>
                  <p className={styles.projectNo}>{pad(i + LEAD_PROJECTS + 1)}</p>
                  <h3 className={styles.cardTitle}>{p.title}</h3>
                  {p.subtitle && <p className={styles.cardSubtitle}>{p.subtitle}</p>}
                  <p className={styles.cardStack}>{p.stack.slice(0, 5).join(', ')}</p>
                  <div className={styles.projectLinks}>
                    <Link href={p.caseStudyUrl} className={styles.arrowLink}>
                      Ver case study<span className={styles.srOnly}>: {p.title}</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.plainLink}>
                        Ver sitio<span className={styles.srOnly}>: {p.title} (se abre en otra pestaña)</span>
                        <span aria-hidden="true"> ↗</span>
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 05 · Proceso */}
        <section id="proceso" className={`${styles.section} ${styles.sectionGray}`} aria-labelledby="proceso-title">
          <div className={styles.wrap}>
            <SectionHead no="05" label="Cómo trabajamos" title="Proceso" id="proceso-title" />
            <ol className={`${styles.grid} ${styles.process}`}>
              {process.map((step, i) => (
                <li key={step.title} className={styles.step}>
                  <span className={styles.stepNo} aria-hidden="true">
                    {i + 1}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 06 · Experiencia */}
        <section id="experiencia" className={styles.section} aria-labelledby="experiencia-title">
          <div className={styles.wrap}>
            <SectionHead no="06" label="Trayectoria" title="Experiencia" id="experiencia-title" />
            <ol className={styles.jobs}>
              {experience.map((job) => (
                <li key={job.company + job.period} className={`${styles.grid} ${styles.job}`}>
                  <p className={styles.jobPeriod}>{job.period}</p>
                  <div className={styles.jobHead}>
                    <h3>{job.company}</h3>
                    <p>{job.role}</p>
                  </div>
                  <div className={styles.jobBody}>
                    <ul className={styles.jobList}>
                      {job.highlights.slice(0, VISIBLE_HIGHLIGHTS).map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                    {job.highlights.length > VISIBLE_HIGHLIGHTS && (
                      <details className={styles.more}>
                        <summary>
                          <span>Ver {job.highlights.length - VISIBLE_HIGHLIGHTS} más</span>
                        </summary>
                        <ul className={styles.jobList}>
                          {job.highlights.slice(VISIBLE_HIGHLIGHTS).map((h) => (
                            <li key={h}>{h}</li>
                          ))}
                        </ul>
                      </details>
                    )}
                    <p className={styles.jobStack}>{job.stack.join(' · ')}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className={`${styles.grid} ${styles.skills}`}>
              <h3 className={styles.skillsTitle}>Skills</h3>
              {(
                [
                  ['Frontend', skills.frontend],
                  ['Backend', skills.backend],
                  ['Herramientas', skills.tools],
                ] as const
              ).map(([label, list]) => (
                <div key={label} className={styles.skillCol}>
                  <h4>{label}</h4>
                  <ul>
                    {list.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 07 · Testimonios */}
        <section id="testimonios" className={styles.section} aria-labelledby="testimonios-title">
          <div className={styles.wrap}>
            <SectionHead no="07" label="Lo que dicen" title="Testimonios" id="testimonios-title" />
            <figure className={`${styles.grid} ${styles.bigQuote}`}>
              <blockquote>
                <p>{firstQuote.quote}</p>
              </blockquote>
              <figcaption>
                <strong>{firstQuote.name}</strong>
                <span>{firstQuote.role}</span>
              </figcaption>
            </figure>
            <ul className={`${styles.grid} ${styles.quotes}`}>
              {otherQuotes.map((t) => (
                <li key={t.name} className={styles.quote}>
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
          </div>
        </section>

        {/* 08 · Contacto */}
        <section id="contacto" className={`${styles.section} ${styles.contact}`} aria-labelledby="contacto-title">
          <div className={styles.wrap}>
            <div className={`${styles.grid} ${styles.sectionHead}`}>
              <p className={styles.sectionLabel}>
                <span className={styles.sectionNo}>08</span>
                {contact.title}
              </p>
            </div>
            <h2 id="contacto-title" className={styles.contactTitle}>
              {contact.cta}
            </h2>
            <div className={`${styles.grid} ${styles.contactRow}`}>
              <p className={styles.contactSub}>{contact.subtitle}</p>
              <div className={styles.contactLinks}>
                <a href={`mailto:${contact.email}`} className={styles.mail}>
                  {contact.email}
                  <span aria-hidden="true">→</span>
                </a>
                <ul className={styles.socials}>
                  {contact.socials.map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer">
                        {s.label}
                        <span className={styles.srOnly}> (se abre en otra pestaña)</span>
                        <span aria-hidden="true"> ↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.wrap} ${styles.grid}`}>
          <p className={styles.footerBrand}>
            <strong>{profile.name}</strong>
            <span>{profile.studio}</span>
          </p>
          <p className={styles.footerTagline}>{footer.tagline}</p>
          <p className={styles.footerMeta}>
            {profile.location}
            <br />© {year}
          </p>
          <a href="#top" className={styles.footerTop}>
            Arriba ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
