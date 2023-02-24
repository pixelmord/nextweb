import { dehydrate } from '@tanstack/query-core';
import { Container, H1, H2 } from 'ui';

import PageHeader from '@/components/PageHeader';
import { Hydrate } from '@/components/QueryClientProvider';
import { fetchResources } from '@/lib/api/server';
import getQueryClient from '@/lib/getQueryClient';

import ResourceList from './ResourceList';

// do not cache this layout
export const revalidate = 0;
export default async function ResourcesList() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['resources'], fetchResources);
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
