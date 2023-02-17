import { dehydrate } from '@tanstack/query-core';
import { Container, H1, H2 } from 'ui';

import PageHeader from '@/components/PageHeader';
import { Hydrate } from '@/components/QueryClientProvider';
import getQueryClient from '@/lib/getQueryClient';
import { fetchResources } from '@/lib/ssrApi';

import ResourceList from './ResourceList';

export default async function ResourcesList() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['resources'], async () => {
    const { data } = await fetchResources();
    return data;
  });
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
