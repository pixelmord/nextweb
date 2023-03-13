'use client';

import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from 'src/types/supabase';

export const createClient = () => createBrowserSupabaseClient<Database>();
