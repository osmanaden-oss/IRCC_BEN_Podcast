import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Mic, Rss, Mail } from 'lucide-react';
import { useSubscribe } from '../context/SubscribeContext';
import { useTranslation } from '../hooks/useTranslation';

export const Footer: React.FC = () => {
  const { openSubscribeModal } = useSubscribe();
  const { t } = useTranslation();
  
  const socialLinks = [
    { icon: <Twitter size={20} />, href: '#', name: 'Twitter' },
    { icon: <Mic size={20} />, href: '#', name: 'Apple Podcasts' },
    { icon: <Rss size={20} />, href: '#', name: 'Spotify' },
  ];

  return (
    <footer className="border-t border-ben-brown/20 bg-ben-black/90 text-ben-sand mt-20 mb-24 md:mb-0 relative z-10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center gap-2 text-white font-bold text-xl font-display">
               <img 
                 src="https://i.imgur.com/QjTqaPY.png" 
                 alt="BEN Podcast Logo"
                 className="h-10 w-10"
               />
               <span>{t('footer.brand')}</span>
            </div>
            <p className="text-ben-sand/70 text-base leading-relaxed">
              {t('footer.tagline')}
            </p>
            <div className="flex space-x-6">
              {socialLinks.map((social) => (
                <a key={social.name} href={social.href} className="text-ben-sand/60 hover:text-ben-gold transition-colors">
                  <span className="sr-only">{social.name}</span>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase font-display">{t('footer.navigate')}</h3>
                <ul className="mt-4 space-y-4">
                  <li><Link to="/episodes" className="text-base text-ben-sand/70 hover:text-white transition-colors">{t('nav.episodes')}</Link></li>
                  <li><Link to="/team" className="text-base text-ben-sand/70 hover:text-white transition-colors">{t('nav.team')}</Link></li>
                  <li><Link to="/blog" className="text-base text-ben-sand/70 hover:text-white transition-colors">{t('nav.blog')}</Link></li>
                  <li><Link to="/contact" className="text-base text-ben-sand/70 hover:text-white transition-colors">{t('nav.contact')}</Link></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase font-display">{t('footer.legal')}</h3>
                <ul className="mt-4 space-y-4">
                  <li><Link to="/terms" className="text-base text-ben-sand/70 hover:text-white transition-colors">{t('footer.terms')}</Link></li>
                  <li><Link to="/privacy" className="text-base text-ben-sand/70 hover:text-white transition-colors">{t('footer.privacy')}</Link></li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
               <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase font-display">{t('footer.subscribe_title')}</h3>
                 <p className="text-base text-ben-sand/70 mt-4 mb-6">
                   {t('footer.subscribe_text')}
                 </p>
                 <button 
                   onClick={openSubscribeModal}
                   className="w-auto bg-ben-gold border border-transparent rounded-lg py-3 px-6 flex items-center justify-center gap-2 text-base font-bold text-ben-darkbrown hover:bg-white hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-ben-darkbrown focus:ring-ben-gold font-display"
                 >
                   <Mail size={18} /> {t('footer.subscribe_btn')}
                 </button>
               </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-ben-brown/20 pt-8">
          <p className="text-base text-ben-sand/50 xl:text-center">&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};
