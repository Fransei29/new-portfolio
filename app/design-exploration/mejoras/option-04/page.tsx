// design-exploration/mejoras/option-04 · Bento lila
// Problema: servicios, principios y cifras viven en secciones separadas y largas.
// Propuesta: debajo de la cabecera, un bento de 4 columnas que resume el estudio
// en un vistazo (titular + CTA, cifras, mercados, servicios, un caso real,
// principios y el panda). El resto de la home habla el mismo idioma de tarjetas.
import type { Metadata } from 'next';
import Image from 'next/image';
import Reveal from '../../_shared/Reveal';
import { content, featuredProjects } from '../../_shared/content';
import styles from './option.module.css';

export const metadata: Metadata = {
  title: 'Mejora 04 · Bento lila — Exploración',
};

const { profile, stats, markets, principles, process, services, skills, testimonials, contact, footer } = content;

const NAV = [
  { href: '#resumen', label: 'Estudio' },
  { href: '#casos', label: 'Casos' },
  { href: '#proceso', label: 'Proceso' },
  { href: '#testimonios', label: 'Testimonios' },
];

const SKILL_GROUPS: { key: keyof typeof skills; label: string }[] = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'tools', label: 'Herramientas' },
];

const pad = (n: number) => String(n).padStart(2, '0');

