// lib/servicesContent.ts
// Fuente única del contenido de /services.
//
// El `t()` del LanguageContext devuelve strings: cuando la clave apunta a un
// array (los bullets de "qué incluye", el stack, las FAQ) lo serializa con
// JSON.stringify y llega al render como texto crudo. Por eso esta página lee
// el JSON del idioma directamente, igual que hace lib/projectCards.ts con las
// tarjetas de case study.
//
// Además así la página puede armarse en el servidor: el HTML sale con los
// servicios adentro y no depende de que corra JavaScript para tener contenido
// — la misma razón por la que /projects dejó de pedir su lista por fetch.

export type ServiceLanguage = 'en' | 'es';

export interface ServiceDetail {
  /** Clave estable — también es el id del panel en la página. */
  key: string;
  name: string;
  /** Etiqueta corta del pie de la tarjeta ("AI", "Workflows", …). Sale del
      mismo bloque `services` que usa la sección de la home, para que la
      tarjeta de /services y la de la home digan exactamente lo mismo. */
  slug: string;
  tagline: string;
  description: string;
  includes: string[];
  deliverables: string[];
  stack: string[];
  fit: string;
}

export interface ServicesPageContent {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  stats: { value: string; label: string }[];
  labels: {
    includesLabel: string;
    deliverablesLabel: string;
    stackLabel: string;
    fitLabel: string;
    cta: string;
  };
  services: ServiceDetail[];
  cta: { title: string; description: string; button: string };
}

/** Orden de la página: primero lo que más se pide, no el orden alfabético. */
const SERVICE_ORDER = [
  'aiIntegration',
  'businessAutomation',
  'webDevelopment',
  'webApplications',
  'ecommerceSolutions',
  'scalableArchitecture',
] as const;

function loadTranslations(lang: ServiceLanguage) {
  try {
    return require(`../locales/${lang}/services.json`);
  } catch {
    return require(`../locales/en/services.json`);
  }
}

export function getServicesContent(lang: ServiceLanguage = 'en'): ServicesPageContent {
  const translations = loadTranslations(lang);
  const raw = translations.servicesPage;
  /* Las tarjetas de la home leen de `services`; el detalle vive en
     `servicesPage`. Se combinan acá para que las dos vistas no puedan
     desincronizarse. */
  const teasers = translations.services;

  return {
    hero: raw.hero,
    stats: raw.stats,
    labels: raw.detail,
    services: SERVICE_ORDER.map((key) => ({
      key,
      slug: teasers?.[key]?.slug ?? '',
      ...raw.items[key],
    })),
    cta: raw.cta,
  };
}
