'use client';

import { CgLinear } from 'react-icons/cg';
import { FiEdit, FiGithub, FiPlusSquare } from 'react-icons/fi';
import { RxNotionLogo } from 'react-icons/rx';
import { H2 } from 'ui';

import { useSession } from '@/lib/api/client';
import { useIntegrationsByUser } from '@/lib/api/client';

import IntegrationListItem from './IntegrationListItem';

const availableIntegrations = [
  { provider: 'github', icon: FiGithub, setupUrl: 'https://', bgColor: 'bg-gray-900' },
  { provider: 'linear', icon: CgLinear, setupUrl: 'https://', bgColor: 'bg-indigo-600' },
  { provider: 'notion', icon: RxNotionLogo, setupUrl: 'https://', bgColor: 'bg-gray-500' },
];
export default function IntegrationList() {
  const { data: session } = useSession();
  const { data: integrations } = useIntegrationsByUser(session);
  const existingIntegrations = integrations?.map((integration) => {
    const availableIntegration = availableIntegrations.find(
      (availableIntegration) => availableIntegration.provider === integration.provider
    );
    return {
      ...availableIntegration,
      ...integration,
    };
  });
  return (
    <>
      <H2 className="mt-6">Your Integrations</H2>
      <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {!!existingIntegrations?.length ? (
          existingIntegrations.map((integration) => (
            <IntegrationListItem
              key={integration.provider}
              integration={integration}
              actionIcon={FiEdit}
              href={`/base/settings/integrations/${integration.id}`}
            />
          ))
        ) : (
          <p className="text-gray-500">No integrations yet</p>
        )}
      </ul>
      <H2 className="mt-6">Available Integrations</H2>
      <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {availableIntegrations
          .filter(
            (integration) => !existingIntegrations?.some((existing) => existing.provider === integration.provider)
          )
          .map((integration) => (
            <IntegrationListItem
              key={integration.provider}
              integration={integration}
              actionIcon={FiPlusSquare}
              href={`/base/settings/integrations/add/${integration.provider}`}
            />
          ))}
      </ul>
    </>
  );
}
