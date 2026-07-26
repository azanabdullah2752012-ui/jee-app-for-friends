import { createClient } from '@supabase/supabase-js';

// Read VITE environment variables or live fallback credentials
const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ||
  localStorage.getItem('jee_supabase_url') ||
  'https://kylodqqhbfpntckubxio.supabase.co';

const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  localStorage.getItem('jee_supabase_anon_key') ||
  'sb_publishable_H9HGjg2IOgzgkbPESXIkCA_FlJ_BFEM';

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

export function setSupabaseCredentials(url: string, anonKey: string) {
  if (url && anonKey) {
    localStorage.setItem('jee_supabase_url', url);
    localStorage.setItem('jee_supabase_anon_key', anonKey);
    window.location.reload();
  }
}

export function clearSupabaseCredentials() {
  localStorage.removeItem('jee_supabase_url');
  localStorage.removeItem('jee_supabase_anon_key');
  window.location.reload();
}
