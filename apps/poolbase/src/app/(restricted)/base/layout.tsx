import { dehydrate } from '@tanstack/query-core';

import IntegrationSync from '@/components/IntegrationSync';
import { Hydrate } from '@/components/QueryClientProvider';
import { fetchUserProfile } from '@/lib/api/server';
import getQueryClient from '@/lib/getQueryClient';

import MainNavigation from './MainNavigation';

// do not cache this layout
export const revalidate = 0;
export default async function BaseLayout({ children }: React.PropsWithChildren) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['userProfile'], fetchUserProfile);
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <IntegrationSync />
      <div className="dark:bg-base-800 bg-base-100 flex flex-col flex-grow">
        <header>
          <MainNavigation />
        </header>
        <main className="flex-grow">{children}</main>
      </div>
    </Hydrate>
  );
}
