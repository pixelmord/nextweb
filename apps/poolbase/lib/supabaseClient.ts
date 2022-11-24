/**
 * lib/supabaseClient.js
 * Helper to initialize the Supabase client.
 */
import type { Database } from '@/types/supabase';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
export default supabase;
