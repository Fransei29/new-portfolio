# Aplicación SEO · AEO · GEO — Especificación ejecutable

**Versión 2.0** · Documento hermano de [`00-DOCTRINA.md`](00-DOCTRINA.md) y [`02-SISTEMA.md`](02-SISTEMA.md)

> **Este archivo es para el agente que aplica el sistema a un sitio web.**
> Es imperativo y verificable. Cada regla tiene un criterio de aceptación.
> El *por qué* de cada regla está en `00-DOCTRINA.md`. El *scoring y la medición*, en `02-SISTEMA.md`.

---

## 0. Reglas de operación del agente

Estas reglas te aplican a vos, el agente, antes que cualquier regla de SEO.

### 0.1 Disciplina de evidencia — no negociable

**Nunca inventes:** rankings, tráfico, impresiones, métricas de backlinks, Core Web Vitals, citaciones de IA, reseñas, credenciales, estadísticas, casos de estudio, fuentes o accesos.

Si un dato requiere una herramienta que no tenés conectada, o una API que falló, **marcá el ítem como `NO VERIFICADO — requiere <herramienta>` y seguí.** Un reporte con huecos honestos es útil; uno con datos inventados es peor que no hacer nada.

**Etiquetá cada afirmación de tus reportes:**

| Etiqueta | Cuándo usarla |
|---|---|
| `OBSERVADO` | Lo viste directamente: texto de la página, HTML, SERP en vivo, export de GSC, resultado de crawl |
| `INFERIDO` | Conclusión razonable desde lo observado — decí de qué la inferís |
| `ASUMIDO` | Supuesto de trabajo porque el input no está disponible — decí qué falta |
| `RECOMENDADO` | Acción propuesta; **no** una afirmación de que ya está implementada |

**Registrá siempre la procedencia:** fuente, fecha/hora de recolección, alcance, y si es dato de campo, de laboratorio, de SERP observado, análisis inferido o input manual.

### 0.2 La verdad del negocio le gana al conocimiento de industria

**Nunca infieras una capacidad del negocio a partir de las normas de su industria.**

Si el sitio no dice que ofrece un servicio, **no lo agregues** porque "las empresas de ese rubro suelen ofrecerlo". Marcalo como pregunta al negocio: `PENDIENTE CONFIRMACIÓN: ¿ofrece <capacidad>?`

Esto aplica a servicios, horarios, zonas de cobertura, garantías, certificaciones, precios, plazos, formas de pago y cualquier otra afirmación operativa.

### 0.3 Jerarquía de desempate

Cuando dos reglas de este documento entren en conflicto, resolvé por:

```
Verdad → Evidencia → Intención del usuario → Utilidad →
Relevancia de negocio → Autoridad → SEO/AEO/GEO → Conversión
```

Gana el de la izquierda. Registrá qué principio decidió.

### 0.4 Respeto de límites

Credenciales, cuotas de API, reglas de robots, licencias, privacidad y términos de servicio son **restricciones del sistema, no detalles a sortear.**

---

## 1. Orden de ejecución

Aplicá en este orden. Cada fase depende de la anterior.

```
FASE 0  Inventario y acceso          ← qué hay y si los bots entran
FASE 1  Investigación del negocio    ← qué puede afirmar realmente
FASE 2  Demanda e intención          ← qué busca la gente
FASE 3  SERP en vivo y competencia   ← qué hay que superar
FASE 4  Arquitectura y mapeo         ← qué página resuelve qué
FASE 5  Técnica                      ← que se pueda rastrear y entender
FASE 6  Contenido: SEO + AEO         ← que responda y convenza
FASE 7  GEO: entidad y evidencia     ← que el modelo sepa quién sos
FASE 8  Local (si aplica)            ← territorio
FASE 9  QA y gates                   ← ¿sale o no sale?
FASE 10 Publicación y validación     ← ¿quedó bien implementado?
FASE 11 Medición y ciclo             ← ¿funcionó?
```

**Regla de gate:** las fases 9 y 10 pueden bloquear. Ninguna página estratégica se publica con un gate crítico fallando (§9.3), sin importar cuán alto sea su score.

---

## FASE 0 · Inventario y acceso

### 0.1 Inventario del sitio

- [ ] Listar todas las URLs indexables con su tipo de página y su intención primaria declarada
- [ ] Identificar URLs huérfanas (sin enlaces internos entrantes)
- [ ] Identificar duplicados y URLs que compiten por la misma intención
- [ ] Registrar para cada URL: fecha de publicación, fecha de última actualización sustantiva

### 0.2 Acceso de crawlers de IA — **el paso cero de la visibilidad**

La visibilidad en IA empieza por el acceso. Si el bot no entra, nada de lo demás importa.

**Verificar explícitamente para cada uno:**

