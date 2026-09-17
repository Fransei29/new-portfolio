# Sistema SEO · AEO · GEO — Governance, scoring, agentes y medición

**Versión 2.0** · Documento hermano de [`00-DOCTRINA.md`](00-DOCTRINA.md) y [`01-APLICACION.md`](01-APLICACION.md)

> Este archivo responde **cómo se opera, se puntúa, se mide y se automatiza.**
> Es la referencia operativa: QA, ciclo de vida, arquitectura de agentes y stack de herramientas.

---

## 1. Nota de calibración — leer antes de usar cualquier fórmula

Las fórmulas de este documento producen **consistencia, trazabilidad y capacidad de auditoría** — **no medición.**

- Los factores 1–5 son juicio humano o de agente, no observación instrumentada.
- Los pesos son **convenciones versionadas**, no constantes descubiertas. `OSVR = SEO-R×0,60 + AEO-R×0,40` es una decisión de governance, ajustable según el modelo de adquisición del negocio — no una ley.
- El aparato matemático sugiere una precisión que los inputs no soportan. Su valor real es otro: **dos analistas puntuando la misma página llegan a algo parecido, y cualquiera puede ver por qué falló.**

**Por lo tanto:**

- Puntuá **solo dimensiones respaldadas por evidencia.**
- Usá **N/A** para factores no disponibles o irrelevantes, y **renormalizá los pesos restantes.** Nunca otorgues puntos automáticos.
- **Nunca fabriques** rankings, tráfico, métricas de backlinks, Core Web Vitals ni citaciones de IA.
- Los **gates críticos anulan el promedio ponderado** (§5.5). Un 92 con `noindex` mal puesto sigue siendo un fallo.
- **Versioná las fórmulas** para que los scores históricos sigan siendo interpretables cuando cambien los pesos.

---

## 2. Readiness ≠ Performance

Esta distinción es estructural en todo el sistema.

| | **Readiness** | **Performance** |
|---|---|---|
| **Qué mide** | Calidad controlable | Resultados reales |
| **Cuándo** | Antes de publicar / en refresh | Después de publicar |
| **Scores** | SEO-R, AEO-R, OSVR | PERF |
| **Fuente** | Inspección de la página y del SERP | GSC, analytics, rank tracking, datos de citación |
| **Controlás** | Sí | No — solo influís |

**Por qué importa.** Mezclarlas produce los dos errores clásicos: culpar al contenido cuando el problema es autoridad de dominio, o felicitarse por rankear cuando el contenido es mediocre y el SERP estaba vacío.

**Regla:** mantené performance separado de readiness y puntuá solo con la evidencia efectivamente disponible.

---

## 3. Los scores

### 3.1 SEO Readiness Score (SEO-R)

```
SEO-R = Σ(score del módulo × peso del módulo), normalizado a 0–100
```

Puntuá cada módulo aplicable **0–100**. Si un módulo es genuinamente N/A, **quitá su peso y renormalizá.**

| Módulo | Peso | Qué se evalúa |
|---|---|---|
| Keyword + intención | **20%** | Encaje de cluster, claridad de intención, mapeo, canibalización |
| Adecuación competitiva | **15%** | Encaje de SERP, huecos, diferenciación, superioridad en página 1 |
| Calidad de contenido + confianza | **15%** | Utilidad, completitud, originalidad, evidencia |
| SEO on-page | **15%** | Title, H1, encabezados, copy, media, URL, metadatos |
| Preparación técnica | **10%** | Indexabilidad, canonical, rastreabilidad, renderizado, schema |
| Arquitectura interna | **10%** | Enlaces entrantes/salientes, anchors, relación con hub, riesgo de orfandad |
| Autoridad / corroboración | **10%** | Soporte externo, prueba local, reseñas/menciones donde sea relevante |
| Freshness | **5%** | Clase, última revisión, vigencia factual, triggers |

### 3.2 AEO Readiness Score (AEO-R)

```
AEO-R = Σ(score del módulo × peso del módulo), normalizado a 0–100
```

| Módulo | Peso | Qué se evalúa |
|---|---|---|
| Accesibilidad IA/búsqueda | **10%** | Accesibilidad pública y elegibilidad de crawler donde se desea |
| Respondibilidad | **15%** | Directividad, claridad, calidad de la respuesta central |
| Estructura de recuperación | **10%** | Encabezados, límites, formatos estructurados |
| Claridad de entidad | **10%** | Personas, empresa, producto/servicio, ubicación inequívocos |
| Evidencia + confianza | **15%** | Fuentes, expertise, verificabilidad |
| Ganancia de información | **15%** | Valor original o no-commodity |
| Mérito como fuente / citación | **10%** | Hechos, métodos, datos, insight útiles y autocontenidos |
| Completitud de contexto | **5%** | Preguntas de seguimiento y cobertura semántica |
| Freshness | **5%** | Hechos actuales y governance de actualización |
| Corroboración externa | **5%** | Referencias, reseñas, menciones independientes, consistencia |

> **AEO-R mide readiness y calidad como fuente. No predice ni garantiza citación.**

### 3.3 Los componentes de AEO — qué se está puntuando

1. **Accesibilidad técnica.** El contenido público importante debe ser accesible al crawler relevante donde se desea visibilidad.
2. **Respondibilidad.** Las preguntas clave reciben respuestas directas y claras **antes** de la explicación profunda.
3. **Claridad de recuperación.** Encabezados, secciones, listas, tablas y párrafos crean **límites de respuesta limpios**.
4. **Claridad de entidad.** Empresas, personas, servicios, productos, ubicaciones y relaciones son inequívocos.
5. **Evidencia y verificabilidad.** Las afirmaciones materiales se respaldan con prueba de primera mano o fuentes autorizadas.
6. **Ganancia de información.** La página agrega material útil más allá de resúmenes genéricos.
7. **Mérito como fuente.** Hechos, expertise, métodos, ejemplos, datos o insight le dan a otro sistema **una razón para citar**.
8. **Completitud de contexto.** Las preguntas de seguimiento naturales se responden **sin derivar a intenciones no relacionadas**.
9. **Autoridad temática.** El contenido de soporte y las relaciones internas refuerzan el tema.
10. **Corroboración externa.** Menciones, reseñas, referencias y enlaces independientes refuerzan la entidad y las afirmaciones.
11. **Freshness.** Los hechos y recomendaciones sensibles al tiempo se mantienen vigentes.
12. **Medición.** Visibilidad en features de búsqueda, citaciones de IA donde sean medibles, tráfico de referral, engagement y conversiones.

### 3.4 Scores competitivos

**Competitive Difficulty Score** — más alto = más difícil:

```
CDS = 20 × [(SERP×0,25) + (CONTENT×0,20) + (AUTH×0,20) + (STABLE×0,15) + (SAT×0,10) + (LOCAL×0,10)]
```

