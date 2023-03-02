'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useEffect, useState } from 'react';

import { useSupabase } from '@/components/SupabaseProvider';

export default function LoginForm() {
  const { supabase } = useSupabase();

  const [hasMounted, setHasMounted] = useState(false);
  // Blocking hydration warning
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }

  return (
    <Auth
      redirectTo="/base"
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      theme="dark"
      providers={['github']}
    />
  );
}
