// design-exploration/option-09/page.tsx
// Dirección 09 · Revista: el portafolio como una edición impresa. Portada con
// cabecera gigante, índice, notas a varias columnas con capitulares, citas
// destacadas, tres reportajes a doble página y una grilla de breves.
import type { Metadata } from 'next';
import Image from 'next/image';
import { DM_Serif_Display, Libre_Franklin } from 'next/font/google';
import Reveal from '../_shared/Reveal';
import { content, featuredProjects, type Project } from '../_shared/content';
import styles from './option.module.css';

export const metadata: Metadata = {
  title: '09 · Revista — Exploración',
};

const display = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--rv-display',
});

const body = Libre_Franklin({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--rv-body',
});

const fontVars = `${display.variable} ${body.variable}`;

const { profile, stats, principles, process, services, experience, skills, testimonials, contact, footer, markets } =
  content;

const paragraphs = (text?: string) => (text ? text.split('\n').filter(Boolean) : []);

const features = featuredProjects.slice(0, 3);
const briefs = featuredProjects.slice(3);

const place = (p: Project) => p.locations.map((l) => l.label).join(' · ');

const toc = [
  { id: 'perfil', label: 'Perfil', dek: profile.aboutTitle },
  { id: 'reportajes', label: 'Reportajes', dek: features.map((p) => p.title).join(', ') },
  { id: 'breves', label: 'Breves', dek: briefs.map((p) => p.title).slice(0, 4).join(', ') + '…' },
  { id: 'servicios', label: 'Servicios', dek: services.map((s) => s.short).join(' · ') },
  { id: 'trayectoria', label: 'Trayectoria', dek: experience.map((e) => e.company).join(', ') },
  { id: 'voces', label: 'Voces', dek: testimonials.slice(3).map((t) => t.name).join(', ') },
  { id: 'contacto', label: 'Contacto', dek: contact.subtitle },
];

function Links({ p }: { p: Project }) {
  return (
    <p className={styles.links}>
      <a className={styles.linkPrimary} href={p.caseStudyUrl}>
        Ver case study <span aria-hidden="true">→</span>
      </a>
      {p.liveUrl && (
        <a className={styles.linkSecondary} href={p.liveUrl} target="_blank" rel="noopener noreferrer">
          Ver sitio <span aria-hidden="true">↗</span>
          <span className={styles.srOnly}> (se abre en una pestaña nueva)</span>
        </a>
      )}
    </p>
  );
}

function PullQuote({ t, wide = false }: { t: (typeof testimonials)[number]; wide?: boolean }) {
  return (
    <figure className={`${styles.pull} ${wide ? styles.pullWide : ''}`}>
      <blockquote>
        <p>{t.quote}</p>
      </blockquote>
      <figcaption>
        <span className={styles.pullName}>{t.name}</span>
        <span className={styles.pullRole}>{t.role}</span>
      </figcaption>
    </figure>
  );
}

function Rubric({ n, label }: { n: string; label: string }) {
  return (
    <p className={styles.rubric}>
      <span className={styles.rubricNum}>{n}</span>
      <span>{label}</span>
    </p>
  );
}

function Feature({ p, index }: { p: Project; index: number }) {
  const variant = [styles.featureA, styles.featureB, styles.featureC][index % 3];
  return (
    <Reveal as="article" className={`${styles.feature} ${variant}`}>
      <header className={styles.featureHead}>
        <p className={styles.kicker}>
          <span>Reportaje {index + 1}</span>
          {p.industry && <span className={styles.kickerSep}>{p.industry}</span>}
        </p>
        <h3 className={styles.featureTitle}>{p.title}</h3>
        {p.subtitle && <p className={styles.featureDek}>{p.subtitle}</p>}
      </header>

      {p.image && (
        <figure className={styles.featureFigure}>
          <div className={styles.featureImg}>
            <Image
              src={p.image}
              alt={p.title}
              fill
              sizes="(max-width: 767px) 100vw, (max-width: 1199px) 90vw, 760px"
              priority={index === 0}
            />
          </div>
          <figcaption className={styles.caption}>
            {p.title}. {p.role}
            {place(p) ? ` · ${place(p)}` : ''}
          </figcaption>
        </figure>
      )}

      <div className={styles.featureBody}>
        <div className={styles.columns}>
          <h4 className={styles.subhead}>El problema</h4>
          {paragraphs(p.problem).map((t, i) => (
            <p key={i} className={i === 0 ? styles.dropcap : undefined}>
              {t}
            </p>
          ))}
          <h4 className={styles.subhead}>Lo que construimos</h4>
          {paragraphs(p.summary).map((t, i) => (
            <p key={i}>{t}</p>
          ))}
        </div>

        <aside className={styles.spec} aria-label={`Ficha técnica de ${p.title}`}>
          <p className={styles.specTitle}>Ficha</p>
          <dl>
            {p.role && (
              <div>
                <dt>Rol</dt>
                <dd>{p.role}</dd>
              </div>
            )}
            {p.industry && (
              <div>
                <dt>Industria</dt>
                <dd>{p.industry}</dd>
              </div>
            )}
            {p.engagement && (
              <div>
                <dt>Encargo</dt>
                <dd>{p.engagement}</dd>
              </div>
            )}
            {place(p) && (
              <div>
                <dt>Ubicación</dt>
                <dd>{place(p)}</dd>
              </div>
            )}
            <div>
              <dt>Stack</dt>
              <dd>{p.stack.join(', ')}</dd>
            </div>
          </dl>
          <Links p={p} />
        </aside>
      </div>
    </Reveal>
  );
}

