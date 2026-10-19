// design-exploration/option-10/page.tsx
// Dirección 10 · Blueprint: el portafolio como un juego de planos. Cada sección
// es una lámina numerada (A-01…), los proyectos se documentan con tablas de
// especificación, cotas y llamadas con líneas guía. Decoración sólo con CSS/SVG.
import type { Metadata } from 'next';
import Image from 'next/image';
import { IBM_Plex_Mono, IBM_Plex_Sans_Condensed } from 'next/font/google';
import Reveal from '../_shared/Reveal';
import { content, featuredProjects, type Project } from '../_shared/content';
import styles from './option.module.css';

export const metadata: Metadata = {
  title: '10 · Blueprint — Exploración',
};

const condensed = IBM_Plex_Sans_Condensed({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--bp-display',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--bp-mono',
});

const fontVars = `${condensed.variable} ${mono.variable}`;

const { profile, stats, principles, process, services, experience, skills, testimonials, contact, footer, markets } =
  content;

const paragraphs = (text?: string) => (text ? text.split('\n').filter(Boolean) : []);
const place = (p: Project) => p.locations.map((l) => l.label).join(' · ');
const pad = (n: number) => String(n).padStart(2, '0');

const sheets = [
  { id: 'perfil', code: 'A-01', label: 'Perfil' },
  { id: 'proyectos', code: 'A-02', label: 'Proyectos' },
  { id: 'servicios', code: 'A-03', label: 'Servicios' },
  { id: 'experiencia', code: 'A-04', label: 'Experiencia' },
  { id: 'contacto', code: 'A-05', label: 'Contacto' },
];

const major = featuredProjects.slice(0, 3);
const minor = featuredProjects.slice(3);

function SheetHead({ code, title, id, note }: { code: string; title: string; id: string; note?: string }) {
  return (
    <Reveal className={styles.sheetHead}>
      <p className={styles.sheetCode}>
        <span className={styles.bubble} aria-hidden="true">
          <span>{code.split('-')[1]}</span>
          <span>{code.split('-')[0]}</span>
        </span>
        <span>Lámina {code}</span>
      </p>
      <h2 id={id} className={styles.h2}>
        {title}
      </h2>
      {note && <p className={styles.sheetNote}>{note}</p>}
      <span className={styles.sheetRule} aria-hidden="true" />
    </Reveal>
  );
}

