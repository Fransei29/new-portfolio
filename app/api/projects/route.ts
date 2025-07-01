import { NextResponse } from 'next/server';
import { projects } from '../../data/projects';


export async function GET() {
  const projects = [
    {
      slug: 'ecommerce',
      title: 'Ecommerce',
      isTutorial: false,
      description: `A comprehensive full-stack e-commerce platform featuring user authentication, product management, shopping cart functionality, and integration with Mercado Pago for payments.\nBuilt with React and Next.js for the frontend, TypeScript for type safety, and Prisma as the ORM for database interactions.\nThe application is containerized using Docker, ensuring consistent development and deployment environments.\nStyling is managed with Sass, providing modular and maintainable CSS.`,
      link2: 'https://github.com/Fransei29/sport-ecommerce/blob/main/README.md',
      link3: 'https://sport-ecommerce-58pi.vercel.app/',
      previewImage: '/img/quiero.webp',
      technologies: ['React', 'Next.js', 'TypeScript', 'Prisma', 'Docker', 'Sass'],
    },
    {
      slug: 'property-recommender',
      title: 'Property Recommender',
      isTutorial: false,
      description: `Sistema de recomendación de propiedades desarrollado con Next.js 15 y TypeScript.\nUtiliza SCSS modular para un diseño limpio y escalable.\nOptimizado para rendimiento y experiencia de usuario.\nIdeal para inmobiliarias, startups de real estate o como base para productos de recomendación personalizados.`,
      link2: 'https://github.com/Fransei29/property-recommender',
      link3: 'https://property-recommender-blond.vercel.app/',
      previewImage: '/img/ProA.webp',
      technologies: ['Next.js', 'React', 'TypeScript', 'SCSS'],
    },
    {
      slug: 'taskmanager',
      title: 'Task Manager',
      isTutorial: false,
      description: `An efficient task management application that allows users to create, edit, and delete tasks.\nIt includes user authentication to ensure personalized task management.\nThe frontend is developed with React and Next.js, utilizing Axios for API requests.\nThe backend leverages PostgreSQL as the relational database, interfaced through Sequelize ORM.\nStyling is handled with Sass for a clean and responsive UI.`,
      link2: 'https://github.com/Fransei29/task-manager-b',
      link3: 'https://task-manager-b-git-main-francos-projects-94304a5e.vercel.app/',
      previewImage: '/img/task.webp',
      technologies: ['React', 'Next.js', 'Axios', 'PostgreSQL', 'Sequelize', 'Sass'],
    },
    {
      slug: 'vestire',
      title: 'Vestiré',
      isTutorial: false,
      description: `An e-commerce platform specializing in clothing, offering a wide selection of products with intuitive navigation and a seamless checkout process.\nThe frontend is built with React, while the backend utilizes Node.js and Express for server-side operations.\nAxios is used for handling HTTP requests, and PostgreSQL serves as the database.\nThe application includes user authentication to manage user sessions and orders.`,
      link2: 'https://github.com/Fransei29/vestire_front.git',
      link3: 'https://vestire-front-s196.vercel.app/',
      previewImage: '/img/vestire.webp',
      technologies: ['Node.js', 'Express', 'React', 'Axios', 'PostgreSQL'],
    },
    {
      slug: 'flipper',
      title: 'Flipper',
      isTutorial: false,
      description: `A Twitter-inspired social media application supporting functionalities like tweeting, following, and live updates.\nReal-time interactions are powered by WebSockets, ensuring responsiveness and high user engagement.\nThe backend is developed with Node.js and Express, utilizing Redis for efficient data storage and retrieval.\nThe frontend employs Tailwind CSS for rapid UI development.`,
      link2: 'https://github.com/Fransei29/clonetwitter.git',
      link3: 'https://clonetwitter-zy47-git-main-francos-projects-94304a5e.vercel.app/',
      previewImage: '/img/flipper.webp',
      technologies: ['Node.js', 'Express', 'Redis', 'Tailwind CSS'],
    },
    {
      title: 'Trip Planner',
      isTutorial: false,
      description: `An application designed to simplify trip planning with itinerary management and other travel tools.\nIts effective navigation and smooth design enhance the user experience significantly.\nThe frontend is developed with React, while the backend uses Node.js and Express.\nAxios handles HTTP requests, and MongoDB serves as the database for storing trip data.`,
      link2: 'https://github.com/Fransei29/trip-planner-c',
      link3: 'https://trip-planner-c.vercel.app/',
      previewImage: '/img/trip.webp',
      technologies: ['Node.js', 'Express', 'React', 'Axios', 'MongoDB'],
    },
    {
      title: 'Dynamic Blog',
      isTutorial: false,
      description: `A responsive blog application that fetches posts from an RSS feed (TechCrunch) and user-generated content from Airtable.\nFeatures include dynamic routing, user blog management, and a clean, responsive design.\nBuilt with Next.js for server-side rendering and Tailwind CSS for styling.\nThe application parses RSS feeds and integrates with Airtable's API to manage content.`,
      link2: 'https://github.com/Fransei29/next-blogs-post/blob/main/app/page.js',
      link3: 'https://next-blogs-post-ahua.vercel.app/',
      previewImage: '/img/next.png',
      technologies: ['Next.js', 'Tailwind CSS', 'Parser'],
    },
    
    {
      title: 'Holistic Portal',
      isTutorial: false,
      description: `An informative website showcasing alternative therapies, offering descriptions, client testimonials, and booking options.\nIt focuses on user interaction and professional presentation.\nThe site is built with HTML and CSS, utilizing Sass for enhanced styling capabilities.`,
      link2: 'https://github.com/Fransei29/AmnerisWeb.git',
      link3: 'https://amneris-web.vercel.app/',
      previewImage: '/img/holis.png',
      technologies: ['HTML', 'CSS', 'Sass'],
    },
    {
      title: 'Greengrocery',
      isTutorial: false,
      description: `An online store specializing in fresh groceries with a shopping cart and an optimized shopping experience.\nIt incorporates testing with Jest, ensuring smooth functionality and higher conversion rates for users.\nThe frontend is developed with React, utilizing Axios for API interactions and Tailwind CSS for styling.`,
      link2: 'https://github.com/Fransei29/Verdufront.git',
      link3: 'https://verdufront-zbzb.vercel.app/',
      previewImage: '/img/verdu.png',
      technologies: ['React', 'Jest', 'Axios', 'Tailwind CSS'],
    },
  ];

  return NextResponse.json(projects);
}
