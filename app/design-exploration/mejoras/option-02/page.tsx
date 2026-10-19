// design-exploration/mejoras/option-02 · Hero con prueba
// Misma marca que el sitio vivo. El cambio está en el hero: titular mucho más
// grande, una captura real de un case study (Bellum) como protagonista dentro de
// un marco de navegador, y una franja de prueba a todo el ancho con cifras y
// mercados. El resto de la home sigue el orden del sitio, más ordenado.
import type { Metadata } from 'next';
import Image from 'next/image';
import Reveal from '../../_shared/Reveal';
import { content, featuredProjects, type Project } from '../../_shared/content';
import styles from './option.module.css';

export const metadata: Metadata = {
  title: 'Mejora 02 · Hero con prueba — Exploración',
};

const { profile, stats, markets, principles, process, services, skills, testimonials, contact, footer } = content;

const NAV = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#casos', label: 'Case studies' },
  { href: '#proceso', label: 'Proceso' },
  { href: '#estudio', label: 'Estudio' },
];

const SKILL_GROUPS: { key: keyof typeof skills; label: string }[] = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'tools', label: 'Herramientas' },
];

function pad(n: number) {
  return String(n).padStart(2, '0');
}

/** Las capturas vienen con un marco azul alrededor: se recorta para mostrar sólo la web. */
function Shot({ src, alt, sizes, priority }: { src: string; alt: string; sizes: string; priority?: boolean }) {
  return (
    <div className={styles.shot}>
      <div className={styles.shotInner}>
        <Image src={encodeURI(src)} alt={alt} fill sizes={sizes} priority={priority} className={styles.shotImg} />
      </div>
    </div>
  );
}

function BrowserFrame({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className={styles.browser}>
      <div className={styles.browserBar} aria-hidden="true">
        <span className={styles.dots}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.address}>{url}</span>
      </div>
      {children}
    </div>
  );
}

