'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useScrollAnimation } from '../hooks/Scroll';
import { Home, BookOpen, Folder } from 'lucide-react';

import { ReactNode } from 'react';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const elementsRef = useScrollAnimation();
  const pathname = usePathname();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={(el) => {elementsRef.current[0] = el;}} className="fade-in-right">
      <header className="header">
        <nav className="nav">
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

      {/* Añadido motion.div para animación más fluida */}
      <motion.main
        className={`transition-opacity duration-700 ease-in ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}
        ref={ref}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
        transition={{ duration: 0.7 }}
      >
        {children}
      </motion.main>
    </div>
  );
}
