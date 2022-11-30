import 'server-only';
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { headers, cookies } from 'next/headers';
import { Database } from '@/types/supabase';

export async function fetchUserProfile() {
  try {
    const supabase = createServerComponentSupabaseClient<Database>({
      headers,
      cookies,
    });

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      throw new Error('No session found');
    }
    const { data, error } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
