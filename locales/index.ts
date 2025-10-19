import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
interface Translations {
  [key: string]: any;
}

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string, fallback?: string) => string;
  isLoading: boolean;
}

// Context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined) as React.Context<LanguageContextType | undefined>;

// Hook to use translations
export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};

// Helper function to get nested object value
const getNestedValue = (obj: any, path: string): string => {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
};

// Language Provider Component
interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: string;
}

export const LanguageProvider = ({ 
  children, 
  defaultLanguage = 'en' 
}: LanguageProviderProps) => {
  const [language, setLanguage] = useState(defaultLanguage);
  const [translations, setTranslations] = useState<Translations>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load translations for a specific language
  const loadTranslations = async (lang: string) => {
    setIsLoading(true);
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

      // Load all translation modules
      for (const module of modules) {
        try {
          const moduleTranslations = await import(`./${lang}/${module}.json`);
          Object.assign(loadedTranslations, moduleTranslations.default || moduleTranslations);
        } catch (error) {
          console.warn(`Failed to load ${lang}/${module}.json:`, error);
        }
      }

      setTranslations(loadedTranslations);
    } catch (error) {
      console.error('Error loading translations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load translations when language changes
  useEffect(() => {
    loadTranslations(language);
  }, [language]);

  // Translation function
  const t = (key: string, fallback?: string): string => {
    const value = getNestedValue(translations, key);
    
    if (value !== undefined) {
      return typeof value === 'string' ? value : JSON.stringify(value);
    }
    
    // Return fallback or key if not found
    return fallback || key;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    isLoading
  };

  return React.createElement(
    LanguageContext.Provider,
    { value },
    children
  );
};

export default LanguageProvider;
