// design-exploration/mejoras/option-01 · Orden
// El mismo sitio, ordenado: contenedor fijo de 1200px, grilla de 12 columnas,
// cabeceras de sección con número + título a la izquierda y bajada a la derecha,
// una sola escala de espaciado y separadores planos en lugar de waves.
import type { Metadata } from 'next';
import Image from 'next/image';
import Reveal from '../../_shared/Reveal';
import { content, featuredProjects } from '../../_shared/content';
import styles from './option.module.css';

export const metadata: Metadata = {
  title: 'Mejora 01 · Orden — Exploración',
};

const { profile, stats, markets, principles, process, services, skills, testimonials, contact, footer } = content;

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
const QUOTES = testimonials.slice(0, 6);
const uniqueCities = Array.from(new Set(markets.map((m) => m.city)));

const pad = (n: number) => String(n).padStart(2, '0');

function SectionHead({ n, eyebrow, id, title, lead }: { n: number; eyebrow: string; id: string; title: string; lead?: string }) {
  return (
    <header className={styles.head}>
      <div className={styles.headMain}>
        <p className={styles.eyebrow}>
          <span className={styles.eyebrowNo}>{pad(n)}</span>
          <span aria-hidden="true" className={styles.eyebrowRule} />
          {eyebrow}
        </p>
        <h2 id={id} className={styles.h2}>
          {title}
        </h2>
      </div>
      {lead && <p className={styles.headLead}>{lead}</p>}
    </header>
  );
}

