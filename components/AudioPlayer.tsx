import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useAudio } from '../context/AudioContext';
import { Play, Pause, SkipBack, SkipForward, Volume2, X, FileText, ChevronDown, MousePointer2, Sparkles } from 'lucide-react';

export const AudioPlayer = () => {
  const { 
    currentEpisode, 
    isPlaying, 
    togglePlay, 
    progress, 
    duration, 
    seek,
    setVolume,
    volume,
    playbackRate,
    setPlaybackRate,
    closePlayer
  } = useAudio();

  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);
  const [transcriptLang, setTranscriptLang] = useState<'en' | 'fr'>('en');
  const [autoScroll, setAutoScroll] = useState(true);
  
  const transcriptRef = useRef<HTMLDivElement>(null);
  const isSystemScrolling = useRef(false);

  // Close transcript when episode changes or player closes
  useEffect(() => {
    setIsTranscriptOpen(false);
    setAutoScroll(true);
  }, [currentEpisode?.id]);

  // Auto-scroll logic
  useEffect(() => {
    if (autoScroll && transcriptRef.current && duration > 0 && isTranscriptOpen) {
      const { scrollHeight, clientHeight } = transcriptRef.current;
      const scrollableDistance = scrollHeight - clientHeight;
      const targetScroll = (progress / duration) * scrollableDistance;
      
      // Only scroll if we have space to scroll and the target is different enough
      if (scrollableDistance > 0 && Math.abs(transcriptRef.current.scrollTop - targetScroll) > 5) {
        isSystemScrolling.current = true;
        transcriptRef.current.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });
      }
    }
  }, [progress, duration, autoScroll, isTranscriptOpen]);

  const handleScroll = () => {
    // If the scroll event was triggered by our auto-scroll logic, ignore it
    if (isSystemScrolling.current) {
      isSystemScrolling.current = false;
      return;
    }
    // Otherwise, it's a user interaction, so disable auto-scroll
    if (autoScroll) {
        setAutoScroll(false);
    }
  };

  const activeTranscript = useMemo(() => {
    if (!currentEpisode) return null;
    return transcriptLang === 'en' ? currentEpisode.transcript_en : currentEpisode.transcript_fr;
  }, [currentEpisode, transcriptLang]);

  // Parse and format transcript text
  const formattedContent = useMemo(() => {
    if (!activeTranscript) return null;
    
    return activeTranscript.split('\n').map((line, idx) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return <br key={idx} />;

      // Check for speaker pattern (e.g., "Host:", "Dionne:")
      // We look for a colon in the first 30 characters to avoid false positives in long sentences
      const colonIndex = trimmedLine.indexOf(':');
      
      if (colonIndex > 0 && colonIndex < 30) {
        const speaker = trimmedLine.substring(0, colonIndex);
        const content = trimmedLine.substring(colonIndex + 1);
        
        return (
          <p key={idx} className="mb-6 text-lg md:text-xl leading-relaxed text-ben-sand/90 font-light">
            <span className="text-ben-gold font-bold font-display tracking-wide uppercase text-sm mr-3 block md:inline md:mb-0 mb-1">
              {speaker}
            </span>
            {content}
          </p>
        );
      }
      
      return (
        <p key={idx} className="mb-6 text-lg md:text-xl leading-relaxed text-ben-sand/90 font-light">
          {trimmedLine}
        </p>
      );
    });
  }, [activeTranscript]);

  if (!currentEpisode) return null;

  const formatTime = (time: number) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Calculate percentage for gradient background
  const percent = duration ? (progress / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 flex flex-col items-center pointer-events-none">
      
      {/* Immersive Transcription Modal */}
      <div 
        className={`
          pointer-events-auto
          w-full max-w-5xl mx-auto
          backdrop-blur-2xl bg-ben-black/95
          rounded-2xl border border-ben-gold/20 shadow-2xl shadow-black/80
          transition-all duration-500 ease-in-out overflow-hidden
          flex flex-col
          absolute bottom-[calc(100%+16px)] left-4 right-4 md:left-auto md:right-auto
          ${isTranscriptOpen ? 'h-[75vh] opacity-100 translate-y-0 scale-100' : 'h-0 opacity-0 translate-y-12 scale-95 pointer-events-none'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-ben-brown/20 bg-gradient-to-r from-ben-black/50 via-ben-brown/10 to-ben-black/50">
          
          <div className="flex items-center gap-4">
            <h3 className="font-display font-bold text-white text-xl flex items-center gap-2">
              <FileText size={20} className="text-ben-gold" />
              Transcript
            </h3>
            
            {/* Auto-Scroll Toggle */}
            <button
                onClick={() => setAutoScroll(!autoScroll)}
                className={`
                    flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border
                    ${autoScroll 
                        ? 'bg-ben-gold/10 text-ben-gold border-ben-gold/30' 
                        : 'bg-transparent text-ben-sand/50 border-ben-sand/20 hover:border-ben-sand/40'}
                `}
            >
                {autoScroll ? <Sparkles size={12} /> : <MousePointer2 size={12} />}
                {autoScroll ? 'Auto-Scroll On' : 'Manual Scroll'}
            </button>
          </div>
          
          {/* Language Toggle */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex bg-ben-black/40 rounded-full p-1 border border-ben-gold/20 shadow-inner">
            <button 
              onClick={() => setTranscriptLang('en')}
              className={`px-6 py-1.5 rounded-full text-xs font-bold transition-all uppercase tracking-wider ${transcriptLang === 'en' ? 'bg-ben-gold text-ben-darkbrown shadow-lg transform scale-105' : 'text-ben-sand hover:text-white'}`}
            >
              English
            </button>
            <button 
              onClick={() => setTranscriptLang('fr')}
              className={`px-6 py-1.5 rounded-full text-xs font-bold transition-all uppercase tracking-wider ${transcriptLang === 'fr' ? 'bg-ben-gold text-ben-darkbrown shadow-lg transform scale-105' : 'text-ben-sand hover:text-white'}`}
            >
              Français
            </button>
          </div>
          
          {/* Mobile Language Toggle (Compact) */}
          <button 
             onClick={() => setTranscriptLang(l => l === 'en' ? 'fr' : 'en')}
             className="md:hidden px-3 py-1 rounded-full border border-ben-gold/30 text-ben-gold text-xs font-bold uppercase mr-2"
          >
            {transcriptLang === 'en' ? 'EN' : 'FR'}
          </button>

          <button 
            onClick={() => setIsTranscriptOpen(false)}
            className="text-ben-sand hover:text-white hover:bg-ben-brown/20 p-2 rounded-full transition-all"
            aria-label="Close Transcript"
          >
            <ChevronDown size={24} />
          </button>
        </div>
        
        {/* Scrollable Content */}
        <div 
            ref={transcriptRef}
            onScroll={handleScroll}
            className="p-6 md:p-10 overflow-y-auto custom-scrollbar flex-1 scroll-smooth bg-gradient-to-b from-transparent via-transparent to-ben-black/30"
        >
          {activeTranscript ? (
             <div className="max-w-3xl mx-auto">
               {formattedContent}
               <div className="h-24 flex items-center justify-center text-ben-sand/30 text-sm italic mt-12 border-t border-ben-gold/10 pt-8">
                 End of transcript
               </div>
             </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-ben-sand/50">
              <FileText size={48} className="mb-4 opacity-20" />
              <p>No transcription available for this language.</p>
            </div>
          )}
        </div>

        {/* Floating "Resume Auto-Scroll" Button */}
        {!autoScroll && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-in fade-in slide-in-from-bottom-4">
                <button
                    onClick={() => {
                        setAutoScroll(true);
                        // Immediate scroll to catch up
                         if (transcriptRef.current && duration > 0) {
                             const { scrollHeight, clientHeight } = transcriptRef.current;
                             const scrollableDistance = scrollHeight - clientHeight;
                             const targetScroll = (progress / duration) * scrollableDistance;
                             transcriptRef.current.scrollTo({ top: targetScroll, behavior: 'smooth' });
                         }
                    }}
                    className="flex items-center gap-2 bg-ben-gold text-ben-darkbrown px-6 py-3 rounded-full font-bold shadow-lg shadow-black/50 hover:scale-105 transition-transform"
                >
                    <Sparkles size={16} /> Resume Auto-Scroll
                </button>
            </div>
        )}
      </div>

      {/* Main Player Bar */}
      <div className="pointer-events-auto w-full max-w-7xl mx-auto glass-panel rounded-2xl p-4 md:p-6 border-t border-ben-gold/30 backdrop-blur-xl relative shadow-2xl mt-2 animate-[float_6s_ease-in-out_infinite]">
        
        {/* Close Button */}
        <button 
          onClick={closePlayer}
          className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-ben-terracotta text-white rounded-full p-1.5 shadow-lg hover:bg-ben-brown transition-colors z-10 hover:scale-110"
          aria-label="Close Player"
        >
          <X size={16} />
        </button>

        <div className="flex flex-col md:flex-row items-center gap-4">
          
          {/* Episode Info */}
          <div className="flex items-center gap-4 w-full md:w-1/4">
            <div className="h-16 w-16 rounded-lg overflow-hidden border border-ben-gold/20 flex-shrink-0 bg-ben-black">
              <img 
                src={currentEpisode.cover_image_url || `https://picsum.photos/seed/${currentEpisode.id}/200`} 
                alt="Cover" 
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <h4 className="text-white font-display font-bold truncate">{currentEpisode.title}</h4>
              <p className="text-ben-sand text-xs truncate">Season {currentEpisode.season_number} • Ep {currentEpisode.episode_number}</p>
            </div>
          </div>

          {/* Controls & Progress */}
          <div className="flex flex-col gap-2 w-full md:w-2/4">
            <div className="flex items-center justify-center gap-6">
              <button 
                onClick={() => seek(progress - 15)}
                className="text-ben-sand hover:text-white transition-colors"
              >
                <SkipBack size={20} />
              </button>
              
              <button 
                onClick={togglePlay}
                className="w-12 h-12 rounded-full bg-gradient-warm flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform"
              >
                {isPlaying ? <Pause size={24} fill="white" /> : <Play size={24} fill="white" className="ml-1" />}
              </button>

              <button 
                onClick={() => seek(progress + 15)}
                className="text-ben-sand hover:text-white transition-colors"
              >
                <SkipForward size={20} />
              </button>
            </div>

            <div className="flex items-center gap-3 text-xs text-ben-sand font-mono w-full px-2">
              <span className="w-10 text-right">{formatTime(progress)}</span>
              
              <div className="relative flex-1 h-6 flex items-center">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={progress}
                  onChange={(e) => seek(Number(e.target.value))}
                  style={{
                    background: `linear-gradient(to right, #FFD700 0%, #FFD700 ${percent}%, #7c5035 ${percent}%, #7c5035 100%)`
                  }}
                  className="
                    w-full h-1.5 rounded-lg appearance-none cursor-pointer focus:outline-none 
                    
                    /* Thumb Styles - Diamond (Pyramid) Shape */
                    [&::-webkit-slider-thumb]:appearance-none 
                    [&::-webkit-slider-thumb]:w-4 
                    [&::-webkit-slider-thumb]:h-4 
                    [&::-webkit-slider-thumb]:bg-[#FFD700]
                    [&::-webkit-slider-thumb]:rotate-45 
                    [&::-webkit-slider-thumb]:rounded-[1px]
                    [&::-webkit-slider-thumb]:shadow-[0_2px_4px_rgba(0,0,0,0.5)]
                    [&::-webkit-slider-thumb]:border
                    [&::-webkit-slider-thumb]:border-white/20
                    [&::-webkit-slider-thumb]:hover:scale-125
                    [&::-webkit-slider-thumb]:transition-transform

                    /* Firefox Thumb */
                    [&::-moz-range-thumb]:w-4 
                    [&::-moz-range-thumb]:h-4 
                    [&::-moz-range-thumb]:bg-[#FFD700]
                    [&::-moz-range-thumb]:rotate-45
                    [&::-moz-range-thumb]:rounded-[1px]
                    [&::-moz-range-thumb]:border-none
                    [&::-moz-range-thumb]:shadow-[0_2px_4px_rgba(0,0,0,0.5)]
                  "
                />
              </div>

              <span className="w-10">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Extra Controls */}
          <div className="flex items-center justify-end gap-3 w-full md:w-1/4 hidden md:flex">
             
             {/* Transcript Toggle Button */}
             <button
                onClick={() => setIsTranscriptOpen(!isTranscriptOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all border ${isTranscriptOpen ? 'bg-ben-gold text-ben-darkbrown border-ben-gold shadow-glow' : 'text-ben-sand border-ben-gold/30 hover:text-white hover:border-ben-gold hover:bg-ben-brown/20'}`}
                title="View Transcript"
             >
                <FileText size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">Transcript</span>
             </button>

             <div className="relative group">
                <button className="text-xs font-mono text-ben-gold border border-ben-gold/30 rounded px-2 py-1">
                  {playbackRate}x
                </button>
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col bg-ben-darkbrown border border-ben-gold/20 rounded p-1">
                  {[1, 1.5, 2].map(rate => (
                    <button 
                      key={rate}
                      onClick={() => setPlaybackRate(rate)}
                      className="px-2 py-1 text-xs hover:bg-ben-brown/50 rounded text-ben-sand"
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
             </div>

             <div className="flex items-center gap-2">
               <Volume2 size={16} className="text-ben-sand" />
               <input 
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-16 h-1 bg-ben-sand/30 rounded-lg appearance-none cursor-pointer accent-ben-gold"
               />
             </div>
          </div>

          {/* Mobile Transcript Toggle (Visible only on mobile) */}
          <button
              onClick={() => setIsTranscriptOpen(!isTranscriptOpen)}
              className={`md:hidden absolute top-4 right-12 p-2 rounded-lg transition-colors ${isTranscriptOpen ? 'text-ben-gold bg-ben-brown/20' : 'text-ben-sand'}`}
           >
              <FileText size={20} />
           </button>

        </div>
      </div>
    </div>
  );
};