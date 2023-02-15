import { dehydrate } from '@tanstack/query-core';

import { Hydrate } from '@/components/QueryClientProvider';
import getQueryClient from '@/lib/getQueryClient';
import { fetchUserProfile } from '@/lib/ssrApi';

import MainNavigation from './MainNavigation';

export default async function BaseLayout({ children }: React.PropsWithChildren) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['userProfile'], async () => {
    const { data: user } = await fetchUserProfile();
    return user;
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <div className="dark:bg-base-800 bg-base-100 flex flex-col h-full">
        <header>
          <MainNavigation />
        </header>
        <main className="flex-grow">{children}</main>
      </div>
    </Hydrate>
  );
}
