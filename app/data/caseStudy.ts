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

/**
 * Un grupo dentro de una pestaña técnica. Ej: dentro de Arquitectura,
 * "Application Architecture", "Platform Features" y "Security".
 *
 * Agrupar importa: una lista de 12 bullets seguidos no se lee, tres grupos de
 * cuatro sí. Es la diferencia entre volcar información y organizarla.
 */
export interface CaseStudyGroup {
  /** Título del grupo. Ej: 'Order Lifecycle'. */
  title: string;
  /** Párrafo de contexto, opcional: muchos grupos se explican con los bullets. */
  body?: string;
  bullets?: string[];
  /**
   * Bullets cortos que se muestran como chips en vez de lista. Para
   * enumeraciones de una o dos palabras (Docker, PM2, Helmet), donde una lista
   * con viñetas desperdicia una línea entera por dato.
   */
  chips?: string[];
}

/**
 * Una pestaña técnica: lo que separa "hice un e-commerce" de "integré Mercado
 * Pago con webhooks idempotentes y lo testeé en sandbox y producción".
 */
export interface CaseStudyDeepDive {
  /** Párrafo introductorio de la pestaña. */
  body?: string;
  /** Bullets sueltos, cuando el contenido no amerita dividirse en grupos. */
  bullets?: string[];
  /** Subsecciones. Es la forma preferida: da estructura escaneable. */
  groups?: CaseStudyGroup[];
}

export interface CaseStudyMeta {
  /** Ej: 'Full-stack · Diseño de producto'. */
  role?: string;
  /**
   * Dónde opera el proyecto, no dónde estoy yo. Ej: 'Buenos Aires, Argentina'.
   * Va en el header como chip con pin.
   */
  location?: string;
  /** Bandera del lugar de `location`, como emoji. Ej: '🇦🇷'. */
  locationFlag?: string;
  /**
   * Lugares adicionales, cada uno con su propia bandera. Se renderiza un chip
   * por entrada, para que bandera y nombre queden siempre emparejados en vez de
   * amontonar varias banderas delante de un texto.
   */
  locations?: { flag?: string; label: string }[];
  /**
   * Cómo está diseñado el sistema: capas, features de plataforma, modelo de
   * tipos. Responde "qué construiste" desde el diseño, no desde una lista de
   * tareas — que es lo que separa a alguien que arma pantallas de alguien que
   * diseña un sistema.
   */
  architecture?: CaseStudyDeepDive;
  /** Cobros: flujo de checkout, ciclo de vida de la orden, verificación. */
  payments?: CaseStudyDeepDive;
  /**
   * Cómo corre en producción: deploy, seguridad operativa, base de datos.
   * Deliberadamente separado de `architecture` — uno es cómo está diseñado,
   * otro es cómo se sostiene funcionando.
   */
  infra?: CaseStudyDeepDive;
  /**
   * Qué se entregó, en términos de producto. No repite el detalle técnico de
   * las otras pestañas: responde "qué recibió el cliente al final".
   */
  deliverables?: CaseStudyDeepDive;
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
