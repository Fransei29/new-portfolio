import { NextResponse } from 'next/server';
import { projects } from '../../data/projects';

// Helper function to load translations
function loadTranslations(lang: 'en' | 'es') {
  try {
    const translations = require(`../../../locales/${lang}/projects.json`);
    return translations;
  } catch (error) {
    console.warn(`Failed to load ${lang}/projects.json:`, error);
    return require(`../../../locales/en/projects.json`);
  }
}

export async function GET(request: Request) {
  // Get language from query parameter, default to 'en'
  const { searchParams } = new URL(request.url);
  const lang = (searchParams.get('lang') || 'en') as 'en' | 'es';
  const translations = loadTranslations(lang);
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations;
    for (const k of keys) {
      value = value?.[k];
    }
    // If value is found and is a string, return it
    if (typeof value === 'string' && value.length > 0) {
      return value;
    }
    // If not found, return the key (which will be used as fallback)
    return key;
  };

  const projects = [
    {
      slug: 'acer0',
      title: t('projects.items.acer0.title'),
      isTutorial: false,
      description: t('projects.items.acer0.description'),
      link2: null,
      link3: 'https://www.acer0.com.ar/',
      previewImage: '/img/img/Acero-web/acero-01.webp',
      technologies: ['Next.js', 'React', 'TypeScript', 'SCSS Modules', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Mercado Pago SDK', 'Google OAuth', 'JWT', 'Docker', 'PM2'],
      category: 'product',
      status: 'latest',
      featured: true,
    },
    {
      slug: 'bellum',
      title: t('projects.items.bellum.title'),
      isTutorial: false,
      description: t('projects.items.bellum.description'),
      link2: null,
      link3: 'https://bellumhoafinance.com/',
      previewImage: '/img/img/bellum-web/Screenshot from 2026-05-12 19-47-24.webp',
      technologies: ['Next.js', 'React', 'TypeScript', 'SCSS', 'GSAP', 'Three.js', 'React Three Fiber', 'Resend', 'GitHub Contents API', 'Vitest'],
      category: 'platform',
      status: 'latest',
      featured: true,
    },
    {
      slug: 'comply-dq',
      title: t('projects.items.comply-dq.title'),
      isTutorial: false,
      description: t('projects.items.comply-dq.description'),
      link2: null,
      link3: null,
      previewImage: '/img/img/cdq-web/cdq-01.webp',
      technologies: ['Next.js', 'React', 'TypeScript', 'Redux Toolkit', 'NestJS', 'Prisma', 'PostgreSQL', 'Keycloak', 'JWT', 'Stripe', 'AWS S3', 'Ant Design', 'MUI'],
      category: 'platform',
      status: 'latest',
      featured: true,
    },
    {
      slug: 'grupo-el-triunfo',
      title: t('projects.items.grupo-el-triunfo.title'),
      isTutorial: false,
      description: t('projects.items.grupo-el-triunfo.description'),
      link2: null,
      link3: 'https://el-triunfo.vercel.app/',
      previewImage: '/img/img/eltriunfo-web/eltriunfo-01.webp',
      technologies: ['Next.js', 'React', 'TypeScript', 'SCSS Modules', 'GSAP', 'ScrollTrigger', 'Radix UI', 'Lucide React'],
      category: 'landing',
      status: 'latest',
      featured: true,
    },
    {
      slug: 'home-trades-online',
      title: t('projects.items.home-trades-online.title'),
      isTutorial: false,
      description: t('projects.items.home-trades-online.description'),
      link2: null,
      link3: null,
      previewImage: '/img/img/HomePlatform-web/Screenshot from 2026-05-12 19-28-21.webp',
      technologies: ['Django', 'PostgreSQL', 'HTMX', 'Alpine.js', 'Tailwind CSS', 'Docker', 'Gunicorn', 'Nginx', 'Playwright', 'GitHub Actions', 'Google Cloud Platform'],
      category: 'platform',
      featured: true,
    },
    {
      slug: 'salesforpro',
      title: t('projects.items.salesforpro.title'),
      isTutorial: false,
      description: t('projects.items.salesforpro.description'),
      link2: null,
      link3: null,
      previewImage: '/img/img/HomeWeb-web/Screenshot from 2026-05-12 19-26-22.webp',
      technologies: ['Django Templates', 'Tailwind CSS', 'GSAP', 'ScrollTrigger', 'Alpine.js', 'SVG', 'Django i18n'],
      category: 'landing',
    },
    {
      slug: 'starton',
      title: t('projects.items.starton.title'),
      isTutorial: false,
      description: t('projects.items.starton.description'),
      link2: 'https://github.com/Fransei29/starton',
      link3: 'https://www.starton.it.com/',
      previewImage: '/img/img/StartOn/StartA.webp',
      technologies: ['Next.js', 'React', 'TypeScript', 'SCSS', 'Supabase', 'Google OAuth'],
      category: 'platform',
      featured: true,
    },
    {
      slug: 'mi-agenda',
      title: t('projects.items.mi-agenda.title'),
      isTutorial: false,
      description: t('projects.items.mi-agenda.description'),
      link2: null,
      link3: 'https://miagenda.site/',
      previewImage: '/img/img/Miagenda/A.webp',
      technologies: ['Next.js', 'React', 'TypeScript', 'Redux Toolkit', 'SCSS', 'Tailwind CSS', 'MUI', 'NestJS', 'Prisma', 'MySQL', 'Redis', 'MercadoPago', 'Google Calendar API', 'Socket.io', 'Docker'],
      category: 'product',
    },
    {
      slug: 'augusto-fit-program',
      title: t('projects.items.augusto-fit-program.title'),
      isTutorial: false,
      description: t('projects.items.augusto-fit-program.description'),
      link2: null,
      link3: 'https://www.augustoluque.com/',
      previewImage: '/img/img/Augusto/A.webp',
      technologies: ['Next.js', 'React', 'TypeScript', 'SCSS Modules', 'GSAP', 'next/font (Google Fonts)', 'EmailJS', 'Vercel'],
      category: 'landing',
    },
    {
      slug: 'tecnomar',
      title: t('projects.items.tecnomar.title'),
      isTutorial: false,
      description: t('projects.items.tecnomar.description'),
      link2: null,
      link3: 'https://www.tecno-mar.com.ar/',
      previewImage: '/img/img/Tecnomar/A.webp',
      technologies: ['Next.js', 'React', 'TypeScript', 'SCSS Modules', 'CSS Variables', 'Next/Image'],
      category: 'landing',
    },
    {
      slug: 'ateevo-wholesale',
      title: 'Ateevo Wholesale',
      isTutorial: false,
      description: t('projects.items.ateevo-wholesale.description'),
      link2: null,
      link3: null,
      previewImage: '/atevo/A.webp',
      technologies: ['React', 'TypeScript', 'Vite', 'SCSS Modules', 'Tailwind CSS', 'shadcn/ui', 'React Router', 'Node.js', 'Express', 'TypeORM', 'PostgreSQL', 'JWT', 'bcrypt', 'Google Cloud Storage', 'jsPDF', 'Resend', 'React Email'],
      category: 'platform',
      featured: true,
    },
    {
      slug: 'lexmax',
      title: t('projects.items.lexmax.title'),
      isTutorial: false,
      description: t('projects.items.lexmax.description'),
      link2: null,
      link3: null,
      previewImage: '/img/img/Lex/LexA.webp',
      technologies: ['React', 'Vite', 'SCSS', 'React Router', 'Axios', 'Node.js', 'Express', 'JWT', 'Google OAuth', 'Telegram API'],
      category: 'platform',
    },
    {
      slug: 'property-recommender',
      title: t('projects.items.property-recommender.title'),
      isTutorial: false,
      description: t('projects.items.property-recommender.description'),
      link2: 'https://github.com/Fransei29/property-recommenderv2',
      link3: 'https://property-recommenderv2.vercel.app/',
      previewImage: '/img/img/Habita/habitaA.webp',
      technologies: ['Next.js', 'React', 'TypeScript', 'SCSS'],
      category: 'product',
    },
    {
      slug: 'event-scheduler',
      title: t('projects.items.event-scheduler.title'),
      isTutorial: false,
      description: t('projects.items.event-scheduler.description'),
      link2: null,
      link3: null,
      previewImage: '/img/img/Event/eventA.webp',
      technologies: ['Next.js', 'React', 'TypeScript', 'SCSS', 'Node.js', 'Express', 'PostgreSQL', 'TypeORM', 'Framer Motion', 'Leaflet', 'Google Cloud Storage', 'Stripe', 'Jest', 'React Testing Library', 'Playwright', 'Vercel'],
      category: 'platform',
      featured: true,
    },
    {
      slug: 'the-club-northfield',
      title: t('projects.items.the-club-northfield.title'),
      isTutorial: false,
      description: t('projects.items.the-club-northfield.description'),
      link2: null,
      link3: 'https://www.theclubatnorthfield.com/',
      previewImage: '/img/img/Club/GymA.webp',
      technologies: ['Next.js', 'React', 'TypeScript', 'SCSS', 'Tailwind CSS', 'Strapi CMS', 'Vercel'],
      category: 'landing',
    },
    {
      slug: 'lexmax-landing',
      title: t('projects.items.lexmax-landing.title'),
      isTutorial: false,
      description: t('projects.items.lexmax-landing.description'),
      link2: null,
      link3: 'https://lexmaxsoluciones.com/',
      previewImage: '/img/img/WebLex/WebA.webp',
      technologies: ['Next.js', 'React', 'SCSS', 'Tailwind CSS', 'React Icons'],
      category: 'landing',
    },
    {
      slug: 'ecommerce',
      title: t('projects.items.ecommerce.title'),
      isTutorial: false,
      description: t('projects.items.ecommerce.description'),
      link2: 'https://github.com/Fransei29/sport-ecommerce/blob/main/README.md',
      link3: 'https://sport-ecommerce-58pi.vercel.app/',
      previewImage: '/img/img/ecommerce/ecoA.webp',
      technologies: ['React', 'Next.js', 'TypeScript', 'Prisma', 'Docker', 'Sass'],
      category: 'product',
    },
    {
      slug: 'healthcare-crm',
      title: t('projects.items.healthcare-crm.title'),
      isTutorial: false,
      description: t('projects.items.healthcare-crm.description'),
      link2: 'https://github.com/fransei29/interview-challenge',
      link3: 'https://interview-challenge-ecru.vercel.app',
      previewImage: '/img/img/Medicare/mediA.webp',
      technologies: ['Next.js', 'React', 'NestJS', 'TypeScript', 'Tailwind CSS', 'Turso', 'TypeORM'],
      category: 'product',
    },
    {
      slug: 'taskmanager',
      title: t('projects.items.taskmanager.title'),
      isTutorial: false,
      description: t('projects.items.taskmanager.description'),
      link2: 'https://github.com/Fransei29/task-manager-b',
      link3: 'https://task-manager-b-git-main-francos-projects-94304a5e.vercel.app/',
      previewImage: '/img/img/Task/taskA.webp',
      technologies: ['React', 'Next.js', 'Axios', 'PostgreSQL', 'Sequelize', 'Sass'],
      category: 'product',
    },
    {
      slug: 'vestire',
      title: t('projects.items.vestire.title'),
      isTutorial: false,
      description: t('projects.items.vestire.description'),
      link2: 'https://github.com/Fransei29/vestire_front.git',
      link3: 'https://vestire-front-s196.vercel.app/',
      previewImage: '/img/img/Vestire/vestireA.webp',
      technologies: ['Node.js', 'Express', 'React', 'Axios', 'PostgreSQL'],
      category: 'product',
    },
    {
      slug: 'flipper',
      title: t('projects.items.flipper.title'),
      isTutorial: false,
      description: t('projects.items.flipper.description'),
      link2: 'https://github.com/Fransei29/clonetwitter.git',
      link3: 'https://clonetwitter-zy47-git-main-francos-projects-94304a5e.vercel.app/',
      previewImage: '/img/img/Flipper/flipperA.webp',
      technologies: ['Node.js', 'Express', 'Redis', 'Tailwind CSS'],
      category: 'product',
    },
    {
      slug: 'trip-planner',
      title: t('projects.items.trip-planner.title'),
      isTutorial: false,
      description: t('projects.items.trip-planner.description'),
      link2: 'https://github.com/Fransei29/trip-planner-c',
      link3: 'https://trip-planner-c.vercel.app/',
      previewImage: '/img/img/Trip/trip.webp',
      technologies: ['Next.js', 'JavaScript', 'CSS'],
      category: 'product',
    },
  ];

  return NextResponse.json(projects);
}