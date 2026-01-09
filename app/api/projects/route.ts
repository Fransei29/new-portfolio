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
    return typeof value === 'string' ? value : key;
  };

  const projects = [
    {
      slug: 'starton',
      title: t('projects.items.starton.title'),
      isTutorial: false,
      description: t('projects.items.starton.description'),
      link2: 'https://github.com/Fransei29/starton',
      link3: 'https://starton.vercel.app/',
      previewImage: '/img/Start1.webp',
      technologies: ['Next.js', 'React', 'TypeScript', 'SCSS', 'Supabase', 'Google OAuth'],
    },
    {
      slug: 'lexmax',
      title: t('projects.items.lexmax.title'),
      isTutorial: false,
      description: t('projects.items.lexmax.description'),
      link2: null,
      link3: '',
      previewImage: '/img/LexA.webp',
      technologies: ['React', 'Vite', 'SCSS', 'React Router', 'Axios', 'Node.js', 'Express', 'JWT', 'Google OAuth', 'Telegram API'],
    },
    {
      slug: 'property-recommender',
      title: t('projects.items.property-recommender.title'),
      isTutorial: false,
      description: t('projects.items.property-recommender.description'),
      link2: 'https://github.com/Fransei29/property-recommenderv2',
      link3: 'https://property-recommenderv2.vercel.app/',
      previewImage: '/img/prope.jpg',
      technologies: ['Next.js', 'React', 'TypeScript', 'SCSS'],
    },
    {
      slug: 'the-club-northfield',
      title: t('projects.items.the-club-northfield.title'),
      isTutorial: false,
      description: t('projects.items.the-club-northfield.description'),
      link2: null,
      link3: 'https://www.theclubatnorthfield.com/',
      previewImage: '/img/GymA.webp',
      technologies: ['Next.js', 'React', 'TypeScript', 'SCSS', 'Tailwind CSS', 'Strapi CMS', 'Vercel'],
    },
    {
      slug: 'lexmax-landing',
      title: t('projects.items.lexmax-landing.title'),
      isTutorial: false,
      description: t('projects.items.lexmax-landing.description'),
      link2: null,
      link3: 'https://lexmaxsoluciones.com/',
      previewImage: '/img/WebA.webp',
      technologies: ['Next.js', 'React', 'SCSS', 'Tailwind CSS', 'React Icons'],
    },
    {
      slug: 'ecommerce',
      title: t('projects.items.ecommerce.title'),
      isTutorial: false,
      description: t('projects.items.ecommerce.description'),
      link2: 'https://github.com/Fransei29/sport-ecommerce/blob/main/README.md',
      link3: 'https://sport-ecommerce-58pi.vercel.app/',
      previewImage: '/img/quiero.webp',
      technologies: ['React', 'Next.js', 'TypeScript', 'Prisma', 'Docker', 'Sass'],
    },
    {
      slug: 'healthcare-crm',
      title: t('projects.items.healthcare-crm.title'),
      isTutorial: false,
      description: t('projects.items.healthcare-crm.description'),
      link2: 'https://github.com/fransei29/interview-challenge',
      link3: 'https://interview-challenge-ecru.vercel.app',
      previewImage: '/img/Medi.webp',
      technologies: ['Next.js', 'React', 'NestJS', 'TypeScript', 'Tailwind CSS', 'Turso', 'TypeORM'],
    },    
    {
      slug: 'taskmanager',
      title: t('projects.items.taskmanager.title'),
      isTutorial: false,
      description: t('projects.items.taskmanager.description'),
      link2: 'https://github.com/Fransei29/task-manager-b',
      link3: 'https://task-manager-b-git-main-francos-projects-94304a5e.vercel.app/',
      previewImage: '/img/task.webp',
      technologies: ['React', 'Next.js', 'Axios', 'PostgreSQL', 'Sequelize', 'Sass'],
    },
    {
      slug: 'vestire',
      title: t('projects.items.vestire.title'),
      isTutorial: false,
      description: t('projects.items.vestire.description'),
      link2: 'https://github.com/Fransei29/vestire_front.git',
      link3: 'https://vestire-front-s196.vercel.app/',
      previewImage: '/img/vestire.webp',
      technologies: ['Node.js', 'Express', 'React', 'Axios', 'PostgreSQL'],
    },
    {
      slug: 'flipper',
      title: t('projects.items.flipper.title'),
      isTutorial: false,
      description: t('projects.items.flipper.description'),
      link2: 'https://github.com/Fransei29/clonetwitter.git',
      link3: 'https://clonetwitter-zy47-git-main-francos-projects-94304a5e.vercel.app/',
      previewImage: '/img/flipper.webp',
      technologies: ['Node.js', 'Express', 'Redis', 'Tailwind CSS'],
    },
    {
      slug: 'trip-planner',
      title: t('projects.items.trip-planner.title'),
      isTutorial: false,
      description: t('projects.items.trip-planner.description'),
      link2: 'https://github.com/Fransei29/trip-planner-c',
      link3: 'https://trip-planner-c.vercel.app/',
      previewImage: '/img/trip.webp',
      technologies: ['Node.js', 'Express', 'React', 'Axios', 'MongoDB'],
    },
    {
      slug: 'dynamic-blog',
      title: t('projects.items.dynamic-blog.title'),
      isTutorial: false,
      description: t('projects.items.dynamic-blog.description'),
      link2: 'https://github.com/Fransei29/next-blogs-post/blob/main/app/page.js',
      link3: 'https://next-blogs-post-ahua.vercel.app/',
      previewImage: '/img/next.png',
      technologies: ['Next.js', 'Tailwind CSS', 'Parser'],
    },
    
    {
      slug: 'holistic-portal',
      title: t('projects.items.holistic-portal.title'),
      isTutorial: false,
      description: t('projects.items.holistic-portal.description'),
      link2: 'https://github.com/Fransei29/AmnerisWeb.git',
      link3: 'https://amneris-web.vercel.app/',
      previewImage: '/img/holis.png',
      technologies: ['HTML', 'CSS', 'Sass'],
    },
    {
      slug: 'greengrocery',
      title: t('projects.items.greengrocery.title'),
      isTutorial: false,
      description: t('projects.items.greengrocery.description'),
      link2: 'https://github.com/Fransei29/Verdufront.git',
      link3: 'https://verdufront-zbzb.vercel.app/',
      previewImage: '/img/verdu.png',
      technologies: ['React', 'Jest', 'Axios', 'Tailwind CSS'],
    },
  ];

  return NextResponse.json(projects);
}