function hostOf(url: string | null) {
  if (!url) return '';
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

export default function HeroConPruebaPage() {
  const heroProject = featuredProjects.find((p) => p.slug === 'bellum') ?? featuredProjects[0];
  const caseList = featuredProjects.filter((p) => p.image).slice(0, 7);
  const [lead, ...rest] = caseList;
  const flags = Array.from(new Set(markets.map((m) => m.flag)));
  const countries = stats[2];

  return (
    <div className={`dx-root ${styles.root}`} lang="es">
      <a className="dx-skip" href="#main">
        Saltar al contenido
      </a>

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="#main" className={styles.logo} aria-label={`${profile.name} · ${profile.studio}, inicio`}>
            <img src="/brand-header.svg" alt="" width={108} height={40} />
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
          <a href="#contacto" className={`${styles.btn} ${styles.btnPrimary} ${styles.headerCta}`}>
            Empezá tu proyecto
          </a>
          <details className={styles.navMobile}>
            <summary className={styles.menuBtn}>
              <span className={styles.burger} aria-hidden="true" />
              <span className={styles.srOnly}>Abrir menú</span>
            </summary>
            <nav aria-label="Principal (móvil)" className={styles.menuPanel}>
              <ul>
                {NAV.map((n) => (
                  <li key={n.href}>
                    <a href={n.href}>{n.label}</a>
                  </li>
                ))}
                <li>
                  <a href="#contacto" className={styles.menuCta}>
                    Empezá tu proyecto
                  </a>
                </li>
              </ul>
            </nav>
          </details>
        </div>
      </header>

      <main id="main">
        {/* ───────────── Hero ───────────── */}
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroGlow} aria-hidden="true" />
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <p className={styles.kicker}>
                <span className={styles.kickerDot} aria-hidden="true" />
                {profile.studio} <span aria-hidden="true">·</span> {profile.location}
              </p>
              <h1 id="hero-title" className={styles.h1}>
                {profile.headline.before}
                <span className={styles.highlight}>{profile.headline.highlight}</span>
                {profile.headline.after}
              </h1>
              <p className={styles.intro}>{profile.intro}</p>
              <div className={styles.heroCtas}>
                <a href="#contacto" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`}>
                  Empezá tu proyecto
                </a>
                <a href="#casos" className={`${styles.btn} ${styles.btnGhost} ${styles.btnLg}`}>
                  Ver nuestro trabajo
                </a>
              </div>
            </div>

            <figure className={styles.heroVisual}>
              <BrowserFrame url={hostOf(heroProject.liveUrl) || heroProject.title}>
                <Shot
                  src={heroProject.image!}
                  alt={`Captura del sitio de ${heroProject.title}: ${heroProject.subtitle}`}
                  sizes="(min-width: 1100px) 760px, 100vw"
                  priority
                />
              </BrowserFrame>

              <a href={heroProject.caseStudyUrl} className={styles.floatCase}>
                <span className={styles.floatEyebrow}>Case study</span>
                <span className={styles.floatTitle}>{heroProject.title}</span>
                <span className={styles.floatSub}>{heroProject.industry} · {heroProject.role}</span>
                <span className={styles.floatLink}>
                  Ver caso <span aria-hidden="true">→</span>
                </span>
              </a>

              <div className={styles.floatStat}>
                <span className={styles.floatStatValue}>{countries.value}</span>
                <span className={styles.floatStatLabel}>{countries.label}</span>
                <span className={styles.floatFlags} aria-hidden="true">
                  {flags.join(' ')}
                </span>
              </div>
              <figcaption className={styles.srOnly}>
                {heroProject.title}, {heroProject.subtitle}.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ───────────── Franja de prueba ───────────── */}
        <section className={styles.proof} aria-label="Cifras y mercados">
          <div className={styles.proofInner}>
            <ul className={styles.proofStats}>
              {stats.map((s) => (
                <li key={s.label}>
                  <span className={styles.proofValue}>{s.value}</span>
                  <span className={styles.proofLabel}>{s.label}</span>
                </li>
              ))}
            </ul>
            <p className={styles.proofReach}>{profile.reach}</p>
          </div>
          <div className={styles.marquee}>
            <ul className={styles.marqueeTrack}>
              {markets.map((m, i) => (
                <li key={m.city + i}>
                  <span aria-hidden="true">{m.flag}</span> {m.city}
                </li>
              ))}
            </ul>
            <ul className={`${styles.marqueeTrack} ${styles.marqueeDup}`} aria-hidden="true">
              {markets.map((m, i) => (
                <li key={m.city + i}>
                  <span>{m.flag}</span> {m.city}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ───────────── Servicios ───────────── */}
        <section className={styles.section} id="servicios" aria-labelledby="servicios-title">
          <div className={styles.wrap}>
            <header className={styles.sectionHead}>
              <p className={styles.eyebrow}>Servicios</p>
              <h2 id="servicios-title" className={styles.h2}>
                Lo que construimos
              </h2>
              <p className={styles.lede}>{profile.tagline}</p>
            </header>
            <ul className={styles.services}>
              {services.map((s, i) => (
                <Reveal as="li" key={s.title} delay={(i % 3) * 70} className={styles.serviceCard}>
                  <span className={styles.serviceTop}>
                    <span className={styles.serviceNo} aria-hidden="true">
                      {pad(i + 1)}
                    </span>
                    <span className={styles.serviceShort}>{s.short}</span>
                  </span>
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
        <section className={`${styles.section} ${styles.sectionVelo}`} id="casos" aria-labelledby="casos-title">
          <div className={styles.wrap}>
            <header className={`${styles.sectionHead} ${styles.sectionHeadRow}`}>
              <div>
                <p className={styles.eyebrow}>Case studies</p>
                <h2 id="casos-title" className={styles.h2}>
                  Proyectos seleccionados
                </h2>
              </div>
              <a href="/projects" className={styles.textLink}>
                Ver todos los case studies <span aria-hidden="true">→</span>
              </a>
            </header>

            <Reveal as="article" className={styles.lead}>
              <a href={lead.caseStudyUrl} className={styles.leadMedia} tabIndex={-1} aria-hidden="true">
                <Shot src={lead.image!} alt="" sizes="(min-width: 1100px) 720px, 100vw" />
              </a>
              <div className={styles.leadText}>
                <CaseMeta p={lead} />
                <h3 className={styles.leadTitle}>
                  <a href={lead.caseStudyUrl}>{lead.title}</a>
                </h3>
                {lead.subtitle && <p className={styles.caseSub}>{lead.subtitle}</p>}
                <p className={`${styles.body} ${styles.leadDesc}`}>{lead.description}</p>
                <StackChips stack={lead.stack} max={6} />
                <CaseLinks p={lead} />
              </div>
            </Reveal>

            <ul className={styles.cases}>
              {rest.map((p, i) => (
                <Reveal as="li" key={p.slug} delay={(i % 3) * 70} className={styles.caseCard}>
                  <article>
                    <Shot
                      src={p.image!}
                      alt={`Captura de ${p.title}`}
                      sizes="(min-width: 1100px) 400px, (min-width: 700px) 45vw, 100vw"
                    />
                    <div className={styles.caseBody}>
                      <CaseMeta p={p} />
                      <h3 className={styles.caseTitle}>
                        <a href={p.caseStudyUrl} className={styles.stretch}>
                          {p.title}
                        </a>
                      </h3>
                      {p.subtitle && <p className={styles.caseSubSm}>{p.subtitle}</p>}
                      <StackChips stack={p.stack} max={4} />
                      <span className={styles.caseMore} aria-hidden="true">
                        Ver caso →
                      </span>
                    </div>
                  </article>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ───────────── Estudio + principios ───────────── */}
        <section className={styles.section} id="estudio" aria-labelledby="estudio-title">
          <div className={`${styles.wrap} ${styles.about}`}>
            <div className={styles.aboutCopy}>
              <p className={styles.eyebrow}>{profile.aboutSubtitle}</p>
              <h2 id="estudio-title" className={styles.h2}>
                {profile.aboutTitle}
              </h2>
              <p className={styles.bodyLg}>{profile.bio[0]}</p>
              <p className={styles.body}>{profile.bio[1]}</p>
              <p className={styles.body}>{profile.bio[3]}</p>
              <img src="/isotipo-panda-programando.svg" alt="" className={styles.panda} width={120} height={120} />
            </div>
            <ol className={styles.principles}>
              {principles.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 80} className={styles.principle}>
                  <span className={styles.principleNo} aria-hidden="true">
                    {pad(i + 1)}
                  </span>
                  <div>
                    <p className={styles.principleEyebrow}>{p.eyebrow}</p>
                    <h3 className={styles.h3}>{p.title}</h3>
                    <p className={styles.body}>{p.description}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ───────────── Proceso ───────────── */}
        <section className={`${styles.section} ${styles.sectionDark}`} id="proceso" aria-labelledby="proceso-title">
          <div className={styles.wrap}>
            <header className={styles.sectionHead}>
              <p className={`${styles.eyebrow} ${styles.eyebrowDark}`}>Proceso</p>
              <h2 id="proceso-title" className={styles.h2}>
                Cómo trabajamos
              </h2>
            </header>
            <ol className={styles.process}>
              {process.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 80} className={styles.step}>
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

        {/* ───────────── Stack ───────────── */}
        <section className={styles.section} aria-labelledby="stack-title">
          <div className={styles.wrap}>
            <header className={styles.sectionHead}>
              <p className={styles.eyebrow}>Stack</p>
              <h2 id="stack-title" className={styles.h2}>
                Herramientas con las que construimos
              </h2>
            </header>
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
          </div>
        </section>

        {/* ───────────── Testimonios ───────────── */}
        <section className={`${styles.section} ${styles.sectionVelo}`} aria-labelledby="testimonios-title">
          <div className={styles.wrap}>
            <header className={styles.sectionHead}>
              <p className={styles.eyebrow}>Testimonios</p>
              <h2 id="testimonios-title" className={styles.h2}>
                Lo que dicen quienes trabajaron con nosotros
              </h2>
            </header>
          </div>
          <ul className={styles.quotes}>
            {testimonials.map((t) => (
              <li key={t.name} className={styles.quote}>
                <figure>
                  <blockquote>
                    <p>“{t.quote}”</p>
                  </blockquote>
                  <figcaption>
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
              </li>
            ))}
          </ul>
        </section>

        {/* ───────────── Contacto ───────────── */}
        <section className={styles.contact} id="contacto" aria-labelledby="contacto-title">
          <div className={styles.contactInner}>
            <div>
              <p className={`${styles.eyebrow} ${styles.eyebrowDark}`}>Contacto</p>
              <h2 id="contacto-title" className={styles.contactTitle}>
                {contact.title}
              </h2>
              <p className={styles.contactSub}>{contact.subtitle}</p>
            </div>
            <div className={styles.contactActions}>
              <a href={`mailto:${contact.email}`} className={`${styles.btn} ${styles.btnLight} ${styles.btnLg}`}>
                {contact.cta}
              </a>
              <a href={`mailto:${contact.email}`} className={styles.contactEmail}>
                {contact.email}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <img src="/brand-header-dark.svg" alt={`${profile.name} · ${profile.studio}`} width={130} height={48} />
            <p>{footer.tagline}</p>
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
          <ul className={styles.footerSocials}>
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
        <p className={styles.footerMeta}>
          {profile.location} <span aria-hidden="true">·</span> {profile.reach}
        </p>
      </footer>
    </div>
  );
}

function CaseMeta({ p }: { p: Project }) {
  const loc = p.locations[0];
  return (
    <p className={styles.caseMeta}>
      <span>{p.industry?.split('•')[0].trim()}</span>
      {loc && (
        <span>
          <span aria-hidden="true">{loc.flag}</span> {loc.label}
        </span>
      )}
    </p>
  );
}

function StackChips({ stack, max }: { stack: string[]; max: number }) {
  return (
    <ul className={styles.stackChips} aria-label="Stack">
      {stack.slice(0, max).map((s) => (
        <li key={s}>{s}</li>
      ))}
      {stack.length > max && <li className={styles.stackMore}>+{stack.length - max}</li>}
    </ul>
  );
}

function CaseLinks({ p }: { p: Project }) {
  return (
    <p className={styles.caseLinks}>
      <a href={p.caseStudyUrl} className={`${styles.btn} ${styles.btnPrimary}`}>
        Ver caso<span className={styles.srOnly}> de {p.title}</span>
      </a>
      {p.liveUrl && (
        <a href={p.liveUrl} className={`${styles.btn} ${styles.btnGhost}`} target="_blank" rel="noopener noreferrer">
          Ver sitio<span className={styles.srOnly}> de {p.title} (abre en una pestaña nueva)</span>
          <span aria-hidden="true"> ↗</span>
        </a>
      )}
    </p>
  );
}
