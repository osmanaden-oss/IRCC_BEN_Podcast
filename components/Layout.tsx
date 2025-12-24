import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Footer } from './Footer';
import { useSubscribe } from '../context/SubscribeContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslation } from '../hooks/useTranslation';


export const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { openSubscribeModal } = useSubscribe();
  const { t } = useTranslation();


  const navLinks = [
    { name: t('nav.episodes'), path: '/episodes' },
    { name: t('nav.team'), path: '/team' },
    { name: t('nav.blog'), path: '/blog' },
    { name: t('nav.contact'), path: '/contact' },
  ];


  return (
    <div className="min-h-screen relative font-sans text-gray-200 flex flex-col">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-ben-terracotta/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-ben-gold/10 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-ben-brown/20 rounded-full blur-[100px]" />
      </div>


      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${pathname === '/' && !isMenuOpen ? 'bg-transparent py-6' : 'glass-panel py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          <NavLink to="/" className="flex items-center gap-2 z-50">
            <img 
              src="https://i.imgur.com/QjTqaPY.png" 
              alt="BEN Podcast Logo"
              className="h-10 w-10"
            />
            <span className="font-display font-bold text-xl tracking-wide text-white whitespace-nowrap">
              {t('nav.brand').substring(0, t('nav.brand').lastIndexOf('.'))}
              <span className="text-ben-gold">{t('nav.brand').substring(t('nav.brand').lastIndexOf('.'))}</span>
            </span>
          </NavLink>


          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink 
                key={link.path} 
                to={link.path}
                className={({ isActive }) => 
                  `text-sm uppercase tracking-widest font-medium hover:text-ben-gold transition-colors ${isActive ? 'text-ben-gold border-b border-ben-gold' : 'text-gray-300'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
            
            <div className="flex items-center gap-4">
              <button 
                 onClick={openSubscribeModal}
                 className="px-5 py-2 rounded-full border border-ben-gold/50 text-ben-gold hover:bg-ben-gold hover:text-ben-darkbrown transition-all text-sm font-semibold whitespace-nowrap"
              >
                {t('nav.subscribe')}
              </button>
              
              {/* Language Switcher */}
              <LanguageSwitcher />
            </div>
          </div>


          {/* Mobile Menu Toggle & Language Switcher */}
          <div className="flex items-center gap-4 md:hidden z-50">
            <LanguageSwitcher />
            <button 
              className="text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>


      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-30 bg-ben-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden">
           {navLinks.map((link) => (
              <NavLink 
                key={link.path} 
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-display font-bold text-white hover:text-ben-terracotta"
              >
                {link.name}
              </NavLink>
            ))}
            <button 
               onClick={() => {
                 setIsMenuOpen(false);
                 openSubscribeModal();
               }}
               className="text-2xl font-display font-bold text-ben-gold border-2 border-ben-gold px-8 py-2 rounded-full hover:bg-ben-gold hover:text-ben-black mt-4"
            >
              {t('nav.subscribe')}
            </button>
        </div>
      )}


      {/* Main Content */}
      <main className="pt-24 pb-32 px-4 md:px-8 max-w-7xl mx-auto w-full flex-grow">
        <Outlet />
      </main>


      {/* Footer */}
      <Footer />
    </div>
  );
};
