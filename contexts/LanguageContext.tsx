'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { LOCALE_COOKIE, localePath, stripLocale } from '../lib/i18n';

// Types
interface Translations {
  [key: string]: any;
}

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isLoading: boolean;
  isHydrated: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Helper function to get nested object value
const getNestedValue = (obj: any, path: string): string => {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
};

interface LanguageProviderProps {
  children: ReactNode;
  initialLanguage?: Language;
  routed?: boolean;
}

// Load translations synchronously for initial render
const loadTranslationsSync = (lang: string): Translations => {
    try {
      const modules = [
        'common',
        'home',
        'experience',
        'projects',
        'contact',
        'services',
        'bootcamp',
        'automation',
        'comparison'
      ];

      const loadedTranslations: Translations = {};

      // Load all translation modules synchronously
      for (const module of modules) {
        try {
          // Use require for synchronous loading
          const moduleTranslations = require(`../locales/${lang}/${module}.json`);
          Object.assign(loadedTranslations, moduleTranslations);
        } catch (error) {
          console.warn(`Failed to load ${lang}/${module}.json:`, error);
        }
      }

    return loadedTranslations;
  } catch (error) {
    console.error('Error loading translations:', error);
    return {};
  }
};

/** Guarda la elección del visitante: la cookie la lee el middleware (para
 *  mandar a /es a quien eligió español y entra por un link sin prefijo) y
 *  localStorage la leen las páginas que cambian idioma sin navegar. */
const rememberLanguage = (lang: Language) => {
  try {
    localStorage.setItem('language', lang);
  } catch {
    /* modo privado o storage bloqueado: la cookie alcanza */
  }
  document.cookie = `${LOCALE_COOKIE}=${lang}; path=/; max-age=31536000; samesite=lax`;
};

/**
 * Dos modos:
 *
 * - **routed** (el sitio): el idioma viene de la URL (`/es/...`), así que el
 *   servidor ya renderiza el HTML en ese idioma y `<html lang>` es correcto
 *   desde el primer byte. Cambiar de idioma es navegar a la otra URL.
 * - **local** (fun mode, design-exploration): sin rutas por idioma; arranca en
 *   inglés y aplica la preferencia guardada o la del navegador al hidratar.
 */
export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
  initialLanguage = 'en',
  routed = false,
}) => {
  const router = useRouter();
  // null solo fuera del App Router; acá siempre hay ruta.
  const pathname = usePathname() ?? '/';
  const [localLanguage, setLocalLanguage] = useState<Language>(initialLanguage);
  const [isHydrated, setIsHydrated] = useState(false);
  const isLoading = false;

  // En modo routed el idioma es el de la URL, sin estado propio: al navegar de
  // /x a /es/x el layout re-renderiza con el nuevo valor.
  const language = routed ? initialLanguage : localLanguage;
  const translations = useMemo(() => loadTranslationsSync(language), [language]);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem('language');
    } catch {
      /* sin storage: se usa el navegador */
    }

    if (routed) {
      // Red de seguridad: el middleware ya manda a /es por Accept-Language antes
      // de renderizar. Esto solo cubre el caso raro en que el header dice otra
      // cosa que navigator.language. Googlebot renderiza con navegador en
      // inglés, así que no entra acá.
      if (!saved && initialLanguage === 'en' && navigator.language.split('-')[0] === 'es') {
        rememberLanguage('es');
        router.replace(`${localePath('es', stripLocale(pathname))}${window.location.search}${window.location.hash}`);
      }
    } else {
      const preferred: Language =
        saved === 'es' || saved === 'en'
          ? saved
          : navigator.language.split('-')[0] === 'es'
            ? 'es'
            : 'en';
      if (preferred !== localLanguage) setLocalLanguage(preferred);
    }

    // Señal global única para que header + hero arranquen su entrada
    // exactamente en el mismo frame (en vez de depender de re-renders separados).
    document.documentElement.classList.add('hydrated');
    setIsHydrated(true);
    // Solo al montar.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // En modo local el HTML se sirve como "en"; esto lo corrige al cambiar. En
  // modo routed el servidor ya lo manda bien.
  useEffect(() => {
    if (!routed) document.documentElement.lang = language;
  }, [language, routed]);

  const setLanguage = useCallback(
    (lang: Language) => {
      rememberLanguage(lang);
      if (!routed) {
        setLocalLanguage(lang);
        return;
      }
      if (lang === language) return;
      const target = localePath(lang, stripLocale(pathname));
      router.push(`${target}${window.location.search}${window.location.hash}`, { scroll: false });
    },
    [routed, language, pathname, router]
  );

  const t = (key: string): string => {
    const value = getNestedValue(translations, key);
    
    if (value !== undefined) {
      return typeof value === 'string' ? value : JSON.stringify(value);
    }
    
    // Return key if not found
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isLoading, isHydrated }}>
      {children}
    </LanguageContext.Provider>
  );
};

/** Ruta en el idioma actual: `useLocalePath()('/contact')` → `/es/contact`. */
export const useLocalePath = () => {
  const { language } = useLanguage();
  return useCallback((path: string) => localePath(language, path), [language]);
};
