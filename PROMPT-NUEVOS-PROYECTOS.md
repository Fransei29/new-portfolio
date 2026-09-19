# Prompt para el agente en el repo de cada proyecto

Copiá el bloque de abajo y pegalo tal cual en el agente que abras **dentro del repo del proyecto**.
Cambiá solo el nombre del proyecto en la primera línea si querés ser explícito.

Al final de este archivo hay notas por proyecto (lo que ya sé de cada uno por las capturas)
y el recordatorio de qué NO pedir.

---

## 📋 EL PROMPT (copiar desde acá)

```
Analizá este repositorio a fondo. Voy a presentar este proyecto como case study en el
portafolio de mi agencia, así que necesito información técnica REAL extraída del código,
no descripciones genéricas de marketing.

Leé el código de verdad antes de responder: package.json y lockfile, estructura de
carpetas, modelos/schema de base de datos, rutas de API, middlewares de auth, servicios
de integración, configuración de infra (Docker, CI, deploy), tests y README.

IMPORTANTE sobre precisión:
- Todo lo que afirmes tiene que estar respaldado por el código. Si algo no lo podés
  verificar, marcalo explícitamente como "NO VERIFICADO" en vez de asumirlo.
- No inventes métricas, números de performance, cantidad de usuarios ni resultados de
  negocio. Si no hay datos duros en el repo, decí que no hay.
- Distinguí lo que está en producción de lo que quedó a medio hacer, mockeado o comentado.
- Si el proyecto es multi-tenant, tiene roles o tiene más de una app adentro (monorepo),
  aclarámelo bien.

Devolveme la respuesta EXACTAMENTE en esta estructura:

---

### 1. IDENTIDAD
- **title**: nombre del producto tal como se muestra al usuario final.
- **subtitle**: una línea de 4 a 9 palabras que diga QUÉ ES el producto, en formato
  categoría. Ejemplos del estilo que uso: "Fleet Compliance & Document Intelligence
  Platform", "Custom E-Commerce Platform".
- **industry**: rubro o vertical. Ej: "Transportation • Compliance SaaS".
- **category**: elegí UNA de estas tres y justificá en una línea:
  - `platform` → app con login, roles, backend, datos persistentes, panel de gestión
  - `product` → app con funcionalidad propia y usuarios, más acotada que una plataforma
  - `landing` → sitio institucional / marketing, sin lógica de aplicación pesada
- **client / location**: si el repo permite inferir para quién es y en qué país o región
  opera (dominio, textos, moneda, idioma, zona horaria, legales), decímelo. Si no, "no
  determinable desde el repo".

### 2. WHAT IS (2 a 3 párrafos, separados por línea en blanco)
Qué es el producto y para quién, en prosa, sin bullets.
- Párrafo 1: qué es y a qué usuario o negocio le resuelve algo.
- Párrafo 2: qué puede hacer concretamente el usuario adentro (funcionalidades reales
  que veas implementadas).
- Párrafo 3 (opcional): escala, complejidad o contexto de colaboración, si aplica.
Tono descriptivo y profesional. Sin superlativos vacíos ("increíble", "revolucionario").

### 3. PROBLEM SOLVED (2 a 3 párrafos, separados por línea en blanco)
- Párrafo 1: qué problema real existía antes.
- Párrafo 2: cómo lo resuelve este sistema, con decisiones técnicas concretas.
- Párrafo 3 (opcional): por qué se construyó a medida en vez de usar algo off-the-shelf,
  si eso se desprende del código.

### 4. TECH STACK
Lista plana de tecnologías REALES, leídas de las dependencias y del código.
- Incluí versiones mayores cuando sean relevantes (ej: "Next.js 15", "React 19").
- Incluí lenguaje, framework de front, framework de back, base de datos, ORM, auth,
  pagos, storage, infra y testing.
- No incluyas dependencias triviales (clsx, dotenv) ni nada que esté en package.json
  pero no se use en el código.

### 5. LEARNINGS (6 a 10 bullets)
Bullets técnicos y específicos. Este es el corazón del case study: tiene que mostrar
profundidad de ingeniería, no tareas.
- Cada bullet arranca con el área y después explica la decisión concreta.
  Ej: "Auth at enterprise standards: Keycloak (OIDC) + credential flows, JWT
  access/refresh handling, and session hardening patterns suited to B2B SaaS."
- Priorizá: arquitectura, multi-tenancy, modelo de datos, auth y permisos, integraciones
  externas, manejo de estado, performance, y lo responsive si es relevante.
- Nada de "aprendí a usar React". Son decisiones de ingeniería, no aprendizajes de curso.

### 6. TABS TÉCNICOS
Cada tab tiene un `body` (párrafo introductorio) y `groups` (subsecciones).
Cada group tiene `title` y después `bullets` (frases) o `chips` (términos de 1-2 palabras).
Dame SOLO los tabs para los que el repo tenga material real. Si no hay pagos, no inventes
un tab de pagos.

**a) ARCHITECTURE** (casi siempre aplica)
- body: 1 párrafo sobre la decisión arquitectónica central.
- 2 a 4 groups. Sugeridos: "Application Architecture", "Platform Features",
  "Data Model", "Authentication" (este último suele ir bien con chips).

**b) PAYMENTS** (solo si hay pagos o facturación de verdad)
- Pasarela, modelo (suscripción / pago único / marketplace), manejo de webhooks,
  idempotencia, estados de la orden, monedas, y qué se testeó en sandbox vs producción.

**c) INFRA** (solo si hay algo real de infra)
- Hosting y deploy, contenedores, CI/CD, variables de entorno y secretos, base de datos
  gestionada, storage, logging y monitoreo, backups.
- En el portafolio este tab se renderiza junto con Architecture dentro de "Engineering",
  así que no repitas lo que ya pusiste en Architecture.

**d) DELIVERABLES**
- Qué se entregó concretamente: superficies de la app (páginas, paneles, flujos),
  integraciones, documentación, y cualquier herramienta interna o de migración.

### 7. LINKS
- **liveDemoLink**: URL de producción si la encontrás (README, config de deploy, dominio
  en variables de entorno). Si no, null.
- **githubLink**: solo si el repo es público. Si es privado de cliente, null.

### 8. CHEQUEO FINAL
Antes de cerrar, listame:
- Qué afirmaciones NO pudiste verificar en el código.
- Qué partes del repo parecen incompletas, mockeadas o fuera de uso.
- Cualquier cosa sensible que hayas visto y que NO debería ir en un portafolio público
  (nombres de clientes bajo NDA, credenciales, datos personales, endpoints internos).

---

Respondé en inglés el contenido que va a ir publicado (title, subtitle, whatIs,
problemSolved, learnings, tabs), porque el portafolio se escribe en inglés y después se
traduce. Los comentarios tuyos sobre verificación y dudas, en español.
```

