# Doctrina SEO · AEO · GEO

**Versión 2.0** · Fusión de *Playbook SEO·AEO·GEO* (Agosto 2026) y *SEO + AEO Strategy, QA & Agent Architecture v1.1* (18 Agosto 2026)
**Próxima revisión:** Febrero 2027 · **Clase de freshness del documento:** F2 (datos de mercado volátiles)

> Este archivo responde **por qué**. Es para humanos: el equipo, el cliente, alguien nuevo.
> Para **qué hacer** en una web concreta → [`01-APLICACION.md`](01-APLICACION.md)
> Para **cómo operar, medir y automatizar** → [`02-SISTEMA.md`](02-SISTEMA.md)

---

## 0. Objetivo y límite honesto

**Objetivo primario.** Maximizar la probabilidad de que las páginas importantes ganen visibilidad orgánica en página 1 para búsquedas comercialmente valiosas, mejorando a la vez la respondibilidad, la claridad de recuperación y el potencial de citación en experiencias de respuesta con IA.

**Limitación importante.** Ningún framework puede garantizar una posición en página 1 ni una citación en IA. Los sistemas de búsqueda y respuesta usan señales propietarias y cambiantes. Los scores de este sistema son **modelos internos de governance** para priorización, readiness y control de calidad — **no la fórmula de ranking de ninguna plataforma.**

Ambas afirmaciones conviven. La primera es la ambición; la segunda es la condición bajo la que se persigue. Un documento que promete la primera sin declarar la segunda está vendiendo, no operando.

---

## 1. El principio operativo

No optimizamos sitios web para algoritmos, sistemas de IA ni keywords en aislamiento. Construimos la fuente más clara, más útil y más confiable para las preguntas que le importan al negocio y a sus clientes.

> Sé accesible. Entendé la intención. Respondé completo. Probá lo que afirmás. Hacé al negocio inconfundible. Ganá autoridad más allá del sitio. Medí lo que pasó. Aprendé y mejorá.

SEO, AEO y GEO son **resultados de visibilidad de ese sistema — no tácticas separadas.**

---

## 2. La jerarquía de principios

Esta es la pieza central del sistema. Todo lo demás deriva de este orden.

```
Verdad → Evidencia → Intención del usuario → Utilidad →
Relevancia de negocio → Autoridad → SEO/AEO/GEO → Conversión
```

**Cuando dos de estos entran en conflicto, gana el de la izquierda.**

- La verdad antes que la optimización.
- La utilidad antes que la conversión.
- La evidencia antes que las afirmaciones.

### Por qué esto importa operativamente

Un sistema con muchas reglas necesita un **mecanismo de desempate**. Sin él, cuando el QA de SEO pide una cosa y el de AEO pide otra, o cuando un gate crítico choca con un score alto, la decisión queda librada al criterio del momento y el sistema deriva.

Esta jerarquía **es** ese mecanismo. Es la autoridad final de desempate para:

- Conflictos entre agentes especialistas (§ Sistema 6)
- Gates críticos que chocan entre sí (§ Sistema 5.5)
- Cualquier caso donde una regla de este sistema produzca un resultado que se sienta mal

Cuando un agente escala un conflicto al orquestador, el orquestador resuelve **por esta jerarquía**, y registra cuál fue el principio que decidió.

---

## 3. Los principios estratégicos del modelo operativo

1. **Optimizar para resultados, no para checklists.** El objetivo es descubrimiento calificado, competitividad en página 1, engagement y conversión.
2. **Una intención de búsqueda dominante por página.** Una página puede rankear para muchas queries relacionadas, pero debe resolver **un** cluster de intención coherente.
3. **Clusters, no densidad de keywords.** No existe un porcentaje de densidad aprobado ni un techo de repeticiones. Las variantes similares pertenecen naturalmente a un tema; el *stuffing* sigue siendo un riesgo.
4. **Competir contra el SERP en vivo.** El *readiness* no alcanza si la página es más débil que los resultados que debe superar.
5. **SEO y AEO se puntúan por separado.** SEO evalúa competitividad de búsqueda; AEO evalúa comprensibilidad, recuperación, confianza y mérito como fuente.
6. **Readiness no es performance.** Los scores internos miden calidad controlable; los rankings, impresiones, clics, referrals y conversiones miden resultados.
7. **La frescura sigue al tipo de página y su volatilidad.** Cada URL estratégica recibe una clase de freshness, una cadencia y condiciones de disparo.
8. **Los agentes analizan; un único escritor controlado ejecuta.** Los especialistas crean inputs estructurados. El creador de contenido escribe. QA acepta o rechaza.
9. **Una fundación, tres resultados de visibilidad.** Se optimiza una vez y se evalúa cada activo a través de los tres lentes.

