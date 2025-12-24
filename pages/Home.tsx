import React, { useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { Episode } from '../types';
import { useAudio } from '../context/AudioContext';
import { useSubscribe } from '../context/SubscribeContext';
import { useTranslation } from '../hooks/useTranslation';
import { Play, Pause, ArrowRight, Loader2, Calendar, Clock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

// Specialized Episode Card Component for better performance and encapsulation
const EpisodeCard = ({ ep, playEpisode, currentEpisode, isPlaying, index }: { 
    ep: Episode, 
    playEpisode: (ep: Episode) => void, 
    currentEpisode: Episode | null, 
    isPlaying: boolean,
    index: number
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        };

        card.addEventListener('mousemove', handleMouseMove);
        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div 
            ref={cardRef}
            className="group relative rounded-2xl overflow-hidden glass-panel border border-ben-brown/20 h-full flex flex-col animate-fade-up"
            style={{ animationDelay: `${index * 150}ms` }}
        >
             {/* Spotlight Gradient Overlay */}
            <div 
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-30"
                style={{
                    background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(212, 175, 55, 0.15), transparent 40%)`
                }}
            />

            {/* Image Container */}
            <div className="relative aspect-video overflow-hidden bg-black border-b border-ben-brown/20 flex items-center justify-center">
                <img 
                    src={ep.cover_image_url || `https://picsum.photos/seed/${ep.id}/500`} 
                    alt={ep.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <button 
                        onClick={() => playEpisode(ep)}
                        className="w-16 h-16 rounded-full bg-ben-terracotta text-white flex items-center justify-center shadow-lg transform hover:scale-110 transition-all"
                    >
                        {currentEpisode?.id === ep.id && isPlaying ? (
                            <Pause size={24} fill="white" />
                        ) : (
                            <Play size={24} fill="white" className="ml-1" />
                        )}
                    </button>
                </div>
            </div>
            
            <div className="p-6 flex flex-col flex-grow relative z-10">
                <div className="flex items-center gap-4 text-xs text-ben-sand/80 mb-3 font-mono">
                    <span className="flex items-center gap-1">
                        <Calendar size={12} /> {new Date(ep.published_date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock size={12} /> {Math.floor(ep.duration / 60)} min
                    </span>
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-2 line-clamp-2">{ep.title}</h3>
                <p className="text-ben-sand/70 text-sm line-clamp-3 mb-4 flex-grow">
                  {/* Translate description if available in locale, else use DB description */}
                  {t(`episodes.descriptions.desc_${ep.episode_number}`) !== `episodes.descriptions.desc_${ep.episode_number}` 
                     ? t(`episodes.descriptions.desc_${ep.episode_number}`) 
                     : ep.description}
                </p>
            </div>
        </div>
    );
};

export const Home = () => {
  const { playEpisode, currentEpisode, isPlaying } = useAudio();
  const { openSubscribeModal } = useSubscribe();
  const { t } = useTranslation();
  
  // Ref for the background pan effect
  const bgRef = useRef<HTMLDivElement>(null);
  
  // Ref for the text container tilt effect
  const heroTextRef = useRef<HTMLDivElement>(null);

  // Mouse move handler for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // Parallax for Background (very subtle)
        if (bgRef.current) {
            const moveX = (clientX - centerX) * 0.01;
            const moveY = (clientY - centerY) * 0.01;
            bgRef.current.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
        }

        // 3D Tilt for Hero Text
        if (heroTextRef.current) {
            const rotateX = ((clientY - centerY) / centerY) * -2; // Max 2deg rotation
            const rotateY = ((clientX - centerX) / centerX) * 2;
            heroTextRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);


  const { data: latestEpisodes, isLoading, error } = useQuery({
    queryKey: ['latestEpisodes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('episodes')
        .select('*')
        .order('published_date', { ascending: false })
        .limit(3);
      if (error) throw error;
      
      const episodes = data as Episode[];
      // Inject transcript for Episode 4 manually since it might not be in DB yet
      return episodes.map(ep => {
        if (ep.episode_number === 4) {
          return {
            ...ep,
         };
        }
        return ep;
      });
    }
  });

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-10 lg:py-14 min-h-[65vh] overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none z-0">
          <div 
            ref={bgRef}
            className="absolute inset-0 bg-[url('https://user-gen-media-assets.s3.amazonaws.com/seedream_images/e26a5dc0-5248-4c13-8d62-29049fbaddd0.png')] bg-contain bg-no-repeat bg-center opacity-80 transition-transform duration-100 ease-out"
            style={{ transform: 'scale(0.85)' }} 
          />
           {/* Visual Flow Gradient Overlay - Smoother blend */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90" />
           {/* Spotlight Effect */}
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-80" />
        </div>
        
        {/* HERO CONTENT WRAPPER */}
        <div ref={heroTextRef} className="relative z-10 w-full max-w-4xl px-4 transition-transform duration-100 ease-out will-change-transform">
            
            {/* ANIMATED TITLE */}
            <div className="box relative mx-auto mb-4" style={{ width: 320, paddingTop: 10 }}>
            <div className="title" style={{ display: 'flex', alignItems: 'center', height: '60px', position: 'relative' }}>
                <span className="block main-block" />
                <h2 style={{
                fontFamily: 'Poppins, sans-serif', 
                color: '#fff', 
                fontSize: 32,
                display: 'flex', 
                alignItems: 'baseline', 
                position: 'relative', 
                opacity: 0, 
                animation: 'mainFadeIn 2s forwards', 
                animationDelay: '1.6s'
                }}>
                {t('hero.title_prefix')}
                <span className="circle" />
                </h2>
            </div>
            <div className="role" style={{ display: 'flex', alignItems: 'center', height: '30px', marginTop: '-10px', position: 'relative' }}>
                <span className="block sec-block" />
                <p style={{
                color: '#FFD700',
                fontSize: 24, 
                textTransform: 'capitalize',
                letterSpacing: '5px', 
                fontFamily: 'Lato, sans-serif',
                opacity: 0, 
                fontWeight: 600,
                animation: 'secFadeIn 2s forwards', 
                animationDelay: '3.2s',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
                }}>
                {t('hero.title_highlight')}
                </p>
            </div>
            </div>
            
            {/* DESCRIPTION */}
            <div className="w-full max-w-3xl mx-auto mb-8 group relative">
                {/* Removed Bubble Effect, kept text */}
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-ben-gold to-transparent mx-auto mb-6 opacity-60 group-hover:w-32 transition-all duration-500"></div>
                
                <p className="text-base md:text-xl text-gray-200 font-light font-syne-mono leading-loose tracking-wide text-center mb-4 drop-shadow-md">
                    {t('hero.tagline')}
                </p>
                
                <p className="text-sm md:text-base text-gray-300 font-light font-syne-mono leading-relaxed tracking-wider text-center opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    {t('hero.description')}
                </p>
            </div>
            
            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-6 relative z-10 w-full max-w-3xl mx-auto justify-center px-4 mt-8">
            <Link to="/episodes" className="flex-1 sm:flex-none">
                <button className="btn-premium btn-premium-secondary w-full sm:w-auto">
                <Play size={18} className="mr-2 text-ben-gold fill-ben-gold" />
                <span>{t('hero.cta_listen')}</span>
                </button>
            </Link>
            <Link to="/team" className="flex-1 sm:flex-none">
                <button className="btn-premium w-full sm:w-auto">
                <span>{t('hero.cta_team')}</span>
                </button>
            </Link>
            </div>
        </div>
      </section>

      {/* Latest Episodes */}
      <section>
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-display font-bold text-white mb-2">{t('episodes.title')}</h2>
            <div className="h-1 w-20 bg-ben-terracotta rounded-full"></div>
          </div>
          <Link to="/episodes" className="text-ben-gold hover:text-white flex items-center gap-2 text-sm font-semibold transition-colors">
            {t('episodes.view_all')} <ArrowRight size={16} />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-ben-gold" size={40} />
          </div>
        ) : error ? (
           <div className="text-center py-10 text-red-400">
             {t('episodes.error_load')}
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Safety Check: Ensure episodes exist before mapping */}
            {latestEpisodes?.map((ep, index) => (
                <EpisodeCard 
                    key={ep.id} 
                    ep={ep} 
                    playEpisode={playEpisode} 
                    currentEpisode={currentEpisode} 
                    isPlaying={isPlaying} 
                    index={index}
                />
            ))}
          </div>
        )}
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="glass-panel rounded-3xl p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-ben-gold/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-display font-bold text-white mb-4">{t('newsletter_section.title')}</h2>
            <p className="text-ben-sand mb-6">
              {t('newsletter_section.description')}
            </p>
            <ul className="space-y-2 mb-2 text-ben-sand/80 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-ben-gold" /> {t('newsletter_section.list_1')}
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-ben-gold" /> {t('newsletter_section.list_2')}
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-ben-gold" /> {t('newsletter_section.list_3')}
              </li>
            </ul>
          </div>
          <div className="flex-shrink-0">
            <button 
              onClick={openSubscribeModal} 
              className="btn-premium btn-premium-secondary shadow-xl shadow-ben-gold/10 !min-w-[auto] !px-8"
            >
              <Mail size={20} className="text-ben-gold mr-2" />
              <span>{t('newsletter_section.btn')}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
