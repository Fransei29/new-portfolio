'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
        'automation'
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

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // SSR y primer render de cliente arrancan en 'en' para evitar hydration mismatch
  // y, sobre todo, para que el primer paint tenga las traducciones cargadas
  // (no flash de claves "nav.home").
  const [language, setLanguageState] = useState<Language>('en');
  const [translations, setTranslations] = useState<Translations>(() => loadTranslationsSync('en'));
  const [isHydrated, setIsHydrated] = useState(false);
  const isLoading = false;

  // Después de hidratar, aplicar idioma del usuario (localStorage o navegador).
  useEffect(() => {
    let preferred: Language = 'en';
    const savedLanguage = localStorage.getItem('language') as Language | null;
    if (savedLanguage === 'es' || savedLanguage === 'en') {
      preferred = savedLanguage;
    } else {
      const browserLanguage = navigator.language.split('-')[0];
      preferred = browserLanguage === 'es' ? 'es' : 'en';
    }
    if (preferred !== 'en') {
      setLanguageState(preferred);
      setTranslations(loadTranslationsSync(preferred));
    }
    // Señal global única para que header + hero arranquen su entrada
    // exactamente en el mismo frame (en vez de depender de re-renders separados).
    document.documentElement.classList.add('hydrated');
    setIsHydrated(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    const newTranslations = loadTranslationsSync(lang);
    setTranslations(newTranslations);
  };

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