Cada componente 1–5: fuerza del SERP, calidad del contenido competidor, barrera de autoridad, estabilidad del SERP, saturación de intención, desventaja local. **Usar evidencia competitiva observada.**

**Ranking Opportunity Score** — más alto = más atractivo:

```
ROS = 20 × [(INTFIT×0,30) + (GAP×0,20) + (AUTHFEAS×0,15) + (TRAC×0,15) + (CTXADV×0,10) + (VOL×0,10)]
```

Cada componente 1–5: encaje de intención, hueco explotable, factibilidad de autoridad, tracción existente, ventaja de contexto/local, apertura del SERP.

**Keyword Priority Score** *(definición completa en Aplicación §2.4)*:

```
KPS = 20 × [(BV×0,30) + (INT×0,20) + (REL×0,15) + (OPP×0,15) + (TRAC×0,10) + (FIT×0,10)]
```

### 3.5 Scores agregados y de riesgo

**Staleness Risk Score:**

```
SRISK = (Edad-vs-SLA×0,30) + (Volatilidad factual×0,25) + (Declive de performance×0,20)
      + (Cambio de competidor/SERP×0,15) + (Cambio de negocio×0,10)
```

Cada componente 0–100 desde evidencia. **Riesgo alto dispara revisión, no reescritura automática.**

**Overall Search Visibility Readiness:**

```
OSVR = (SEO-R × 0,60) + (AEO-R × 0,40)
```

Ponderación de governance por defecto; **ajustar según el modelo de adquisición.**

**Performance Score (opcional):**

```
PERF = score ponderado normalizado al sitio, sobre:
       tendencia de visibilidad + CTR + tráfico orgánico calificado
       + conversiones + evidencia de IA/referral/citación
```

**Mantené PERF separado de readiness y puntuá solo con la evidencia realmente disponible.**

---

## 4. Governance de freshness

### 4.1 Clases F1–F5

| Clase | Volatilidad / rol | Cadencia de revisión | Ejemplos |
|---|---|---|---|
| **F1 Rápida** | Cambio muy veloz | **Mensual o por evento** | Noticias, regulaciones, precios/tecnología de cambio rápido |
| **F2 Dinámica** | Cambio frecuente | **Cada 3 meses** | Estadísticas, análisis de mercado, comparativas |
| **F3 Comercial** | Alta importancia de negocio | **Cada 3–6 meses** | Servicio, producto, categoría, ubicación clave |
| **F4 Evergreen competitiva** | Estable pero disputada | **Cada 6 meses** | Guías principales, blogs estratégicos |
| **F5 Evergreen estable** | Baja volatilidad factual | **Cada 12 meses** | Contenido de referencia fundacional / confianza |

### 4.2 Reglas de freshness

- **La cadencia es un SLA interno, no una regla de Google.**
- **Disparar revisión anticipada** cuando cambien materialmente: rankings, CTR, impresiones, conversiones, intención del SERP, fuerza de competidores, hechos, precios, regulaciones o datos del negocio.
- **Rastrear por URL:** fecha de publicación, última actualización sustantiva, última revisión SEO, próxima revisión, clase de freshness, tendencia de performance, cambio de competidor/SERP.
- **La edad sola no fuerza una reescritura.**
- **No actualices fechas solo para parecer fresco** — cambiar solo la fecha no es freshness sustantiva.

**Tipos de intervención:** sin acción · menor · mayor · consolidar · retirar.

---

## 5. Bandas de rating y gates

### 5.1 Bandas

| Score | Rating | Interpretación por defecto |
|---|---|---|
| **90–100** | Excelente / listo para publicar | Readiness alto; continuar monitoreo competitivo y de performance |
| **80–89** | Fuerte | Publicable con mejoras menores, salvo que falle un gate crítico |
| **70–79** | Condicional | Los huecos materiales deben corregirse antes de un lanzamiento prioritario |
| **60–69** | Débil | No recomendado para publicación estratégica sin revisión |
| **<60** | No listo | Deficiencias mayores de readiness |

### 5.2 Gates críticos

**Anulan el score numérico.** Un promedio alto no salva una página que falla cualquiera de estos:

| Gate | Falla si |
|---|---|
| **Técnico** | `noindex` incorrecto, rastreo bloqueado, canonicalización rota, o contenido prioritario inaccesible |
| **Intención** | La página no satisface la intención de búsqueda pretendida — **no puede estar plenamente lista** |
| **Calidad / spam** | Keyword stuffing, duplicación doorway, enlaces manipulativos, contenido de bajo valor a escala |
| **Evidencia** | Afirmaciones de alto impacto sin respaldo, sin resolver — **antes de considerarla digna de ser fuente** |

### 5.3 Desempate entre gates

Cuando dos gates o dos reglas entren en conflicto, resolvé por la **jerarquía de principios** de la Doctrina:

```
Verdad → Evidencia → Intención del usuario → Utilidad →
Relevancia de negocio → Autoridad → SEO/AEO/GEO → Conversión
```

Gana el de la izquierda. **Registrá qué principio decidió.**

Esta es la autoridad final del sistema. Sin ella, los conflictos entre agentes se resuelven por criterio del momento y el sistema deriva.

### 5.4 Umbrales de bloqueo

| Score | Umbral | Consecuencia |
|---|---|---|
| SEO-R | < 80 o gate crítico | Bloquear publicación prioritaria hasta remediar |
| AEO-R | < 80 o gate crítico | Bloquear publicación prioritaria hasta remediar |
| SRISK | > 70 o evento disparador | Enrutar página para revisión |

---

## 6. Arquitectura de agentes

**Principio de arquitectura:** los especialistas analizan y puntúan; **un único camino de contenido controlado ejecuta.** Los agentes se pasan artefactos estructurados en lugar de reescribir independientemente la misma página.

### 6.1 Flujo recomendado

```
Estrategia → Keyword & Intención → SERP/Competidor → Arquitectura SEO →
Análisis AEO → Brief de Contenido → Creación de Contenido → QA SEO → QA AEO →
Revisión → Publicación → Validación Técnica → Monitoreo de Performance →
Freshness/Staleness → Reingreso al ciclo
```

### 6.2 Mínimo viable vs. premium

