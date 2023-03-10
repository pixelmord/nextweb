'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Scope } from '@/types/index';

import { optimisticallyUpdateList } from '.';
import { createClient } from '../../supabaseBrowserClient';
import { SaveScopeData, fetchScopesFactory, saveScopeFactory } from '../fetchers';
import { scopeKeys } from './queryKeys';

export const useScopes = () => {
  const supabase = createClient();

  const fetchScopes = fetchScopesFactory(supabase);
  return useQuery({
    queryKey: scopeKeys.lists(),
    queryFn: () => fetchScopes(),
  });
};

export const useSaveScope = () => {
  const supabase = createClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['saveScope'],
    mutationFn: async (data: SaveScopeData) => {
      const saveScope = saveScopeFactory(supabase);
      return saveScope(data);
    },
    onMutate: async (newScopeData: Scope) => {
      return { previousScopes: await optimisticallyUpdateList(queryClient, scopeKeys.lists(), newScopeData) };
    },

    onError: (err, newProfileData: SaveScopeData, context: { previousScopes: Scope[] }) => {
      queryClient.setQueryData(scopeKeys.lists(), context.previousScopes);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(scopeKeys.lists());
    },
  });
};
