import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xvnvvpgvydsldjclduoj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2bnZ2cGd2eWRzbGRqY2xkdW9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3OTg2ODQsImV4cCI6MjA3OTM3NDY4NH0.Y9MeCpcLr4UJe8PoPYhq067221mUCe8A_p0l9wwXtH8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getStorageUrl = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${supabaseUrl}/storage/v1/object/public/podcast-episodes/${path}`;
};
