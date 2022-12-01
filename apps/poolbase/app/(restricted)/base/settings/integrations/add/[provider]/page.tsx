import { IntegrationProviders } from '@/types';

export default async function AddIntegration({ params }: { params: { provider: IntegrationProviders } }) {
  return (
    <>
      <p>{params.provider}</p>
    </>
  );
}