## 📋 FIN DEL PROMPT

---

## Notas por proyecto

Lo que ya deduje mirando las capturas. Usalo para contrastar lo que te conteste el agente:
si dice algo que contradice esto, vale la pena revisarlo.

### 1. Red Lizard Studioz — `redlizard-web` (15 capturas)
Plataforma SaaS multi-tenant de contenido con IA. En las capturas se ve: Dashboard, Blog
Posts, Blog Ideas (con estados To write / Being written / Ignored), Keywords, Knowledge
Base, AI Assistants, Leads, Conversations, Business Profile, Categories, Sub Categories,
Media, Settings. Tiene selector de cliente arriba (se ve "Globaly" seleccionado), rol
"Super admin" y toggle de idioma FR.
- **Es el proyecto más rico de los cinco.** Multi-tenancy, IA generativa, RBAC e i18n.
- Preguntale específicamente: qué proveedor de LLM usa, cómo resuelve el multi-tenant,
  cómo funciona el pipeline de generación de contenido, y qué hace el chatbot.
- Ojo: administra contenido de Globaly, que es otro de los proyectos de esta tanda.

### 2. Globaly — `globaly-web` (10 capturas)
Sitio de producto de una plataforma de espacios digitales inmersivos para trabajo remoto.
Nav: Platform, Solutions, Enterprise, Resources, Pricing. Tiene un chatbot flotante
("Ask Globa") y CTA "Experience Globaly · 30 minutes free".
- Probablemente `landing`, pero confirmá: si el chatbot y el flujo de trial tienen backend
  propio, puede ser `product`.

### 3. ComplyDQ — sitio público — `cdq-site-web` (9 capturas)
**Atención: mismo cliente que tu case study `comply-dq` que ya está publicado.**
Ese ya existente muestra la PLATAFORMA interna (login, dashboard de compliance). Estas
capturas nuevas son el SITIO PÚBLICO de marketing: Home, Features, Resources, Blog,
Partners, About, con CTA de "Start free trial".
- Decidimos publicarlo como case study APARTE (slug sugerido: `comply-dq-site`).
- En el prompt aclarale al agente que te interesa el sitio de marketing, no la plataforma.
- Cuando escribas el copy, conviene enlazarlo con el case study de la plataforma: es el
  mismo cliente, dos superficies distintas.

### 4. Royal Parking Services — `royalparking-web` (7 capturas)
Sitio de una empresa canadiense de control de estacionamiento (Lower Mainland, BC).
Nav: Services, Resources, About Us, Blog, Contact Us. Tiene "Pay Notice" y "Client Login".
- "Pay Notice" sugiere pago de multas online → **preguntá si hay pasarela de pago real**.
  Si la hay, el tab de Payments aplica.
- "Client Login" sugiere área privada → puede no ser un `landing` puro.

### 5. Sophie Callander Consulting — `sophie-web` (5 capturas)
Sitio profesional de una abogada / mediadora laboral en BC, Canadá.
Nav: Services, About Me, Reflections, Blog, FAQ, Contact. Tiene selector de idioma
(English visible) → **bilingüe EN/FR**, muy probable por ser Canadá.
- Preguntá cómo está implementada la i18n y si el blog / "Reflections" sale de un CMS,
  de MDX o está hardcodeado.
- Es el más chico de los cinco: probablemente `landing`.

---

## Qué NO pedir

- **Métricas inventadas.** Los campos `outcomes` y `testimonial` existen en el tipo pero
  hoy no los usa ningún proyecto. Si no tenés un número real del cliente, se dejan vacíos.
- **Nada que denigre a terceros.** El copy argumenta en positivo, sin compararse contra
  juniors, agencias ni competencia.
- **Nada bajo NDA.** Si un cliente no quiere aparecer nombrado, se describe el rubro sin
  el nombre.

## Dónde va cada cosa cuando tengas las respuestas

| Qué | Archivo |
|---|---|
| Tarjeta del listado (title, description, technologies, category, previewImage) | `lib/projectCards.ts` |
| Case study completo (whatIs, problemSolved, learnings, tabs, screenshots) | `app/data/projects.ts` |
| Textos traducidos (title, subtitle, description, whatIs, problemSolved, learnings) | `locales/en/projects.json` y `locales/es/projects.json` |

Las imágenes ya están listas en `/public/img/img/<carpeta>/`, en `.webp` a 1722x914.
