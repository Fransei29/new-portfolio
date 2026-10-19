// design-exploration/option-06/page.tsx
// Dirección 06 · Case study first: los proyectos son el protagonista. Un hero
// breve con el índice de casos, después historias largas (imagen a sangre, el
// problema antes que el stack, cita destacada) y al final un índice compacto
// del resto, la trayectoria y el contacto.
import type { Metadata } from 'next';
import Image from 'next/image';
import { Instrument_Serif, Inter } from 'next/font/google';
import Reveal from '../_shared/Reveal';
import { content, featuredProjects, type Project } from '../_shared/content';
import styles from './option.module.css';

export const metadata: Metadata = {
  title: '06 · Case study first — Exploración',
};

const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], display: 'swap', variable: '--o6-serif' });
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--o6-sans' });
const fontVars = `${serif.variable} ${inter.variable}`;

const { profile, stats, experience, skills, testimonials, contact, footer, principles } = content;

/* Los casos que se cuentan en largo, en este orden. La cita destacada es un
   fragmento literal del problema o del resumen del proyecto: si el texto de
   origen cambia y el fragmento deja de existir, la cita no se muestra. */
const storyPlan: { slug: string; quote: string }[] = [
  { slug: 'comply-dq', quote: 'un producto listo para producción, en el que confían flotas reales bajo presión regulatoria real' },
  {
    slug: 'red-lizard-studioz',
    quote: 'La plataforma convierte el conocimiento del propio negocio en la fuente de verdad, y lo impone en código en vez de en la redacción del prompt.',
  },
  { slug: 'acer0', quote: 'propiedad total sobre sus datos, su branding y su operación, con un backend afinado exactamente a su flujo de trabajo' },
  {
    slug: 'globaly',
    quote: 'El problema real no era tener un sitio, sino tener uno que pudiera sostener una tesis de posicionamiento página por página',
  },
  {
    slug: 'royal-parking-services',
    quote: 'El flujo de pago trata al conductor como no confiable por diseño: el cliente envía sólo identificadores de acta y una patente, nunca un monto, y el backend calcula el cargo.',
  },
];

const stories = storyPlan
  .map(({ slug, quote }) => {
    const project = featuredProjects.find((p) => p.slug === slug);
    if (!project) return null;
    const source = `${project.problem ?? ''}\n${project.summary ?? ''}`;
    return { project, quote: source.includes(quote) ? quote : null };
  })
  .filter((s): s is { project: Project; quote: string | null } => s !== null);

const storySlugs = new Set(stories.map((s) => s.project.slug));
const rest = featuredProjects.filter((p) => !storySlugs.has(p.slug));

const paragraphs = (text?: string) => (text ? text.split('\n').filter(Boolean) : []);

/** Cita con comillas tipográficas y puntos suspensivos si el fragmento empieza o termina a mitad de frase. */
function formatQuote(q: string) {
  const startsMid = q[0] === q[0].toLowerCase();
  const endsMid = !/[.!?]$/.test(q);
  return `${startsMid ? '…' : ''}${q}${endsMid ? '…' : ''}`;
}

