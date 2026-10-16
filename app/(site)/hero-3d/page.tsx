// app/(site)/hero-3d/page.tsx
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

export default function Hero3DPage() {
  return <HomeContent hero={<SystemHero />} panda3d />;
}
