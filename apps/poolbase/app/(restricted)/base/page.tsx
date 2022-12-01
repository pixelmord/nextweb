import PageHeader from '@/components/PageHeader';
import { H1, Container } from 'ui';

export default async function BaseDashboard() {
  return (
    <>
      <PageHeader>
        <H1>Dashboard</H1>
      </PageHeader>
      <Container>whatever</Container>
    </>
  );
}