export default function BentoLilaPage() {
  const [lead, ...others] = featuredProjects;
  const cases = others.slice(0, 6);
  const mail = `mailto:${contact.email}`;

  return (
    <div className={`dx-root ${styles.root}`} lang="es">
      <a className="dx-skip" href="#main">
        Saltar al contenido
      </a>

      {/* ───────────── Cabecera ───────────── */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="#main" className={styles.logo} aria-label={`${profile.name} · inicio`}>
            <img src="/brand-header.svg" alt="" width={140} height={52} />
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
          <div className={styles.headerActions}>
            <a href="#contacto" className={`${styles.btn} ${styles.btnPrimary} ${styles.headerCta}`}>
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
                      <a href={n.href}>{n.label}</a>
                    </li>
                  ))}
                  <li>
                    <a href="#contacto">Contacto</a>
                  </li>
                </ul>
              </nav>
            </details>
          </div>
        </div>
      </header>

      <main id="main">
        {/* ───────────── Bento: el estudio en un vistazo ───────────── */}
        <section className={styles.wrap} aria-labelledby="hero-title" id="resumen">
          <div className={styles.bento}>
            {/* Titular + CTA */}
            <div className={`${styles.tile} ${styles.tDeep} ${styles.aHero}`}>
              <p className={styles.kickerLight}>
                <span className={styles.dot} aria-hidden="true" />
                {profile.studio} · {profile.location}
              </p>
              <h1 id="hero-title" className={styles.h1}>
                {profile.headline.before}
                <span className={styles.hl}>{profile.headline.highlight}</span>
                {profile.headline.after}
              </h1>
              <p className={styles.heroIntro}>{profile.intro}</p>
              <div className={styles.heroCtas}>
                <a href={mail} className={`${styles.btn} ${styles.btnLight}`}>
                  {contact.cta}
                </a>
                <a href="#casos" className={`${styles.btn} ${styles.btnGhostLight}`}>
                  Ver case studies
                </a>
              </div>
            </div>

            {/* Cifras */}
            {stats.map((s, i) => (
              <div key={s.label} className={`${styles.tile} ${styles.tStat} ${styles[`aSt${i + 1}`]}`}>
                <p className={styles.statValue}>{s.value}</p>
                <p className={styles.statLabel}>{s.label}</p>
              </div>
            ))}

            {/* Mercados */}
            <div className={`${styles.tile} ${styles.tVelo} ${styles.aMk}`}>
              <p className={styles.eyebrow}>Mercados</p>
              <h2 className={styles.tileTitleSm}>{profile.reach}</h2>
              <ul className={styles.markets}>
                {markets.map((m) => (
                  <li key={m.city}>
                    <span aria-hidden="true">{m.flag}</span> {m.city}
                  </li>
                ))}
              </ul>
            </div>

            {/* Servicios */}
            <h2 className={styles.srOnly}>Servicios</h2>
            {services.map((s, i) => {
              const deep = s.tags.length > 0;
              return (
                <div
                  key={s.title}
                  className={`${styles.tile} ${deep ? styles.tGraphite : i % 2 ? styles.tVelo : styles.tWhite} ${styles[`aSv${i + 1}`]}`}
                >
                  <p className={deep ? styles.monoLight : styles.mono}>
                    {pad(i + 1)} · {s.short}
                  </p>
                  <h3 className={styles.tileTitle}>{s.title}</h3>
                  <p className={deep ? styles.bodyLight : styles.body}>{s.description}</p>
                  {deep && (
                    <ul className={styles.tags}>
                      {s.tags.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}

            {/* Un caso real */}
            <article className={`${styles.tile} ${styles.tWhite} ${styles.tShot} ${styles.aShot}`}>
              <div className={styles.shotFrame}>
                {lead.image && (
                  <Image
                    src={lead.image}
                    alt={`Captura de ${lead.title}`}
                    fill
                    priority
                    sizes="(min-width: 1024px) 600px, 100vw"
                    className={styles.shotImg}
                  />
                )}
              </div>
              <div className={styles.shotText}>
                <div>
                  <p className={styles.mono}>Último caso · {lead.industry}</p>
                  <h3 className={styles.tileTitle}>{lead.title}</h3>
                  {lead.subtitle && <p className={styles.body}>{lead.subtitle}</p>}
                </div>
                <a href={lead.caseStudyUrl} className={`${styles.btn} ${styles.btnPrimary}`}>
                  Ver caso<span className={styles.srOnly}> de {lead.title}</span>
                </a>
              </div>
            </article>

            {/* Principios */}
            <h2 className={styles.srOnly}>Cómo trabajamos con vos</h2>
            {principles.map((p, i) => (
              <div key={p.title} className={`${styles.tile} ${styles.tWhite} ${styles[`aPr${i + 1}`]}`}>
                <p className={styles.eyebrow}>{p.eyebrow}</p>
                <h3 className={styles.tileTitle}>{p.title}</h3>
                <p className={styles.body}>{p.description}</p>
              </div>
            ))}

            {/* Panda / con quién trabajás */}
            <div className={`${styles.tile} ${styles.tVelo} ${styles.tPanda} ${styles.aPanda}`}>
              <img src="/isotipo-panda-programando.svg" alt="" className={styles.panda} width={140} height={140} />
              <div>
                <p className={styles.eyebrow}>{profile.aboutSubtitle}</p>
                <p className={styles.body}>{profile.bio[1]}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ───────────── Case studies ───────────── */}
        <section className={styles.wrap} aria-labelledby="casos-title" id="casos">
          <SectionHead eyebrow="Case studies" id="casos-title" title="Proyectos seleccionados" lead={profile.tagline} />
          <ul className={styles.cases}>
            {cases.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={(i % 3) * 70} className={`${styles.caseCard} ${i === 0 ? styles.caseWide : ''}`}>
                <a href={p.caseStudyUrl} className={styles.caseLink}>
                  <div className={styles.caseFrame}>
                    {p.image && (
                      <Image
                        src={p.image}
                        alt={`Captura de ${p.title}`}
                        fill
                        sizes={i === 0 ? '(min-width: 1024px) 800px, 100vw' : '(min-width: 1024px) 400px, 100vw'}
                        className={styles.shotImg}
                      />
                    )}
                  </div>
                  <div className={styles.caseBody}>
                    <p className={styles.mono}>
                      {p.industry}
                      {p.locations[0] && (
                        <>
                          {' · '}
                          <span aria-hidden="true">{p.locations[0].flag}</span> {p.locations[0].label}
                        </>
                      )}
                    </p>
                    <h3 className={styles.tileTitle}>{p.title}</h3>
                    {p.subtitle && <p className={styles.body}>{p.subtitle}</p>}
                    {i === 0 && <p className={`${styles.body} ${styles.caseDesc}`}>{p.description}</p>}
                    <ul className={styles.chips}>
                      {p.stack.slice(0, 4).map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                    <span className={styles.more} aria-hidden="true">
                      Ver caso →
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
            <Reveal as="li" className={`${styles.tile} ${styles.tVelo} ${styles.caseAll}`}>
              <p className={styles.eyebrow}>{featuredProjects.length} casos destacados</p>
              <p className={styles.tileTitle}>{profile.bio[4]}</p>
              <a href="/projects" className={`${styles.btn} ${styles.btnPrimary}`}>
                Ver todos los casos
              </a>
            </Reveal>
          </ul>
        </section>

        {/* ───────────── Proceso + stack ───────────── */}
        <section className={styles.wrap} aria-labelledby="proceso-title" id="proceso">
          <SectionHead eyebrow="Proceso" id="proceso-title" title="Cómo trabajamos" lead={profile.bio[0]} />
          <ol className={styles.process}>
            {process.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 70} className={`${styles.tile} ${i === 2 ? styles.tVelo : styles.tWhite}`}>
                <span className={styles.stepNo} aria-hidden="true">
                  {pad(i + 1)}
                </span>
                <h3 className={styles.tileTitle}>{s.title}</h3>
                <p className={styles.body}>{s.description}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className={`${styles.tile} ${styles.tWhite} ${styles.stack}`}>
            <div className={styles.stackHead}>
              <p className={styles.eyebrow}>Stack</p>
              <h3 className={styles.tileTitle}>Herramientas con las que construimos</h3>
            </div>
            <div className={styles.stackCols}>
              {SKILL_GROUPS.map((g) => (
                <div key={g.key}>
                  <h4 className={styles.mono}>{g.label}</h4>
                  <ul className={styles.chips}>
                    {skills[g.key].map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ───────────── Testimonios ───────────── */}
        <section className={styles.wrap} aria-labelledby="testimonios-title" id="testimonios">
          <SectionHead eyebrow="Testimonios" id="testimonios-title" title="Lo que dicen quienes trabajaron con nosotros" />
          <ul className={styles.quotes}>
            {testimonials.map((t, i) => {
              const big = i === 0;
              const wide = i === 0 || i === testimonials.length - 1;
              return (
                <Reveal
                  as="li"
                  key={t.name}
                  delay={(i % 3) * 70}
                  className={`${styles.tile} ${big ? styles.tDeep : i % 2 ? styles.tVelo : styles.tWhite} ${wide ? styles.quoteWide : ''}`}
                >
                  <figure className={styles.quote}>
                    <blockquote>
                      <p className={big ? styles.quoteBig : styles.quoteText}>“{t.quote}”</p>
                    </blockquote>
                    <figcaption className={big ? styles.citeLight : styles.cite}>
                      <span className={styles.avatar} aria-hidden="true">
                        {t.name.charAt(0)}
                      </span>
                      <span>
                        <strong>{t.name}</strong>
                        <span>{t.role}</span>
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              );
            })}
          </ul>
        </section>

        {/* ───────────── Contacto ───────────── */}
        <section className={styles.wrap} aria-labelledby="contacto-title" id="contacto">
          <div className={styles.contactGrid}>
            <Reveal className={`${styles.tile} ${styles.tDeep} ${styles.contactMain}`}>
              <p className={styles.kickerLight}>
                <span className={styles.dot} aria-hidden="true" />
                Contacto
              </p>
              <h2 id="contacto-title" className={styles.h2Light}>
                {contact.title}
              </h2>
              <p className={styles.heroIntro}>{contact.subtitle}</p>
              <div className={styles.heroCtas}>
                <a href={mail} className={`${styles.btn} ${styles.btnLight}`}>
                  {contact.cta}
                </a>
              </div>
              <img src="/brand-isotipo.svg" alt="" className={styles.contactPanda} width={220} height={220} />
            </Reveal>
            <Reveal className={`${styles.tile} ${styles.tWhite} ${styles.contactSide}`}>
              <p className={styles.eyebrow}>Escribinos</p>
              <a href={mail} className={styles.email}>
                {contact.email}
              </a>
              <ul className={styles.socials}>
                {contact.socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className={styles.social}>
                      {s.label}
                      <span aria-hidden="true">↗</span>
                      <span className={styles.srOnly}> (abre en una pestaña nueva)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ───────────── Pie ───────────── */}
      <footer className={styles.wrap}>
        <div className={`${styles.tile} ${styles.tWhite} ${styles.footer}`}>
          <div className={styles.footerBrand}>
            <img src="/brand-header.svg" alt={profile.name} width={150} height={56} />
            <p className={styles.body}>{footer.tagline}</p>
          </div>
          <nav aria-label="Pie" className={styles.footerNav}>
            <ul>
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
            {profile.location} · {profile.reach}
          </p>
        </div>
      </footer>
    </div>
  );
}

function SectionHead({ eyebrow, id, title, lead }: { eyebrow: string; id: string; title: string; lead?: string }) {
  return (
    <header className={styles.sectionHead}>
      <div>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 id={id} className={styles.h2}>
          {title}
        </h2>
      </div>
      {lead && <p className={styles.sectionLead}>{lead}</p>}
    </header>
  );
}
