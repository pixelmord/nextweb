import { notFound } from 'next/navigation';
import { Container, H1, H2 } from 'ui';

import PageHeader from '@/components/PageHeader';
import { fetchGithubStars, fetchIntegration } from '@/lib/ssrApi';

export default async function ResourcesByProvider({ params: { provider } }: { params: { provider: string } }) {
  const { data: integration, error } = await fetchIntegration(provider);
  if (!integration || error) {
    notFound();
  }
  switch (integration.provider) {
    case 'github':
      const {
        data: {
          viewer: {
            starredRepositories: { nodes: stars },
          },
        },
      } = await fetchGithubStars();

      return (
        <>
          <PageHeader>
            <H1>Resources from {provider} Integration</H1>
          </PageHeader>
          <Container>{!!stars && stars.map((star) => <H2 key={star.id}>{star.name}</H2>)}</Container>
        </>
      );
    default:
      return null;
  }
}
