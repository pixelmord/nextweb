import { Container, H1 } from 'ui';

import PageHeader from '@/components/PageHeader';

import IntegrationList from './IntegrationList';

export default async function Integrations() {
  return (
    <>
      <PageHeader>
        <H1>Integrations</H1>
      </PageHeader>
      <Container>
        <IntegrationList />
      </Container>
    </>
  );
}
