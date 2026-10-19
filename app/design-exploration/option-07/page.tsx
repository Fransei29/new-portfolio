// design-exploration/option-07 — "Playful"
// Color, formas y microinteracciones: serio en el trabajo, divertido en la forma.
// Formas hechas con CSS (sin assets), tags tipo sticker, tarjetas que se inclinan.

import type { Metadata } from 'next';
import Image from 'next/image';
import { Unbounded, DM_Sans } from 'next/font/google';
import Reveal from '../_shared/Reveal';
import { content, featuredProjects } from '../_shared/content';
import TiltCard from './TiltCard';
import CopyEmail from './CopyEmail';
import styles from './option.module.css';

const display = Unbounded({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--o7-display',
  display: 'swap',
});

const body = DM_Sans({
  subsets: ['latin'],
  variable: '--o7-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '07 · Playful — Exploración',
};

const { profile, stats, markets, principles, process, services, experience, skills, testimonials, contact, footer } = content;

const TONES = ['violet', 'coral', 'mint'] as const;
const tone = (i: number) => styles[TONES[i % TONES.length]];

const NAV = [
  { href: '#sobre', label: 'Nosotros' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#experiencia', label: 'Experiencia' },
];

const projects = featuredProjects.slice(0, 8);

const firstParagraph = (s: string) => s.split('\n')[0];

export default function OptionPlayful() {
  const fontVars = `${display.variable} ${body.variable}`;
  const year = new Date().getFullYear();

  return (
    <div className={`dx-root ${styles.root} ${fontVars}`} lang="es">
      <a className="dx-skip" href="#main">
        Saltar al contenido
      </a>

      {/* ───────────── Header ───────────── */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="#main" className={styles.logo} aria-label={`${profile.name}, inicio`}>
            <span className={styles.logoMark} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className={styles.logoText}>{profile.name}</span>
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
        <section className={styles.hero} aria-labelledby="o7-hero-title">
          <div className={styles.shapes} aria-hidden="true">
            <span className={styles.blobCoral} />
            <span className={styles.circleMint} />
            <span className={styles.starViolet} />
            <span className={styles.ring} />
            <svg className={styles.squiggle} viewBox="0 0 220 40" fill="none">
              <path
                d="M4 20c14-18 28-18 42 0s28 18 42 0 28-18 42 0 28 18 42 0 28-18 42 0"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className={styles.heroInner}>
            <ul className={styles.heroStickers} aria-label="Datos del estudio">
              <li className={`${styles.sticker} ${styles.stickerViolet}`}>{profile.studio}</li>
              <li className={`${styles.sticker} ${styles.stickerMint}`}>
                <span aria-hidden="true">📍</span> {profile.location}
              </li>
            </ul>

            <h1 id="o7-hero-title" className={styles.heroTitle}>
              {profile.headline.before}
              <span className={styles.heroHighlight}>
                <span>{profile.headline.highlight}</span>
              </span>
              {profile.headline.after}
            </h1>

            <div className={styles.heroBottom}>
              <p className={styles.heroIntro}>{profile.intro}</p>
              <div className={styles.heroActions}>
                <a href="#contacto" className={`${styles.btn} ${styles.btnPrimary}`}>
                  {contact.cta}
                  <span className={styles.btnIcon} aria-hidden="true">
                    →
                  </span>
                </a>
                <a href="#proyectos" className={`${styles.btn} ${styles.btnGhost}`}>
                  Ver proyectos
                </a>
              </div>
            </div>

            <p className={styles.heroReach}>
              <span className={styles.heroReachLabel}>Trabajamos con</span> {profile.reach}
            </p>
          </div>
        </section>

        {/* ───────────── Marquee de mercados ───────────── */}
        <section className={styles.marquee} aria-label="Ciudades con proyectos">
          <ul className={styles.srOnly}>
            {markets.map((m) => (
              <li key={m.city}>{m.city}</li>
            ))}
          </ul>
          <div className={styles.marqueeTrack} aria-hidden="true">
            {[0, 1].map((k) => (
              <div className={styles.marqueeGroup} key={k}>
                {markets.map((m) => (
                  <span className={styles.marqueeItem} key={`${k}-${m.city}`}>
                    <span className={styles.marqueeFlag}>{m.flag}</span>
                    {m.city}
                    <span className={styles.marqueeDot}>✺</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ───────────── Sobre nosotros ───────────── */}
        <section id="sobre" className={styles.section} aria-labelledby="o7-about-title">
          <div className={styles.container}>
            <Reveal className={styles.sectionHead}>
              <p className={`${styles.kicker} ${styles.kickerCoral}`}>{profile.aboutSubtitle}</p>
              <h2 id="o7-about-title" className={styles.h2}>
                {profile.aboutTitle}
              </h2>
            </Reveal>

            <div className={styles.aboutGrid}>
              <Reveal className={styles.bioCard}>
                <p className={styles.bioLead}>{profile.bio[0]}</p>
                {profile.bio.slice(1).map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </Reveal>

              <ul className={styles.stats}>
                {stats.map((s, i) => (
                  <Reveal as="li" key={s.label} delay={i * 90} className={`${styles.stat} ${tone(i + 1)}`}>
                    <span className={styles.statValue}>{s.value}</span>
                    <span className={styles.statLabel}>{s.label}</span>
                  </Reveal>
                ))}
              </ul>
            </div>

            <ul className={styles.principles}>
              {principles.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 90} className={styles.principle}>
                  <span className={`${styles.sticker} ${styles.principleSticker} ${tone(i)}`}>{p.eyebrow}</span>
                  <h3 className={styles.h3}>{p.title}</h3>
                  <p>{p.description}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ───────────── Servicios ───────────── */}
        <section id="servicios" className={`${styles.section} ${styles.sectionTint}`} aria-labelledby="o7-services-title">
          <div className={styles.container}>
            <Reveal className={styles.sectionHead}>
              <p className={`${styles.kicker} ${styles.kickerViolet}`}>Qué hacemos</p>
              <h2 id="o7-services-title" className={styles.h2}>
                Servicios
              </h2>
            </Reveal>

            <ul className={styles.services}>
              {services.map((s, i) => (
                <Reveal as="li" key={s.title} delay={(i % 3) * 80} className={styles.serviceWrap}>
                  <article className={`${styles.service} ${tone(i)}`}>
                    <span className={styles.serviceShort} aria-hidden="true">
                      {s.short}
                    </span>
                    <h3 className={styles.h3}>{s.title}</h3>
                    <p>{s.description}</p>
                    {s.tags.length > 0 && (
                      <ul className={styles.serviceTags} aria-label="Especialidades">
                        {s.tags.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    )}
                  </article>
                </Reveal>
              ))}
            </ul>

            {/* Proceso */}
            <div className={styles.process}>
              <h3 className={`${styles.h3} ${styles.processTitle}`}>Cómo trabajamos</h3>
              <ol className={styles.steps}>
                {process.map((p, i) => (
                  <Reveal as="li" key={p.title} delay={i * 90} className={styles.step}>
                    <span className={`${styles.stepNum} ${tone(i)}`} aria-hidden="true">
                      {i + 1}
                    </span>
                    <h4 className={styles.h4}>{p.title}</h4>
                    <p>{p.description}</p>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ───────────── Proyectos ───────────── */}
        <section id="proyectos" className={styles.section} aria-labelledby="o7-projects-title">
          <div className={styles.container}>
            <Reveal className={styles.sectionHead}>
              <p className={`${styles.kicker} ${styles.kickerMint}`}>Case studies</p>
              <h2 id="o7-projects-title" className={styles.h2}>
                Proyectos destacados
              </h2>
            </Reveal>

            <ul className={styles.projects}>
              {projects.map((p, i) => {
                const extra = p.stack.length - 5;
                return (
                  <Reveal as="li" key={p.slug} delay={(i % 3) * 80} className={`${styles.projectItem} ${i === 0 ? styles.projectWide : ''}`}>
                    <TiltCard className={`${styles.project} ${tone(i)}`}>
                      <div className={styles.projectMedia}>
                        {p.image && (
                          <Image
                            src={p.image}
                            alt={p.title}
                            fill
                            sizes={i === 0 ? '(min-width: 1100px) 760px, (min-width: 700px) 90vw, 100vw' : '(min-width: 1100px) 380px, (min-width: 700px) 45vw, 100vw'}
                            className={styles.projectImg}
                          />
                        )}
                        {p.industry && <span className={styles.projectIndustry}>{p.industry.split('•')[0].trim()}</span>}
                      </div>
                      <div className={styles.projectBody}>
                        <h3 className={styles.projectTitle}>{p.title}</h3>
                        {p.subtitle && <p className={styles.projectSub}>{p.subtitle}</p>}
                        <p className={styles.projectDesc}>{firstParagraph(p.description)}</p>
                        <ul className={styles.chips} aria-label="Stack">
                          {p.stack.slice(0, 5).map((t) => (
                            <li key={t}>{t}</li>
                          ))}
                          {extra > 0 && <li className={styles.chipMore}>+{extra}</li>}
                        </ul>
                        <div className={styles.projectLinks}>
                          <a href={p.caseStudyUrl} className={styles.projectLink}>
                            Ver case study <span className={styles.srOnly}>de {p.title}</span>
                            <span aria-hidden="true">→</span>
                          </a>
                          {p.liveUrl && (
                            <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.projectLinkAlt}>
                              Ver sitio <span className={styles.srOnly}>de {p.title} (se abre en otra pestaña)</span>
                              <span aria-hidden="true">↗</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </TiltCard>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </section>

        {/* ───────────── Experiencia + skills ───────────── */}
        <section id="experiencia" className={`${styles.section} ${styles.sectionTint}`} aria-labelledby="o7-exp-title">
          <div className={styles.container}>
            <Reveal className={styles.sectionHead}>
              <p className={`${styles.kicker} ${styles.kickerCoral}`}>Trayectoria</p>
              <h2 id="o7-exp-title" className={styles.h2}>
                Experiencia y skills
              </h2>
            </Reveal>

            <div className={styles.expGrid}>
              <ol className={styles.timeline}>
                {experience.map((e, i) => (
                  <Reveal as="li" key={e.company + e.period} className={styles.job}>
                    <span className={`${styles.jobDot} ${tone(i)}`} aria-hidden="true" />
                    <p className={styles.jobPeriod}>{e.period}</p>
                    <h3 className={styles.jobCompany}>{e.company}</h3>
                    <p className={styles.jobRole}>{e.role}</p>
                    <ul className={styles.jobHighlights}>
                      {e.highlights.slice(0, 3).map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                    <ul className={styles.chips} aria-label="Stack">
                      {e.stack.slice(0, 8).map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </Reveal>
                ))}
              </ol>

              <aside className={styles.skills} aria-labelledby="o7-skills-title">
                <h3 id="o7-skills-title" className={styles.h3}>
                  Skills
                </h3>
                {(
                  [
                    ['Frontend', skills.frontend],
                    ['Backend', skills.backend],
                    ['Herramientas', skills.tools],
                  ] as const
                ).map(([label, list], i) => (
                  <Reveal key={label} delay={i * 80} className={`${styles.skillJar} ${tone(i)}`}>
                    <h4 className={styles.skillLabel}>{label}</h4>
                    <ul className={styles.skillList}>
                      {list.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </Reveal>
                ))}
              </aside>
            </div>
          </div>
        </section>

        {/* ───────────── Testimonios ───────────── */}
        <section className={styles.section} aria-labelledby="o7-testi-title">
          <div className={styles.container}>
            <Reveal className={styles.sectionHead}>
              <p className={`${styles.kicker} ${styles.kickerViolet}`}>Clientes y colegas</p>
              <h2 id="o7-testi-title" className={styles.h2}>
                Testimonios
              </h2>
            </Reveal>
            <ul className={styles.quotes}>
              {testimonials.map((t, i) => (
                <Reveal as="li" key={t.name} className={`${styles.quoteItem} ${i === 0 ? styles.quoteFeatured : ''}`}>
                  <figure className={`${styles.quote} ${tone(i)}`}>
                    <blockquote>
                      <p>{t.quote}</p>
                    </blockquote>
                    <figcaption>
                      <span className={styles.quoteAvatar} aria-hidden="true">
                        {t.name
                          .split(' ')
                          .map((w) => w[0])
                          .slice(0, 2)
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

        {/* ───────────── Contacto ───────────── */}
        <section id="contacto" className={styles.contact} aria-labelledby="o7-contact-title">
          <div className={styles.contactShapes} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className={`${styles.container} ${styles.contactInner}`}>
            <Reveal>
              <p className={styles.contactKicker}>{contact.cta}</p>
              <h2 id="o7-contact-title" className={styles.contactTitle}>
                {contact.title}
              </h2>
              <p className={styles.contactSub}>{contact.subtitle}</p>
            </Reveal>

            <div className={styles.contactActions}>
              <a href={`mailto:${contact.email}`} className={styles.contactEmail}>
                {contact.email}
              </a>
              <CopyEmail email={contact.email} className={styles.copyBtn} doneClassName={styles.copyBtnDone} />
            </div>

            <ul className={styles.socials} aria-label="Redes">
              {contact.socials.map((s, i) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className={`${styles.social} ${tone(i + 1)}`}>
                    {s.label}
                    <span className={styles.srOnly}> (se abre en otra pestaña)</span>
                    <span aria-hidden="true"> ↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      {/* ───────────── Footer ───────────── */}
      <footer className={styles.footer}>
        <div className={`${styles.container} ${styles.footerInner}`}>
          <div>
            <p className={styles.footerName}>{profile.name}</p>
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
            © {year} {profile.name} · {profile.location}
          </p>
        </div>
      </footer>
    </div>
  );
}
