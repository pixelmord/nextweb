import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';
import type { Database } from 'src/types/supabase';

export const createClient = () => {
  return createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });
};