function Spec({ p }: { p: Project }) {
  const rows: [string, string][] = [];
  if (p.role) rows.push(['Rol', p.role]);
  if (p.industry) rows.push(['Industria', p.industry]);
  if (p.engagement) rows.push(['Encargo', p.engagement]);
  if (place(p)) rows.push(['Ubicación', place(p)]);
  return (
    <table className={styles.spec}>
      <caption className={styles.srOnly}>Especificación de {p.title}</caption>
      <tbody>
        {rows.map(([k, v]) => (
          <tr key={k}>
            <th scope="row">{k}</th>
            <td>{v}</td>
          </tr>
        ))}
        <tr>
          <th scope="row">Stack</th>
          <td>
            <ul className={styles.chips}>
              {p.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function Links({ p }: { p: Project }) {
  return (
    <p className={styles.links}>
      <a className={styles.btnLine} href={p.caseStudyUrl}>
        Ver case study <span aria-hidden="true">→</span>
      </a>
      {p.liveUrl && (
        <a className={styles.linkPlain} href={p.liveUrl} target="_blank" rel="noopener noreferrer">
          Ver sitio <span aria-hidden="true">↗</span>
          <span className={styles.srOnly}> (se abre en una pestaña nueva)</span>
        </a>
      )}
    </p>
  );
}

/** Dibujo del hero: planta esquemática con cotas, generada con SVG. */
function HeroDrawing() {
  return (
    <svg className={styles.drawing} viewBox="0 0 480 400" aria-hidden="true" focusable="false">
      <defs>
        <marker id="bp-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 5 L10 0 M0 5 L10 10" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </marker>
      </defs>
      <g className={styles.drawLines}>
        {/* contorno */}
        <rect x="60" y="60" width="360" height="260" />
        <rect x="60" y="60" width="150" height="120" />
        <rect x="210" y="60" width="210" height="120" />
        <rect x="60" y="180" width="240" height="140" />
        <rect x="300" y="180" width="120" height="140" />
        {/* módulos internos */}
        <rect x="80" y="80" width="110" height="24" />
        <rect x="80" y="112" width="110" height="24" />
        <rect x="80" y="144" width="70" height="20" />
        <circle cx="315" cy="120" r="36" />
        <circle cx="315" cy="120" r="18" />
        <path d="M80 200 H280 M80 230 H280 M80 260 H280 M80 290 H220" />
        <path d="M320 200 h80 v40 h-80 z M320 256 h80 v44 h-80 z" />
        {/* conexiones */}
        <path className={styles.drawDash} d="M190 92 H279 M190 124 H290 M315 156 V230 H280 M360 240 V256" />
      </g>
      {/* cotas */}
      <g className={styles.drawDims}>
        <path d="M60 36 V52 M420 36 V52" />
        <path d="M60 44 H420" markerStart="url(#bp-arrow)" markerEnd="url(#bp-arrow)" />
        <path d="M444 60 H436 M444 320 H436" />
        <path d="M440 60 V320" markerStart="url(#bp-arrow)" markerEnd="url(#bp-arrow)" />
        <path d="M60 344 V356 M210 344 V356 M300 344 V356" />
        <path d="M60 350 H210" markerStart="url(#bp-arrow)" markerEnd="url(#bp-arrow)" />
        <path d="M210 350 H300" markerStart="url(#bp-arrow)" markerEnd="url(#bp-arrow)" />
      </g>
      <g className={styles.drawText}>
        <text x="240" y="38" textAnchor="middle">
          {profile.reach.toUpperCase()}
        </text>
        <text x="135" y="372" textAnchor="middle">
          FRONT
        </text>
        <text x="255" y="372" textAnchor="middle">
          BACK
        </text>
        <text x="458" y="190" textAnchor="middle" transform="rotate(90 458 190)">
          PUNTA A PUNTA
        </text>
      </g>
      {/* marca de norte */}
      <g className={styles.drawNorth} transform="translate(40 380)">
        <circle r="12" />
        <path d="M0 -10 L5 6 L0 2 L-5 6 Z" />
      </g>
    </svg>
  );
}

export default function BlueprintPage() {
  return (
    <div className={`dx-root ${styles.root} ${fontVars}`} lang="es">
      <a className="dx-skip" href="#main">
        Saltar al contenido
      </a>

      <header className={styles.header}>
        <div className={styles.wrap}>
          <div className={styles.headerInner}>
            <a className={styles.brand} href="#top">
              <span className={styles.brandMark} aria-hidden="true">
                FS
              </span>
              <span className={styles.brandText}>
                <span>{profile.name}</span>
                <span className={styles.brandSub}>{profile.studio}</span>
              </span>
            </a>
            <nav aria-label="Láminas" className={styles.nav}>
              <ul>
                {sheets.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`}>
                      <span className={styles.navCode}>{s.code}</span> {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main id="main">
        {/* ——— A-00 · Portada ——— */}
        <section id="top" className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.wrap}>
            <div className={styles.heroGrid}>
              <div className={styles.heroText}>
                <p className={styles.sheetCode}>
                  <span className={styles.bubble} aria-hidden="true">
                    <span>00</span>
                    <span>A</span>
                  </span>
                  <span>Lámina A-00 · Portada</span>
                </p>
                <h1 id="hero-title" className={styles.h1}>
                  {profile.name}
                </h1>
                <p className={styles.heroRole}>
                  {profile.role} <span aria-hidden="true">/</span> {profile.studio}
                </p>
                <p className={styles.headline}>
                  {profile.headline.before}
                  <mark className={styles.mark}>{profile.headline.highlight}</mark>
                  {profile.headline.after}
                </p>
                <p className={styles.lead}>{profile.intro}</p>
                <p className={styles.actions}>
                  <a className={styles.btn} href="#contacto">
                    {contact.cta} <span aria-hidden="true">→</span>
                  </a>
                  <a className={styles.btnLine} href="#proyectos">
                    Ver proyectos
                  </a>
                </p>
              </div>

              <div className={styles.heroFigure}>
                <HeroDrawing />
                <table className={styles.titleBlock}>
                  <caption className={styles.srOnly}>Cuadro de rótulo</caption>
                  <tbody>
                    <tr>
                      <th scope="row">Estudio</th>
                      <td>{profile.studio}</td>
                    </tr>
                    <tr>
                      <th scope="row">Base</th>
                      <td>{profile.location}</td>
                    </tr>
                    <tr>
                      <th scope="row">Alcance</th>
                      <td>{profile.reach}</td>
                    </tr>
                    <tr>
                      <th scope="row">Objeto</th>
                      <td>{profile.tagline}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <ul className={styles.dims} aria-label="En números">
              {stats.map((s, i) => (
                <Reveal as="li" key={s.label} delay={i * 100} className={styles.dim}>
                  <span className={styles.dimLine} aria-hidden="true" />
                  <span className={styles.dimValue}>{s.value}</span>
                  <span className={styles.dimLabel}>{s.label}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ——— A-01 · Perfil ——— */}
        <section id="perfil" className={styles.sheet} aria-labelledby="perfil-title">
          <div className={styles.wrap}>
            <SheetHead code="A-01" id="perfil-title" title={profile.aboutTitle} note={profile.aboutSubtitle} />
            <div className={styles.profileGrid}>
              <Reveal className={styles.bio}>
                {profile.bio.map((t, i) => (
                  <p key={i} className={i === 0 ? styles.bioLead : undefined}>
                    {t}
                  </p>
                ))}
              </Reveal>
              <Reveal as="aside" className={styles.notes}>
                <h3 className={styles.notesTitle}>Notas generales</h3>
                <ol>
                  {principles.map((p, i) => (
                    <li key={p.title}>
                      <span className={styles.noteNum} aria-hidden="true">
                        {i + 1}
                      </span>
                      <div>
                        <p className={styles.noteEyebrow}>{p.eyebrow}</p>
                        <h4 className={styles.noteTitle}>{p.title}</h4>
                        <p>{p.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>

            <Reveal className={styles.markets}>
              <p className={styles.label}>Proyectos en</p>
              <ul>
                {markets.map((m, i) => (
                  <li key={m.city + i}>
                    <span className={styles.marketIdx}>{pad(i + 1)}</span> {m.city}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ——— A-02 · Proyectos ——— */}
        <section id="proyectos" className={styles.sheet} aria-labelledby="proyectos-title">
          <div className={styles.wrap}>
            <SheetHead
              code="A-02"
              id="proyectos-title"
              title="Proyectos destacados"
              note={`${featuredProjects.length} láminas de detalle`}
            />

            <div className={styles.majors}>
              {major.map((p, i) => (
                <Reveal as="article" key={p.slug} className={styles.major}>
                  <div className={styles.majorFigure}>
                    <div className={styles.frame}>
                      <span className={styles.crop} aria-hidden="true" />
                      <div className={styles.frameImg}>
                        {p.image && (
                          <Image
                            src={p.image}
                            alt={p.title}
                            fill
                            sizes="(max-width: 899px) 100vw, 720px"
                            priority={i === 0}
                          />
                        )}
                      </div>
                      {/* llamadas con línea guía */}
                      <span className={`${styles.callout} ${styles.calloutA}`}>
                        <span className={styles.calloutTag}>{p.category === 'landing' ? 'Sitio' : p.category === 'platform' ? 'Plataforma' : 'Producto'}</span>
                      </span>
                      {p.role && (
                        <span className={`${styles.callout} ${styles.calloutB}`}>
                          <span className={styles.calloutTag}>{p.role}</span>
                        </span>
                      )}
                    </div>
                    <p className={styles.figCaption}>
                      Det. {i + 1}/A-02 · {p.title}
                    </p>
                  </div>

                  <div className={styles.majorBody}>
                    <p className={styles.detailCode}>
                      <span>Detalle {pad(i + 1)}</span>
                      {p.latest && <span className={styles.flag}>Reciente</span>}
                    </p>
                    <h3 className={styles.h3}>{p.title}</h3>
                    {p.subtitle && <p className={styles.subtitle}>{p.subtitle}</p>}
                    <div className={styles.problem}>
                      <p className={styles.label}>Problema</p>
                      {paragraphs(p.problem)
                        .slice(0, 1)
                        .map((t, j) => (
                          <p key={j}>{t}</p>
                        ))}
                    </div>
                    <p className={styles.desc}>{p.description}</p>
                    <Spec p={p} />
                    <Links p={p} />
                  </div>
                </Reveal>
              ))}
            </div>

            <h3 className={styles.subSheet}>
              <span className={styles.label}>Índice de láminas</span> Otros proyectos
            </h3>
            <ul className={styles.minors}>
              {minor.map((p, i) => (
                <Reveal as="li" key={p.slug} className={styles.minor} delay={(i % 2) * 80}>
                  <div className={styles.minorImg}>
                    {p.image && (
                      <Image src={p.image} alt={p.title} fill sizes="(max-width: 699px) 100vw, (max-width: 1199px) 50vw, 420px" />
                    )}
                    <span className={styles.minorNum} aria-hidden="true">
                      {pad(i + 4)}
                    </span>
                  </div>
                  <div className={styles.minorBody}>
                    <h4 className={styles.minorTitle}>{p.title}</h4>
                    {p.subtitle && <p className={styles.minorSub}>{p.subtitle}</p>}
                    <dl className={styles.minorSpec}>
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
                      {place(p) && (
                        <div>
                          <dt>Ubicación</dt>
                          <dd>{place(p)}</dd>
                        </div>
                      )}
                      <div>
                        <dt>Stack</dt>
                        <dd>{p.stack.join(' / ')}</dd>
                      </div>
                    </dl>
                    <Links p={p} />
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ——— A-03 · Servicios y proceso ——— */}
        <section id="servicios" className={styles.sheet} aria-labelledby="servicios-title">
          <div className={styles.wrap}>
            <SheetHead code="A-03" id="servicios-title" title="Servicios y proceso" note={profile.tagline} />
            <Reveal className={styles.tableWrap}>
              <table className={styles.serviceTable}>
                <caption className={styles.srOnly}>Tabla de servicios</caption>
                <thead>
                  <tr>
                    <th scope="col">Cód.</th>
                    <th scope="col">Servicio</th>
                    <th scope="col">Descripción</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((s, i) => (
                    <tr key={s.title}>
                      <td className={styles.code}>S-{pad(i + 1)}</td>
                      <th scope="row">
                        {s.title}
                        <span className={styles.short}>{s.short}</span>
                      </th>
                      <td>
                        {s.description}
                        {s.tags.length > 0 && (
                          <span className={styles.tags}>
                            {s.tags.map((t) => (
                              <span key={t}>{t}</span>
                            ))}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>

            <h3 className={styles.subSheet}>
              <span className={styles.label}>Diagrama de flujo</span> Proceso
            </h3>
            <ol className={styles.flow}>
              {process.map((s, i) => (
                <Reveal as="li" key={s.title} className={styles.flowNode} delay={i * 100}>
                  <span className={styles.flowNum}>P-{pad(i + 1)}</span>
                  <h4 className={styles.flowTitle}>{s.title}</h4>
                  <p>{s.description}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ——— A-04 · Experiencia ——— */}
        <section id="experiencia" className={styles.sheet} aria-labelledby="experiencia-title">
          <div className={styles.wrap}>
            <SheetHead code="A-04" id="experiencia-title" title="Experiencia y materiales" note={profile.role} />
            <ol className={styles.timeline}>
              {experience.map((e, i) => (
                <Reveal as="li" key={e.company + e.period} className={styles.job}>
                  <div className={styles.jobHead}>
                    <p className={styles.jobPeriod}>{e.period}</p>
                    <h3 className={styles.jobCompany}>{e.company}</h3>
                    <p className={styles.jobRole}>{e.role}</p>
                  </div>
                  <div className={styles.jobBody}>
                    <ul className={styles.jobList}>
                      {e.highlights.slice(0, 3).map((h, j) => (
                        <li key={j}>{h}</li>
                      ))}
                    </ul>
                    {e.highlights.length > 3 && (
                      <details className={styles.more}>
                        <summary>
                          Ver {e.highlights.length - 3} notas más <span className={styles.srOnly}>de {e.company}</span>
                        </summary>
                        <ul className={styles.jobList}>
                          {e.highlights.slice(3).map((h, j) => (
                            <li key={j}>{h}</li>
                          ))}
                        </ul>
                      </details>
                    )}
                    <ul className={styles.chips}>
                      {e.stack.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                  <span className={styles.jobIdx} aria-hidden="true">
                    E-{pad(i + 1)}
                  </span>
                </Reveal>
              ))}
            </ol>

            <h3 className={styles.subSheet}>
              <span className={styles.label}>Leyenda</span> Materiales
            </h3>
            <Reveal className={styles.legend}>
              {(
                [
                  ['Frontend', 'FE', skills.frontend],
                  ['Backend', 'BE', skills.backend],
                  ['Herramientas', 'TL', skills.tools],
                ] as const
              ).map(([label, code, list]) => (
                <div key={label} className={styles.legendCol}>
                  <h4 className={styles.legendTitle}>
                    <span className={styles.legendSym} aria-hidden="true">
                      {code}
                    </span>
                    {label}
                  </h4>
                  <ul>
                    {list.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </Reveal>

            <h3 className={styles.subSheet}>
              <span className={styles.label}>Revisiones</span> Testimonios
            </h3>
            <ul className={styles.reviews}>
              {testimonials.map((t, i) => (
                <Reveal as="li" key={t.name} className={styles.review} delay={(i % 3) * 80}>
                  <figure>
                    <span className={styles.rev} aria-hidden="true">
                      R{i + 1}
                    </span>
                    <blockquote>
                      <p>{t.quote}</p>
                    </blockquote>
                    <figcaption>
                      <span className={styles.revName}>{t.name}</span>
                      <span className={styles.revRole}>{t.role}</span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ——— A-05 · Contacto ——— */}
        <section id="contacto" className={styles.sheet} aria-labelledby="contacto-title">
          <div className={styles.wrap}>
            <SheetHead code="A-05" id="contacto-title" title={contact.title} />
            <Reveal className={styles.contact}>
              <div className={styles.contactMain}>
                <p className={styles.contactLead}>{contact.subtitle}</p>
                <a className={styles.mail} href={`mailto:${contact.email}`}>
                  <span className={styles.mailLabel}>Email</span>
                  <span className={styles.mailAddr}>{contact.email}</span>
                </a>
                <p className={styles.actions}>
                  <a className={styles.btn} href={`mailto:${contact.email}`}>
                    {contact.cta} <span aria-hidden="true">→</span>
                  </a>
                </p>
              </div>
              <div className={styles.contactSide}>
                <p className={styles.label}>Canales</p>
                <ul className={styles.socials}>
                  {contact.socials.map((s, i) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer">
                        <span className={styles.code}>C-{pad(i + 1)}</span>
                        <span>{s.label}</span>
                        <span aria-hidden="true">↗</span>
                        <span className={styles.srOnly}> (se abre en una pestaña nueva)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.wrap}>
          <table className={styles.footBlock}>
            <caption className={styles.srOnly}>Rótulo del sitio</caption>
            <tbody>
              <tr>
                <th scope="row">Autor</th>
                <td>{profile.name}</td>
                <th scope="row">Estudio</th>
                <td>{profile.studio}</td>
              </tr>
              <tr>
                <th scope="row">Base</th>
                <td>{profile.location}</td>
                <th scope="row">Láminas</th>
                <td>A-00 — A-05</td>
              </tr>
              <tr>
                <td colSpan={4} className={styles.footTag}>
                  {footer.tagline}
                </td>
              </tr>
            </tbody>
          </table>
          <p className={styles.footBottom}>
            <a className={styles.linkPlain} href="#top">
              Volver a A-00 <span aria-hidden="true">↑</span>
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
