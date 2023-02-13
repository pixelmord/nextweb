'use client';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import supabase from '@/lib/supabaseBrowserClient';
export default function LoginForm() {
  const router = useRouter();

  const [hasMounted, setHasMounted] = useState(false);
  // Blocking hydration warning
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }

  // if (session) {
  //   router.push('/base');
  //   return null;
  // }
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