---

## 4. Los tres lentes: SEO, AEO, GEO

SEO, AEO y GEO no son tres estrategias ni hacks separados — son **lo que el mismo sistema produce en superficies distintas.** Google declara que sus experiencias generativas corren sobre sus sistemas centrales de Search, sin requisitos técnicos adicionales y sin optimización especial para AI Overviews o AI Mode.

| Lente | Resultado | Unidad de éxito | Palanca primaria |
|---|---|---|---|
| **SEO** | Ser descubierto y rankeado | Posición y clic | Rastreabilidad, coincidencia de intención, autoridad de dominio |
| **AEO** | Ser seleccionado como la respuesta | Ser la respuesta | Respuesta autocontenida en las primeras líneas |
| **GEO** | Ser entendido y citado | Aparecer en la respuesta generada | Evidencia, claridad de entidad y menciones autorizadas junto a las señales tradicionales de ranking |

**Definición operativa de AEO.** Mejorar la capacidad de una página de ser entendida, recuperada, resumida, recomendada o citada por experiencias de búsqueda y IA orientadas a respuestas. **No implica inclusión ni citación garantizada.**

**Por qué GEO se separa de AEO.** AEO es sobre *estructura*: que la respuesta sea extraíble. GEO es sobre *confianza y entidad*: que el modelo entienda quién sos y tenga razones para citarte. Las tácticas difieren — para GEO pesan las estadísticas con fuente, las citas textuales, la claridad de entidad y las menciones de terceros, cosas que la estructura sola no resuelve.

---

## 5. El ciclo de vida del proyecto

```
01 Descubrir → 02 Decidir → 03 Construir → 04 Probar →
05 Publicar → 06 Medir → 07 Aprender ─┐
     ▲                                │
     └────────────────────────────────┘
```

**Probar es un gate, no un paso.** Nada se publica hasta que sus afirmaciones superen los tiers de evidencia (§6).

**Aprender cierra el círculo.** Logs de chat, Search Console, reseñas y leads alimentan directamente a Descubrir. El proceso empieza antes de la primera línea del sitio y nunca termina.

---

## 6. Evidencia y confianza: el gate antes de que algo salga

Toda afirmación factual del sitio carga un tier de evidencia. Esto gobierna el sitio web, el generador de blogs, el chatbot y cualquier otra superficie que hable por el negocio.

### 6.1 Tiers de afirmación

| Tier | Definición |
|---|---|
| **Verificado de primera mano** | Provisto y confirmado por el negocio. El tier más fuerte. |
| **Fuente primaria** | Ley, regulación, documentación oficial, estudio original. |
| **Respaldado por tercero** | Fuente externa creíble, citada y fechada. |
| **Basado en experiencia** | Experiencia real del negocio, donde pueda demostrarse. |
| **Conocimiento general** | Información ampliamente establecida, no requiere fuente. |
| **Sin respaldo** | **No afirmar como hecho.** Cortarlo, o bajarlo de tier con evidencia. |

### 6.2 La verdad del negocio le gana al conocimiento de la industria

**Nunca inferir una capacidad del negocio a partir de las normas de la industria.**

Un modelo sabe que "muchas empresas de HVAC ofrecen reparación de emergencia". Si este negocio no la ofrece, ese conocimiento es peor que inútil — es **una afirmación falsa con tono confiado.**

> **La regla:** el conocimiento de industria puede explicar el mercado. El conocimiento del negocio determina qué puede afirmar *este* negocio. Cuando los dos discrepan, gana el del negocio, sin excepción.

Por eso la fase de investigación precede al contenido: no se puede fundamentar una afirmación que nunca se recolectó. Los datos estructurados siguen la misma regla — deben describir contenido visible y preciso, y nunca usarse para fabricar relevancia o afirmaciones que la página no sostiene.