| Crawler | Motor / uso |
|---|---|
| `Googlebot` | Google Search + funciones generativas |
| `Bingbot` | Bing + Microsoft Copilot |
| `GPTBot` | Entrenamiento OpenAI |
| `OAI-SearchBot` | **ChatGPT Search — el que importa para citación** |
| `ChatGPT-User` | Navegación en vivo iniciada por usuario |
| `ClaudeBot` | Anthropic |
| `PerplexityBot` | Perplexity |

**Puntos de verificación — los cuatro, no solo el primero:**

1. `robots.txt` — ¿hay `Disallow` que los afecte?
2. **Reglas de CDN/WAF** — Cloudflare, Akamai, Fastly bloquean bots por reputación **sin tocar robots.txt**. Esta es la causa más común de bloqueo invisible.
3. **Protección anti-bot** — challenges de JS, rate limiting, geobloqueo
4. **Respuestas HTTP reales** — hacé la petición con el user-agent de cada bot y registrá el código de estado

**Criterio de aceptación:** cada crawler de la estrategia de visibilidad devuelve `200` en las URLs prioritarias, verificado con petición real.

> **No permitas todo por defecto.** Habilitá los que la estrategia de visibilidad requiere, preservando seguridad y control de contenido. Documentá la decisión por crawler.

**Validación de identidad:** verificá bots por **DNS inverso**, nunca por el string de user-agent — es trivial de falsificar.

### 0.3 Un solo dominio

- [ ] Un dominio preferido, único
- [ ] Todo lo demás redirige con **301** al preferido
- [ ] Sin dos dominios compitiendo por las mismas keywords

**Por qué es el movimiento #1:** dos dominios se canibalizan y todo lo demás depende de esto.

---

## FASE 1 · Investigación del negocio

**El objetivo no es aprender qué vende, sino qué necesita saber alguien antes de elegirlo.**

Sin esta fase no podés fundamentar ninguna afirmación (§0.2).

### 1.1 Qué recolectar

- **Oferta:** servicios, precios, requisitos, proceso, plazos de entrega
- **Mercado:** audiencias, segmentos, ubicaciones, industrias, competidores
- **Activos de confianza:** credenciales, casos de estudio, reseñas, datos propietarios
- **Diferenciadores reales**, no declarativos

### 1.2 Fuentes de primera mano (en orden de valor)

1. Conversaciones con clientes y logs de chat del sitio
2. Reseñas (propias y de competidores)
3. Google Search Console — qué ya busca la gente y encuentra
4. Documentación interna
5. Analytics
6. Contenido existente

### 1.3 Inventario de afirmaciones

- [ ] Listar toda afirmación factual del sitio
- [ ] Asignarle un tier de evidencia a cada una:

`Verificado de primera mano` → `Fuente primaria` → `Respaldado por tercero` → `Basado en experiencia` → `Conocimiento general` → **`Sin respaldo`**

**Criterio de aceptación:** ninguna afirmación `Sin respaldo` sale publicada. O se corta, o se baja de tier con evidencia.

---

## FASE 2 · Demanda e intención

### 2.1 Descubrimiento de keywords

- [ ] Minar datos de query de primera mano — GSC: impresiones existentes y "casi-victorias" (posiciones 4–20)
- [ ] Herramientas de keywords, features de SERP, lenguaje de clientes, preguntas de ventas/soporte, reseñas, cobertura de competidores
- [ ] Expandir por: servicio/producto, problema, caso de uso, audiencia, industria, geografía, etapa de compra, comparación, costo

**Construí el universo de keywords primero. Clusterizá y priorizá antes de publicar.**

### 2.2 El mapa de búsqueda — seis ejes, no solo volumen

Clasificá cada oportunidad por:

| Eje | Pregunta |
|---|---|
| **Keyword** | Qué buscan |
| **Pregunta** | Qué preguntan |
| **Tema** | A qué cluster pertenece |
| **Intención** | Informacional, comercial, transaccional, local, comparación |
| **Entidad** | Sobre quién o qué es la query |
| **Ubicación y relevancia de negocio** | Dónde y cuánto importa |

> **Clave: Google hace *query fan-out*** — descompone una query en sub-preguntas. Cubrí el cluster completo de intención, nunca una keyword aislada.

### 2.3 Clustering y mapeo a páginas

- [ ] Por defecto: **un cluster de intención primaria por página**
- [ ] Mantené juntos sinónimos, variantes cercanas, modificadores y preguntas relacionadas **cuando la respuesta de fondo es materialmente la misma**
- [ ] **Separá en página nueva** cuando el usuario espera: una respuesta distinta, un tipo de página distinto, otro producto/servicio, otra geografía, u otra etapa del recorrido

**Reglas duras:**

- **100 keywords no implican 100 páginas.**
- **No** exijas que cada frase secundaria aparezca literal.
- **No** uses un porcentaje objetivo de densidad de keywords. El QA juzga alineación de intención, completitud semántica, lenguaje natural y repetición innecesaria. *Una* frase puede sobreusarse; *muchos* términos relacionados pueden ser naturales.
- Corré un **chequeo de canibalización** antes de asignar cualquier URL objetivo.

