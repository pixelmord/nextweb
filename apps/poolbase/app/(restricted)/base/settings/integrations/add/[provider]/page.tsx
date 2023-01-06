import PageHeader from '@/components/PageHeader';
import { IntegrationProviders } from '@/types';
import { Container, H1 } from 'ui';
import IntegrationForm from '../../IntegrationForm';

const defaultValues = { github: { display_name: 'Github', provider: 'github', api_username: '', access_token: '' } };
function getDefaultValues(provider: IntegrationProviders) {
  return defaultValues[provider] || { display_name: '', provider: '', api_username: '', access_token: '' };
}

export default async function AddIntegration({ params }: { params: { provider: IntegrationProviders } }) {
  return (
    <>
      <PageHeader>
        <H1>Add {params.provider} Integration</H1>
      </PageHeader>
      <Container>
        <IntegrationForm initialData={getDefaultValues(params.provider)} />
      </Container>
    </>
  );
}
