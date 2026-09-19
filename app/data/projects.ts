// src/data/projects.ts
import type { CaseStudyDeepDive, CaseStudyOutcome, CaseStudyTestimonial } from './caseStudy';

/**
 * Forma de una entrada. Se declara explícitamente para que los campos de case
 * study existan en el tipo aunque todavía no se hayan cargado en cada proyecto;
 * si no, TypeScript infiere el tipo del literal y solo conoce las claves que ya
 * aparecen en algún objeto.
 */
export interface Project {
  slug: string;
  title: string;
  subtitle?: string;
  whatIs?: string;
  problemSolved?: string;
  techStack?: string[];
  learnings?: string[];
  screenshots?: string[];
  videoUrl?: string;
  githubLink?: string | null;
  liveDemoLink?: string | null;
  // Case study — ver CASE_STUDIES.md
  role?: string;
  engagement?: string;
  duration?: string;
  client?: string;
  industry?: string;
  year?: string;
  /** Dónde opera el proyecto. Ej: 'Argentina'. Chip con pin en el header. */
  location?: string;
  locationFlag?: string;
  /** Varios lugares, cada uno con su bandera. Un chip por entrada. */
  locations?: { flag?: string; label: string }[];
  outcomes?: CaseStudyOutcome[];
  testimonial?: CaseStudyTestimonial;
  // Profundidad técnica. Cada uno es opcional y se renderiza como sección
  // propia del case study, con entrada en el índice de navegación.
  architecture?: CaseStudyDeepDive;
  payments?: CaseStudyDeepDive;
  infra?: CaseStudyDeepDive;
  deliverables?: CaseStudyDeepDive;
}

