// design-exploration/option-05/page.tsx
// Dirección 05 · Bento: todo el perfil como una grilla modular de tarjetas,
// tipo dashboard. Cada sección es una grilla de 12 columnas (6 en tablet, 1 en
// mobile) y cada tarjeta declara su ancho con clases de span.
import type { Metadata } from "next";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Reveal from "../_shared/Reveal";
import { content, featuredProjects, type Project } from "../_shared/content";
import styles from "./option.module.css";

export const metadata: Metadata = {
  title: "05 · Bento — Exploración",
};

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--o5-sans",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--o5-mono",
});
const fontVars = `${geist.variable} ${geistMono.variable}`;

const {
  profile,
  stats,
  markets,
  principles,
  process,
  services,
  experience,
  skills,
  testimonials,
  contact,
  footer,
} = content;

/* Patrón de tamaños de las tarjetas de proyecto, en orden. En desktop suma
   filas completas de 12 columnas: 8+4 / (4) / 6+6 / 4+4+4 / 6+6 / 4+4+4. */
type Size = "hero" | "side" | "wide" | "third";
const pattern: Size[] = [
  "hero",
  "side",
  "side",
  "wide",
  "wide",
  "third",
  "third",
  "third",
  "wide",
  "wide",
  "third",
  "third",
  "third",
];

const sizeClass: Record<Size, string> = {
  hero: `${styles.c8} ${styles.r2} ${styles.t6}`,
  side: `${styles.c4} ${styles.t3}`,
  wide: `${styles.c6} ${styles.t3}`,
  third: `${styles.c4} ${styles.t3}`,
};

