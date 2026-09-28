// app/fun/_lib/buildContent.ts
// Arma el contenido del modo fun leyendo las MISMAS fuentes que el sitio:
// locales/<lang>/*.json, lib/projectCards.ts y app/data/projects.ts. No hay
// texto copiado: si algo cambia en el sitio, el modo fun lo refleja solo.
//
// Corre en el servidor. La página recibe los dos idiomas ya armados y elige en
// el cliente según el idioma activo (el sitio resuelve el idioma en el cliente).

import { getProjectCards, type CardLanguage } from '../../../lib/projectCards';
import { projects as projectData } from '../../data/projects';

import esHome from '../../../locales/es/home.json';
import enHome from '../../../locales/en/home.json';
import esServices from '../../../locales/es/services.json';
import enServices from '../../../locales/en/services.json';
import esContact from '../../../locales/es/contact.json';
import enContact from '../../../locales/en/contact.json';
import esCommon from '../../../locales/es/common.json';
import enCommon from '../../../locales/en/common.json';
import esProjects from '../../../locales/es/projects.json';
import enProjects from '../../../locales/en/projects.json';

const LOCALES = {
  es: { home: esHome, services: esServices, contact: esContact, common: esCommon, projects: esProjects },
  en: { home: enHome, services: enServices, contact: enContact, common: enCommon, projects: enProjects },
};

export interface FunProject {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  industry?: string;
  stack: string[];
  image?: string;
  liveUrl: string | null;
  caseStudyUrl: string;
}

export interface FunContent {
  headline: { before: string; highlight: string; after: string };
  intro: string;
  reach: string;
  regions: string[];
  about: { title: string; eyebrow: string; lead: string; paragraphs: string[] };
  stats: { value: string; label: string }[];
  principles: { eyebrow: string; title: string; description: string }[];
  services: { title: string; subtitle: string; items: { short: string; title: string; description: string; tags: string[] }[] };
  process: { title: string; subtitle: string; steps: { title: string; description: string }[]; cta: string };
  projects: { title: string; subtitle: string; items: FunProject[]; viewCase: string; viewAll: string; live: string };
  testimonials: { title: string; subtitle: string; items: { name: string; role: string; quote: string }[] };
  contact: { title: string; subtitle: string; description: string; reachOut: string; email: string; copy: string; cta: string };
  nav: { about: string; services: string; projects: string; contact: string };
  footerTagline: string;
}

const SERVICE_KEYS = [
  'webDevelopment',
  'webApplications',
  'ecommerceSolutions',
  'aiIntegration',
  'businessAutomation',
  'scalableArchitecture',
] as const;
const PRINCIPLE_KEYS = ['expertise', 'delivery', 'collaboration'] as const;
const PROCESS_KEYS = ['discovery', 'design', 'development', 'launch'] as const;
const TESTIMONIAL_KEYS = ['franklin', 'tomas', 'matias', 'edison', 'adrian', 'ismael', 'valentin'] as const;

/** Los locales usan "|" como corte de línea opcional y "\n" entre frases. */
const flat = (s: string) => s.replace(/\s*\|\s*/g, ' ').replace(/\s*\n\s*/g, ' ').trim();

function buildProjects(lang: CardLanguage): FunProject[] {
  const items = LOCALES[lang].projects.projects.items as Record<string, Record<string, unknown>>;
  return getProjectCards(lang)
    .filter((card) => card.featured)
    .map((card) => {
      const data = projectData.find((p) => p.slug === card.slug);
      const item = items[card.slug] ?? {};
      const industry = (item.industry as string | undefined) ?? data?.industry;
      return {
        slug: card.slug,
        title: card.title.trim(),
        subtitle: item.subtitle as string | undefined,
        description: card.description,
        // En los datos algunas industrias vienen en dos líneas ("Manufacturing\nE-commerce").
        industry: industry?.split('\n')[0],
        stack: card.technologies ?? [],
        image: card.previewImage,
        liveUrl: card.link3 ?? null,
        caseStudyUrl: `/projects/${card.slug}`,
      };
    });
}

export function buildContent(lang: CardLanguage): FunContent {
  const { home, services, contact, common, projects } = LOCALES[lang];
  const svc = services.services as unknown as Record<string, { title: string; titleAccent?: string; description: string; slug: string; tags?: string[] }>;
  const testi = services.testimonials as unknown as Record<string, { name: string; role: string; message: string }>;
  const about = home.about;

  return {
    headline: {
      before: home.hero.subtitle.before.trim(),
      highlight: home.hero.subtitle.highlight.trim(),
      after: home.hero.subtitle.after.trim(),
    },
    intro: flat(home.hero.description),
    reach: about.reachTitle,
    regions: about.reachTitle.split('·').map((r) => r.trim()),
    about: {
      title: about.title,
      eyebrow: about.whoIAm,
      lead: about.personalStory,
      paragraphs: [...about.teamNote.split('\n'), ...about.newChapter.split('\n')].map((p) => p.trim()).filter(Boolean),
    },
    stats: [
      { value: about.dedication, label: about.dedicationTitle },
      { value: about.interests, label: about.interestsTitle },
      { value: about.reach, label: about.reachTitle },
    ],
    principles: PRINCIPLE_KEYS.map((k) => ({
      eyebrow: home.whyChooseUs[k].eyebrow,
      title: home.whyChooseUs[k].title,
      description: flat(home.whyChooseUs[k].description),
    })),
    services: {
      title: services.services.title,
      subtitle: flat(services.services.subtitle),
      items: SERVICE_KEYS.map((k) => ({
        short: svc[k].slug,
        title: `${svc[k].title} ${svc[k].titleAccent ?? ''}`.trim(),
        description: svc[k].description,
        tags: svc[k].tags ?? [],
      })),
    },
    process: {
      title: home.howWeWork.title,
      subtitle: home.howWeWork.subtitle,
      steps: PROCESS_KEYS.map((k) => ({ title: home.howWeWork[k].title, description: flat(home.howWeWork[k].description) })),
      cta: home.howWeWork.cta.text,
    },
    projects: {
      title: projects.projects.projects,
      subtitle: projects.projects.projectsSubtitle,
      items: buildProjects(lang),
      viewCase: projects.projects.viewProject,
      viewAll: projects.projects.goToProjects,
      live: projects.projects.liveDemo,
    },
    testimonials: {
      title: services.testimonials.title,
      subtitle: services.testimonials.subtitle,
      items: TESTIMONIAL_KEYS.map((k) => ({ name: testi[k].name, role: testi[k].role, quote: flat(testi[k].message) })),
    },
    contact: {
      title: contact.contact.title,
      subtitle: contact.contact.subtitle,
      description: contact.contact.description,
      reachOut: contact.contact.reachOut,
      email: contact.contact.email,
      copy: contact.contact.copyEmail,
      cta: home.hero.cta.contact,
    },
    nav: {
      about: common.nav.about,
      services: common.nav.services,
      projects: common.nav.projects,
      contact: common.nav.contact,
    },
    footerTagline: common.footer.tagline,
  };
}