| Agente | Mínimo | Premium | Valor que entrega |
|---|---|---|---|
| **Orquestador de Estrategia SEO/AEO** | CORE | CORE | Dueño de objetivos, reglas, conflictos, prioridades, handoffs |
| **Keyword & Intención** | CORE | CORE | Descubre, clusteriza, puntúa, mapea, previene canibalización |
| **SERP & Competidor** | CORE | CORE | Requerido para objetivo de página 1; define qué hay que superar |
| **Arquitectura / Optimización SEO** | CORE | CORE | Define tipo de página, on-page, técnica, enlazado, encaje en el sitio |
| **Especialista AEO** | CORE | CORE | Define respondibilidad, entidad, recuperación, evidencia, mérito como fuente |
| **Brief / Planificación de Contenido** | El orquestador puede absorberlo | DEDICADO | Crea un brief ejecutable y resuelve solapamiento entre especialistas |
| **Creador de Contenido** | CORE | CORE | Crea/refresca páginas y blogs aprobados |
| **QA SEO** | CORE | CORE | Puntúa readiness SEO y rechaza fallos |
| **QA AEO** | CORE | CORE | Puntúa readiness AEO y rechaza fallos |
| **Publicación / Validación Técnica** | Manual/combinado | DEDICADO | Verifica la implementación en vivo |
| **Performance & Ranking** | Revisión manual | DEDICADO | Mide SERP, tráfico, referral y conversión reales |
| **Freshness / Staleness** | Calendario manual | DEDICADO | Automatiza revisión de ciclo de vida y ruteo de refresh |
| **Especialista Local** | CORE CONDICIONAL | DEDICADO si es local | Requerido cuando importa el pack local / área de servicio |
| **Autoridad / Off-site** | **⚠️ Ver nota** | DEDICADO | Construye autoridad y corroboración externa legítima |

> **⚠️ Corrección respecto del diseño original.** El especialista de Autoridad/Off-site figuraba como *opcional/manual* en el mínimo viable. **Si GEO es un objetivo, pasa a CORE.** Razón: aproximadamente el 85% de las menciones de marca en respuestas de IA se originan en fuentes de terceros. Un sistema que trata el off-site como opcional está tratando el canal principal de GEO como accesorio. *(Ver Doctrina §10.)*

### 6.3 Fichas de agente

Cada ficha define: **Propósito · Intención · Rol · Inputs · Outputs · Guardrails.**
La **Intención** es la capa de objetivo estable del system prompt del agente (§7).

---

#### 1 · Orquestador de Estrategia SEO/AEO

- **Propósito:** Mantener la estrategia, objetivos, restricciones, reglas de scoring y coordinación a nivel sitio.
- **Intención:** Maximizar la visibilidad de búsqueda y respuesta relevante para el negocio, sin que las optimizaciones locales dañen el sitio completo.
- **Rol:** Seleccionar agentes; resolver conflictos; aprobar prioridades; controlar decisiones de crear-vs-refrescar; ser dueño del estado del workflow.
- **Inputs:** Objetivos de negocio, audiencias, mercados, inventario del sitio, universo de keywords, scores, datos de performance, hallazgos de especialistas.
- **Outputs:** Cola de trabajo priorizada; cluster objetivo aprobado; ruteo; umbrales de aceptación; resoluciones de conflicto.
- **Guardrails:** Nunca inventar datos de performance; **los gates críticos técnicos/de calidad no pueden anularse con un promedio alto**; resolver conflictos por la jerarquía de principios y registrar el principio que decidió.

#### 2 · Agente de Keyword & Intención

- **Propósito:** Descubrir, normalizar, clusterizar, clasificar, priorizar y mapear la demanda de búsqueda.
- **Intención:** Asegurar que cada página apunte a la oportunidad correcta con la intención correcta y sin canibalización evitable.
- **Rol:** Descubrimiento de keywords; clustering; clasificación de intención; KPS; mapeo query→página; detección de huecos y canibalización.
- **Inputs:** Datos de query de primera mano, herramientas de keywords, SERPs, lenguaje de clientes, productos/servicios, ubicaciones, términos de competidores.
- **Outputs:** Universo de keywords; clusters; familias de queries primarias/secundarias; intención; KPS; URL objetivo; recomendación de crear/actualizar.
- **Guardrails:** **Sin regla de una-página-por-keyword; sin objetivo de densidad;** separar páginas solo por intenciones materialmente distintas.

#### 3 · Agente de SERP & Competidor

- **Propósito:** Entender qué gana actualmente y dónde existe una ventaja defendible.
- **Intención:** Convertir el panorama de página 1 en un brief competitivo basado en evidencia.
- **Rol:** Analizar resultados top, tipos de página, patrones de intención, huecos de contenido, barreras de autoridad, contexto local, frescura, estabilidad.
- **Inputs:** Cluster objetivo, SERP en vivo, páginas de competidores, evidencia de autoridad/marca disponible.
- **Outputs:** Brief competitivo; CDS; inputs de ROS; expectativas mínimas; oportunidades de diferenciación; riesgos.
- **Guardrails:** **Distinguir hechos observados de razones de ranking inferidas; no inventar fuerza de backlinks ni métricas.**

#### 4 · Agente de Arquitectura / Optimización SEO

- **Propósito:** Traducir la inteligencia de búsqueda en una página y arquitectura de sitio conformes a SEO.
- **Intención:** Hacer la página accesible, internamente soportada, semánticamente clara y correctamente posicionada.
- **Rol:** Tipo de página; URL; dirección de title/H1; encabezados; enlaces internos; canonicals; schema; requisitos locales y de rastreo/indexación.
- **Inputs:** Output de keyword/intención, brief de competidor, arquitectura del sitio, inventario de contenido, reglas técnicas.
- **Outputs:** Especificación SEO; requisitos de enlazado interno; criterios técnicos de aceptación; categoría de página y recomendación de freshness.
- **Guardrails:** Evitar patrones doorway, stuffing, páginas de intención duplicada y afirmaciones técnicas sin respaldo.

#### 5 · Agente Especialista AEO

- **Propósito:** Diseñar estructura orientada a respuesta y a recuperación.
- **Intención:** Hacer que el contenido útil sea más fácil de entender, recuperar, verificar y potencialmente citar por sistemas de respuesta.
- **Rol:** Mapeo de preguntas; respuestas directas; definiciones de entidad; necesidades de evidencia; estructura de pasajes; completitud de contexto; ganancia de información.
- **Inputs:** Intención, especificación SEO, huecos de competidores, datos de entidad, material fuente, reglas de plataforma actuales.
- **Outputs:** Brief AEO; bloques de respuesta requeridos; necesidades de evidencia/fuentes; mapa de entidades; oportunidades de mérito como fuente.
- **Guardrails:** **Sin garantías de citación; sin cantidad forzada de FAQs; sin hacks AEO sin respaldo.**
- **Extensión GEO:** este agente también es dueño de la capa GEO — estadísticas con fuente y fecha, citas verbatim, enlaces a fuente primaria, desambiguación de entidad, y la coordinación con el agente de Autoridad/Off-site.

#### 6 · Agente de Brief / Planificación de Contenido

