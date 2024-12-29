'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import './globals.css';
import Footer from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ThemeWrapper from '@/components/ThemeWrapper'; 

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Aplica animación cuando entra en vista

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <ThemeWrapper>   {/* Usamos el ThemeProvider de next-themes */}
      <body className="container">
          <header className="header">
            <nav className="nav">
              <div className="logo-container">
                <Image
                  src="/dev3.png"
                  alt="Logo"
                  width={72}
                  height={72}
                  className="logo"
                />
              </div>
              <Link href="/" passHref>
                <p className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
                  Home
                </p>
              </Link>
              <Link href="/tutorials" passHref>
                <p className={`nav-link ${pathname === '/tutorials' ? 'active' : ''}`}>
                  Tutorials
                </p>
              </Link>
              <Link href="/projects" passHref>
                <p className={`nav-link ${pathname === '/projects' ? 'active' : ''}`}>
                  My Projects
                </p>
              </Link>
              <Link href="/contact" passHref>
                <p className={`nav-link ${pathname === '/contact' ? 'active' : ''}`}>
                  Contact
                </p>
              </Link>
            </nav>
          </header>

          {/* Animación de entrada para todas las páginas */}
          <motion.main
            ref={ref}  // Detecta cuando el contenedor principal está en la vista
            initial={{ opacity: 0, y: 1 }} // Empieza desde abajo
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 2 }} // Solo cuando esté visible
            transition={{ duration: 0.5, delay:  0.3 }} // Duración ajustable para entrada suave
          >
            {children}
          </motion.main>

          <Footer />

      </body>
      </ThemeWrapper> 
    </html>
  );
}
