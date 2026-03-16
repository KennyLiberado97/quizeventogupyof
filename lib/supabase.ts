import { createClient } from '@supabase/supabase-js';

let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Ensure URL has https:// prefix to prevent "Failed to fetch" errors
if (supabaseUrl && !supabaseUrl.startsWith('http')) {
  supabaseUrl = `https://${supabaseUrl}`;
}

// Only create the real client if we have the env vars, otherwise create a dummy client
// This prevents the app from crashing in environments where the keys aren't set yet
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

