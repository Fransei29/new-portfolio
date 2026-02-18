// app/layout.tsx
import './globals.css';
import { ThemeProvider } from 'next-themes';
import Footer from '../components/Footer/Footer'; 
import Header from '../components/Header/Header';
import { ScrollToTop } from '../components/ScrollToTop/ScrollToTop';
import  ThemeTransitionOverlay from '../components/ThemeTransition/ThemeTransitionComponent';
import LoadingWrapper from '../components/LoadingWrapper/LoadingWrapper';
import { LanguageProvider } from '../contexts/LanguageContext';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';

const siteUrl = 'https://www.francoseiler.com';

export const metadata: Metadata = {
  title: 'Franco Seiler | Soluciones de Software',
  description: 'Descubre soluciones innovadoras y mi experiencia en tecnología.',
  keywords: ['Franco Seiler', 'Full-Stack Developer', 'Web Developer', 'React', 'Next.js', 'TypeScript', 'Portfolio'],
  authors: [{ name: 'Franco Seiler' }],
  creator: 'Franco Seiler',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: siteUrl,
    siteName: 'Franco Seiler',
    title: 'Franco Seiler | Soluciones de Software',
    description: 'Descubre soluciones innovadoras y mi experiencia en tecnología.',
    images: [
      {
        url: `${siteUrl}/share.png`,
        width: 1200,
        height: 630,
        alt: 'Franco Seiler - Soluciones de Software',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Franco Seiler | Soluciones de Software',
    description: 'Descubre soluciones innovadoras y mi experiencia en tecnología.',
    images: [`${siteUrl}/share.png`],
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
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {

  return (
    <html lang="en">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" 
        />
        <link rel="stylesheet" href="https://geisthub.vercel.app/font.css" />
      </head>
      <body className="container">
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <LanguageProvider>
          <LoadingWrapper>
            <Header />
            <div id="banner"></div>
            {children}
            <Footer />
            <ThemeTransitionOverlay />
            <ScrollToTop />
          </LoadingWrapper>
        </LanguageProvider>
      </ThemeProvider>
      <Analytics />
      </body>
    </html>
  );
}
