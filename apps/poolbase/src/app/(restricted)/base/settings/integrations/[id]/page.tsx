import { notFound } from 'next/navigation';
import { Container, H1 } from 'ui';

import PageHeader from '@/components/PageHeader';
import { fetchIntegrationsFactory } from '@/lib/api/fetchers';
import { fetchIntegrations } from '@/lib/api/server';
import { createClient } from '@/lib/supabaseServerClient';

import IntegrationForm from '../IntegrationForm';

export default async function IntegrationDetail({ params }: { params: { id: string } }) {
  let integration;
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const fetchIntegrations = fetchIntegrationsFactory(supabase);

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
