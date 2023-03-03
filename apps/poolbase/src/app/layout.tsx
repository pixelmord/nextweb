import { Lato } from 'next/font/google';

import '@/styles/global.css';

import { dehydrate } from '@tanstack/query-core';
import { Metadata } from 'next';

import QueryClientProvider, { Hydrate } from '@/components/QueryClientProvider';
import SupabaseListener from '@/components/SupabaseListener';
import SupabaseProvider from '@/components/SupabaseProvider';
import Toaster from '@/components/Toaster';
import { userKeys } from '@/lib/api/client/queryKeys';
import { fetchUserProfileFactory } from '@/lib/api/fetchers';
import getQueryClient from '@/lib/getQueryClient';
import { createClient } from '@/lib/supabaseServerClient';

const lato = Lato({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-lato' });

// do not cache this layout
export const revalidate = 0;
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  const supabase = createClient();
  const fetchUserProfile = fetchUserProfileFactory(supabase);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    await queryClient.prefetchQuery(['session'], () => Promise.resolve(session));
  }
  if (session?.user?.id) {
    const userProfile = await fetchUserProfile(session.user.id);
    await queryClient.prefetchQuery(userKeys.detail(session.user.id), () => Promise.resolve(userProfile));
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
export const metadata: Metadata = {
  title: {
    default: 'Poolbase',
    template: '%s | Poolbase',
  },
  description: 'Project tools for the future',
  icons: [
    { rel: 'shortcut icon', url: '/favicon.ico' },
    { rel: 'icon', url: '/static/icons/favicon-32x32.png', sizes: '32x32' },
    { rel: 'icon', url: '/static/icons/favicon-16x16.png', sizes: '16x16' },
    { rel: 'apple-touch-icon', url: '/static/icons/apple-touch-icon.png', sizes: '180x180' },
  ],
  manifest: '/manifest.json',
};