- **Propósito:** Fusionar las recomendaciones de los especialistas en una especificación de escritura coherente.
- **Intención:** Prevenir instrucciones contradictorias y reducir el riesgo de interpretación del escritor.
- **Rol:** Resolver solapamientos; secuenciar secciones; especificar evidencia; definir CTA y enlaces; fijar intención y tipo de página.
- **Inputs:** Brief de keywords, brief de competidor, especificación SEO, brief AEO, reglas de marca/voz.
- **Outputs:** Brief de contenido aprobado con elementos obligatorios, deseables y prohibidos, y criterios de aceptación.
- **Guardrails:** **No puede alterar silenciosamente la intención objetivo**; los conflictos estratégicos van al orquestador.

#### 7 · Creador de Contenido

- **Propósito:** Crear o refrescar la página/blog desde el brief aprobado.
- **Intención:** Producir contenido útil, original, natural y consciente de la conversión, que satisfaga los requisitos SEO y AEO.
- **Rol:** Redactar/revisar; integrar evidencia; formatear secciones; implementar copy de enlaces/CTA; preservar el lenguaje natural.
- **Inputs:** Brief aprobado, fuentes, voz de marca, plantilla de página, página previa si es refresh.
- **Outputs:** Borrador más lista de fuentes y resumen de cambios.
- **Guardrails:** **No redefine la estrategia de keywords; nunca inventa estadísticas, credenciales, casos de estudio, reseñas ni fuentes.** Nunca infiere una capacidad del negocio desde normas de la industria.

#### 8 · Agente de QA SEO

- **Propósito:** Evaluar independientemente si el contenido terminado cumple los estándares SEO.
- **Intención:** Prevenir que contenido débil o desalineado se publique **solo porque el borrador está completo**.
- **Rol:** Correr el checklist SEO; puntuar módulos; detectar problemas de canibalización/stuffing/intención; validar competencia y enlaces.
- **Inputs:** Página borrador/publicada, especificación SEO, cluster objetivo, brief de competidor, inventario del sitio.
- **Outputs:** SEO-R; pasa/condicional/falla; defectos; remediación priorizada; criterios de aceptación.
- **Guardrails:** **QA reporta defectos, no reescribe;** los conflictos estratégicos escalan.

#### 9 · Agente de QA AEO

- **Propósito:** Evaluar independientemente la respondibilidad y el mérito como fuente.
- **Intención:** Asegurar que el contenido sea comprensible, respaldado por evidencia, amigable a la recuperación y significativamente útil.
- **Rol:** Puntuar respondibilidad, recuperación, claridad de entidad, evidencia, ganancia de información, mérito como fuente, freshness, corroboración.
- **Inputs:** Página borrador/publicada, brief AEO, fuentes, entidades, reglas de plataforma.
- **Outputs:** AEO-R; pasa/condicional/falla; defectos; remediación.
- **Guardrails:** **Sin puntos por cantidad superficial de FAQs, chunking artificial, o afirmaciones sin respaldo sobre visibilidad en IA.**

#### 10 · Agente de Publicación / Validación Técnica

- **Propósito:** Verificar que el contenido aprobado se implementó correctamente después de publicar.
- **Intención:** Capturar errores de despliegue que el QA de contenido no puede detectar.
- **Rol:** Chequear URL en vivo/estado/indexabilidad/canonical/metadatos/schema/enlaces/imágenes/descubrimiento/evidencia de renderizado.
- **Inputs:** URL publicada, especificación SEO aprobada, contenido final, acceso técnico.
- **Outputs:** Reporte de validación de lanzamiento; fallos críticos de despliegue; tareas de remediación.
- **Guardrails:** **Nunca afirmar verificación en vivo si la página no pudo realmente accederse o renderizarse.**

#### 11 · Agente de Performance & Ranking

- **Propósito:** Medir la visibilidad real de búsqueda y respuesta después del lanzamiento.
- **Intención:** Determinar si una página lista efectivamente gana visibilidad, clics, visitas calificadas, referrals y conversiones.
- **Rol:** Monitorear queries, tendencias de ranking/visibilidad, CTR, tráfico orgánico, conversiones, competidores, evidencia de IA/referral donde esté disponible.
- **Inputs:** Search Console, analytics, rank tracking, datos de visibilidad IA, monitoreo de competidores.
- **Outputs:** PERF; alertas de tendencia; hipótesis diagnósticas; recomendaciones de refresh/autoridad/estrategia.
- **Guardrails:** **Separar hechos de hipótesis; nunca fabricar datos de citación de IA no disponibles.**

#### 12 · Agente de Freshness / Staleness

- **Propósito:** Gestionar el ciclo de vida del contenido y enrutar páginas para revisión antes de que decaigan.
- **Intención:** Proteger rankings y mantener afirmaciones, evidencia y valor de usuario vigentes **sin reescrituras innecesarias**.
- **Rol:** Asignar F1–F5; rastrear actualizaciones/revisiones; calcular SRISK; monitorear triggers; recomendar tipo de intervención.
- **Inputs:** Inventario de páginas, fechas, clase de freshness, performance, cambios de SERP, cambios de negocio/producto.
- **Outputs:** SRISK; próxima revisión; cola de refresh; recomendación de sin-acción/menor/mayor/consolidar/retirar.
- **Guardrails:** **La edad sola no fuerza una reescritura; los cambios de solo fecha no son freshness sustantiva.**

#### 13 · Agente Especialista Local *(condicional)*

- **Propósito:** Optimizar el pack local, Maps y el descubrimiento orgánico restringido geográficamente.
- **Intención:** Aumentar relevancia, alineación de proximidad, prominencia y confianza local para áreas de servicio genuinas.
- **Rol:** Chequeos de Business Profile; páginas locales; categorías; reseñas/prueba; menciones locales; diferenciación por ubicación; análisis de competidores.
- **Inputs:** Ubicaciones/áreas de servicio, datos de Business Profile, SERPs locales, reseñas, páginas, competidores.
- **Outputs:** Especificación de SEO local; QA local; requisitos de contenido por ubicación; tareas de alineación perfil/sitio.
- **Guardrails:** **Sin ubicaciones fabricadas, reseñas falsas ni páginas doorway de ciudad.**

#### 14 · Agente de Autoridad / Off-site

> **Core cuando GEO es objetivo** — ver nota en §6.2.

- **Propósito:** Fortalecer la autoridad y corroboración externa legítima.
- **Intención:** Ganar señales relevantes que el contenido por sí solo no puede fabricar.
- **Rol:** Análisis de oportunidades de enlace/mención; conceptos de PR digital; alianzas; asociaciones/directorios; contribuciones de expertos; estrategia de reseñas. **Mapeo de listicles que los motores ya citan; participación genuina en comunidades; activos de datos propietarios.**
- **Inputs:** Páginas prioritarias, clusters, evidencia de autoridad de competidores, activos de marca, investigación/datos.
- **Outputs:** Plan de autoridad; lista de oportunidades; requisitos de activos; plan de medición.
- **Guardrails:** **Sin esquemas manipulativos de enlaces, reseñas falsas, citaciones fabricadas ni menciones no auténticas.**

