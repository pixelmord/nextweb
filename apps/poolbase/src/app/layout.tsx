import { Lato } from 'next/font/google';

import '@/styles/global.css';

import QueryClientProvider from '@/components/QueryClientProvider';
import SupabaseListener from '@/components/SupabaseListener';
import SupabaseProvider from '@/components/SupabaseProvider';
import Toaster from '@/components/Toaster';
import { createClient } from '@/lib/supabaseServerClient';

const lato = Lato({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-lato' });
// do not cache this layout
export const revalidate = 0;
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html className={`${lato.variable} h-full dark:text-base-200`}>
      <body className="h-full flex flex-col">
        <SupabaseProvider>
          <SupabaseListener serverAccessToken={session?.access_token} />
          <QueryClientProvider>
            {children}
            <Toaster />
          </QueryClientProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
