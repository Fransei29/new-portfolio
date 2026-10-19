// design-exploration/mejoras/option-07 · Pulgar primero
// Pensada desde el celular: hero compacto, servicios y casos en carruseles con
// snap (se ve asomar la próxima tarjeta), principios y proceso en acordeones,
// stack en filas de chips y un CTA fijo abajo, al alcance del pulgar.
// En desktop el mismo marcado se abre en grillas y los acordeones quedan
// desplegados como columnas. La marca no cambia: lila, Bricolage + Jakarta.
import type { Metadata } from 'next';
import Image from 'next/image';
import Reveal from '../../_shared/Reveal';
import { content, featuredProjects } from '../../_shared/content';
import Carousel from './Carousel';
import Accordions from './Accordions';
import StickyCta from './StickyCta';
import styles from './option.module.css';

export const metadata: Metadata = {
  title: 'Mejora 07 · Pulgar primero — Exploración',
};

const { profile, stats, markets, principles, process, services, skills, testimonials, contact, footer } = content;

const NAV = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#casos', label: 'Casos' },
  { href: '#por-que', label: 'Por qué' },
  { href: '#proceso', label: 'Proceso' },
];

const SKILL_GROUPS: { key: keyof typeof skills; label: string }[] = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'tools', label: 'Herramientas' },
];

const CASES = featuredProjects.slice(0, 6);
const CTA_LABEL = 'Empezá tu proyecto';

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function SectionHead({ id, eyebrow, title, lead }: { id: string; eyebrow: string; title: string; lead?: string }) {
  return (
    <header className={styles.head}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 id={id} className={styles.h2}>
        {title}
      </h2>
      {lead && <p className={styles.lead}>{lead}</p>}
    </header>
  );
}