### 2.4 Priorización — Keyword Priority Score

```
KPS = 20 × [(BV×0,30) + (INT×0,20) + (REL×0,15) + (OPP×0,15) + (TRAC×0,10) + (FIT×0,10)]
```

Puntuá cada factor **1–5**:

| Factor | Qué mide |
|---|---|
| **BV** | Business Value — valor comercial |
| **INT** | Intent — intención de conversión/búsqueda |
| **REL** | Relevance — relevancia de audiencia/local |
| **OPP** | Opportunity — oportunidad de ranking |
| **TRAC** | Traction — tracción existente |
| **FIT** | Fit — encaje estratégico/temático |

| KPS | Prioridad | Acción por defecto |
|---|---|---|
| **80–100** | Ahora | Asignar recursos de inmediato |
| **60–79** | Siguiente | Planificar después de las oportunidades top |
| **40–59** | Selectivo | Perseguir si es estratégicamente útil o de bajo esfuerzo |
| **<40** | Diferir | Esperar hasta que cambie el valor o la oportunidad |

> **Nota de calibración.** Los factores 1–5 son juicio humano o del agente, no medición. El aparato produce **consistencia y trazabilidad**, no precisión. Los pesos son convenciones versionadas (§ Sistema 10.2), no constantes descubiertas.

**El entregable de esta fase es "qué construimos primero" — no "acá hay 500 keywords".** Si una oportunidad puntúa bajo en relevancia de negocio, el volumen no la rescata.

---

## FASE 3 · SERP en vivo y competencia

**El readiness no alcanza si la página es más débil que los resultados que debe superar.**

### 3.1 Benchmark obligatorio

- [ ] Analizar los **top 3–10 resultados orgánicos** de cada cluster prioritario
- [ ] Evaluar en cada uno: encaje de intención, tipo de página, utilidad, expertise, evidencia, frescura, enlaces/menciones, fuerza de marca, contexto local, UX
- [ ] Documentar el **formato de SERP** que gana (guía, comparativa, listado, página de servicio, video, etc.)

### 3.2 Buscar el hueco

Identificá en los competidores: preguntas sin responder, datos desactualizados, secciones genéricas, pruebas débiles, comparaciones ausentes, diferenciación local pobre.

### 3.3 Crear ganancia de información

Generá valor con: datos de primera mano, interpretación experta, metodología, casos de estudio, ejemplos, herramientas o insight defendible.

**Competí en utilidad y claridad — no en cantidad de palabras.**

### 3.4 Scores competitivos

**Competitive Difficulty Score** (más alto = más difícil):

```
CDS = 20 × [(SERP×0,25) + (CONTENT×0,20) + (AUTH×0,20) + (STABLE×0,15) + (SAT×0,10) + (LOCAL×0,10)]
```

Cada uno 1–5: fuerza del SERP, calidad del contenido competidor, barrera de autoridad, estabilidad del SERP, saturación de intención, desventaja local. **Usar evidencia competitiva observada.**

**Ranking Opportunity Score** (más alto = más atractivo):

```
ROS = 20 × [(INTFIT×0,30) + (GAP×0,20) + (AUTHFEAS×0,15) + (TRAC×0,15) + (CTXADV×0,10) + (VOL×0,10)]
```

Cada uno 1–5: encaje de intención, hueco explotable, factibilidad de autoridad, tracción existente, ventaja de contexto/local, apertura del SERP.

### 3.5 Táctica de posicionamiento

- Usá las **posiciones 4–20** como oportunidades de optimización de alto apalancamiento — ya tenés tracción ahí
- Atacá oportunidades long-tail adyacentes para construir fuerza temática **antes** del término principal más difícil

**Regla de evidencia:** distinguí hechos observados de razones de ranking inferidas. No inventes fuerza de backlinks ni métricas.

---

## FASE 4 · Arquitectura y mapeo

### 4.1 Reglas de arquitectura

- [ ] **Una URL = una intención primaria.** Creá una página cuando hay una necesidad distinta que merece una respuesta distinta — **no porque existe una keyword.**
- [ ] Jerarquía plana y navegable: servicios, ubicaciones, recursos, blog — **determinada por la investigación, no por la plantilla**
- [ ] Enlazado interno real, con anchors descriptivos
- [ ] **Sin URLs estratégicas huérfanas**

### 4.2 Categorías de página y su rol

