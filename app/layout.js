'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import './globals.css';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ThemeWrapper from '@/components/ThemeWrapper'; 
import { useScrollAnimation } from '../hooks/Scroll';
import { Home, BookOpen, Folder } from "lucide-react";

export default function RootLayout({ children }) {
  const elementsRef = useScrollAnimation();
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
      <div ref={(el) => (elementsRef.current[0] = el)} className="fade-in-right">
      <body className="container">
          <header className="header">
            <nav className="nav">
              <div>
                <div className="logo-container">
                  <Image
                    src="/dev3.png"
                    alt="Logo"
                    width={90}
                    height={90}
                    className="logo"
                  />
                <Link href="/" passHref>
                  <p className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
                  <Home className="iconNav" size={30} />
                  </p>
                </Link>
                </div>
              </div>
              <Link href="/tutorials" passHref>
                <p className={`nav-link ${pathname === '/tutorials' ? 'active' : ''}`}>
                <BookOpen className="iconNav" size={30} />
                </p>
              </Link>
              <Link href="/projects" passHref>
                <p className={`nav-link ${pathname === '/projects' ? 'active' : ''}`}>
                <Folder className="iconNav" size={30} />
                </p>
              </Link>
            </nav>
          </header>
          
          <motion.main    /* Animación de entrada para todas las páginas */
            ref={ref}                       // Detecta cuando el contenedor principal está en la vista
            initial={{ opacity: 0, y: 1 }} // Empieza desde abajo
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 2 }} // Solo cuando esté visible
            transition={{ duration: 1, delay:  0.4 }} // Duración ajustable para entrada suave
          >
            {children}
          </motion.main>

      </body>
      </div>
      </ThemeWrapper> 
    </html>
  );
}
