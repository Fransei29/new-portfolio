// app/data/caseStudy.ts
// Tipos de los campos de case study.
//
// Todos son opcionales a propósito: los 22 proyectos existentes siguen
// funcionando sin tocarlos, y cada uno gana la sección de case study en cuanto
// se le cargan los datos. Nada se rompe a medio camino.

/**
 * Un resultado medible. Lo que separa un case study de una descripción de
 * producto: no "construí un checkout", sino "el checkout bajó el abandono 23%".
 */
export interface CaseStudyOutcome {
  /** El número, protagonista de la tarjeta. Ej: '+23%', '1.2s', '3x'. */
  value: string;
  /** Qué mide. Ej: 'conversión de checkout'. */
  label: string;
  /** Contexto opcional: contra qué se compara. Ej: 'vs. la plataforma anterior'. */
  context?: string;
}

export interface CaseStudyTestimonial {
  quote: string;
  author: string;
  /** Cargo y empresa. Ej: 'Fundadora, Acer0'. */
  role?: string;
}

export interface CaseStudyMeta {
  /** Ej: 'Full-stack · Diseño de producto'. */
  role?: string;
  /**
   * Naturaleza del trabajo: encargo de cliente, colaboración con un equipo, o
   * producto propio. Va aparte de `client` porque "Producto propio" no es un
   * cliente, y ponerlo bajo esa etiqueta se lee como un dato mal cargado.
   * Es lo que evita presentar un proyecto de práctica como un encargo pago.
   */
  engagement?: string;
  /** Ej: '6 semanas'. */
  duration?: string;
  /** Nombre del cliente, si se puede publicar. */
  client?: string;
  /** Ej: 'Manufactura y retail'. Sirve cuando el cliente no se puede nombrar. */
  industry?: string;
  /** Ej: '2025'. */
  year?: string;
  outcomes?: CaseStudyOutcome[];
  testimonial?: CaseStudyTestimonial;
}

/** Los datos de proyecto vienen de un archivo JS sin tipar; se acota lo que se usa. */
export interface ProjectLike extends CaseStudyMeta {
  slug?: string;
  title?: string;
  [key: string]: unknown;
}

/** True si hay al menos un dato de contexto que valga la pena mostrar. */
export const hasCaseStudyMeta = (project: ProjectLike): boolean =>
  Boolean(project.role || project.duration || project.client || project.industry || project.year);

export const hasOutcomes = (project: ProjectLike): boolean =>
  Array.isArray(project.outcomes) && project.outcomes.length > 0;
