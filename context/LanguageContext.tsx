import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { en, fr } from '../locales/translations';

type Locale = 'en' | 'fr';
type Translations = typeof en;

interface LanguageContextType {
  language: Locale;
  toggleLanguage: (lang: Locale) => void;
  translations: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Locale>('en');

  // Load saved language from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('app_language') as Locale;
    if (savedLang && (savedLang === 'en' || savedLang === 'fr')) {
      setLanguage(savedLang);
    }
  }, []);

  // Update localStorage and HTML lang attribute when language changes
  useEffect(() => {
    localStorage.setItem('app_language', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = (lang: Locale) => {
    setLanguage(lang);
  };

  const translations = language === 'en' ? en : fr;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};