| Categoría | Rol SEO primario | Intención típica | Freshness por defecto |
|---|---|---|---|
| **Homepage** | Entidad + navegación + propuesta central | Marca / comercial amplia | F3 |
| **Servicio / producto** | Ingresos / conversión | Transaccional / comercial | F3 |
| **Categoría / hub** | Organización temática + autoridad | Comercial / navegacional | F3–F4 |
| **Página de ubicación** | Descubrimiento local + conversión | Comercial local | F3 |
| **Blog / artículo** | Descubrimiento informacional + soporte temático | Informacional | F2–F5 |
| **Guía evergreen** | Autoridad + educación + enlaces | Informacional / decisión | F4–F5 |
| **Comparación / decisión** | Captura de medio y fondo de embudo | Investigación comercial | F2–F4 |
| **Caso de estudio / prueba** | Confianza + conversión + evidencia | Validación | F3–F4 |
| **Sobre / confianza / entidad** | Confianza de entidad + credibilidad | Marca / confianza | F4–F5 |

*(Las clases F1–F5 se definen en § Sistema 4.)*

---

## FASE 5 · Técnica

**Sin esto, todo lo demás es decoración.** Si un motor no puede rastrear, parsear o confiar en el sitio, ningún LLM lo va a citar.

### 5.1 Rastreo e indexación

- [ ] `robots.txt` y `sitemap.xml` **generados desde el routing, nunca mantenidos a mano**
- [ ] Sitemap sin URLs `noindex` ni no-canónicas
- [ ] Canonical correcto en cada página
- [ ] Sin `noindex` accidental en páginas estratégicas
- [ ] Redirects y 404s revisados

### 5.2 Renderizado — crítico para GEO

- [ ] **HTML renderizado en servidor (SSR/SSG)**
- [ ] El contenido importante **no depende de JavaScript**

**Por qué:** muchos crawlers de IA no ejecutan JS. Si tu contenido solo existe después de hidratar, para ellos la página está vacía.

**Criterio de aceptación:** `curl` de la URL sin ejecutar JS devuelve el contenido principal, el H1 y los enlaces internos.

### 5.3 Metadatos

- [ ] Metadatos únicos por ruta: title, description, canonical, Open Graph
- [ ] **Nunca heredados del layout**
- [ ] URL descriptiva

### 5.4 Estructura semántica

- [ ] **Un solo H1 claro** por página
- [ ] Jerarquía lógica de encabezados (H2/H3 sin saltos)
- [ ] Imágenes útiles con alt text apropiado y contexto circundante

### 5.5 Rendimiento

- [ ] Core Web Vitals en verde, **mobile first**
- [ ] Umbrales de campo (percentil 75): **LCP ≤ 2,5 s · INP ≤ 200 ms · CLS ≤ 0,1**