### 6.3 Etiquetas de evidencia por afirmación

Los tiers de §6.1 clasifican **la fuerza de la fuente**. Estas etiquetas clasifican **el estatus epistémico de lo que un agente afirma**. Son ejes distintos y se usan los dos.

| Etiqueta | Significado |
|---|---|
| **Observado** | Evidencia directa: texto de la página, SERP, export de Search Console, crawl, analytics. |
| **Inferido** | Conclusión razonable a partir de evidencia observada; **debe etiquetarse como inferencia.** |
| **Asumido** | Supuesto de trabajo porque el input requerido no está disponible. |
| **Recomendado** | Acción propuesta; no una afirmación de que ya está implementada o validada. |

---

## 7. Cómo pesar la evidencia de este documento

No toda fuente citada acá tiene el mismo peso epistémico. Leé cada afirmación contra su tier antes de actuar sobre ella.

| Peso | Tipo de fuente | Qué autoriza |
|---|---|---|
| **MÁS FUERTE** | Documentación de plataforma — guía declarada de Google sobre cómo funcionan sus sistemas | Autoritativa sobre **requisitos**, no sobre resultados |
| **FUERTE** | Experimentos controlados — el paper de GEO, el estudio causal de JSON-LD de Ahrefs | Metodología real, alcance limitado, efectos varían por dominio |
| **MODERADO** | Datos observacionales a gran escala — clickstream, análisis de corpus de citaciones | Señal real, pero correlacional y dependiente de metodología |
| **DIRECCIONAL** | Encuestas de practicantes y datasets de vendors — pesos de Whitespark, estudios de plataformas de visibilidad IA | Útiles para priorizar, **no prueba de causalidad** |

**Regla de lectura.** Tratá todo número de este documento como un orden de magnitud, nunca como un uplift prometido.

---

## 8. El estado del mercado (datos direccionales)

> ⚠️ **Estos datos caducan.** Son el contexto que justifica la estrategia, no constantes. Revisar en cada ciclo de actualización del documento.

| Dato | Valor | Fuente y lectura |
|---|---|---|
| Búsquedas en Google (EE.UU.) que terminan sin clic | **68%** | SparkToro/Similarweb, Ene–Abr 2026 · era 60,45% en 2024 |
| Caída de CTR orgánico cuando aparece un AI Overview | **−61%** | Seer Interactive · 25,1M impresiones |
| Más clics para marcas **citadas** en AIO | **+35%** | Ganadores y perdedores — no una caída uniforme |
| Solapamiento de dominios entre ChatGPT y Perplexity | **11%** | Síntesis de 680M citaciones · **cada motor es su propio canal** |

**Qué significa esto.** El zero-click no es el fin del SEO: es un cambio en dónde se captura el valor. Ser citado en la respuesta genera *más* clics que rankear sin ser citado. Y con 11% de solapamiento entre motores, optimizar para uno solo es optimizar para una fracción del mercado.

---

## 9. GEO: la evidencia experimental

**Fuente:** Princeton · arXiv 2311.09735 · GEO-bench, 10.000 queries, dos motores generativos.

| Táctica | Dirección | Cómo aplicarla |
|---|---|---|
| **Agregar estadísticas** | Positiva | Reemplazar afirmaciones vagas por cifras con fuente y fecha |
| **Agregar citas textuales** | Positiva | Citar expertos o fuentes reconocidas verbatim |
| **Citar fuentes** | Positiva | Enlazar la fuente primaria, no un blog que la resume |
| **Fluidez y claridad** | Positiva | Frases cortas, voz activa, sin jerga innecesaria |

### Cómo leer esto

Un experimento controlado midió ganancias relativas de aproximadamente **30–40%** en su métrica de visibilidad para los tres métodos principales. **Tratá la dirección como evidencia y la magnitud como contexto, no como benchmark.** El paper documenta que la efectividad varía por dominio y categoría de query, y advierte que los métodos deberán adaptarse conforme evolucionen los motores.

**Las fuentes de baja visibilidad se beneficiaron desproporcionadamente** — relevante para todo proyecto nuevo.

Nadie debería leer estas filas como un uplift prometido.

---

## 10. Autoridad fuera del sitio

