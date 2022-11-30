import 'server-only';

import { Lato } from '@next/font/google';
import '@/styles/global.css';
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import SupabaseListener from '@/components/SupabaseListener';
import { headers, cookies } from 'next/headers';
import { Database } from '@/types/supabase';

const lato = Lato({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-lato' });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  return (
    <html className={`${lato.variable} h-full`}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="h-full">
        <SupabaseListener accessToken={session?.access_token} />
        {children}
      </body>
    </html>
  );
}
