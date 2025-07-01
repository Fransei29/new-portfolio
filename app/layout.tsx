// app/layout.tsx
import './globals.css';
import { ThemeProvider } from 'next-themes';
import Head from 'next/head';
import Footer from '../components/Footer/Footer'; 
import { ScrollToTop } from '../components/ScrollToTop/ScrollToTop';
import  ThemeTransitionOverlay from '../components/ThemeTransition/ThemeTransitionComponent';
import LoadingWrapper from '../components/LoadingWrapper/LoadingWrapper';
import { LanguageProvider } from '../contexts/LanguageContext';

export const metadata = {
  title: 'Franco Seiler',
  description: 'Franco Seiler Web',
};

import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {

  return (
    <html lang="en">
      <head>
        <Head>
          <link 
            rel="stylesheet" 
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" 
          />
          <link rel="stylesheet" href="https://geisthub.vercel.app/font.css" />
          <link rel="icon" href="/new.ico" />
          <meta name="description" content="Portfolio de desarrollador frontend." />
          <meta property="og:title" content="Franco Seiler" />
          <meta property="og:description" content="Portfolio de desarrollador frontend." />
          
          <meta property="og:image" content="/new.ico" />
        </Head>
      </head>
      <body className="container">
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <LanguageProvider>
          <LoadingWrapper>
            <div id="banner"></div>
            {children}
            <Footer />
            <ThemeTransitionOverlay />
            <ScrollToTop />
          </LoadingWrapper>
        </LanguageProvider>
      </ThemeProvider>
      </body>
    </html>
  );
}
