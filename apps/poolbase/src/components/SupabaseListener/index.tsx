'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useSupabase } from '../SupabaseProvider';

export default function SupabaseListener({ serverAccessToken }: { serverAccessToken?: string }) {
  const { supabase } = useSupabase();
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        router.push('/login');
      } else if (event === 'SIGNED_IN') {
        router.push('/base');
      } else if (session?.access_token !== serverAccessToken) {
        console.debug('SupabaseListener: Refreshing page', session);
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [serverAccessToken, router, supabase]);

  return null;
}
