// src/data/projects.ts
export const projects = [
  {
    slug: 'acer0',
    title: 'a.cer0',
    subtitle: 'Custom E-Commerce Platform',
    whatIs: `a.cer0 is a fully custom e-commerce platform built from the ground up for a manufacturing and retail brand. The system delivers a complete online shopping experience — from product browsing and cart management to secure checkout with multiple payment methods — alongside a powerful admin panel for full business operation control.

Features include a product catalog with advanced filtering, shopping cart with coupon support, Mercado Pago payment integration, bank transfer handling, customer accounts with order tracking and wishlists, an admin dashboard with sales statistics, and a fully responsive mobile-first design.`,
    problemSolved: `The client needed a tailor-made digital storefront that reflected their brand identity while handling the full complexity of Argentine e-commerce — including Mercado Pago integration, bank transfer confirmation workflows, and a bilingual admin experience.

Off-the-shelf solutions couldn't deliver the custom UX, performance, and control required, so a purpose-built platform was the answer — giving the client total ownership of their data, branding, and operations, with a backend tuned exactly to their workflow.`,
    techStack: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'SCSS Modules',
      'Node.js',
      'Express',
      'PostgreSQL',
      'Prisma ORM',
      'Mercado Pago SDK',
      'Google OAuth 2.0',
      'JWT',
      'Docker',
      'PM2'
    ],
    learnings: [
      'Architected a full-stack monorepo with Next.js 15 (App Router) frontend proxying to an Express/TypeScript backend via a secure BFF (Backend-for-Frontend) pattern.',
      'Integrated Mercado Pago as the primary payment gateway with webhook-driven order status sync, plus a parallel bank transfer flow with admin confirmation/rejection.',
      'Implemented JWT authentication with token versioning for instant revocation, Google OAuth 2.0 sign-in, and role-based access control (customer/admin).',
      'Built a comprehensive admin panel: product and category CRUD with image uploads, order management with fulfillment tracking, coupon engine, review moderation, and real-time sales statistics dashboard.',
      'Designed a customer account area with order history, wishlist/favorites, profile and security settings, and password recovery via transactional email (Nodemailer).',
      'Hardened security with Helmet, express-rate-limit, Zod validation on every endpoint, Google reCAPTCHA on all public forms, and input sanitization across the BFF proxy layer.',
      'Containerized the entire stack with Docker Compose (PostgreSQL 17, backend, frontend) and automated VPS deployment with PM2 cluster mode for zero-downtime releases.',
      'Delivered a pixel-perfect mobile-first responsive UI with SCSS modules and breakpoints at 480px, 640px, 768px, and 900px — looks impeccable on every device, from small phones to ultra-wide desktops.'
    ],
    screenshots: [
      '/img/img/Acero-web/acero-01.webp',
      '/img/img/Acero-web/acero-02.webp',
      '/img/img/Acero-web/acero-03.webp',
      '/img/img/Acero-web/acero-04.webp',
      '/img/img/Acero-web/acero-05.webp',
      '/img/img/Acero-web/acero-06.webp',
      '/img/img/Acero-web/acero-07.webp',
      '/img/img/Acero-web/acero-08.webp',
      '/img/img/Acero-web/acero-09.webp',
      '/img/img/Acero-web/acero-10.webp',
      '/img/img/Acero-web/acero-11.webp',
      '/img/img/Acero-web/acero-12.webp',
      '/img/img/Acero-web/acero-13.webp',
      '/img/img/Acero-web/acero-14.webp',
      '/img/img/Acero-web/acero-15.webp',
      '/img/img/Acero-web/acero-16.webp',
      '/img/img/Acero-web/acero-17.webp',
      '/img/img/Acero-web/acero-18.webp',
    ],
    githubLink: null as any,
    liveDemoLink: 'https://www.acer0.com.ar/',
  },
  {
    slug: 'bellum',
    title: 'Bellum',
    subtitle: 'HOA Financial Management Platform',
    whatIs: `Bellum is a professional-grade platform built for HOA and condominium associations seeking to outsource their financial management, reporting, and back-office operations.

The platform serves as both a marketing site and a content-managed service hub, allowing boards and property managers to explore services, request proposals, and access detailed financial resources — all through a polished, animation-rich experience.

At its core sits a powerful admin panel that turns the entire website into a fully editable surface: every service page, blog post, hero image, FAQ, testimonial, pricing block, and proposal flow can be updated in real time from a secure dashboard, with changes committed straight to the repository — no database, no developer dependency, no downtime.

Features include a multi-variant service page system, a git-backed CMS with a full visual admin panel, a multi-step proposal flow, a blog engine, transactional email integration, and a Three.js-powered visual layer.`,
    problemSolved: `HOA boards are often overwhelmed by financial complexity — budgeting, collections, payables, homeowner communication — with limited tools to evaluate and onboard professional help. On top of that, the management firm itself usually has no easy way to keep its marketing site, service catalog, and proposal flow up to date without going back to a developer every time.

Bellum solves both sides: associations get a clear, segmented service catalog with multiple layout variants, allowing them to quickly understand offerings, compare services, and submit tailored proposals — all within a fast, SEO-optimized, and visually engaging experience. The Bellum team, in turn, gets a full administrative panel to manage every piece of content on the site — services, pricing, blog articles, FAQs, hero media, testimonials, and proposal templates — autonomously, with version control built in.`,
    techStack: [
      'Next.js',
      'React',
      'TypeScript',
      'SCSS',
      'GSAP',
      'Three.js',
      'React Three Fiber',
      'Resend',
      'Node.js',
      'GitHub Contents API',
      'Vitest',
      'ESLint',
      'Vercel'
    ],
    learnings: [
      'Built a full-featured administration panel that lets the Bellum team edit every section of the site (services, pricing, blog, FAQs, hero media, testimonials, proposal flow, navigation) through a polished visual dashboard — no SQL, no CLI, no developer in the loop.',
      'Designed and built a git-backed CMS architecture powering the admin panel: local filesystem in development, GitHub Contents API commits in production (Vercel), enabling content editing without a traditional database and giving every change a full audit trail via git history.',
      'Implemented a multi-variant service page system (Variant A, B, C) driven by JSON configuration, allowing flexible layouts per service without route duplication — variants are switched from the admin panel with a single click.',
      'Built a rich animation layer using GSAP (scroll-triggered parallax, staggered entrance timelines, scrub-based fade effects) across all major sections, designed to feel premium without sacrificing performance.',
      'Integrated Three.js with React Three Fiber for particle-based 3D scene backgrounds with dynamic loading and progressive enhancement.',
      'Implemented hardened contact and proposal API routes with origin allowlists, honeypot fields, minimum submit timing, HTML escaping, and in-memory rate limiting.',
      'Transactional email system via Resend for contact submissions and proposal notifications, with branded templates fully editable from the admin panel.',
      'Full SEO implementation: dynamic sitemap, robots.txt, Open Graph metadata, FAQ JSON-LD, and Organization structured data — automatically regenerated whenever content changes through the admin.',
      'Mobile-first SCSS architecture with modular component design, fluid responsive typography, smooth crossfade hero carousel, and a consistent design system using custom variables and mixins — flawless from 320px phones to ultra-wide desktops.'
    ],
    screenshots: [
      '/img/img/bellum-web/Screenshot from 2026-05-12 19-47-24.webp',
      '/img/img/bellum-web/Screenshot from 2026-05-12 19-47-28.webp',
      '/img/img/bellum-web/Screenshot from 2026-05-12 19-47-34.webp',
      '/img/img/bellum-web/Screenshot from 2026-05-12 19-47-39.webp',
      '/img/img/bellum-web/Screenshot from 2026-05-12 19-47-47.webp',
      '/img/img/bellum-web/Screenshot from 2026-05-12 19-47-56.webp',
      '/img/img/bellum-web/Screenshot from 2026-05-12 19-48-01.webp',
      '/img/img/bellum-web/Screenshot from 2026-05-12 19-48-24.webp',
      '/img/img/bellum-web/Screenshot from 2026-05-12 19-48-33.webp',
      '/img/img/bellum-web/Screenshot from 2026-05-12 19-49-08.webp',
      '/img/img/bellum-web/Screenshot from 2026-05-12 19-49-14.webp',
      '/img/img/bellum-web/Screenshot from 2026-05-12 19-49-22.webp',
      '/img/img/bellum-web/Screenshot from 2026-05-12 19-49-28.webp',
      '/img/img/bellum-web/Screenshot from 2026-05-12 19-49-39.webp',
      '/img/img/bellum-web/Screenshot from 2026-05-12 19-49-47.webp',
      '/img/img/bellum-web/Screenshot from 2026-05-12 19-49-58.webp',
      '/img/img/bellum-web/Screenshot from 2026-05-12 19-50-02.webp',
      '/img/img/bellum-web/Screenshot from 2026-05-12 19-50-07.webp',
      '/img/img/bellum-web/Screenshot from 2026-05-12 19-50-14.webp',
      '/img/img/bellum-web/Screenshot from 2026-05-12 19-50-20.webp',
      '/img/img/bellum-web/Screenshot from 2026-05-12 19-50-24.webp',
      '/img/img/bellum-web/Screenshot from 2026-05-12 19-50-29.webp',
      '/img/img/bellum-web/Screenshot from 2026-05-12 19-50-39.webp',
      '/img/img/bellum-web/Screenshot from 2026-05-12 19-50-44.webp',
      '/img/img/bellum-web/Screenshot from 2026-05-12 19-50-53.webp',
      '/img/img/bellum-web/Screenshot from 2026-05-12 19-51-02.webp',
      '/img/img/bellum-web/Screenshot from 2026-05-12 19-51-31.webp',
      '/img/img/bellum-web/Screenshot from 2026-05-12 19-51-39.webp',
      '/img/img/bellum-web/Screenshot from 2026-05-12 19-51-44.webp',
      '/img/img/bellum-web/Screenshot from 2026-05-12 19-51-49.webp',
    ],
    githubLink: null as any,
    liveDemoLink: 'https://bellumhoafinance.com/',
  },
  {
    slug: 'comply-dq',
    title: 'Comply DQ',
    subtitle: 'Fleet Compliance & Document Intelligence Platform',
    whatIs: `Comply DQ is an enterprise-grade platform tailored for motor carriers and compliance teams that need to onboard, verify, and continuously manage driver documentation (CDL, medical certs, policies, and more) at scale.

The product combines role-aware workspaces, company-scoped data, and subscription-aware billing so operators can move from spreadsheets and legacy tools to a single source of truth with audit-friendly workflows.

Developed in partnership with a Canadian engineering team, Comply DQ is one of the largest and most complex platforms I've contributed to — a true enterprise SaaS with deep multi-tenant architecture, hundreds of pages of operational tooling, and B2B compliance requirements as the core of every decision.`,
    problemSolved: `Transportation and compliance programs often juggle fragmented files, inconsistent access control, and manual renewals — which increases risk and slows audits.

Comply DQ addresses this by centralizing driver profiles, document lifecycles, and company administration in a secure, multi-tenant architecture with clear separation between customer organizations and platform-level oversight.

The platform was built side by side with a senior team based in Canada, combining their domain expertise in US/Canadian transportation compliance with hands-on engineering to ship a production-grade product trusted to handle real fleets and real regulatory pressure — not a prototype, not a single-developer side project.`,
    techStack: [
      'Next.js',
      'React',
      'TypeScript',
      'Redux Toolkit',
      'NestJS',
      'Prisma',
      'PostgreSQL',
      'Keycloak (OIDC)',
      'JWT',
      'Stripe',
      'AWS S3',
      'Ant Design',
      'MUI',
      'Radix UI',
      'REST APIs'
    ],
    learnings: [
      'Collaborated with a Canadian engineering team on one of the largest platforms in my portfolio — a real enterprise SaaS shipped to motor carriers and compliance teams operating across North America.',
      'Multi-tenant product model with tenant resolution, company types (e.g. D2C / MSP-style hierarchies), and role-based access for admins and operational users.',
      'End-to-end document workflows: document library, uploads, deduplication logic, and cloud-backed storage aligned with a modern API layer.',
      'Payments & monetization: Stripe integration for subscriptions and invoice-related flows, including webhook-driven server paths for reliable billing events.',
      'Auth at enterprise standards: Keycloak (OIDC) + credential flows, JWT access/refresh handling, and session hardening patterns suited to B2B SaaS.',
      'Data platform: PostgreSQL with Prisma for schema-safe access, plus controlled legacy migration tooling (CSV-driven pipelines, validation, and operational scripts) for real-world cutovers — not toy demos.',
      'Responsive, productized UI: Next.js App Router, Redux for complex client state, Ant Design / MUI / Radix-style component stacks, and layouts optimized for desktop dashboards + mobile-friendly operator tasks.',
      'Operational excellence: structured logging, tenant-aware API guards, and deployment-oriented configuration for staging/production parity.',
      'Pixel-perfect responsive design across the entire admin surface — looks impeccable from operator tablets on the road up to ultra-wide compliance dashboards.'
    ],
    screenshots: [
      '/img/img/cdq-web/cdq-01.webp',
      '/img/img/cdq-web/cdq-02.webp',
      '/img/img/cdq-web/cdq-03.webp',
      '/img/img/cdq-web/cdq-04.webp',
      '/img/img/cdq-web/cdq-05.webp',
      '/img/img/cdq-web/cdq-06.webp',
      '/img/img/cdq-web/cdq-07.webp',
      '/img/img/cdq-web/cdq-08.webp',
      '/img/img/cdq-web/cdq-09.webp',
      '/img/img/cdq-web/cdq-10.webp',
      '/img/img/cdq-web/cdq-11.webp',
      '/img/img/cdq-web/cdq-12.webp',
    ],
    githubLink: null as any,
    liveDemoLink: null as any,
  },
  {
    slug: 'grupo-el-triunfo',
    title: 'Grupo El Triunfo',
    subtitle: 'Corporate Agribusiness Platform',
    whatIs: `Grupo El Triunfo is a corporate website for an agribusiness holding company based in Oncativo, Córdoba, Argentina, with over 36 years of experience in the agricultural sector.

The platform showcases six integrated business units — Grain Storage, Logistics, Agronomy, Bonsmara Cattle, Shell Fuel, and Bar/Café — presenting their services, history, and brand identity in a modern, visually rich experience.

Features include a full-viewport video hero with GSAP entrance animations, dynamic service detail pages with photo galleries, a branded tab navigation system, an interactive contact form with embedded map, scroll-triggered reveal animations, and a fully responsive mobile-first design.`,
    problemSolved: `Grupo El Triunfo needed a digital presence that reflects the scale and professionalism of a multi-unit agribusiness group, while keeping the warmth and proximity of a family-founded company.

The website solves this by unifying six distinct business units under a cohesive visual identity, with dedicated sections for each service, a branded color system per unit, and a design language rooted in rural Argentina's aesthetic — professional yet approachable.`,
    techStack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'SCSS Modules',
      'GSAP',
      'ScrollTrigger',
      'Radix UI',
      'Lucide React',
      'Next.js App Router'
    ],
    learnings: [
      'Designed and implemented a scalable component architecture organized by domain (home, empresa, servicios, layout, UI primitives), with co-located SCSS modules per component.',
      'Built dynamic service detail pages using Next.js App Router with [slug] routing, featuring hero banners, photo galleries, extended content sections, and branded tab navigation.',
      'Developed a comprehensive design token system (colors, typography, spacing, shadows, breakpoints) in SCSS, with per-business-unit color theming via CSS custom properties.',
      'Full-viewport video hero with GSAP scroll-triggered animations, loading spinner fallback, and staggered entrance transitions.',
      'Created a reusable UI component library built on Radix UI primitives (Accordion, Dialog, Alert, Checkbox, Progress, etc.) with custom SCSS styling.',
      'Implemented a multi-section company page with history timeline, mission/vision, stats, gallery, and brand values.',
      'Pixel-perfect responsive mobile-first layout with custom breakpoints, fluid typography, and optimized image delivery via Next.js <Image> — looks impeccable on every device, from small phones to 4K monitors.',
      'Contact page with form, info cards, and Google Maps embed integration.'
    ],
    screenshots: [
      '/img/img/eltriunfo-web/eltriunfo-01.webp',
      '/img/img/eltriunfo-web/eltriunfo-02.webp',
      '/img/img/eltriunfo-web/eltriunfo-03.webp',
      '/img/img/eltriunfo-web/eltriunfo-04.webp',
      '/img/img/eltriunfo-web/eltriunfo-05.webp',
      '/img/img/eltriunfo-web/eltriunfo-06.webp',
      '/img/img/eltriunfo-web/eltriunfo-07.webp',
      '/img/img/eltriunfo-web/eltriunfo-08.webp',
      '/img/img/eltriunfo-web/eltriunfo-09.webp',
      '/img/img/eltriunfo-web/eltriunfo-10.webp',
      '/img/img/eltriunfo-web/eltriunfo-11.webp',
    ],
    githubLink: null as any,
    liveDemoLink: 'https://el-triunfo.vercel.app/',
  },
  {
    slug: 'home-trades-online',
    title: 'Home Trades Online',
    subtitle: 'Contractor Proposal Platform (SaaS)',
    whatIs: `Home Trades Online is a mobile-first SaaS platform that empowers contractors and tradespeople to generate AI-powered professional proposals in under 30 seconds. The platform bridges the gap between contractors working on job sites and the administrative work of creating, sending, and managing client proposals.

Features include AI-generated proposals with line items and pricing, public proposal sharing via unique links, digital signature capture, multi-tenant business management with role-based access control, magic link authentication for subcontractors, internationalization (English/Spanish), and a referral/invite system.`,
    problemSolved: `Contractors spend hours creating proposals manually, often losing jobs because they can't respond fast enough. Existing tools are desktop-oriented and complex, ignoring the reality that tradespeople work on dusty job sites, often one-handed, with spotty cellular connections.

Home Trades Online solves this by enabling contractors to describe a job in plain language and receive a complete, professional proposal with scope of work, itemized pricing, and terms — ready to send to the client in seconds.`,
    techStack: [
      'Django 5.2',
      'Django REST Framework',
      'PostgreSQL 15',
      'HTMX',
      'Alpine.js',
      'Tailwind CSS',
      'Docker',
      'Gunicorn',
      'Nginx',
      'Playwright',
      'GitHub Actions',
      'Google Cloud Platform'
    ],
    learnings: [
      'Designed and implemented a multi-tenant architecture with 6-layer defense-in-depth RBAC (BusinessScopedManager, middleware, decorators, service-level checks) ensuring strict data isolation between businesses.',
      'Built an AI proposal generation engine that converts natural language job descriptions into structured proposals with line items, pricing, scope of work, and terms.',
      'Developed a public proposal sharing system with unique token-based URLs, branded email delivery, client viewing tracking, and digital signature capture (signature_pad).',
      'Implemented a hybrid authentication system: session-based login for business owners, magic link (JWT) authentication for subcontractors, and shadow user profiles for invited collaborators.',
      'Full internationalization infrastructure with URL-prefix routing, country-aware currency formatting, and complete Argentine Spanish translation — enabling near-zero-effort expansion to 9+ countries.',
      'Pixel-perfect mobile-first UX engineered for outdoor and job-site conditions: 48px+ touch targets, high-contrast design, true one-handed operation, glove-friendly inputs, and streaming proposal generation with progressive skeleton loading — flawless from small phones to large tablets.',
      'Production deployment pipeline with Docker Compose, Gunicorn, Nginx reverse proxy, Let\'s Encrypt SSL, and GitHub Actions CI (unit tests + Playwright E2E).'
    ],
    screenshots: [
      '/img/img/HomePlatform-web/Screenshot from 2026-05-12 19-28-21.webp',
      '/img/img/HomePlatform-web/Screenshot from 2026-05-12 19-28-32.webp',
      '/img/img/HomePlatform-web/Screenshot from 2026-05-12 19-28-37.webp',
      '/img/img/HomePlatform-web/Screenshot from 2026-05-12 19-28-47.webp',
      '/img/img/HomePlatform-web/Screenshot from 2026-05-12 19-28-58.webp',
      '/img/img/HomePlatform-web/Screenshot from 2026-05-12 19-29-41.webp',
      '/img/img/HomePlatform-web/Screenshot from 2026-05-12 19-30-07.webp',
    ],
    githubLink: null as any,
    liveDemoLink: null as any,
  },
  {
    slug: 'salesforpro',
    title: 'Home Trades Online Landing',
    subtitle: 'Marketing Landing Page & Website',
    whatIs: `SalesForPro is the public-facing marketing website for Home Trades Online, designed to convert visiting contractors into users through an interactive product demo experience.

The site features a cinematic page intro animation, a multi-step interactive hero that lets visitors try the AI proposal generator before signing up, scroll-triggered content sections, and a fully bilingual experience (English/Spanish). Built as a server-rendered marketing site with rich client-side animations, dark mode support, and a mobile-first responsive design.`,
    problemSolved: `SaaS landing pages for contractor tools are typically static and generic, failing to communicate the product's value quickly. Contractors are skeptical and need to see the tool in action before committing.

SalesForPro solves this by embedding a live product demo directly into the hero section — visitors can select their trade, enter their location, and generate a real AI proposal without signing up, turning the landing page itself into a conversion tool.`,
    techStack: [
      'Django Templates',
      'Tailwind CSS',
      'GSAP',
      'ScrollTrigger',
      'Alpine.js',
      'CSS Animations',
      'SVG (inline, animated)',
      'Django i18n'
    ],
    learnings: [
      'Designed and built a cinematic page intro with layered circle-reveal animations using CSS @property for smooth radius transitions, creating a branded first impression.',
      'Developed a multi-step interactive hero card with animated gradient border (conic-gradient rotation), shimmer effects on step transitions, dot-pattern backgrounds, and progress bar with pulse glow.',
      'Implemented GSAP-powered scroll animations: word-by-word subtitle reveals, staggered left/right card entries with ScrollTrigger, and SVG path-draw connectors with traveling dot animations between "How It Works" steps.',
      'Built full dark mode support with a consistent color palette across all sections (hero, how-it-works, testimonials, CTA, footer), including adapted SVG connector colors and card shadows.',
      'Built a flawlessly responsive, mobile-first design that scales beautifully from 320px phones up to ultra-wide desktops: vertical connectors on small screens, horizontal wave SVG dividers between sections, sticky navbar with scroll-aware shadow, and 48px+ touch targets across every interactive element.',
      'Integrated Django i18n with {% trans %} tags across all marketing content for seamless English/Spanish switching via URL prefix routing (/ar/).',
      'Implemented accessibility best practices: prefers-reduced-motion media query disabling all animations, ARIA labels, semantic HTML, visible focus rings, and aria-live regions for loading states.',
      'CTA shimmer effect with CSS-only animated gradient sweep, wave dividers using inline SVG paths, and skeleton loading states with shimmer animation for the proposal generation preview.'
    ],
    screenshots: [
      '/img/img/HomeWeb-web/Screenshot from 2026-05-12 19-26-22.webp',
      '/img/img/HomeWeb-web/Screenshot from 2026-05-12 19-27-20.webp',
      '/img/img/HomeWeb-web/Screenshot from 2026-05-12 19-27-34.webp',
      '/img/img/HomeWeb-web/Screenshot from 2026-05-12 19-27-41.webp',
    ],
    githubLink: null as any,
    liveDemoLink: null as any,
  },
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
      'JWT'
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
    liveDemoLink: 'https://www.starton.it.com/',
  },
  {
    slug: 'mi-agenda',
    title: 'Mi Agenda',
    subtitle: 'Online Booking & Appointments Platform',
    whatIs: `Turnero (Mi Agenda) is a platform that lets service providers manage their schedule and lets clients book appointments online. It includes a public booking flow by service, Google Calendar integration to avoid conflicts, payments with MercadoPago (one-time and subscriptions), notifications (email, push, and optionally SMS/WhatsApp), and an installable PWA ("Mi agenda") with reminders and offline access.

The solution centralizes recurring and one-off availability, payments, reminders, and admin panel in a single product, improving the experience for both the provider and the client.`,
    problemSolved: `Many professionals and businesses still rely on messages, calls, or spreadsheets to manage appointments, leading to errors, no-shows, and lack of traceability. Turnero addresses this by offering self-service web booking, clear availability, calendar integration, online payments, and automatic notifications, reducing operational load and lost bookings.`,
    techStack: [
      'Next.js',
      'React',
      'TypeScript',
      'Redux Toolkit',
      'SCSS',
      'Tailwind CSS',
      'MUI',
      'React Hook Form',
      'Framer Motion',
      'Recharts',
      'Socket.io-client',
      'NestJS',
      'Node.js',
      'Prisma',
      'MySQL',
      'Redis',
      'JWT',
      'Swagger',
      'MercadoPago',
      'Google Calendar API',
      'Nodemailer',
      'Twilio (SMS/WhatsApp)',
      'Docker'
    ],
    learnings: [
      'Public booking flow by service slug: day and time selection, client details, confirmation with optional MercadoPago payment.',
      'Admin panel for providers: services, recurring and specific availability, booking management, clients, statistics, profile, templates, subscription and payments.',
      'Client portal: registration, profile and list of bookings with states (pending, confirmed, cancelled, completed, no-show).',
      'REST API with NestJS: JWT auth (access + refresh, httpOnly cookies), users, bookings, availability, services, dashboard, clients, statistics, payments, webhooks and Swagger documentation.',
      'MercadoPago payment integration: preferences, webhooks, deposits and full payments, and subscription support.',
      'Google Calendar sync to mark busy blocks and prevent booking overlap.',
      'Real-time updates via WebSockets (Socket.io with Redis adapter) for bookings and notifications.',
      'PWA "Mi agenda": installable, offline page, push notifications and app shortcuts.'
    ],
    screenshots: [
      '/img/img/Miagenda/A.webp',
      '/img/img/Miagenda/Screenshot from 2026-03-04 14-39-03.webp',
      '/img/img/Miagenda/Screenshot from 2026-03-04 14-39-09.webp',
      '/img/img/Miagenda/Screenshot from 2026-03-04 14-39-14.webp',
      '/img/img/Miagenda/Screenshot from 2026-03-04 14-39-21.webp',
      '/img/img/Miagenda/Screenshot from 2026-03-04 14-39-27.webp',
      '/img/img/Miagenda/Screenshot from 2026-03-04 14-39-44.webp',
      '/img/img/Miagenda/Screenshot from 2026-03-04 14-39-49.webp',
      '/img/img/Miagenda/Screenshot from 2026-03-04 14-40-00.webp',
      '/img/img/Miagenda/Screenshot from 2026-03-04 14-40-10.webp',
      '/img/img/Miagenda/Screenshot from 2026-03-04 14-40-16.webp',
      '/img/img/Miagenda/Screenshot from 2026-03-04 14-40-23.webp',
    ],
    githubLink: null as any,
    liveDemoLink: 'https://miagenda.site/',
  },
  {
    slug: 'augusto-fit-program',
    title: 'Augusto Fit Program',
    subtitle: 'Personal Trainer Corporate Website',
    whatIs: `Corporate website for a personal trainer offering custom training plans, transformation stories, and direct contact. The platform showcases services, testimonials with an infinite carousel on mobile, habits and statistics section, training plans, and a contact form integrated with EmailJS. Dark design with GSAP animations, next/font typography and mobile-first responsive experience.

The architecture is ready to be scaled into a shop (e.g. plans purchase, members area) if the client decides to grow the product.`,
    problemSolved: `A personal trainer needed a professional web presence that conveyed trust, showed real results (testimonials and transformation photos), and made it easy for potential clients to get in touch or learn about plans, without relying only on social media.

Augusto Fit Program addresses this with a clear landing, value sections (habits, statistics), testimonials in a continuous carousel that on mobile keeps content visible in two rows with opposite directions, and CTAs to plans and contact (including a floating WhatsApp button).`,
    techStack: [
      'Next.js',
      'React',
      'TypeScript',
      'SCSS Modules',
      'GSAP',
      'next/font (Google Fonts)',
      'EmailJS',
      'Vercel'
    ],
    learnings: [
      'Full design and development with Next.js (App Router), TypeScript and SCSS Modules.',
      'Hero with video/background image, GSAP-animated title and CTAs to plans and about.',
      'Testimonials and transformation photos section with infinite carousel; on mobile, two rows with opposite-direction animations to avoid blank screens.',
      'Habits, Statistics and Plans sections with responsive layout and consistent styling.',
      'Font integration with next/font/google (Plus Jakarta Sans, Merriweather) for optimized production loading.',
      'Contact form with EmailJS and floating WhatsApp button.',
      'Viewport and meta configured for consistency between development and production on mobile.',
      'Deployment on Vercel with a single project connected to the repository.',
      'Architecture ready to scale into a shop (plans purchase, members area) if the client grows the product.'
    ],
    screenshots: [
      '/img/img/Augusto/A.webp',
      '/img/img/Augusto/Screenshot from 2026-03-04 14-34-50.webp',
      '/img/img/Augusto/Screenshot from 2026-03-04 14-34-58.webp',
      '/img/img/Augusto/Screenshot from 2026-03-04 14-35-05.webp',
      '/img/img/Augusto/Screenshot from 2026-03-04 14-35-11.webp',
      '/img/img/Augusto/Screenshot from 2026-03-04 14-35-19.webp',
      '/img/img/Augusto/Screenshot from 2026-03-04 14-35-48.webp',
      '/img/img/Augusto/Screenshot from 2026-03-04 14-35-57.webp',
      '/img/img/Augusto/Screenshot from 2026-03-04 14-36-03.webp',
    ],
    videoUrl: '/img/img/Augusto/Augusto.mp4',
    githubLink: null as any,
    liveDemoLink: 'https://www.augustoluque.com/',
  },
  {
    slug: 'tecnomar',
    title: 'TecnoMar',
    subtitle: 'Industrial Pumps Corporate Website',
    whatIs: `Corporate website for TecnoMar, a company specializing in diagnosis, repair, and reconditioning of sanitary and industrial pumps. The site showcases services, work methodology and technical process, and brings clients and companies closer through clear CTAs (online quote form and contact). It includes sections for approach, clients with logo marquee, and contact map, with responsive design aligned to brand identity.`,
    problemSolved: `The industrial sector needs sites that convey technical solidity and allow direct quotation or contact requests. TecnoMar needed a clear digital presence: explain services and process, showcase experience (+20 years, +50 active clients, +2000 products), and offer a quote form and contact channels without friction.`,
    techStack: [
      'Next.js',
      'React',
      'TypeScript',
      'SCSS (modules)',
      'CSS variables (theme, spacing, typography)',
      'Next/Image (optimization and priority for hero and clients)',
    ],
    learnings: [
      'Landing with full-screen hero, overlay, and brand-accent typography ("corazón técnico", TECNOMAR).',
      'Sections: Services, Our Approach (cards with background image and overlay), Methodology / Technical Process (steps with images), Why Choose Us (animated metrics), Quote, Contact (copyable cards + map), and Clients (double-row marquee on mobile).',
      'Global design variables (section padding, shadows, radius, brand colors) and reusable components (primaryLight / primaryBlue buttons, clip-path divider between sections).',
      'Online quote form on dedicated route and links to Contact; differentiated CTAs (quote vs contact) in Approach and Process.',
      'Mobile-first design: animated hamburger (lines → X), aligned contact cards, client logos with desktop/mobile sizes and priority load for first row.',
      'Loading overlay with fixed logo and spinner; map integration in contact section.',
    ],
    screenshots: [
      '/img/img/Tecnomar/A.webp',
      '/img/img/Tecnomar/Screenshot from 2026-03-13 17-52-30.webp',
      '/img/img/Tecnomar/Screenshot from 2026-03-13 17-52-47.webp',
      '/img/img/Tecnomar/Screenshot from 2026-03-13 17-52-51.webp',
      '/img/img/Tecnomar/Screenshot from 2026-03-13 17-53-00.webp',
      '/img/img/Tecnomar/Screenshot from 2026-03-13 17-53-12.webp',
      '/img/img/Tecnomar/Screenshot from 2026-03-13 17-53-20.webp',
      '/img/img/Tecnomar/Screenshot from 2026-03-13 17-53-27.webp',
      '/img/img/Tecnomar/Screenshot from 2026-03-13 17-53-34.webp',
      '/img/img/Tecnomar/Screenshot from 2026-03-13 17-53-41.webp',
      '/img/img/Tecnomar/Screenshot from 2026-03-13 17-53-50.webp',
      '/img/img/Tecnomar/Screenshot from 2026-03-13 17-54-02.webp',
      '/img/img/Tecnomar/Screenshot from 2026-03-13 17-54-09.webp',
      '/img/img/Tecnomar/Screenshot from 2026-03-13 17-54-43.webp',
      '/img/img/Tecnomar/Screenshot from 2026-03-13 17-54-54.webp',
      '/img/img/Tecnomar/Screenshot from 2026-03-13 17-55-01.webp',
      '/img/img/Tecnomar/Screenshot from 2026-03-13 17-55-08.webp',
    ],
    videoUrl: '/img/img/Tecnomar/TecnoMar.mp4',
    githubLink: null as any,
    liveDemoLink: null as any,
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
    videoUrl: '/atevo/Ecommerce.mp4',
    githubLink: null as any,
    liveDemoLink: null as any,
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
    liveDemoLink: null as any,
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
    videoUrl: '/img/img/Event/EventScheduler.mp4',
    githubLink: null as any,
    liveDemoLink: null as any,
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
  },
  {
    slug: 'trip-planner',
    title: 'Trip Planner',
    subtitle: 'Simple Trip Planning App',
    whatIs: `Small Next.js app for planning trips. Bootstrapped with create-next-app, uses Geist font and a minimal UI. Deployed on Vercel.`,
    problemSolved: `Quick side project to try Next.js App Router and keep the scope small—focused on a simple trip-planning flow.`,
    techStack: ['Next.js', 'JavaScript', 'CSS'],
    learnings: [
      'Next.js App Router and create-next-app setup.',
      'Deployed on Vercel (trip-planner-c.vercel.app).',
    ],
    screenshots: ['/img/img/Trip/trip.webp'],
    githubLink: 'https://github.com/Fransei29/trip-planner-c',
    liveDemoLink: 'https://trip-planner-c.vercel.app/',
  },
];