function Story({ project, quote, n }: { project: Project; quote: string | null; n: number }) {
  const num = String(n).padStart(2, '0');
  const [lead, ...problemRest] = paragraphs(project.problem);
  const summaryLead = paragraphs(project.summary)[0];
  const [shotA, shotB, shotC] = project.screenshots;
  return (
    <article id={`caso-${project.slug}`} className={styles.story} aria-labelledby={`t-${project.slug}`}>
      <header className={styles.storyHead}>
        <Reveal>
          <p className={styles.storyNum}>
            <span>Caso {num}</span>
            <span className={styles.storyRule} aria-hidden="true" />
            <span>{project.engagement}</span>
          </p>
          <h3 id={`t-${project.slug}`} className={styles.storyTitle}>
            {project.title}
          </h3>
          {project.subtitle && <p className={styles.storySub}>{project.subtitle}</p>}
        </Reveal>
        <Reveal as="dl" className={styles.meta} delay={100}>
          {project.role && (
            <div>
              <dt>Rol</dt>
              <dd>{project.role}</dd>
            </div>
          )}
          {project.industry && (
            <div>
              <dt>Industria</dt>
              <dd>{project.industry}</dd>
            </div>
          )}
          {project.locations.length > 0 && (
            <div>
              <dt>Ubicación</dt>
              <dd>
                {project.locations.map((l) => (
                  <span key={l.label} className={styles.loc}>
                    {l.flag && <span aria-hidden="true">{l.flag} </span>}
                    {l.label}
                  </span>
                ))}
              </dd>
            </div>
          )}
        </Reveal>
      </header>

      {shotA && (
        <figure className={styles.bleed}>
          <Image src={shotA} alt={project.title} fill sizes="100vw" className={styles.bleedImg} priority={n === 1} />
        </figure>
      )}

      <div className={styles.storyBody}>
        <Reveal className={styles.chapter}>
          <h4 className={styles.chapterLabel}>
            <span aria-hidden="true">i.</span> El problema
          </h4>
          <div className={styles.chapterText}>
            {lead && <p className={styles.lead}>{lead}</p>}
            {problemRest.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </Reveal>

        {quote && (
          <Reveal as="blockquote" className={styles.pull}>
            <p>{formatQuote(quote)}</p>
          </Reveal>
        )}

        {(shotB || shotC) && (
          <div className={styles.pair}>
            {shotB && (
              <Reveal className={`${styles.shot} ${styles.shotWide}`}>
                <Image src={shotB} alt={`${project.title}, pantalla 2`} fill sizes="(min-width: 900px) 60vw, 100vw" className={styles.shotImg} />
              </Reveal>
            )}
            {shotC && (
              <Reveal className={`${styles.shot} ${styles.shotNarrow}`} delay={120}>
                <Image src={shotC} alt={`${project.title}, pantalla 3`} fill sizes="(min-width: 900px) 36vw, 100vw" className={styles.shotImg} />
              </Reveal>
            )}
          </div>
        )}

        {summaryLead && (
          <Reveal className={styles.chapter}>
            <h4 className={styles.chapterLabel}>
              <span aria-hidden="true">ii.</span> Qué construimos
            </h4>
            <div className={styles.chapterText}>
              <p>{summaryLead}</p>
            </div>
          </Reveal>
        )}

        <Reveal className={styles.chapter}>
          <h4 className={styles.chapterLabel}>
            <span aria-hidden="true">iii.</span> Stack
          </h4>
          <div className={styles.chapterText}>
            <ul className={styles.stack}>
              {project.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <div className={styles.storyLinks}>
              <a href={project.caseStudyUrl} className={styles.btn}>
                Leer el case study completo <span aria-hidden="true">→</span>
              </a>
              {project.liveUrl && (
                <a href={project.liveUrl} className={styles.btnGhost} target="_blank" rel="noopener noreferrer">
                  Ver sitio <span aria-hidden="true">↗</span>
                  <span className={styles.srOnly}> (abre en otra pestaña)</span>
                </a>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </article>
  );
}

export default function OptionCaseStudyFirst() {
  return (
    <div className={`dx-root ${styles.root} ${fontVars}`} lang="es">
      <a className="dx-skip" href="#main">
        Saltar al contenido
      </a>

      <header className={styles.header}>
        <a href="#top" className={styles.brand}>
          {profile.name}
          <span className={styles.brandStudio}>{profile.studio}</span>
        </a>
        <nav aria-label="Principal">
          <ul className={styles.nav}>
            <li><a href="#casos">Casos</a></li>
            <li><a href="#indice">Índice</a></li>
            <li><a href="#estudio">Estudio</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </nav>
      </header>

      <main id="main">
        {/* ——— Hero breve + índice de casos ——— */}
        <section id="top" className={styles.hero} aria-labelledby="hero-title">
          <p className={styles.eyebrow}>
            {profile.role} · {profile.location}
          </p>
          <h1 id="hero-title" className={styles.h1}>
            {profile.headline.before}
            <em>{profile.headline.highlight}</em>
            {profile.headline.after}
          </h1>
          <div className={styles.heroFoot}>
            <p className={styles.heroIntro}>{profile.intro}</p>
            <nav aria-label="Casos destacados" className={styles.toc}>
              <p className={styles.tocLabel}>En esta página</p>
              <ol>
                {stories.map(({ project }, i) => (
                  <li key={project.slug}>
                    <a href={`#caso-${project.slug}`}>
                      <span className={styles.tocNum}>{String(i + 1).padStart(2, '0')}</span>
                      <span className={styles.tocTitle}>{project.title}</span>
                      <span className={styles.tocInd}>{project.industry}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </section>

        {/* ——— Historias ——— */}
        <section id="casos" className={styles.stories} aria-labelledby="casos-title">
          <h2 id="casos-title" className={styles.srOnly}>
            Proyectos destacados
          </h2>
          {stories.map(({ project, quote }, i) => (
            <Story key={project.slug} project={project} quote={quote} n={i + 1} />
          ))}
        </section>

        {/* ——— Índice del resto ——— */}
        <section id="indice" className={styles.section} aria-labelledby="indice-title">
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>Más proyectos</p>
            <h2 id="indice-title" className={styles.h2}>
              Índice
            </h2>
          </div>
          <ol className={styles.index}>
            {rest.map((p, i) => (
              <li key={p.slug} className={styles.row}>
                <span className={styles.rowNum} aria-hidden="true">
                  {String(stories.length + i + 1).padStart(2, '0')}
                </span>
                <div className={styles.rowMain}>
                  <h3 className={styles.rowTitle}>
                    <a href={p.caseStudyUrl} className={styles.stretched}>
                      {p.title}
                    </a>
                  </h3>
                  <p className={styles.rowSub}>{p.subtitle}</p>
                </div>
                <p className={styles.rowInd}>{p.industry}</p>
                <div className={styles.rowEnd}>
                  {p.liveUrl && (
                    <a href={p.liveUrl} className={styles.rowLive} target="_blank" rel="noopener noreferrer">
                      Ver sitio <span aria-hidden="true">↗</span>
                      <span className={styles.srOnly}> de {p.title} (abre en otra pestaña)</span>
                    </a>
                  )}
                  <span className={styles.rowArrow} aria-hidden="true">
                    →
                  </span>
                </div>
                {p.image && (
                  <div className={styles.rowThumb} aria-hidden="true">
                    <Image src={p.image} alt="" fill sizes="240px" className={styles.shotImg} />
                  </div>
                )}
              </li>
            ))}
          </ol>
          <a href="/projects" className={styles.allLink}>
            Ver todos los case studies <span aria-hidden="true">→</span>
          </a>
        </section>

        {/* ——— Estudio: bio + stats + principios + testimonio ——— */}
        <section id="estudio" className={styles.section} aria-labelledby="estudio-title">
          <div className={styles.about}>
            <div className={styles.aboutHead}>
              <p className={styles.eyebrow}>{profile.aboutSubtitle}</p>
              <h2 id="estudio-title" className={styles.h2}>
                {profile.aboutTitle}
              </h2>
            </div>
            <Reveal className={styles.aboutText}>
              <p className={styles.lead}>{profile.bio[0]}</p>
              {profile.bio.slice(1).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>
          </div>
          <dl className={styles.stats}>
            {stats.map((s, i) => (
              <Reveal key={s.label} className={styles.stat} delay={i * 90}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </Reveal>
            ))}
          </dl>
          <ul className={styles.principles}>
            {principles.map((p) => (
              <li key={p.title}>
                <p className={styles.principleEyebrow}>{p.eyebrow}</p>
                <h3 className={styles.principleTitle}>{p.title}</h3>
                <p>{p.description}</p>
              </li>
            ))}
          </ul>
          <Reveal as="figure" className={styles.testimonial}>
            <blockquote>
              <p>“{testimonials[1].quote}”</p>
            </blockquote>
            <figcaption>
              {testimonials[1].name} — {testimonials[1].role}
            </figcaption>
          </Reveal>
        </section>

        {/* ——— Experiencia + skills ——— */}
        <section id="experiencia" className={styles.section} aria-labelledby="experiencia-title">
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>Trayectoria</p>
            <h2 id="experiencia-title" className={styles.h2}>
              Experiencia
            </h2>
          </div>
          <ol className={styles.jobs}>
            {experience.map((job) => (
              <Reveal as="li" key={job.company + job.period} className={styles.job}>
                <p className={styles.jobPeriod}>{job.period}</p>
                <div>
                  <h3 className={styles.jobRole}>
                    {job.company}
                    <span> — {job.role}</span>
                  </h3>
                  <p className={styles.jobText}>{job.highlights[0]}</p>
                  <p className={styles.jobStack}>{job.stack.join(' · ')}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <div className={styles.skills}>
            {(
              [
                ['Frontend', skills.frontend],
                ['Backend y datos', skills.backend],
                ['Herramientas', skills.tools],
              ] as const
            ).map(([label, list]) => (
              <div key={label} className={styles.skillCol}>
                <h3 className={styles.skillLabel}>{label}</h3>
                <p>{list.join(' · ')}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ——— Contacto ——— */}
        <section id="contacto" className={`${styles.section} ${styles.contact}`} aria-labelledby="contacto-title">
          <p className={styles.eyebrow}>{contact.cta}</p>
          <h2 id="contacto-title" className={styles.contactTitle}>
            {contact.title}
          </h2>
          <p className={styles.contactSub}>{contact.subtitle}</p>
          <a href={`mailto:${contact.email}`} className={styles.mail}>
            {contact.email}
          </a>
          <ul className={styles.socials}>
            {contact.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label} <span aria-hidden="true">↗</span>
                  <span className={styles.srOnly}> (abre en otra pestaña)</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerName}>{profile.name}</p>
        <p className={styles.footerTag}>{footer.tagline}</p>
        <a href="#top" className={styles.footerTop}>
          Volver arriba ↑
        </a>
      </footer>
    </div>
  );
}
