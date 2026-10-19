// app/og.png/route.tsx
// Imagen de compartir por defecto del sitio (1200×630). Es un route handler y no
// un `opengraph-image.tsx` porque tiene que poder referenciarse con una URL fija
// desde cada ruta: cuando una página declara su propio `openGraph`, reemplaza
// entero el del layout — imágenes incluidas — y la ruta quedaba sin og:image.
// Mismo diseño que la del blog.

import { ImageResponse } from 'next/og';
import { OG_IMAGE } from '../../lib/site';

export const dynamic = 'force-static';

const INK = '#2e294e';
const LILA = '#b59cf8';
const ARENA = '#f3f2f4';

export function GET() {
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
            Franco Seiler · Software Studio
          </div>
        </div>

        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            letterSpacing: -2,
            lineHeight: 1.05,
            color: INK,
            maxWidth: 980,
          }}
        >
          Custom software & business automation
        </div>

        <div style={{ fontSize: 32, lineHeight: 1.4, color: '#6b6b6b', maxWidth: 900 }}>
          Platforms and automations for teams whose operations have outgrown spreadsheets.
        </div>
      </div>
    ),
    { width: OG_IMAGE.width, height: OG_IMAGE.height }
  );
}
