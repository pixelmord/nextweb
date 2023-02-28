import { dehydrate } from '@tanstack/query-core';
import { Container, H1, H2 } from 'ui';

import PageHeader from '@/components/PageHeader';
import { Hydrate } from '@/components/QueryClientProvider';
import { fetchResourcesFactory } from '@/lib/api/fetchers';
import { resourceKeys } from '@/lib/api/queryKeys';
import { fetchResources } from '@/lib/api/server';
import getQueryClient from '@/lib/getQueryClient';
import { createClient } from '@/lib/supabaseServerClient';

import ResourceList from './ResourceList';

// do not cache this page
export const revalidate = 0;
export default async function ResourcesList() {
  const queryClient = getQueryClient();
  const supabase = createClient();
  const fetchIntegrations = fetchResourcesFactory(supabase);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session?.user?.id) {
    const resources = await fetchIntegrations(session.user.id);
    await queryClient.prefetchQuery(resourceKeys.listsByUser(session.user.id), () => Promise.resolve(resources));
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <PageHeader>
        <H1>Resources</H1>
      </PageHeader>
      <Container>
        <Hydrate state={dehydratedState}>
          <ResourceList />
        </Hydrate>
      </Container>
    </>
  );
}
