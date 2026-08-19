# Sistema SEO · AEO · GEO

**Versión 2.0** · Agosto 2026
Fusión de *Playbook SEO·AEO·GEO* y *SEO + AEO Strategy, QA & Agent Architecture v1.1*.

---

## Para el agente que aplica esto a un sitio web

**Empezá por [`01-APLICACION.md`](01-APLICACION.md).** Es la especificación ejecutable: fases en orden, reglas imperativas, criterios de aceptación.

Consultá los otros dos cuando los necesites:

- **[`00-DOCTRINA.md`](00-DOCTRINA.md)** — cuando dos reglas entren en conflicto y necesites el criterio de desempate (§2), o cuando tengas que justificar una decisión.
- **[`02-SISTEMA.md`](02-SISTEMA.md)** — cuando tengas que puntuar una página, asignar clase de freshness, o configurar medición.

### Tus tres reglas antes que cualquier regla de SEO

1. **No inventes datos.** Si no tenés la herramienta o la API falló, marcá `NO VERIFICADO — requiere <herramienta>` y seguí. Nunca fabriques rankings, tráfico, backlinks, Core Web Vitals ni citaciones de IA.
2. **No infieras capacidades del negocio desde las normas de su industria.** Si el sitio no lo dice, no lo agregues: marcá `PENDIENTE CONFIRMACIÓN`.
3. **Etiquetá todo:** `OBSERVADO` · `INFERIDO` · `ASUMIDO` · `RECOMENDADO`.

*(Detalle en Aplicación §0.)*

---

## Los tres documentos

| Archivo | Responde | Lector |
|---|---|---|
| **[`00-DOCTRINA.md`](00-DOCTRINA.md)** | **Por qué** — principios, jerarquía de desempate, tiers de evidencia, estado del mercado, mitos | Humano: equipo, cliente, alguien nuevo |
| **[`01-APLICACION.md`](01-APLICACION.md)** | **Qué hacer** — 12 fases en orden, reglas verificables, checklists, plan de 90 días | **Agente ejecutor** |
| **[`02-SISTEMA.md`](02-SISTEMA.md)** | **Cómo operar** — scoring, gates, freshness, 14 agentes, medición, stack de herramientas | Operación y automatización |

---

## El sistema en una página

**Principio operativo.** No optimizamos para algoritmos, IA ni keywords en aislamiento. Construimos la fuente más clara, útil y confiable para las preguntas que le importan al negocio y a sus clientes.

**Jerarquía de desempate.** Cuando dos cosas chocan, gana la de la izquierda:

```
Verdad → Evidencia → Intención del usuario → Utilidad →
Relevancia de negocio → Autoridad → SEO/AEO/GEO → Conversión
```

**Los tres lentes.** Una fundación, tres resultados:

| | Resultado | Palanca |
|---|---|---|
| **SEO** | Ser descubierto y rankeado | Rastreabilidad, intención, autoridad |
| **AEO** | Ser la respuesta | Respuesta autocontenida arriba |
| **GEO** | Ser entendido y citado | Evidencia, entidad, menciones de terceros |

**Las diez decisiones que más importan**, en orden:

1. Un dominio, técnicamente rastreable
2. HTML renderizado en servidor
3. Investigación y scoring antes de construir
4. Estructura answer-first por página
5. Estadísticas, citas y fuentes primarias
6. Entidad inequívoca + NAP idéntico
7. GBP completo y activo (local)
8. Menciones de terceros y listicles
9. Logs de servidor + biblioteca de prompts
10. Ciclo de refresh monitoreado

**El límite honesto.** Ningún framework garantiza página 1 ni citación en IA. Los scores son modelos internos de governance para priorizar y controlar calidad — **no la fórmula de ranking de ninguna plataforma.**

---

## Mantenimiento

**Clase de freshness del sistema: F2** — revisión cada 3 meses.
**Próxima revisión: Febrero 2027.**

Qué revisar en cada ciclo:

- Los datos de mercado de Doctrina §8 (zero-click, CTR, solapamiento entre motores) — caducan rápido
- Las URLs de documentación de plataforma de Sistema §10.6 — cambian
- La lista de crawlers de Aplicación §0.2 — aparecen nuevos
- Los pesos de las fórmulas — versionar los cambios para preservar comparabilidad histórica