---

## 7. Blueprint de diseño de prompts

**Principio de prompting:** usá la **Intención** de cada agente como la capa de objetivo estable de su system prompt. Después restringí inputs, outputs, scoring, handoffs y condiciones de fallo para que los especialistas se comporten de forma predecible.

| Componente del prompt | Qué codificar |
|---|---|
| **Identidad / rol** | Especialización y **no-responsabilidades explícitas** |
| **Intención primaria** | El resultado de optimización del que el agente es dueño |
| **Inputs** | Campos nombrados de los que puede depender; **la evidencia no disponible permanece no disponible** |
| **Tareas requeridas** | Responsabilidades y cálculos ordenados |
| **Reglas de decisión** | Clusterizar vs separar, crear vs actualizar, pasar vs fallar, refrescar vs retirar |
| **Modelo de scoring** | Fórmula, pesos, manejo de N/A, confianza, gates críticos |
| **Contrato de output** | Campos legibles por máquina más rationale conciso |
| **Disciplina de evidencia** | **Observado vs inferido vs asumido vs recomendado**; fuentes para afirmaciones externas |
| **Guardrails** | **Sin métricas, rankings, enlaces, citaciones, credenciales, reseñas ni accesos inventados** |
| **Handoff** | Siguiente agente y campos obligatorios |
| **Escalación** | Cuándo un conflicto estratégico vuelve al orquestador |
| **Condiciones de parada** | Cuando faltan prerequisitos o falla un gate crítico |

### 7.1 Campos de handoff recomendados

```
url_or_proposed_url
page_type
primary_intent
primary_keyword_cluster
secondary_query_families
keyword_priority_score
competitive_difficulty_score
ranking_opportunity_score
seo_requirements
aeo_requirements
evidence_sources
internal_links_required
freshness_class
next_review_date
seo_readiness_score
aeo_readiness_score
critical_failures
confidence
observed_evidence
inferred_findings
assumptions
recommended_next_agent
```

---

## 8. Estado compartido y ciclo de vida

### 8.1 Estado central de conocimiento SEO/AEO

- Universo de keywords y definiciones de cluster
- Scores de prioridad y etiquetas de intención
- URLs objetivo y categorías de página
- Observaciones de competidor/SERP **con fechas**
- Inventario de contenido y propiedad canónica de cada intención
- Grafo de enlazado interno y hubs temáticos
- Scores de readiness SEO/AEO
- Clases de freshness, fechas de actualización y próximas revisiones
- Historial de performance: impresiones, visibilidad, CTR, tráfico, conversiones
- Evidencia de citación/referral de IA y features de búsqueda donde sea medible
- Relaciones de canibalización y decisiones de consolidación
- Defectos abiertos, criterios de aceptación y estado del workflow

> **Regla de gestión de estado:** todos los agentes deben leer y escribir en el **mismo estado controlado** para reducir redescubrimiento, contradicciones, creación duplicada de páginas y deriva de scores.

### 8.2 Ciclo de vida

1. El orquestador selecciona objetivo/página/cluster.
2. Keyword & Intención valida demanda, intención, mapeo y prioridad.
3. SERP/Competidor valida competencia y oportunidad.
4. SEO define los requisitos de arquitectura de página/sitio.
5. AEO define requisitos de respondibilidad, entidad, evidencia y recuperación.
6. Brief de Contenido fusiona los requisitos.
7. Creador de Contenido redacta o refresca.
8. QA SEO y QA AEO puntúan **independientemente**.
9. Los fallos vuelven al Creador de Contenido; **los conflictos estratégicos vuelven al Orquestador**.
10. La página se publica tras la aprobación.
11. Validación de Publicación confirma la implementación en vivo.
12. Performance/Ranking monitorea resultados.
13. Freshness/Staleness rastrea el ciclo de vida y dispara revisión.
14. **La página reingresa a la etapa apropiada, en lugar de ser reescrita automáticamente.**

### 8.3 Despliegue mínimo

**Core:** Orquestador; Keyword & Intención; SERP/Competidor; SEO; AEO; Creador de Contenido; QA SEO; QA AEO.

- El Orquestador puede absorber temporalmente la planificación de Brief de Contenido.
- Validación de publicación, revisión de analytics y freshness pueden empezar como **procedimientos manuales**.
- Si el descubrimiento local es material, **el Especialista Local entra al set core**.
- **Si GEO es objetivo, Autoridad/Off-site entra al set core** (§6.2).

### 8.4 Despliegue premium

- Planificación de Brief de Contenido dedicada
- Validación de Publicación/Técnica en vivo
- Monitoreo de Performance & Ranking
- Gestión automatizada del ciclo de vida de Freshness/Staleness
- Especialista Local dedicado donde la geografía sea material
- Especialización de Autoridad/Off-site para SERPs competitivos
- **Estado compartido y contratos de handoff explícitos legibles por máquina**

---

## 9. Medición

### 9.1 Las cinco capas

| Capa | Qué mide | Fuente | Nota crítica |
|---|---|---|---|
| **1 · Acceso** | ¿Los bots entran? GPTBot, ClaudeBot, PerplexityBot, ChatGPT-User, OAI-SearchBot | **Logs de servidor** | **Invisible en GA4.** Validar identidad por **DNS inverso**, no por user-agent |
| **2 · Visibilidad** | ¿Te citan? | Biblioteca de **20–50 prompts** de comprador corrida mensualmente + GSC (reporte de IA generativa) + Bing Webmaster Tools | Registrar: mención, citación, URL, competidores, información faltante, malinterpretaciones |
| **3 · Referrals** | Tráfico de asistentes | GA4 | **AI Mode y AIO suelen caer como Direct — siempre subestima** |
| **4 · Dark funnel** | El efecto real | **Búsqueda de marca en GSC + conversiones de marca en GA4** | Acá aparece el efecto: te descubren en la IA y después buscan tu nombre |
| **5 · Negocio** | Leads calificados, pipeline, cerrados, ingresos | CRM / analytics | **El objetivo no es tráfico — es crecimiento** |

> **Las capas 1 y 4 son las que casi todos se saltan, y son las que hacen la diferencia entre saber y suponer.** Sin la capa 1 no distinguís un problema de contenido de un bloqueo de CDN. Sin la capa 4, GEO parece un fracaso — las respuestas de IA reducen clics por diseño — y el sistema mata una estrategia que funcionaba.

**Establecé la línea base antes de optimizar.**

### 9.2 Matriz de observabilidad

*(Los umbrales de ejemplo **no son reglas universales de fallo** — calibrar contra la línea base del propio sitio y el impacto de negocio.)*

