'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Resource } from '@/types/index';

import { optimisticallyUpdateList } from '.';
import { createClient } from '../../supabaseBrowserClient';
import { ProcessResourceData, fetchProcessedResource, fetchResourcesFactory } from '../fetchers';
import { resourceKeys } from './queryKeys';

export const useResourcesByUser = (session) => {
  const supabase = createClient();

  const uid = session?.user?.id;
  const fetchResources = fetchResourcesFactory(supabase);
  return useQuery({
    queryKey: resourceKeys.listsByUser(uid),
    queryFn: () => fetchResources(uid),
    enabled: !!uid,
  });
};

export const useProcessResource = (uid) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['processResource'],
    mutationFn: async (data: ProcessResourceData) => {
      return fetchProcessedResource(data);
    },
    onMutate: async (newResourceData: Resource) => {
      const previousList = await optimisticallyUpdateList(queryClient, resourceKeys.listsByUser(uid), newResourceData);
      // Return a context object with the snapshotted value
      return { previousList };
    },

    onError: (err, newProfileData: ProcessResourceData, context: { previousList: Resource[] }) => {
      queryClient.setQueryData(resourceKeys.listsByUser(uid), context.previousList);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(resourceKeys.listsByUser(uid));
    },
  });
};
