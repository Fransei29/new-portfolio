// app/fun/_lib/copy.ts
// Textos propios del modo fun (botones, etiquetas, la mascota). Todo el
// contenido real sale de locales/ vía buildContent; acá sólo vive la interfaz.

export const FUN_COPY = {
  es: {
    skip: 'Saltar al contenido',
    studio: 'Estudio de software',
    exit: 'Modo clásico',
    exitLabel: 'Volver al sitio en modo clásico',
    languageLabel: 'Cambiar idioma',
    pandaHello: '¡Hola! Tocame',
    pandaLines: ['¡Hola!', 'Bienvenido al modo fun', 'Mismo equipo, más colores', '¿Arrancamos tu proyecto?'],
    pandaLabel: 'Panda del estudio. Tocalo para que te salude.',
    copied: '¡Copiado!',
    copyFailed: 'Seleccioná el email para copiarlo',
    socials: 'Redes',
    madeIn: 'Córdoba, Argentina',
    backToTop: 'Volver arriba',
    menuOpen: 'Abrir menú',
    swipe: 'Deslizá para ver más',
    menuClose: 'Cerrar menú',
    newTab: '(se abre en una pestaña nueva)',
    kickers: { services: 'Qué hacemos', projects: 'Trabajo real', testimonials: 'Clientes y colegas' },
  },
  en: {
    skip: 'Skip to content',
    studio: 'Software studio',
    exit: 'Classic mode',
    exitLabel: 'Back to the site in classic mode',
    languageLabel: 'Change language',
    pandaHello: 'Hi! Poke me',
    pandaLines: ['Hi there!', 'Welcome to fun mode', 'Same team, more colors', 'Shall we start your project?'],
    pandaLabel: 'Studio panda. Poke it to say hi.',
    copied: 'Copied!',
    copyFailed: 'Select the email to copy it',
    socials: 'Socials',
    madeIn: 'Córdoba, Argentina',
    backToTop: 'Back to top',
    menuOpen: 'Open menu',
    swipe: 'Swipe to see more',
    menuClose: 'Close menu',
    newTab: '(opens in a new tab)',
    kickers: { services: 'What we do', projects: 'Real work', testimonials: 'Clients & peers' },
  },
} as const;

export const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/Fransei29' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/franco-seiler/' },
  { label: 'YouTube', href: 'https://www.youtube.com/@francoseiler1710' },
];
