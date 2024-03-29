import { dehydrate } from '@tanstack/query-core';
import { Container, H1 } from 'ui';

import PageHeader from '@/components/PageHeader';
import { Hydrate } from '@/components/QueryClientProvider';
import { resourceKeys } from '@/lib/api/client/queryKeys';
import { fetchResourcesFactory } from '@/lib/api/fetchers';
import getQueryClient from '@/lib/getQueryClient';
import { createClient } from '@/lib/supabaseServerClient';

import ResourceList from './ResourceList';
import ScopeList from './ScopeList';

export default async function ResourcesList() {
  const queryClient = getQueryClient();
  const supabase = createClient();
  const fetchResources = fetchResourcesFactory(supabase);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session?.user?.id) {
    const resources = await fetchResources(session.user.id);
    await queryClient.prefetchQuery(resourceKeys.listsByUser(session.user.id), () => Promise.resolve(resources));
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <PageHeader>
        <H1 vspace="none">Resources</H1>
        <ScopeList />
      </PageHeader>
      <Container>
        <Hydrate state={dehydratedState}>
          <ResourceList />
        </Hydrate>
      </Container>
    </>
  );
}
