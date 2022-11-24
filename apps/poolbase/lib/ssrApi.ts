import 'server-only';
import supabaseClient from './supabaseClient';
import { cookies } from 'next/headers';

export async function setSession() {
  const nextCookies = cookies();
  try {
    const cookie = nextCookies.get('supabase-auth-token');
    if (!cookie) {
      return { supabase: supabaseClient, session: null };
    }

    const authTokens = JSON.parse(cookie.value);
    const refreshToken = authTokens[1];
    const accessToken = authTokens[0];
    const {
      data: { session },
      error,
    } = await supabaseClient.auth.setSession({
      refresh_token: refreshToken,
      access_token: accessToken,
    });
    if (error) {
      throw error;
    }
    return { supabase: supabaseClient, session };
  } catch (err) {
    console.error(err);
  }
}

export async function fetchUserProfile() {
  const { session, supabase } = await setSession();
  if (!session) {
    throw new Error('No session found');
  }
  const { data, error } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();

  if (error) {
    throw error;
  }
  return data;
}
