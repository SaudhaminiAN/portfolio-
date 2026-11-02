/**
 * Centralized Supabase Client Singleton
 * 
 * Safely initializes Supabase client for client-side queries.
 * Validates environment variables, enforces public-key-only safety,
 * and provides safe fallback mechanics when credentials are unset.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from './types';

// Retrieve environment variables with Vite prefix (and fallback to process.env if in Node runner)
const rawUrl = (
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SUPABASE_URL) ||
  (typeof process !== 'undefined' && process.env ? process.env.VITE_SUPABASE_URL : undefined)
) as string | undefined;

const rawKey = (
  (typeof import.meta !== 'undefined' && import.meta.env && (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY)) ||
  (typeof process !== 'undefined' && process.env ? (process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_ANON_KEY) : undefined)
) as string | undefined;

/**
 * Validates if the provided Supabase configuration is valid and usable
 */
export function validateSupabaseConfig(): { isValid: boolean; url: string; key: string; reason?: string } {
  const url = (rawUrl || '').trim();
  const key = (rawKey || '').trim();

  if (!url) {
    return { isValid: false, url: '', key: '', reason: 'VITE_SUPABASE_URL is missing' };
  }

  if (url.includes('your-project-id') || !url.startsWith('https://')) {
    return { isValid: false, url, key: '', reason: 'VITE_SUPABASE_URL contains placeholder or invalid protocol' };
  }

  if (!key) {
    return { isValid: false, url, key: '', reason: 'VITE_SUPABASE_PUBLISHABLE_KEY is missing' };
  }

  if (key.includes('your-anon') || key.length < 20) {
    return { isValid: false, url, key, reason: 'VITE_SUPABASE_PUBLISHABLE_KEY is placeholder or too short' };
  }

  return { isValid: true, url, key };
}

const config = validateSupabaseConfig();

/**
 * Diagnostic flag to check if active Supabase connection is available
 */
export const isSupabaseConfigured = (): boolean => config.isValid;

// Provide safe fallback client if credentials are not yet configured in .env.local
const fallbackUrl = 'https://placeholder.supabase.co';
const fallbackKey = 'placeholder-key-for-development-fallback-only-0000000000000000';

export const supabase: SupabaseClient<Database> = createClient<Database>(
  config.isValid ? config.url : fallbackUrl,
  config.isValid ? config.key : fallbackKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

/**
 * Helper to retrieve client with active configuration status
 */
export function getSupabase() {
  return {
    client: supabase,
    isReady: isSupabaseConfigured(),
    url: config.isValid ? config.url : null,
  };
}
