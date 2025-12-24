import { useLanguage } from '../context/LanguageContext';

export const useTranslation = () => {
  const { translations, language } = useLanguage();

  // Helper to access nested properties safely
  // Example use: t('nav.home')
  const t = (path: string): string => {
    const keys = path.split('.');
    let current: any = translations;

    for (const key of keys) {
      if (current[key] === undefined) {
        console.warn(`Translation key missing: ${path} in ${language}`);
        return path;
      }
      current = current[key];
    }
    
    return current as string;
  };

  return { t, language };
};
