/**
 * Diagnostics & Connectivity Test Utility for Supabase
 */

import { supabase, isSupabaseConfigured, validateSupabaseConfig } from './client';

export interface ConnectionTestResult {
  success: boolean;
  status: 'connected' | 'not_configured' | 'error';
  message: string;
  url?: string;
  latencyMs?: number;
  details?: unknown;
}

/**
 * Pings Supabase to verify credentials and connectivity
 */
export async function testSupabaseConnection(): Promise<ConnectionTestResult> {
  const config = validateSupabaseConfig();

  if (!config.isValid) {
    return {
      success: false,
      status: 'not_configured',
      message: `Supabase is not configured: ${config.reason || 'Missing environment variables in .env.local'}`,
      url: config.url || undefined,
    };
  }

  const startTime = performance.now();

  try {
    // Attempt a lightweight read on site_settings or auth session
    const { error } = await supabase.from('site_settings').select('key').limit(1);

    const latencyMs = Math.round(performance.now() - startTime);

    if (error) {
      // Check if this error is specifically because the table does not exist yet.
      // Common PostgREST codes for missing tables/views:
      // - 42P01: undefined_table in Postgres
      // - PGRST204 / PGRST205: table/relation not found in schema cache
      const isTableMissing =
        error.code === '42P01' ||
        error.code === 'PGRST204' ||
        error.code === 'PGRST205' ||
        error.message?.toLowerCase().includes('relation') ||
        error.message?.toLowerCase().includes('does not exist') ||
        error.message?.toLowerCase().includes('schema cache') ||
        error.message?.toLowerCase().includes('could not find');

      if (isTableMissing) {
        return {
          success: true,
          status: 'connected',
          message: 'Successfully reached Supabase project! (Authentication accepted; tables not created yet).',
          url: config.url,
          latencyMs,
          details: {
            reachable: true,
            authValid: true,
            tableStatus: 'tables_pending',
            errorCode: error.code,
            rawMessage: error.message,
          },
        };
      }

      // Check for authentication / authorization failure
      const isAuthError =
        error.code === 'PGRST301' ||
        error.message?.toLowerCase().includes('jwt') ||
        error.message?.toLowerCase().includes('invalid api key') ||
        error.message?.toLowerCase().includes('unauthorized');

      return {
        success: false,
        status: 'error',
        message: isAuthError
          ? `Authentication error: ${error.message} (${error.code || 'Unauthorized'})`
          : `Supabase query error: ${error.message} (${error.code || 'unknown'})`,
        url: config.url,
        latencyMs,
        details: {
          reachable: true,
          authValid: !isAuthError,
          errorCode: error.code,
          rawMessage: error.message,
        },
      };
    }

    return {
      success: true,
      status: 'connected',
      message: `Successfully connected to Supabase and queried database in ${latencyMs}ms.`,
      url: config.url,
      latencyMs,
      details: {
        reachable: true,
        authValid: true,
        tableStatus: 'tables_exist',
      },
    };
  } catch (err: unknown) {
    const latencyMs = Math.round(performance.now() - startTime);
    const errorMessage = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      status: 'error',
      message: `Network or unexpected error while reaching Supabase: ${errorMessage}`,
      url: config.url,
      latencyMs,
      details: err,
    };
  }
}
