import PageHeader from '@/components/PageHeader';
import { H1 } from 'ui';

export default async function IntegrationDetail({ params }: { params: { id: string } }) {
  return (
    <>
      <PageHeader>
        <H1>Edit .. Integration</H1>
      </PageHeader>
    </>
  );
}
