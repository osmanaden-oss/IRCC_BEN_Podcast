import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import { Episode, AudioPlayerState } from '../types';

interface AudioContextType extends AudioPlayerState {
  playEpisode: (episode: Episode) => void;
  togglePlay: () => void;
  seek: (time: number) => void;
  setVolume: (vol: number) => void;
  setPlaybackRate: (rate: number) => void;
  closePlayer: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

export const AudioProvider = ({ children }: { children?: ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolumeState] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRateState] = useState(1.0);

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = 'auto';
    }

    const audio = audioRef.current;

    const handleTimeUpdate = () => setProgress(audio.currentTime);
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };
    const handleEnded = () => setIsPlaying(false);
    const handleWaiting = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    
    const handleError = (e: Event) => {
      const target = e.target as HTMLAudioElement;
      const code = target.error?.code;
      const message = target.error?.message || "Unknown error";
      
      // Ignore user aborts
      if (code === 1) return;

      let errorMsg = `Audio playback error (Code ${code}): ${message}`;
      if (code === 4) {
        errorMsg = "Audio source not found or format not supported (Code 4).";
      }
      
      // Only log error if we are currently trying to play this source
      if (currentEpisode) {
        console.warn(errorMsg);
        console.warn(`Failed URL: ${audio.src}`);
      }
      
      setIsLoading(false);
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
    };
  }, [currentEpisode]);

  const playEpisode = async (episode: Episode) => {
    // Check if player is in error state
    const hasError = audioRef.current?.error;

    // If clicking the same episode, toggle play/pause instead of restarting
    // UNLESS there is an error, in which case we want to try loading again
    if (currentEpisode?.id === episode.id && !hasError) {
      togglePlay();
      return;
    }

    if (audioRef.current) {
      try {
        setIsLoading(true);
        
        // 🔧 FIX: Use dropbox_audio_url directly (no getStorageUrl for external URLs)
        const audioUrl = episode.dropbox_audio_url;
        
        if (!audioUrl) {
          console.warn(`Audio URL is missing for episode: ${episode.title}`);
          setIsLoading(false);
          return;
        }

        // 🔧 FIX: Ensure Dropbox URL has dl=1 parameter for direct download
        let url = audioUrl;
        if (url.includes('dropbox.com') && !url.includes('dl=1')) {
          // Replace dl=0 with dl=1, or add dl=1 if not present
          if (url.includes('dl=0')) {
            url = url.replace('dl=0', 'dl=1');
          } else if (url.includes('?')) {
            url += '&dl=1';
          } else {
            url += '?dl=1';
          }
        }

        console.log(`Loading audio: ${episode.title}`);
        console.log(`URL: ${url}`);

        setCurrentEpisode(episode);
        
        // Reset player state
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        
        // Setup new source
        audioRef.current.src = url; 
        audioRef.current.playbackRate = playbackRate;
        // 🔧 FIX: Disable CORS for Dropbox (it may block anonymous requests)
        // audioRef.current.crossOrigin = "anonymous"; 
        
        // Explicitly load to reset media element state
        audioRef.current.load();

        // Play and handle potential promise rejections
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
        }
      } catch (e: any) {
        // Ignore AbortError (happens when skipping quickly)
        if (e.name === 'AbortError' || e.message?.includes('aborted')) return;
        
        // Handle "NotSupportedError" - usually invalid source or format
        if (e.name === 'NotSupportedError' || e.message?.includes('not supported')) {
          console.warn(`Playback not supported for: ${episode.title}. Check audio URL.`);
        } else {
          console.error("Play failed:", e.message || e);
        }

        setIsLoading(false);
        setIsPlaying(false);
      }
    }
  };

  const togglePlay = async () => {
    if (audioRef.current && currentEpisode) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Check if player is in error state before trying to resume
        if (audioRef.current.error) {
          console.warn("Cannot resume: Audio player is in error state. Attempting to reload episode.");
          playEpisode(currentEpisode);
          return;
        }

        try {
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            await playPromise;
            setIsPlaying(true);
          }
        } catch (e: any) {
          if (e.name === 'AbortError' || e.message?.includes('aborted')) return;
          
          if (e.name === 'NotSupportedError' || e.message?.includes('not supported')) {
            console.warn("Resume failed: Operation not supported or invalid source.");
          } else {
            console.error("Resume failed:", e.message || e);
          }
          setIsPlaying(false);
        }
      }
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      // Check for finite, valid numbers
      if (!Number.isFinite(time)) return;
      
      const newTime = Math.max(0, Math.min(time, duration || 0));
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  const setVolume = (vol: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, vol));
      setVolumeState(vol);
    }
  };

  const setPlaybackRate = (rate: number) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
      setPlaybackRateState(rate);
    }
  };

  const closePlayer = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.removeAttribute('src'); 
      audioRef.current.load();
    }
    setIsPlaying(false);
    setCurrentEpisode(null);
  };

  return (
    <AudioContext.Provider
      value={{
        currentEpisode,
        isPlaying,
        isLoading,
        volume,
        progress,
        duration,
        playbackRate,
        playEpisode,
        togglePlay,
        seek,
        setVolume,
        setPlaybackRate,
        closePlayer
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
