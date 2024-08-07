'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './globals.css';


export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isSpecificPage = pathname === '/tutorials' || pathname === '/projects';

  return (
    <html lang="es">
      <head>
       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"/>
       <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="container">
        <header className="header">
          <nav className="nav">
            <Link href="/" passHref>
              <p className="nav-link">Home</p>
            </Link>
            <Link href="/tutorials" passHref>
              <p className="nav-link">Tutorials</p>
            </Link>
            <Link href="/projects" passHref>
              <p className="nav-link">My Projects</p>
            </Link>
          </nav>
        </header>
        <main className={isSpecificPage ? '' : 'main'}>
          {children}
        </main>
        <footer className="footer">
          <p>© 2024 Franco Seiler all rights reserved</p>
        </footer>
      </body>
    </html>
  );
}
