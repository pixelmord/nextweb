import { Container, H1 } from 'ui';

import PageHeader from '@/components/PageHeader';

import AddResourceForm from './AddResourceForm';

export default async function BaseDashboard() {
  return (
    <>
      <PageHeader>
        <H1>Dashboard</H1>
      </PageHeader>
      <Container>
        <AddResourceForm />
      </Container>
    </>
  );
}