| Señal | Fuente preferida | Cadencia | Disparador por defecto | Dueño / respuesta |
|---|---|---|---|---|
| **LCP** | CrUX; PSI; Lighthouse para diagnóstico | Semanal + deploy | Campo p75 > 2,5 s o regresión material | Performance → análisis de causa raíz técnica |
| **INP** | CrUX; RUM; PSI | Semanal | Campo p75 > 200 ms o regresión material | Performance → análisis de JS/hilo principal |
| **CLS** | CrUX; PSI; Lighthouse | Semanal + deploy | Campo p75 > 0,1 | Técnico → investigación de layout/media/fuentes |
| **FCP** | PSI/Lighthouse; RUM donde exista | Deploy + semanal | > 1,8 s guía campo/móvil o regresión material | Técnico → render-blocking/fuentes/servidor |
| **TTFB** | RUM/datos compatibles CrUX; telemetría de servidor | Diaria/semanal | > 0,8 s guía o regresión material | Técnico → servidor/caché/CDN/backend |
| **Indexabilidad** | GSC URL Inspection + crawler | Deploy + semanal | URL prioritaria no indexable / canonical incorrecto / bloqueada | Validación de Publicación → **incidente crítico** |
| **5xx / uptime** | Monitoreo de servidor + crawler | Continua | Cualquier 5xx sostenido en URLs prioritarias | Técnico → **respuesta a incidente inmediata** |
| **Salud de sitemap** | GSC + chequeos de sitemap generado | Diaria/semanal | Errores, sitemap obsoleto, URLs no canónicas/noindex incluidas | Técnico → regenerar/corregir |
| **robots.txt** | Validador automatizado + crawler | Deploy + diaria/semanal | Ruta importante o crawler bloqueado accidentalmente | Publicación/Técnico → **corrección crítica** |
| **Schema** | Validador de schema/crawler | Deploy + semanal | Datos estructurados inválidos o no coincidentes | Técnico/QA SEO → remediar |
| **Posición/visibilidad orgánica** | GSC + rank tracker | Diaria/semanal | Pérdida material; ej. 5+ posiciones en cluster prioritario | Performance → diagnóstico de SERP/competidor |
| **CTR orgánico** | GSC | Semanal | Declive material; ej. 20–25% vs. línea base comparable | Performance → revisión de title/SERP/intención |
| **Conversiones orgánicas** | Analytics | Semanal/mensual | Declive material o estadísticamente significativo | Estrategia/Performance → revisión de embudo + intención |
| **SEO Readiness** | QA SEO | Pre-publicación / refresh | < 80 o fallo de gate crítico | **Bloquear publicación prioritaria hasta remediar** |
| **AEO Readiness** | QA AEO | Pre-publicación / refresh | < 80 o fallo de gate crítico | **Bloquear publicación prioritaria hasta remediar** |
| **Staleness Risk** | Agente de Freshness | Semanal/mensual | SRISK > 70 o evento disparador | Enrutar página para revisión |
| **Citaciones IA / páginas citadas** | Bing AI Performance / proveedor soportado | Mensual | Declive significativo vs. línea base propia | AEO → revisión de mérito como fuente/competencia |
| **⭐ Acceso de crawlers de IA** | **Logs de servidor + petición HTTP con user-agent** | **Semanal + tras cambios de CDN/WAF** | **Cualquier crawler de la estrategia devuelve ≠ 200** | **Técnico → incidente crítico** |
| **⭐ Búsqueda de marca (dark funnel)** | **GSC queries de marca + conversiones de marca en GA4** | **Mensual** | **Declive de tendencia, o ausencia de crecimiento tras 90 días de trabajo GEO** | **Estrategia → revisión de atribución y de visibilidad capa 2** |

> ⭐ = filas añadidas en la fusión. Sin ellas, la matriz mide técnicamente bien pero **la cosa incompleta**: no detecta bloqueos de acceso ni el efecto real de GEO.

### 9.3 El bucle conversación → contenido

Las conversaciones con clientes son **inteligencia de intención de primera mano** — la fuente que casi nadie sistematiza.

| Paso | Ejemplo |
|---|---|
| Pregunta repetida | *"¿Financian equipamiento?"* |
| Tema + intención | Financiamiento de equipos · comercial |
| Hueco detectado | El sitio no tiene respuesta clara |
| Acción SEO | Apuntar a la demanda de búsqueda |
| Acción AEO | Responder directo, cerca del tope |
| Acción GEO | Declarar la oferta como hecho explícito |

**Señales que disparan trabajo:**

- Query con impresiones y sin página dedicada → oportunidad de contenido
- Impresiones altas, CTR bajo → revisar title, description e intención
- Página indexada pero sin citaciones de IA → revisar claridad, evidencia y completitud
- Contenido obsoleto → **refrescar cuando la información, la competencia o la intención realmente cambien** (no por fecha)
- Un prompt donde aparece un competidor y vos no → **analizar qué fuente usó el modelo**

**Priorizá por impacto de negocio, no por facilidad de ejecución.**

---

## 10. Stack de herramientas

**Principio operativo:** los agentes deben consumir **capacidades normalizadas y contratos de datos**, no estar cableados a un vendor único. Un agente de Performance pide campos de ranking, clics, Core Web Vitals o conversiones; el proveedor configurado puede ser de primera mano, open source o comercial.

### 10.1 Stack recomendado

| Área | Herramienta | Tipo | Uso primario | Integración | Agentes primarios |
|---|---|---|---|---|---|
| Búsqueda orgánica Google | **Google Search Console** | Primera mano / gratis | Queries, páginas, impresiones, clics, posición media, indexación, sitemaps, URL inspection | API | Keyword; QA SEO; Performance; Técnico |
| Analytics / conversiones | **Google Analytics 4** | Primera mano / gratis | Tráfico, engagement, eventos, conversiones, análisis de referral | Data API | Performance; Estrategia |
| Performance de usuario real | **Chrome UX Report (CrUX)** | Primera mano / gratis | Core Web Vitals de campo agregados a nivel URL/origen | CrUX API / History API | Performance; Técnico; Staleness |
| Diagnóstico de página | **PageSpeed Insights** | Primera mano / gratis | Diagnóstico de rendimiento y análisis Lighthouse | API | Performance; QA Técnico |
| Performance de laboratorio | **Lighthouse** | Open source | Auditorías automatizadas de rendimiento, accesibilidad, SEO, buenas prácticas | CLI / Node | Performance; QA Técnico |
| Performance continua | **Lighthouse CI** | Open source | Tests automatizados y aserciones de rendimiento en pipelines | CI/CD | Validación de Publicación; Performance |
| Búsqueda Bing | **Bing Webmaster Tools** | Primera mano / gratis | Búsqueda Bing, gestión de crawl/index, diagnóstico | Portal / APIs donde estén soportadas | SEO; Técnico; Performance |
| **Visibilidad de citación IA** | **Bing Webmaster AI Performance** | Primera mano / preview | **Citaciones, páginas citadas, queries de grounding, intenciones/temas/participación de citación** | Reporting; soporte de export/API puede evolucionar | **AEO; QA AEO; Performance** |
| Analytics privado/self-hosted | **Matomo** | Open source + hosted pago | Analytics, conversiones, eventos, propiedad del dato self-hosted | HTTP / Reporting APIs | Performance; Estrategia |
| Métricas de infraestructura | **Prometheus** | Open source | Métricas de series temporales de servidor/aplicación y alertas | Exporters / HTTP | Técnico; Performance |
| Dashboards / alertas | **Grafana OSS** | Open source | Dashboards y alertas sobre métricas, logs, trazas y fuentes de datos | Integraciones de data source | Orquestador; Performance |
| Estándar de telemetría | **OpenTelemetry** | Open source | Instrumentación y recolección neutral de métricas, trazas, logs | SDKs / Collector / OTLP | Técnico; Performance |
| Crawler técnico SEO | **Sitebulb** | Comercial | Auditoría y diagnóstico técnico basado en crawl | Workflows desktop/cloud; exports | Técnico; QA SEO |
| Suite SEO/backlinks/competidor | **Ahrefs** | Comercial | Rank tracking, site audit, keywords, backlinks, investigación de competidores y visibilidad IA | Integraciones de producto / API según plan | Keyword; Competidor; Autoridad; Performance |
| Suite SEO/competidor/IA | **Semrush** | Comercial | Site Audit, Position Tracking, investigación de keywords/competidores, visibilidad IA | APIs para múltiples módulos según plan | Keyword; Competidor; QA SEO; Performance; AEO |