export const projects: Project[] = [
  {
    slug: 'acer0',
    role: 'Full-stack Engineer',
    engagement: 'Client Project',
    industry: 'Manufacturing\nE-commerce',
    location: 'Buenos Aires, Argentina',
    locationFlag: '🇦🇷',
    title: 'Acer0',
    subtitle: 'Custom E-Commerce Platform',
    whatIs: `a.cer0 is a fully custom e-commerce platform designed and built from scratch for a manufacturing and retail company. It combines a high-performance storefront with a complete back-office system, letting the business manage products, orders, payments, customers, and day-to-day operations from a single platform.

The solution includes a responsive shopping experience, advanced product search and filtering, customer accounts, order tracking, Mercado Pago and bank transfer payments, promotional coupons, sales analytics, and a custom administration panel tailored to the client's workflow.`,
    problemSolved: `Off-the-shelf platforms couldn't provide the flexibility the business required. The client needed complete ownership of the platform, seamless integration with Argentine payment methods, custom operational workflows, and a user experience aligned with their brand.

The solution was to architect a fully custom platform, giving the client complete control over payments, infrastructure, branding, and future scalability.`,
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
    architecture: {
      body: `The platform is structured as a full-stack monorepo. A Next.js storefront handles presentation, an Express API owns all write operations, and a Backend-for-Frontend layer mediates between them, keeping payment credentials and administrative endpoints server-side.`,
      groups: [
        {
          title: 'Application Architecture',
          bullets: [
            'Full-stack monorepo built with Next.js 15 (App Router), Express, and PostgreSQL.',
            'Backend-for-Frontend layer separating public storefront APIs from private administrative operations.',
            'End-to-end type safety through TypeScript and Prisma ORM, surfacing schema changes at compile time.',
            'Docker-based development and production environments for consistent behaviour across stages.',
          ],
        },
        {
          title: 'Platform Features',
          bullets: [
            'Product catalog with categories, advanced filtering, reviews, and wishlists.',
            'Customer accounts covering authentication, order history, profile management, and password recovery via transactional email.',
            'Administrative dashboard for products, orders, coupons, review moderation, and sales analytics.',
            'Responsive mobile-first interface supporting viewports from 480px through ultra-wide desktops.',
          ],
        },
        {
          title: 'Security',
          body: 'Public surfaces are validated and rate-limited, with immediate credential revocation available to administrators.',
          chips: [
            'JWT + token versioning',
            'Google OAuth 2.0',
            'Role-based access control',
            'Helmet',
            'Rate limiting',
            'Zod validation',
            'reCAPTCHA',
          ],
        },
      ],
    },
    payments: {
      body: `Argentine e-commerce requires support for both Mercado Pago and bank transfers. Each method follows its own confirmation path, and both converge on a single order lifecycle to keep fulfillment and reconciliation consistent.`,
      groups: [
        {
          title: 'Payment Architecture',
          body: 'Order state is determined server-side through webhook notifications, independent of the browser session.',
          bullets: [
            'Mercado Pago notifications are re-verified against the payment API before any order mutation.',
            'Webhook processing is idempotent, ensuring duplicate notifications resolve to a single confirmation.',
            'Payment preferences are created server-side, with amounts and line items computed on the backend.',
          ],
        },
        {
          title: 'Checkout Flow',
          bullets: [
            'Mercado Pago Checkout Pro handles card and wallet transactions.',
            'Bank transfer flow supports proof-of-payment upload with administrative confirmation or rejection.',
            'Both methods resolve into the same order lifecycle, keeping fulfillment logic unified.',
            'Coupons are validated at preference creation and re-validated at confirmation to prevent expired or redeemed codes from applying.',
          ],
        },
        {
          title: 'Order Lifecycle',
          body: 'Orders progress through an explicit state machine with server-side transition guards.',
          bullets: [
            'States: pending, paid, fulfilled, cancelled, and refunded.',
            'The administrative panel can trigger only the transitions permitted by the state machine.',
            'Line items capture product name and price at purchase time, preserving historical order accuracy through catalog changes.',
          ],
        },
        {
          title: 'Validation & Testing',
          bullets: [
            'End-to-end testing in the Mercado Pago sandbox using dedicated test buyer and seller accounts.',
            'Coverage across approved, rejected, and pending payment outcomes.',
            'Final verification against live credentials prior to launch.',
          ],
        },
      ],
    },
    infra: {
      body: `The client retains full ownership of the stack and its hosting. Deployment was therefore designed for reproducibility, allowing the platform to be provisioned from a clean VPS through documented, automated steps.`,
      groups: [
        {
          title: 'Deployment',
          bullets: [
            'Full stack containerized with Docker Compose, covering PostgreSQL 17, the Express backend, and the Next.js frontend.',
            'PM2 cluster mode provides zero-downtime reloads and automatic recovery on process failure.',
            'Automated VPS deployment reduces releases to a single command.',
          ],
          chips: ['Docker Compose', 'PM2 cluster mode', 'VPS', 'Zero-downtime releases'],
        },
        {
          title: 'Database',
          body: 'Data integrity is enforced at the database layer through constraints and referential rules.',
          bullets: [
            'PostgreSQL schema modelled in Prisma across products, variants, categories, orders, order items, coupons, reviews, and users.',
            'Foreign keys and constraints enforced by the database engine.',
            'Migrations tracked in version control, making every schema change reviewable and reproducible.',
            'Seed scripts enable staging environments that mirror production structure.',
          ],
        },
        {
          title: 'Operational Security',
          bullets: [
            'API keys and payment credentials remain server-side behind the BFF proxy.',
            'Rate limiting applied to authentication and checkout routes.',
            'Token versioning allows immediate revocation of all issued tokens for a given user.',
          ],
        },
      ],
    },
    deliverables: {
      body: `The engagement delivered a platform under full client ownership, deployed to infrastructure they control and free of recurring licensing.`,
      groups: [
        {
          title: 'Delivered',
          bullets: [
            'Public storefront with catalog, search, filtering, cart, and checkout.',
            'Customer area covering accounts, order tracking, wishlists, and profile management.',
            'Administrative panel for products, orders, coupons, reviews, and sales analytics.',
            'Production deployment on client-owned infrastructure with a reproducible Docker configuration.',
          ],
        },
        {
          title: 'Handover',
          bullets: [
            'Complete source ownership with no licensing or per-seat platform fees.',
            'Documented deployment procedure enabling future teams to provision the stack independently.',
            'Seed and migration scripts for staging environments matching production structure.',
          ],
        },
      ],
    },
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
    role: 'Full-stack · Custom CMS',
    engagement: 'Client work',
    industry: 'HOA management',
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
    role: 'Full-stack Engineer',
    engagement: 'Team Collaboration',
    industry: 'Transportation • Compliance SaaS',
    locations: [
      { flag: '🇨🇦', label: 'Ontario, Canada' },
      { flag: '🇺🇸', label: 'United States' },
    ],
    title: 'Comply DQ',
    subtitle: 'Fleet Compliance & Document Intelligence Platform',
    whatIs: `Comply DQ is an enterprise-grade platform tailored for motor carriers and compliance teams that need to onboard, verify, and continuously manage driver documentation (CDL, medical certs, policies, and more) at scale.

The product combines role-aware workspaces, company-scoped data, and subscription-aware billing so operators can move from spreadsheets and legacy tools to a single source of truth with audit-friendly workflows.

Developed in partnership with a Canadian engineering team, Comply DQ represents one of the largest platforms in this portfolio: an enterprise SaaS built on multi-tenant architecture, with extensive operational tooling and B2B compliance requirements shaping every architectural decision.`,
    problemSolved: `Transportation and compliance programs often juggle fragmented files, inconsistent access control, and manual renewals — which increases risk and slows audits.

Comply DQ addresses this by centralizing driver profiles, document lifecycles, and company administration in a secure, multi-tenant architecture with clear separation between customer organizations and platform-level oversight.

The platform was developed alongside a senior team based in Canada, combining their domain expertise in US and Canadian transportation compliance with hands-on engineering to deliver a production system serving active fleet operations.`,
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
      'Data platform: PostgreSQL with Prisma for schema-safe access, plus controlled legacy migration tooling (CSV-driven pipelines, validation, and operational scripts) supporting production cutovers.',
      'Responsive, productized UI: Next.js App Router, Redux for complex client state, Ant Design / MUI / Radix-style component stacks, and layouts optimized for desktop dashboards + mobile-friendly operator tasks.',
      'Operational excellence: structured logging, tenant-aware API guards, and deployment-oriented configuration for staging/production parity.',
      'Pixel-perfect responsive design across the entire admin surface — looks impeccable from operator tablets on the road up to ultra-wide compliance dashboards.'
    ],
    architecture: {
      body: `Comply DQ enforces multi-tenancy at the data layer. Every query is scoped to a tenant and every API route validates that scope server-side, maintaining strict separation between customer organizations.`,
      groups: [
        {
          title: 'Application Architecture',
          bullets: [
            'Next.js App Router frontend with Redux Toolkit managing operational client state.',
            'NestJS backend with Prisma over PostgreSQL, typed end to end.',
            'Multi-tenant model with tenant resolution and company-type hierarchies covering direct and managed-service structures.',
            'Role-based access separating platform-level oversight from customer-organization administrators and operators.',
          ],
        },
        {
          title: 'Platform Features',
          bullets: [
            'Driver onboarding and verification workflows for CDL, medical certificates, and policy documentation.',
            'Document library with upload handling, deduplication, and S3-backed storage.',
            'Expiry tracking and renewal workflows supporting regulatory compliance requirements.',
            'Operator dashboards optimized for desktop compliance review and tablet use in the field.',
          ],
        },
        {
          title: 'Authentication',
          body: 'Identity management follows enterprise standards to meet the requirements of B2B procurement and IT review.',
          chips: [
            'Keycloak (OIDC)',
            'JWT access/refresh',
            'Session hardening',
            'Tenant-aware API guards',
            'RBAC',
          ],
        },
      ],
    },
    payments: {
      body: `Subscription billing operates at the organization level, where plan changes occur mid-cycle and entitlement must remain synchronized with billing state across the platform.`,
      groups: [
        {
          title: 'Billing Architecture',
          body: 'Stripe serves as the authoritative source for subscription state, with platform entitlement derived from it.',
          bullets: [
            'Stripe subscriptions scoped per tenant, aligning billing boundaries with data boundaries.',
            'Webhook-driven lifecycle handling across creation, updates, successful payments, failed payments, and cancellation.',
            'Plan state enforced at the API guard level, applying entitlement changes server-side.',
          ],
        },
        {
          title: 'Operator Experience',
          bullets: [
            'Invoice and subscription status surfaced within the compliance workspace.',
            'Failed-payment states presented explicitly to support timely resolution.',
          ],
        },
        {
          title: 'Validation & Testing',
          bullets: [
            'Automated coverage focused on document lifecycle transitions, expiry calculations, and tenant isolation guards.',
            'Explicit testing of cross-tenant access boundaries.',
            'TypeScript with Prisma-generated types, surfacing schema changes at compile time across API and client.',
          ],
        },
      ],
    },
    infra: {
      body: `The platform replaced spreadsheets and legacy systems carriers had operated for years, making data migration a primary delivery requirement alongside the application itself.`,
      groups: [
        {
          title: 'Data Migration',
          bullets: [
            'CSV-driven pipelines transferring production customer records from legacy systems.',
            'Validation passes preceding load, surfacing malformed records for reconciliation.',
            'Operational scripts supporting repeatable cutovers with dry-run capability against staging.',
          ],
        },
        {
          title: 'Database',
          bullets: [
            'PostgreSQL with Prisma providing schema-safe access across a large operational surface.',
            'Migrations tracked in version control to keep schema evolution reviewable.',
            'Tenant scoping enforced in the data layer, maintaining isolation and audit traceability.',
          ],
        },
        {
          title: 'Operations',
          bullets: [
            'Structured logging across API layers supporting reproducible diagnostics against production data.',
            'Tenant-aware API guards enforced server-side on all routes.',
            'Deployment configuration maintaining parity between staging and production environments.',
          ],
          chips: ['AWS S3', 'Keycloak', 'Structured logging', 'Staging parity'],
        },
      ],
    },
    deliverables: {
      body: `Delivered as part of a senior engineering team serving motor carriers across North America, on a platform operating under active regulatory requirements.`,
      groups: [
        {
          title: 'Delivered',
          bullets: [
            'Driver onboarding and document verification workflows in production use.',
            'Multi-tenant administrative surface for carriers, including platform-level oversight tooling.',
            'Stripe-backed subscription billing integrated with feature entitlement.',
            'Legacy data migrations executed against production customer records.',
          ],
        },
        {
          title: 'Engagement Model',
          bullets: [
            'Collaborative development alongside a Canadian engineering team, combining transportation-compliance domain expertise with implementation.',
            'Code review and staged releases across staging and production environments.',
          ],
        },
      ],
    },
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
    slug: 'globaly',
    role: 'Full-stack Engineer',
    engagement: 'Team Collaboration',
    industry: 'Immersive Collaboration • Virtual Workspace SaaS',
    locations: [
      { flag: '🇨🇦', label: 'Ontario, Canada' },
      { flag: '🌍', label: 'International (EN / FR / ES)' },
    ],
    title: 'Globaly',
    subtitle: 'Multilingual Marketing & Content Site for an Immersive Collaboration Platform',
    whatIs: `Globaly is the public site for an immersive collaboration platform — digital spaces where distributed teams work, train and present together without being in the same place. The site is not the product: the product lives on separate domains. This is the commercial, editorial and discovery layer around it, explaining the proposition, segmenting by use case and company size, publishing pricing, sustaining a resource centre and capturing leads.

A visitor navigates 33 pages organized into a client-defined information architecture: the platform and its device compatibility, seven solution pages grouped into three families, three pages by company segment, an enterprise hub with trust centre and data residency, a five-plan pricing table rendered in USD or EUR depending on the visitor's country, four comparison pages against the incumbent categories, and a blog with search, category filtering and pagination fed from a shared headless CMS. Two forms — contact and newsletter — validate with Zod on the server and dispatch through Postmark, with confirmation to the sender and an internal notification. All content is translated into English, French and Spanish, with language negotiated by cookie rather than by URL prefix.

The collaboration is documented inside the code itself: comments systematically cite the client's strategy documents by section as justification for information-architecture and product decisions, and the repository includes a three-document SEO·AEO·GEO system with explicit anti-hallucination rules. Several sections are deliberately commented out rather than deleted, at the client's request: the pages still route and build, and reactivating one is uncommenting a line.`,
    problemSolved: `An immersive collaboration product competes against categories the buyer already knows and against an implicit objection: "I already have video calls." The real problem was not having a site, but having one that could sustain a positioning thesis page by page, in several languages, for several segments, and that would also be discoverable — not only by search engines, but by the answer engines that now mediate part of B2B research. On top of that: prices published in a single currency and hardcoded per language, showing dollars with a decimal point to a European reader and requiring eighteen strings to be edited to change one number.

The system resolves that with concrete decisions. Price is authored once in USD and converted and formatted at render time, so the SoftwareApplication JSON-LD and the visible table read the same constant and cannot drift apart. Currency is decided by a country resolved in middleware from any of four possible geo headers, normalized into an internal header that is deleted before being written so a client cannot spoof its own country. The i18n layer serves all three languages from the same URL with a deep merge over the English catalogue, so a page not yet translated falls back to readable English instead of printing a translation key path. And discovery is treated as engineering: the robots layer explicitly names seven crawlers including the major AI search agents, the sitemap stamps the real content-change date rather than the build date, and the structured-data layer emits Organization, WebSite, Article, BreadcrumbList, FAQPage and SoftwareApplication with offers.

It was built custom rather than on a site builder because half the value sits in things those tools do not provide: geo-sensitive pricing resolved server-side, a 1,689-key i18n catalogue with hierarchical fallback, JSON-LD derived from the same constants as the UI, security headers reasoned one by one, and a deploy pipeline on the studio's own infrastructure.`,
    techStack: [
      'TypeScript 5.9',
      'Next.js 16',
      'React 19',
      'Tailwind CSS v4',
      'next-intl 4',
      'Strapi',
      'Axios',
      'Zod 4',
      'Postmark',
      'lucide-react',
      'next/font',
      'Google Analytics 4',
      'Docker',
      'Bitbucket Pipelines',
      'Cloudflare',
      'ESLint 9',
    ],
    learnings: [
      'Build-time versus runtime in Docker and Next.js: public environment variables are inlined into the bundle during the build, but the compose env file only reaches an already-running container. The real symptom was staging loading the production chat widget despite a correct env file. The fix was declaring build args in the Dockerfile, passing them through compose, and sourcing the env file in the shell before invoking the build — with the failure documented in comments across all three files.',
      'Internationalization without a URL prefix, with hierarchical fallback: serving three languages from the same URL and negotiating by cookie forced three chained decisions — neutralizing the Accept-Language header in middleware only when no cookie exists, deep-merging each locale over the master English catalogue so untranslated pages never print a key path, and emitting the document language attribute from the resolved locale because the URL no longer indicates it. Real coverage: 1,689 keys in English, 1,012 in French and Spanish.',
      'Geolocated pricing with a single source of truth: one USD price object feeds both the rendered table and the JSON-LD offers simultaneously, eliminating drift between what the user sees and what the crawler reads. The EUR rate is fixed and hand-set on purpose — a live feed would make a published price change between two page loads.',
      'Trust in geo headers treated as an attack surface: the middleware deletes the internal country header before writing it, because a client can send that header by hand and without the delete the spoofed value would reach the pricing table intact. It reads four provider headers in order of trust, validates the two-letter format, and falls back to USD when none is present.',
      'CMS resilience as a product requirement: the client has a 3-second timeout so it fails fast rather than hanging, discards placeholder tokens by pattern before sending them, and retries once without the authorization header on a 401 or 403 — because blog reads are public and an expired token should not empty the resources page. The retry is guarded against loops.',
      'SEO for answer engines, not only search engines: the robots layer explicitly allowlists the major AI search crawlers as a documented per-bot decision, with the note that robots.txt is only one of four checkpoints — the CDN, WAF, anti-bot layer and real HTTP response all have to agree. The sitemap stamps the real content-change date so the crawler is not told the entire site changes every day.',
      'A measured performance budget rather than a guessed one: the LCP element is server-rendered in the HTML, preloaded at high priority, served in WebP at 5.7 KB against 17 KB as PNG. The chat widget moved to lazy loading after real-user monitoring measured 1784 ms of INP on the hero CTA — a plain anchor that was not responding because the main thread was busy hydrating. Package-import optimization removed roughly 28 KB of unused icon JavaScript.',
      'A content security policy with its concessions written down: the site moved from a C grade to a full header set, and inline scripts are accepted with an explicit justification — the pre-paint theme script, the overlay critical CSS, the analytics config and the framework hydration payload — documenting that per-request nonces would force dynamic rendering on every page.',
      'Theme flash eliminated before first paint: an inline head script reads storage and applies the dark class to the document element before React mounts. System preference is deliberately not honoured — the default is always light, and only an explicit user choice moves the theme.',
      'Feature-parking as a delivery pattern: parked sections and competitor entries are commented with the reason and the reactivation criterion in the same comment, so the pages keep routing and building. A per-comparison verification date records when the facts were checked against the competitor’s own documentation, with the rule that it is bumped on re-verification rather than on edit.',
    ],
    architecture: {
      body: `A Next.js 16 App Router application rendered entirely on the server, with no database of its own. The central decision was to keep structural content in the repository — in typed i18n catalogues and TypeScript constants — and reserve the headless CMS strictly for high-cadence editorial content. That lets 33 pages be composed from a handful of section components parameterized by translation namespace, and lets navigation, pricing, the comparison matrix and the JSON-LD all derive from a single source in code, versioned and reviewable in a pull request.`,
      groups: [
        {
          title: 'Application Architecture',
          bullets: [
            'Next.js 16 App Router with React Server Components; client components are limited to concrete interaction — menus, theme toggle, forms and scroll observers.',
            'A locale segment with middleware resolving language by cookie, with no prefix in the URL.',
            'Section pages built as reusable components parameterized by namespace, so a new solution page is a roughly 20-line file plus a translation block.',
            'Dynamic routes with static params for the comparison pages; article detail renders dynamically because it depends on the live CMS.',
            'Roughly 13,200 lines of TypeScript across 53 components and 33 pages.',
          ],
        },
        {
          title: 'Platform Features',
          bullets: [
            'Five pricing plans with currency resolved by geolocation on the server and formatted per locale.',
            'Blog with search, category filtering, pagination and incremental loading, served through an internal API proxy over the CMS.',
            'Four comparison pages generated from a typed catalogue carrying a fact-verification stamp.',
            'Contact and newsletter forms validated with Zod and dispatched through Postmark with a double send — confirmation to the user plus internal notification.',
            'Flash-free light and dark theming, a choreographed server-rendered intro overlay, a route progress indicator, and reduced-motion support honoured across 19 distinct style blocks.',
          ],
        },
        {
          title: 'Data Model',
          bullets: [
            'No database of its own — the data model is the contract with the CMS, typed in a dedicated module.',
            'A raw CMS article shape carrying author, category, tags, SEO fields, localizations and scheduling, mapped by an explicit function into an app-level post type.',
            'Multi-tenancy on the CMS side: the instance is shared across studio projects and every query filters by project slug. The site is a tenant, not the owner of the CMS.',
            'Environment separation: published articles are read in production and drafts outside it, derived from the environment flag.',
          ],
        },
        {
          title: 'Authentication',
          body: 'The site does not authenticate users: login is an outbound link to the product domain, and the primary call to action opens a demo room with no signup form in front of it. The only credential in the system is the CMS service token, and it is optional by design.',
          chips: [
            'No own auth',
            'External login',
            'Signup-free demo',
            'Optional CMS token',
            'No sessions',
            'No roles',
          ],
        },
      ],
    },
    infra: {
      body: `Deployed to the studio's own VPS over SSH behind Cloudflare rather than to a managed platform — a choice that conditions real code, since the middleware reads four possible geo headers precisely because it cannot assume a single provider's.`,
      groups: [
        {
          title: 'Containers & Build',
          bullets: [
            'Multi-stage Dockerfile on node:21-alpine with development and production targets, selected from the environment in compose.',
            'Healthcheck every 30 seconds with an initial grace period.',
            'Public environment variables declared as build args, because the framework inlines them at build time rather than reading them at runtime.',
            'The production build runs without cache deliberately.',
          ],
        },
        {
          title: 'CI/CD',
          bullets: [
            'Bitbucket Pipelines with four deployment environments pointing at three distinct hosts: production, production alpha, and two staging branches.',
            'Each step pipes a deploy script over SSH to the corresponding deployer account.',
            'No credentials in the repository — the deploy script receives its arguments from deployment variables and writes the environment file on the server at each deploy, removing the previous one.',
            'The analytics measurement ID is configured only in production, so staging deploys with an empty value and the analytics component renders nothing rather than measuring against the real property.',
          ],
        },
        {
          title: 'Host & Delivery',
          bullets: [
            'Non-production deploys automatically point at the development chat widget, derived from the environment flag rather than adding another pipeline argument.',
            'The deploy script prunes volumes, images and builder cache before each build, creates directories and fixes ownership idempotently, and hard-resets the checkout so it is deterministic.',
            'Hero media served immutable with versioned URLs; general assets get a day of freshness plus a week of stale-while-revalidate so a same-name replacement propagates on its own.',
            'Legacy URLs permanently redirected to the approved information architecture.',
          ],
        },
      ],
    },
    deliverables: {
      body: `A complete three-language marketing and content site delivered with its deploy infrastructure, its structured-data layer and its editorial content system connected.`,
      groups: [
        {
          title: 'Application Surfaces',
          bullets: [
            '33 pages: home; platform and device compatibility; seven solution pages; three company-segment pages; enterprise, trust centre and data residency; integrations; pricing; a comparison hub with four competitor pages; a resources hub with article detail; guides, an ROI hub with two case calculators and a proof-of-value guide; research; about; contact; video; privacy and terms.',
            'Navigation with grouped menus, responsive overflow, mobile menu, language switcher in navbar and footer, section nav with scroll-spy, theme toggle, scroll-to-top and route progress.',
            'A Tailwind v4 design system with light and dark theme tokens, four self-hosted type families, and roughly 1,970 lines of animation and layout CSS with reduced-motion support.',
          ],
        },
        {
          title: 'Integrations',
          bullets: [
            'Headless CMS with an internal API proxy, typed mapping and graceful degradation to an empty state.',
            'Postmark transactional email with an explicit mock mode when the token is missing, logging instead of breaking in local and preview environments.',
            'Conditionally-mounted analytics, and a third-party chat widget in Shadow DOM with an environment-switchable host.',
          ],
        },
        {
          title: 'Documentation & Internal Tooling',
          bullets: [
            'A three-document SEO, answer-engine and generative-engine system covering doctrine, application and process, plus a prompt library, an application report and a schema audit.',
            'Explicit anti-hallucination rules and an evidence-tagging scheme distinguishing observed, inferred, assumed and recommended claims.',
            'Art-direction material including hero plate originals and layout candidates.',
            'The code itself functions as decision documentation: comments cite the client brief sections that justify each information-architecture, copy and call-to-action choice.',
          ],
        },
      ],
    },
    screenshots: [
      '/img/img/globaly-web/globaly-01.webp',
      '/img/img/globaly-web/globaly-02.webp',
      '/img/img/globaly-web/globaly-03.webp',
      '/img/img/globaly-web/globaly-04.webp',
      '/img/img/globaly-web/globaly-05.webp',
      '/img/img/globaly-web/globaly-06.webp',
      '/img/img/globaly-web/globaly-07.webp',
      '/img/img/globaly-web/globaly-08.webp',
      '/img/img/globaly-web/globaly-09.webp',
      '/img/img/globaly-web/globaly-10.webp',
    ],
    githubLink: null as any,
    liveDemoLink: 'https://getglobaly.com',
  },
  {
    slug: 'red-lizard-studioz',
    role: 'Full-stack Engineer',
    engagement: 'Team Collaboration',
    industry: 'Marketing Technology • Agency SaaS',
    locations: [
      { flag: '🇨🇦', label: 'Ontario, Canada' },
    ],
    title: 'Red Lizard Studioz',
    subtitle: 'Multi-Tenant AI Content & Conversational Sales Platform',
    whatIs: `Red Lizard Studioz is a multi-tenant platform that a marketing agency operates on behalf of its client businesses. Each client is a tenant: it owns its own blog content, knowledge base, chat agents, brand identity, lead pipeline and — optionally — its own LLM provider and API key. Agency staff work across every tenant from one dashboard; a client logs into the same dashboard and sees only their own business.

Inside the platform, an operator generates SEO articles through a multi-stage writing pipeline (outline → draft → editorial review → revision → branded cover image → optional translation → scheduled publish), maintains a per-tenant knowledge base from uploaded PDFs and Word documents, and configures an embeddable chat widget that answers visitor questions from that knowledge and captures leads. Conversations feed back into the system: questions the assistant could not answer are scored by an importance judge and surfaced as blog ideas, closing the loop between what visitors ask and what gets written.

The control surface is unusually deep for this class of product. Rather than exposing a fixed set of toggles, the platform lets operators edit the system prompts that drive the blog writer, the image agent, the design agents and every chat agent — as layered blocks with a code default, a platform-wide override and a per-tenant override, each block labelled with where its current text came from. Agents are described by a scope/surface/skills taxonomy where "skills" are real server-side tools the model may call, authorized per call rather than promised in prose.`,
    problemSolved: `An agency running content marketing and web presence for many small businesses hits the same wall repeatedly: every client needs a steady stream of on-brand articles, a website that reflects their actual services, and something to catch the visitors those efforts bring in. Doing this by hand does not scale past a handful of clients, and generic AI writing tools produce copy that is fluent but wrong — inventing services the business does not sell, quoting prices nobody approved, and restating the same idea in every section.

The platform solves it by making the business's own knowledge the source of truth and enforcing that in code rather than in prompt wording. Every tenant's documents, services, FAQs and profile are chunked and embedded into a pgvector store where retrieval requires a non-empty tenant id as the last check before the query runs, and where documents default to secure visibility so the public widget can only ever reach rows explicitly marked public. AI-written articles are deliberately excluded from the factual passages the chatbot reasons over, so a hallucination in one post cannot become a fact the assistant repeats forever. Every chat reply is buffered in full and passed through a compliance verifier before the visitor sees a word of it.

The custom build is justified by exactly the parts an off-the-shelf tool cannot give: tenant-level LLM sovereignty — a client can bring their own provider and key across six providers — prompt-level editability with guardrail blocks that warn before being cleared, and a data model where a lead, a conversation, an article, a keyword and a knowledge document all belong to the same tenant entity and can be reasoned about together.`,
    techStack: [
      'TypeScript',
      'Next.js 15',
      'React 19',
      'Tailwind CSS 4',
      'Radix UI',
      'TanStack React Query 5',
      'Tiptap 3',
      'Node.js 20',
      'Strapi 5',
      'PostgreSQL 17',
      'pgvector',
      'OpenAI SDK',
      'AG-UI Protocol (SSE)',
      'Google OAuth',
      'JWT',
      'Postmark',
      'Docker',
      'Bitbucket Pipelines',
      'Linode',
      'Cloudflare',
    ],
    learnings: [
      'Multi-tenancy enforced at four independent layers: every content type carries a project relation; a tenant-guard service resolves a slug to a published project id as the single source of truth; the RAG retrieval function throws on a non-string tenant id before touching the database; and middleware resolves custom client domains to a tenant subtree so a business can run on its own domain without the app knowing about it.',
      'Prompt engineering as a first-class product surface: the blog writer’s prompt is decomposed into named blocks with a code default and two override layers (global, then tenant), resolved by precedence and labelled in the UI with their source. Blocks marked guardrail stay editable, but the UI warns before clearing one and reports a cleared guardrail back as a risk.',
      'Agent capability separated from agent prose: a skills catalogue defines tools in code (save_lead, find_articles, save_knowledge), each declaring which surfaces may offer it. The runtime re-filters by surface at the moment tools are handed to the model, because a stored skill list validated at save time must not be honoured after the surface changed.',
      'Provider-agnostic LLM layer with per-tenant sovereignty: six providers reached through one OpenAI-compatible code path, including Anthropic via its compatibility endpoint rather than a second SDK. A tenant’s provider only takes effect when it also supplies its own key, so a misconfigured provider degrades to the platform default instead of sending the wrong credential.',
      'Cross-model parameter normalization discovered through measurement: a utility maps max_tokens vs max_completion_tokens, strips unsupported temperature, and adds reasoning headroom for models that think before answering — after measuring that one provider spent ~630 reasoning tokens producing a 15-token line, so a 60-token cap returned an empty string and every tenant on that provider silently fell back to generic copy.',
      'Grounding defended in code, not prompt wording: context assembly classifies AI-written articles as linkable but not admissible as evidence about services, prices or guarantees; a compliance verifier reviews the full buffered draft before delivery and fails safe to a neutral reply on any parse error; an offerings whitelist does LLM-judged semantic matching against what the business actually sells.',
      'Content quality treated as a pipeline problem: articles are planned before they are written, with each outlined section required to introduce an idea no earlier section covered. A second cheap model grades the draft against disqualifying criteria (invented services, fabricated case studies, third-party pricing claims) and triggers one revision pass below a threshold score.',
      'Cost engineering as an architectural constraint: routing, verification and ice-breakers run on a cheap helper model that deliberately does not inherit the expensive chat model’s configuration; the router sees a clipped six-turn window rather than a whole transcript; and the design pipeline caches each stage against a content hash so unchanged research is not re-purchased.',
      'Two independent rate-limit ceilings on an endpoint that cannot be authenticated: the widget runs in the visitor’s browser with the tenant slug in the page source, so the chat endpoint is replayable by design. Per-visitor and per-tenant windows bound the two different failure modes — one abuser on one widget, versus a distributed run against the account.',
      'Failure isolation as a recurring discipline: image generation never fails an article; an optional design pipeline stage that throws is recorded as skipped and the pipeline continues; a per-locale translation failure no longer rolls back the successfully generated English post; and a prompt-config read that fails falls back to code defaults.',
    ],
    architecture: {
      body: `The platform is built as two deployed applications over a shared tenant model: a Strapi 5 backend that owns the data, the AI pipelines and 116 custom endpoints, and a Next.js 15 dashboard that is both the operator console and the public storefront renderer. The decisive choice was to treat Strapi as an application framework rather than a CMS — content types define the tenant-scoped data model, while the behaviour lives in roughly 25,000 lines of custom services covering generation, retrieval, agents, compliance and design.`,
      groups: [
        {
          title: 'Application Architecture',
          bullets: [
            'Strapi 5 backend owning 39 content types and 116 custom REST endpoints, with two in-repo plugins.',
            'Next.js 15 App Router frontend serving the operator dashboard, public tenant storefronts, and 72 server-side API routes that proxy Strapi with per-route authorization.',
            'Authenticated same-origin proxy pattern plus a dedicated SSE proxy for streaming generation.',
            'AG-UI protocol over server-sent events for the agent runtime, so streaming, tool calls and lifecycle events follow a published contract.',
            'An embeddable widget mounted in Shadow DOM, served from the backend and installable on any external site with a one-line script tag.',
          ],
        },
        {
          title: 'Platform Features',
          bullets: [
            'Multi-stage article pipeline: outline, draft, editorial review, conditional revision, branded cover image and scheduled publish.',
            'Per-tenant RAG over uploaded documents, services, FAQs, business profile and ingested website URLs.',
            'Chat agents with per-call tool authorization, lead capture, and a safety net that rescues contact details the model failed to save.',
            'Knowledge-gap detection that turns unanswerable visitor questions into scored blog ideas.',
            'Multi-agent website design pipeline with per-stage caching, graceful degradation and live progress reporting.',
            'Conversational interviews that populate the business profile, including an invite-link flow for respondents without accounts.',
          ],
        },
        {
          title: 'Data Model',
          bullets: [
            'A project entity as the tenant root, related to articles, knowledge documents, keywords, leads, conversations, services, testimonials, FAQs, website pages and design records.',
            'Reusable components for per-tenant configuration: LLM config, compliance rules, widget config, theme, identity, contact, image agent and sales intelligence.',
            'Knowledge documents carrying a public/secure visibility enum that defaults to secure.',
            'Conversations modelled with intent, sentiment, outcome, unanswered questions and device attribution; leads with a full lifecycle including status, sub-status and generated summaries.',
            'Prompt overrides as first-class rows with scope and an optional project relation, where a null project means the global default.',
          ],
        },
        {
          title: 'Authentication',
          body: 'Identity spans agency staff working across every tenant and clients scoped to one business.',
          chips: [
            'Strapi JWT',
            'Google OAuth',
            'Role buckets',
            'Tenant assignment',
            'Internal shared secret',
            'Fail-closed policy',
            'Owner-only routes',
          ],
        },
      ],
    },
    infra: {
      body: `Both applications ship as Docker images built exclusively on CI runners and pulled by the servers — a policy adopted after an in-place build exhausted memory on a shared production host. Deployment is a Bitbucket pipeline that runs the test suite on every pull request and every branch push, builds against a registry-side BuildKit cache, and SSHes a deploy script to the target machine.`,
      groups: [
        {
          title: 'Hosting & Deploy',
          bullets: [
            'Linode host behind Cloudflare, with TLS terminating at the proxy and the app configured for proxy trust.',
            'Separate dev and production images from distinct Dockerfiles, pinned to different Node majors for documented dependency reasons.',
            'Next.js standalone output running as a non-root user, with post-deploy image pruning that keeps the newest three tags.',
          ],
        },
        {
          title: 'CI/CD',
          bullets: [
            'Tests run on every pull request and every branch push; a red suite blocks the build and the deploy.',
            'Backend suite is offline by design — no key, no database, no network — with model-calling tests opt-in behind a --live flag.',
            'Registry-cached BuildKit builds, commit-SHA and branch tags, and retry logic on registry push races.',
            'Branch-specific build arguments so each environment bakes its own backend URL, after a build-time constant once pointed a dev deploy at production.',
          ],
        },
        {
          title: 'Data & Storage',
          bullets: [
            'Two PostgreSQL 17 instances: the application database and a pgvector instance for embeddings, the latter not exposed to the host in production.',
            'SQL migrations for the vector schema, including the visibility column and a visibility-filtered similarity function.',
            'Connection pooling configured per environment; container logs rotated after an unbounded log reached hundreds of megabytes.',
          ],
        },
        {
          title: 'Operations',
          bullets: [
            'Three scheduled jobs: hourly article generation, five-minute scheduled publishing with a give-up guard, and a configurable daily digest with timezone support.',
            'Healthcheck on the frontend container, with memory limits and reservations on every service.',
            'Secrets supplied through CI variables and validated as non-empty before use, after an empty argument once shifted an entire positional list.',
          ],
        },
      ],
    },
    deliverables: {
      body: `Delivered as a working two-application system with an operator console, public tenant storefronts, an embeddable widget and the AI pipelines behind them.`,
      groups: [
        {
          title: 'Application Surfaces',
          bullets: [
            'A 24-section operator dashboard spanning content, business, super-admin and beta areas.',
            'Design Studio: a full-window AI website design editor with brief, plan, canvas, sections, versions, competitors and references panels.',
            'Public tenant storefronts with per-tenant routing, custom domain support and incremental revalidation.',
            'Authentication flows: sign-in, sign-up, Google OAuth, forgot and reset password.',
            'A public interview flow answerable from an invite link with no account, excluded from search indexing.',
          ],
        },
        {
          title: 'Integrations',
          bullets: [
            'Six LLM providers behind one interface, with a connection test action in the dashboard.',
            'Postmark transactional email covering lead notifications, daily digests, password resets and interview invitations.',
            'News retrieval for content ideas, plus integration records for analytics, search console and scheduling with derived connection status.',
            'An embeddable chat widget installable on external, non-tenant websites.',
          ],
        },
        {
          title: 'Engineering Deliverables',
          bullets: [
            '111 test suites across both repositories, including a live-API suite for behaviour that offline stubs cannot verify.',
            'CI pipelines gating both applications, with deployment runbooks documented in-repo.',
            'A documented known-issues log recording root cause and verification for each resolved defect.',
          ],
        },
      ],
    },
    screenshots: [
      '/img/img/redlizard-web/redlizard-01.webp',
      '/img/img/redlizard-web/redlizard-02.webp',
      '/img/img/redlizard-web/redlizard-03.webp',
      '/img/img/redlizard-web/redlizard-04.webp',
      '/img/img/redlizard-web/redlizard-05.webp',
      '/img/img/redlizard-web/redlizard-06.webp',
      '/img/img/redlizard-web/redlizard-07.webp',
      '/img/img/redlizard-web/redlizard-08.webp',
      '/img/img/redlizard-web/redlizard-09.webp',
      '/img/img/redlizard-web/redlizard-10.webp',
      '/img/img/redlizard-web/redlizard-11.webp',
      '/img/img/redlizard-web/redlizard-12.webp',
      '/img/img/redlizard-web/redlizard-13.webp',
      '/img/img/redlizard-web/redlizard-14.webp',
    ],
    githubLink: null as any,
    liveDemoLink: null as any,
  },
  {
    slug: 'comply-dq-site',
    role: 'Full-stack Engineer',
    engagement: 'Team Collaboration',
    industry: 'Transportation • Compliance SaaS',
    locations: [
      { flag: '🇺🇸', label: 'Kansas, United States' },
      { flag: '🇨🇦', label: 'Ontario, Canada' },
    ],
    title: 'ComplyDQ — Marketing Site',
    subtitle: 'DOT Compliance Marketing Site with Interactive Assessment Tools',
    whatIs: `ComplyDQ's public site is the marketing and lead-generation surface for a DOT Driver Qualification file management platform serving trucking companies, fleet safety managers and DOT compliance consultants. It is deliberately a presentation layer: the authenticated product lives on a separate subdomain and a separate codebase, and every conversion path on this site is an outbound link to it.

Visitors can read the feature set and a searchable 26-question FAQ library, browse a CMS-backed blog, and run three self-contained interactive tools: a DOT Audit Readiness Assessment that scores audit exposure across weighted questions and surfaces specific compliance gaps by tier; an ROI Calculator that models annual administrative cost, FTE-equivalent burden, payback period and net ROI; and a DQ File Checklist derived from 49 CFR Part 391 requirements with per-driver-type grouping. A live pricing calculator mirrors the platform's actual tiered model. All three tools compute entirely in the browser — nothing is submitted, stored or emailed.

The engineering weight of the project sits in delivery rather than application logic. The site runs self-hosted on Next.js 16 behind nginx and Cloudflare, deployed by a blue-green shell script with slot detection, asset-level validation, automatic rollback and Cloudflare cache pre-warming. A substantial share of the repository's documentation is a forensic record of production incidents, each written up with reproduction commands and the reasoning behind the fix.`,
    problemSolved: `The site migrated from a legacy WordPress install whose search index had been compromised by an SEO spam injection: hundreds of indexed posts of unrelated content in six languages, with only nine pages carrying real content worth preserving. The domain's search presence was actively working against the business.

The rebuild replaces that with a server-rendered Next.js site and treats index hygiene as a deploy-time concern. Rather than blanket-redirecting the old URLs, the migration distinguishes intent: the nine legitimate pages get 301s, while the spam URLs return 410 Gone — a deliberate choice, because a 301 would transfer the spam's accumulated reputation onto the new domain, and a 410 de-indexes faster than a 404 that Google retries. Because the spam posts lived at the domain root rather than under a prefix, prefix matching would have caught legitimate routes, so the exact slug list is generated from the pre-cutover sitemap into an nginx map. Indexability itself is derived from the build's own domain rather than the build mode, and the deploy script asserts it in both directions — production must be indexable, development must not — because a noindex in production produces no visible symptom and only surfaces weeks later as disappearance from search.

Building custom rather than using a site builder follows from two constraints visible in the code. The interactive tools encode domain logic — FMCSA penalty figures cited to their primary source, 49 CFR Part 391 document requirements, a risk-scoring model — and the pricing calculator must stay numerically identical to the platform's real billing, which it achieves by importing the same pricing constants the ROI tool uses. Second, the site is one tenant of a shared multi-client content platform: blog articles and the chat widget are both scoped by a tenant slug, which a hosted marketing product could not have integrated with.`,
    techStack: [
      'TypeScript 5',
      'Next.js 16',
      'React 19',
      'CSS Modules',
      'Strapi 5',
      'isomorphic-dompurify',
      'lucide-react',
      'Docker',
      'nginx',
      'Cloudflare',
      "Let's Encrypt",
      'Bitbucket Pipelines',
      'ESLint 9',
    ],
    learnings: [
      'Zero-downtime deploys on single-host infrastructure: blue-green slot rotation where the active slot is derived from the nginx upstream file — the actual source of truth, not assumed script state — validated on its own port before any traffic moves, with the old slot kept alive until after verification, making rollback the act of doing nothing.',
      'Deploy-time validation beyond the health check: an HTTP 200 on the document proved insufficient for the observed failure mode, so the script extracts a real CSS path from the served HTML and fetches it, confirming the build’s asset graph is complete before the swap — plus post-swap verification through nginx with retries, since an nginx reload is asynchronous and an immediate probe can still be answered by an old worker.',
      'Cache-correctness at the CDN boundary: Next serves static chunks as immutable with a one-year max-age despite those filenames not being content-addressed, so with CSS Modules a returning visitor’s cached CSS stops matching the new HTML and the page renders unstyled. Diagnosed by hash-comparing the same filename across two deployment IDs, then fixed in nginx — header order matters — scoped so genuinely hashed media keeps immutable.',
      'Systematic root-causing of an intermittent edge failure: a Cloudflare 520 rate on static assets reduced from roughly 42% to 0.4% across five independent causes — the deploy window, nginx’s default circuit breaker amplifying one timeout on a single-backend upstream, keepalive connections closed server-side, an HTTP/2 declaration inconsistent with sibling vhosts, and the Cloudflare SSL mode. Each step measured, with the residual documented and mitigated by post-deploy cache warming.',
      'Build-identity-driven client invalidation: the deployment ID is set from the commit SHA so Next appends a version query to assets and forces a full reload when a client’s HTML diverges from the server’s, instead of leaving it requesting chunks that no longer exist.',
      'Untrusted-HTML pipeline for AI-generated content: blog bodies are model-generated from client material, so they are sanitized server-side through DOMPurify with an explicit denylist as defense-in-depth, a hook that absolutizes CMS-relative image paths and drops images whose source cannot resolve, forced rel="noopener noreferrer" on external links, and hook deregistration afterward because DOMPurify hooks are module-global.',
      'Tenant isolation against a shared CMS: every query is filtered by a project slug — applied to the by-slug detail query as well as the list, specifically so another client’s article cannot be read by guessing a URL — with a normalization layer that absorbs the CMS’s inconsistent field casing so a rename is a one-function fix.',
      'Resilient ISR against an external dependency: the CMS client never throws — it returns null on any failure so a CMS outage degrades the blog to an empty state instead of breaking the build or the page, with static params catching and returning an empty list and posts published after the build rendering on demand.',
      'Data migration artifact handled in the ordering layer: the CMS overwrites the publish timestamp on import, so every article migrated from the old site collapsed to the migration date. The real date travels in a custom field, and because the API sorts nulls high, the effective-date fallback is resolved first and the list re-sorted in application code.',
      'Hydration-safe theming and derived time: the active theme lives in the DOM, written by a pre-paint inline script to prevent the dark-mode flash, and is read via useSyncExternalStore rather than mirrored into state in an effect — with hydration warnings scoped to the single node that legitimately diverges.',
      'Structured data constrained to what the page actually asserts: a shared graph with cross-referenced identifiers rather than repeated entities, external profile links deliberately omitted for want of confirmed sources, and postal address limited to region because no street address is published anywhere on the site.',
    ],
    architecture: {
      body: `A content-driven marketing site built almost entirely from React Server Components, where the central decision is that nearly every page is statically rendered with no runtime data dependency, and the only dynamic surface — the blog — is isolated behind a fail-soft ISR client. Interactivity is pushed to narrow, explicitly-bounded client leaves, so page shells, metadata and structured data stay server-rendered while calculators and toggles hydrate independently.`,
      groups: [
        {
          title: 'Application Architecture',
          bullets: [
            'Next.js 16 App Router across 15 routes, all but the blog fully static at build time.',
            '14 client components scoped to interactive leaves; everything else is a Server Component.',
            'Blog index, post detail and sitemap share a 60-second ISR revalidation window.',
            'Content and domain data live in typed modules rather than inline in JSX.',
            'Standalone output so the runtime image ships only the dependencies it actually resolves.',
            'Single-source constants: pricing, penalty figures and navigation are defined once and imported by every consumer.',
          ],
        },
        {
          title: 'Platform Features',
          bullets: [
            'DOT Audit Readiness Assessment with weighted scoring, exclusive multi-select handling, tiered results and gap surfacing at a defined threshold.',
            'ROI Calculator computing annual admin hours and cost, FTE equivalent, net ROI and payback in months — deliberately excluding fines to keep the output conservative.',
            'DQ File Checklist covering 49 CFR Part 391 items grouped by driver type with retention notes.',
            'Live pricing calculator sharing the platform’s real billing constants.',
            'Searchable 26-question FAQ library, all answers server-rendered.',
            'CMS-backed blog with featured posts, categories, authors and per-post noindex control.',
          ],
        },
        {
          title: 'Data Model',
          bullets: [
            'No database and no persistence in this repository; no auth, no API routes, no server actions.',
            'One external read-only source: Strapi 5 REST, queried without a token.',
            'Raw CMS shapes normalized to a view model so the UI never touches the API shape.',
            'Every query tenant-filtered by project slug — on detail as well as list, to prevent cross-tenant reads by URL guessing.',
            'Assessment, ROI and checklist state is ephemeral React state; nothing is submitted or stored.',
          ],
        },
        {
          title: 'SEO & Structured Data',
          chips: [
            'JSON-LD @graph',
            'Organization',
            'SoftwareApplication',
            'BlogPosting',
            'FAQPage',
            'BreadcrumbList',
            'Canonical',
            'OpenGraph',
            'Dynamic robots.txt',
            'ISR sitemap',
            '410 de-indexing',
          ],
        },
      ],
    },
    infra: {
      body: `Self-hosted on a shared VPS running roughly twenty sites, which drives most of the configuration: every resource that could collide between environments or neighbours — ports, compose project names, container names, nginx upstream blocks, server-block filenames — is namespaced explicitly, with the failure mode each collision produces documented at the point of the decision.`,
      groups: [
        {
          title: 'Deploy Pipeline',
          bullets: [
            'Bitbucket Pipelines: pull requests and main run install, build, type-check and lint.',
            'Production deploys are tag-triggered and gated on manual approval, so pushing a tag alone cannot ship.',
            'The verify step re-runs on the tag rather than trusting the branch’s earlier run, since a tag can point at any commit.',
            'Rollback is re-running the previous tag’s pipeline; each tag pins an exact commit.',
          ],
        },
        {
          title: 'Containers & Runtime',
          bullets: [
            'Multi-stage Docker build on node:22-alpine, running as a non-root user.',
            'Public environment variables passed as build args, since Next inlines them at build rather than reading them at runtime.',
            'Compose healthcheck via native fetch, with a start period excluded from retry counting.',
            'Slot and port injected by environment so both versions coexist during the swap.',
          ],
        },
        {
          title: 'nginx & Edge',
          bullets: [
            'Per-environment upstream fragments rewritten each deploy, with the circuit breaker disabled on a single-backend upstream and keepalive connections pooled.',
            'Apex to www redirect; HSTS, a per-origin CSP allowlist, frame and sniffing protections, and a Permissions-Policy denying 18 features.',
            'Security headers re-declared inside nested location blocks, because one header declaration in a block drops the parent’s.',
            'Legacy surface handled at the edge: 410 for the spam slug map and legacy WordPress paths, 301 for the nine legitimate pages.',
            'Post-deploy warming of up to 40 hashed assets, since cache keys are full-URL.',
          ],
        },
        {
          title: 'Configuration & Guardrails',
          bullets: [
            'Environment identity comes from the public site URL, not the build mode — both environments build in production mode.',
            'Deploy asserts indexability in both directions and warns loudly rather than aborting, since the fix lives in nginx rather than the build.',
            'Deploy re-verifies that chunk cache headers are not immutable, because that block lives in server config outside the repository.',
          ],
        },
      ],
    },
    deliverables: {
      groups: [
        {
          title: 'Application Surfaces',
          bullets: [
            '15 routes: Home, Features, a Resources hub with three tool pages, Blog index and detail, Partners, About, Contact, FAQs, Privacy Policy, Terms of Service and a 404.',
            'Three interactive domain tools — assessment, ROI calculator and checklist — plus a live pricing calculator.',
            'Design system of roughly 45 components with token-based CSS Modules, light and dark theming, responsive layout, skip-link and reduced-motion support.',
          ],
        },
        {
          title: 'Integrations & SEO',
          bullets: [
            'Tenant-scoped Strapi client with server-side sanitization and graceful degradation.',
            'Full SEO and structured-data layer: per-page JSON-LD, dynamic robots, ISR sitemap, canonicals and social cards.',
          ],
        },
        {
          title: 'Infrastructure & Documentation',
          bullets: [
            'Migration assets: a sitemap-to-nginx generator for the de-indexing map, the redirect mapping table, and a written rationale for the approach.',
            'Infrastructure as code: Dockerfile, Compose, two nginx server blocks, two upstream fragments, the blue-green deploy script and the CI pipeline.',
            'A roughly 420-line operational README covering both environments, bring-up and teardown runbooks, one-time server prep, and incident post-mortems with reproduction commands.',
          ],
        },
      ],
    },
    screenshots: [
      '/img/img/cdq-site-web/cdqsite-01.webp',
      '/img/img/cdq-site-web/cdqsite-02.webp',
      '/img/img/cdq-site-web/cdqsite-03.webp',
      '/img/img/cdq-site-web/cdqsite-04.webp',
      '/img/img/cdq-site-web/cdqsite-05.webp',
      '/img/img/cdq-site-web/cdqsite-06.webp',
      '/img/img/cdq-site-web/cdqsite-07.webp',
      '/img/img/cdq-site-web/cdqsite-08.webp',
      '/img/img/cdq-site-web/cdqsite-09.webp',
    ],
    githubLink: null as any,
    liveDemoLink: 'https://www.complydq.com',
  },
  {
    slug: 'royal-parking-services',
    role: 'Full-stack Engineer',
    engagement: 'Team Collaboration',
    industry: 'Parking Management • Property Services',
    locations: [
      { flag: '🇨🇦', label: 'British Columbia, Canada' },
    ],
    title: 'Royal Parking Services',
    subtitle: 'Parking Enforcement Website & Client Permit Portal',
    whatIs: `Royal Parking Services is the public website and client portal for a British Columbia parking enforcement company that manages private lots for strata councils, retail plazas, commercial offices and medical clinics. The system serves two distinct audiences from one Next.js application: drivers who received a violation notice and need to pay it, and property managers who hold a service contract and need to administer their parking permits.

Drivers use a public four-step checkout to look up a notice by licence plate or notice number, review the violation alongside the photographed lot rules that were posted on site, select one or several outstanding notices, and pay by card. Contracted clients sign in to a separate dashboard where they issue parking permits with per-day time programs and multiple registered vehicles, search their permit register by plate, cancel permits, store payment cards through Stripe tokenization, and review their invoice history with links to Stripe-hosted receipts. The marketing surface around both flows covers services, resources, an article system, a contact form with a map, and a blog wired to a headless CMS.

The codebase is roughly 12,800 lines of TypeScript across 129 source files, built over about 182 commits by five contributors. The public payment flow and the client dashboard share one API client, one auth layer and one design system, which is what keeps a consumer-facing checkout and a B2B admin panel coherent inside a single deployment.`,
    problemSolved: `Private parking enforcement generates two problems at once. Drivers who receive a notice have no self-service way to see the evidence or pay, so every ticket turns into a phone call, a cheque, or a dispute — and disputes are expensive when the enforcement company cannot immediately show the driver the signage that was posted at the lot. Meanwhile property managers under contract have no visibility into their own permit register, so every permit issuance, renewal or cancellation runs through the enforcement company's staff by email.

The system resolves both through one application. The payment flow treats the driver as untrusted by design: the client sends only notice identifiers and a plate, never an amount, and the backend computes the charge and issues a Stripe PaymentIntent. The selection step resolves the amount through a documented fallback chain so a reduced notice in appeals shows the reduction rather than the stale stored figure, and it surfaces the lot rules with signage photos deduplicated by lot — the dispute-prevention evidence, shown before payment rather than after. The confirm endpoint is idempotent, which lets the same call serve both the in-place card path and the 3-D Secure redirect return page without double-recording.

Buying this off the shelf was not viable because the notice lifecycle is the company's own domain model, not a generic product. Notices carry twelve distinct statuses, and payability is a property of that lifecycle rather than a simple paid/unpaid flag — the frontend mirrors the backend's unpayable set as an explicit blacklist, encoding what cannot be paid instead of what can, so the two stay in agreement. Permits carry per-weekday time programs, validity periods and vehicle arrays tied to a company's contract terms. No generic payment page or SaaS admin panel models either of those.`,
    techStack: [
      'TypeScript 5',
      'Next.js 15',
      'React 19',
      'Tailwind CSS 3.4',
      'daisyUI 4',
      'Redux Toolkit 2.5',
      'react-hook-form 7',
      'Yup',
      'Axios',
      'Stripe',
      'Strapi',
      'Leaflet',
      'Headless UI',
      'JWT',
      'PM2',
      'nginx',
      'Bitbucket Pipelines',
    ],
    learnings: [
      'Server-authoritative payments over a public endpoint: the checkout sends only notice identifiers and a plate number; the amount is computed backend-side and returned as a Stripe client secret. The client never proposes a price, which removes the entire class of tampering attacks that a naive pay-this-amount endpoint invites.',
      'Dual-path 3-D Secure with an idempotent confirm: confirmation runs with redirect-if-required, so non-3DS cards resolve in place while 3DS cards bounce through a dedicated return route. Both paths converge on the same confirm endpoint, made safe by backend idempotency; the return page re-derives canonical status from Stripe rather than trusting the redirect status query parameter.',
      'Public routes inside an authenticated HTTP client: a single axios instance serves both surfaces, with a public-path allowlist gating both the bearer-token request interceptor and the 401-redirect response interceptor. Without that carve-out, an expired client-portal token in storage would have kicked anonymous drivers out of the checkout mid-payment.',
      'Domain status modelling driven by a real defect: the payable-notice filter is an explicit blacklist mirroring the backend’s own guard, carrying a comment documenting that a previous whitelist hid notices the backend would have accepted. Encoding what cannot be paid instead of what can made the frontend fail open in the correct direction.',
      'Dispute prevention as a product surface: the selection step groups each notice’s lot rules with signage photos by lot and deduplicates them, so a driver with four notices in one lot sees the posted rules once, before paying. The evidence that would otherwise surface during an appeal is moved to the top of the funnel.',
      'Amount resolution with a documented precedence chain preferring the backend’s rule-applied figure over the stored one, so time-limited reductions display what the driver will actually be charged rather than the face value of the ticket.',
      'Third-party widget suppression across client-side navigation: the CMS chat widget injects a persistent host node that survives App Router transitions, so simply not rendering the script tag on the payment route was insufficient. The component emits a scoped display rule keyed to the tenant attribute — recognising that a third-party script’s DOM outlives React’s tree.',
      'CMS integration with graceful degradation: articles are fetched with ISR and filtered by project slug for multi-project tenancy on a shared CMS; every failure path returns an empty result, and both the listing and static params fall back to committed local content, so a CMS outage degrades to static posts instead of a broken blog.',
      'Stripe integrated twice, deliberately differently: the public checkout uses the modern PaymentIntents and Payment Element flow with a card-only intent, keeping wallet prompts out of a one-off driver payment, while the portal’s saved cards use the tokenization API. Two integration styles in one application, each matched to its flow — anonymous one-shot payment versus stored credential on a B2B account.',
    ],
    architecture: {
      body: `The application is a single Next.js App Router deployment serving three audiences from one codebase, separated by route groups rather than by separate apps: a public marketing site and anonymous payment checkout, the credential flows on their own full-screen layout, and the authenticated client portal with its own sidebar shell. All three share one HTTP client, one Redux store and one Tailwind design system, with public-path carve-outs where the anonymous checkout must not inherit authenticated behaviour.`,
      groups: [
        {
          title: 'Application Architecture',
          bullets: [
            'Next.js 15 App Router with three route groups: public, credentials and private dashboard.',
            'Server Components by default for marketing and article pages, with client components isolated to interactive surfaces.',
            'A single shared axios instance with request and response interceptors, plus a public-path allowlist so the anonymous checkout skips both token injection and 401 redirects.',
            'A four-step client-side checkout state machine held in one typed state object, with a separate 3-D Secure return route reconstructing state from URL parameters.',
            'Hybrid content: CMS with ISR for the blog, committed TypeScript modules for resources and service copy.',
          ],
        },
        {
          title: 'Platform Features',
          bullets: [
            'Public notice lookup by licence plate or notice number through a single unified search term.',
            'Multi-notice selection with live total and per-status payability filtering.',
            'Lot rule display with signage photography, deduplicated per lot.',
            'Permit issuance with per-weekday time programs and a dynamic vehicle array.',
            'Debounced server-side permit-number availability checking.',
            'Saved payment cards with default-card selection and hosted invoice receipts.',
            'Contact form with phone-number normalisation and a dynamically imported map.',
          ],
        },
        {
          title: 'Data Model',
          bullets: [
            'Notice — a twelve-value status lifecycle, four distinct amount fields, reduction expiry, repeat-offender flag, plus relations to officer, violation, lot, images and lot rules.',
            'Permit — type, validity period, holder, value, date range, parking lot relation, program schedule array and vehicle array.',
            'Company as the tenant root, carrying contract limits, pricing fields, billing period and admin profile.',
            'Invoice and PaymentMethod, Stripe-backed, with receipt URLs and card metadata.',
            'A consistent paginated envelope across list endpoints.',
          ],
        },
        {
          title: 'Authentication',
          chips: [
            'JWT Bearer',
            'Axios interceptors',
            '401 auto-logout',
            'Route guard',
            'Surface disambiguation',
            'Open-redirect sanitisation',
            'Forgot / reset password',
            'Public-path exemptions',
          ],
        },
      ],
    },
    payments: {
      body: `Two Stripe integrations coexist, each matched to its flow. The anonymous driver checkout uses PaymentIntents with the Payment Element; the authenticated portal stores cards through the tokenization API. Amount authority is entirely server-side in both.`,
      groups: [
        {
          title: 'Public Checkout',
          bullets: [
            'One-off payment against one or more outstanding violation notices — no subscriptions, no marketplace, no split payments.',
            'The create-intent endpoint receives notice identifiers and a plate number and no amount; the returned client secret mounts the Payment Element.',
            'The intent is pinned to card server-side, which suppresses wallet prompts and save-card offers — an intentional choice for an anonymous one-off payment.',
            'Currency is CAD, formatted for the en-CA locale, with the Stripe Elements locale pinned to prevent browser-language leakage into an English-only site.',
          ],
        },
        {
          title: 'Strong Customer Authentication',
          bullets: [
            'Confirmation runs with redirect-if-required: non-redirect payments resolve in place, redirect payments land on a dedicated return route.',
            'The return route retrieves the PaymentIntent to obtain canonical status rather than trusting the redirect status parameter.',
            'The confirm endpoint is idempotent by backend contract, so the synchronous and 3-D Secure return paths can both call it safely.',
            'Confirm re-validates notice identifiers and plate server-side, so parameters forwarded through the return URL are explicitly not a trust boundary.',
          ],
        },
        {
          title: 'Order States & Saved Cards',
          bullets: [
            'Order state is driven by the notice status lifecycle — new, partial payment and paid in full, plus reminder and appeal states.',
            'Three statuses are non-payable online and are filtered before selection.',
            'Outcome surface: confirmation number plus optional hosted receipt URL on both the in-place success step and the return page.',
            'Portal saved cards use tokenization against a card element, posting only the token — card numbers never reach the application backend.',
            'A custom Stripe appearance theme matched to the brand palette across both flows.',
          ],
        },
      ],
    },
    infra: {
      body: `Self-hosted on a Linux VPS behind PM2, deployed by Bitbucket Pipelines over SSH, with separate backend URLs, CMS credentials and Stripe keys per environment.`,
      groups: [
        {
          title: 'Hosting & Deploy',
          bullets: [
            'Node 20 process managed by PM2 serving the Next.js production server on a dedicated port.',
            'Bitbucket Pipelines, branch-triggered: main deploys production, develop deploys staging, each piping a deploy script over SSH to a deployer account.',
            'The deploy script regenerates the environment file from scratch per deploy, installs, builds with a raised heap limit, then restarts or starts under PM2.',
          ],
        },
        {
          title: 'Secrets & Configuration',
          bullets: [
            'All values come from Bitbucket deployment variables, with each validated as non-empty before being written.',
            'The script was refactored to pass variables by name through the SSH environment rather than positionally, after SSH argument flattening caused one empty value to shift every subsequent argument and silently corrupt the environment.',
            'The deploy-time environment flag distinguishes production from staging behaviour at runtime.',
          ],
        },
        {
          title: 'Delivery',
          bullets: [
            'Next.js image optimization with AVIF and WebP, and a remote-pattern allowlist restricted to the CMS upload host.',
            'A shared multi-project CMS instance, with this site scoping its queries by project slug.',
            'PM2 process logs plus a per-application deployment log directory.',
          ],
        },
      ],
    },
    deliverables: {
      groups: [
        {
          title: 'Public Site & Checkout',
          bullets: [
            'Marketing site: Home with animated stat counters and feature carousels, Services with anchor-linked sections, a dedicated mobile-pay page, About, Resources, Blog, article detail, Contact, Privacy Policy and Terms of Use.',
            'Public payment checkout: a four-step wizard plus a dedicated 3-D Secure return route, with evidence display, multi-notice selection and the Stripe Payment Element.',
          ],
        },
        {
          title: 'Client Portal',
          bullets: [
            'Sign-in, forgot-password and reset-password flows.',
            'Permit issuance form with programs and multi-vehicle registration.',
            'Permit register with plate search, detail, edit and cancel dialogs, plus vehicle-count statistics.',
            'Saved card management, invoice history with hosted receipts, and company settings.',
          ],
        },
        {
          title: 'Content & Design System',
          bullets: [
            'Five long-form resource articles and four blog posts authored as structured TypeScript data with a typed block model, rendered through one shared article component that also renders CMS-sourced HTML.',
            'A custom Tailwind token layer over daisyUI with reusable banner, FAQ, pagination and select primitives, a route-transition loader and a scroll-to-top control.',
            'Integrations delivered: Stripe across two flows, the CMS, a chat widget with per-route suppression, and an interactive map.',
          ],
        },
      ],
    },
    screenshots: [
      '/img/img/royalparking-web/royalparking-01.webp',
      '/img/img/royalparking-web/royalparking-02.webp',
      '/img/img/royalparking-web/royalparking-03.webp',
      '/img/img/royalparking-web/royalparking-04.webp',
      '/img/img/royalparking-web/royalparking-05.webp',
      '/img/img/royalparking-web/royalparking-06.webp',
      '/img/img/royalparking-web/royalparking-07.webp',
    ],
    githubLink: null as any,
    liveDemoLink: null as any,
  },
  {
    slug: 'sophie-callander',
    role: 'Full-stack Engineer',
    engagement: 'Team Collaboration',
    industry: 'Professional Services • Mediation',
    locations: [
      { flag: '🇨🇦', label: 'British Columbia, Canada' },
    ],
    title: 'Sophie Callander Consulting',
    subtitle: 'Multilingual Conflict Resolution Practice Website',
    whatIs: `Sophie Callander Consulting is the public practice site for an independent mediator and Workplace Fairness Analyst based in British Columbia, Canada. It serves organizations and individuals dealing with workplace conflict who are evaluating a practitioner before making contact — a decision driven by trust and credibility rather than feature comparison. The site's job is to establish that credibility, explain four distinct service offerings, and route qualified visitors into a booked introductory call.

Visitors can read service descriptions for mediation, conflict management coaching, workplace fairness assessments and workplace restoration; follow a narrative journey section covering the practitioner's path from the bar to conflict resolution; review verified qualifications, designations and memberships; read an FAQ; browse blog articles pulled live from a headless CMS; and reach a contact page with email, phone and a booking link. Every one of these surfaces is published in seven languages — English, French, Spanish, Punjabi, Hindi, Simplified Chinese and Persian — with Persian rendering the entire layout right-to-left.

The scale of the work is concentrated in correctness rather than surface area: seven fully translated locales across eight route types, a type-enforced translation system, a comprehensive structured-data and crawler-access layer, and a documented dual-environment Docker deployment behind nginx. The repository contains an unusually detailed SEO and answer-engine audit that records defects found, fixes applied, before and after measurements, and an explicit list of claims that could not be verified from code.`,
    problemSolved: `An independent practitioner competing on trust has no brand to lean on: the website is the credibility. Two problems compounded that. First, the practice serves a multilingual population — workplace conflict in British Columbia frequently involves people whose first language is Punjabi, Hindi, Mandarin, Persian, Spanish or French — and an English-only site excludes exactly the participants a mediator most needs to reach. Second, an earlier state of the codebase carried SEO defects severe enough to keep the site out of search results entirely: every page declared a canonical URL pointing at the homepage, effectively declaring the whole site duplicate content of its own root; robots and sitemap requests returned server errors because they fell through to the localized route and crashed on an undefined locale; hreflang was declared in config but rendered no tags in the served HTML; and there was no structured data at all.

The system resolves this with per-route metadata resolution that computes canonical, the seven hreflang alternates plus a default, and the social URL from a path each page declares for itself — something the layout provably cannot do, because it does not know its child route. Crawlability artifacts are generated from the routing table rather than hand-maintained, including a machine-readable summary route for AI assistants. Translation correctness is enforced by the compiler: the English dictionary is the type source of truth and all six other locales are typed against it, so a missing or misspelled key fails type checking in CI before it can ship a blank string. English is served without a URL prefix via an internal rewrite so pre-existing URLs and their accrued ranking survive.

Off-the-shelf was rejected for reasons visible in the code. A template builder cannot express the locale-aware font strategy — Chinese deliberately uses a system font stack because Google publishes no Chinese subset, and the framework font loader would otherwise bundle 91 KB of font declarations into the shared CSS chunk and block rendering for visitors who never use it. Nor would it express the structured-data discipline the code enforces: the schema layer emits ProfessionalService rather than LocalBusiness specifically because no physical address is published, following a stated rule that schema must describe visible, accurate content.`,
    techStack: [
      'TypeScript 5',
      'Next.js 16',
      'React 19',
      'SCSS Modules',
      'next/font',
      'Strapi 5',
      'ISR',
      'next/image',
      'Custom i18n (7 locales, RTL)',
      'JSON-LD',
      'lucide-react',
      'Google Analytics 4',
      'Docker',
      'nginx',
      "Let's Encrypt",
      'Bitbucket Pipelines',
      'Linode',
      'Cloudflare',
    ],
    learnings: [
      'Metadata architecture at the route level, not the layout: canonical, hreflang and social URL are computed by a single helper each page calls with its own path. This fixed a live defect where a canonical declared in the localized layout was inherited by every child route, declaring the entire site duplicate content of its own homepage.',
      'Compile-time enforcement of translation completeness: the English dictionary is authored as a constant and a mapped type strips its readonly modifiers to produce the shared Dictionary type. The six other locales are typed against it, so the CI type check — which runs before the build — catches a missing key across seven locales rather than shipping an empty string to production.',
      'Prefix-less default locale via internal rewrite: the proxy rewrites unprefixed paths to the English route without changing the visible URL, keeping all routes under a single localized tree while preserving existing URLs and their accrued ranking. Rewrite rather than redirect, and deliberately no language sniffing, so pages stay statically prerenderable and no visitor is dropped into an unreviewed translation.',
      'Per-script font loading tuned against a measured regression: all seven locales initially preloaded all six font families, because the font loader injects a preload link per instantiated font without knowing which route uses it — 294 KB, more than the page’s entire JavaScript payload. Disabling preload on the four non-Latin families moved LCP from 5.6 s to 3.8 s and total blocking time from 100 ms to 30 ms.',
      'Server-first component boundary: five of 27 components are client components. The header is a server shell that resolves locale, dictionary strings and navigation, then hands a fully-resolved props object to the interactive child — dictionaries never cross the network boundary, only rendered HTML does.',
      'Progressive enhancement as a hard constraint: the reveal component ships content visible in the served HTML and only applies the hidden state client-side when the observer API exists and the user has not requested reduced motion, with a three-second failsafe on the reasoning that losing an animation beats leaving content invisible. The language switcher is real anchors, not router calls, so it works without JavaScript and is crawlable.',
      'Structured data bounded by what the page actually shows: the schema layer emits a graph of ProfessionalService, Person and WebSite with stable cross-references — but deliberately no address, hours, service area or external profile links, and types the business as ProfessionalService instead of LocalBusiness precisely because no physical address is published.',
      'Image pipeline tuned to the actual asset set: device sizes cap at 2048 because no source image exceeds that width and the optimizer never upscales, so larger breakpoints were producing byte-identical output while doubling cache entries per photo per format. Minimum cache TTL is raised from four hours to 31 days because AVIF encoding costs roughly 50% more than WebP and the default made the first visitor of each window pay for re-encoding.',
      'A content security policy that survives static prerendering: the script directive accepts inline as a documented trade-off — per-request nonces would force dynamic rendering and destroy the static prerender the site depends on — while the origin allowlist does the actual work of blocking injected third-party scripts, with eval scoped to development only.',
      'Accessibility encoded in the token layer: every muted and on-dark color carries its measured WCAG contrast ratio as a comment, and the brand blue is lightened to a separate on-dark token for footer text because the pure brand value fails AA at small sizes. 62 CSS logical-property declarations carry the right-to-left layout for Persian.',
    ],
    architecture: {
      body: `A server-rendered, statically prerendered Next.js 16 App Router application built around a single localized route tree serving seven locales. The central decision is that almost nothing runs on the client: dictionaries, content assembly, structured data and metadata all resolve on the server, and the client bundle carries only five interactive components. Content is split by volatility — durable copy lives in typed TypeScript dictionaries compiled into the build, while blog articles come from a headless CMS through ISR, so the client can publish without a deploy while marketing copy stays under version control and type checking.`,
      groups: [
        {
          title: 'Application Architecture',
          bullets: [
            'A single localized route tree with static params emitting one static variant per locale.',
            'Default locale served prefix-less through an internal rewrite, so English and localized routes share one implementation.',
            'Server shell and client island pattern: the header resolves all data server-side and passes resolved props to its interactive child.',
            'A content assembly layer joins translated copy with untranslated structure — stable slug identifiers used as URL anchors and icon keys are explicitly never translated.',
            'Presentational primitives compose every page, with SCSS Modules scoped per component and no UI framework.',
          ],
        },
        {
          title: 'Internationalization',
          bullets: [
            'Seven locales with per-locale language tag, social locale, formatting locale and writing direction in one metadata record.',
            'Persian drives right-to-left on the document root, carried through 62 CSS logical-property declarations.',
            'Dictionaries lazy-imported per request so only the active locale reaches the server, and never the client.',
            'Native internationalization APIs for plural counts and dates, with dates pinned to UTC so a late-night publish does not display the previous day in negative offsets.',
            'The language switcher renders real anchors with language and direction attributes, working without JavaScript.',
          ],
        },
        {
          title: 'Data Model',
          bullets: [
            'No database, no ORM and no persistence layer — the site is read-only by design.',
            'Strapi 5 REST filtered by a project slug tenant key so one CMS serves multiple sites.',
            'A mapping layer converts every CMS response into site-owned types; the UI never touches the API shape.',
            'Derived server-side: reading time from body word count, related posts ranked by shared category, and a nesting-aware parser that strips the CMS’s duplicated takeaways block.',
            'CMS failures degrade to an empty list rather than propagating — an outage costs the blog, not the site.',
          ],
        },
        {
          title: 'SEO & Answer-Engine Layer',
          chips: [
            'hreflang × 7 + x-default',
            'Per-route canonical',
            'JSON-LD @graph',
            'ProfessionalService',
            'FAQPage',
            'BreadcrumbList',
            'Article',
            'Generated sitemap',
            'Generated robots',
            'llms.txt route',
            'AI crawler allowlist',
          ],
        },
      ],
    },
    infra: {
      body: `Deployed as a self-hosted Docker container behind nginx on a Linode VPS in Toronto rather than a managed platform — a choice that follows from the server already hosting roughly thirteen projects. Development and production are two independent clones of the same repository on the same machine, parameterized entirely through environment variables so neither can collide with the other's container name or port.`,
      groups: [
        {
          title: 'Containers & Build',
          bullets: [
            'Three-stage Dockerfile on node:22-alpine, running as a non-root user.',
            'Standalone output so the runtime image ships only the dependencies actually used.',
            'Compose healthcheck polling the app every 30 seconds with a start period.',
            'The public site URL is passed as a build arg, not just runtime env — it is baked at compile time because it signs canonicals, hreflang and the sitemap.',
          ],
        },
        {
          title: 'CI/CD',
          bullets: [
            'Bitbucket Pipelines, with pull requests running the same verification step as main.',
            'Gate order is install, type-check, lint, build — with type checking ahead of the build so locale key errors surface first.',
            'Push to main deploys to development, then production, via a remote script that resets to origin, rebuilds, restarts and prunes stale images.',
            'A documented pipeline gotcha: the production script path is quoted because the CI masks every occurrence of a secured variable’s value in the command string, which was corrupting the path.',
          ],
        },
        {
          title: 'Environments & Edge',
          bullets: [
            'Development and production coexist on one host with distinct directories, container names and ports.',
            'Development serves a noindex robots header at the nginx layer so it can never compete with production for rankings.',
            'nginx terminates TLS and forces HTTPS and apex canonicalization with permanent redirects.',
            'A Cloudflare real-IP snippet restores visitor IPs from the forwarding header, trusted only from published ranges — shipped and documented ahead of enabling the proxy.',
          ],
        },
        {
          title: 'Observability',
          bullets: [
            'Analytics mounted only when a measurement ID is configured — with none set, the site loads nothing from the provider and sets no cookie.',
            'CMS fetch failures logged server-side with status and URL.',
          ],
        },
      ],
    },
    deliverables: {
      body: `A complete seven-language marketing site delivered to production with its deployment pipeline, server configuration and a written technical audit.`,
      groups: [
        {
          title: 'Application Surfaces',
          bullets: [
            'Home, Services, About, FAQ, Contact, Reflections, Blog index and Blog detail — eight route types across seven locales.',
            'Header with mobile panel, skip-to-content link and language switcher; footer with full navigation.',
            'Blog detail with cover image, reading time, key-takeaways block, related posts and per-post CMS-driven metadata.',
            'Narrative About page with journey timeline, credentials including an explicitly separated in-progress group, and an animated portrait strip.',
            'Contact page with email, phone and an external booking link.',
          ],
        },
        {
          title: 'Integrations',
          bullets: [
            'Strapi 5 headless CMS for blog content, tenant-filtered.',
            'An embedded chat widget in Shadow DOM, loaded from the CMS origin with a tenant attribute.',
            'External booking scheduler and conditionally-mounted analytics.',
          ],
        },
        {
          title: 'Infrastructure & Documentation',
          bullets: [
            'Dockerfile, Compose file, remote deploy script and CI pipeline configuration.',
            'nginx server blocks for both environments plus the Cloudflare real-IP snippet.',
            'A written SEO and answer-engine audit documenting five corrected defects with before and after evidence, a phase-by-phase verification table, Lighthouse results, explicitly tagged unverifiable claims, and open questions for the client.',
            'A runbook for enabling the Cloudflare proxy, including measured latency justification and the required ordering of steps.',
          ],
        },
      ],
    },
    screenshots: [
      '/img/img/sophie-web/sophie-01.webp',
      '/img/img/sophie-web/sophie-02.webp',
      '/img/img/sophie-web/sophie-03.webp',
      '/img/img/sophie-web/sophie-04.webp',
      '/img/img/sophie-web/sophie-05.webp',
    ],
    githubLink: null as any,
    liveDemoLink: 'https://sophiecallander.com',
  },
  {
    slug: 'grupo-el-triunfo',
    role: 'Full-stack · Corporate site',
    engagement: 'Client work',
    industry: 'Agribusiness',
    locations: [
      { flag: '🇦🇷', label: 'Cordoba, Argentina' },
    ],
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
    role: 'Full-stack · SaaS',
    engagement: 'Client work',
    industry: 'Construction & trades',
    locations: [
      { flag: '🇺🇸', label: 'California, United States' },
    ],
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
    role: 'Frontend · Product landing',
    engagement: 'Client work',
    industry: 'Construction & trades',
    locations: [
      { flag: '🇺🇸', label: 'California, United States' },
    ],
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
    role: 'Full-stack',
    engagement: 'Own product',
    industry: 'Tech recruiting',
    locations: [
      { flag: '🇨🇱', label: 'Santiago, Chile' },
    ],
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
    role: 'Full-stack · Payments & integrations',
    engagement: 'Client work',
    industry: 'Appointment-based services',
    locations: [
      { flag: '🇦🇷', label: 'Cordoba, Argentina' },
    ],
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
    role: 'Full-stack · Corporate site',
    engagement: 'Client work',
    industry: 'Fitness & training',
    locations: [
      { flag: '🇦🇷', label: 'Cordoba, Argentina' },
    ],
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
    role: 'Full-stack · Corporate site',
    engagement: 'Client work',
    industry: 'Industrial services',
    locations: [
      { flag: '🇦🇷', label: 'Buenos Aires, Argentina' },
    ],
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
    role: 'Full-stack · B2B e-commerce',
    engagement: 'Client work',
    industry: 'Wholesale fashion',
    locations: [
      { flag: '🇨🇦', label: 'Canada' },
    ],
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
    role: 'Full-stack · AI automation',
    engagement: 'Client work',
    industry: 'Legal',
    locations: [
      { flag: '🇪🇸', label: 'Andalusia, Spain' },
    ],
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
    role: 'Full-stack',
    engagement: 'Own product',
    industry: 'Real estate',
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
    role: 'Full-stack',
    engagement: 'Own product',
    industry: 'Events & venues',
    locations: [
      { flag: '🇨🇦', label: 'Canada' },
    ],
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
    role: 'Full-stack · Strapi CMS',
    engagement: 'Client work',
    industry: 'Sports & fitness',
    locations: [
      { flag: '🇨🇦', label: 'Canada' },
    ],
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
    role: 'Frontend · Product landing',
    engagement: 'Client work',
    industry: 'Legal',
    locations: [
      { flag: '🇪🇸', label: 'Andalusia, Spain' },
    ],
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
    role: 'Full-stack',
    engagement: 'Practice project',
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
    role: 'Full-stack',
    engagement: 'Practice project',
    industry: 'Healthcare',
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
    role: 'Full-stack',
    engagement: 'Practice project',
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
    role: 'Full-stack',
    engagement: 'Practice project',
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
    role: 'Frontend',
    engagement: 'Practice project',
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
    role: 'Frontend',
    engagement: 'Practice project',
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