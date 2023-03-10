'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Integration } from '@/types/index';

import { optimisticallyUpdateList } from '.';
import { createClient } from '../../supabaseBrowserClient';
import { SaveIntegrationData, fetchIntegrationsFactory, saveIntegrationFactory } from '../fetchers';
import { integrationKeys } from './queryKeys';

export const useIntegrationsByUser = (session) => {
  const supabase = createClient();

  const uid = session?.user?.id;
  const fetchIntegrations = fetchIntegrationsFactory(supabase);
  return useQuery({
    queryKey: integrationKeys.listsByUser(uid as string),
    queryFn: () => fetchIntegrations(uid as string),
    enabled: !!uid,
  });
};

export const useSaveIntegration = () => {
  const supabase = createClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['saveIntegration'],
    mutationFn: async (data: SaveIntegrationData) => {
      const saveIntegration = saveIntegrationFactory(supabase);
      return saveIntegration(data);
    },
    onMutate: async (newIntegrationData: Integration) => {
      // Return a context object with the snapshotted value
      return {
        previousIntegrations: await optimisticallyUpdateList(queryClient, integrationKeys.lists(), newIntegrationData),
      };
    },

    onError: (err, newProfileData: SaveIntegrationData, context: { previousIntegrations: Integration[] }) => {
      queryClient.setQueryData(integrationKeys.lists(), context.previousIntegrations);
      queryClient.invalidateQueries(integrationKeys.lists());
    },
    onSuccess: () => {
      return queryClient.invalidateQueries(integrationKeys.lists());
    },
  });
};
