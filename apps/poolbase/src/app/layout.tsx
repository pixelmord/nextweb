import { Lato } from 'next/font/google';

import '@/styles/global.css';

import { dehydrate } from '@tanstack/query-core';

import QueryClientProvider, { Hydrate } from '@/components/QueryClientProvider';
import SupabaseListener from '@/components/SupabaseListener';
import SupabaseProvider from '@/components/SupabaseProvider';
import Toaster from '@/components/Toaster';
import getQueryClient from '@/lib/getQueryClient';
import { createClient } from '@/lib/supabaseServerClient';

const lato = Lato({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-lato' });

// do not cache this layout
export const revalidate = 0;
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    await queryClient.prefetchQuery(['session'], () => Promise.resolve(session));
  }
  const dehydratedState = dehydrate(queryClient);

  return (
    <html className={`${lato.variable} h-full dark:text-base-200`} lang="en">
      <body className="h-full flex flex-col">
        <SupabaseProvider>
          <SupabaseListener serverAccessToken={session?.access_token} />
          <QueryClientProvider>
            <Hydrate state={dehydratedState}>
              {children}
              <Toaster />
            </Hydrate>
          </QueryClientProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
export const metadata = {
  title: {
    default: 'Poolbase',
    template: '%s | Poolbase',
  },
  description: 'Project tools for the future',
};
