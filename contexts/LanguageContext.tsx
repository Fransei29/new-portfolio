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

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [translations, setTranslations] = useState<Translations>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load translations synchronously for initial render
  const loadTranslationsSync = (lang: string) => {
    try {
      const modules = [
        'common',
        'home', 
        'experience',
        'projects',
        'contact',
        'services',
        'bootcamp'
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

  // Initialize with default language translations immediately
  useEffect(() => {
    if (!isInitialized) {
      const defaultLang = 'en';
      const initialTranslations = loadTranslationsSync(defaultLang);
      setTranslations(initialTranslations);
      setLanguageState(defaultLang);
      setIsInitialized(true);
      setIsLoading(false);
    }
  }, [isInitialized]);

  // Load user's preferred language after initialization
  useEffect(() => {
    if (isInitialized) {
      // Intentar obtener el idioma guardado en localStorage
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
        setLanguageState(savedLanguage);
        const userTranslations = loadTranslationsSync(savedLanguage);
        setTranslations(userTranslations);
      } else {
        // Detectar idioma del navegador
        const browserLanguage = navigator.language.split('-')[0];
        const detectedLang = browserLanguage === 'es' ? 'es' : 'en';
        setLanguageState(detectedLang);
        const browserTranslations = loadTranslationsSync(detectedLang);
        setTranslations(browserTranslations);
      }
      setIsHydrated(true);
    }
  }, [isInitialized]);

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