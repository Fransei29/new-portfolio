// design-exploration/option-02 · Terminal
// El portafolio como una sesión de consola: encabezados con prompt, listados tipo
// `ls`, historial tipo `git log` y un árbol de skills. El verde fósforo se usa
// sólo para señales (prompt, estado, foco); la prosa larga va en IBM Plex Sans.
import type { Metadata } from 'next';
import Image from 'next/image';
import { IBM_Plex_Sans, JetBrains_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
import Reveal from '../_shared/Reveal';
import { content, featuredProjects } from '../_shared/content';
import styles from './option.module.css';

const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--tm-mono', display: 'swap' });
const sans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--tm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '02 · Terminal — Exploración',
};

const { profile, stats, markets, principles, process, services, experience, skills, testimonials, contact, footer } =
  content;

const NAV = [
  { href: '#sobre', label: 'sobre' },
  { href: '#proyectos', label: 'proyectos' },
  { href: '#experiencia', label: 'experiencia' },
  { href: '#contacto', label: 'contacto' },
];

const CATEGORY: Record<string, string> = { product: 'producto', platform: 'plataforma', landing: 'sitio' };

const pad = (n: number) => String(n).padStart(2, '0');
const flag = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

function Prompt({ path, children }: { path: string; children: ReactNode }) {
  return (
    <p className={styles.prompt} aria-hidden="true">
      <span className={styles.promptUser}>franco@estudio</span>
      <span className={styles.promptPath}>:{path}</span>
      <span className={styles.promptSign}>$</span> {children}
    </p>
  );
}

function SectionHead({ id, path, cmd, title, note }: { id: string; path: string; cmd: string; title: string; note?: string }) {
  return (
    <header className={styles.sectionHead}>
      <Prompt path={path}>{cmd}</Prompt>
      <h2 id={id} className={styles.h2}>
        <span className={styles.hash} aria-hidden="true">
          #{' '}
        </span>
        {title}
      </h2>
      {note && <p className={styles.note}>{note}</p>}
    </header>
  );
}

