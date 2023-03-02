import { dehydrate } from '@tanstack/query-core';
import Link from 'next/link';

import { Hydrate } from '@/components/QueryClientProvider';
import { userKeys } from '@/lib/api/client/queryKeys';
import { fetchUserProfileFactory } from '@/lib/api/fetchers';
import getQueryClient from '@/lib/getQueryClient';
import { createClient } from '@/lib/supabaseServerClient';

import MainNavigation from './MainNavigation';

export default async function Layout({ children }: { children: React.ReactNode }) {
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
    <div className="bg-base-100 dark:bg-base-800 h-full">
      <Hydrate state={dehydratedState}>
        <MainNavigation />
        <main className="mx-auto max-w-7xl px-4 sm:px-6">{children}</main>
      </Hydrate>
      <footer className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav>
          <Link href="/blog">Blog</Link>
        </nav>
      </footer>
    </div>
  );
}
