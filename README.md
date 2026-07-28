# francoseiler.com

Portfolio y blog personal. Next.js 15 (App Router), TypeScript y SCSS Modules.

## Arrancar

```bash
npm install
cp .env.example .env.local   # completar las claves — ver docs/EMAIL_SETUP.md
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

Sin `.env.local` el sitio funciona, pero el formulario de contacto y el newsletter fallan al enviar.

## Estructura

```
app/
  blog/              listado, post individual, RSS y OG images
  newsletter/        páginas de resultado (confirmado, baja, error)
  api/
    contact/         formulario de contacto → Resend
    newsletter/      subscribe · confirm · unsubscribe
  sitemap.ts         sitemap dinámico (incluye posts)
  robots.ts
components/          UI, un directorio por componente + su .module.scss
content/blog/        posts en MDX — es/ y en/  (ver content/blog/README.md)
lib/                 blog, email, tokens, rate limiting, constantes del sitio
locales/             traducciones es/en del resto del sitio
docs/                guías de setup
```

## Cómo funciona el contenido

### Blog

Los posts son archivos `.mdx` en `content/blog/<idioma>/`. El nombre del archivo es el slug. Agregar un archivo alcanza: el listado, el sitemap, el RSS y la imagen de compartir se regeneran solos en el build.

Guía completa para publicar: [`content/blog/README.md`](content/blog/README.md).

**El blog se renderiza en el servidor**, a diferencia del resto del sitio. Es deliberado: el `LanguageContext` traduce en el cliente, así que el HTML que reciben los buscadores sale siempre en inglés. Para contenido cuyo propósito es rankear, eso anula el beneficio. En el blog el idioma se resuelve del query param `?lang=es` y el HTML sale ya traducido.

Si agregás otra sección orientada a SEO, seguí este patrón y no el del resto del sitio.

### Newsletter

Double opt-in: el formulario no da de alta a nadie, manda un mail de confirmación. Recién al hacer clic se agrega el contacto a Resend Audiences. Los tokens van firmados con HMAC-SHA256, así que no hace falta base de datos.

Los envíos se hacen desde el panel de Resend (Broadcasts). No hay panel de administración propio.

Setup y decisiones de diseño: [`docs/EMAIL_SETUP.md`](docs/EMAIL_SETUP.md).

## SEO

Ya montado: sitemap dinámico, `robots.txt`, canonical, `hreflang` es/en, JSON-LD (`BlogPosting` + `BreadcrumbList`), RSS y OG images generadas por post.

**Limitación conocida:** `<html lang>` se sirve como `en` y lo corrige el cliente al hidratar (`contexts/LanguageContext.tsx`). El HTML inicial declara inglés aunque la página se lea en español. La solución de raíz son rutas `/es` y `/en`, que cambiaría todas las URLs actuales.

## Comandos

```bash
npm run dev      # desarrollo
npm run build    # build de producción
npm run start    # servir el build
npm run lint     # eslint
```

## Deploy

Vercel. Las variables de `.env.local` hay que cargarlas también en Settings → Environment Variables: las locales no se propagan.
