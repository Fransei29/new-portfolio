// app/[lang]/layout.tsx
// Layout raíz del sitio. El idioma sale de la URL (/es/... o sin prefijo para
// inglés, ver middleware.ts), así que el servidor renderiza cada página ya en
// su idioma y con el <html lang> correcto — antes el HTML siempre era inglés y
// el español aparecía recién en el cliente, invisible para los buscadores.
//
// También es el cromo del sitio: header, footer y overlays. fun mode y
// design-exploration tienen su propio layout raíz y no lo heredan.
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import RootDocument, { rootMetadata } from '../../components/Shell/RootDocument';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { ScrollToTop } from '../../components/ScrollToTop/ScrollToTop';
import ThemeTransitionOverlay from '../../components/ThemeTransition/ThemeTransitionComponent';
import NavigationLoader from '../../components/NavigationLoader/NavigationLoader';
import { LOCALES, isLocale } from '../../lib/i18n';
// Oculto temporalmente: se retoma cuando mejoremos el asistente.
// import ChatWidget from '../../components/ChatWidget/ChatWidget';

export const metadata = rootMetadata;

// Solo /en y /es: cualquier otro primer segmento es un 404, no una página vacía.
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function SiteLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <RootDocument lang={lang} routed>
      <Header />
      <div id="banner"></div>
      {children}
      <Footer />
      <ThemeTransitionOverlay />
      <NavigationLoader />
      <ScrollToTop />
      {/* <ChatWidget /> */}
    </RootDocument>
  );
}
