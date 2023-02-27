import { dehydrate } from '@tanstack/query-core';

import IntegrationSync from '@/components/IntegrationSync';
import { Hydrate } from '@/components/QueryClientProvider';
import { integrationKeys } from '@/lib/api/queryKeys';
import { fetchIntegrations, fetchSession, fetchUserProfile } from '@/lib/api/server';
import getQueryClient from '@/lib/getQueryClient';

import MainNavigation from './MainNavigation';

export const dynamic = 'force-dynamic';
// do not cache this layout
export const revalidate = 0;
export default async function BaseLayout({ children }: React.PropsWithChildren) {
  const queryClient = getQueryClient();
  const session = await fetchSession();
  if (session?.user.id) {
    const userProfile = await fetchUserProfile(session?.user.id);
    const integrations = await fetchIntegrations(session?.user.id);
    await queryClient.prefetchQuery(['userProfile'], () => Promise.resolve(userProfile));
    await queryClient.prefetchQuery(integrationKeys.lists(), () => Promise.resolve(integrations));
  }
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
