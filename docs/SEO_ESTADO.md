# Estado SEO · AEO · GEO

Registro de la auditoría del 2026-08-19 aplicando `public/seo-system/`.
Actualizar este archivo cuando se complete algún pendiente.

---

## Orden de los pasos (importa)

```
1. Deployar          ← destraba todo lo demás
2. Analytics + Search Console
3. Contenido y entidad
```

**Analytics y Search Console van DESPUÉS del deploy.** No se puede verificar un
dominio ni subir un sitemap que hoy devuelve 404.

---

## 1 · Deployar — PENDIENTE

El sitio en producción corre un build viejo. Verificado por HTTP el 2026-08-19:

| URL | Estado live | Debería dar |
|---|---|---|
| `/robots.txt` | **404** | 200 |
| `/sitemap.xml` | **404** | 200 |
| `/llms.txt` | **404** | 200 |
| `/blog` | **404** | 200 |
| `/projects` | 200 (77 palabras) | 200 (~1400 palabras) |

`robots.ts`, `sitemap.ts` y `llms.txt` existen en el repo desde antes pero nunca
se deployaron. Los 6 artículos del blog (ES + EN = 12 URLs) están escritos y sin
publicar.

Comando de verificación post-deploy:

```bash
for u in /robots.txt /sitemap.xml /llms.txt /blog; do
  echo "$u -> $(curl -s -o /dev/null -w '%{http_code}' https://www.francoseiler.com$u)"
done
```

---

## 2 · Medición — PENDIENTE (requiere cuentas de Franco)

### Google Analytics

`components/Analytics/GoogleAnalytics.tsx` ya está montado en el layout, pero
**no renderiza sin la variable de entorno** — es a propósito, para no ensuciar
métricas desde local y previews.

1. Crear propiedad GA4 en analytics.google.com
2. Copiar el ID (`G-XXXXXXXXXX`)
3. Cargarlo en Vercel como `NEXT_PUBLIC_GA_ID`
4. Redeployar (la variable se lee en build time)

No existe `.env.local` en el repo. Para probar en local, copiar `.env.example`.

### Search Console + Bing

- Verificar `francoseiler.com` en Google Search Console
- Subir `/sitemap.xml` (34 URLs)
- Bing Webmaster Tools importa directo desde Search Console

Sin esto la indexación tarda semanas en vez de días, y Search Console es la única
fuente real de qué busca la gente para encontrar el sitio.

---

## 3 · Contenido y entidad — PENDIENTE

- **Answer-first en las páginas que convierten.** Cada sección abre con una
  respuesta autocontenida de 40–60 palabras antes de explicar. `/contact` sirve
  hoy 67 palabras sin JS: es la página más flaca y la que más debería convertir.
- **Activo de datos propios.** Los 22 case studies tienen stack, industria y rol
  cargados. Con eso sale una página que un competidor no puede reproducir
  reescribiendo un artículo genérico.
- **Página "Sobre" densa en hechos** — fundación, credenciales, especialización.

---

## Hecho el 2026-08-19

### Bug crítico: listados sin SSR

`/projects` y `/tutorials` eran `'use client'` y pedían su lista por `fetch`
dentro de un `useEffect`. El HTML servido no traía **ni un solo ítem**: 0
palabras. Los 22 case studies eran invisibles para todo crawler que no ejecuta
JS (la mayoría de los de IA).

Arreglo — ver [[listados-ssr-no-fetch-cliente]] en memoria:

- Lista movida a `lib/projectCards.ts` y `lib/tutorialCards.ts` (fuente única)
- `app/projects/page.tsx` y `app/tutorials/page.tsx` pasan a Server Components
- Interacción en `components/ProjectsView/` y `components/TutorialsView/`
- Las rutas de API siguen devolviendo lo mismo, leyendo del mismo `lib/`

**Resultado:** `/projects` 0 → 1416 palabras · `/tutorials` 0 → 599.

### Metadatos únicos por ruta

- La home heredaba title y description del layout raíz y no tenía canonical
  propio. Ahora `app/page.tsx` es Server Component y la UI está en
  `components/HomeContent/`.
- `/tutorials` no tenía metadata: se agregó `app/tutorials/layout.tsx`.

### Jerarquía de encabezados

Cinco páginas tenían **cero** `<h1>`: el título era `<p className="highlight">`.
Como esa clase define toda su tipografía, cambiar la etiqueta no movió un pixel.
Los títulos de tarjeta pasaron a `<h2>` con `font-size: inherit` (verificado en
navegador: 20px desktop / 16px mobile, idéntico a antes).

### Datos estructurados

- `BreadcrumbList` en case studies (`components/Seo/Breadcrumbs.tsx`)
- `ItemList` en el índice de case studies
- El blog ya tenía breadcrumbs

### GitHub roto en el JSON-LD

`github.com/francoseiler` daba **404**. El usuario real es `Fransei29`.
Corregido en `components/Footer/Footer.tsx` y `components/Seo/SiteJsonLd.tsx`.
`sameAs` es lo que usan los motores para confirmar que el sitio y los perfiles
son la misma entidad; una URL rota rompe la asociación en vez de reforzarla.

---

## Testeo hecho

Build de producción + Chrome headless por CDP:

- 9 rutas: todas 200, exactamente 1 `<h1>`, canonical propio, JSON-LD que parsea
- Los 22 case studies y los 15 tutoriales están en el HTML servido
- **Cero errores de hidratación y cero errores de consola** en 6 páginas
- Tabs de filtrado: 22 → 6 (Landing) → 22, contadores correctos
- Cambio a español: `html lang="es"`, H1 "Casos de estudio", 22 tarjetas
- Los 7 crawlers (Googlebot, GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot,
  Bingbot, ChatGPT-User) reciben 200
- Las 34 URLs del sitemap responden 200
- `tsc --noEmit` limpio; lint sin warnings nuevos

---

## Fuera de alcance (no inventar)

Las fases de investigación de negocio, demanda, SERP en vivo y medición de
citaciones necesitan herramientas y accesos no conectados. Marcadas
`NO VERIFICADO` según la regla 0.1 del sistema: un reporte con huecos honestos
es útil; uno con datos inventados es peor que no hacer nada.

**No hay** rankings, volúmenes de búsqueda, backlinks, Core Web Vitals de campo
ni citaciones de IA medidas en este documento porque no se pudieron observar.
