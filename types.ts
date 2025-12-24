
// Episode interface matching Supabase database schema
export interface Episode {
  id: string;
  title: string;
  description: string;
  published_date: string;
  duration: number; // in seconds
  cover_image_url: string | null;
  audio_url?: string; // Optional field, though dropbox_audio_url is primary
  dropbox_audio_url: string; // PRIMARY audio field (matches database)
  hosts: string[]; // JSONB array from database
  guests: string[]; // JSONB array from database
  tags: string[]; // TEXT[] array from database
  season_number: number | null;
  episode_number: number | null;
  transcript_en: string | null; // English transcript (full text)
  transcript_fr: string | null; // French transcript (full text)
  transcript: string | null; // Legacy transcript field (keep for compatibility)
  transcript_en_path: string | null; // Path to English PDF in Supabase Storage
  transcript_fr_path: string | null; // Path to French PDF in Supabase Storage
  show_notes: string | null;
  created_at: string;
  updated_at: string;
}


export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  photo_url: string | null;
  social_links: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  } | null;
  order_index: number;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  featured_image_url: string | null;
  author_id: string;
  published_date: string;
  categories: string[] | null;
  tags: string[] | null;
}

export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterSubscriber {
  name: string;
  email: string;
  consent: boolean;
  role?: string;
  country?: string;
}

// Audio Player Types
export interface AudioPlayerState {
  currentEpisode: Episode | null;
  isPlaying: boolean;
  isLoading: boolean;
  volume: number;
  progress: number; // Current time in seconds
  duration: number; // Total duration in seconds
  playbackRate: number;
}
