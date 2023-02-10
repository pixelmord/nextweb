import 'server-only';

import { Lato } from '@next/font/google';

import '@/styles/global.css';

import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';
import { Database } from 'src/types/supabase';

import SupabaseListener from '@/components/SupabaseListener';

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
    <html className={`${lato.variable} h-full dark:text-base-200`}>
      <body className="h-full">
        <SupabaseListener accessToken={session?.access_token} />
        {children}
      </body>
    </html>
  );
}