### 10.2 Tiers de selección

| Tier | Set de capacidades | Propósito |
|---|---|---|
| **Base / obligatorio** | Search Console + analytics + PSI + CrUX + Lighthouse + Bing Webmaster Tools | Establecer evidencia de primera mano de búsqueda, analytics, crawl/index y rendimiento |
| **Automatización técnica** | Lighthouse CI + crawler + validadores de robots/sitemap/schema | Detectar continuamente regresiones técnicas y errores de despliegue |
| **Observabilidad de infraestructura** | Prometheus + Grafana + OpenTelemetry, o equivalentes comerciales | Identificar causas de servidor, red, aplicación y renderizado detrás de problemas SEO/rendimiento |
| **Inteligencia competitiva** | Ahrefs, Semrush, Sitebulb o equivalente | Agregar profundidad de keyword, SERP, backlinks, competidores, crawl y rank tracking |
| **Inteligencia AEO premium** | Bing AI Performance + datasets comerciales de visibilidad IA | Medir citaciones/menciones/prompts y visibilidad emergente en motores de respuesta |

### 10.3 Mapeo agente → herramienta

| Agente | Acceso mínimo | Mejora premium |
|---|---|---|
| **Orquestador de Estrategia** | Outputs normalizados de todos los agentes | Dashboard central / data warehouse / bus de alertas |
| **Keyword & Intención** | Search Console + fuente de keywords + SERP en vivo | Ahrefs/Semrush + datasets históricos de query/competidor |
| **SERP & Competidor** | SERP en vivo + páginas de competidores accesibles | Datos competitivos, de backlinks e historial de SERP de Ahrefs/Semrush |
| **SEO Técnico** | Crawler + chequeos de robots/sitemap/schema + Lighthouse/PSI | CrUX + telemetría de servidor + Sitebulb + validación CI/CD |
| **Especialista AEO** | Páginas en vivo + evidencia de entidad/fuentes + reglas de acceso de crawlers | Bing AI Performance + monitoreo comercial de visibilidad IA |
| **Creador de Contenido** | Brief aprobado + repositorio de fuentes | Integración con CMS estructurado |
| **QA SEO** | Página en vivo/borrador + crawler + especificación SEO | Search Console + datos de auditoría comercial |
| **QA AEO** | Página + brief AEO + fuentes + chequeos de acceso | Datasets de monitoreo de citación/visibilidad IA |
| **Validación de Publicación** | URL en vivo + Lighthouse CI + chequeos técnicos | Hooks de despliegue + chequeos automatizados de crawl/schema/indexación |
| **Performance & Ranking** | Search Console + analytics + CrUX/PSI | Rank tracker + Bing AI Performance + datasets de visibilidad IA |
| **Freshness / Staleness** | Fechas de contenido + tendencias de performance | Detección de cambios de SERP + CrUX + monitoreo de competidores |
| **Autoridad / Off-site** | Investigación web/búsqueda + menciones conocidas | Datasets de backlinks/menciones de Ahrefs/Semrush |

### 10.4 Checklist de monitoreo e integración

- [ ] Google Search Console verificado para todas las propiedades de producción y variantes clave
- [ ] Credenciales/acceso de API de Search Console configurados donde se requiera automatización
- [ ] Sitemaps XML enviados, monitoreados y conectados a alertas por errores o cambios inesperados
- [ ] Google Analytics 4 o equivalente validado, configurado con eventos de conversión relevantes al negocio
- [ ] El reporting de referrals puede distinguir búsqueda orgánica, referrals de IA identificables y otros canales
- [ ] Datos de campo de CrUX en uso para Core Web Vitals reales cuando hay datos suficientes
- [ ] Diagnóstico de Lighthouse/PageSpeed disponible para páginas sin datos de campo y para análisis de causa raíz
- [ ] Lighthouse CI o equivalente corriendo en CI/CD para plantillas o despliegues importantes
- [ ] Umbrales de Core Web Vitals y presupuestos de regresión definidos y versionados
- [ ] Uptime, respuestas 5xx, latencia, comportamiento de caché y errores de recursos monitoreados
- [ ] Prometheus/Grafana/OpenTelemetry o stack equivalente conectado donde haya telemetría disponible
- [ ] Cambios en robots.txt versionados y validados automáticamente antes/después del despliegue
- [ ] Chequeos de canonical, noindex, inclusión en sitemap, código de estado y rastreabilidad corriendo tras publicar
- [ ] Datos estructurados validados en despliegue y recrawleados periódicamente
- [ ] Entrega de imágenes y video monitoreada como parte de LCP, CLS, payload y diagnóstico de recursos
- [ ] Crawler técnico agendado a una cadencia apropiada al tamaño y ritmo de cambio del sitio
- [ ] Monitoreo de keywords/ranking cubriendo **clusters prioritarios**, no toda query posible
- [ ] Herramientas comerciales de inteligencia competitiva agregadas **solo cuando su dato mejora materialmente las decisiones** más allá de fuentes de primera mano
- [ ] Bing Webmaster Tools verificado y monitoreado donde importe la visibilidad Bing/Microsoft IA
- [ ] **Datos de citación/visibilidad IA almacenados como evidencia, separados de los scores de readiness AEO**
- [ ] Cada herramienta con dueño nombrado, política de credenciales, regla de retención de datos y alerta de fallo/expiración
- [ ] **Los prompts de agentes identifican herramientas/fuentes permitidas y prohíben explícitamente inventar métricas no disponibles**
- [ ] Outputs de herramientas normalizados a campos compartidos, para poder cambiar de vendor sin reescribir la lógica de agentes
- [ ] **Las alertas rutean a un agente/acción específicos**, no solo a dashboards pasivos
- [ ] Umbrales calibrados contra la línea base propia del sitio y el impacto de negocio; **los umbrales de ejemplo no son reglas universales de fallo**
- [ ] ⭐ **Logs de servidor accesibles y parseables para las cuatro capas de acceso de crawlers de IA**
- [ ] ⭐ **Biblioteca de 20–50 prompts definida, versionada y corrida mensualmente**
- [ ] ⭐ **Línea base registrada antes de cualquier optimización**

