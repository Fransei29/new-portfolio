// lib/homeFaq.ts
// Preguntas frecuentes de la home.
//
// Viven en services.json (servicesPage.faq) porque se escribieron para
// /services, pero esa página nunca las mostró. Se leen acá, en el servidor,
// por la misma razón que lib/servicesContent.ts: `t()` devuelve strings y un
// array llegaría serializado. Además la página necesita las mismas preguntas
// para el JSON-LD de FAQPage, así que conviene una sola fuente.

export interface FaqItem {
  q: string;
  a: string;
}

function loadTranslations(lang: 'en' | 'es') {
  try {
    return require(`../locales/${lang}/services.json`);
  } catch {
    return require(`../locales/en/services.json`);
  }
}

export function getHomeFaq(lang: 'en' | 'es'): FaqItem[] {
  return loadTranslations(lang).servicesPage?.faq?.items ?? [];
}