export default function PulgarPrimeroPage() {
  const cities = markets.map((m) => m.city);

  return (
    <div className={`dx-root ${styles.root}`} lang="es">
      <a className="dx-skip" href="#main">
        Saltar al contenido
      </a>

      <header className={styles.topbar}>
        <div className={styles.topInner}>
          <a href="#main" className={styles.logo} aria-label={`${profile.name} · ${profile.studio}, inicio`}>
            <img src="/brand-header.svg" alt="" width={108} height={40} />
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
          <a href="#contacto-sec" className={styles.topCta}>
            <span className={styles.onlyDesktop}>{CTA_LABEL}</span>
            <span className={styles.onlyMobile}>Contacto</span>
          </a>
        </div>
      </header>

      <main id="main">
        {/* ───────── Hero compacto ───────── */}
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.wrap}>
            <div className={styles.heroGrid}>
              <div className={styles.heroText}>
                <p className={styles.badge}>
                  <span className={styles.badgeDot} aria-hidden="true" />
                  {profile.studio} · {profile.location}
                </p>
                <h1 id="hero-title" className={styles.h1}>
                  {profile.headline.before}
                  <span className={styles.hl}>{profile.headline.highlight}</span>
                  {profile.headline.after}
                </h1>
                <p className={styles.intro}>{profile.intro}</p>
                <div className={styles.heroCtas}>
                  <a href="#contacto-sec" className={styles.btnPrimary}>
                    {CTA_LABEL}
                  </a>
                  <a href="#casos" className={styles.btnGhost}>
                    Ver casos
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

              <aside className={styles.heroCard} aria-label="Dónde trabajamos">
                <img
                  src="/isotipo-panda-programando.svg"
                  alt=""
                  width={220}
                  height={220}
                  className={styles.heroPanda}
                />
                <p className={styles.heroCardLabel}>{profile.reach}</p>
                <ul className={styles.markets}>
                  {cities.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </section>

        {/* ───────── Servicios: carrusel en mobile, grilla en desktop ───────── */}
        <section className={styles.section} aria-labelledby="servicios">
          <div className={styles.wrap}>
            <SectionHead id="servicios" eyebrow="Servicios" title="Lo que construimos" lead={profile.tagline} />
            <Carousel label="Servicios" count={services.length} trackClassName={styles.servicesTrack}>
              {services.map((s, i) => (
                <li key={s.title} className={styles.slide}>
                  <article className={styles.service}>
                    <p className={styles.serviceTop}>
                      <span className={styles.serviceNo}>{pad(i + 1)}</span>
                      <span className={styles.serviceShort}>{s.short}</span>
                    </p>
                    <h3 className={styles.h3}>{s.title}</h3>
                    <p className={styles.body}>{s.description}</p>
                    {s.tags.length > 0 && (
                      <ul className={styles.miniTags}>
                        {s.tags.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    )}
                  </article>
                </li>
              ))}
            </Carousel>
          </div>
        </section>

        {/* ───────── Case studies: tarjetas altas ───────── */}
        <section className={`${styles.section} ${styles.sectionVelo}`} aria-labelledby="casos">
          <div className={styles.wrap}>
            <SectionHead id="casos" eyebrow="Case studies" title="Proyectos seleccionados" />
            <Carousel label="Case studies" count={CASES.length} trackClassName={styles.casesTrack}>
              {CASES.map((p, i) => (
                <li key={p.slug} className={styles.slide}>
                  <article className={styles.case}>
                    <div className={styles.shot}>
                      {p.image && (
                        <Image
                          src={p.image}
                          alt={`Captura de ${p.title}`}
                          fill
                          sizes="(min-width: 900px) 400px, 82vw"
                          className={styles.shotImg}
                          priority={i === 0}
                        />
                      )}
                    </div>
                    <div className={styles.caseBody}>
                      {p.industry && <p className={styles.caseIndustry}>{p.industry.split(' • ')[0]}</p>}
                      <h3 className={styles.caseTitle}>
                        <a href={p.caseStudyUrl} className={styles.caseLink}>
                          {p.title}
                        </a>
                      </h3>
                      {p.subtitle && <p className={styles.caseSub}>{p.subtitle}</p>}
                      <ul className={styles.chips}>
                        {p.stack.slice(0, 4).map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                      <p className={styles.caseMore} aria-hidden="true">
                        Ver caso <span>→</span>
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </Carousel>
          </div>
        </section>

        {/* ───────── Por qué: acordeones / columnas ───────── */}
        <section className={styles.section} aria-labelledby="por-que" id="por-que-sec">
          <div className={styles.wrap}>
            <div className={styles.split}>
              <div>
                <SectionHead id="por-que" eyebrow={profile.aboutSubtitle} title={profile.aboutTitle} />
                <Reveal>
                  <p className={styles.body}>{profile.bio[0]}</p>
                  <p className={`${styles.body} ${styles.bodyMuted}`}>
                    {profile.bio[1]} {profile.bio[2]}
                  </p>
                </Reveal>
              </div>
              <Accordions className={styles.accordions}>
                {principles.map((p, i) => (
                  <details key={p.title} className={styles.acc} open={i === 0}>
                    <summary className={styles.accSum}>
                      <span className={styles.accText}>
                        <span className={styles.accEyebrow}>{p.eyebrow}</span>
                        <span className={styles.accTitle}>{p.title}</span>
                      </span>
                      <span className={styles.accIcon} aria-hidden="true" />
                    </summary>
                    <p className={styles.accBody}>{p.description}</p>
                  </details>
                ))}
              </Accordions>
            </div>
          </div>
        </section>

        {/* ───────── Proceso ───────── */}
        <section className={`${styles.section} ${styles.sectionDeep}`} aria-labelledby="proceso">
          <div className={styles.wrap}>
            <SectionHead id="proceso" eyebrow="Proceso" title="Cómo trabajamos" />
            <Accordions className={styles.steps}>
              {process.map((s, i) => (
                <details key={s.title} className={`${styles.acc} ${styles.step}`} open={i === 0}>
                  <summary className={styles.accSum}>
                    <span className={styles.stepNo} aria-hidden="true">
                      {pad(i + 1)}
                    </span>
                    <span className={styles.accTitle}>{s.title}</span>
                    <span className={styles.accIcon} aria-hidden="true" />
                  </summary>
                  <p className={styles.accBody}>{s.description}</p>
                </details>
              ))}
            </Accordions>
          </div>
        </section>

        {/* ───────── Stack ───────── */}
        <section className={styles.section} aria-labelledby="stack">
          <div className={styles.wrap}>
            <SectionHead id="stack" eyebrow="Stack" title="Herramientas con las que trabajamos" />
            <div className={styles.skillGroups}>
              {SKILL_GROUPS.map((g) => (
                <div key={g.key} className={styles.skillGroup}>
                  <h3 className={styles.skillLabel}>
                    {g.label} <span className={styles.skillCount}>{skills[g.key].length}</span>
                  </h3>
                  <ul className={styles.skillRow}>
                    {skills[g.key].map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── Testimonios ───────── */}
        <section className={`${styles.section} ${styles.sectionVelo}`} aria-labelledby="testimonios">
          <div className={styles.wrap}>
            <SectionHead id="testimonios" eyebrow="Testimonios" title="Lo que dicen" />
            <Carousel label="Testimonios" count={testimonials.length} trackClassName={styles.quotesTrack}>
              {testimonials.map((t) => (
                <li key={t.name} className={styles.slide}>
                  <figure className={styles.quote}>
                    <blockquote>
                      <p>{t.quote}</p>
                    </blockquote>
                    <figcaption>
                      <span className={styles.avatar} aria-hidden="true">
                        {t.name
                          .split(' ')
                          .map((w) => w[0])
                          .join('')}
                      </span>
                      <span>
                        <span className={styles.quoteName}>{t.name}</span>
                        <span className={styles.quoteRole}>{t.role}</span>
                      </span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </Carousel>
          </div>
        </section>

        {/* ───────── Contacto ───────── */}
        <section className={styles.contact} aria-labelledby="contacto" id="contacto-sec">
          <div className={styles.wrap}>
            <div className={styles.contactCard}>
              <img src="/brand-isotipo.svg" alt="" width={64} height={64} className={styles.contactPanda} />
              <h2 id="contacto" className={styles.contactTitle}>
                {contact.title}
              </h2>
              <p className={styles.contactSub}>{contact.subtitle}</p>
              <a href={`mailto:${contact.email}`} className={styles.btnLight}>
                {contact.cta}
              </a>
              <p className={styles.contactMail}>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer} id="pie">
        <div className={`${styles.wrap} ${styles.footInner}`}>
          <div>
            <img src="/brand-header-dark.svg" alt={`${profile.name} · ${profile.studio}`} width={130} height={48} />
            <p className={styles.footTag}>{footer.tagline}</p>
          </div>
          <ul className={styles.socials}>
            {contact.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                  <span className={styles.srOnly}> (abre en una pestaña nueva)</span>
                </a>
              </li>
            ))}
          </ul>
          <p className={styles.footMeta}>
            {profile.location} · {profile.reach}
          </p>
        </div>
      </footer>

      <StickyCta href="#contacto-sec" label={CTA_LABEL} note={profile.studio} />
    </div>
  );
}
