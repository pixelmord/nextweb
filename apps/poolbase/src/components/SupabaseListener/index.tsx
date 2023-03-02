'use client';

import { Subscription } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { useSupabase } from '../SupabaseProvider';

export default function SupabaseListener({ serverAccessToken }: { serverAccessToken?: string }) {
  const { supabase } = useSupabase();
  const router = useRouter();
  const subscriptionRef = useRef<Subscription | null>(null);
  useEffect(() => {
    if (!subscriptionRef.current) {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event, session) => {
        if (session?.access_token !== serverAccessToken) {
          console.debug('SupabaseListener: Refreshing page', session);
          router.refresh();
        }
      });
      subscriptionRef.current = subscription;
    }

    return () => {
      subscriptionRef.current && subscriptionRef.current.unsubscribe();
    };
  }, [serverAccessToken, router, supabase]);

  return null;
}