function ArrowUpRight() {
  return (
    <svg className={styles.icon} viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M5 11 11 5M6 5h5v5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg className={styles.icon} viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProjectTile({
  project,
  size,
  index,
}: {
  project: Project;
  size: Size;
  index: number;
}) {
  const isHero = size === "hero";
  const maxStack = isHero ? 7 : size === 'wide' ? 4 : 3;
  const extra = project.stack.length - maxStack;
  return (
    <Reveal
      as="div"
      className={`${styles.cell} ${sizeClass[size]}`}
      delay={(index % 3) * 70}
    >
      <article
        className={`${styles.tile} ${styles.project} ${isHero ? styles.projectHero : ""}`}
      >
        <div className={styles.projectMedia}>
          {project.image && (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes={
                isHero
                  ? "(min-width: 1080px) 820px, (min-width: 700px) 90vw, 100vw"
                  : "(min-width: 1080px) 420px, (min-width: 700px) 45vw, 100vw"
              }
              className={styles.projectImg}
              priority={index === 0}
            />
          )}
        </div>
        <div className={styles.projectBody}>
          <p className={styles.kicker}>
            <span className={styles.mono}>
              {String(index + 1).padStart(2, "0")}
            </span>
            {project.industry && <span>{project.industry}</span>}
          </p>
          <h3 className={styles.projectTitle}>
            <a href={project.caseStudyUrl} className={styles.stretched}>
              {project.title}
            </a>
          </h3>
          {project.subtitle && (
            <p className={styles.projectSub}>{project.subtitle}</p>
          )}
          {isHero && (
            <p className={styles.projectDesc}>{project.description}</p>
          )}
          <ul className={styles.chips} aria-label="Stack">
            {project.stack.slice(0, maxStack).map((s) => (
              <li key={s}>{s}</li>
            ))}
            {extra > 0 && <li className={styles.chipMore}>+{extra}</li>}
          </ul>
          <div className={styles.projectLinks}>
            <span className={styles.linkPrimary} aria-hidden="true">
              Ver case study <ArrowRight />
            </span>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                className={styles.linkLive}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver sitio <ArrowUpRight />
                <span className={styles.srOnly}>
                  {" "}
                  de {project.title} (abre en otra pestaña)
                </span>
              </a>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function SectionHead({
  id,
  index,
  title,
  meta,
}: {
  id: string;
  index: string;
  title: string;
  meta?: string;
}) {
  return (
    <div className={styles.sectionHead}>
      <h2 id={id} className={styles.sectionTitle}>
        <span className={styles.sectionIndex} aria-hidden="true">
          {index}
        </span>
        {title}
      </h2>
      {meta && <p className={styles.sectionMeta}>{meta}</p>}
    </div>
  );
}

export default function OptionBento() {
  const caseStudiesStat = stats.find((s) => s.label === "Case studies");
  return (
    <div className={`dx-root ${styles.root} ${fontVars}`} lang="es">
      <a className="dx-skip" href="#main">
        Saltar al contenido
      </a>

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a
            href="#top"
            className={styles.brand}
            aria-label={`${profile.name}, inicio`}
          >
            <span className={styles.brandMark} aria-hidden="true">
              FS
            </span>
            <span className={styles.brandText}>
              <span className={styles.brandName}>{profile.name}</span>
              <span className={styles.brandStudio}>{profile.studio}</span>
            </span>
          </a>
          <nav aria-label="Principal" className={styles.nav}>
            <ul>
              <li>
                <a href="#sobre">Estudio</a>
              </li>
              <li>
                <a href="#proyectos">Proyectos</a>
              </li>
              <li>
                <a href="#experiencia">Experiencia</a>
              </li>
              <li>
                <a href="#contacto">Contacto</a>
              </li>
            </ul>
          </nav>
          <a href={`mailto:${contact.email}`} className={styles.headerCta}>
            Escribinos
          </a>
        </div>
      </header>

      <main id="main" className={styles.main}>
        {/* ——— Resumen: hero + estudio ——— */}
        <section
          id="top"
          className={styles.section}
          aria-labelledby="hero-title"
        >
          <div className={styles.grid}>
            <div
              className={`${styles.tile} ${styles.intro} ${styles.c8} ${styles.r2} ${styles.t6}`}
            >
              <p className={styles.introMeta}>
                <span className={styles.dot} aria-hidden="true" />
                {profile.name} · {profile.role}
              </p>
              <h1 id="hero-title" className={styles.h1}>
                {profile.headline.before}
                <span className={styles.accent}>
                  {profile.headline.highlight}
                </span>
                {profile.headline.after}
              </h1>
              <p className={styles.lead}>{profile.intro}</p>
              <div className={styles.actions}>
                <a href="#contacto" className={styles.btnPrimary}>
                  {contact.cta} <ArrowRight />
                </a>
                <a href="#proyectos" className={styles.btnGhost}>
                  Ver proyectos
                </a>
              </div>
            </div>

            <Reveal
              as="div"
              className={`${styles.tile} ${styles.statsTile} ${styles.c4} ${styles.t3}`}
            >
              <p className={styles.tileLabel}>En números</p>
              <dl className={styles.stats}>
                {stats.map((s) => (
                  <div key={s.label} className={styles.stat}>
                    <dt>{s.label}</dt>
                    <dd>{s.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal
              as="div"
              className={`${styles.tile} ${styles.locTile} ${styles.c4} ${styles.t3}`}
              delay={80}
            >
              <p className={styles.tileLabel}>Base</p>
              <p className={styles.locCity}>{profile.location}</p>
              <p className={styles.locReach}>{profile.reach}</p>
              <div className={styles.locGrid} aria-hidden="true" />
            </Reveal>
          </div>
        </section>

        <section
          id="sobre"
          className={styles.section}
          aria-labelledby="sobre-title"
        >
          <SectionHead
            id="sobre-title"
            index="01"
            title={profile.aboutTitle}
            meta={profile.aboutSubtitle}
          />
          <div className={styles.grid}>
            <Reveal
              as="div"
              className={`${styles.tile} ${styles.bio} ${styles.c7} ${styles.t6}`}
            >
              <p className={styles.bioLead}>{profile.bio[0]}</p>
              <div className={styles.bioCols}>
                {profile.bio.slice(1).map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal
              as="div"
              className={`${styles.tile} ${styles.markets} ${styles.c5} ${styles.t6}`}
              delay={80}
            >
              <h3 className={styles.tileTitle}>Dónde entregamos</h3>
              <ul className={styles.marketList}>
                {markets.map((m) => (
                  <li key={m.city}>
                    <span className={styles.flag} aria-hidden="true">
                      {m.flag}
                    </span>
                    {m.city}
                  </li>
                ))}
              </ul>
            </Reveal>

            {principles.map((p, i) => (
              <Reveal
                as="div"
                key={p.title}
                className={`${styles.tile} ${styles.principle} ${styles.c4} ${styles.t2}`}
                delay={i * 70}
              >
                <p className={styles.tileLabel}>{p.eyebrow}</p>
                <h3 className={styles.tileTitle}>{p.title}</h3>
                <p className={styles.muted}>{p.description}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ——— Proyectos ——— */}
        <section
          id="proyectos"
          className={styles.section}
          aria-labelledby="proyectos-title"
        >
          <SectionHead
            id="proyectos-title"
            index="02"
            title="Proyectos destacados"
            meta={`${featuredProjects.length} destacados de ${caseStudiesStat?.value ?? ""} case studies`}
          />
          <div className={styles.grid}>
            {featuredProjects.map((p, i) => (
              <ProjectTile
                key={p.slug}
                project={p}
                size={pattern[i] ?? "third"}
                index={i}
              />
            ))}
          </div>
          <a href="/projects" className={styles.allLink}>
            Ver todos los case studies <ArrowRight />
          </a>
        </section>

        {/* ——— Servicios y proceso ——— */}
        <section
          id="servicios"
          className={styles.section}
          aria-labelledby="servicios-title"
        >
          <SectionHead
            id="servicios-title"
            index="03"
            title="Servicios y proceso"
          />
          <div className={styles.grid}>
            <Reveal
              as="div"
              className={`${styles.tile} ${styles.c8} ${styles.t6}`}
            >
              <ul className={styles.services}>
                {services.map((s) => (
                  <li key={s.title} className={styles.service}>
                    <span className={styles.serviceShort}>{s.short}</span>
                    <h3 className={styles.serviceTitle}>{s.title}</h3>
                    <p className={styles.muted}>{s.description}</p>
                    {s.tags.length > 0 && (
                      <ul className={styles.chips} aria-label="Especialidades">
                        {s.tags.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal
              as="div"
              className={`${styles.tile} ${styles.processTile} ${styles.c4} ${styles.t6}`}
              delay={80}
            >
              <h3 className={styles.tileTitle}>Cómo trabajamos</h3>
              <ol className={styles.process}>
                {process.map((step, i) => (
                  <li key={step.title}>
                    <span className={styles.stepNum} aria-hidden="true">
                      {i + 1}
                    </span>
                    <div>
                      <h4 className={styles.stepTitle}>{step.title}</h4>
                      <p>{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        {/* ——— Experiencia + skills + testimonios ——— */}
        <section
          id="experiencia"
          className={styles.section}
          aria-labelledby="experiencia-title"
        >
          <SectionHead
            id="experiencia-title"
            index="04"
            title="Experiencia y stack"
          />
          <div className={styles.grid}>
            <Reveal
              as="div"
              className={`${styles.tile} ${styles.c7} ${styles.r3} ${styles.t6}`}
            >
              <h3 className={styles.tileTitle}>Trayectoria</h3>
              <ol className={styles.timeline}>
                {experience.map((job) => (
                  <li key={job.company + job.period} className={styles.job}>
                    <p className={styles.jobPeriod}>{job.period}</p>
                    <h4 className={styles.jobRole}>
                      {job.role}{" "}
                      <span className={styles.jobCompany}>· {job.company}</span>
                    </h4>
                    <p className={styles.jobText}>{job.highlights[0]}</p>
                    <ul
                      className={`${styles.chips} ${styles.chipsSm}`}
                      aria-label="Stack"
                    >
                      {job.stack.slice(0, 6).map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </Reveal>

            {(
              [
                ["Frontend", skills.frontend],
                ["Backend y datos", skills.backend],
                ["Herramientas", skills.tools],
              ] as const
            ).map(([label, list], i) => (
              <Reveal
                as="div"
                key={label}
                className={`${styles.tile} ${styles.skillTile} ${styles.c5} ${styles.t2}`}
                delay={i * 70}
              >
                <div className={styles.skillHead}>
                  <h3 className={styles.tileTitle}>{label}</h3>
                  <span className={styles.skillCount}>{list.length}</span>
                </div>
                <ul className={styles.chips}>
                  {list.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </Reveal>
            ))}

            <Reveal
              as="div"
              className={`${styles.tile} ${styles.quotesTile} ${styles.c12} ${styles.t6}`}
            >
              <h3 className={styles.tileTitle}>
                Lo que dicen quienes trabajaron con nosotros
              </h3>
              <ul className={styles.quotes}>
                {testimonials.map((t) => (
                  <li key={t.name} className={styles.quote}>
                    <blockquote>
                      <p>“{t.quote}”</p>
                    </blockquote>
                    <p className={styles.quoteBy}>
                      <span className={styles.avatar} aria-hidden="true">
                        {t.name
                          .split(" ")
                          .map((w) => w[0])
                          .join("")}
                      </span>
                      <span>
                        <strong>{t.name}</strong>
                        <span className={styles.quoteRole}>{t.role}</span>
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ——— Contacto ——— */}
        <section
          id="contacto"
          className={styles.section}
          aria-labelledby="contacto-title"
        >
          <div className={styles.grid}>
            <Reveal
              as="div"
              className={`${styles.tile} ${styles.contact} ${styles.c8} ${styles.t6}`}
            >
              <p className={styles.tileLabel}>05 · Contacto</p>
              <h2 id="contacto-title" className={styles.contactTitle}>
                {contact.title}
              </h2>
              <p className={styles.contactSub}>{contact.subtitle}</p>
              <a
                href={`mailto:${contact.email}`}
                className={styles.contactMail}
              >
                <span className={styles.contactMailLabel}>{contact.cta}</span>
                <span className={styles.contactMailAddr}>{contact.email}</span>
                <ArrowUpRight />
              </a>
            </Reveal>
            <Reveal
              as="div"
              className={`${styles.tile} ${styles.socialTile} ${styles.c4} ${styles.t6}`}
              delay={80}
            >
              <h3 className={styles.tileTitle}>En otros lugares</h3>
              <ul className={styles.socials}>
                {contact.socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer">
                      <span>{s.label}</span>
                      <ArrowUpRight />
                      <span className={styles.srOnly}>
                        {" "}
                        (abre en otra pestaña)
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p className={styles.footerBrand}>
            <span className={styles.brandMark} aria-hidden="true">
              FS
            </span>
            {profile.name} · {profile.studio}
          </p>
          <p className={styles.footerTag}>{footer.tagline}</p>
          <a href="#top" className={styles.footerTop}>
            Volver arriba ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