> **Observación de industria.** La metodología, el corpus, el motor y el set de queries varían entre estos datasets. Usar direccionalmente — no como factores de ranking universales.

- **La gran mayoría de las menciones de marca en respuestas de IA se originan en fuentes de terceros** (~85% en un dataset de vendor). Si no estás en esas conversaciones, no estás en la respuesta.
- **Plataformas de comunidad y video están entre las fuentes más citadas** entre motores — Reddit, YouTube y LinkedIn recurren en el tope de análisis independientes. Participar genuinamente; el spam se detecta y se penaliza.
- **Listicles de terceros:** identificar las páginas "mejores X en Y" que los motores ya citan para tus prompts. La posición dentro de esas listas parece correlacionar con la posición en la respuesta.
- **Menciones de marca sin enlace** correlacionan más fuertemente con visibilidad en IA que los backlinks en estudios de vendors — consistente con la lógica de entidad.
- **Datos propietarios:** "completamos X proyectos en Y industrias" le gana a "somos los mejores". Publicá lo que un competidor no puede reproducir reescribiendo el mismo artículo.

**Consecuencia estratégica.** Si ~85% de las menciones vienen de terceros, el trabajo off-site **no es opcional para GEO — es el canal principal.** Ver § Sistema 6.2 sobre por qué el especialista de Autoridad/Off-site pasa a core cuando GEO importa.

---

## 11. Lo que no hacemos

### Mitos que cuestan tiempo y dinero

- **"El SEO está muerto."** Falso. La búsqueda tradicional sigue enviando más tráfico que todas las plataformas de IA combinadas, y es el input que alimenta las respuestas generativas.
- **"Necesitás llms.txt."** Google declaró explícitamente en 2026 que no se requiere ningún archivo especial ni Markdown para aparecer en sus funciones generativas.
- **"Más contenido = más visibilidad."** El volumen sin experiencia real es precisamente lo que el sistema de contenido útil filtra.
- **"Schema es el atajo."** Un estudio causal de Ahrefs sobre 1.885 páginas que agregaron JSON-LD (Ago 2025 – Mar 2026) no encontró uplift de citación por schema solo. Funciona como capa de desambiguación dentro de una estrategia completa, no como atajo.
- **"Existe un porcentaje de densidad de keywords."** No hay porcentaje aprobado ni techo de repeticiones. El QA juzga alineación de intención, completitud semántica, lenguaje natural y repetición innecesaria.

### Errores de ejecución

- Inferir una capacidad que el negocio nunca confirmó, porque la industria suele ofrecerla.
- Dos dominios compitiendo por las mismas keywords.
- Páginas de ciudad clonadas que solo cambian el nombre de la localidad.
- Una página por variación de keyword en vez de por necesidad distinta.
- Publicar contenido de IA genérico a escala o fabricar reseñas.
- Bloquear crawlers relevantes accidentalmente vía CDN o WAF.
- Optimizar para un solo motor. Con 11% de solapamiento, cada uno es su propio canal.
- Medir solo tráfico e ignorar los logs de servidor.
- Publicar y olvidar.
- Actualizar fechas solo para parecer fresco.
- Crear una página separada para cada variación conversacional.
- Usar densidad artificial de "keywords de IA" o *chunking* superficial como objetivo.
- Forzar un bloque de FAQ solo por AEO.

---

## 12. Las diez decisiones que más importan

Si un proyecto solo puede pagar diez movimientos, estos son los diez, en orden.

| # | Movimiento | Por qué está acá | Evidencia |
|---|---|---|---|
| 1 | Un dominio, técnicamente rastreable | Todo lo demás depende de esto; dos dominios se canibalizan | Fundacional |
| 2 | HTML renderizado en servidor | Muchos crawlers de IA no ejecutan JavaScript | Fundacional |
| 3 | Investigación y scoring antes de construir | Decide qué se construye, no solo qué se podría | Proceso |
| 4 | Estructura answer-first por página | Determina si un pasaje puede levantarse entero | Mecánica AEO |
| 5 | Estadísticas, citas, fuentes primarias | Cambio de contenido con lift de citación medido experimentalmente | Estudio controlado |
| 6 | Entidad inequívoca + NAP idéntico | El modelo debe saber quién sos antes de citarte | Resolución de entidad |
| 7 | GBP completo y activo (local) | El activo de ranking local más pesado | Encuesta de practicantes |
| 8 | Menciones de terceros y listicles | La mayoría de las menciones de marca en IA no son tuyas de escribir | Observación de industria |
| 9 | Logs de servidor + biblioteca de prompts | Sin las capas 1 y 2 estás midiendo a ciegas | Framework de cinco capas |
| 10 | Ciclo de refresh monitoreado | La frescura correlaciona con citación; las páginas viejas pierden visibilidad | Observación de industria |

