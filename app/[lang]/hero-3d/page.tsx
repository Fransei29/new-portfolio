// app/[lang]/hero-3d/page.tsx
// Prueba del hero 3D: la misma home con el producto en capas en lugar del
// dashboard 2D. Como el modo fun, vive aparte y la home de siempre no cambia.
// Si queda, se pasa a la home normal.
import type { Metadata } from 'next';
import HomeContent from '../../../components/HomeContent/HomeContent';
import SystemHero from '../../../components/SystemHero/SystemHero';

export const metadata: Metadata = {
  title: 'Franco Seiler · Hero 3D',
  // Mismo contenido que la home: no se indexa para no competir con ella.
  robots: { index: false, follow: true },
  alternates: { canonical: '/' },
};

// Lo que necesita el 3D, pedido desde el HTML: así baja en paralelo con el
// resto de la página y no recién cuando el hero se hidrata (si no, el panda
// aparecía bastante después que todo lo demás). Van como fetch con CORS porque
// GLTFLoader y DRACOLoader los piden con fetch().
const PRELOAD = ['/hero3d/system.glb', '/hero3d/panda.glb', '/draco/draco_wasm_wrapper.js', '/draco/draco_decoder.wasm'];

export default function Hero3DPage() {
  return (
    <>
      {PRELOAD.map((href) => (
        <link key={href} rel="preload" as="fetch" href={href} crossOrigin="anonymous" />
      ))}
      {/* Con CORS, como la pide el TextureLoader (y el póster): una sola descarga. */}
      <link rel="preload" as="image" href="/hero3d/screen.webp" crossOrigin="anonymous" />
      <HomeContent hero={<SystemHero />} panda3d />
    </>
  );
}