### 10.5 Reglas de integración y governance de datos

**Normalizá los contratos de datos.** Almacená campos estándar:

```
url · timestamp · device · country · query_cluster · impressions · clicks · ctr
position · lcp · inp · cls · conversion_count · seo_readiness · aeo_readiness
srisk · source_system
```

**Preservá la procedencia.** Toda métrica registra su fuente, fecha/hora de recolección, alcance, y si es dato de campo, de laboratorio, de SERP observado, análisis inferido o input manual.

**Separá evidencia de scores.** Las mediciones crudas permanecen auditables; los scores y recomendaciones generados por agentes se almacenan aparte.

**Versioná umbrales y fórmulas.** Los presupuestos de rendimiento, gates de QA y pesos de scoring pueden cambiar **sin destruir la comparabilidad histórica**.

**Minimizá el lock-in de vendor.** Los agentes dependen de capacidades normalizadas; los adaptadores traducen APIs específicas de vendor al esquema compartido.

**Respetá los límites de acceso.** Credenciales, cuotas de API, reglas de robots, licencias, privacidad y términos de servicio son **restricciones del sistema — no detalles que un agente pueda sortear**.

### 10.6 Notas de fuente de herramientas *(verificadas 18 Ago 2026)*

| Herramienta | Nota | URL |
|---|---|---|
| **Google Search Console API** | Servicios de Search Analytics, Sitemaps, Sites y URL Inspection | https://developers.google.com/webmaster-tools/v1/api_reference_index |
| **PageSpeed Insights / CrUX** | PSI provee diagnóstico Lighthouse; las APIs de CrUX proveen datos agregados de experiencia real. Google recomienda las APIs dedicadas de CrUX para flujos de datos de campo | https://developers.google.com/codelabs/chrome-web-vitals-psi-crux |
| **Lighthouse** | Auditoría automatizada open-source de calidad de páginas web | https://developer.chrome.com/docs/lighthouse/overview/ |
| **Core Web Vitals** | Umbrales buenos de campo: **LCP ≤2,5 s · INP ≤200 ms · CLS ≤0,1** en el percentil 75 | https://web.dev/articles/vitals |
| **Bing Webmaster AI Performance** | Reporting en preview público de citaciones, páginas citadas, queries de grounding e insights de visibilidad IA | https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview |
| **Prometheus** | Toolkit open-source de monitoreo y alertas | https://prometheus.io/docs/introduction/overview/ |
| **OpenTelemetry** | Framework open-source neutral para generar, recolectar y exportar telemetría | https://opentelemetry.io/docs/ |
| **Matomo** | Analytics open-source con API y opciones self-hosted | https://matomo.org/free-software/ |
| **Ahrefs** | Plataforma comercial SEO/IA con Rank Tracker, Site Audit, keywords, competidores, backlinks y visibilidad IA; las features varían por plan | https://ahrefs.com/ |
| **Semrush** | Plataforma comercial SEO/IA; las APIs actuales incluyen acceso de proyecto a Position Tracking y Site Audit entre otros datasets; el acceso varía por plan | https://developer.semrush.com/api/v4/introduction/semrush-api-overview |
| **Sitebulb** | Crawler técnico SEO comercial desktop/cloud | https://sitebulb.com/ |

---

## 11. Reglas de implementación de fórmulas

- Usar scores de módulo **0–100** donde sea posible; **1–5** es aceptable para modelos compactos de oportunidad como KPS/CDS/ROS.
- **Normalizar los módulos N/A** en lugar de otorgar puntos automáticos.
- **Almacenar los sub-scores además del agregado**, para que los agentes puedan explicar las decisiones de pasa/falla.
- **Almacenar la confianza** (Alta/Media/Baja) según la completitud de la evidencia.
- **Los gates críticos anulan los promedios ponderados** donde corresponda.
- **Versionar las fórmulas** para que los scores históricos sigan siendo interpretables cuando cambien los pesos.

---

## 12. Registro de decisiones de la fusión

Cambios respecto de los dos documentos de origen, con su razón. Útil para revisar o revertir.

| # | Decisión | Razón |
|---|---|---|
| 1 | La jerarquía de principios pasa a ser el **mecanismo formal de desempate** de los gates críticos y los conflictos entre agentes (§5.3) | El framework original tenía muchas reglas pero ningún criterio para resolver choques; escalaba al orquestador sin decirle con qué decidir |
| 2 | **Autoridad/Off-site pasa de opcional a CORE** cuando GEO es objetivo (§6.2) | ~85% de las menciones de marca en respuestas de IA vienen de terceros: es el canal principal, no un accesorio |
| 3 | **Acceso de crawlers de IA agregado a la matriz de observabilidad** (§9.2 ⭐) | Era el paso cero de la visibilidad en IA y no figuraba como señal monitoreada; un bloqueo de CDN es invisible hasta que se mide |
| 4 | **Dark funnel (búsqueda de marca) agregado a la matriz** (§9.2 ⭐) | Sin él, el sistema concluye que GEO no funciona: las respuestas de IA reducen clics por diseño y el efecto aparece en búsqueda de marca |
| 5 | **Nota de calibración antepuesta a todas las fórmulas** (§1) | El aparato matemático sugería una precisión que los inputs 1–5 no soportan; el valor real es consistencia y auditabilidad |
| 6 | **GEO se mantiene separado de AEO** como tercer lente (Doctrina §4) | Las tácticas difieren: AEO es estructura, GEO es entidad y confianza. Fusionarlos pierde las tácticas con evidencia experimental |
| 7 | **Etiquetas Observado/Inferido/Asumido/Recomendado conviven con los tiers de evidencia** (Doctrina §6) | Son ejes distintos: los tiers miden la fuerza de la fuente; las etiquetas, el estatus epistémico de lo que afirma el agente |
| 8 | **El documento recibe clase de freshness F2 y fecha de revisión** | Un sistema que predica governance de frescura tiene que tener la suya; los datos de mercado caducan y las URLs de plataforma cambian |
