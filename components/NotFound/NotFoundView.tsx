'use client';

// La 404 no es un callejón sin salida: lleva a las tres páginas que más le
// sirven a alguien que llegó por un link viejo o mal escrito.
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { localePath } from '../../lib/i18n';
import styles from './NotFoundView.module.scss';

const COPY = {
  en: {
    eyebrow: 'Error 404',
    title: 'This page doesn’t exist',
    body: 'The link may be old or mistyped. These are the places most people are looking for:',
    links: [
      { href: '/services', label: 'Services', hint: 'What we build and how we work' },
      { href: '/projects', label: 'Case studies', hint: 'Real projects, decisions and results' },
      { href: '/blog', label: 'Blog', hint: 'Engineering notes and technical decisions' },
    ],
    home: 'Back to home',
    contact: 'Start your project',
  },
  es: {
    eyebrow: 'Error 404',
    title: 'Esta página no existe',
    body: 'Puede que el link sea viejo o esté mal escrito. Esto es lo que la mayoría viene a buscar:',
    links: [
      { href: '/services', label: 'Servicios', hint: 'Qué construimos y cómo trabajamos' },
      { href: '/projects', label: 'Casos de estudio', hint: 'Proyectos reales, decisiones y resultados' },
      { href: '/blog', label: 'Blog', hint: 'Notas de ingeniería y decisiones técnicas' },
    ],
    home: 'Volver al inicio',
    contact: 'Empezá tu proyecto',
  },
};

export default function NotFoundView() {
  // El 404 es una sola página estática para todo el sitio (no recibe params),
  // así que el idioma sale de la URL pedida, ya en el cliente. Se resuelve en
  // un efecto para que el primer render coincida con el HTML del servidor.
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  useEffect(() => {
    const { pathname } = window.location;
    if (pathname === '/es' || pathname.startsWith('/es/')) setLanguage('es');
  }, []);
  const toLocale = (path: string) => localePath(language, path);
  const copy = COPY[language];

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{copy.eyebrow}</p>
        <h1 className={styles.title}>{copy.title}</h1>
        <p className={styles.body}>{copy.body}</p>

        <ul className={styles.links}>
          {copy.links.map((link) => (
            <li key={link.href}>
              <Link href={toLocale(link.href)} className={styles.linkCard}>
                <span>
                  <span className={styles.linkLabel}>{link.label}</span>
                  <span className={styles.linkHint}>{link.hint}</span>
                </span>
                <ArrowRight size={18} aria-hidden />
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <Link href={toLocale('/contact')} className={styles.primary}>
            {copy.contact}
          </Link>
          <Link href={toLocale('/')} className={styles.secondary}>
            {copy.home}
          </Link>
        </div>
      </div>
    </main>
  );
}
