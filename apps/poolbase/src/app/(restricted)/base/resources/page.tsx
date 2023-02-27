import { dehydrate } from '@tanstack/query-core';
import { Container, H1, H2 } from 'ui';

import PageHeader from '@/components/PageHeader';
import { Hydrate } from '@/components/QueryClientProvider';
import { resourceKeys } from '@/lib/api/queryKeys';
import { fetchResources, fetchSession } from '@/lib/api/server';
import getQueryClient from '@/lib/getQueryClient';

import ResourceList from './ResourceList';

export const dynamic = 'force-dynamic';
// do not cache this layout
export const revalidate = 0;
export default async function ResourcesList() {
  const queryClient = getQueryClient();
  const session = await fetchSession();
  if (session?.user.id) {
    const resources = await fetchResources(session.user.id);
    await queryClient.prefetchQuery(resourceKeys.lists(), () => Promise.resolve(resources));
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
