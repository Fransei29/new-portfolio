// design-exploration/_shared/content.ts
// Contenido real del portafolio, en un solo lugar, para que todas las opciones
// de diseño muestren exactamente el mismo texto y se comparen por diseño.
//
// Es una foto (generada el 2026-09-28) de las fuentes del sitio: locales/es/*.json,
// lib/projectCards.ts, app/data/projects.ts, components/Skills y HeroDashboard.
// No se inventó nada: si algo cambia en el sitio, no se refleja acá solo.

export interface Project {
  slug: string; title: string; subtitle?: string; description: string;
  summary?: string; problem?: string; role?: string; engagement?: string; industry?: string;
  locations: { flag?: string; label: string }[];
  category?: 'product' | 'platform' | 'landing'; featured: boolean; latest: boolean;
  stack: string[]; image?: string; screenshots: string[];
  liveUrl: string | null; repoUrl: string | null; caseStudyUrl: string;
}

export const content = {
  "profile": {
    "name": "Franco Seiler",
    "studio": "Estudio de Software",
    "role": "Desarrollador Full Stack",
    "tagline": "Estudio de software a medida y automatizaciones para negocios que necesitan crecer.",
    "headline": {
      "before": "Construí tu ",
      "highlight": "producto digital",
      "after": " listo para crecer."
    },
    "intro": "Ayudamos a startups y equipos a diseñar y construir plataformas confiables que acompañan el crecimiento de su negocio.",
    "location": "Córdoba, Argentina",
    "reach": "EE.UU. · Canadá · Europa · Latinoamérica",
    "bio": [
      "Llevamos los proyectos de punta a punta, desde la primera idea hasta producción. Trabajás directamente con quienes construyen tu software, sin capas de intermediarios ni traspasos innecesarios.",
      "Mantenemos el equipo chico y sumamos especialistas de confianza cuando el proyecto lo pide.",
      "Eso significa atención senior sin la estructura pesada de una agencia grande.",
      "Desde Córdoba, Argentina, trabajando con equipos de Estados Unidos, Canadá y Europa.",
      "Construimos software a medida y automatizaciones para negocios cuya operación ya no entra en planillas y procesos manuales."
    ],
    "aboutTitle": "Quiénes construyen tu producto",
    "aboutSubtitle": "Con quién vas a trabajar"
  },
  "stats": [
    {
      "value": "4+",
      "label": "Años construyendo"
    },
    {
      "value": "20+",
      "label": "Case studies"
    },
    {
      "value": "6",
      "label": "Países con proyectos entregados"
    }
  ],
  "markets": [
    {
      "flag": "🇨🇦",
      "city": "Toronto"
    },
    {
      "flag": "🇦🇷",
      "city": "Buenos Aires"
    },
    {
      "flag": "🇺🇸",
      "city": "California"
    },
    {
      "flag": "🇮🇹",
      "city": "Torino"
    },
    {
      "flag": "🇪🇸",
      "city": "Andalucía"
    },
    {
      "flag": "🇨🇦",
      "city": "Vancouver"
    },
    {
      "flag": "🇨🇱",
      "city": "Santiago"
    },
    {
      "flag": "🇦🇷",
      "city": "Córdoba"
    }
  ],
  "principles": [
    {
      "eyebrow": "Sin intermediarios",
      "title": "Hablás con quien construye",
      "description": "Sin comerciales. Sin capas de comunicación. Hablás directamente con quien lo construye."
    },
    {
      "eyebrow": "Sin ataduras",
      "title": "Todo es tuyo",
      "description": "Tu repositorio. Tu documentación. Tus accesos. Desde el primer día, es tuyo."
    },
    {
      "eyebrow": "Sin sorpresas",
      "title": "Lo ves funcionando",
      "description": "No esperás hasta el final para saber si está bien. Entregas que funcionan durante todo el proceso."
    }
  ],
  "process": [
    {
      "title": "Descubrimiento",
      "description": "Entendemos tu negocio, objetivos y usuarios. Definimos alcance, prioridades y un plan de trabajo alineado contigo."
    },
    {
      "title": "Diseño y planificación",
      "description": "Estructuramos la solución: arquitectura, flujos y UX. Validamos contigo antes de escribir código para evitar sorpresas."
    },
    {
      "title": "Desarrollo",
      "description": "Construcción iterativa con código de calidad. Comunicación constante y entregas parciales para que puedas seguir el avance."
    },
    {
      "title": "Lanzamiento y soporte",
      "description": "Despliegue, documentación y acompañamiento post-lanzamiento. Te dejamos todo listo para que mantengas o escales el producto."
    }
  ],
  "services": [
    {
      "title": "Desarrollo de Software",
      "short": "Build",
      "description": "Plataformas que crecen con tu negocio. Código robusto, escalable y mantenible que se adapta a tus necesidades.",
      "tags": []
    },
    {
      "title": "Aplicaciones Web",
      "short": "Apps",
      "description": "Apps modernas que tus usuarios aman. Rápidas, intuitivas y optimizadas para convertir visitantes en clientes.",
      "tags": []
    },
    {
      "title": "E-commerce Completo",
      "short": "Commerce",
      "description": "Tiendas online que venden. Desde el setup hasta la optimización de conversión, todo para que tu negocio crezca online.",
      "tags": []
    },
    {
      "title": "Estrategia e Integración de IA",
      "short": "IA",
      "description": "Convertí la IA en un motor de crecimiento. Definimos la estrategia e integramos soluciones que aumentan las ventas, mejoran el margen y habilitan operaciones escalables.",
      "tags": [
        "LLM OPS",
        "RAG",
        "WORKFLOWS"
      ]
    },
    {
      "title": "Automatización de Negocio",
      "short": "Workflows",
      "description": "Procesos que trabajan por vos. Tareas repetitivas y flujos completos automatizados para que tu equipo se enfoque en lo que genera valor.",
      "tags": []
    },
    {
      "title": "Arquitectura Escalable",
      "short": "Sistemas",
      "description": "Infraestructura que crece sin complicaciones. Sistemas seguros, escalables y mantenibles que soportan el crecimiento de tu negocio.",
      "tags": []
    }
  ],
  "projects": [
    {
      "slug": "acer0",
      "title": "Acer0",
      "subtitle": "Plataforma de E-Commerce a Medida",
      "description": "Plataforma de e-commerce totalmente a medida construida desde cero para una marca de manufactura y retail. Entrega una experiencia de compra online completa con navegación de productos, gestión de carrito, pagos con Mercado Pago y transferencia bancaria, cuentas de cliente con seguimiento de pedidos y favoritos, y un potente panel de administración con estadísticas de ventas — todo dentro de un diseño pixel-perfect, mobile-first y totalmente responsive.",
      "summary": "a.cer0 es una plataforma de e-commerce totalmente a medida construida desde cero para una marca de manufactura y retail. El sistema entrega una experiencia de compra online completa — desde la navegación de productos y gestión del carrito hasta un checkout seguro con múltiples métodos de pago — junto con un potente panel de administración para el control total de la operación del negocio.\nLas funcionalidades incluyen catálogo de productos con filtros avanzados, carrito con soporte de cupones, integración de pagos con Mercado Pago, manejo de transferencias bancarias, cuentas de cliente con seguimiento de pedidos y favoritos, dashboard administrativo con estadísticas de ventas y diseño totalmente responsive mobile-first.",
      "problem": "El cliente necesitaba un storefront digital a medida que reflejara su identidad de marca y a la vez manejara toda la complejidad del e-commerce argentino — incluyendo integración con Mercado Pago, flujos de confirmación de transferencias bancarias y una experiencia administrativa bilingüe.\nLas soluciones off-the-shelf no podían entregar el UX custom, la performance y el control requeridos, por lo que la respuesta fue una plataforma a medida — dando al cliente propiedad total sobre sus datos, su branding y su operación, con un backend afinado exactamente a su flujo de trabajo.",
      "role": "Full-stack · Arquitectura",
      "engagement": "Trabajo para cliente",
      "industry": "Manufactura y retail",
      "locations": [
        {
          "flag": "🇦🇷",
          "label": "Buenos Aires, Argentina"
        }
      ],
      "category": "product",
      "featured": true,
      "latest": true,
      "stack": [
        "Next.js",
        "React",
        "TypeScript",
        "SCSS Modules",
        "Node.js",
        "Express",
        "PostgreSQL",
        "Prisma",
        "Mercado Pago SDK",
        "Google OAuth",
        "JWT",
        "Docker",
        "PM2"
      ],
      "image": "/img/img/Acero-web/acero-01.webp",
      "screenshots": [
        "/img/img/Acero-web/acero-01.webp",
        "/img/img/Acero-web/acero-02.webp",
        "/img/img/Acero-web/acero-03.webp",
        "/img/img/Acero-web/acero-04.webp",
        "/img/img/Acero-web/acero-05.webp",
        "/img/img/Acero-web/acero-06.webp"
      ],
      "liveUrl": "https://www.acer0.com.ar/",
      "repoUrl": null,
      "caseStudyUrl": "/projects/acer0"
    },
    {
      "slug": "bellum",
      "title": "Bellum",
      "subtitle": "Plataforma de Gestión Financiera para HOAs",
      "description": "Plataforma profesional para asociaciones de propietarios (HOA) y consorcios de condominios que tercerizan su gestión financiera, reportes y operaciones de back-office. Combina un sitio de marketing de alto nivel, un flujo de propuestas multi-paso, un motor de blog y — en el corazón — un panel de administración completo que permite al equipo de Bellum editar en tiempo real cada página, servicio, precio, FAQ, imagen de hero y artículo del blog, impulsado por un CMS basado en git sin base de datos tradicional.",
      "summary": "Bellum es una plataforma de nivel profesional construida para asociaciones de propietarios (HOA) y consorcios de condominios que buscan tercerizar su gestión financiera, reportes y operaciones de back-office.\nLa plataforma funciona a la vez como sitio de marketing y como hub de servicios gestionado por contenido, permitiendo a directivos y administradores explorar los servicios, solicitar propuestas y acceder a recursos financieros detallados — todo a través de una experiencia pulida y rica en animaciones.\nEn el corazón vive un potente panel de administración que convierte al sitio entero en una superficie totalmente editable: cada página de servicio, artículo de blog, imagen de hero, FAQ, testimonio, bloque de precios y flujo de propuesta puede actualizarse en tiempo real desde un dashboard seguro, con los cambios commiteados directo al repositorio — sin base de datos, sin depender del desarrollador, sin downtime.\nLas funcionalidades incluyen un sistema de páginas de servicio multi-variante, un CMS basado en git con panel de administración visual completo, un flujo de propuestas multi-paso, un motor de blog, integración de email transaccional y una capa visual con Three.js.",
      "problem": "Los directivos de las HOAs suelen estar saturados por la complejidad financiera — presupuestos, cobranzas, pagos, comunicación con propietarios — con herramientas muy limitadas para evaluar y contratar ayuda profesional. Y del otro lado, la propia firma administradora normalmente no tiene una forma sencilla de mantener actualizado su sitio de marketing, su catálogo de servicios y su flujo de propuestas sin tener que volver al desarrollador cada vez.\nBellum resuelve ambos lados: las asociaciones reciben un catálogo de servicios claro y segmentado con múltiples variantes de layout, que les permite entender rápidamente lo que se ofrece, comparar servicios y enviar propuestas a medida — todo dentro de una experiencia rápida, optimizada para SEO y visualmente atractiva. Y el equipo de Bellum, a su vez, accede a un panel administrativo completo para gestionar cada pieza de contenido del sitio — servicios, precios, artículos del blog, FAQs, medios del hero, testimonios y plantillas de propuestas — de forma totalmente autónoma y con control de versiones incorporado.",
      "role": "Full-stack · CMS a medida",
      "engagement": "Trabajo para cliente",
      "industry": "Administración de consorcios",
      "locations": [],
      "category": "platform",
      "featured": true,
      "latest": true,
      "stack": [
        "Next.js",
        "React",
        "TypeScript",
        "SCSS",
        "GSAP",
        "Three.js",
        "React Three Fiber",
        "Resend",
        "GitHub Contents API",
        "Vitest"
      ],
      "image": "/img/img/bellum-web/Screenshot from 2026-05-12 19-47-24.webp",
      "screenshots": [
        "/img/img/bellum-web/Screenshot from 2026-05-12 19-47-24.webp",
        "/img/img/bellum-web/Screenshot from 2026-05-12 19-47-28.webp",
        "/img/img/bellum-web/Screenshot from 2026-05-12 19-47-34.webp",
        "/img/img/bellum-web/Screenshot from 2026-05-12 19-47-39.webp",
        "/img/img/bellum-web/Screenshot from 2026-05-12 19-47-47.webp",
        "/img/img/bellum-web/Screenshot from 2026-05-12 19-47-56.webp"
      ],
      "liveUrl": "https://bellumhoafinance.com/",
      "repoUrl": null,
      "caseStudyUrl": "/projects/bellum"
    },
    {
      "slug": "comply-dq",
      "title": "Comply DQ",
      "subtitle": "Plataforma de Compliance y Document Intelligence para Flotas",
      "description": "Plataforma SaaS de nivel enterprise diseñada para empresas de transporte y equipos de compliance que necesitan incorporar, verificar y gestionar de forma continua la documentación de los conductores a gran escala. Desarrollada en conjunto con un equipo de ingeniería de Canadá, es una de las plataformas más grandes y complejas de nuestro portafolio — arquitectura multi-tenant, autenticación enterprise con Keycloak, suscripciones con Stripe, flujos documentales complejos y una plataforma B2B en producción en la que confían operaciones de flotas reales.",
      "summary": "Comply DQ es una plataforma de nivel enterprise diseñada para empresas de transporte y equipos de compliance que necesitan incorporar, verificar y gestionar de forma continua la documentación de los conductores (CDL, certificaciones médicas, pólizas y más) a gran escala.\nEl producto combina workspaces conscientes de rol, datos acotados por empresa y un billing basado en suscripciones para que los operadores pasen de planillas y herramientas legacy a una única fuente de verdad, con flujos pensados para auditoría.\nDesarrollada en conjunto con un equipo de ingeniería de Canadá, Comply DQ es una de las plataformas más grandes y complejas en las que participé — un verdadero SaaS enterprise con arquitectura multi-tenant profunda, cientos de páginas de tooling operativo y los requisitos de compliance B2B en el centro de cada decisión.",
      "problem": "Los programas de transporte y compliance suelen lidiar con archivos fragmentados, control de acceso inconsistente y renovaciones manuales — lo que aumenta el riesgo y demora las auditorías.\nComply DQ aborda esto centralizando perfiles de conductores, ciclo de vida de los documentos y administración de empresas en una arquitectura multi-tenant segura, con separación clara entre las organizaciones cliente y la supervisión a nivel de plataforma.\nLa plataforma se construyó codo a codo con un equipo senior basado en Canadá, combinando su expertise en compliance de transporte de US y Canadá con ingeniería hands-on para entregar un producto listo para producción, en el que confían flotas reales bajo presión regulatoria real.",
      "role": "Full-stack · Multi-tenant",
      "engagement": "Colaboración con equipo",
      "industry": "Compliance de transporte",
      "locations": [
        {
          "flag": "🇨🇦",
          "label": "Ontario, Canadá"
        },
        {
          "flag": "🇺🇸",
          "label": "Estados Unidos"
        }
      ],
      "category": "platform",
      "featured": true,
      "latest": true,
      "stack": [
        "Next.js",
        "React",
        "TypeScript",
        "Redux Toolkit",
        "NestJS",
        "Prisma",
        "PostgreSQL",
        "Keycloak",
        "JWT",
        "Stripe",
        "AWS S3",
        "Ant Design",
        "MUI"
      ],
      "image": "/img/img/cdq-web/cdq-01.webp",
      "screenshots": [
        "/img/img/cdq-web/cdq-01.webp",
        "/img/img/cdq-web/cdq-02.webp",
        "/img/img/cdq-web/cdq-03.webp",
        "/img/img/cdq-web/cdq-04.webp",
        "/img/img/cdq-web/cdq-05.webp",
        "/img/img/cdq-web/cdq-06.webp"
      ],
      "liveUrl": null,
      "repoUrl": null,
      "caseStudyUrl": "/projects/comply-dq"
    },
    {
      "slug": "globaly",
      "title": "Globaly",
      "subtitle": "Sitio multilingüe de marketing y contenido para una plataforma de colaboración inmersiva",
      "description": "Sitio público de marketing y contenido de una plataforma de colaboración inmersiva: 33 páginas en tres idiomas, precios geolocalizados resueltos en el servidor desde una única fuente de verdad, un blog con CMS headless acotado por tenant, y una capa de datos estructurados pensada tanto para motores de respuesta como para buscadores.",
      "summary": "Globaly es el sitio público de una plataforma de colaboración inmersiva — espacios digitales donde equipos distribuidos trabajan, entrenan y presentan juntos sin estar en el mismo lugar. El sitio no es el producto: es la capa comercial, editorial y de descubrimiento que lo rodea.\nUn visitante recorre 33 páginas: la plataforma y su compatibilidad de dispositivos, siete páginas de soluciones, tres páginas por segmento de empresa, un hub de enterprise con trust center y residencia de datos, una tabla de precios de cinco planes que se renderiza en USD o EUR según el país del visitante, cuatro páginas comparativas, y un blog con búsqueda, filtro por categoría y paginación alimentado desde un CMS headless compartido. Todo el contenido está traducido a inglés, francés y español, con el idioma negociado por cookie en lugar de por prefijo de URL.\nLa colaboración está documentada dentro del propio código: los comentarios citan los documentos de estrategia del cliente por sección como justificación de las decisiones de arquitectura de información, y el repositorio incluye un sistema SEO de tres documentos con reglas explícitas anti-alucinación.",
      "problem": "Un producto de colaboración inmersiva compite contra categorías que el comprador ya conoce y contra una objeción implícita: \"ya tengo videollamadas\". El problema real no era tener un sitio, sino tener uno que pudiera sostener una tesis de posicionamiento página por página, en varios idiomas, para varios segmentos, y que además fuera encontrable — no sólo por buscadores, sino por los motores de respuesta que hoy median parte de la investigación B2B.\nEl precio se define una sola vez en USD y se convierte y formatea en el render, de modo que los datos estructurados y la tabla visible leen la misma constante y no pueden desincronizarse. La moneda se decide por un país resuelto en middleware desde cualquiera de cuatro headers de geolocalización posibles, normalizados a un header interno que se borra antes de escribirse para que un cliente no pueda falsear su país. La capa de i18n sirve los tres idiomas desde la misma URL con un deep merge sobre el catálogo inglés, así una página sin traducir cae a inglés legible en vez de imprimir la ruta de la clave.\nSe construyó a medida en vez de usar un builder porque la mitad del valor está en cosas que esas herramientas no dan: precios sensibles a geolocalización resueltos en el servidor, un catálogo de 1.689 claves con fallback jerárquico, datos estructurados derivados de las mismas constantes que la UI, y headers de seguridad razonados uno por uno.",
      "role": "Full-stack Engineer",
      "engagement": "Colaboración con equipo",
      "industry": "Colaboración inmersiva • SaaS de espacios de trabajo virtuales",
      "locations": [
        {
          "flag": "🇨🇦",
          "label": "Ontario, Canadá"
        },
        {
          "flag": "🌍",
          "label": "Internacional (EN / FR / ES)"
        }
      ],
      "category": "landing",
      "featured": true,
      "latest": true,
      "stack": [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "Tailwind CSS v4",
        "next-intl",
        "Strapi",
        "Zod",
        "Postmark",
        "JSON-LD",
        "Docker",
        "Bitbucket Pipelines",
        "Cloudflare"
      ],
      "image": "/img/img/globaly-web/globaly-01.webp",
      "screenshots": [
        "/img/img/globaly-web/globaly-01.webp",
        "/img/img/globaly-web/globaly-02.webp",
        "/img/img/globaly-web/globaly-03.webp",
        "/img/img/globaly-web/globaly-04.webp",
        "/img/img/globaly-web/globaly-05.webp",
        "/img/img/globaly-web/globaly-06.webp"
      ],
      "liveUrl": "https://getglobaly.com",
      "repoUrl": null,
      "caseStudyUrl": "/projects/globaly"
    },
    {
      "slug": "red-lizard-studioz",
      "title": "Red Lizard Studioz",
      "subtitle": "Plataforma multi-tenant de contenido con IA y venta conversacional",
      "description": "Plataforma multi-tenant que una agencia de marketing opera para los negocios de sus clientes. Cada cliente es dueño del contenido de su blog, su base de conocimiento, sus agentes de chat, su pipeline de leads y, opcionalmente, su propio proveedor de LLM y su clave. Dos aplicaciones desplegadas sobre un modelo de tenant compartido, con pipelines de escritura con IA por etapas, RAG por tenant sobre los documentos subidos, y agentes de chat cuyas herramientas se autorizan en cada llamada en lugar de prometerse en el prompt.",
      "summary": "Red Lizard Studioz es una plataforma multi-tenant que una agencia de marketing opera en nombre de los negocios de sus clientes. Cada cliente es un tenant: es dueño de su contenido, su base de conocimiento, sus agentes de chat, su identidad de marca, su pipeline de leads y — opcionalmente — su propio proveedor de LLM y su clave.\nDentro de la plataforma, un operador genera artículos SEO a través de un pipeline de escritura por etapas, mantiene una base de conocimiento por tenant a partir de documentos subidos, y configura un widget de chat embebible que responde preguntas de visitantes desde ese conocimiento y captura leads. Las conversaciones retroalimentan el sistema: las preguntas que el asistente no pudo responder se puntúan y aparecen como ideas de artículo.\nLa superficie de control es inusualmente profunda para este tipo de producto. Los operadores pueden editar los prompts de sistema que gobiernan al redactor, al agente de imágenes y a cada agente de chat — como bloques en capas con un default de código, una sobreescritura global y otra por tenant.",
      "problem": "Una agencia que hace content marketing para muchos negocios chicos choca siempre contra la misma pared: cada cliente necesita artículos alineados a su marca, un sitio que refleje sus servicios reales, y algo que capte a los visitantes que ese esfuerzo trae. Las herramientas genéricas de escritura con IA producen texto fluido pero equivocado — inventan servicios que el negocio no vende y citan precios que nadie aprobó.\nLa plataforma convierte el conocimiento del propio negocio en la fuente de verdad, y lo impone en código en vez de en la redacción del prompt. Documentos, servicios y perfil se embeben en un vector store donde la recuperación exige un id de tenant no vacío antes de ejecutar la consulta. Los artículos escritos por IA quedan excluidos de los pasajes factuales sobre los que razona el chatbot, y cada respuesta pasa por un verificador de cumplimiento antes de que el visitante vea una palabra.\nEl desarrollo a medida se justifica por lo que una herramienta lista no puede dar: soberanía de LLM por tenant entre seis proveedores, edición a nivel de prompt, y un modelo de datos donde un lead, una conversación, un artículo y un documento pertenecen al mismo tenant.",
      "role": "Full-stack Engineer",
      "engagement": "Colaboración con equipo",
      "industry": "Tecnología de marketing • SaaS para agencias",
      "locations": [
        {
          "flag": "🇨🇦",
          "label": "Ontario, Canadá"
        }
      ],
      "category": "platform",
      "featured": true,
      "latest": true,
      "stack": [
        "Next.js 15",
        "React 19",
        "TypeScript",
        "Tailwind CSS 4",
        "TanStack Query",
        "Strapi 5",
        "Node.js",
        "PostgreSQL 17",
        "pgvector",
        "OpenAI SDK",
        "AG-UI (SSE)",
        "Google OAuth",
        "JWT",
        "Postmark",
        "Docker",
        "Linode",
        "Cloudflare"
      ],
      "image": "/img/img/redlizard-web/redlizard-01.webp",
      "screenshots": [
        "/img/img/redlizard-web/redlizard-01.webp",
        "/img/img/redlizard-web/redlizard-02.webp",
        "/img/img/redlizard-web/redlizard-03.webp",
        "/img/img/redlizard-web/redlizard-04.webp",
        "/img/img/redlizard-web/redlizard-05.webp",
        "/img/img/redlizard-web/redlizard-06.webp"
      ],
      "liveUrl": null,
      "repoUrl": null,
      "caseStudyUrl": "/projects/red-lizard-studioz"
    },
    {
      "slug": "comply-dq-site",
      "title": "ComplyDQ — Sitio institucional",
      "subtitle": "Sitio de compliance DOT con herramientas interactivas de evaluación",
      "description": "Sitio de marketing y captación de una plataforma de gestión de legajos de conductores DOT para empresas de transporte y equipos de compliance. Tres herramientas de dominio que calculan enteramente en el navegador, un blog con CMS acotado por tenant, y un despliegue blue-green con validación a nivel de assets, rollback automático y precalentamiento de la caché del CDN.",
      "summary": "El sitio público de ComplyDQ es la superficie de marketing y captación de una plataforma de gestión de legajos de conductores DOT, orientada a empresas de transporte, responsables de seguridad de flota y consultores de compliance. Es deliberadamente una capa de presentación: el producto autenticado vive en otro subdominio y otro repositorio.\nLos visitantes pueden usar tres herramientas interactivas autocontenidas: una evaluación de preparación ante auditoría que puntúa la exposición con preguntas ponderadas, una calculadora de ROI que modela costo administrativo anual y período de repago, y un checklist de legajo derivado del 49 CFR Parte 391. Las tres calculan enteramente en el navegador — nada se envía ni se almacena.\nEl peso de ingeniería está en la entrega más que en la lógica de aplicación: self-hosted detrás de nginx y un CDN, desplegado por un script blue-green con detección de slot, validación de assets y rollback automático.",
      "problem": "El sitio migró desde una instalación WordPress heredada cuyo índice de búsqueda había sido comprometido por una inyección de spam SEO, y donde sólo nueve páginas tenían contenido real que valía la pena preservar. La presencia del dominio en buscadores jugaba activamente en contra del negocio.\nLa reconstrucción trata la higiene del índice como una cuestión de despliegue. En vez de redirigir todo en bloque, la migración distingue intención: las páginas legítimas reciben redirecciones permanentes mientras que las URLs de spam devuelven 410 Gone, porque un 301 transferiría la reputación acumulada del spam al dominio nuevo. La indexabilidad se deriva del propio dominio del build y se verifica en ambas direcciones al desplegar, porque un noindex en producción no produce ningún síntoma visible y recién aparece semanas después.\nEl desarrollo a medida se desprende de dos restricciones: las herramientas codifican lógica de dominio real citada a fuentes primarias, y la calculadora de precios debe mantenerse numéricamente idéntica a la facturación real de la plataforma.",
      "role": "Full-stack Engineer",
      "engagement": "Colaboración con equipo",
      "industry": "Transporte • SaaS de compliance",
      "locations": [
        {
          "flag": "🇺🇸",
          "label": "Kansas, Estados Unidos"
        },
        {
          "flag": "🇨🇦",
          "label": "Ontario, Canadá"
        }
      ],
      "category": "landing",
      "featured": true,
      "latest": true,
      "stack": [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "CSS Modules",
        "Strapi 5",
        "DOMPurify",
        "Docker",
        "nginx",
        "Cloudflare",
        "Bitbucket Pipelines"
      ],
      "image": "/img/img/cdq-site-web/cdqsite-01.webp",
      "screenshots": [
        "/img/img/cdq-site-web/cdqsite-01.webp",
        "/img/img/cdq-site-web/cdqsite-02.webp",
        "/img/img/cdq-site-web/cdqsite-03.webp",
        "/img/img/cdq-site-web/cdqsite-04.webp",
        "/img/img/cdq-site-web/cdqsite-05.webp",
        "/img/img/cdq-site-web/cdqsite-06.webp"
      ],
      "liveUrl": "https://www.complydq.com",
      "repoUrl": null,
      "caseStudyUrl": "/projects/comply-dq-site"
    },
    {
      "slug": "royal-parking-services",
      "title": "Royal Parking Services",
      "subtitle": "Sitio de control de estacionamiento y portal de permisos",
      "description": "Sitio público y portal de clientes de una empresa de control de estacionamiento que administra playas privadas. Atiende dos audiencias desde una sola aplicación: conductores que pagan una infracción mediante un checkout con Stripe donde el monto lo decide el servidor y 3-D Secure se resuelve por dos caminos, y administradores de propiedades que gestionan permisos, vehículos, tarjetas guardadas y facturas.",
      "summary": "Royal Parking Services es el sitio público y el portal de clientes de una empresa de control de estacionamiento de Columbia Británica que administra playas privadas para consorcios, centros comerciales, oficinas y clínicas. El sistema atiende dos audiencias distintas desde una sola aplicación.\nLos conductores usan un checkout público de cuatro pasos para buscar una infracción por patente o número de acta, revisar la infracción junto a las fotos de la cartelería del lugar, seleccionar una o varias actas pendientes y pagar con tarjeta. Los clientes con contrato ingresan a un panel donde emiten permisos con programas horarios por día y múltiples vehículos, buscan en su registro de permisos, guardan tarjetas y revisan su historial de facturas.\nEl flujo de pago público y el panel de clientes comparten un cliente HTTP, una capa de autenticación y un design system, que es lo que mantiene coherentes un checkout de consumo masivo y un panel B2B dentro de un mismo despliegue.",
      "problem": "El control de estacionamiento privado genera dos problemas a la vez. Los conductores que reciben un acta no tienen forma autogestionada de ver la evidencia ni de pagar, así que cada infracción termina en un llamado o en una impugnación — y las impugnaciones salen caras cuando la empresa no puede mostrar de inmediato la cartelería que estaba puesta. Al mismo tiempo, los administradores no tienen visibilidad de su propio registro de permisos.\nEl flujo de pago trata al conductor como no confiable por diseño: el cliente envía sólo identificadores de acta y una patente, nunca un monto, y el backend calcula el cargo. El paso de selección muestra las reglas del lugar con fotos deduplicadas por playa — la evidencia que previene impugnaciones, mostrada antes de pagar y no después. El endpoint de confirmación es idempotente, lo que permite que la misma llamada sirva al camino directo y al retorno de 3-D Secure.\nUna solución lista no era viable porque el ciclo de vida del acta es el modelo de dominio propio de la empresa: doce estados donde la pagabilidad es una propiedad del ciclo y no un simple flag.",
      "role": "Full-stack Engineer",
      "engagement": "Colaboración con equipo",
      "industry": "Gestión de estacionamientos • Servicios inmobiliarios",
      "locations": [
        {
          "flag": "🇨🇦",
          "label": "Columbia Británica, Canadá"
        }
      ],
      "category": "platform",
      "featured": true,
      "latest": false,
      "stack": [
        "Next.js 15",
        "React 19",
        "TypeScript",
        "Tailwind CSS",
        "daisyUI",
        "Redux Toolkit",
        "react-hook-form",
        "Stripe",
        "Strapi",
        "Leaflet",
        "JWT",
        "PM2",
        "nginx"
      ],
      "image": "/img/img/royalparking-web/royalparking-01.webp",
      "screenshots": [
        "/img/img/royalparking-web/royalparking-01.webp",
        "/img/img/royalparking-web/royalparking-02.webp",
        "/img/img/royalparking-web/royalparking-03.webp",
        "/img/img/royalparking-web/royalparking-04.webp",
        "/img/img/royalparking-web/royalparking-05.webp",
        "/img/img/royalparking-web/royalparking-06.webp"
      ],
      "liveUrl": null,
      "repoUrl": null,
      "caseStudyUrl": "/projects/royal-parking-services"
    },
    {
      "slug": "sophie-callander",
      "title": "Sophie Callander Consulting",
      "subtitle": "Sitio multilingüe de una práctica de resolución de conflictos",
      "description": "Sitio profesional de una mediadora independiente y analista de equidad laboral, publicado en siete idiomas incluyendo persa de derecha a izquierda. La completitud de las traducciones la impone el compilador, y una capa de metadatos por ruta resuelve canonical, hreflang y datos estructurados que un layout compartido no puede resolver.",
      "summary": "Sophie Callander Consulting es el sitio público de una mediadora independiente y analista de equidad laboral radicada en Columbia Británica, Canadá. Se dirige a organizaciones y personas que atraviesan conflictos laborales y están evaluando a una profesional antes de dar el primer paso — una decisión que se toma por confianza y no por comparación de funcionalidades.\nLos visitantes pueden leer cuatro descripciones de servicio, seguir una sección narrativa de trayectoria, revisar credenciales y membresías verificadas, leer un FAQ, recorrer artículos traídos en vivo desde un CMS headless, y llegar a una página de contacto con enlace de agenda. Cada superficie está publicada en siete idiomas — inglés, francés, español, punjabí, hindi, chino simplificado y persa — con el persa renderizando todo el layout de derecha a izquierda.\nLa escala del trabajo está concentrada en la corrección más que en la superficie: siete locales completamente traducidos sobre ocho tipos de ruta, un sistema de traducción verificado por tipos, y una capa integral de datos estructurados y acceso para crawlers.",
      "problem": "Una profesional independiente que compite por confianza no tiene una marca en la cual apoyarse: el sitio web es la credibilidad. La práctica atiende a una población multilingüe — los conflictos laborales suelen involucrar a personas cuya primera lengua es punjabí, hindi, mandarín, persa, español o francés — y un sitio sólo en inglés excluye justamente a los participantes que una mediadora más necesita alcanzar.\nUn estado anterior del código además arrastraba defectos de SEO lo bastante graves como para dejar al sitio fuera de los resultados de búsqueda: cada página declaraba un canonical apuntando al home, los pedidos de robots y sitemap devolvían error de servidor, hreflang no renderizaba ninguna etiqueta y no había datos estructurados. El sistema lo resuelve con una resolución de metadatos por ruta que calcula canonical, las siete alternativas hreflang y las URLs sociales a partir de una ruta que cada página declara por sí misma — algo que el layout demostrablemente no puede hacer, porque no conoce su ruta hija.\nLa corrección de las traducciones la impone el compilador: el diccionario en inglés es la fuente de verdad de tipos y los otros seis locales se tipan contra él, así que una clave faltante falla el chequeo de tipos en CI antes de poder publicar un texto vacío.",
      "role": "Full-stack Engineer",
      "engagement": "Colaboración con equipo",
      "industry": "Servicios profesionales • Mediación",
      "locations": [
        {
          "flag": "🇨🇦",
          "label": "Columbia Británica, Canadá"
        }
      ],
      "category": "landing",
      "featured": true,
      "latest": false,
      "stack": [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "SCSS Modules",
        "Strapi 5",
        "Custom i18n (7 locales)",
        "JSON-LD",
        "Docker",
        "nginx",
        "Linode",
        "Cloudflare"
      ],
      "image": "/img/img/sophie-web/sophie-01.webp",
      "screenshots": [
        "/img/img/sophie-web/sophie-01.webp",
        "/img/img/sophie-web/sophie-02.webp",
        "/img/img/sophie-web/sophie-03.webp",
        "/img/img/sophie-web/sophie-04.webp",
        "/img/img/sophie-web/sophie-05.webp"
      ],
      "liveUrl": "https://sophiecallander.com",
      "repoUrl": null,
      "caseStudyUrl": "/projects/sophie-callander"
    },
    {
      "slug": "grupo-el-triunfo",
      "title": "Grupo El Triunfo",
      "subtitle": "Plataforma Corporativa de Agronegocios",
      "description": "Sitio web corporativo para un holding de agronegocios multi-unidad ubicado en Oncativo, Córdoba, Argentina. Presenta seis unidades de negocio integradas (Acopio de Granos, Logística, Agronomía, Ganadería Bonsmara, Shell Combustibles y Bar/Café) con hero de video a pantalla completa, animaciones de scroll con GSAP, theming por unidad, páginas dinámicas de detalle de servicios y diseño responsive mobile-first.",
      "summary": "Grupo El Triunfo es un sitio web corporativo para un holding de agronegocios con sede en Oncativo, Córdoba, Argentina, con más de 36 años de experiencia en el sector agropecuario.\nLa plataforma presenta seis unidades de negocio integradas — Acopio de Granos, Logística, Agronomía, Ganadería Bonsmara, Shell Combustibles y Bar/Café — mostrando sus servicios, historia e identidad de marca en una experiencia moderna y visualmente rica.\nLas funcionalidades incluyen un hero de video a pantalla completa con animaciones de entrada con GSAP, páginas dinámicas de detalle de servicios con galerías de fotos, un sistema de navegación por tabs con branding, formulario de contacto interactivo con mapa embebido, animaciones de revelado por scroll y diseño totalmente responsive mobile-first.",
      "problem": "Grupo El Triunfo necesitaba una presencia digital que reflejara la escala y profesionalismo de un grupo agropecuario multi-unidad, manteniendo la calidez y cercanía de una empresa fundada en familia.\nEl sitio resuelve esto unificando seis unidades de negocio distintas bajo una identidad visual cohesiva, con secciones dedicadas para cada servicio, un sistema de colores propio por unidad y un lenguaje de diseño anclado en la estética rural argentina — profesional pero cercano.",
      "role": "Full-stack · Sitio corporativo",
      "engagement": "Trabajo para cliente",
      "industry": "Agroindustria",
      "locations": [
        {
          "flag": "🇦🇷",
          "label": "Córdoba, Argentina"
        }
      ],
      "category": "landing",
      "featured": true,
      "latest": false,
      "stack": [
        "Next.js",
        "React",
        "TypeScript",
        "SCSS Modules",
        "GSAP",
        "ScrollTrigger",
        "Radix UI",
        "Lucide React"
      ],
      "image": "/img/img/eltriunfo-web/eltriunfo-01.webp",
      "screenshots": [
        "/img/img/eltriunfo-web/eltriunfo-01.webp",
        "/img/img/eltriunfo-web/eltriunfo-02.webp",
        "/img/img/eltriunfo-web/eltriunfo-03.webp",
        "/img/img/eltriunfo-web/eltriunfo-04.webp",
        "/img/img/eltriunfo-web/eltriunfo-05.webp",
        "/img/img/eltriunfo-web/eltriunfo-06.webp"
      ],
      "liveUrl": "https://el-triunfo.vercel.app/",
      "repoUrl": null,
      "caseStudyUrl": "/projects/grupo-el-triunfo"
    },
    {
      "slug": "home-trades-online",
      "title": "Home Trades Online",
      "subtitle": "Plataforma SaaS de Propuestas para Contratistas",
      "description": "Plataforma SaaS mobile-first que permite a contratistas y profesionales del rubro generar propuestas profesionales con IA en menos de 30 segundos. Incluye arquitectura multi-tenant con control de acceso basado en roles, generación de propuestas con IA, propuestas compartibles públicamente con firma digital, autenticación por magic link para subcontratistas e internacionalización completa (inglés/español).",
      "summary": "Home Trades Online es una plataforma SaaS mobile-first que permite a contratistas y profesionales del rubro generar propuestas profesionales con IA en menos de 30 segundos. La plataforma cierra la brecha entre los contratistas que trabajan en obra y el trabajo administrativo de crear, enviar y gestionar propuestas para clientes.\nLas funcionalidades incluyen propuestas generadas por IA con ítems y precios, propuestas compartibles públicamente mediante enlaces únicos, captura de firma digital, gestión multi-tenant con control de acceso por roles, autenticación por magic link para subcontratistas, internacionalización (inglés/español) y un sistema de referidos/invitaciones.",
      "problem": "Los contratistas dedican horas a crear propuestas manualmente, perdiendo trabajos por no poder responder a tiempo. Las herramientas existentes están orientadas a desktop y son complejas, ignorando la realidad de los profesionales que trabajan en obra, muchas veces con una sola mano y conexión móvil inestable.\nHome Trades Online resuelve este problema permitiendo al contratista describir el trabajo en lenguaje natural y recibir una propuesta profesional completa con alcance, precios detallados y términos — lista para enviar al cliente en segundos.",
      "role": "Full-stack · SaaS",
      "engagement": "Trabajo para cliente",
      "industry": "Construcción y oficios",
      "locations": [
        {
          "flag": "🇺🇸",
          "label": "California, Estados Unidos"
        }
      ],
      "category": "platform",
      "featured": true,
      "latest": false,
      "stack": [
        "Django",
        "PostgreSQL",
        "HTMX",
        "Alpine.js",
        "Tailwind CSS",
        "Docker",
        "Gunicorn",
        "Nginx",
        "Playwright",
        "GitHub Actions",
        "Google Cloud Platform"
      ],
      "image": "/img/img/HomePlatform-web/Screenshot from 2026-05-12 19-28-21.webp",
      "screenshots": [
        "/img/img/HomePlatform-web/Screenshot from 2026-05-12 19-28-21.webp",
        "/img/img/HomePlatform-web/Screenshot from 2026-05-12 19-28-32.webp",
        "/img/img/HomePlatform-web/Screenshot from 2026-05-12 19-28-37.webp",
        "/img/img/HomePlatform-web/Screenshot from 2026-05-12 19-28-47.webp",
        "/img/img/HomePlatform-web/Screenshot from 2026-05-12 19-28-58.webp",
        "/img/img/HomePlatform-web/Screenshot from 2026-05-12 19-29-41.webp"
      ],
      "liveUrl": null,
      "repoUrl": null,
      "caseStudyUrl": "/projects/home-trades-online"
    },
    {
      "slug": "salesforpro",
      "title": "Home Trades Online Landing",
      "subtitle": "Landing Page y Sitio de Marketing",
      "description": "Sitio web de marketing público para Home Trades Online, diseñado para convertir contratistas que visitan en usuarios a través de una experiencia de demo interactiva. Incluye animación de intro cinematográfica, hero interactivo multi-paso, secciones activadas por scroll, modo oscuro y experiencia bilingüe completa (inglés/español).",
      "summary": "SalesForPro es el sitio web de marketing público de Home Trades Online, diseñado para convertir contratistas que visitan en usuarios a través de una experiencia de demo interactiva del producto.\nEl sitio incluye una animación de intro cinematográfica, un hero interactivo multi-paso que permite a los visitantes probar el generador de propuestas con IA antes de registrarse, secciones con animación por scroll y una experiencia totalmente bilingüe (inglés/español). Construido como un sitio de marketing renderizado en servidor con animaciones de cliente, modo oscuro y diseño responsive mobile-first.",
      "problem": "Las landing pages SaaS para herramientas de contratistas suelen ser estáticas y genéricas, lo que dificulta comunicar rápidamente el valor del producto. Los contratistas son escépticos y necesitan ver la herramienta en acción antes de comprometerse.\nSalesForPro resuelve esto incrustando un demo del producto en vivo dentro del hero — los visitantes pueden seleccionar su rubro, ingresar su ubicación y generar una propuesta real con IA sin registrarse, transformando la propia landing en una herramienta de conversión.",
      "role": "Frontend · Landing de producto",
      "engagement": "Trabajo para cliente",
      "industry": "Construcción y oficios",
      "locations": [
        {
          "flag": "🇺🇸",
          "label": "California, Estados Unidos"
        }
      ],
      "category": "landing",
      "featured": false,
      "latest": false,
      "stack": [
        "Django Templates",
        "Tailwind CSS",
        "GSAP",
        "ScrollTrigger",
        "Alpine.js",
        "SVG",
        "Django i18n"
      ],
      "image": "/img/img/HomeWeb-web/Screenshot from 2026-05-12 19-26-22.webp",
      "screenshots": [
        "/img/img/HomeWeb-web/Screenshot from 2026-05-12 19-26-22.webp",
        "/img/img/HomeWeb-web/Screenshot from 2026-05-12 19-27-20.webp",
        "/img/img/HomeWeb-web/Screenshot from 2026-05-12 19-27-34.webp",
        "/img/img/HomeWeb-web/Screenshot from 2026-05-12 19-27-41.webp"
      ],
      "liveUrl": null,
      "repoUrl": null,
      "caseStudyUrl": "/projects/salesforpro"
    },
    {
      "slug": "starton",
      "title": "StartOn",
      "subtitle": "Plataforma de Conexión Talento-Startup",
      "description": "Una plataforma integral de conexión entre talento y startups que cuenta con paneles multi-rol, mensajería interna y capacidades avanzadas de networking.\nConstruida con Next.js 15 y React 19 para un rendimiento óptimo, TypeScript para seguridad de tipos y módulos SCSS para estilos escalables.\nIncluye autenticación con Google OAuth, backend en Supabase con Edge Functions y diseño responsive optimizado para todos los dispositivos.\nPerfecta para conectar desarrolladores, diseñadores y profesionales tecnológicos con startups y empresas innovadoras.",
      "summary": "StartOn es una plataforma innovadora que conecta desarrolladores, diseñadores y profesionales de tecnología con empresas y startups que buscan talento excepcional.\nLa plataforma democratiza el acceso a oportunidades laborales de calidad, facilitando el crecimiento profesional y el desarrollo de empresas innovadoras.\nLas características incluyen paneles diferenciados por roles, sistema de mensajería interna, networking de fundadores, blogs, filtros avanzados y paneles responsivos.",
      "problem": "El sector tecnológico carece de plataformas confiables que conecten eficientemente el talento emergente con startups y empresas.\nStartOn resuelve este problema al permitir que estudiantes, fundadores y empresas se encuentren de manera segmentada, segura y rápida, fomentando la colaboración y el crecimiento profesional.",
      "role": "Full-stack",
      "engagement": "Producto propio",
      "industry": "Empleo tech",
      "locations": [
        {
          "flag": "🇨🇱",
          "label": "Santiago, Chile"
        }
      ],
      "category": "platform",
      "featured": true,
      "latest": false,
      "stack": [
        "Next.js",
        "React",
        "TypeScript",
        "SCSS",
        "Supabase",
        "Google OAuth"
      ],
      "image": "/img/img/StartOn/StartA.webp",
      "screenshots": [
        "/img/img/StartOn/StartA.webp",
        "/img/img/StartOn/startb.webp",
        "/img/img/StartOn/startd.webp",
        "/img/img/StartOn/startj.webp",
        "/img/img/StartOn/starto.webp",
        "/img/img/StartOn/Starttttt.webp"
      ],
      "liveUrl": "https://www.starton.it.com/",
      "repoUrl": "https://github.com/Fransei29/starton",
      "caseStudyUrl": "/projects/starton"
    },
    {
      "slug": "mi-agenda",
      "title": "Mi Agenda",
      "subtitle": "Plataforma de Reservas y Turnos Online",
      "description": "Turnero (Mi Agenda) es una plataforma que permite a proveedores de servicios gestionar su agenda y a los clientes reservar turnos online. Incluye flujo público de reserva por servicio, integración con Google Calendar, pagos con MercadoPago, notificaciones (email, push, opcionalmente SMS/WhatsApp) y PWA instalable con recordatorios y acceso offline.",
      "summary": "Turnero es una plataforma que permite a proveedores de servicios gestionar su agenda y a sus clientes reservar turnos online. Incluye flujo público de reserva por servicio, integración con Google Calendar para evitar conflictos, pagos con MercadoPago (pago único y suscripciones), notificaciones (email, push y opcionalmente SMS/WhatsApp) y una PWA instalable («Mi agenda») con recordatorios y acceso offline.\nLa solución centraliza disponibilidad recurrente y puntual, pagos, recordatorios y panel de administración en un solo producto, mejorando la experiencia tanto del proveedor como del cliente.",
      "problem": "Muchos profesionales y negocios siguen dependiendo de mensajes, llamadas o planillas para gestionar turnos, lo que genera errores, no-shows y falta de trazabilidad. Turnero aborda esto ofreciendo reserva autoservicio por web, disponibilidad clara, integración con calendario, pagos online y notificaciones automáticas, reduciendo la carga operativa y las reservas perdidas.",
      "role": "Full-stack · Pagos e integraciones",
      "engagement": "Trabajo para cliente",
      "industry": "Servicios con turnos",
      "locations": [
        {
          "flag": "🇦🇷",
          "label": "Córdoba, Argentina"
        }
      ],
      "category": "product",
      "featured": false,
      "latest": false,
      "stack": [
        "Next.js",
        "React",
        "TypeScript",
        "Redux Toolkit",
        "SCSS",
        "Tailwind CSS",
        "MUI",
        "NestJS",
        "Prisma",
        "MySQL",
        "Redis",
        "MercadoPago",
        "Google Calendar API",
        "Socket.io",
        "Docker"
      ],
      "image": "/img/img/Miagenda/A.webp",
      "screenshots": [
        "/img/img/Miagenda/A.webp",
        "/img/img/Miagenda/Screenshot from 2026-03-04 14-39-03.webp",
        "/img/img/Miagenda/Screenshot from 2026-03-04 14-39-09.webp",
        "/img/img/Miagenda/Screenshot from 2026-03-04 14-39-14.webp",
        "/img/img/Miagenda/Screenshot from 2026-03-04 14-39-21.webp",
        "/img/img/Miagenda/Screenshot from 2026-03-04 14-39-27.webp"
      ],
      "liveUrl": "https://miagenda.site/",
      "repoUrl": null,
      "caseStudyUrl": "/projects/mi-agenda"
    },
    {
      "slug": "augusto-fit-program",
      "title": "Augusto Fit Program",
      "subtitle": "Sitio web para entrenador personal",
      "description": "Sitio web corporativo para un entrenador personal con planes de entrenamiento personalizados, historias de transformación y contacto directo. Incluye servicios, testimonios con carrusel infinito en mobile, sección de hábitos y estadísticas, planes y formulario de contacto con EmailJS. Diseño oscuro con animaciones GSAP y experiencia responsive mobile-first. La arquitectura está preparada para escalar a una tienda online.",
      "summary": "Sitio web corporativo para un entrenador personal que ofrece planes de entrenamiento personalizados, historias de transformación y contacto directo. La plataforma presenta servicios, testimonios con carrusel infinito en mobile, sección de hábitos y estadísticas, planes de entrenamiento y formulario de contacto integrado con EmailJS. El diseño es oscuro, con animaciones (GSAP), tipografía con next/font y experiencia responsive mobile-first.\nLa arquitectura está lista para ser escalada a una tienda online (por ejemplo compra de planes, área de miembros) si el cliente decide hacer crecer el producto.",
      "problem": "Un entrenador personal necesitaba una presencia web profesional que transmitiera confianza, mostrara resultados reales (testimonios y fotos de transformación) y facilitara que potenciales clientes se contacten o conozcan los planes, sin depender solo de redes sociales.\nAugusto Fit Program resuelve esto con una landing clara, secciones de valor (hábitos, estadísticas), testimonios en carrusel continuo que en mobile mantienen siempre contenido visible en dos filas con direcciones opuestas, y CTA hacia planes y contacto (incluido botón flotante de WhatsApp).",
      "role": "Full-stack · Sitio corporativo",
      "engagement": "Trabajo para cliente",
      "industry": "Fitness y entrenamiento",
      "locations": [
        {
          "flag": "🇦🇷",
          "label": "Córdoba, Argentina"
        }
      ],
      "category": "landing",
      "featured": false,
      "latest": false,
      "stack": [
        "Next.js",
        "React",
        "TypeScript",
        "SCSS Modules",
        "GSAP",
        "next/font (Google Fonts)",
        "EmailJS",
        "Vercel"
      ],
      "image": "/img/img/Augusto/A.webp",
      "screenshots": [
        "/img/img/Augusto/A.webp",
        "/img/img/Augusto/Screenshot from 2026-03-04 14-34-50.webp",
        "/img/img/Augusto/Screenshot from 2026-03-04 14-34-58.webp",
        "/img/img/Augusto/Screenshot from 2026-03-04 14-35-05.webp",
        "/img/img/Augusto/Screenshot from 2026-03-04 14-35-11.webp",
        "/img/img/Augusto/Screenshot from 2026-03-04 14-35-19.webp"
      ],
      "liveUrl": "https://www.augustoluque.com/",
      "repoUrl": null,
      "caseStudyUrl": "/projects/augusto-fit-program"
    },
    {
      "slug": "tecnomar",
      "title": "TecnoMar",
      "subtitle": "Sitio web corporativo – Bombas industriales",
      "description": "Sitio corporativo para TecnoMar, empresa especializada en diagnóstico, reparación y reacondicionamiento de bombas sanitarias e industriales. La web presenta servicios, metodología de trabajo y proceso técnico, y acerca a clientes y empresas mediante CTAs claros (cotizador online y contacto). Incluye secciones de enfoque, clientes con logos en marquesina y mapa de contacto, con diseño responsive y alineado a la identidad de marca.",
      "summary": "Sitio corporativo para TecnoMar, empresa especializada en diagnóstico, reparación y reacondicionamiento de bombas sanitarias e industriales. La web presenta servicios, metodología de trabajo y proceso técnico, y acerca a clientes y empresas mediante CTAs claros (cotizador online y contacto). Incluye secciones de enfoque, clientes con logos en marquesina y mapa de contacto, con diseño responsive y alineado a la identidad de marca.",
      "problem": "El sector industrial necesita sitios que transmitan solidez técnica y permitan solicitar cotización o contacto de forma directa. TecnoMar necesitaba una presencia digital clara: explicar servicios y proceso, mostrar experiencia (+20 años, +50 clientes activos, +2000 productos) y ofrecer un cotizador y vías de contacto sin fricciones.",
      "role": "Full-stack · Sitio corporativo",
      "engagement": "Trabajo para cliente",
      "industry": "Industrial",
      "locations": [
        {
          "flag": "🇦🇷",
          "label": "Buenos Aires, Argentina"
        }
      ],
      "category": "landing",
      "featured": false,
      "latest": false,
      "stack": [
        "Next.js",
        "React",
        "TypeScript",
        "SCSS Modules",
        "CSS Variables",
        "Next/Image"
      ],
      "image": "/img/img/Tecnomar/A.webp",
      "screenshots": [
        "/img/img/Tecnomar/A.webp",
        "/img/img/Tecnomar/Screenshot from 2026-03-13 17-52-30.webp",
        "/img/img/Tecnomar/Screenshot from 2026-03-13 17-52-47.webp",
        "/img/img/Tecnomar/Screenshot from 2026-03-13 17-52-51.webp",
        "/img/img/Tecnomar/Screenshot from 2026-03-13 17-53-00.webp",
        "/img/img/Tecnomar/Screenshot from 2026-03-13 17-53-12.webp"
      ],
      "liveUrl": "https://www.tecno-mar.com.ar/",
      "repoUrl": null,
      "caseStudyUrl": "/projects/tecnomar"
    },
    {
      "slug": "ateevo-wholesale",
      "title": "Ateevo Wholesale",
      "subtitle": "Plataforma B2B de Comercio Electrónico para Moda",
      "description": "Plataforma B2B de comercio electrónico diseñada para marcas de moda que gestionan operaciones mayoristas. Desarrollada para un cliente en Canadá.\nPermite a clientes mayoristas navegar catálogos estacionales, realizar pedidos y hacer seguimiento de envíos, mientras proporciona a administradores herramientas para gestión de productos, inventario, procesamiento de pedidos y relaciones con clientes.\nDiseñada como aplicación SaaS multi-tenant, soportando múltiples marcas independientes con aislamiento completo de datos y branding personalizado por tenant.",
      "summary": "Ateevo Wholesale es una plataforma B2B de comercio electrónico para marcas de moda que gestionan operaciones mayoristas. Desarrollada para un cliente en Canadá.\n\nLa plataforma permite a clientes mayoristas navegar catálogos estacionales, realizar pedidos y hacer seguimiento de envíos, mientras proporciona a los administradores herramientas para gestión de productos, inventario, procesamiento de pedidos y relaciones con clientes.\n\nArquitectura SaaS multi-tenant soportando múltiples marcas independientes con aislamiento completo de datos y branding white-label personalizable.\n\nCaracterísticas Clave:\n\n• Arquitectura Multi-Tenant con bases de datos PostgreSQL aisladas y branding personalizable\n• Contratos Digitales con firmas capturadas en canvas y generación automática de PDF\n• Notificaciones en Tiempo Real con centro de alertas y notificaciones persistentes\n• Reportes Avanzados: Availability y Margin Reports con soporte multi-moneda (USD, CAD, MXN)\n• Gestión de Temporadas con fechas de disponibilidad, pre-orders y fechas estimadas de envío\n• Precios Multi-Moneda (USD, CAD, MXN) con MSRP y conversión automática\n• Gestión Completa de Pedidos desde New hasta Invoice Paid con exportación PDF\n• Sistema Avanzado de Inventario con múltiples métricas (On Hand, Available to Sell, Available to Ship)\n• Catálogo de Productos con múltiples imágenes, variantes automáticas y códigos SKU/MFC\n• Gestión de Clientes con múltiples direcciones, facturación e historial completo\n• Dashboard y Analytics con métricas configurables y gráficos de tendencias\n• Panel de Super Administración para gestión de múltiples tenants y creación de bases de datos\n• Seguridad Empresarial con autenticación JWT, passwords hasheados y permisos por rol",
      "problem": "El sector de la moda mayorista carece de plataformas modernas que conecten eficientemente a marcas con sus clientes mayoristas.\n\nAteevo Wholesale resuelve este problema permitiendo a las marcas gestionar su catálogo, inventario y pedidos de forma centralizada, mientras que los clientes pueden navegar, ordenar y hacer seguimiento de sus compras de manera intuitiva, todo con contratos digitales firmados y reportes avanzados de márgenes y disponibilidad.\n\nLa arquitectura multi-tenant permite escalar el negocio soportando múltiples marcas en una sola plataforma con seguridad y personalización completa.\n\nEsta plataforma entrega una solución completa de comercio electrónico B2B para la industria de la moda. Las marcas pueden gestionar su negocio mayorista de extremo a extremo, desde catálogo hasta facturación, mientras que los clientes disfrutan de una experiencia de compra moderna, intuitiva y completamente personalizada. El sistema de contratos digitales, reportes avanzados y arquitectura multi-tenant hacen de Ateevo Wholesale una solución enterprise-ready que escala con el crecimiento del negocio.",
      "role": "Full-stack · B2B e-commerce",
      "engagement": "Trabajo para cliente",
      "industry": "Moda mayorista",
      "locations": [
        {
          "flag": "🇨🇦",
          "label": "Canadá"
        }
      ],
      "category": "platform",
      "featured": true,
      "latest": false,
      "stack": [
        "React",
        "TypeScript",
        "Vite",
        "SCSS Modules",
        "Tailwind CSS",
        "shadcn/ui",
        "React Router",
        "Node.js",
        "Express",
        "TypeORM",
        "PostgreSQL",
        "JWT",
        "bcrypt",
        "Google Cloud Storage",
        "jsPDF",
        "Resend",
        "React Email"
      ],
      "image": "/atevo/A.webp",
      "screenshots": [
        "/atevo/A.webp",
        "/atevo/120shots_so.webp",
        "/atevo/257shots_so.webp",
        "/atevo/289shots_so.webp",
        "/atevo/316shots_so.webp",
        "/atevo/446shots_so.webp"
      ],
      "liveUrl": null,
      "repoUrl": null,
      "caseStudyUrl": "/projects/ateevo-wholesale"
    },
    {
      "slug": "lexmax",
      "title": "LexMax",
      "subtitle": "Plataforma de Gestión Judicial",
      "description": "Una plataforma web para la gestión de expedientes judiciales que automatiza tareas y mejora la productividad de estudios jurídicos.\nIncluye gestión de expedientes, cédulas y operaciones, seguimiento de eventos con IA, gestión de escritos, notificaciones por Gmail y Telegram, filtros avanzados, dashboard con estadísticas y gráficos, y un sistema de autenticación seguro.\nLa plataforma centraliza la información judicial y facilita el seguimiento de casos.",
      "summary": "LEXMAX es una plataforma web para la gestión de expedientes judiciales que automatiza tareas y mejora la productividad de estudios jurídicos.\nIncluye gestión integral de expedientes, seguimiento de cédulas y operaciones, monitoreo de eventos con IA que detecta eventos relevantes y sugiere acciones, gestión de escritos, notificaciones automatizadas vía Gmail y Telegram, filtros avanzados y capacidades de búsqueda, un dashboard con estadísticas y gráficos, y un sistema de autenticación seguro.\nLa plataforma centraliza toda la información judicial y facilita el seguimiento eficiente de casos.",
      "problem": "Los estudios jurídicos enfrentan dificultades para organizar y seguir expedientes, cédulas y operaciones.\nLEXMAX resuelve esto centralizando la información, automatizando notificaciones, usando IA para detectar eventos relevantes y proponer acciones, y ofreciendo filtros avanzados y búsquedas para encontrar información rápidamente, mejorando la eficiencia y reduciendo errores.",
      "role": "Full-stack · Automatización con IA",
      "engagement": "Trabajo para cliente",
      "industry": "Legal",
      "locations": [
        {
          "flag": "🇪🇸",
          "label": "Andalucía, España"
        }
      ],
      "category": "platform",
      "featured": false,
      "latest": false,
      "stack": [
        "React",
        "Vite",
        "SCSS",
        "React Router",
        "Axios",
        "Node.js",
        "Express",
        "JWT",
        "Google OAuth",
        "Telegram API"
      ],
      "image": "/img/img/Lex/LexA.webp",
      "screenshots": [
        "/img/img/Lex/LexA.webp",
        "/img/img/Lex/LexB.webp",
        "/img/img/Lex/LexC.webp",
        "/img/img/Lex/LexD.webp",
        "/img/img/Lex/LexE.webp",
        "/img/img/Lex/LexF.webp"
      ],
      "liveUrl": null,
      "repoUrl": null,
      "caseStudyUrl": "/projects/lexmax"
    },
    {
      "slug": "property-recommender",
      "title": "Habita",
      "subtitle": "Sistema de Recomendación de Propiedades",
      "description": "Sistema de recomendación de propiedades desarrollado con Next.js 15 y TypeScript.\nUtiliza SCSS modular para un diseño limpio y escalable.\nOptimizado para rendimiento y experiencia de usuario.\nIdeal para inmobiliarias, startups de real estate o como base para productos de recomendación personalizados.",
      "summary": "Una aplicación web que recomienda propiedades inmobiliarias basándose en las preferencias del usuario y algoritmos de similitud.\nPermite a los usuarios filtrar, ordenar y descubrir propiedades que coincidan con sus necesidades a través de una interfaz limpia y responsive.\nConstruida con Next.js 15 y TypeScript, con SCSS modular para estilos escalables y optimizada para carga rápida y experiencia de usuario.\nIncluye un panel de administración donde los usuarios pueden ver y gestionar sus propiedades favoritas.",
      "problem": "Muchas plataformas inmobiliarias abruman a los usuarios con demasiadas listas sin filtrado efectivo o sugerencias personalizadas.\nEsta aplicación resuelve eso proporcionando recomendaciones dirigidas, mejorando la satisfacción del usuario y la eficiencia en la toma de decisiones.\nEl panel de administración permite a los usuarios rastrear y gestionar fácilmente sus propiedades favoritas en un lugar centralizado.",
      "role": "Full-stack",
      "engagement": "Producto propio",
      "industry": "Inmobiliario",
      "locations": [],
      "category": "product",
      "featured": false,
      "latest": false,
      "stack": [
        "Next.js",
        "React",
        "TypeScript",
        "SCSS"
      ],
      "image": "/img/img/Habita/habitaA.webp",
      "screenshots": [
        "/img/img/Habita/habitaA.webp",
        "/img/img/Habita/habitaj.webp",
        "/img/img/Habita/habitax.webp",
        "/img/img/Habita/habita.webp"
      ],
      "liveUrl": "https://property-recommenderv2.vercel.app/",
      "repoUrl": "https://github.com/Fransei29/property-recommenderv2",
      "caseStudyUrl": "/projects/property-recommender"
    },
    {
      "slug": "event-scheduler",
      "title": "Event Scheduler",
      "subtitle": "Plataforma de Reserva de Eventos y Gestión de Venues",
      "description": "Event Scheduler es una plataforma full-stack que conecta organizadores de eventos con venues (espacios para eventos). Desarrollada para un cliente en Canadá.\nLa plataforma incluye dos interfaces: un portal de administración para que los venues configuren sus espacios mediante un proceso de onboarding de 13 pasos, y un sitio web público donde los usuarios pueden descubrir, configurar y reservar espacios para sus eventos.\nLas características incluyen gestión de espacios y amenidades, cálculo de precios en tiempo real, integración de mapas interactivos, galerías de imágenes, paquetes de catering personalizables, gestión de proveedores preferidos, sistema de políticas y restricciones, gestión y visualización de contratos (PDF, Word, SVG) con aceptación de términos, procesamiento de pagos con Stripe y tarjetas de crédito/débito, auto-guardado con protección contra pérdida de datos, validación en tiempo real en todos los formularios, sistema de accesibilidad (ADA/ACA compliance), gestión de horarios y disponibilidad, coordinación de eventos, preview completo antes de finalizar, y diseño responsivo.",
      "summary": "Event Scheduler es una plataforma full-stack que conecta organizadores de eventos con venues (espacios para eventos).\nLa plataforma incluye dos interfaces: un portal de administración para que los venues configuren sus espacios mediante un proceso de onboarding de 13 pasos con validación y auto-guardado, y un sitio web público donde los usuarios pueden descubrir, configurar y reservar espacios para sus eventos.\nLas características incluyen gestión de espacios y amenidades, cálculo de precios en tiempo real, integración de mapas interactivos con Leaflet, galerías de imágenes con Google Cloud Storage, paquetes de catering personalizables, gestión de proveedores preferidos, sistema de políticas y restricciones, gestión y visualización de contratos (PDF, Word, SVG) con aceptación de términos, procesamiento de pagos con Stripe y tarjetas de crédito/débito, auto-guardado con protección contra pérdida de datos, validación en tiempo real en todos los formularios, sistema de accesibilidad (ADA/ACA compliance), gestión de horarios y disponibilidad, coordinación de eventos, preview completo antes de finalizar, y diseño completamente responsivo.",
      "problem": "El mercado de reserva de espacios para eventos carece de plataformas integrales que faciliten tanto la gestión de venues como la experiencia de reserva para clientes.\nEvent Scheduler resuelve este problema al ofrecer un sistema dual que permite a los propietarios de venues configurar completamente sus espacios mediante un proceso guiado paso a paso con validación y auto-guardado, mientras que los organizadores de eventos pueden descubrir y reservar espacios de manera intuitiva, con información detallada sobre capacidad, amenidades, precios, disponibilidad, políticas y contratos, todo en una sola plataforma con procesamiento de pagos seguro.",
      "role": "Full-stack",
      "engagement": "Producto propio",
      "industry": "Eventos y espacios",
      "locations": [
        {
          "flag": "🇨🇦",
          "label": "Canadá"
        }
      ],
      "category": "platform",
      "featured": true,
      "latest": false,
      "stack": [
        "Next.js",
        "React",
        "TypeScript",
        "SCSS",
        "Node.js",
        "Express",
        "PostgreSQL",
        "TypeORM",
        "Framer Motion",
        "Leaflet",
        "Google Cloud Storage",
        "Stripe",
        "Jest",
        "React Testing Library",
        "Playwright",
        "Vercel"
      ],
      "image": "/img/img/Event/eventA.webp",
      "screenshots": [
        "/img/img/Event/eventA.webp",
        "/img/img/Event/eventb.webp",
        "/img/img/Event/eventbb.webp",
        "/img/img/Event/eventc.webp",
        "/img/img/Event/eventd.webp",
        "/img/img/Event/evente.webp"
      ],
      "liveUrl": null,
      "repoUrl": null,
      "caseStudyUrl": "/projects/event-scheduler"
    },
    {
      "slug": "the-club-northfield",
      "title": "The Club at Northfield",
      "subtitle": "Sitio Web Corporativo para Club Deportivo - Ontario, Canadá",
      "description": "Sitio web corporativo para The Club at Northfield, un club de deportes de raqueta y fitness en Kitchener-Waterloo, Ontario, Canadá.\nIncluye integración con CMS para gestión de contenido, sistema de eventos dinámico, secciones de servicios y atletismo, planes de membresía, FAQ interactiva y diseño responsivo.\nEl sitio está optimizado para exportación estática y ofrece una experiencia de usuario fluida con carruseles de banners, navegación intuitiva y componentes modulares.",
      "summary": "Sitio web corporativo para The Club at Northfield, un club de deportes de raqueta y fitness en Kitchener-Waterloo, Ontario, Canadá.\nIncluye integración con CMS Strapi para gestión de contenido, sistema de eventos dinámico, secciones de servicios y atletismo, planes de membresía, FAQ interactiva y diseño completamente responsivo.\nEl sitio está optimizado para exportación estática y ofrece una experiencia de usuario fluida con carruseles de banners, navegación intuitiva y componentes modulares que aseguran actualizaciones de contenido fáciles sin intervención técnica.",
      "problem": "Crear una presencia web que muestre las instalaciones, servicios y eventos del club, facilitando la información a miembros y visitantes.\nEl sitio integra un CMS para que el equipo actualice contenido sin intervención técnica, manteniendo la información actualizada sobre eventos, servicios, planes de membresía y el equipo.",
      "role": "Full-stack · CMS con Strapi",
      "engagement": "Trabajo para cliente",
      "industry": "Deportes y fitness",
      "locations": [
        {
          "flag": "🇨🇦",
          "label": "Canadá"
        }
      ],
      "category": "landing",
      "featured": false,
      "latest": false,
      "stack": [
        "Next.js",
        "React",
        "TypeScript",
        "SCSS",
        "Tailwind CSS",
        "Strapi CMS",
        "Vercel"
      ],
      "image": "/img/img/Club/GymA.webp",
      "screenshots": [
        "/img/img/Club/GymA.webp",
        "/img/img/Club/GymB.webp",
        "/img/img/Club/GymC.webp",
        "/img/img/Club/GymD.webp",
        "/img/img/Club/GymE.webp",
        "/img/img/Club/GymF.webp"
      ],
      "liveUrl": "https://www.theclubatnorthfield.com/",
      "repoUrl": null,
      "caseStudyUrl": "/projects/the-club-northfield"
    },
    {
      "slug": "lexmax-landing",
      "title": "LexMax Landing",
      "subtitle": "Landing Page de Automatización Legal",
      "description": "LEXMAX es una landing page profesional para una plataforma de automatización jurídica que conecta despachos legales con soluciones tecnológicas inteligentes.\nLa página presenta servicios de automatización legal, incluyendo gestión de expedientes, bots inteligentes, generación de escritos masivos y análisis con IA.\nLas características incluyen sección hero con estadísticas de impacto, presentación de 6 servicios principales, sección sobre la empresa con propósito y visión, formulario de contacto interactivo con funcionalidad de copiar datos, navegación responsive con menú hamburguesa, diseño moderno con efectos visuales y componentes modulares reutilizables.",
      "summary": "LEXMAX es una landing page profesional para una plataforma de automatización jurídica que conecta despachos legales con soluciones tecnológicas inteligentes.\nLa página presenta servicios de automatización legal, incluyendo gestión de expedientes, bots inteligentes, generación de escritos masivos y análisis con IA.\nLas características incluyen sección hero con estadísticas de impacto, presentación de 6 servicios principales, sección sobre la empresa con propósito y visión, formulario de contacto interactivo con funcionalidad de copiar datos, navegación responsive con menú hamburguesa, diseño moderno con efectos visuales y componentes modulares reutilizables.",
      "problem": "El sector legal tradicional carece de presencia digital efectiva para comunicar soluciones tecnológicas innovadoras.\nLEXMAX resuelve este problema al proporcionar una landing page que presenta de manera clara y profesional las capacidades de automatización legal, facilitando la conversión de visitantes en clientes potenciales mediante un diseño atractivo, información estructurada y call-to-actions estratégicos que destacan los beneficios de la plataforma.",
      "role": "Frontend · Landing de producto",
      "engagement": "Trabajo para cliente",
      "industry": "Legal",
      "locations": [
        {
          "flag": "🇪🇸",
          "label": "Andalucía, España"
        }
      ],
      "category": "landing",
      "featured": false,
      "latest": false,
      "stack": [
        "Next.js",
        "React",
        "SCSS",
        "Tailwind CSS",
        "React Icons"
      ],
      "image": "/img/img/WebLex/WebA.webp",
      "screenshots": [
        "/img/img/WebLex/WebA.webp",
        "/img/img/WebLex/WebB.webp",
        "/img/img/WebLex/WebC.webp",
        "/img/img/WebLex/WebE.webp",
        "/img/img/WebLex/WebF.webp"
      ],
      "liveUrl": "https://lexmaxsoluciones.com/",
      "repoUrl": null,
      "caseStudyUrl": "/projects/lexmax-landing"
    },
    {
      "slug": "ecommerce",
      "title": "Quiero Sport",
      "subtitle": "Plataforma E-Commerce Moderna",
      "description": "Una plataforma e-commerce full-stack integral que incluye autenticación de usuarios, gestión de productos, funcionalidad de carrito de compras e integración con Mercado Pago para pagos.\nConstruida con React y Next.js para el frontend, TypeScript para seguridad de tipos y Prisma como ORM para interacciones con la base de datos.\nLa aplicación está containerizada usando Docker, asegurando entornos de desarrollo y despliegue consistentes.\nEl estilo se gestiona con Sass, proporcionando CSS modular y mantenible.",
      "summary": "Una plataforma e-commerce completa para artículos deportivos con navegación de productos, gestión de carrito y checkout seguro.\nLas características incluyen autenticación de usuarios (NextAuth.js), almacenamiento de pedidos (PostgreSQL & Prisma), rutas API backend (Next.js 13), configuración local con Docker y despliegue en Vercel.",
      "problem": "Los usuarios tenían problemas con sitios e-commerce de artículos deportivos lentos, inseguros e inconsistentes.\nEsta aplicación ofrece una UX rápida y moderna con autenticación segura, manejo confiable de datos (Prisma) y desarrollo simplificado (Docker).",
      "role": "Full-stack",
      "engagement": "Proyecto de práctica",
      "locations": [],
      "category": "product",
      "featured": false,
      "latest": false,
      "stack": [
        "React",
        "Next.js",
        "TypeScript",
        "Prisma",
        "Docker",
        "Sass"
      ],
      "image": "/img/img/ecommerce/ecoA.webp",
      "screenshots": [
        "/img/img/ecommerce/ecoA.webp",
        "/img/img/ecommerce/eco1.webp",
        "/img/img/ecommerce/eco2.webp",
        "/img/img/ecommerce/eco3.webp",
        "/img/img/ecommerce/eco5.webp",
        "/img/img/ecommerce/eco6.webp"
      ],
      "liveUrl": "https://sport-ecommerce-58pi.vercel.app/",
      "repoUrl": "https://github.com/Fransei29/sport-ecommerce/blob/main/README.md",
      "caseStudyUrl": "/projects/ecommerce"
    },
    {
      "slug": "healthcare-crm",
      "title": "Medicare",
      "subtitle": "Gestión de Tratamientos de Salud",
      "description": "Un mini CRM de salud para gestionar pacientes, medicamentos y tratamientos con asignaciones dinámicas.\nFrontend en Next.js con modo oscuro, validación, diseño responsive y componentes reutilizables.\nBackend robusto en NestJS con tests unitarios e integración, y base de datos relacional en Turso.",
      "summary": "Una aplicación web full-stack para gestionar pacientes, medicamentos y asignaciones de tratamientos en un flujo de trabajo de salud digital.\nIncluye vistas de panel, formularios reutilizables, validación de entrada, modo oscuro y un backend NestJS completamente probado.\nConstruida con seguridad de tipos, integración API y estándares modernos de UI/UX.",
      "problem": "Gestionar tratamientos de salud manualmente es propenso a errores e ineficiente.\nEsta aplicación simplifica el proceso ofreciendo operaciones CRUD estructuradas, seguimiento de asignaciones y cálculo automático de días restantes para tratamientos activos.\nAsegura confiabilidad con validación full-stack y alta cobertura de pruebas.",
      "role": "Full-stack",
      "engagement": "Proyecto de práctica",
      "industry": "Salud",
      "locations": [],
      "category": "product",
      "featured": false,
      "latest": false,
      "stack": [
        "Next.js",
        "React",
        "NestJS",
        "TypeScript",
        "Tailwind CSS",
        "Turso",
        "TypeORM"
      ],
      "image": "/img/img/Medicare/mediA.webp",
      "screenshots": [
        "/img/img/Medicare/mediA.webp",
        "/img/img/Medicare/medic.webp",
        "/img/img/Medicare/medid.webp",
        "/img/img/Medicare/mediii.webp",
        "/img/img/Medicare/medijjj.webp",
        "/img/img/Medicare/mediu.webp"
      ],
      "liveUrl": "https://interview-challenge-ecru.vercel.app",
      "repoUrl": "https://github.com/fransei29/interview-challenge",
      "caseStudyUrl": "/projects/healthcare-crm"
    },
    {
      "slug": "taskmanager",
      "title": "Task Manager",
      "subtitle": "Aplicación de Gestión de Tareas Full Stack",
      "description": "Una aplicación eficiente de gestión de tareas que permite a los usuarios crear, editar y eliminar tareas.\nIncluye autenticación de usuarios para asegurar una gestión de tareas personalizada.\nEl frontend está desarrollado con React y Next.js, utilizando Axios para solicitudes API.\nEl backend usa PostgreSQL como base de datos relacional, a la que accede mediante el ORM Sequelize.\nEl estilo se maneja con Sass para una UI limpia y responsive.",
      "summary": "Una aplicación integral de gestión de tareas construida con Next.js y PostgreSQL.\nLas características incluyen autenticación de usuarios, operaciones CRUD para tareas y una interfaz limpia e intuitiva.\nLa aplicación usa NextAuth.js para autenticación segura y Sequelize ORM para operaciones de base de datos.",
      "problem": "Los usuarios necesitaban una forma simple pero poderosa de gestionar sus tareas con autenticación segura.\nEsta aplicación proporciona una solución confiable con gestión de tareas específica del usuario, almacenamiento seguro de datos\ny un diseño responsive que funciona en todos los dispositivos.",
      "role": "Full-stack",
      "engagement": "Proyecto de práctica",
      "locations": [],
      "category": "product",
      "featured": false,
      "latest": false,
      "stack": [
        "React",
        "Next.js",
        "Axios",
        "PostgreSQL",
        "Sequelize",
        "Sass"
      ],
      "image": "/img/img/Task/taskA.webp",
      "screenshots": [
        "/img/img/Task/taskA.webp",
        "/img/img/Task/taska.webp",
        "/img/img/Task/task.webp",
        "/img/img/Task/taskc.webp",
        "/img/img/Task/taskkk.webp"
      ],
      "liveUrl": "https://task-manager-b-git-main-francos-projects-94304a5e.vercel.app/",
      "repoUrl": "https://github.com/Fransei29/task-manager-b",
      "caseStudyUrl": "/projects/taskmanager"
    },
    {
      "slug": "vestire",
      "title": "Vestiré",
      "subtitle": "Plataforma E-Commerce de Moda",
      "description": "Una plataforma e-commerce especializada en ropa, que ofrece una amplia selección de productos con navegación intuitiva y un proceso de checkout fluido.\nEl frontend está construido con React, mientras que el backend utiliza Node.js y Express para operaciones del lado del servidor.\nAxios se usa para manejar solicitudes HTTP, y PostgreSQL sirve como la base de datos.\nLa aplicación incluye autenticación de usuarios para gestionar sesiones de usuario y pedidos.",
      "summary": "Una plataforma e-commerce elegante y moderna para moda y accesorios, construida con React y estilizada con CSS.\nLas características incluyen autenticación de usuarios, navegación de productos, funcionalidad de carrito de compras y un diseño limpio y responsive.\nLa aplicación muestra una colección de artículos de ropa, zapatillas y accesorios con información detallada del producto.\nIncluye autenticación segura de usuarios y gestión de sesiones para una experiencia de compra personalizada.",
      "problem": "Los minoristas de moda locales necesitaban una presencia online moderna para llegar a los clientes.\nEsta aplicación proporciona una solución elegante con una experiencia de compra intuitiva,\nmostrando productos con imágenes de alta calidad y descripciones detalladas.\nLa autenticación segura asegura que los usuarios puedan gestionar de forma segura sus cuentas y pedidos.",
      "role": "Frontend",
      "engagement": "Proyecto de práctica",
      "locations": [],
      "category": "product",
      "featured": false,
      "latest": false,
      "stack": [
        "Node.js",
        "Express",
        "React",
        "Axios",
        "PostgreSQL"
      ],
      "image": "/img/img/Vestire/vestireA.webp",
      "screenshots": [
        "/img/img/Vestire/vestireA.webp",
        "/img/img/Vestire/vestired.webp",
        "/img/img/Vestire/vestiref.webp",
        "/img/img/Vestire/vestirei.webp",
        "/img/img/Vestire/vestirej.webp"
      ],
      "liveUrl": "https://vestire-front-s196.vercel.app/",
      "repoUrl": "https://github.com/Fransei29/vestire_front.git",
      "caseStudyUrl": "/projects/vestire"
    },
    {
      "slug": "flipper",
      "title": "Flipper",
      "subtitle": "Plataforma Clon de Twitter",
      "description": "Una aplicación de redes sociales inspirada en Twitter que soporta funcionalidades como publicar, seguir y actualizaciones en vivo.\nLas interacciones en tiempo real están impulsadas por WebSockets, lo que asegura una experiencia ágil y un alto nivel de interacción.\nEl backend está desarrollado con Node.js y Express, utilizando Redis para almacenamiento y recuperación eficiente de datos.\nEl frontend emplea Tailwind CSS para desarrollo rápido de UI.",
      "summary": "Un clon de Twitter completo construido con Node.js y plantillas Pug, estilizado con Tailwind CSS.\nLas características incluyen autenticación de usuarios, publicaciones en tiempo real, me gusta y comentarios.\nLa aplicación usa un stack tecnológico moderno con Docker para containerización y Vercel para despliegue.",
      "problem": "Los usuarios necesitaban una plataforma social para compartir pensamientos e interactuar con otros.\nEsta aplicación proporciona una experiencia familiar similar a Twitter con características esenciales\ncomo publicar, dar me gusta y comentar, todo envuelto en una interfaz limpia y responsive.",
      "role": "Full-stack",
      "engagement": "Proyecto de práctica",
      "locations": [],
      "category": "product",
      "featured": false,
      "latest": false,
      "stack": [
        "Node.js",
        "Express",
        "Redis",
        "Tailwind CSS"
      ],
      "image": "/img/img/Flipper/flipperA.webp",
      "screenshots": [
        "/img/img/Flipper/flipperA.webp",
        "/img/img/Flipper/flipperf.webp",
        "/img/img/Flipper/flippero.webp"
      ],
      "liveUrl": "https://clonetwitter-zy47-git-main-francos-projects-94304a5e.vercel.app/",
      "repoUrl": "https://github.com/Fransei29/clonetwitter.git",
      "caseStudyUrl": "/projects/flipper"
    },
    {
      "slug": "trip-planner",
      "title": "Trip Planner",
      "subtitle": "App simple de planificación de viajes",
      "description": "App pequeña en Next.js para planificar viajes. UI mínima, fuente Geist, desplegada en Vercel.",
      "summary": "App pequeña en Next.js para planificar viajes. Creada con create-next-app, usa la fuente Geist y una UI mínima. Desplegada en Vercel.",
      "problem": "Proyecto lateral para probar Next.js App Router con un alcance acotado—enfocado en un flujo simple de planificación de viajes.",
      "role": "Frontend",
      "engagement": "Proyecto de práctica",
      "locations": [],
      "category": "product",
      "featured": false,
      "latest": false,
      "stack": [
        "Next.js",
        "JavaScript",
        "CSS"
      ],
      "image": "/img/img/Trip/trip.webp",
      "screenshots": [
        "/img/img/Trip/trip.webp"
      ],
      "liveUrl": "https://trip-planner-c.vercel.app/",
      "repoUrl": "https://github.com/Fransei29/trip-planner-c",
      "caseStudyUrl": "/projects/trip-planner"
    }
  ],
  "experience": [
    {
      "role": "Desarrollador Full Stack",
      "company": "Freelance",
      "period": "Marzo 2024 - Presente",
      "highlights": [
        "Diseñamos, construimos y entregamos plataformas web de punta a punta para startups y empresas, llevando cada proyecto desde la primera reunión hasta producción.",
        "Trabajamos en todo el stack con React, Next.js, Node.js, Python y TypeScript, construyendo desde e-commerce y productos SaaS a medida hasta sitios corporativos.",
        "Desarrollamos backends con Node.js/Express, NestJS y Python (Django, Django REST), modelando datos en PostgreSQL y MySQL con Prisma, TypeORM y Sequelize.",
        "Diseñamos y documentamos APIs REST, librerías de componentes reutilizables y design systems con SCSS y Tailwind CSS para una entrega rápida y consistente.",
        "Integramos pagos y servicios de terceros: Mercado Pago y Stripe (suscripciones, webhooks), Google OAuth, almacenamiento en la nube (AWS S3 / GCS) y emails transaccionales.",
        "Desarrollamos funcionalidades con IA mediante la API de OpenAI (asistentes, contenido generativo, automatización) y arquitecturas multi-tenant con roles y autenticación segura (JWT, OAuth, Keycloak).",
        "Aprovisionamos y administramos servidores Linux (Ubuntu/Debian) en VPS: proxy inverso con Nginx, SSL con Let's Encrypt, PM2/Gunicorn, firewall (UFW) y endurecimiento de SSH.",
        "Configuramos despliegues con Docker y pipelines de CI/CD (GitHub Actions) con tests automatizados, releases sin downtime, y mantenimiento continuo, optimización de rendimiento y SEO.",
        "Lideramos la planificación técnica, el modelado de bases de datos y las decisiones de arquitectura directamente con los clientes, traduciendo objetivos de negocio en sistemas escalables."
      ],
      "stack": [
        "React",
        "Next.js",
        "Node.js",
        "Python",
        "Django",
        "NestJS",
        "TypeScript",
        "PostgreSQL",
        "MySQL",
        "Prisma",
        "Docker",
        "Linux",
        "Nginx",
        "VPS",
        "Stripe",
        "OpenAI API"
      ]
    },
    {
      "role": "Co-Fundador & Desarrollador Full Stack",
      "company": "Morse Verse",
      "period": "Noviembre 2024 - Noviembre 2025",
      "highlights": [
        "Co-fundé la empresa y lideré la dirección técnica, llevando los productos de la idea al lanzamiento.",
        "Construimos aplicaciones escalables con Python, Next.js, React y TypeScript, manteniendo el código limpio, tipado y mantenible.",
        "Diseñamos la arquitectura y la estructura general del proyecto, definiendo convenciones, organización de carpetas y módulos reutilizables para escalar a largo plazo.",
        "Desarrollamos e integramos bases de datos y APIs, optimizando la comunicación frontend-backend y el rendimiento de las consultas.",
        "Desplegué y mantuve servicios en servidores Linux, configurando entornos, dominios, SSL y despliegues automatizados.",
        "Impulsé decisiones de producto y UX junto al equipo, equilibrando los trade-offs técnicos con las necesidades del usuario.",
        "Implementamos autenticación, control de acceso por roles y manejo seguro de datos en toda la plataforma.",
        "Establecimos flujos de trabajo con control de versiones (Git/GitHub), code reviews y prácticas colaborativas para el equipo de desarrollo."
      ],
      "stack": [
        "Python",
        "Next.js",
        "React",
        "TypeScript",
        "PostgreSQL",
        "Linux",
        "Git",
        "APIs REST"
      ]
    },
    {
      "role": "Desarrollador Full Stack",
      "company": "Intelligent Apps Sweden",
      "period": "Octubre 2024 - Marzo 2025",
      "highlights": [
        "Desarrollamos aplicaciones full-stack con React, Next.js, Node.js y PostgreSQL en un equipo de producto ágil.",
        "Construimos APIs REST y GraphQL con Prisma ORM, validaciones robustas y manejo claro de errores.",
        "Integré funcionalidades de IA con la API de OpenAI — descripciones generativas, filtros inteligentes y automatización de contenido.",
        "Contribuimos a arquitecturas escalables orientadas a microservicios y a librerías internas compartidas.",
        "Implementamos testing automatizado (unitario e integración) para aumentar la confiabilidad y evitar regresiones.",
        "Desplegué aplicaciones con Docker y pipelines de CI/CD en servidores Linux (Vercel y VPS).",
        "Apliqué TypeScript y Tailwind CSS en todo el stack para mayor consistencia, seguridad de tipos y productividad.",
        "Colaboré en flujos ágiles con code reviews, estrategias de branching en Git y entrega continua."
      ],
      "stack": [
        "React",
        "Next.js",
        "Node.js",
        "PostgreSQL",
        "GraphQL",
        "Prisma",
        "Docker",
        "Linux",
        "OpenAI API"
      ]
    },
    {
      "role": "Desarrollador Front End",
      "company": "Digital Innovators",
      "period": "Mayo 2023 - Febrero 2024",
      "highlights": [
        "Construimos y mantuvimos aplicaciones de página única (SPA) con React y Redux para clientes en producción.",
        "Aumenté la retención de usuarios en un 15% y mejoré las tasas de conversión en un 20% mediante trabajo de UX y rendimiento.",
        "Contribuimos a una biblioteca de componentes interna, reduciendo el tiempo de desarrollo de funcionalidades en un 30%.",
        "Desarrollamos hooks personalizados de React y patrones reutilizables para mejorar la modularidad y consistencia del código.",
        "Optimizamos el rendimiento de renderizado y el tamaño del bundle, mejorando la carga y la fluidez de las páginas.",
        "Trabajamos en estrecha colaboración con diseñadores para traducir mockups de Figma en interfaces accesibles y fieles al pixel.",
        "Integré APIs REST y gestioné el estado de la aplicación en vistas complejas con gran volumen de datos."
      ],
      "stack": [
        "React",
        "Redux",
        "JavaScript",
        "APIs REST",
        "Figma",
        "HTML/CSS"
      ]
    }
  ],
  "skills": {
    "frontend": [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Redux",
      "Sass",
      "Tailwind",
      "React Query",
      "Framer Motion",
      "HTML5",
      "CSS3",
      "Bootstrap"
    ],
    "backend": [
      "Python",
      "Node.js",
      "Express",
      "Nest.js",
      "FastAPI",
      "GraphQL",
      "Sequelize",
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "Redis",
      "Airtable"
    ],
    "tools": [
      "Git",
      "Docker",
      "Wordpress",
      "Figma",
      "Jest",
      "n8n",
      "Cypress",
      "AWS"
    ]
  },
  "testimonials": [
    {
      "name": "Franklin Gomez",
      "role": "Fundador, academia",
      "quote": "Les encargué el diseño y desarrollo de la web de mi academia y se ocuparon de todo, del primer boceto al deploy. Carga rápido, se ve bien en el celular y por fin tengo un lugar serio a donde mandar a la gente."
    },
    {
      "name": "Tomas Del Pino",
      "role": "Plataforma de turnos multi-rubro",
      "quote": "Necesitábamos un sistema de turnos que no se cayera con tráfico real. Lo construyeron para escalar desde el día uno — cuando llegó el volumen, el producto respondió."
    },
    {
      "name": "Matias Rivarola",
      "role": "Desarrollador Front End",
      "quote": "Trabajé codo a codo con este equipo y el código que sale es limpio y mantenible. Cumplen las fechas que se comprometen, algo más raro de lo que debería."
    },
    {
      "name": "Edison Lamar",
      "role": "Ingeniero DevOps",
      "quote": "Revisé lo que despliegan y la parte de infraestructura está bien resuelta, no pegada al final. Reciben feedback sin problema y comunican con claridad durante todo el proceso."
    },
    {
      "name": "Adrian Rodriguez",
      "role": "Desarrollo Web",
      "quote": "No construyen solamente lo que pediste — te avisan cuando hay una forma mejor de hacerlo. Cumplen los plazos y las sugerencias que aportan en el camino mejoran el resultado final."
    },
    {
      "name": "Ismael Rivarola",
      "role": "Software Developer",
      "quote": "Sólidos en todo el stack, tanto frontend como backend. Se manejan en más de un idioma, algo que importa si tus usuarios no están todos en un solo país."
    },
    {
      "name": "Valentin Carniel",
      "role": "Backend Developer",
      "quote": "Cuando algo se rompe o cambia un requerimiento a mitad del proyecto, lo resuelven sin drama. Proactivos y eficientes — los recomiendo sin dudarlo."
    }
  ],
  "contact": {
    "title": "Ponte en contacto",
    "subtitle": "Contanos qué necesitás y te respondemos con una propuesta concreta.",
    "cta": "Hablemos de tu proyecto",
    "email": "seilerfranco317@gmail.com",
    "socials": [
      {
        "label": "GitHub",
        "href": "https://github.com/Fransei29"
      },
      {
        "label": "LinkedIn",
        "href": "https://www.linkedin.com/in/franco-seiler/"
      },
      {
        "label": "YouTube",
        "href": "https://www.youtube.com/@francoseiler1710"
      }
    ]
  },
  "footer": {
    "tagline": "Soluciones de software a medida diseñadas para que tu negocio crezca y escale."
  }
};

export const projects: readonly Project[] = content.projects as Project[];
export const featuredProjects = projects.filter((p) => p.featured);