*(Fuente: https://web.dev/articles/vitals — monitoreo continuo en § Sistema 8.)*

### 5.6 Datos estructurados

**Regla:** el schema debe describir **contenido visible y preciso**. Nunca lo uses para fabricar relevancia o afirmaciones que la página no sostiene.

Desplegar donde corresponda: `Organization`, `LocalBusiness`/`Service`, `FAQPage`, `Article`, `BreadcrumbList`.

> **Advertencia honesta sobre schema.** Un estudio causal de Ahrefs sobre 1.885 páginas que agregaron JSON-LD (Ago 2025 – Mar 2026) **no encontró uplift de citación por schema solo.** Funciona como capa de desambiguación dentro de una estrategia completa, **no como atajo.** Desplegalo, pero sin cargarle expectativas.

- [ ] Schema validado
- [ ] Schema coincide con el contenido visible

---

## FASE 6 · Contenido: SEO + AEO

**Formato antes que volumen.** El objetivo es un pasaje que pueda levantarse entero, sin editar, y seguir teniendo sentido.

### 6.1 Estructura answer-first

**El orden obligatorio de cada sección:**

1. **Respuesta en 40–60 palabras autocontenidas**
2. Explicación de apoyo
3. Evidencia y ejemplos
4. Preguntas de seguimiento

**Reglas de formato:**

- H2/H3 como **preguntas reales de usuario**, donde coincidan con intención genuina — **nunca forzadas**
- **Un hecho = una frase.** Precio, plazo, requisito y horarios en afirmaciones cortas y aisladas
- Tablas y listas para comparaciones: la estructura más extraíble que existe
- **500 palabras que responden le ganan a 3.000 de relleno**

### 6.2 Cobertura de respuesta

Para cada tema, cubrí también **lo que el usuario pregunta después**: quién califica, cuánto cuesta, qué documentación se necesita, cuánto tarda, cuáles son las alternativas.

**El objetivo: que nunca reinicien la búsqueda para un seguimiento.**

### 6.3 Qué NO hacer en AEO

- ❌ **No** todas las páginas necesitan un bloque de FAQ
- ❌ **No** crees una página separada por cada variación conversacional
- ❌ **No** uses densidad artificial de "keywords de IA" ni *chunking* superficial como objetivo
- ❌ **No** fuerces preguntas donde no reflejan una necesidad real del usuario

Las preguntas van donde reflejan necesidades genuinas **y apoyan la intención primaria.**

### 6.4 Checklist — buen SEO de página

- [ ] Una intención dominante y un cluster temático primario
- [ ] Propiedad única de URL sin canibalización material
- [ ] Encaje con el formato del SERP
- [ ] Title único y convincente, H1 claro
- [ ] Encabezados lógicos y cobertura completa de la intención
- [ ] Terminología natural sin stuffing
- [ ] **Diferenciación material frente a los competidores actuales de página 1**
- [ ] Confianza / prueba / evidencia
- [ ] Enlaces internos entrantes descriptivos y salientes útiles
- [ ] Imágenes optimizadas con alt text apropiado
- [ ] Schema y breadcrumbs apropiados
- [ ] Canonical, rastreabilidad, indexabilidad y descubrimiento correctos
- [ ] Usabilidad móvil y evidencia de rendimiento aceptable
- [ ] Ruta de conversión clara
- [ ] Clase de freshness y calendario de revisión asignados

### 6.5 Checklist — buen SEO de blog

- [ ] Intención informacional o de soporte a decisión definida
- [ ] Un cluster temático primario con queries relacionadas cubiertas naturalmente
- [ ] Title alineado a búsqueda y respuesta/valor directo en la apertura
- [ ] Encabezados lógicos cubriendo los subtemas importantes
- [ ] Insight original, ejemplos, evidencia, datos, expertise o metodología
- [ ] Visuales/tablas/listas/comparaciones útiles cuando mejoran la comprensión
- [ ] Información de autor apropiada y fuentes
- [ ] Enlaces internos hacia páginas de soporte y comerciales
- [ ] Enlaces desde páginas antiguas relevantes hacia el artículo
- [ ] Relación clara con el hub/cluster
- [ ] Schema de Article/breadcrumb donde aplique
- [ ] **Test de superioridad competitiva**
- [ ] Chequeo de canibalización
- [ ] Clase de freshness y triggers de monitoreo

### 6.6 Checklist — buen AEO de página

- [ ] Declaración clara del propósito de la página y su audiencia
- [ ] Respuestas directas a las preguntas materiales del usuario
- [ ] Entidades, servicios/productos, geografía y relaciones inequívocas
- [ ] **Secciones autocontenidas, comprensibles fuera de contexto**
- [ ] Definiciones, pasos, comparaciones, criterios o información de decisión concisos donde sea útil
- [ ] Evidencia para afirmaciones materiales
- [ ] Información experta o de primera mano única que hace la página **digna de ser citada**
- [ ] Estructura semántica lógica y encabezados descriptivos
- [ ] Datos estructurados apropiados que coinciden con el contenido visible
- [ ] Hechos sensibles al tiempo actualizados
- [ ] Corroboración externa relevante
- [ ] **Siguiente paso convincente después de un resumen generado por IA**

### 6.7 Checklist — buen AEO de blog

- [ ] Respuesta concisa a la pregunta central cerca del comienzo
- [ ] Subtítulos guiados por pregunta o tarea, donde sea natural
- [ ] Cada sección mayor responde directamente a su encabezado
- [ ] Pasajes independientemente significativos, no vagos
- [ ] Definiciones claras de términos especializados y entidades
- [ ] Ejemplos originales, observaciones expertas, datos propios, casos, métodos u otra ganancia de información
- [ ] Fuentes y evidencia transparentes
- [ ] Preguntas de seguimiento naturales y completitud de contexto
- [ ] Formatos estructurados útiles: pasos, tablas, listas, comparaciones
- [ ] Credibilidad fuerte de autor/entidad
- [ ] Enlaces internos que establecen el grafo temático amplio
- [ ] Hechos actuales y clasificación de freshness
- [ ] **Sin bloque de FAQ forzado solo por AEO**

---

## FASE 7 · GEO: entidad, evidencia y autoridad externa

**Los sistemas generativos recuperan a través de infraestructura de búsqueda**, así que las señales de ranking siguen aplicando. Lo que cambia es la **ponderación**: para visibilidad generativa, la evidencia clara, la comprensión de entidad y las menciones autorizadas pesan cada vez más **junto a** las señales tradicionales — no en lugar de ellas.

### 7.1 Tácticas con evidencia experimental

*(Princeton · arXiv 2311.09735 · 10.000 queries · dirección como evidencia, magnitud como contexto)*

| Táctica | Cómo aplicarla |
|---|---|
| **Agregar estadísticas** | Reemplazar afirmaciones vagas por cifras **con fuente y fecha** |
| **Agregar citas textuales** | Citar expertos o fuentes reconocidas **verbatim** |
| **Citar fuentes** | Enlazar **la fuente primaria**, no un blog que la resume |
| **Fluidez y claridad** | Frases cortas, voz activa, sin jerga innecesaria |

> Las fuentes de baja visibilidad se beneficiaron desproporcionadamente — **relevante para todo proyecto nuevo.**

### 7.2 Entidad — que quede claro quién sos

- [ ] **NAP idéntico** (nombre, dirección, teléfono) en todas partes. Cualquier variación fragmenta la entidad.
- [ ] Página "Sobre" **densa en hechos**: fundación, ubicación, equipo, credenciales, especialización. El objetivo no es la extensión — es hacer la entidad **inequívoca**.
- [ ] Presencia en fuentes que los modelos ya confían: **Wikipedia** representa 26–48% de las citaciones top de ChatGPT. Sumar **Wikidata, Crunchbase** y directorios de industria.
- [ ] Consistencia entre sitio, GBP, Bing Places, LinkedIn y perfiles. **La contradicción destruye la confianza de entidad.**
- [ ] Autor con credenciales verificables

### 7.3 Autoridad fuera del sitio

> **Si ~85% de las menciones de marca en respuestas de IA vienen de terceros, esto no es opcional — es el canal principal.**

- [ ] **Listicles de terceros:** identificar las páginas "mejores X en Y" que los motores **ya citan** para tus prompts. La posición dentro de esas listas parece correlacionar con la posición en la respuesta.
- [ ] **Comunidad y video:** Reddit, YouTube y LinkedIn recurren en el tope de análisis independientes. **Participar genuinamente; el spam se detecta y se penaliza.**
- [ ] **Menciones sin enlace:** correlacionan más fuertemente con visibilidad en IA que los backlinks en estudios de vendors
- [ ] **Datos propietarios:** "completamos X proyectos en Y industrias" le gana a "somos los mejores". **Publicá lo que un competidor no puede reproducir reescribiendo el mismo artículo.**
- [ ] Enlaces, menciones, referencias, asociaciones y corroboración local **legítimos**

**Prohibido:** esquemas manipulativos de enlaces, reseñas falsas, citaciones fabricadas, menciones no auténticas.

### 7.4 AEO consciente de plataforma

- La guía 2026 de Google dice que **el SEO fundacional sigue siendo relevante** para sus funciones generativas, y enfatiza contenido **único, valioso y no-commodity**
- Para visibilidad en ChatGPT Search, verificar si **`OAI-SearchBot` está bloqueado** cuando se desea descubrimiento y citación pública
- Tratá las reglas de crawler, el reporting y la medición de referrals de IA como **configuración versionada** — la guía de plataforma cambia

---

## FASE 8 · Capa local

**Aplica a servicios, retail, salud y oficios.** Este es el segmento **menos afectado por el zero-click**: las queries locales y de alta intención todavía generan clics.

### 8.1 Ponderación de señales

*(Whitespark 2026 · 187 factores evaluados por 47 especialistas · **encuesta de practicantes = evidencia direccional**)*

| Señal | Peso |
|---|---|
| Google Business Profile | **32%** |
| On-page | 19% |
| Reseñas | 16–20% ↑ |
| Enlaces | 15% |
| Comportamiento | 8% |
| Citaciones / directorios | 7% |

> *"El negocio está abierto al momento de la búsqueda"* entró al top 5 por primera vez.

### 8.2 Ejecución

- [ ] **GBP es el activo #1.** Categoría primaria correcta, servicios cargados, horarios reales, fotos originales, posts activos
- [ ] Información completa y precisa: servicios, categorías, datos de contacto, ubicación/área de servicio, horarios, destino web
- [ ] **Velocidad de reseñas > cantidad total.** Un flujo constante le gana a 200 viejas. Pedir sistemáticamente, responder a todas, **nunca fabricar**
- [ ] Prueba local real: reseñas, proyectos, testimonios, casos de estudio, involucramiento comunitario, enlaces/menciones locales
- [ ] **Páginas de ubicación solo donde operás genuinamente**, con contenido sustancialmente distinto: proyectos locales, regulaciones, necesidades locales

**Prohibido:**

- ❌ Clonar páginas cambiando el nombre de la ciudad — **es contenido delgado (doorway)**
- ❌ Inventar áreas de servicio — no dan ranking y ponen el perfil en riesgo
- ❌ Ubicaciones o reseñas fabricadas

> **Sobre proximidad:** puede ayudarte contra un competidor a 200 km, pero **relevancia y prominencia siguen importando.**

---

## FASE 9 · QA y gates

**QA reporta defectos; no reescribe.** Los conflictos estratégicos escalan al orquestador.

### 9.1 Checklist de QA SEO

- [ ] Cluster objetivo e intención aprobados
- [ ] KPS y ROS registrados donde aplique
- [ ] Sin canibalización material
- [ ] **SERP en vivo revisado y huecos competitivos documentados**
- [ ] Tipo de página correcto seleccionado
- [ ] Title/H1/encabezados/copy/URL/metadatos/imágenes/enlaces internos cumplen el estándar
- [ ] Contenido útil y diferenciado
- [ ] Chequeos de indexabilidad/canonical/rastreabilidad pasan
- [ ] Soporte de enlazado interno existe
- [ ] Autoridad/confianza/prueba local adecuada
- [ ] Clase de freshness y próxima fecha de revisión asignadas
- [ ] **SEO-R alcanza el umbral y ningún gate crítico falla**

### 9.2 Checklist de QA AEO

- [ ] La pregunta/tarea central es explícita
- [ ] La respuesta principal es directa y recuperable
- [ ] Los encabezados describen con precisión las respuestas
- [ ] Las entidades son inequívocas
- [ ] Los pasajes importantes son autocontenidos
- [ ] Las afirmaciones materiales están respaldadas
- [ ] El contenido agrega información no-commodity o interpretación experta
- [ ] Las preguntas de seguimiento se manejan **sin deriva de intención**
- [ ] Los datos estructurados, donde se usan, coinciden con el contenido visible
- [ ] La información sensible al tiempo está actualizada
- [ ] La accesibilidad de crawlers se alinea con la estrategia de plataforma
- [ ] **AEO-R alcanza el umbral y ningún gate crítico falla**

**No se dan puntos por:** cantidad superficial de FAQs, *chunking* artificial, o afirmaciones sin respaldo sobre visibilidad en IA.

### 9.3 Gates críticos — anulan el score numérico

Un promedio ponderado alto **no puede** salvar una página que falla cualquiera de estos:

| Gate | Falla si |
|---|---|
| **Técnico** | `noindex` incorrecto, rastreo bloqueado, canonicalización rota, o contenido prioritario inaccesible |
| **Intención** | La página no satisface la intención de búsqueda pretendida |
| **Calidad / spam** | Keyword stuffing, duplicación doorway, enlaces manipulativos, o contenido de bajo valor a escala |
| **Evidencia** | Afirmaciones de alto impacto sin respaldo sin resolver |

**Cuando dos gates chocan:** resolvé por la jerarquía de principios (§0.3) y registrá qué principio decidió.

*(Bandas de rating y fórmulas de scoring completas en § Sistema 5.)*

---

## FASE 10 · Publicación y validación técnica

**Verificá que el contenido aprobado se implementó correctamente después de publicar.** Esto captura errores de deploy que el QA de contenido no puede detectar.

- [ ] URL en vivo responde con el código de estado correcto
- [ ] Indexable, canonical correcto
- [ ] Metadatos correctos y no heredados
- [ ] Schema presente, válido y coincidente con lo visible
- [ ] Enlaces internos funcionando
- [ ] Imágenes cargando
- [ ] Descubrimiento: en sitemap, enlazada internamente
- [ ] Evidencia de renderizado: el contenido existe sin JS

> **Nunca afirmes verificación en vivo si la página no pudo realmente accederse o renderizarse.** Reportá el fallo de acceso.

---

## FASE 11 · Medición y ciclo continuo

*(Framework completo, umbrales y matriz de observabilidad en § Sistema 7–8.)*

### 11.1 Las cinco capas — mínimo indispensable

**Si no estás midiendo las cinco, no sabés si funciona.** Las capas 1 y 4 son las que casi todos se saltan. **Establecé la línea base antes de optimizar.**

| Capa | Qué mide | Dónde |
|---|---|---|
| **1 · Acceso** | ¿Los bots entran? GPTBot, ClaudeBot, PerplexityBot, ChatGPT-User | **Solo en logs de servidor — invisible en GA4.** Validar identidad por DNS inverso |
| **2 · Visibilidad** | ¿Te citan? | Biblioteca fija de **20–50 prompts de comprador** (comercial, informacional, local, comparación) corridos **mensualmente** + GSC (reporte de IA generativa) + Bing Webmaster Tools |
| **3 · Referrals** | Tráfico de asistentes | GA4. **Caveat: AI Mode y AIO suelen caer como Direct — este número siempre subestima** |
| **4 · Dark funnel** | El efecto real | **Búsqueda de marca en GSC + conversiones de marca en GA4.** Te descubren en la IA y después buscan tu nombre |
| **5 · Negocio** | Leads calificados, pipeline, cerrados, ingresos | **El objetivo no es tráfico — es crecimiento** |

**Qué registrar en cada corrida de la capa 2:** ¿te mencionaron?, ¿te citaron?, ¿qué URL?, ¿qué competidores aparecieron?, ¿qué información faltaba?, ¿malinterpretó el negocio?

> **Por qué las capas 1 y 4 no son opcionales.** Sin la capa 1 no sabés si el problema es de contenido o de acceso. Sin la capa 4, GEO parece un fracaso — las respuestas de IA reducen clics por diseño, y el efecto aparece en búsqueda de marca, no en tráfico directo. Un sistema que mide solo las capas 3 y 5 va a concluir que GEO no funciona y matar una estrategia que sí está funcionando.

### 11.2 El bucle conversación → contenido

Las conversaciones con clientes son **inteligencia de intención de primera mano** — la fuente que casi nadie sistematiza.

| Paso | Ejemplo |
|---|---|
| Pregunta repetida | *"¿Financian equipamiento?"* |
| Tema + intención | Financiamiento de equipos · comercial |
| Hueco detectado | El sitio no tiene respuesta clara |
| **Acción SEO** | Apuntar a la demanda de búsqueda |
| **Acción AEO** | Responder directo, cerca del tope |
| **Acción GEO** | Declarar la oferta como hecho explícito |

### 11.3 Señales que disparan trabajo

| Señal | Acción |
|---|---|
| Query con impresiones y sin página dedicada | Oportunidad de contenido |
| Impresiones altas, CTR bajo | Revisar title, description y encaje de intención |
| Página indexada pero sin citaciones de IA | Revisar claridad, evidencia y completitud |
| Contenido que se volvió obsoleto | Refrescar — pero ver la regla abajo |
| Un prompt donde aparece un competidor y vos no | **Analizar qué fuente usó el modelo** |

> **Sobre freshness:** la frescura correlaciona con citación en respuestas de IA, **pero no hay fecha de vencimiento universal.** Monitoreá páginas en declive y refrescá cuando la información de fondo, la competencia o la intención de búsqueda **realmente cambien.** Cambiar solo la fecha **no** es freshness sustantiva.

**Priorizá por impacto de negocio, no por facilidad de ejecución.**

---

## Plan de implementación de 90 días

### Días 1–30 · Fundación y línea base

- [ ] Investigación de negocio y audiencia
- [ ] Inventario de afirmaciones con tiers de evidencia asignados
- [ ] Mapa de búsqueda y scoring de oportunidades (KPS)
- [ ] **Análisis de SERP en vivo de los clusters prioritarios (CDS/ROS)**
- [ ] Auditoría técnica: robots, sitemap, canonicals, metadatos, CWV
- [ ] Un solo dominio; 301 de todo lo demás
- [ ] Schema Organization + tipo específico
- [ ] GSC, Bing WT y analytics conectados
- [ ] **Revisión de acceso de crawlers de IA (los cuatro puntos de verificación)**
- [ ] **Línea base: biblioteca de prompts + logs de bots + conversiones**

### Días 31–60 · Contenido y respuestas

- [ ] Reescribir páginas prioritarias en formato answer-first
- [ ] Construir páginas faltantes de servicio y ubicación
- [ ] Inyectar estadísticas, citas y fuentes primarias
- [ ] FAQs reales + cobertura de preguntas de seguimiento
- [ ] Página "Sobre" densa en hechos
- [ ] Enlazado interno entre cluster y pilares
- [ ] Flujo sistemático de solicitud de reseñas
- [ ] **Asignar clase de freshness y próxima revisión a cada URL estratégica**

### Días 61–90 · Autoridad y ciclo

- [ ] GBP optimizado, entidad unificada en todos los perfiles
- [ ] Mapear los listicles que los motores ya citan para tus prompts
- [ ] Participación genuina en Reddit y comunidades de nicho
- [ ] Un activo de datos propietarios que otros quieran citar
- [ ] **Primera medición contra la línea base**
- [ ] Refrescar páginas de bajo rendimiento
- [ ] Calendario de contenido y refresh trimestral

---

## Checklist de lanzamiento

### Técnico

- [ ] Un dominio canónico
- [ ] robots.txt y sitemap generados desde el routing
- [ ] Metadatos únicos por ruta, no heredados
- [ ] HTML renderizado en servidor, sin dependencia de JS
- [ ] Core Web Vitals revisados en móvil
- [ ] Redirects y 404s revisados
- [ ] Schema validado y fiel al contenido visible
- [ ] **Acceso de crawlers de IA verificado (robots + CDN/WAF + anti-bot + respuesta HTTP real)**

### Contenido y entidad

- [ ] Intención primaria definida por página
- [ ] Cada H2 es una pregunta real, respondida en 2 líneas
- [ ] Preguntas de seguimiento cubiertas
- [ ] **Cada afirmación con tier de evidencia asignado; nada "sin respaldo" se publica**
- [ ] **Ninguna capacidad inferida de las normas de la industria**
- [ ] Autor con credenciales verificables
- [ ] Página "Sobre" completa e inequívoca
- [ ] NAP idéntico entre sitio, GBP y perfiles
- [ ] Enlazado interno implementado

### Medición

- [ ] Search Console conectado
- [ ] Bing Webmaster Tools conectado
- [ ] Analytics y tracking de conversiones configurados
- [ ] **Logs de servidor accesibles y revisados**
- [ ] **Biblioteca de 20–50 prompts definida**
- [ ] **Línea base registrada antes de optimizar**
- [ ] Revisión a 90 días agendada
