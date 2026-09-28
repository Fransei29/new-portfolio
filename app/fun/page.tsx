// app/fun/page.tsx
// Modo fun: el mismo portafolio con otra forma. Vive fuera del route group
// (site), así que no hereda el header ni el footer del sitio y sus estilos no
// tocan ninguna otra página. Se entra desde el botón del panda en el header.
import type { Metadata } from 'next';
import { Unbounded, DM_Sans } from 'next/font/google';
import { buildContent } from './_lib/buildContent';
import FunPage from './FunPage';

const display = Unbounded({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--fun-display',
  display: 'swap',
});

const body = DM_Sans({
  subsets: ['latin'],
  variable: '--fun-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Franco Seiler · Fun mode',
  // Mismo contenido que el sitio: no se indexa para no competir con él.
  robots: { index: false, follow: true },
  alternates: { canonical: '/' },
};

export default function FunModePage() {
  const data = { es: buildContent('es'), en: buildContent('en') };
  return <FunPage data={data} fontVars={`${display.variable} ${body.variable}`} year={new Date().getFullYear()} />;
}