export default function TerminalPage() {
  const fontVars = `${mono.variable} ${sans.variable}`;
  const skillGroups = [
    { name: 'frontend', items: skills.frontend },
    { name: 'backend', items: skills.backend },
    { name: 'herramientas', items: skills.tools },
  ];

  return (
    <div className={`dx-root ${styles.root} ${fontVars}`} lang="es">
      <a className="dx-skip" href="#main">
        Saltar al contenido
      </a>

      <header className={styles.topbar}>
        <div className={styles.topInner}>
          <a href="#main" className={styles.brand}>
            <span className={styles.brandDot} aria-hidden="true" />
            {profile.name}
            <span className={styles.brandPath} aria-hidden="true">
              ~/estudio
            </span>
          </a>
          <nav aria-label="Principal">
            <ul className={styles.nav}>
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className={styles.navLink}>
                    <span aria-hidden="true">./</span>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main id="main">
        {/* ───────── Hero ───────── */}
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroMain}>
            <Prompt path="~">whoami</Prompt>
            <p className={styles.whoami}>
              {profile.name} <span className={styles.dim}>—</span> {profile.studio}
            </p>

            <h1 id="hero-title" className={styles.h1}>
              {profile.headline.before}
              <span className={styles.hl}>{profile.headline.highlight}</span>
              {profile.headline.after}
              <span className={styles.caret} aria-hidden="true" />
            </h1>

            <Prompt path="~">cat intro.txt</Prompt>
            <p className={styles.intro}>{profile.intro}</p>

            <div className={styles.ctas}>
              <a href="#proyectos" className={styles.btnPrimary}>
                <span aria-hidden="true">$ </span>ls proyectos/
              </a>
              <a href={`mailto:${contact.email}`} className={styles.btnGhost}>
                {contact.cta}
                <span aria-hidden="true"> →</span>
              </a>
            </div>
          </div>

          <aside className={styles.fetch} aria-label="Resumen del estudio">
            <div className={styles.winBar}>
              <span className={styles.dots} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className={styles.winTitle}>estudio --info</span>
            </div>
            <dl className={styles.kv}>
              <div>
                <dt>nombre</dt>
                <dd>{profile.name}</dd>
              </div>
              <div>
                <dt>rol</dt>
                <dd>{profile.role}</dd>
              </div>
              <div>
                <dt>base</dt>
                <dd>{profile.location}</dd>
              </div>
              <div>
                <dt>alcance</dt>
                <dd>{profile.reach}</dd>
              </div>
              <div>
                <dt>estado</dt>
                <dd>
                  <span className={styles.status}>
                    <span className={styles.statusDot} aria-hidden="true" />
                    {profile.tagline}
                  </span>
                </dd>
              </div>
            </dl>
            <div className={styles.markets}>
              <p className={styles.marketsLabel}>
                <span aria-hidden="true">›</span> mercados
              </p>
              <ul className={styles.marketList}>
                {markets.map((m) => (
                  <li key={m.city}>
                    <span aria-hidden="true">{m.flag}</span> {m.city}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>

        {/* ───────── Sobre ───────── */}
        <section className={styles.section} aria-labelledby="sobre">
          <SectionHead id="sobre" path="~/estudio" cmd="cat README.md" title={profile.aboutTitle} note={profile.aboutSubtitle} />
          <div className={styles.aboutGrid}>
            <div className={styles.bio}>
              {profile.bio.map((p, i) => (
                <Reveal key={i} delay={i * 40}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
            <div className={styles.aboutSide}>
              <ul className={styles.stats}>
                {stats.map((s, i) => (
                  <Reveal as="li" key={s.label} className={styles.stat} delay={i * 80}>
                    <span className={styles.statValue}>{s.value}</span>
                    <span className={styles.statLabel}>{s.label}</span>
                  </Reveal>
                ))}
              </ul>
              <ul className={styles.checks}>
                {principles.map((p, i) => (
                  <Reveal as="li" key={p.title} className={styles.check} delay={i * 80}>
                    <p className={styles.checkHead}>
                      <span className={styles.ok} aria-hidden="true">
                        [ok]
                      </span>
                      <span className={styles.checkEyebrow}>{p.eyebrow}</span>
                    </p>
                    <h3 className={styles.h3}>{p.title}</h3>
                    <p className={styles.text}>{p.description}</p>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ───────── Proyectos ───────── */}
        <section className={styles.section} aria-labelledby="proyectos">
          <SectionHead
            id="proyectos"
            path="~/proyectos"
            cmd="ls -l --destacados"
            title="Proyectos destacados"
            note={`${featuredProjects.length} case studies`}
          />

          <Reveal className={styles.lsWrap}>
            <table className={styles.ls}>
              <caption className={styles.srOnly}>Índice de proyectos destacados</caption>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">nombre</th>
                  <th scope="col" className={styles.colMd}>
                    tipo
                  </th>
                  <th scope="col" className={styles.colLg}>
                    industria
                  </th>
                  <th scope="col" className={styles.colMd}>
                    estado
                  </th>
                </tr>
              </thead>
              <tbody>
                {featuredProjects.map((p, i) => (
                  <tr key={p.slug}>
                    <td className={styles.dim}>{pad(i + 1)}</td>
                    <td>
                      <a href={`#p-${p.slug}`} className={styles.lsLink}>
                        {p.slug}/
                      </a>
                    </td>
                    <td className={`${styles.colMd} ${styles.dim}`}>{p.category ? CATEGORY[p.category] : '—'}</td>
                    <td className={`${styles.colLg} ${styles.dim}`}>{p.industry}</td>
                    <td className={styles.colMd}>
                      {p.liveUrl ? <span className={styles.live}>● online</span> : <span className={styles.dim}>○ privado</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          <ol className={styles.cards}>
            {featuredProjects.map((p, i) => (
              <Reveal as="li" key={p.slug} className={styles.cardItem} delay={(i % 2) * 80}>
                <article className={styles.card} id={`p-${p.slug}`}>
                  <div className={styles.winBar}>
                    <span className={styles.dots} aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className={styles.winTitle}>~/proyectos/{p.slug}</span>
                    <span className={styles.winTag}>{p.category ? CATEGORY[p.category] : ''}</span>
                  </div>
                  <div className={styles.shot}>
                    {p.image && (
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(min-width: 1200px) 560px, (min-width: 800px) 46vw, 100vw"
                        className={styles.img}
                      />
                    )}
                  </div>
                  <div className={styles.cardBody}>
                    <p className={styles.meta}>
                      <span className={styles.accentNo}>{pad(i + 1)}</span>
                      {p.industry}
                    </p>
                    <h3 className={styles.cardTitle}>{p.title}</h3>
                    {p.subtitle && <p className={styles.cardSub}>{p.subtitle}</p>}
                    <p className={`${styles.text} ${styles.clamp}`}>{p.description}</p>
                    <ul className={styles.chips} aria-label="Stack">
                      {p.stack.slice(0, 7).map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                      {p.stack.length > 7 && <li className={styles.chipMore}>+{p.stack.length - 7}</li>}
                    </ul>
                    <p className={styles.cardLinks}>
                      <a href={p.caseStudyUrl} className={styles.cmdLink}>
                        <span aria-hidden="true">→ </span>Ver case study
                        <span className={styles.srOnly}> de {p.title}</span>
                      </a>
                      {p.liveUrl && (
                        <a href={p.liveUrl} className={styles.cmdLink} target="_blank" rel="noopener noreferrer">
                          <span aria-hidden="true">↗ </span>Ver sitio
                          <span className={styles.srOnly}> de {p.title} (abre en una pestaña nueva)</span>
                        </a>
                      )}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* ───────── Servicios (--help) ───────── */}
        <section className={styles.section} aria-labelledby="servicios">
          <SectionHead id="servicios" path="~" cmd="estudio --help" title="Servicios" />
          <Reveal className={styles.panel}>
            <p className={styles.usage}>
              <span className={styles.dim}>uso:</span> estudio <span className={styles.flagInline}>[--servicio]</span>{' '}
              <span className={styles.dim}>&lt;tu-negocio&gt;</span>
            </p>
            <dl className={styles.help}>
              {services.map((s) => (
                <div key={s.title} className={styles.helpRow}>
                  <dt>
                    <span className={styles.flagName}>--{flag(s.short)}</span>
                    <span className={styles.helpTitle}>{s.title}</span>
                  </dt>
                  <dd>
                    <p className={styles.text}>{s.description}</p>
                    {s.tags.length > 0 && (
                      <ul className={styles.chips} aria-label="Etiquetas">
                        {s.tags.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        {/* ───────── Proceso ───────── */}
        <section className={styles.section} aria-labelledby="proceso">
          <SectionHead id="proceso" path="~" cmd="./deploy.sh --pipeline" title="Cómo trabajamos" />
          <ol className={styles.pipeline}>
            {process.map((s, i) => (
              <Reveal as="li" key={s.title} className={styles.stage} delay={i * 90}>
                <p className={styles.stageNo}>
                  <span aria-hidden="true">[</span>
                  {i + 1}/{process.length}
                  <span aria-hidden="true">]</span>
                </p>
                <h3 className={styles.h3}>{s.title}</h3>
                <p className={styles.text}>{s.description}</p>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* ───────── Experiencia (git log) ───────── */}
        <section className={styles.section} aria-labelledby="experiencia">
          <SectionHead id="experiencia" path="~/carrera" cmd="git log --graph" title="Experiencia" />
          <ol className={styles.log}>
            {experience.map((job) => (
              <Reveal as="li" key={job.company + job.period} className={styles.commit}>
                <p className={styles.period}>{job.period}</p>
                <h3 className={styles.jobTitle}>
                  {job.role} <span className={styles.at}>@</span>{' '}
                  <span className={styles.company}>{job.company}</span>
                </h3>
                <ul className={styles.diff}>
                  {job.highlights.slice(0, 3).map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                {job.highlights.length > 3 && (
                  <details className={styles.more}>
                    <summary>
                      <span aria-hidden="true">▸ </span>
                      {job.highlights.length - 3} líneas más
                    </summary>
                    <ul className={styles.diff}>
                      {job.highlights.slice(3).map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </details>
                )}
                <ul className={styles.chips} aria-label="Stack">
                  {job.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>

          <div className={styles.skills}>
            <Prompt path="~">tree skills/</Prompt>
            <h3 className={styles.h3}>Skills</h3>
            <div className={styles.trees}>
              {skillGroups.map((g) => (
                <div key={g.name} className={styles.tree}>
                  <h4 className={styles.treeRoot}>{g.name}/</h4>
                  <ul>
                    {g.items.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── Testimonios ───────── */}
        <section className={styles.section} aria-labelledby="testimonios">
          <SectionHead id="testimonios" path="~" cmd="cat testimonios/*.txt" title="Lo que dicen" />
          <div className={styles.quotes}>
            {testimonials.map((t, i) => (
              <Reveal as="figure" key={t.name} className={styles.quote} delay={(i % 3) * 70}>
                <blockquote>
                  <p>{t.quote}</p>
                </blockquote>
                <figcaption>
                  <span className={styles.quoteName}>{t.name}</span>
                  <span className={styles.dim}> · {t.role}</span>
                </figcaption>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ───────── Contacto ───────── */}
        <section className={`${styles.section} ${styles.contact}`} aria-labelledby="contacto">
          <Prompt path="~">mail --nuevo-proyecto</Prompt>
          <h2 id="contacto" className={styles.contactTitle}>
            {contact.title}
            <span className={styles.caret} aria-hidden="true" />
          </h2>
          <p className={styles.intro}>{contact.subtitle}</p>
          <a href={`mailto:${contact.email}`} className={styles.email}>
            {contact.email}
          </a>
          <ul className={styles.socials}>
            {contact.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} className={styles.cmdLink} target="_blank" rel="noopener noreferrer">
                  <span aria-hidden="true">↗ </span>
                  {s.label}
                  <span className={styles.srOnly}> (abre en una pestaña nueva)</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footInner}>
          <p>
            <span className={styles.promptSign} aria-hidden="true">
              ${' '}
            </span>
            {profile.name} <span className={styles.dim}>· {profile.studio}</span>
          </p>
          <p className={styles.dim}>{footer.tagline}</p>
          <p className={styles.dim}>{profile.location}</p>
        </div>
      </footer>
    </div>
  );
}
