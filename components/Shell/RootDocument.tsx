// components/Shell/RootDocument.tsx
// El documento HTML compartido (fuentes, providers, analytics, JSON-LD). El
// sitio tiene tres layouts raíz — app/[lang] (con su idioma en <html lang>),
// app/fun y app/design-exploration — y los tres lo usan.
import '../../app/globals.css';
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

// Tipografías de marca: Bricolage Grotesque (títulos) + Plus Jakarta Sans (texto)
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-heading',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
});
import { LanguageProvider } from '../../contexts/LanguageContext';
import { Analytics } from '@vercel/analytics/next';
import GoogleAnalytics from '../Analytics/GoogleAnalytics';
import SiteJsonLd from '../Seo/SiteJsonLd';
import type { Metadata } from 'next';
import { OG_IMAGE, SITE_URL } from '../../lib/site';

export const rootMetadata: Metadata = {
  // Base para resolver URLs relativas en metadata. Sin esto, las imágenes que
  // genera opengraph-image.tsx se anuncian con el host del request — en un
  // preview de Vercel saldría la URL del preview, y los scrapers de LinkedIn y
  // Twitter cachearían esa dirección efímera en lugar del dominio real.
  metadataBase: new URL(SITE_URL),
  // Fallback para las rutas sin metadata propia (404, estados del newsletter).
  // En inglés porque es el idioma que sirve el HTML; antes estaba en español
  // con locale es_ES y esas páginas se declaraban en otro idioma que el real.
  title: 'Franco Seiler | Custom Software & Business Automation',
  description:
    'Software studio building custom platforms and automations for teams whose operations have outgrown spreadsheets.',
  keywords: ['custom software development', 'business process automation', 'web applications', 'AI integration', 'software studio', 'Franco Seiler'],
  authors: [{ name: 'Franco Seiler' }],
  creator: 'Franco Seiler',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Franco Seiler',
    title: 'Franco Seiler | Custom Software & Business Automation',
    description:
      'Software studio building custom platforms and automations for teams whose operations have outgrown spreadsheets.',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Franco Seiler | Custom Software & Business Automation',
    description:
      'Software studio building custom platforms and automations for teams whose operations have outgrown spreadsheets.',
    images: [OG_IMAGE.url],
    creator: '@francoseiler',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  /* Los assets viven en /FAVICON (ver esa carpeta). El .ico se deja también en
     la raíz porque los navegadores lo piden por defecto en /favicon.ico, sin
     mirar el <link>. */
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/FAVICON/android-chrome-192x192.png', type: 'image/png', sizes: '192x192' },
      { url: '/FAVICON/android-chrome-512x512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: '/FAVICON/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

import { ReactNode } from 'react';
import type { Locale } from '../../lib/i18n';

interface Props {
  children: ReactNode;
  lang: Locale;
  /** true en el sitio: el idioma sale de la URL (ver LanguageProvider). */
  routed?: boolean;
}

export default function RootDocument({ children, lang, routed = false }: Props) {
  return (
    <html lang={lang} className={`${bricolage.variable} ${jakarta.variable}`}>
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" 
        />
        <link rel="stylesheet" href="https://geisthub.vercel.app/font.css" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Blog | Franco Seiler"
          href="/blog/rss.xml"
        />
        <SiteJsonLd />
      </head>
      <body className="container">
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <LanguageProvider initialLanguage={lang} routed={routed}>
          {children}
        </LanguageProvider>
      </ThemeProvider>
      <Analytics />
      <GoogleAnalytics />
      </body>
    </html>
  );
}
