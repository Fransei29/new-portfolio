'use client';

// app/fun/FunPage.tsx
// El portafolio en "modo fun": mismo contenido que el sitio, otra forma.
// Recibe los dos idiomas ya armados en el servidor y muestra el que esté activo
// en el LanguageContext del sitio, así el selector de idioma es uno solo.

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import type { FunContent } from './_lib/buildContent';
import { FUN_COPY, SOCIALS } from './_lib/copy';
import Reveal from './Reveal';
import TiltCard from './TiltCard';
import CopyEmail from './CopyEmail';
import PandaMascot from './PandaMascot';
import FunIntro from './FunIntro';
import BackToTop from './BackToTop';
import ExitLink from './ExitLink';
import styles from './fun.module.css';

// Los lilas de la marca llevan el peso; coral y menta acompañan.
const TONES = ['violet', 'coral', 'lilac'] as const;
const tone = (i: number) => styles[TONES[i % TONES.length]];

/** Cuántos proyectos destacados se muestran. 8 cierra filas completas en 3 y en 2 columnas. */
const PROJECT_COUNT = 8;

const initials = (name: string) =>
  name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('');

interface FunPageProps {
  data: Record<'es' | 'en', FunContent>;
  fontVars: string;
  year: number;
}

export default function FunPage({ data, fontVars, year }: FunPageProps) {
  const { language, setLanguage } = useLanguage();
  const c = data[language] ?? data.en;
  const ui = FUN_COPY[language] ?? FUN_COPY.en;
  const otherLanguage = language === 'es' ? 'en' : 'es';
  const [menuOpen, setMenuOpen] = useState(false);

  // Menú mobile: se cierra con Escape y al pasar a desktop.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    const mq = window.matchMedia('(min-width: 900px)');
    const onChange = () => mq.matches && setMenuOpen(false);
    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onChange);
    return () => {
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onChange);
    };
  }, [menuOpen]);

  const nav = [
    { href: '#about', label: c.nav.about },
    { href: '#services', label: c.nav.services },
    { href: '#projects', label: c.nav.projects },
  ];
  const projects = c.projects.items.slice(0, PROJECT_COUNT);

  return (
    <div className={`fun-root ${styles.root} ${fontVars}`} lang={language}>
      <FunIntro />
      <a className={styles.skip} href="#main">
        {ui.skip}
      </a>

      {/* ───────────── Header ───────────── */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="#main" className={styles.logo}>
            <span className={styles.logoMark} aria-hidden="true">
              <Image src="/isotipo-panda.svg" alt="" width={30} height={29} unoptimized />
            </span>
            <span className={styles.logoText}>Franco Seiler</span>
          </a>

          <nav id="fun-nav" aria-label="Menu" className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
            <ul>
              {nav.map((n, i) => (
                <li key={n.href} style={{ ['--i' as string]: i }}>
                  <a href={n.href} onClick={() => setMenuOpen(false)}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
            {/* Sólo en el menú mobile: en desktop contacto y salida viven en la barra. */}
            <div className={styles.navExtras}>
              <a href="#contact" className={styles.navContact} onClick={() => setMenuOpen(false)}>
                {c.nav.contact}
                <span aria-hidden="true">→</span>
              </a>
              <ExitLink className={styles.navExit}>
                <span className={styles.exitIcon} aria-hidden="true">
                  ✕
                </span>
                {ui.exit}
              </ExitLink>
            </div>
          </nav>

          <div className={styles.headerActions}>
            <button
              type="button"
              className={styles.langToggle}
              onClick={() => setLanguage(otherLanguage)}
              aria-label={`${ui.languageLabel}: ${otherLanguage.toUpperCase()}`}
            >
              <span className={language === 'es' ? styles.langOn : ''}>ES</span>
              <span className={language === 'en' ? styles.langOn : ''}>EN</span>
            </button>
            <ExitLink className={styles.exit} aria-label={ui.exitLabel}>
              <span className={styles.exitIcon} aria-hidden="true">
                ✕
              </span>
              <span className={styles.exitText}>{ui.exit}</span>
            </ExitLink>
            <a href="#contact" className={styles.headerCta}>
              {c.nav.contact}
            </a>
            <button
              type="button"
              className={`${styles.menuButton} ${menuOpen ? styles.menuButtonOpen : ''}`}
              aria-expanded={menuOpen}
              aria-controls="fun-nav"
              aria-label={menuOpen ? ui.menuClose : ui.menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        {/* ───────────── Hero ───────────── */}
        <section className={styles.hero} aria-labelledby="fun-hero-title">
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
            <ul className={styles.heroStickers}>
              <li className={`${styles.sticker} ${styles.stickerViolet}`}>{ui.studio}</li>
              <li className={`${styles.sticker} ${styles.stickerMint}`}>
                <span aria-hidden="true">📍</span> {ui.madeIn}
              </li>
            </ul>

            <h1 id="fun-hero-title" className={styles.heroTitle}>
              {c.headline.before}{' '}
              <span className={styles.heroHighlight}>{c.headline.highlight}</span> {c.headline.after}
            </h1>

            <div className={styles.heroBottom}>
              <p className={styles.heroIntro}>{c.intro}</p>
              <div className={styles.heroRow}>
                <div className={styles.heroActions}>
                  <Link href="/contact" className={`${styles.btn} ${styles.btnPrimary}`}>
                    {c.contact.cta}
                    <span className={styles.btnIcon} aria-hidden="true">
                      →
                    </span>
                  </Link>
                  <a href="#projects" className={`${styles.btn} ${styles.btnGhost}`}>
                    {c.projects.title}
                  </a>
                </div>
                <PandaMascot hello={ui.pandaHello} lines={ui.pandaLines} label={ui.pandaLabel} />
              </div>
            </div>
          </div>
        </section>

        {/* ───────────── Marquee de regiones ───────────── */}
        <section className={styles.marquee} aria-label={c.reach}>
          <p className={styles.srOnly}>{c.reach}</p>
          <div className={styles.marqueeBand} aria-hidden="true">
          <div className={styles.marqueeTrack}>
            {[0, 1].map((k) => (
              <div className={styles.marqueeGroup} key={k}>
                {[0, 1, 2].flatMap((r) =>
                  c.regions.map((region) => (
                    <span className={styles.marqueeItem} key={`${k}-${r}-${region}`}>
                      {region}
                      <span className={styles.marqueeDot}>✺</span>
                    </span>
                  ))
                )}
              </div>
            ))}
          </div>
          </div>
        </section>

        {/* ───────────── Nosotros ───────────── */}
        <section id="about" className={styles.section} aria-labelledby="fun-about-title">
          <div className={styles.container}>
            <Reveal className={styles.sectionHead}>
              <p className={`${styles.kicker} ${styles.kickerCoral}`}>{c.about.eyebrow}</p>
              <h2 id="fun-about-title" className={styles.h2}>
                {c.about.title}
              </h2>
            </Reveal>

            <div className={styles.aboutGrid}>
              <Reveal className={styles.bioCard}>
                <p className={styles.bioLead}>{c.about.lead}</p>
                {c.about.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </Reveal>

              <ul className={styles.stats}>
                {c.stats.map((s, i) => (
                  <Reveal as="li" key={s.label} delay={i * 90} className={`${styles.stat} ${tone(i + 1)}`}>
                    <span className={styles.statValue}>{s.value}</span>
                    <span className={styles.statLabel}>{s.label}</span>
                  </Reveal>
                ))}
              </ul>
            </div>

            <ul className={styles.principles}>
              {c.principles.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 90} className={styles.principle}>
                  <span className={`${styles.sticker} ${styles.principleSticker} ${tone(i)}`}>{p.eyebrow}</span>
                  <h3 className={styles.h3}>{p.title}</h3>
                  <p>{p.description}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ───────────── Servicios + proceso ───────────── */}
        <section id="services" className={`${styles.section} ${styles.sectionTint}`} aria-labelledby="fun-services-title">
          <div className={styles.container}>
            <Reveal className={styles.sectionHead}>
              <p className={`${styles.kicker} ${styles.kickerViolet}`}>{ui.kickers.services}</p>
              <h2 id="fun-services-title" className={styles.h2}>
                {c.services.title}
              </h2>
              <p className={styles.sectionSub}>{c.services.subtitle}</p>
            </Reveal>

            <ul className={styles.services}>
              {c.services.items.map((s, i) => (
                <Reveal as="li" key={s.title} delay={(i % 3) * 80} className={styles.serviceWrap}>
                  <article className={`${styles.service} ${tone(i)}`}>
                    <span className={styles.serviceShort} aria-hidden="true">
                      {s.short}
                    </span>
                    <h3 className={styles.h3}>{s.title}</h3>
                    <p>{s.description}</p>
                    {s.tags.length > 0 && (
                      <ul className={styles.serviceTags}>
                        {s.tags.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    )}
                  </article>
                </Reveal>
              ))}
            </ul>

            <div className={styles.process}>
              <h3 className={`${styles.h3} ${styles.processTitle}`}>{c.process.title}</h3>
              <p className={styles.processSub}>{c.process.subtitle}</p>
              <ol className={styles.steps}>
                {c.process.steps.map((p, i) => (
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
        <section id="projects" className={styles.section} aria-labelledby="fun-projects-title">
          <div className={styles.container}>
            <Reveal className={styles.sectionHead}>
              <p className={`${styles.kicker} ${styles.kickerMint}`}>{ui.kickers.projects}</p>
              <h2 id="fun-projects-title" className={styles.h2}>
                {c.projects.title}
              </h2>
              <p className={styles.sectionSub}>{c.projects.subtitle}</p>
            </Reveal>

            <p className={styles.swipeHint} aria-hidden="true">
              {ui.swipe} <span>→</span>
            </p>
            <ul className={styles.projects}>
              {projects.map((p, i) => {
                const extra = p.stack.length - 5;
                return (
                  <Reveal
                    as="li"
                    key={p.slug}
                    delay={(i % 3) * 80}
                    className={`${styles.projectItem} ${i === 0 ? styles.projectWide : ''}`}
                  >
                    <TiltCard className={`${styles.project} ${tone(i)}`}>
                      <div className={styles.projectMedia}>
                        {p.image && (
                          <Image
                            src={p.image}
                            alt={p.title}
                            fill
                            sizes={
                              i === 0
                                ? '(min-width: 1100px) 760px, (min-width: 700px) 90vw, 100vw'
                                : '(min-width: 1100px) 380px, (min-width: 700px) 45vw, 100vw'
                            }
                            className={styles.projectImg}
                          />
                        )}
                        {p.industry && <span className={styles.projectIndustry}>{p.industry.split('•')[0].trim()}</span>}
                      </div>
                      <div className={styles.projectBody}>
                        <h3 className={styles.projectTitle}>{p.title}</h3>
                        {p.subtitle && <p className={styles.projectSub}>{p.subtitle}</p>}
                        <p className={styles.projectDesc}>{p.description.split('\n')[0]}</p>
                        <ul className={styles.chips} aria-label="Stack">
                          {p.stack.slice(0, 5).map((t) => (
                            <li key={t}>{t}</li>
                          ))}
                          {extra > 0 && <li className={styles.chipMore}>+{extra}</li>}
                        </ul>
                        <div className={styles.projectLinks}>
                          <Link href={p.caseStudyUrl} className={styles.projectLink}>
                            {c.projects.viewCase} <span className={styles.srOnly}>: {p.title}</span>
                            <span aria-hidden="true">→</span>
                          </Link>
                          {p.liveUrl && (
                            <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.projectLinkAlt}>
                              {c.projects.live}{' '}
                              <span className={styles.srOnly}>
                                : {p.title} {ui.newTab}
                              </span>
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

            <div className={styles.projectsMore}>
              <Link href="/projects" className={`${styles.btn} ${styles.btnGhost}`}>
                {c.projects.viewAll}
                <span className={styles.btnIcon} aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* ───────────── Testimonios ───────────── */}
        <section className={`${styles.section} ${styles.sectionTint}`} aria-labelledby="fun-testi-title">
          <div className={styles.container}>
            <Reveal className={styles.sectionHead}>
              <p className={`${styles.kicker} ${styles.kickerViolet}`}>{ui.kickers.testimonials}</p>
              <h2 id="fun-testi-title" className={styles.h2}>
                {c.testimonials.title}
              </h2>
              <p className={styles.sectionSub}>{c.testimonials.subtitle}</p>
            </Reveal>
            {(() => {
              const [first, ...rest] = c.testimonials.items;
              const quote = (t: typeof first, i: number) => (
                <figure className={`${styles.quote} ${tone(i)}`}>
                  <blockquote>
                    <p>{t.quote}</p>
                  </blockquote>
                  <figcaption>
                    <span className={styles.quoteAvatar} aria-hidden="true">
                      {initials(t.name)}
                    </span>
                    <span>
                      <strong>{t.name}</strong>
                      <span className={styles.quoteRole}>{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              );
              return (
                <>
                  <Reveal className={`${styles.quoteItem} ${styles.quoteFeatured}`}>{quote(first, 0)}</Reveal>
                  <p className={styles.swipeHint} aria-hidden="true">
                    {ui.swipe} <span>→</span>
                  </p>
                  <ul className={styles.quotes}>
                    {rest.map((t, i) => (
                      <Reveal as="li" key={t.name} className={styles.quoteItem}>
                        {quote(t, i + 1)}
                      </Reveal>
                    ))}
                  </ul>
                </>
              );
            })()}
          </div>
        </section>

        {/* ───────────── Contacto ───────────── */}
        <section id="contact" className={styles.contact} aria-labelledby="fun-contact-title">
          <div className={styles.contactShapes} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className={`${styles.container} ${styles.contactInner}`}>
            <Reveal>
              <p className={styles.contactKicker}>{c.process.cta}</p>
              <h2 id="fun-contact-title" className={styles.contactTitle}>
                {c.contact.title}
              </h2>
              <p className={styles.contactSub}>{c.contact.subtitle}</p>
            </Reveal>

            <div className={styles.contactActions}>
              <Link href="/contact" className={styles.contactCta}>
                {c.contact.cta}
                <span aria-hidden="true">→</span>
              </Link>
              <a href={`mailto:${c.contact.email}`} className={styles.contactEmail}>
                {c.contact.email}
              </a>
              <CopyEmail
                email={c.contact.email}
                label={c.contact.copy}
                copiedLabel={ui.copied}
                failedLabel={ui.copyFailed}
                className={styles.copyBtn}
                doneClassName={styles.copyBtnDone}
              />
            </div>

            <ul className={styles.socials} aria-label={ui.socials}>
              {SOCIALS.map((s, i) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className={`${styles.social} ${tone(i + 1)}`}>
                    {s.label}
                    <span className={styles.srOnly}> {ui.newTab}</span>
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
            <p className={styles.footerName}>Franco Seiler</p>
            <p className={styles.footerTag}>{c.footerTagline}</p>
          </div>
          <nav aria-label="Footer">
            <ul className={styles.footerNav}>
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
              <li>
                <a href="#contact">{c.nav.contact}</a>
              </li>
              <li>
                <ExitLink className={styles.footerExit}>
                  {ui.exit}
                </ExitLink>
              </li>
            </ul>
          </nav>
          <p className={styles.footerMeta}>
            © {year} Franco Seiler · {ui.madeIn}
          </p>
        </div>
      </footer>
      <BackToTop label={ui.backToTop} />
    </div>
  );
}
