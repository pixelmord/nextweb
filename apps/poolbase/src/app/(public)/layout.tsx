import { dehydrate } from '@tanstack/query-core';
import Link from 'next/link';

import { Hydrate } from '@/components/QueryClientProvider';
import getQueryClient from '@/lib/getQueryClient';
import { fetchUserProfile } from '@/lib/ssrApi';

import MainNavigation from './MainNavigation';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['userProfile'], async () => {
    const { data: user } = await fetchUserProfile();
    return user || null;
  });
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
