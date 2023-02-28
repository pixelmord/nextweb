'use client';

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { atomsWithMutation, atomsWithQuery, queryClientAtom } from 'jotai-tanstack-query';
import { useRouter } from 'next/navigation';

import { Integration, Scope } from '@/types/index';

import { atomsWithQueryAsync } from '../atomsWithQueryAsync';
import { createClient } from '../supabaseBrowserClient';
import {
  SaveIntegrationData,
  SaveScopeData,
  UpdateProfileData,
  fetchIntegrationsFactory,
  fetchResourcesFactory,
  fetchScopesFactory,
  fetchSessionFactory,
  fetchUserProfileFactory,
  logoutFactory,
  saveIntegrationFactory,
  saveScopeFactory,
  saveTagFactory,
  updateProfileFactory,
} from './fetchers';
import { integrationKeys, resourceKeys, scopeKeys, userKeys } from './queryKeys';

export const fetchSession = async () => {
  const supabase = createClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  return { supabase, session };
};

export const [sessionAtom] = atomsWithQuery(() => ({
  queryKey: ['session'],
  queryFn: fetchSession,
}));
export const [userAtom] = atomsWithQueryAsync(async (get) => {
  const { supabase, session } = await get(sessionAtom);
  const uid = session?.user?.id;
  const fetchUserProfile = fetchUserProfileFactory(supabase);
  return {
    queryKey: userKeys.detail(uid as string),
    queryFn: () => fetchUserProfile(uid as string),
    enabled: !!uid,
  };
});

export const [, updateUserProfile] = atomsWithMutation((get) => ({
  mutationKey: ['updateUserProfile'],
  mutationFn: async (data: UpdateProfileData) => {
    const { supabase } = await get(sessionAtom);
    const updateProfile = updateProfileFactory(supabase);
    return updateProfile(data);
  },
  onMutate: async (newProfileData: UpdateProfileData) => {
    const queryClient = get(queryClientAtom);
    // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
    await queryClient.cancelQueries(['userProfile']);

    // Snapshot the previous value
    const previousProfile = queryClient.getQueryData<UpdateProfileData>(['userProfile']);

    // Optimistically update to the new value
    queryClient.setQueryData(['userProfile'], { ...previousProfile, ...newProfileData });

    // Return a context object with the snapshotted value
    return { previousProfile };
  },

  onError: (err, newProfileData: UpdateProfileData, context: { previousProfile: UpdateProfileData }) => {
    const queryClient = get(queryClientAtom);
    queryClient.setQueryData(['userProfile'], context.previousProfile);
    queryClient.invalidateQueries(['userProfile']);
  },
  // Always refetch after error or success:
  onSuccess: () => {
    const queryClient = get(queryClientAtom);
    return queryClient.invalidateQueries(['userProfile']);
  },
}));

export function useLogOut() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const supabase = useSupabaseClient();
  const logout = logoutFactory(supabase);
  return useMutation(() => logout(), {
    onSuccess: () => {
      queryClient.removeQueries();
      router.push('/login');
    },
  });
}

export const [resourcesAtom] = atomsWithQueryAsync(async (get) => {
  const { supabase, session } = await get(sessionAtom);
  const uid = session?.user?.id;
  const fetchResources = fetchResourcesFactory(supabase);
  return {
    queryKey: resourceKeys.listsByUser(uid as string),
    queryFn: () => fetchResources(uid as string),
    enabled: !!uid,
  };
});

export const [scopesAtom] = atomsWithQueryAsync(async (get) => {
  const { supabase, session } = await get(sessionAtom);
  const uid = session?.user?.id;
  const fetchScopes = fetchScopesFactory(supabase);
  return {
    queryKey: scopeKeys.listsByUser(uid as string),
    queryFn: () => fetchScopes(uid as string),
    enabled: !!uid,
  };
});

export const [, saveScopeAtom] = atomsWithMutation((get) => ({
  mutationKey: ['saveScope'],
  mutationFn: async (data: SaveScopeData) => {
    const { supabase } = await get(sessionAtom);
    const saveScope = saveScopeFactory(supabase);
    return saveScope(data);
  },
  onMutate: async (newScopeData: Scope) => {
    const queryClient = get(queryClientAtom);
    // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
    await queryClient.cancelQueries(scopeKeys.lists());

    // Snapshot the previous value
    const previousScopes = queryClient.getQueryData<Scope[]>(scopeKeys.lists()) || [];
    const newScopes = [...previousScopes];
    const scopeIndex = previousScopes.findIndex((scope) => scope.id === newScopeData.id);
    if (scopeIndex > -1) {
      newScopes[scopeIndex] = { ...previousScopes[scopeIndex], ...newScopeData };
    } else {
      newScopes.push(newScopeData);
    }

    // Optimistically update to the new value
    queryClient.setQueryData(scopeKeys.lists(), newScopes);

    // Return a context object with the snapshotted value
    return { previousScopes };
  },

  onError: (err, newProfileData: SaveScopeData, context: { previousScopes: Scope[] }) => {
    const queryClient = get(queryClientAtom);
    queryClient.setQueryData(scopeKeys.lists(), context.previousScopes);
  },
  // Always refetch after error or success:
  onSettled: () => {
    const queryClient = get(queryClientAtom);
    queryClient.invalidateQueries(scopeKeys.lists());
  },
}));

export const [integrationsAtom] = atomsWithQueryAsync(async (get) => {
  const { supabase, session } = await get(sessionAtom);
  const uid = session?.user?.id;
  const fetchIntegrations = fetchIntegrationsFactory(supabase);
  return {
    queryKey: integrationKeys.listsByUser(uid as string),
    queryFn: () => fetchIntegrations(uid as string),
    enabled: !!uid,
  };
});

export const [, saveIntegrationAtom] = atomsWithMutation((get) => ({
  mutationKey: ['saveIntegration'],
  mutationFn: async (data: SaveIntegrationData) => {
    const { supabase } = await get(sessionAtom);
    const saveIntegration = saveIntegrationFactory(supabase);
    return saveIntegration(data);
  },
  onMutate: async (newIntegrationData: Integration) => {
    const queryClient = get(queryClientAtom);
    // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
    await queryClient.cancelQueries(integrationKeys.lists());

    // Snapshot the previous value
    const previousIntegrations = queryClient.getQueryData<Integration[]>(integrationKeys.lists()) || [];
    const newIntegrations = [...previousIntegrations];
    const integrationIndex = previousIntegrations.findIndex((integration) => integration.id === newIntegrationData.id);
    if (integrationIndex > -1) {
      newIntegrations[integrationIndex] = { ...previousIntegrations[integrationIndex], ...newIntegrationData };
    } else {
      newIntegrations.push(newIntegrationData);
    }

    // Optimistically update to the new value
    queryClient.setQueryData(integrationKeys.lists(), newIntegrations);

    // Return a context object with the snapshotted value
    return { previousIntegrations };
  },

  onError: (err, newProfileData: SaveIntegrationData, context: { previousIntegrations: Integration[] }) => {
    const queryClient = get(queryClientAtom);
    queryClient.setQueryData(integrationKeys.lists(), context.previousIntegrations);
    queryClient.invalidateQueries(integrationKeys.lists());
  },
  onSuccess: () => {
    const queryClient = get(queryClientAtom);
    return queryClient.invalidateQueries(integrationKeys.lists());
  },
}));
