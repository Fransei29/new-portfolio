// app/layout.tsx
import './globals.css';
import { ThemeProvider } from 'next-themes';
import Head from 'next/head';
import Footer from '../components/footer/Footer'; 
import { ScrollToTop } from '../components/ScrollToTop/ScrollToTop';
import  ThemeTransitionOverlay from '../components/ThemeTransition/ThemeTransitionComponent';


export const metadata = {
  title: 'Franco Seiler | Portfolio',
  description: 'Portfolio de desarrollador frontend.',
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
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content="Portfolio de desarrollador frontend." />
          <meta property="og:title" content="Franco Seiler | Portfolio" />
          <meta property="og:description" content="Portfolio de desarrollador frontend." />
          <meta property="og:image" content="/favicon.ico" />
        </Head>
      </head>
      <body className="container">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <div id="banner"></div> {/* Ensure this element exists */}
          {children}
          <Footer />
          <ThemeTransitionOverlay />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
