import { notFound } from 'next/navigation';
import { Container, H1 } from 'ui';

import PageHeader from '@/components/PageHeader';
import { fetchIntegrations, fetchSession } from '@/lib/api/server';

import IntegrationForm from '../IntegrationForm';

export default async function IntegrationDetail({ params }: { params: { id: string } }) {
  let integration;
  const session = await fetchSession();
  if (session?.user.id) {
    const integrations = await fetchIntegrations(session?.user.id);
    integration = integrations.find((i) => i.id === params.id);
  }
  if (!integration) {
    return notFound();
  }

  return (
    <>
      <PageHeader>
        <H1>Edit {integration.provider} Integration</H1>
      </PageHeader>
      <Container>
        <IntegrationForm initialData={integration} />
      </Container>
    </>
  );
}
