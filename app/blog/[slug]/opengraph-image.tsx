// app/blog/[slug]/opengraph-image.tsx
// Genera la imagen de compartir de cada post en tiempo de build.
//
// Next detecta este archivo por convención y agrega las meta tags og:image y
// twitter:image automáticamente — no hay que declararlas en generateMetadata.
//
// Nota: ImageResponse no puede usar las fuentes de next/font (necesita el
// binario de la tipografía). Se usa la familia por defecto del runtime; el
// carácter de marca lo aportan el color y el layout, no la tipografía.

import { ImageResponse } from 'next/og';
import { getAllPostParams, getPost } from '../../../lib/blog';

export const alt = 'Artículo del blog de Franco Seiler';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  const slugs = new Set(getAllPostParams().map((param) => param.slug));
  return Array.from(slugs).map((slug) => ({ slug }));
}

// Colores de marca (lib/site no los exporta; ImageResponse no lee variables CSS).
const INK = '#2e294e';
const LILA = '#b59cf8';
const ARENA = '#f3f2f4';

export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // La imagen es única por slug, así que se usa la versión en inglés como
  // canónica. Generar una por idioma requeriría rutas separadas.
  const post = (await getPost(slug, 'en')) ?? (await getPost(slug, 'es'));

  const title = post?.title ?? 'Franco Seiler';
  const readingLabel = post ? `${post.readingMinutes} min read` : '';
  const tags = (post?.tags ?? []).slice(0, 3);

  // El motor de next/og no implementa -webkit-line-clamp de forma fiable, así
  // que el recorte se hace acá. 120 caracteres es lo que entra en dos líneas a
  // 28px sobre el ancho útil (medido, no estimado). Se corta en el espacio
  // previo para no partir una palabra.
  const truncate = (text: string, max: number) => {
    if (text.length <= max) return text;
    const cut = text.slice(0, max);
    return `${cut.slice(0, cut.lastIndexOf(' ')).trimEnd()}…`;
  };
  const description = truncate(post?.description ?? '', 120);

  // Los títulos largos necesitan menos cuerpo para no desbordar la caja.
  const titleSize = title.length > 70 ? 54 : title.length > 45 ? 64 : 76;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: ARENA,
          // Franja lila a la izquierda: el mismo acento del sitio.
          borderLeft: `24px solid ${INK}`,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 7,
                background: LILA,
              }}
            />
            <div
              style={{
                fontSize: 26,
                fontWeight: 600,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                color: '#8a8599',
              }}
            >
              Franco Seiler · Blog
            </div>
          </div>

          <div
            style={{
              fontSize: titleSize,
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: -1.5,
              color: INK,
            }}
          >
            {truncate(title, 110)}
          </div>

          {description && (
            <div
              style={{
                fontSize: 28,
                lineHeight: 1.45,
                color: '#6b6b6b',
              }}
            >
              {description}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 12 }}>
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  display: 'flex',
                  padding: '10px 22px',
                  fontSize: 24,
                  fontWeight: 600,
                  color: INK,
                  background: '#e7e1fb',
                  borderRadius: 10,
                }}
              >
                {tag}
              </div>
            ))}
          </div>

          {readingLabel && (
            <div style={{ fontSize: 24, fontWeight: 500, color: '#8a8599' }}>{readingLabel}</div>
          )}
        </div>
      </div>
    ),
    size
  );
}