export default function OrdenPage() {
  return (
    <div className={`dx-root ${styles.root}`} lang="es">
      <a className="dx-skip" href="#main">
        Saltar al contenido
      </a>

      <header className={styles.topbar}>
        <div className={`${styles.container} ${styles.topbarInner}`}>
          <a href="#main" className={styles.logo} aria-label={`${profile.name}, inicio`}>
            <img src="/brand-header.svg" alt="" width={108} height={40} />
          </a>
          <nav aria-label="Principal" className={styles.nav}>
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
          <a href="#contacto" className={`${styles.btn} ${styles.btnSm}`}>
            Contacto
          </a>
        </div>
      </header>

      <main id="main">
        {/* ───────── Hero ───────── */}
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={`${styles.container} ${styles.grid}`}>
            <div className={styles.heroText}>
              <p className={styles.heroKicker}>
                {profile.studio} <span aria-hidden="true">·</span> {profile.location}
              </p>
              <h1 id="hero-title" className={styles.h1}>
                {profile.headline.before}
                <span className={styles.highlight}>{profile.headline.highlight}</span>
                {profile.headline.after}
              </h1>
              <p className={styles.heroIntro}>{profile.intro}</p>
              <div className={styles.ctaRow}>
                <a href="#contacto" className={styles.btn}>
                  {contact.cta}
                </a>
                <a href="#casos" className={styles.btnGhost}>
                  Ver case studies
                </a>
              </div>
            </div>

            <aside className={styles.heroPanel} aria-label="El estudio en cifras">
              <img src="/isotipo-panda-programando.svg" alt="" className={styles.heroPanda} width={160} height={160} />
              <ul className={styles.stats}>
                {stats.map((s) => (
                  <li key={s.label} className={styles.stat}>
                    <span className={styles.statValue}>{s.value}</span>
                    <span className={styles.statLabel}>{s.label}</span>
                  </li>
                ))}
              </ul>
              <p className={styles.reach}>{profile.reach}</p>
            </aside>
          </div>
        </section>

        {/* ───────── 01 Servicios ───────── */}
        <section className={styles.section} aria-labelledby="servicios">
          <div className={styles.container}>
            <SectionHead n={1} eyebrow="Servicios" id="servicios" title="Lo que hacemos" lead={profile.tagline} />
            <ul className={styles.services}>
              {services.map((s, i) => (
                <Reveal as="li" key={s.title} className={styles.card} delay={(i % 3) * 60}>
                  <p className={styles.cardMeta}>
                    <span>{pad(i + 1)}</span>
                    <span>{s.short}</span>
                  </p>
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

        {/* ───────── 02 Case studies ───────── */}
        <section className={`${styles.section} ${styles.tinted}`} aria-labelledby="casos">
          <div className={styles.container}>
            <SectionHead
              n={2}
              eyebrow="Case studies"
              id="casos"
              title="Proyectos seleccionados"
              lead={profile.bio[4]}
            />
            <ul className={styles.cases}>
              {CASES.map((p, i) => (
                <Reveal as="li" key={p.slug} className={styles.caseCard} delay={(i % 3) * 60}>
                  <a href={p.caseStudyUrl} className={styles.caseLink}>
                    <div className={styles.caseImg}>
                      {p.image && (
                        <Image
                          src={p.image}
                          alt={`Captura de ${p.title}`}
                          fill
                          sizes="(min-width: 1240px) 380px, (min-width: 720px) 45vw, 100vw"
                          className={styles.img}
                          priority={i < 3}
                        />
                      )}
                    </div>
                    <div className={styles.caseBody}>
                      <p className={styles.caseIndustry}>{p.industry}</p>
                      <h3 className={styles.h3}>{p.title}</h3>
                      {p.subtitle && <p className={styles.body}>{p.subtitle}</p>}
                      <p className={styles.caseStack}>{p.stack.slice(0, 4).join(' · ')}</p>
                      <span className={styles.caseCta}>
                        Ver caso <span aria-hidden="true">→</span>
                      </span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </ul>
            <p className={styles.sectionFoot}>
              <a href="/projects" className={styles.btnGhost}>
                Ver todos los case studies
              </a>
            </p>
          </div>
        </section>

        {/* ───────── 03 Principios ───────── */}
        <section className={styles.section} aria-labelledby="principios">
          <div className={styles.container}>
            <SectionHead
              n={3}
              eyebrow={profile.aboutSubtitle}
              id="principios"
              title={profile.aboutTitle}
              lead={`${profile.bio[0]} ${profile.bio[1]}`}
            />
            <ul className={styles.principles}>
              {principles.map((p, i) => (
                <Reveal as="li" key={p.title} className={styles.principle} delay={i * 60}>
                  <p className={styles.cardEyebrow}>{p.eyebrow}</p>
                  <h3 className={styles.h3}>{p.title}</h3>
                  <p className={styles.body}>{p.description}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ───────── 04 Proceso ───────── */}
        <section className={`${styles.section} ${styles.tinted}`} aria-labelledby="proceso">
          <div className={styles.container}>
            <SectionHead n={4} eyebrow="Proceso" id="proceso" title="Cómo trabajamos" lead={profile.bio[2]} />
            <ol className={styles.process}>
              {process.map((s, i) => (
                <Reveal as="li" key={s.title} className={styles.step} delay={i * 60}>
                  <span className={styles.stepNo} aria-hidden="true">
                    {pad(i + 1)}
                  </span>
                  <h3 className={styles.h3}>{s.title}</h3>
                  <p className={styles.body}>{s.description}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ───────── 05 Stack ───────── */}
        <section className={styles.section} aria-labelledby="stack">
          <div className={styles.container}>
            <SectionHead n={5} eyebrow="Stack" id="stack" title="Tecnologías" lead={profile.bio[3]} />
            <div className={styles.skills}>
              {SKILL_GROUPS.map((g) => (
                <div key={g.key} className={styles.skillGroup}>
                  <h3 className={styles.skillTitle}>{g.label}</h3>
                  <ul className={styles.chips}>
                    {skills[g.key].map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className={styles.markets}>
              <p className={styles.skillTitle}>Mercados</p>
              <ul className={styles.marketList}>
                {uniqueCities.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ───────── 06 Testimonios ───────── */}
        <section className={`${styles.section} ${styles.tinted}`} aria-labelledby="testimonios">
          <div className={styles.container}>
            <SectionHead n={6} eyebrow="Testimonios" id="testimonios" title="Lo que dicen" />
            <ul className={styles.quotes}>
              {QUOTES.map((t, i) => (
                <Reveal as="li" key={t.name} className={styles.quoteCard} delay={(i % 3) * 60}>
                  <figure>
                    <blockquote className={styles.quote}>
                      <p>“{t.quote}”</p>
                    </blockquote>
                    <figcaption className={styles.quoteBy}>
                      <span className={styles.avatar} aria-hidden="true">
                        {t.name
                          .split(' ')
                          .map((w) => w[0])
                          .join('')}
                      </span>
                      <span>
                        <strong>{t.name}</strong>
                        <span className={styles.quoteRole}>{t.role}</span>
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ───────── 07 Contacto ───────── */}
        <section className={styles.section} aria-labelledby="contacto" id="contacto-sec">
          <div className={styles.container}>
            <div className={styles.contact}>
              <div className={styles.contactText}>
                <p className={`${styles.eyebrow} ${styles.eyebrowDark}`}>
                  <span className={styles.eyebrowNo}>07</span>
                  <span aria-hidden="true" className={styles.eyebrowRule} />
                  Contacto
                </p>
                <h2 id="contacto" className={`${styles.h2} ${styles.h2Dark}`}>
                  {contact.title}
                </h2>
                <p className={styles.contactLead}>{contact.subtitle}</p>
              </div>
              <div className={styles.contactActions}>
                <a href={`mailto:${contact.email}`} className={styles.btnLight}>
                  {contact.cta}
                </a>
                <a href={`mailto:${contact.email}`} className={styles.contactEmail}>
                  {contact.email}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.container} ${styles.footerInner}`}>
          <div className={styles.footerBrand}>
            <img src="/brand-header.svg" alt={profile.name} width={108} height={40} />
            <p className={styles.footerTag}>{footer.tagline}</p>
          </div>
          <nav aria-label="Secciones" className={styles.footerCol}>
            <p className={styles.footerHead}>Secciones</p>
            <ul>
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.footerCol}>
            <p className={styles.footerHead}>Redes</p>
            <ul>
              {contact.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                    <span className={styles.srOnly}> (abre en una pestaña nueva)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.footerBottom}>
            <p>
              {profile.name} <span aria-hidden="true">·</span> {profile.studio}
            </p>
            <p>{profile.location}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
