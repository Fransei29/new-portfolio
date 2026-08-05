// components/ProjectDetail/CaseStudyMeta.tsx
// Ficha de contexto (rol, duración, cliente) y resultados medibles.
//
// Cada bloque se renderiza solo si tiene datos, así los proyectos a los que
// todavía no se les cargó nada se ven exactamente igual que antes.

import type { CaseStudyOutcome, CaseStudyTestimonial } from '../../app/data/caseStudy';
import styles from './CaseStudyMeta.module.scss';

const COPY = {
  es: {
    role: 'Rol',
    engagement: 'Tipo de trabajo',
    duration: 'Duración',
    client: 'Cliente',
    industry: 'Industria',
    year: 'Año',
    outcomes: 'Resultados',
  },
  en: {
    role: 'Role',
    engagement: 'Engagement',
    duration: 'Timeline',
    client: 'Client',
    industry: 'Industry',
    year: 'Year',
    outcomes: 'Outcomes',
  },
} as const;

interface Props {
  language: 'es' | 'en';
  /** Ancla para el índice de navegación del case study. */
  id?: string;
  role?: string;
  engagement?: string;
  duration?: string;
  client?: string;
  industry?: string;
  year?: string;
  outcomes?: CaseStudyOutcome[];
  testimonial?: CaseStudyTestimonial;
}

/** Un guion suelto significa "todavía sin cargar" — no se muestra. */
const isFilled = (value?: string) => Boolean(value && value.trim() && value.trim() !== '—');

export default function CaseStudyMeta({
  language,
  id,
  role,
  engagement,
  duration,
  client,
  industry,
  year,
  outcomes,
  testimonial,
}: Props) {
  const copy = COPY[language];

  // El orden importa: rol y tipo de trabajo primero, que es lo que un
  // prospecto escanea para saber qué hiciste y en qué condiciones.
  const facts = [
    { label: copy.role, value: role },
    { label: copy.engagement, value: engagement },
    { label: copy.industry, value: industry },
    { label: copy.client, value: client },
    { label: copy.duration, value: duration },
    { label: copy.year, value: year },
  ].filter((fact) => isFilled(fact.value));

  const realOutcomes = (outcomes ?? []).filter((outcome) => isFilled(outcome.value));
  const hasTestimonial = testimonial && isFilled(testimonial.quote);

  if (facts.length === 0 && realOutcomes.length === 0 && !hasTestimonial) return null;

  return (
    <div id={id} className={styles.wrap} data-case-section>
      {facts.length > 0 && (
        <dl className={styles.facts}>
          {facts.map((fact) => (
            <div key={fact.label} className={styles.fact}>
              <dt className={styles.factLabel}>{fact.label}</dt>
              <dd className={styles.factValue}>{fact.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {realOutcomes.length > 0 && (
        <section className={styles.outcomes} aria-label={copy.outcomes}>
          <h2 className={styles.outcomesTitle}>{copy.outcomes}</h2>
          <div className={styles.outcomeGrid}>
            {realOutcomes.map((outcome) => (
              <div key={`${outcome.value}-${outcome.label}`} className={styles.outcome}>
                <span className={styles.outcomeValue}>{outcome.value}</span>
                <span className={styles.outcomeLabel}>{outcome.label}</span>
                {outcome.context && (
                  <span className={styles.outcomeContext}>{outcome.context}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {hasTestimonial && testimonial && (
        <figure className={styles.testimonial}>
          <blockquote className={styles.quote}>{testimonial.quote}</blockquote>
          <figcaption className={styles.attribution}>
            <span className={styles.author}>{testimonial.author}</span>
            {testimonial.role && <span className={styles.authorRole}>{testimonial.role}</span>}
          </figcaption>
        </figure>
      )}
    </div>
  );
}