export default function RevistaPage() {
  const cover = features[0];
  return (
    <div className={`dx-root ${styles.root} ${fontVars}`} lang="es">
      <a className="dx-skip" href="#main">
        Saltar al contenido
      </a>

      <header className={styles.topbar}>
        <div className={styles.wrap}>
          <div className={styles.topbarInner}>
            <p className={styles.topMeta}>
              <span className={styles.topEdition}>Edición</span> {profile.studio}
            </p>
            <nav aria-label="Secciones" className={styles.nav}>
              <ul>
                <li>
                  <a href="#indice">Índice</a>
                </li>
                <li>
                  <a href="#perfil">Perfil</a>
                </li>
                <li>
                  <a href="#reportajes">Proyectos</a>
                </li>
                <li>
                  <a href="#trayectoria">Trayectoria</a>
                </li>
                <li>
                  <a href="#contacto">Contacto</a>
                </li>
              </ul>
            </nav>
            <p className={styles.topMetaRight}>{profile.location}</p>
          </div>
        </div>
      </header>

      <main id="main">
        {/* ——— Portada ——— */}
        <section className={styles.cover} aria-labelledby="cover-title">
          <div className={styles.wrap}>
            <div className={styles.mastRule} aria-hidden="true" />
            <h1 id="cover-title" className={styles.masthead}>
              {profile.name}
            </h1>
            <div className={styles.mastLine}>
              <span>{profile.studio}</span>
              <span className={styles.mastDot} aria-hidden="true">
                ◆
              </span>
              <span>{profile.role}</span>
              <span className={styles.mastDot} aria-hidden="true">
                ◆
              </span>
              <span>{profile.reach}</span>
            </div>

            <div className={styles.coverGrid}>
              <div className={styles.coverLead}>
                <p className={styles.coverKicker}>{profile.tagline}</p>
                <p className={styles.coverHeadline}>
                  {profile.headline.before}
                  <em>{profile.headline.highlight}</em>
                  {profile.headline.after}
                </p>
                <p className={styles.coverIntro}>{profile.intro}</p>
                <p className={styles.coverActions}>
                  <a className={styles.btn} href="#contacto">
                    {contact.cta}
                  </a>
                  <a className={styles.textLink} href="#reportajes">
                    Leer los reportajes <span aria-hidden="true">↓</span>
                  </a>
                </p>
              </div>

              {cover?.image && (
                <figure className={styles.coverFigure}>
                  <div className={styles.coverImg}>
                    <Image
                      src={cover.image}
                      alt={cover.title}
                      fill
                      priority
                      sizes="(max-width: 767px) 100vw, (max-width: 1199px) 60vw, 720px"
                    />
                  </div>
                  <figcaption className={styles.caption}>
                    En portada: {cover.title}, {cover.subtitle}
                  </figcaption>
                </figure>
              )}

              <aside className={styles.coverLines} aria-label="En esta edición">
                <ul className={styles.coverStats}>
                  {stats.map((s) => (
                    <li key={s.label}>
                      <span className={styles.coverStatValue}>{s.value}</span>
                      <span className={styles.coverStatLabel}>{s.label}</span>
                    </li>
                  ))}
                </ul>
                <ul className={styles.coverStories}>
                  {features.map((p) => (
                    <li key={p.slug}>
                      <span className={styles.coverStoryKicker}>{p.industry}</span>
                      <a href={`#r-${p.slug}`} className={styles.coverStoryTitle}>
                        {p.title}
                      </a>
                      <span className={styles.coverStoryDek}>{p.subtitle}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </section>

        {/* ——— Índice ——— */}
        <section id="indice" className={styles.toc} aria-labelledby="toc-title">
          <div className={styles.wrap}>
            <Reveal className={styles.tocGrid}>
              <div className={styles.tocHead}>
                <p className={styles.rubric}>
                  <span>Índice</span>
                </p>
                <h2 id="toc-title" className={styles.tocTitle}>
                  En esta <em>edición</em>
                </h2>
              </div>
              <ol className={styles.tocList}>
                {toc.map((t, i) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`}>
                      <span className={styles.tocNum}>{String(i + 1).padStart(2, '0')}</span>
                      <span className={styles.tocText}>
                        <span className={styles.tocLabel}>{t.label}</span>
                        <span className={styles.tocDek}>{t.dek}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        {/* ——— Perfil ——— */}
        <section id="perfil" className={styles.section} aria-labelledby="perfil-title">
          <div className={styles.wrap}>
            <Reveal className={styles.sectionHead}>
              <Rubric n="01" label="Perfil" />
              <h2 id="perfil-title" className={styles.h2}>
                {profile.aboutTitle}
              </h2>
              <p className={styles.deck}>{profile.aboutSubtitle}</p>
            </Reveal>

            <div className={styles.profileGrid}>
              <Reveal className={styles.columns3}>
                {profile.bio.map((t, i) => (
                  <p key={i} className={i === 0 ? styles.dropcap : undefined}>
                    {t}
                  </p>
                ))}
                <PullQuote t={testimonials[0]} />
              </Reveal>

              <aside className={styles.figures} aria-label="En cifras">
                <Reveal>
                <p className={styles.specTitle}>En cifras</p>
                <ul>
                  {stats.map((s) => (
                    <li key={s.label}>
                      <span className={styles.figureValue}>{s.value}</span>
                      <span className={styles.figureLabel}>{s.label}</span>
                    </li>
                  ))}
                </ul>
                <p className={styles.figuresNote}>
                  {profile.location}. {profile.reach}.
                </p>
                </Reveal>
              </aside>
            </div>

            <ol className={styles.principles}>
              {principles.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 90}>
                  <p className={styles.principleEyebrow}>{p.eyebrow}</p>
                  <h3 className={styles.h3}>{p.title}</h3>
                  <p>{p.description}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ——— Reportajes ——— */}
        <section id="reportajes" className={styles.section} aria-labelledby="reportajes-title">
          <div className={styles.wrap}>
            <Reveal className={styles.sectionHead}>
              <Rubric n="02" label="Proyectos" />
              <h2 id="reportajes-title" className={styles.h2}>
                Reportajes
              </h2>
            </Reveal>

            {features.map((p, i) => (
              <div key={p.slug} id={`r-${p.slug}`} className={styles.featureWrap}>
                <Feature p={p} index={i} />
                {i < features.length - 1 && (
                  <Reveal>
                    <PullQuote t={testimonials[i + 1]} wide />
                  </Reveal>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ——— Breves ——— */}
        <section id="breves" className={`${styles.section} ${styles.briefsSection}`} aria-labelledby="breves-title">
          <div className={styles.wrap}>
            <Reveal className={styles.sectionHead}>
              <Rubric n="03" label="Proyectos" />
              <h2 id="breves-title" className={styles.h2}>
                Breves
              </h2>
            </Reveal>
            <ul className={styles.briefs}>
              {briefs.map((p, i) => (
                <Reveal as="li" key={p.slug} className={styles.brief} delay={(i % 3) * 80}>
                  {p.image && (
                    <div className={styles.briefImg}>
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(max-width: 767px) 100vw, (max-width: 1199px) 45vw, 380px"
                      />
                    </div>
                  )}
                  {p.industry && <p className={styles.briefKicker}>{p.industry}</p>}
                  <h3 className={styles.briefTitle}>{p.title}</h3>
                  {p.subtitle && <p className={styles.briefDek}>{p.subtitle}</p>}
                  <p className={styles.briefText}>{p.description}</p>
                  <p className={styles.briefStack}>
                    <span className={styles.briefStackLabel}>Stack</span> {p.stack.join(' · ')}
                  </p>
                  <Links p={p} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ——— Servicios y método ——— */}
        <section id="servicios" className={styles.section} aria-labelledby="servicios-title">
          <div className={styles.wrap}>
            <Reveal className={styles.sectionHead}>
              <Rubric n="04" label="Servicios" />
              <h2 id="servicios-title" className={styles.h2}>
                Guía de servicios
              </h2>
              <p className={styles.deck}>{content.profile.tagline}</p>
            </Reveal>
            <ol className={styles.classifieds}>
              {services.map((s, i) => (
                <Reveal as="li" key={s.title} delay={(i % 3) * 80}>
                  <p className={styles.classNum}>{s.short}</p>
                  <h3 className={styles.h3}>{s.title}</h3>
                  <p>{s.description}</p>
                  {s.tags.length > 0 && (
                    <p className={styles.tags}>
                      {s.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </p>
                  )}
                </Reveal>
              ))}
            </ol>

            <Reveal className={styles.method}>
              <h3 className={styles.methodTitle}>Método</h3>
              <ol className={styles.methodList}>
                {process.map((s, i) => (
                  <li key={s.title}>
                    <span className={styles.methodNum} aria-hidden="true">
                      {i + 1}
                    </span>
                    <h4 className={styles.methodStep}>{s.title}</h4>
                    <p>{s.description}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        {/* ——— Trayectoria ——— */}
        <section id="trayectoria" className={`${styles.section} ${styles.careerSection}`} aria-labelledby="trayectoria-title">
          <div className={styles.wrap}>
            <Reveal className={styles.sectionHead}>
              <Rubric n="05" label="Perfil del autor" />
              <h2 id="trayectoria-title" className={styles.h2}>
                Trayectoria
              </h2>
              <p className={styles.deck}>
                {profile.name}, {profile.role.toLowerCase()} en {profile.location}.
              </p>
            </Reveal>

            <div className={styles.career}>
              {experience.map((e, i) => (
                <Reveal as="article" key={e.company + e.period} className={styles.job}>
                  <header className={styles.jobHead}>
                    <p className={styles.jobPeriod}>{e.period}</p>
                    <h3 className={styles.jobCompany}>{e.company}</h3>
                    <p className={styles.jobRole}>{e.role}</p>
                  </header>
                  <div className={styles.jobBody}>
                    <div className={styles.columns}>
                      {e.highlights.map((h, j) => (
                        <p key={j} className={j === 0 && i === 0 ? styles.dropcap : undefined}>
                          {h}
                        </p>
                      ))}
                    </div>
                    <p className={styles.jobStack}>
                      <span className={styles.briefStackLabel}>Herramientas</span> {e.stack.join(' · ')}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <aside className={styles.toolbox} aria-labelledby="toolbox-title">
              <Reveal>
              <h3 id="toolbox-title" className={styles.toolboxTitle}>
                Caja de herramientas
              </h3>
              <div className={styles.toolboxGrid}>
                {(
                  [
                    ['Frontend', skills.frontend],
                    ['Backend', skills.backend],
                    ['Herramientas', skills.tools],
                  ] as const
                ).map(([label, list]) => (
                  <div key={label}>
                    <h4 className={styles.toolboxLabel}>{label}</h4>
                    <p className={styles.toolboxList}>{list.join(', ')}</p>
                  </div>
                ))}
              </div>
              </Reveal>
            </aside>
          </div>
        </section>

        {/* ——— Voces ——— */}
        <section id="voces" className={styles.section} aria-labelledby="voces-title">
          <div className={styles.wrap}>
            <Reveal className={styles.sectionHead}>
              <Rubric n="06" label="Testimonios" />
              <h2 id="voces-title" className={styles.h2}>
                Voces
              </h2>
            </Reveal>
            <ul className={styles.letters}>
              {testimonials.slice(3).map((t, i) => (
                <Reveal as="li" key={t.name} delay={(i % 2) * 90}>
                  <figure>
                    <blockquote>
                      <p>{t.quote}</p>
                    </blockquote>
                    <figcaption>
                      <span className={styles.pullName}>{t.name}</span>
                      <span className={styles.pullRole}>{t.role}</span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ——— Contacto ——— */}
        <section id="contacto" className={styles.contact} aria-labelledby="contacto-title">
          <div className={styles.wrap}>
            <Reveal className={styles.contactGrid}>
              <div>
                <Rubric n="07" label="Contacto" />
                <h2 id="contacto-title" className={styles.contactTitle}>
                  {contact.title}
                </h2>
                <p className={styles.contactDek}>{contact.subtitle}</p>
                <a className={styles.contactMail} href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
                <p className={styles.coverActions}>
                  <a className={styles.btn} href={`mailto:${contact.email}`}>
                    {contact.cta}
                  </a>
                </p>
              </div>
              <div className={styles.contactSide}>
                <h3 className={styles.contactLabel}>En la red</h3>
                <ul className={styles.socials}>
                  {contact.socials.map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer">
                        {s.label} <span aria-hidden="true">↗</span>
                        <span className={styles.srOnly}> (se abre en una pestaña nueva)</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <h3 className={styles.contactLabel}>Proyectos en</h3>
                <p className={styles.cities}>{markets.map((m) => m.city).join(' · ')}</p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.wrap}>
          <div className={styles.footerGrid}>
            <p className={styles.footerMast}>{profile.name}</p>
            <p className={styles.footerTag}>{footer.tagline}</p>
            <p className={styles.colophon}>
              <span className={styles.specTitle}>Colofón</span> Compuesto en DM Serif Display y Libre Franklin.{' '}
              {profile.studio}, {profile.location}.
            </p>
            <a className={styles.textLink} href="#cover-title">
              Volver a la portada <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
