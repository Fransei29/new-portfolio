// src/data/projects.ts
export const projects = [
  {
    slug: 'starton',
    title: 'StartOn ',
    subtitle: 'Talent-Startup Connection Platform',
    whatIs: `
      StartOn is an innovative platform that connects developers, designers, and technology professionals with companies and startups seeking exceptional talent.
      The platform democratizes access to quality job opportunities, facilitating professional growth and the development of innovative companies.
      Features include differentiated role-based dashboards, internal messaging system, founder networking, blogs, advanced filters, and responsive panels.
    `,
    problemSolved: `
      The technology sector lacks reliable platforms that efficiently connect emerging talent with startups and companies.
      StartOn solves this problem by enabling students, founders, and companies to meet in a segmented, secure, and fast manner, fostering collaboration and professional growth.
    `,
    techStack: [
      'Next.js 15.4.2',
      'React 19.1.0',
      'TypeScript',
      'SCSS Modules',
      'Lucide React',
      'Node.js',
      'Express',
      'PostgreSQL (Supabase)',
      'Google OAuth 2.0',
      'JWT',
      'Vercel'
    ],
    learnings: [
      'Implemented a multi-role system (students, founders, recruiters, startup workers) with differentiated authorization.',
      'Google OAuth 2.0 and advanced JWT handling with automatic refresh.',
      'Backend development in Supabase Edge Functions for efficiency and scalability.',
      'Modular UI/UX component design with SCSS and reusable architecture in Next.js.',
      'Persistent private messaging system and advanced filters by city, technology, and company type.',
      'UX/UI optimization: mobile-first, smooth animations, scalable typography, and consistent color palette.',
      'Implementation of blogs, service pages, and founder networking system.'
    ],
    screenshots: [
      '/img/Start1.webp',
      '/img/Start2.webp',
      '/img/Start3.webp',
      '/img/Start4.webp',
      '/img/Start5.webp',
    ],
    videoUrl: '/videos/Start On.mp4',
    githubLink: 'https://github.com/Fransei29/StartOn',
    liveDemoLink: 'https://starton.it.com/',
  },
  {
    slug: 'lexmax',
    title: 'LexMax',
    subtitle: 'Judicial Case Management Platform',
    whatIs: `
      LEXMAX is a web platform for managing judicial case files that automates tasks and improves productivity for law firms.
      It includes comprehensive case file management, legal notices and operations tracking, AI-powered event monitoring that detects relevant events and suggests actions, document management, automated notifications via Gmail and Telegram, advanced filters and search capabilities, a dashboard with statistics and charts, and a secure authentication system.
      The platform centralizes all judicial information and facilitates efficient case tracking.
    `,
    problemSolved: `
      Law firms face difficulties organizing and tracking case files, legal notices, and operations.
      LEXMAX solves this by centralizing information, automating notifications, using AI to detect relevant events and suggest actions, and offering advanced filters and search capabilities to quickly find information, improving efficiency and reducing errors.
    `,
    techStack: [
      'React',
      'Vite',
      'SCSS',
      'React Router',
      'Axios',
      'Node.js',
      'Express',
      'JWT',
      'AI Integration',
      'Google OAuth (Gmail)',
      'Telegram API'
    ],
    learnings: [
      'Built a full-stack application with React and Vite for optimal performance.',
      'Implemented secure authentication using JWT tokens.',
      'Integrated AI capabilities for intelligent event detection and action suggestions.',
      'Developed automated notification systems with Gmail OAuth and Telegram API.',
      'Created advanced filtering and search functionality for efficient data retrieval.',
      'Built a comprehensive dashboard with statistics and data visualization.',
      'Designed a scalable architecture with Node.js and Express backend.',
      'Implemented responsive design with SCSS for optimal user experience.'
    ],
    screenshots: [
      '/img/LexA.webp',
      '/img/LexB.webp',
      '/img/LexC.webp',
      '/img/LexD.webp',
      '/img/LexE.webp',
      '/img/LexF.webp',
      '/img/LexG.webp',
    ],
    githubLink: null as any,
    liveDemoLink: '',
  },
  {
    slug: 'property-recommender',
    title: 'Property Recommender',
    subtitle: 'Property Recommendation System',
    whatIs: `
      A web application that recommends real estate properties based on user preferences and similarity algorithms.
      It allows users to filter, sort, and discover properties that match their needs through a clean and responsive interface.
      Built with Next.js 15 and TypeScript, featuring modular SCSS for scalable styling and optimized for fast loading and user experience.
      Includes an admin panel where users can view and manage their favorite properties.
    `,
    problemSolved: `
      Many real estate platforms overwhelm users with too many listings without effective filtering or personalized suggestions.
      This app solves that by providing targeted recommendations, improving user satisfaction and decision-making efficiency.
      The admin panel allows users to easily track and manage their favorite properties in one centralized location.
    `,
    techStack: [
      'Next.js 15',
      'React',
      'TypeScript',
      'SCSS (Modular)',
      'Vercel'
    ],
    learnings: [
      'Implemented recommendation logic using JSON data and client-side algorithms.',
      'Built a scalable and maintainable frontend architecture with Next.js and TypeScript.',
      'Applied modular SCSS for clean, reusable styling.',
      'Optimized app performance and user experience through efficient data handling and UI design.',
      'Created an admin panel for user property management and favorites tracking.'
    ],
    screenshots: [
      '/img/prope.jpg',
      '/img/prop1.webp',
      '/img/prop2.webp',
      '/img/prop3.webp',
      '/img/prop4.webp',
      '/img/prop5.webp',
      
    ],
    videoUrl: '/videos/HABITA.mp4',
    githubLink: 'https://github.com/Fransei29/property-recommenderv2',
    liveDemoLink: 'https://property-recommenderv2.vercel.app/'
  },
  {
    slug: 'the-club-northfield',
    title: 'The Club at Northfield',
    subtitle: 'Corporate Website for Sports & Fitness Club - Ontario, Canada',
    whatIs: `
      Corporate website for The Club at Northfield, a racquet sports and fitness club in Kitchener-Waterloo, Ontario, Canada.
      Includes CMS integration with Strapi for content management, dynamic event system, services and athletics sections, membership plans, interactive FAQ, and fully responsive design.
      The site is optimized for static export and offers a smooth user experience with banner carousels, intuitive navigation, and modular components that ensure easy content updates without technical intervention.
    `,
    problemSolved: `
      Create a web presence that showcases the club's facilities, services, and events, making information easily accessible to members and visitors.
      The site integrates a CMS so the team can update content without technical intervention, keeping information current about events, services, membership plans, and the team.
    `,
    techStack: [
      'Next.js',
      'React',
      'TypeScript',
      'SCSS',
      'Tailwind CSS',
      'Strapi CMS',
      'Vercel'
    ],
    learnings: [
      'Built a corporate website with Next.js for optimal performance and SEO.',
      'Integrated Strapi CMS for headless content management.',
      'Created a dynamic event system with automatic updates.',
      'Developed responsive design with Tailwind CSS and SCSS.',
      'Implemented banner carousels and interactive components.',
      'Optimized for static export and fast loading times.',
      'Designed modular components for easy maintenance.',
      'Created an intuitive navigation system for better user experience.'
    ],
    screenshots: [
      '/img/GymA.webp',
      '/img/GymB.webp',
      '/img/GymC.webp',
      '/img/GymD.webp',
      '/img/GymE.webp',
      '/img/GymF.webp',
      '/img/GymG.webp',
    ],
    githubLink: null as any,
    liveDemoLink: 'https://www.theclubatnorthfield.com/',
  },
  {
    slug: 'lexmax-landing',
    title: 'LexMax Landing',
    subtitle: 'Legal Automation Landing Page',
    whatIs: `
      LEXMAX is a professional landing page for a legal automation platform that connects law firms with intelligent technological solutions.
      The page presents legal automation services, including case file management, intelligent bots, massive document generation, and AI-powered analysis.
      Features include a hero section with impact statistics, presentation of 6 main services, company section with purpose and vision, interactive contact form with copy functionality, responsive navigation with hamburger menu, modern design with visual effects, and reusable modular components.
    `,
    problemSolved: `
      The traditional legal sector lacks effective digital presence to communicate innovative technological solutions.
      LEXMAX solves this problem by providing a landing page that clearly and professionally presents legal automation capabilities, facilitating the conversion of visitors into potential clients through an attractive design, structured information, and strategic call-to-actions that highlight the platform's benefits.
    `,
    techStack: [
      'Next.js',
      'React',
      'SCSS',
      'Tailwind CSS',
      'React Icons'
    ],
    learnings: [
      'Built a modern landing page with Next.js for optimal SEO and performance.',
      'Implemented responsive design with Tailwind CSS and SCSS for flexible styling.',
      'Created an interactive contact form with copy-to-clipboard functionality.',
      'Designed a hero section with animated statistics and visual impact.',
      'Developed reusable modular components for maintainable code structure.',
      'Implemented responsive navigation with hamburger menu for mobile devices.',
      'Created visual effects and animations to enhance user engagement.',
      'Optimized page performance and loading times with Next.js optimizations.'
    ],
    screenshots: [
      '/img/WebA.webp',
      '/img/WebB.webp',
      '/img/WebC.webp',
      '/img/WebE.webp',
      '/img/WebF.webp',
    ],
    githubLink: null as any,
    liveDemoLink: 'https://lexmaxsoluciones.com/',
  },  
  {
    slug: 'ecommerce',
    title: 'Quiero Sport',
    subtitle: 'Modern E-Commerce Platform',
    whatIs: `
      A full e-commerce platform for sports gear with product browsing, cart management, and secure checkout.
      Features include user authentication (NextAuth.js), order storage (PostgreSQL & Prisma), backend API routes (Next.js 13), Dockerized local setup, and deployment on Vercel.
    `,
    problemSolved: `
      Users struggled with slow, insecure, and inconsistent sports gear e-commerce sites.
      This app delivers a fast, modern UX with secure authentication, reliable data handling (Prisma), and streamlined development (Docker).
    `,
    techStack: [
      'React',
      'Next.js',
      'TypeScript',
      'Prisma ORM',
      'PostgreSQL',
      'Sass (SCSS)',
      'NextAuth.js',
      'Docker',
      'Vercel'
    ],
    learnings: [
      'Built a full-stack Next.js app using server and client components.',
      'Designed a relational database schema for e-commerce.',
      'Implemented authentication with NextAuth.js.',
      'Managed state and side effects with React hooks.',
      'Used Prisma ORM for database operations.',
      'Set up Docker for local development and deployed on Vercel.'
    ],
    screenshots: [
      '/img/quiero.webp',
      '/img/eco3.webp',
      '/img/eco2.webp',
      '/img/eco1.webp',
      '/img/eco6.webp',
    ],
    githubLink: 'https://github.com/Fransei29/sport-ecommerce/blob/main/README.md',
    liveDemoLink: 'https://sport-ecommerce-58pi.vercel.app/',
  },
  {
    slug: 'healthcare-crm',
    title: 'Medicare ',
    subtitle: 'Healthcare Treatment Management',
    whatIs: `
      A full-stack web application to manage patients, medications, and treatment assignments in a digital healthcare workflow.
      Includes dashboard views, reusable forms, input validation, dark mode, and a fully tested NestJS backend.
      Built with type safety, API integration, and modern UI/UX standards.
    `,
    problemSolved: `
      Managing healthcare treatments manually is error-prone and inefficient.
      This app simplifies the process by offering structured CRUD operations, assignment tracking, and automatic remaining days calculation for active treatments.
      Ensures reliability with full-stack validation and high test coverage.
    `,
    techStack: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS v4',
      'NestJS',
      'TypeORM',
      'Turso (SQLite)',
      'Jest',
      'Render',
      'Vercel'
    ],
    learnings: [
      'Developed a full-stack TypeScript app with decoupled frontend (Next.js) and backend (NestJS).',
      'Designed relational DB schema with entities and foreign key relationships.',
      'Built RESTful APIs with full validation and error handling using class-validator and NestJS pipes.',
      'Used Turso SQLite with authentication tokens for cloud-hosted persistence.',
      'Implemented client-side and server-side form validation with reusable components.',
      'Tested core services and edge cases with unit and integration tests.',
      'Designed a responsive, accessible UI with Tailwind and dark mode toggle.',
      'Managed environment configuration for deployment across Render and Vercel.'
    ],
    screenshots: [
      '/img/Medi.webp',
      '/img/Medi6.webp',
      '/img/Medi2.webp',
      '/img/Medi10.webp',
      '/img/Medi3.webp',
    ],
    githubLink: 'https://github.com/fransei29/interview-challenge',
    liveDemoLink: 'https://interview-challenge-ecru.vercel.app'
  },  
  {
    slug: 'taskmanager',
    title: 'Task Manager',
    subtitle: 'Full Stack Task Management App',
    whatIs: `
      A comprehensive task management application built with Next.js and PostgreSQL.
      Features include user authentication, CRUD operations for tasks, and a clean, intuitive interface.
      The app uses NextAuth.js for secure authentication and Sequelize ORM for database operations.
    `,
    problemSolved: `
      Users needed a simple yet powerful way to manage their tasks with secure authentication.
      This app provides a reliable solution with user-specific task management, secure data storage,
      and a responsive design that works across all devices.
    `,
    techStack: [
      'Next.js',
      'React',
      'Axios',
      'CSS Modules',
      'PostgreSQL',
      'Sequelize',
      'NextAuth.js',
      'Docker'
    ],
    learnings: [
      'Implemented user authentication with NextAuth.js.',
      'Created a relational database schema for users and tasks.',
      'Built RESTful API endpoints for CRUD operations.',
      'Set up Docker for local development environment.',
      'Implemented responsive design with CSS Modules.',
      'Managed state and API calls with Axios.'
    ],
    screenshots: [
      '/img/task.webp',
      '/img/task1.webp',
      '/img/task2.webp',
      '/img/task3.webp',
      '/img/task4.webp',
    ],
    githubLink: 'https://github.com/Fransei29/task-manager-b',
    liveDemoLink: 'https://task-manager-b-git-main-francos-projects-94304a5e.vercel.app/',
  },
  {
    slug: 'flipper',
    title: 'Flipper',
    subtitle: 'Twitter Clone Platform',
    whatIs: `
      A full-featured Twitter clone built with Node.js and Pug templates, styled with Tailwind CSS.
      Features include user authentication, real-time posts, likes, and comments.
      The application uses a modern tech stack with Docker for containerization and Vercel for deployment.
    `,
    problemSolved: `
      Users needed a social platform to share thoughts and interact with others.
      This app provides a familiar Twitter-like experience with essential features
      like posting, liking, and commenting, all wrapped in a clean, responsive interface.
    `,
    techStack: [
      'Node.js',
      'Express',
      'Pug Templates',
      'JavaScript',
      'Tailwind CSS',
      'Docker',
      'Vercel'
    ],
    learnings: [
      'Built a full-stack application using Node.js and Express.',
      'Implemented server-side rendering with Pug templates.',
      'Created a responsive and interactive user interface.',
      'Set up Docker for containerization and deployment.',
      'Implemented real-time features for social interaction.',
      'Deployed the application on Vercel.'
    ],
    screenshots: [
      '/img/flipper.webp',
      '/img/task6.webp',
      '/img/fli1.webp',
      '/img/fli2.webp',
    ],
    githubLink: 'https://github.com/Fransei29/clonetwitter.git',
    liveDemoLink: 'https://clonetwitter-zy47-git-main-francos-projects-94304a5e.vercel.app/',
  },
  {
    slug: 'vestire',
    title: 'Vestiré',
    subtitle: 'Fashion E-Commerce Platform',
    whatIs: `
      A sleek and modern e-commerce platform for fashion and accessories, built with React and styled with CSS.
      Features include user authentication, product browsing, shopping cart functionality, and a clean, responsive design.
      The application showcases a collection of clothing items, sneakers, and accessories with detailed product information.
      Includes secure user authentication and session management for a personalized shopping experience.
    `,
    problemSolved: `
      Local fashion retailers needed a modern online presence to reach customers.
      This app provides an elegant solution with an intuitive shopping experience,
      showcasing products with high-quality images and detailed descriptions.
      Secure authentication ensures users can safely manage their accounts and orders.
    `,
    techStack: [
      'React',
      'Node.js',
      'Express',
      'PostgreSQL',
      'CSS',
      'JWT Auth',
      'Vercel'
    ],
    learnings: [
      'Built a responsive e-commerce interface with React.',
      'Implemented secure user authentication with JWT.',
      'Created an intuitive product browsing experience.',
      'Developed RESTful APIs with Node.js and Express.',
      'Managed database operations with PostgreSQL.',
      'Deployed the application on Vercel.',
      'Implemented modern UI/UX practices.'
    ],
    screenshots: [
      '/img/vestire.webp',
      '/img/vesti1.webp',
      '/img/vesti2.webp',
      '/img/vesti3.webp',
      '/img/vesti4.webp',
    ],
    githubLink: 'https://github.com/Fransei29/vestire_front.git',
    liveDemoLink: 'https://vestire-front-s196.vercel.app/',
  }
];