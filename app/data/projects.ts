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
      '/img/img/StartOn/StartA.webp',
      '/img/img/StartOn/startb.webp',
      '/img/img/StartOn/startd.webp',
      '/img/img/StartOn/startj.webp',
      '/img/img/StartOn/starto.webp',
      '/img/img/StartOn/Starttttt.webp',
    ],
    videoUrl: '/videos/Start On.mp4',
    githubLink: 'https://github.com/Fransei29/StartOn',
    liveDemoLink: 'https://starton.it.com/',
  },
  {
    slug: 'ateevo-wholesale',
    title: 'Ateevo Wholesale',
    subtitle: 'B2B E-Commerce Platform for Fashion',
    whatIs: `Ateevo Wholesale is a B2B e-commerce platform for fashion brands managing wholesale operations. Developed for a client in Canada.

The platform enables wholesale customers to browse seasonal catalogs, place orders, and track shipments, while providing administrators with tools for product management, inventory, order processing, and customer relationships.

Multi-tenant SaaS architecture supporting multiple independent brands with complete data isolation and customizable white-label branding.

Key Features:

• Multi-Tenant Architecture with isolated PostgreSQL databases and customizable branding
• Digital Contract Signing with canvas-captured signatures and automatic PDF generation
• Real-Time Notifications with alert center and persistent notifications
• Advanced Reporting: Availability and Margin Reports with multi-currency support (USD, CAD, MXN)
• Seasonal Management with availability dates, pre-orders, and estimated shipping dates
• Multi-Currency Pricing (USD, CAD, MXN) with MSRP and automatic conversion
• Complete Order Management workflow from New to Invoice Paid with PDF export
• Advanced Inventory System with multiple metrics (On Hand, Available to Sell, Available to Ship)
• Product Catalog with multiple images, automatic variants, and SKU/MFC codes
• Customer Management with multiple addresses, billing info, and order history
• Dashboard & Analytics with configurable metrics and trend charts
• Super Admin Panel for managing multiple tenants and database creation
• Enterprise Security with JWT authentication, bcrypt-hashed passwords, and role-based permissions`,
    problemSolved: `The wholesale fashion sector lacks modern platforms that efficiently connect brands with their wholesale customers.

Ateevo Wholesale solves this problem by allowing brands to manage their catalog, inventory, and orders centrally, while customers can browse, order, and track their purchases intuitively, all with digitally signed contracts and advanced margin and availability reports.

The multi-tenant architecture allows scaling the business by supporting multiple brands on a single platform with complete security and customization.

This platform delivers a complete B2B e-commerce solution for the fashion industry. Brands can manage their wholesale business end-to-end, from catalog to invoicing, while customers enjoy a modern, intuitive, and fully personalized shopping experience. The digital contract system, advanced reports, and multi-tenant architecture make Ateevo Wholesale an enterprise-ready solution that scales with business growth.`,
    techStack: [
      'React',
      'TypeScript',
      'Vite',
      'SCSS Modules',
      'Tailwind CSS',
      'shadcn/ui',
      'React Router',
      'Node.js',
      'Express',
      'TypeORM',
      'PostgreSQL',
      'JWT',
      'bcrypt',
      'Google Cloud Storage',
      'jsPDF',
      '@react-pdf/renderer',
      'Resend',
      'React Email',
      'Lucide React'
    ],
    learnings: [
      'Multi-tenant architecture with isolated PostgreSQL databases per tenant and customizable white-label branding (custom logo, primary/secondary colors, contact info, dynamic storefront color adaptation without page reload).',
      'Digital contract signing system with canvas-captured hand signatures, timestamps, IP addresses, automatic PDF generation, contract states (pending, signed_by_customer, signed_by_admin, fully_signed, cancelled), and support for multiple contracts per order (complete and partial invoices).',
      'Real-time notification system with alert center bell icon, automatic notifications for contract signature requirements, unique floating notification when admin requests signature, persistent notifications until read, and direct navigation to order from notification.',
      'Advanced Availability Report showing available products for sale, identifying which customers ordered each product, allowing "stealing" items from existing orders for new orders, with filters for products with orders vs available products.',
      'Advanced Margin Report calculating profit margins per product based on costs and sale prices, multi-currency support (USD, CAD), identifying products without cost data with direct action buttons, automatic calculations of revenue, cost, margin and margin percentage, counting only "Shipped" or "Invoice Paid" orders as completed sales.',
      'Seasonal product management with products organized by seasons (Spring 2025, Fall/Winter, etc.), availability dates and estimated shipping dates, products marked as "Pre-order" for future seasons, current season highlighting, splash images per season, and customers seeing estimated shipping dates based on product seasons.',
      'Complete multi-currency pricing system with prices in USD, CAD, and MXN, customers seeing prices in their base currency by country, MSRP (Manufacturer Suggested Retail Price) per currency, costs per currency for accurate margin calculations, and automatic conversion and display.',
      'Comprehensive order management with full state workflow (New, Draft, Submitted, Confirmed, Booked, Shipped, Invoice Sent, Invoice Pending, Invoice Overdue, Invoice Paid, Cancel), customers creating orders from storefront, admins creating orders manually, full order editing by admins (add/remove/adjust items), optional customer PO numbers, internal notes for admins only, PDF export of orders, and complete state change history.',
      'Advanced inventory system with multiple metrics: On Hand (physical stock available), Available to Sell (stock minus pending orders), Available to Ship (stock available for immediate shipping), Pending Orders (quantity committed in orders), Supplier Orders Pending (incoming stock from suppliers), with advanced filters, search, quick quantity editing, and variant view (colors/sizes) with individual stock.',
      'Product catalog management with multiple images per product (up to 5) with featured image, automatic variants (colors × sizes = complete matrix), prices and costs per variant, customizable categories, assignment to multiple seasons, SKU and MFC (Manufacturer Code), descriptions and materials, and advanced search and filtering.',
      'Customer management panel with account creation and editing, multiple shipping addresses per customer, billing information, account activation/deactivation, complete order history per customer, and password reset functionality.',
      'Administrative dashboard with configurable total sales (by period), total number of orders, number of active customers, sales trend charts, recent orders list, best-selling products, and real-time updates.',
      'Super admin panel for platform administration with management of multiple tenants, creation of new tenants with automatic databases, tenant impersonation for support, tenant activation/deactivation, and view of all tenants and their status.',
      'Fully responsive design optimized for desktop, tablet, and mobile with adaptive navigation, touch-optimized forms and tables, and consistent experience across all devices.',
      'Enterprise security with JWT authentication, bcrypt-hashed passwords, role-based permission validation (Customer, Admin, Super Admin), tenant headers for correct routing, and complete data isolation ensuring privacy and data compliance.'
    ],
    screenshots: [
      '/atevo/A.webp',
      '/atevo/120shots_so.webp',
      '/atevo/257shots_so.webp',
      '/atevo/289shots_so.webp',
      '/atevo/316shots_so.webp',
      '/atevo/446shots_so.webp',
      '/atevo/453shots_so.webp',
      '/atevo/600shots_so.webp',
      '/atevo/622shots_so.webp',
      '/atevo/697shots_so.webp',
      '/atevo/742shots_so.webp',
      '/atevo/910shots_so.webp',
    ],
    githubLink: null as any,
    liveDemoLink: '',
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
      '/img/img/Lex/LexA.webp',
      '/img/img/Lex/LexB.webp',
      '/img/img/Lex/LexC.webp',
      '/img/img/Lex/LexD.webp',
      '/img/img/Lex/LexE.webp',
      '/img/img/Lex/LexF.webp',
      '/img/img/Lex/LexG.webp',
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
      '/img/img/Habita/habitaA.webp',
      '/img/img/Habita/habitaj.webp',
      '/img/img/Habita/habitax.webp',
      '/img/img/Habita/habita.webp',
    ],
    videoUrl: '/videos/HABITA.mp4',
    githubLink: 'https://github.com/Fransei29/property-recommenderv2',
    liveDemoLink: 'https://property-recommenderv2.vercel.app/'
  },
  {
    slug: 'event-scheduler',
    title: 'Event Scheduler',
    subtitle: 'Event Booking & Venue Management Platform',
    whatIs: `
      Event Scheduler is a full-stack platform that connects event organizers with venues (event spaces).
      The platform includes two interfaces: an administration portal for venues to configure their spaces through a 13-step onboarding process with validation and auto-save, and a public website where users can discover, configure, and book spaces for their events.
      Features include space and amenities management, real-time price calculation, interactive map integration with Leaflet, image galleries with Google Cloud Storage, customizable catering packages, preferred vendor management, policy and restrictions system, contract management and visualization (PDF, Word, SVG) with terms acceptance, payment processing with Stripe and credit/debit cards, auto-save with data loss protection, real-time validation on all forms, accessibility system (ADA/ACA compliance), schedule and availability management, event coordination, complete preview before finalizing, and fully responsive design.
    `,
    problemSolved: `
      The event space booking market lacks comprehensive platforms that facilitate both venue management and booking experience for clients.
      Event Scheduler solves this problem by offering a dual system that allows venue owners to completely configure their spaces through a guided step-by-step process with validation and auto-save, while event organizers can discover and book spaces intuitively, with detailed information about capacity, amenities, prices, availability, policies, and contracts, all in a single platform with secure payment processing.
    `,
    techStack: [
      'Next.js',
      'React',
      'TypeScript',
      'SCSS',
      'Node.js',
      'Express',
      'PostgreSQL',
      'TypeORM',
      'Framer Motion',
      'Leaflet',
      'Google Cloud Storage',
      'Stripe',
      'Jest',
      'React Testing Library',
      'Playwright',
      'Vercel'
    ],
    learnings: [
      'Built a full-stack platform with Next.js, React, and TypeScript for type safety and optimal performance.',
      'Developed a complex 13-step onboarding process with real-time validation and auto-save functionality.',
      'Integrated Stripe for secure payment processing with credit and debit cards.',
      'Implemented interactive maps with Leaflet for venue location visualization.',
      'Created a comprehensive contract management system supporting PDF, Word, and SVG formats.',
      'Developed real-time price calculation based on space, amenities, and catering packages.',
      'Implemented Google Cloud Storage for efficient image and document management.',
      'Built accessibility features ensuring ADA/ACA compliance throughout the platform.',
      'Created comprehensive testing suite with Jest, React Testing Library, and Playwright.',
      'Designed a dual-interface system (admin portal and public website) with shared components.',
      'Implemented auto-save functionality to prevent data loss during form completion.',
      'Developed a complete event coordination system with availability management.'
    ],
    screenshots: [
      '/img/img/Event/eventA.webp',
      '/img/img/Event/eventb.webp',
      '/img/img/Event/eventbb.webp',
      '/img/img/Event/eventc.webp',
      '/img/img/Event/eventd.webp',
      '/img/img/Event/evente.webp',
      '/img/img/Event/eventf.webp',
      '/img/img/Event/eventff.webp',
      '/img/img/Event/eventl.webp',
      '/img/img/Event/eventw.webp',
      '/img/img/Event/eventx.webp',
      '/img/img/Event/evenp.webp',
    ],
    githubLink: null as any,
    liveDemoLink: '',
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
      '/img/img/Club/GymA.webp',
      '/img/img/Club/GymB.webp',
      '/img/img/Club/GymC.webp',
      '/img/img/Club/GymD.webp',
      '/img/img/Club/GymE.webp',
      '/img/img/Club/GymF.webp',
      '/img/img/Club/GymG.webp',
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
      '/img/img/WebLex/WebA.webp',
      '/img/img/WebLex/WebB.webp',
      '/img/img/WebLex/WebC.webp',
      '/img/img/WebLex/WebE.webp',
      '/img/img/WebLex/WebF.webp',
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
      '/img/img/ecommerce/ecoA.webp',
      '/img/img/ecommerce/eco1.webp',
      '/img/img/ecommerce/eco2.webp',
      '/img/img/ecommerce/eco3.webp',
      '/img/img/ecommerce/eco5.webp',
      '/img/img/ecommerce/eco6.webp',
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
      '/img/img/Medicare/mediA.webp',
      '/img/img/Medicare/medic.webp',
      '/img/img/Medicare/medid.webp',
      '/img/img/Medicare/mediii.webp',
      '/img/img/Medicare/medijjj.webp',
      '/img/img/Medicare/mediu.webp',
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
      '/img/img/Task/taskA.webp',
      '/img/img/Task/taska.webp',
      '/img/img/Task/task.webp',
      '/img/img/Task/taskc.webp',
      '/img/img/Task/taskkk.webp',
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
      '/img/img/Flipper/flipperA.webp',
      '/img/img/Flipper/flipperf.webp',
      '/img/img/Flipper/flippero.webp',
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
      '/img/img/Vestire/vestireA.webp',
      '/img/img/Vestire/vestired.webp',
      '/img/img/Vestire/vestiref.webp',
      '/img/img/Vestire/vestirei.webp',
      '/img/img/Vestire/vestirej.webp',
    ],
    githubLink: 'https://github.com/Fransei29/vestire_front.git',
    liveDemoLink: 'https://vestire-front-s196.vercel.app/',
  }
];