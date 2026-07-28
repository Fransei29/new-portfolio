# Cómo publicar un post

Cada post es un archivo `.mdx` (o `.md`). El nombre del archivo **es** el slug de la URL.

```
content/blog/es/mi-articulo.mdx  →  /blog/mi-articulo?lang=es
content/blog/en/mi-articulo.mdx  →  /blog/mi-articulo
```

Usar **el mismo nombre de archivo en ambos idiomas**: así el sitio genera solo las etiquetas `hreflang` que le dicen a Google que son la misma página traducida, en vez de dos páginas compitiendo entre sí.

Un post puede existir en un solo idioma. Si falta la traducción, `/blog/slug?lang=es` cae a la versión en inglés en lugar de dar 404.

## Frontmatter

```yaml
---
title: "Título del artículo"          # obligatorio — es el <h1> y el <title>
description: "Resumen de 1-2 frases"  # obligatorio — es la meta description de Google
date: 2026-08-01                      # obligatorio — formato YYYY-MM-DD
tags: ["nextjs", "arquitectura"]      # opcional — generan los filtros del listado
cover: "/img/blog/mi-imagen.webp"     # opcional — ruta desde /public
coverAlt: "Descripción de la imagen"  # texto alternativo, importante para accesibilidad y SEO
author: "Franco Seiler"               # opcional — default: Franco Seiler
featured: true                        # opcional
draft: true                           # opcional — ver abajo
---
```

Sobre `description`: es el texto que aparece bajo el título en los resultados de Google. Entre 120 y 155 caracteres es lo que entra sin cortarse. Escribirla para que dé ganas de hacer clic, no como resumen técnico.

## Borradores

`draft: true` oculta el post de los listados, del sitemap y del RSS — pero **sí** se ve en `npm run dev`. Sirve para escribir con vista previa sin publicar.

Cuando quieras salir live, cambiá `draft: true` a `false` (o borrá la línea) y hacé el build.

## Qué se genera solo

Al agregar un archivo no hay que tocar ningún otro lado. En el build se actualizan:

- El listado en `/blog` y los filtros por tag
- `sitemap.xml`, con las alternativas de idioma
- `/blog/rss.xml`
- Los datos estructurados (JSON-LD) de cada post
- Los "seguí leyendo" del pie, calculados por tags compartidos

## Markdown soportado

Encabezados, listas, **negrita**, `código inline`, bloques de código con triple backtick, tablas (GitHub Flavored Markdown), citas, imágenes y enlaces.

Empezá el cuerpo del artículo en `##`, no en `#`: el `#` ya lo ocupa el título del frontmatter, y tener dos `<h1>` confunde a los buscadores.

## Notas de SEO

- Los enlaces internos a otros posts o a `/projects` ayudan bastante: reparten autoridad y suben el tiempo en el sitio.
- Las imágenes de portada conviene que sean `.webp` de 1200×630, que es el tamaño que usan las tarjetas de Twitter y LinkedIn al compartir.
- El slug debería contener la búsqueda que querés rankear, en minúsculas y con guiones.
