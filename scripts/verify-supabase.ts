/**
 * Supabase Connection Verification Runner
 * 
 * Safely verifies:
 * 1. Environment variable loading from .env.local
 * 2. Supabase client initialization
 * 3. Network reachability & latency
 * 4. Distinct status: connection vs table presence vs errors
 * 
 * Strictly masks all credentials in outputs.
 */

import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// 1. Load .env.local explicitly if present
const envLocalPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath, override: true });
}

function maskString(str?: string): string {
  if (!str) return '[NOT_SET]';
  if (str.length <= 8) return '****';
  return `${str.substring(0, 4)}...${str.substring(str.length - 4)}`;
}

function maskUrl(urlStr?: string): string {
  if (!urlStr) return '[NOT_SET]';
  try {
    const parsed = new URL(urlStr);
    const hostParts = parsed.host.split('.');
    if (hostParts.length >= 3) {
      const maskedHost = `${hostParts[0].substring(0, 3)}****.${hostParts.slice(1).join('.')}`;
      return `${parsed.protocol}//${maskedHost}`;
    }
    return `${parsed.protocol}//${parsed.host}`;
  } catch {
    return 'https://[invalid-url]';
  }
}

async function run() {
  console.log('====================================================');
  console.log(' SUPABASE CONFIGURATION & CONNECTION VERIFICATION  ');
  console.log('====================================================\n');

  // Step 1: Environment Variables Check
  console.log('1. ENVIRONMENT VARIABLES VERIFICATION');
  const rawUrl = process.env.VITE_SUPABASE_URL;
  const rawKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  const urlConfigured = !!rawUrl && !rawUrl.includes('your-project-id');
  const keyConfigured = !!rawKey && !rawKey.includes('your-anon') && rawKey.length > 20;

  console.log(`   - VITE_SUPABASE_URL: ${urlConfigured ? 'LOADED (' + maskUrl(rawUrl) + ')' : 'MISSING OR PLACEHOLDER'}`);
  console.log(`   - VITE_SUPABASE_PUBLISHABLE_KEY: ${keyConfigured ? 'LOADED (' + maskString(rawKey) + ')' : 'MISSING OR PLACEHOLDER'}`);

  if (!urlConfigured || !keyConfigured) {
    console.log('\n❌ FAILED: Required environment variables are not properly set in .env.local');
    process.exit(1);
  }

  // Step 2: Supabase Client Initialization
  console.log('\n2. CLIENT INITIALIZATION CHECK');
  // Dynamic import to ensure process.env is set before client initializes
  const { isSupabaseConfigured, validateSupabaseConfig } = await import('../src/lib/supabase/client');
  const config = validateSupabaseConfig();
  console.log(`   - Config validation: ${config.isValid ? 'PASSED' : 'FAILED: ' + config.reason}`);
  console.log(`   - Client initialized: ${isSupabaseConfigured() ? 'YES' : 'NO'}`);

  if (!config.isValid) {
    console.log('\n❌ FAILED: Client validation rejected the configuration.');
    process.exit(1);
  }

  // Step 3: Connection & Diagnostic Test
  console.log('\n3. REACHABILITY & DIAGNOSTIC TEST (testSupabaseConnection)');
  const { testSupabaseConnection } = await import('../src/lib/supabase/testConnection');
  
  const result = await testSupabaseConnection();
  console.log(`   - Reachable & Connected: ${result.success ? 'YES' : 'NO'}`);
  console.log(`   - Latency: ${result.latencyMs !== undefined ? result.latencyMs + ' ms' : 'N/A'}`);
  console.log(`   - Status Category: ${result.status}`);
  console.log(`   - Diagnostic Message: ${result.message}`);

  // Step 4: Analysis of State
  console.log('\n4. DATABASE STATE & TABLES AUDIT');
  const details = result.details as Record<string, unknown> | undefined;

  if (result.success && details?.tableStatus === 'tables_pending') {
    console.log('   ✅ Project connection: SUCCESSFUL');
    console.log('   ✅ API credentials: VALID & ACCEPTED');
    console.log('   ℹ️  Database schema: PENDING (Tables not yet created, as expected)');
    console.log('   👉 Note: The PostgREST endpoint responded properly. Ready for SQL migration.');
  } else if (result.success && details?.tableStatus === 'tables_exist') {
    console.log('   ✅ Project connection: SUCCESSFUL');
    console.log('   ✅ API credentials: VALID & ACCEPTED');
    console.log('   ✅ Database schema: Tables exist and query succeeded');
  } else {
    console.log('   ❌ Error occurred:');
    console.log(`      ${result.message}`);
    if (details?.errorCode) {
      console.log(`      Error code: ${details.errorCode}`);
    }
  }

  // Step 5: Multi-table Status Audit
  console.log('\n5. MULTI-TABLE MIGRATION READINESS AUDIT');
  const { supabase } = await import('../src/lib/supabase/client');
  const tables = [
    'site_settings',
    'projects',
    'experiences',
    'skills',
    'education',
    'certifications',
    'ai_experiments',
    'blog_posts',
    'contact_messages',
    'media_assets'
  ] as const;

  let existingCount = 0;
  for (const table of tables) {
    try {
      const { error } = await supabase.from(table as any).select('*', { count: 'exact', head: true });
      if (!error) {
        console.log(`   [✓] public.${table.padEnd(18)} : Active (Ready)`);
        existingCount++;
      } else if (
        error.code === 'PGRST204' ||
        error.code === 'PGRST205' ||
        error.code === '42P01' ||
        error.message?.includes('schema cache') ||
        error.message?.includes('does not exist')
      ) {
        console.log(`   [·] public.${table.padEnd(18)} : Pending Migration`);
      } else {
        console.log(`   [?] public.${table.padEnd(18)} : ${error.message} (code: ${error.code})`);
      }
    } catch {
      console.log(`   [·] public.${table.padEnd(18)} : Pending`);
    }
  }

  console.log(`\n   Summary: ${existingCount} of ${tables.length} tables deployed in Supabase.`);
  if (existingCount < tables.length) {
    console.log('   👉 Run the SQL file at supabase/migrations/20261031_initial_schema.sql in your Supabase SQL Editor.');
  }

  console.log('\n====================================================');
  console.log(result.success ? ' RESULT: CONNECTION VERIFIED SUCCESSFULLY' : ' RESULT: CONNECTION VERIFICATION FAILED');
  console.log('====================================================');
}

run().catch((err) => {
  console.error('Unhandled verification error:', err.message);
  process.exit(1);
});
