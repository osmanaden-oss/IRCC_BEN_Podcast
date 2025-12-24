import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Check } from 'lucide-react';

export const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (lang: 'en' | 'fr') => {
    toggleLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center justify-center 
          w-12 h-10 
          rounded-lg
          bg-gradient-to-br from-ben-gold/20 to-ben-terracotta/20
          backdrop-blur-md border border-ben-gold/30
          text-ben-gold font-bold text-sm tracking-widest uppercase
          hover:bg-ben-gold/30 hover:border-ben-gold/50
          transition-all duration-300
          shadow-lg shadow-ben-gold/5
        "
        aria-label="Switch Language"
      >
        {language}
      </button>

      {/* Dropdown */}
      <div 
        className={`
          absolute top-full right-0 mt-2 w-32 
          glass-panel rounded-xl overflow-hidden
          border border-ben-gold/30 shadow-2xl
          transition-all duration-300 origin-top-right
          ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}
        `}
      >
        <div className="flex flex-col p-1 bg-ben-black/80 backdrop-blur-xl">
          <button
            onClick={() => handleSelect('en')}
            className={`
              flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors
              ${language === 'en' ? 'bg-ben-gold/20 text-ben-gold' : 'text-ben-sand hover:text-white hover:bg-white/5'}
            `}
          >
            <span>English</span>
            {language === 'en' && <Check size={14} />}
          </button>
          <button
            onClick={() => handleSelect('fr')}
            className={`
              flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors
              ${language === 'fr' ? 'bg-ben-gold/20 text-ben-gold' : 'text-ben-sand hover:text-white hover:bg-white/5'}
            `}
          >
            <span>Français</span>
            {language === 'fr' && <Check size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
};