---

## 13. Las tres lecciones de fondo

**El SEO moderno tiene tres bucles a velocidades distintas.** El de decisión (qué construir), el de producción (cómo construirlo) y el de aprendizaje (qué pasó). Un sistema completo necesita los tres cerrados. Este documento cubre el primero; `01-APLICACION.md` el segundo; `02-SISTEMA.md` el tercero.

**"Bueno" en SEO es siempre relativo, nunca absoluto.** Una página puede cumplir todas las buenas prácticas y no rankear porque las que hay que superar son mejores. Por eso *competir contra el SERP en vivo* es un principio y no un detalle, y por eso *readiness ≠ performance* no es burocracia: es la única forma de no confundir "hicimos bien nuestro trabajo" con "ganamos".

**La evidencia dejó de ser ética para volverse infraestructura.** Antes de los LLMs, una afirmación sin respaldo era un riesgo reputacional. Ahora es también un riesgo de visibilidad: los sistemas generativos citan fuentes que pueden verificar, y un negocio cuya entidad es ambigua o cuyas afirmaciones no se corroboran en ningún lado simplemente no aparece.

---

## 14. Fuentes

### Datos de mercado y estudios

- SparkToro/Similarweb vía Search Engine Land — zero-click, Ene–Abr 2026
- Seer Interactive — CTR con AIO, 25,1M impresiones
- Aggarwal et al., *"GEO: Generative Engine Optimization"*, arXiv 2311.09735 / ACM SIGKDD
- Whitespark Local Search Ranking Factors 2026 — 187 factores, 47 especialistas
- Ahrefs — estudio causal de JSON-LD sobre 1.885 páginas, Ago 2025–Mar 2026; análisis de AI Overviews, Jun 2026
- Peec AI — 30M fuentes; ~200K respuestas en 8 motores
- Profound / síntesis de 680M citaciones, Ago 2024–Abr 2026
- Search Engine Land — framework de medición de cinco capas
- Guía pública de Google sobre funciones generativas, 2026

### Documentación oficial de plataforma (verificada 18 Ago 2026)

| Fuente | Cubre | URL |
|---|---|---|
| Google Search Central — Spam Policies | Keyword stuffing, doorway abuse, límites de spam | https://developers.google.com/search/docs/essentials/spam-policies |
| Google Search Central — SEO Starter Guide | SEO fundacional, lenguaje natural, organización del sitio | https://developers.google.com/search/docs/fundamentals/seo-starter-guide |
| Google Search Central — Helpful, Reliable, People-First Content | Calidad people-first, expertise, evidencia, riesgos del contenido a escala | https://developers.google.com/search/docs/fundamentals/creating-helpful-content |
| Google Search Central — Optimizing for Generative AI Features | Guía 2026 sobre visibilidad generativa, contenido no-commodity, tácticas AEO/GEO no soportadas | https://developers.google.com/search/docs/fundamentals/ai-optimization-guide |
| Google Business Profile Help — Improve your local ranking | Relevancia local, distancia, prominencia | https://support.google.com/business/answer/7091?hl=en |
| OpenAI Help — Publishers and Developers FAQ | OAI-SearchBot y referrals de ChatGPT Search | https://help.openai.com/en/articles/12627856-publishers-and-developers-faq |

### Nota metodológica

Estas fuentes no tienen el mismo peso — ver §7. La documentación de plataforma declara **requisitos**; los experimentos controlados muestran **dirección** dentro de un alcance limitado; los datasets observacionales y de vendors varían por metodología, corpus, motor y set de queries, y son útiles direccionalmente antes que como factores de ranking universales. Las cifras de ~30–40% del paper de GEO son ganancias **relativas** sobre su propia métrica de visibilidad bajo condiciones experimentales.
