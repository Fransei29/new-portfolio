// app/blog/opengraph-image.tsx
// Imagen de compartir del listado del blog (/blog).

import { ImageResponse } from 'next/og';
import { getAllPosts } from '../../lib/blog';

export const alt = 'Blog de Franco Seiler';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const INK = '#2e294e';
const LILA = '#b59cf8';
const ARENA = '#f3f2f4';

export default async function BlogOpenGraphImage() {
  // El conteo real da señal de que el blog está vivo, sin mantenerlo a mano.
  const count = getAllPosts('en').length;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 32,
          padding: '80px',
          background: ARENA,
          borderLeft: `24px solid ${INK}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: LILA }} />
          <div
            style={{
              fontSize: 26,
              fontWeight: 600,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              color: '#8a8599',
            }}
          >
            Franco Seiler
          </div>
        </div>

        <div style={{ fontSize: 92, fontWeight: 800, letterSpacing: -2, color: INK }}>Blog</div>

        <div style={{ fontSize: 32, lineHeight: 1.4, color: '#6b6b6b', maxWidth: 820 }}>
          Notes on web development, architecture, and the technical decisions behind the products I
          build.
        </div>

        {count > 0 && (
          <div style={{ display: 'flex', fontSize: 24, fontWeight: 500, color: '#8a8599' }}>
            {count} {count === 1 ? 'article' : 'articles'}
          </div>
        )}
      </div>
    ),
    size
  );
}
