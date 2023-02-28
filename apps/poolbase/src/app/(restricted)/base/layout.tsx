import { dehydrate } from '@tanstack/query-core';

import IntegrationSync from '@/components/IntegrationSync';
import { Hydrate } from '@/components/QueryClientProvider';
import { fetchIntegrationsFactory, fetchUserProfileFactory } from '@/lib/api/fetchers';
import { integrationKeys, userKeys } from '@/lib/api/queryKeys';
import { fetchIntegrations, fetchUserProfile } from '@/lib/api/server';
import getQueryClient from '@/lib/getQueryClient';
import { createClient } from '@/lib/supabaseServerClient';

import MainNavigation from './MainNavigation';

// do not cache this layout
export const revalidate = 0;
export default async function BaseLayout({ children }: React.PropsWithChildren) {
  const queryClient = getQueryClient();
  const supabase = createClient();
  const fetchUserProfile = fetchUserProfileFactory(supabase);
  const fetchIntegrations = fetchIntegrationsFactory(supabase);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    await queryClient.prefetchQuery(['session'], () => Promise.resolve(session));
  }
  if (session?.user.id) {
    const userProfile = await fetchUserProfile(session?.user.id);
    const integrations = await fetchIntegrations(session.user.id);
    await queryClient.prefetchQuery(userKeys.detail(session.user.id), () => Promise.resolve(userProfile));
    await queryClient.prefetchQuery(integrationKeys.listsByUser(session.user.id), () => Promise.resolve(integrations));
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
