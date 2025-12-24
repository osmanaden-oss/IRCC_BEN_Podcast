import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { Episode } from '../types';
import { useAudio } from '../context/AudioContext';
import { useTranslation } from '../hooks/useTranslation';
import { Play, Pause, Calendar, Search, Filter, Clock, Mic, AlertCircle, Download } from 'lucide-react';


// ✅ FIXED: Use 'Transcripts' (capital T) to match your bucket
const getTranscriptUrl = (filePath: string | null): string | null => {
  if (!filePath) return null;
  
  try {
    const { data } = supabase.storage
      .from('Transcripts')  // ✅ Capital T
      .getPublicUrl(filePath);
    
    return data?.publicUrl || null;
  } catch (error) {
    console.error('Error generating transcript URL:', error);
    return null;
  }
};


export const Episodes = () => {
  const { playEpisode, currentEpisode, isPlaying } = useAudio();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('All');
  const queryClient = useQueryClient();
  const { t, language } = useTranslation();


  // ============================================
  // 🔍 DEBUG: List all files and check matches
  // ============================================
  useEffect(() => {
    const debugFileNames = async () => {
      console.log('\n🔍 STARTING TRANSCRIPT DEBUG...\n');
      
      // Step 1: List all files in the Transcripts bucket
      const { data: files, error } = await supabase.storage
        .from('Transcripts')
        .list();
      
      if (error) {
        console.error('❌ Error listing files:', error);
        return;
      }
      
      console.log('=== 📂 FILES IN SUPABASE TRANSCRIPTS BUCKET ===');
      files?.forEach(file => {
        console.log(`  📄 ${file.name}`);
      });
      
      // Step 2: Fetch episodes and show what paths are stored in DB
      const { data: episodes } = await supabase
        .from('episodes')
        .select('episode_number, transcript_en_path, transcript_fr_path');
      
      console.log('\n=== 🗄️  DATABASE ENTRIES ===');
      episodes?.forEach(ep => {
        console.log(`Episode ${ep.episode_number}:`);
        console.log(`  EN: ${ep.transcript_en_path}`);
        console.log(`  FR: ${ep.transcript_fr_path}`);
      });
      
      // Step 3: Compare them
      console.log('\n=== ⚖️  COMPARISON (DB vs ACTUAL) ===');
      episodes?.forEach(ep => {
        const enInBucket = files?.some(f => f.name === ep.transcript_en_path);
        const frInBucket = files?.some(f => f.name === ep.transcript_fr_path);
        
        console.log(`\nEpisode ${ep.episode_number}:`);
        console.log(`  EN: "${ep.transcript_en_path}"`);
        console.log(`      ${enInBucket ? '✅ FOUND IN BUCKET' : '❌ NOT FOUND - MISMATCH!'}`);
        console.log(`  FR: "${ep.transcript_fr_path}"`);
        console.log(`      ${frInBucket ? '✅ FOUND IN BUCKET' : '❌ NOT FOUND - MISMATCH!'}`);
        
        // If not found, suggest possible matches
        if (!enInBucket && ep.transcript_en_path) {
          const possibleMatches = files?.filter(f => 
            f.name.includes('Episode') && 
            f.name.includes(ep.episode_number.toString()) && 
            f.name.includes('EN')
          );
          if (possibleMatches?.length) {
            console.log(`      💡 Possible actual file: ${possibleMatches[0].name}`);
          }
        }
        
        if (!frInBucket && ep.transcript_fr_path) {
          const possibleMatches = files?.filter(f => 
            f.name.includes('Episode') && 
            f.name.includes(ep.episode_number.toString()) && 
            f.name.includes('FR')
          );
          if (possibleMatches?.length) {
            console.log(`      💡 Possible actual file: ${possibleMatches[0].name}`);
          }
        }
      });
      
      console.log('\n✅ Debug complete - Check results above!\n');
    };
    
    debugFileNames();
  }, []);


  useEffect(() => {
    const channel = supabase
      .channel('public:episodes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'episodes' }, () => {
        queryClient.invalidateQueries({ queryKey: ['episodes'] });
      })
      .subscribe();


    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);


  const { data: episodes, isLoading, error } = useQuery({
    queryKey: ['episodes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('episodes')
        .select('*')
        .order('published_date', { ascending: false });
      if (error) throw error;
      return data as Episode[];
    }
  });


  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-400 gap-4 pt-24">
        <AlertCircle size={48} />
        <div className="text-center">
          <h3 className="text-xl font-bold text-white">{t('episodes.error_load')}</h3>
          <p className="text-ben-sand">{t('episodes.error_msg')}</p>
        </div>
      </div>
    );
  }


  const filteredEpisodes = episodes?.filter(ep => {
    const guests = ep.guests || [];
    const tags = ep.tags || [];
    
    const translatedDesc = t(`episodes.descriptions.desc_${ep.episode_number}`) !== `episodes.descriptions.desc_${ep.episode_number}` 
        ? t(`episodes.descriptions.desc_${ep.episode_number}`) 
        : (ep.description || '');


    const searchString = `${ep.title || ''} ${translatedDesc} ${guests.join(' ')}`.toLowerCase();
    const matchesSearch = searchString.includes(searchTerm.toLowerCase());
    
    const matchesTag = filterTag === 'All' || tags.some(tag => {
        const translatedTag = t(`episodes.tags.${tag}`);
        return translatedTag === filterTag || tag === filterTag;
    });
    
    return matchesSearch && matchesTag;
  });


  const rawTags = Array.from(new Set(episodes?.flatMap(ep => ep.tags || []) || []));
  const displayTags = rawTags.map(tag => ({
    original: tag,
    translated: t(`episodes.tags.${tag}`) !== `episodes.tags.${tag}` ? t(`episodes.tags.${tag}`) : tag
  }));


  return (
    <div className="min-h-screen container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">{t('episodes.page_title')}</h1>
        <p className="text-ben-sand">{t('episodes.page_subtitle')}</p>
      </div>


      {/* Search and Filter Bar */}
      <div className="glass-panel p-6 rounded-2xl mb-12 sticky top-24 z-20 backdrop-blur-xl !bg-ben-darkbrown/10">
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ben-sand/50" size={20} />
            <input 
              type="text" 
              placeholder={t('episodes.search_placeholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-ben-black/50 border border-ben-brown/30 rounded-full pl-12 pr-6 py-3 text-white focus:outline-none focus:border-ben-gold transition-colors"
            />
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            <Filter size={20} className="text-ben-gold flex-shrink-0" />
            <button 
              onClick={() => setFilterTag('All')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${filterTag === 'All' ? 'bg-ben-gold text-ben-darkbrown' : 'bg-ben-brown/20 text-ben-sand hover:bg-ben-brown/40'}`}
            >
              {t('episodes.filter_all')}
            </button>
            {displayTags.map(({ original, translated }) => (
              <button 
                key={original}
                onClick={() => setFilterTag(translated)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${filterTag === translated ? 'bg-ben-gold text-ben-darkbrown' : 'bg-ben-brown/20 text-ben-sand hover:bg-ben-brown/40'}`}
              >
                {translated}
              </button>
            ))}
          </div>
        </div>
      </div>


      {/* List */}
      <div className="space-y-6">
        {isLoading ? (
          <p className="text-center text-ben-sand py-20">{t('episodes.loading')}</p>
        ) : filteredEpisodes?.length === 0 ? (
          <div className="text-center py-20 text-ben-sand">{t('episodes.no_results')}</div>
        ) : (
          filteredEpisodes?.map((ep) => {
            // ✅ FIXED: Generate transcript URLs with correct bucket name
            const transcriptEnUrl = getTranscriptUrl(ep.transcript_en_path);
            const transcriptFrUrl = getTranscriptUrl(ep.transcript_fr_path);


            return (
              <div key={ep.id} className="glass-panel rounded-2xl overflow-hidden flex flex-col lg:flex-row hover:bg-white/5 transition-colors lg:min-h-80">
                
                {/* Image Container - Fills full height */}
                <div className="w-full lg:w-1/3 group relative flex-shrink-0">
                  <div className="relative w-full h-64 lg:h-full overflow-hidden bg-black flex items-center justify-center">
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
                          <Pause size={28} fill="white" />
                        ) : (
                          <Play size={28} fill="white" className="ml-1" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>


                {/* Details */}
                <div className="flex-1 flex flex-col justify-center p-6 md:p-8 lg:border-l border-ben-brown/20">
                  <div className="flex flex-wrap items-center gap-4 text-xs text-ben-sand/80 font-mono mb-3">
                    {ep.season_number && ep.episode_number && (
                      <span className="bg-ben-brown/30 px-2 py-1 rounded text-ben-gold">S{ep.season_number} E{ep.episode_number}</span>
                    )}
                    <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(ep.published_date).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {Math.floor(ep.duration / 60)} min</span>
                  </div>
                  
                  <h3 className="text-2xl font-display font-bold text-white mb-3">{ep.title}</h3>
                  {/* ✅ Justified text alignment */}
                  <p className="text-ben-sand/80 mb-6 leading-relaxed whitespace-normal break-words text-justify">
                    {t(`episodes.descriptions.desc_${ep.episode_number}`) !== `episodes.descriptions.desc_${ep.episode_number}` 
                        ? t(`episodes.descriptions.desc_${ep.episode_number}`) 
                        : ep.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <div className="flex flex-wrap gap-2">
                      {(ep.tags || []).map(tag => (
                        <span key={tag} className="text-xs border border-ben-sand/30 px-2 py-1 rounded-md text-ben-sand">
                             {t(`episodes.tags.${tag}`) !== `episodes.tags.${tag}` ? t(`episodes.tags.${tag}`) : tag}
                        </span>
                      ))}
                    </div>
                    {ep.guests && ep.guests.length > 0 && (
                      <div className="flex items-center gap-2 text-sm text-ben-gold flex-shrink-0">
                        <Mic size={14} />
                        <span>{ep.guests.join(', ')}</span>
                      </div>
                    )}
                  </div>


                  {/* Transcript Download Section */}
                  {(transcriptEnUrl || transcriptFrUrl) && (
                    <div className="pt-4 border-t border-ben-brown/20">
                      <h4 className="text-sm font-semibold text-ben-sand mb-3 flex items-center gap-2">
                        <Download size={16} className="text-ben-gold" />
                        {t('episodes.download_title')}
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {transcriptEnUrl && (
                          <a
                            href={transcriptEnUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                            className="flex items-center gap-2 px-4 py-2 bg-ben-gold/10 hover:bg-ben-gold/20 border border-ben-gold/30 rounded-lg text-ben-gold text-sm font-medium transition-all"
                          >
                            <Download size={14} />
                            English PDF
                          </a>
                        )}
                        {transcriptFrUrl && (
                          <a
                            href={transcriptFrUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                            className="flex items-center gap-2 px-4 py-2 bg-ben-terracotta/10 hover:bg-ben-terracotta/20 border border-ben-terracotta/30 rounded-lg text-ben-terracotta text-sm font-medium transition-all"
                          >
                            <Download size={14} />
                            Français PDF
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
