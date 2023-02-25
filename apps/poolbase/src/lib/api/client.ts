'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { atomsWithMutation, atomsWithQuery, queryClientAtom } from 'jotai-tanstack-query';
import { useRouter } from 'next/navigation';

import { Integration, Scope } from '@/types/index';

import { createClient } from '../supabaseBrowserClient';
import {
  SaveIntegrationData,
  SaveScopeData,
  UpdateProfileData,
  fetchIntegrationsFactory,
  fetchResourcesFactory,
  fetchScopesFactory,
  fetchUserProfileFactory,
  logoutFactory,
  saveIntegrationFactory,
  saveScopeFactory,
  saveTagFactory,
  updateProfileFactory,
} from './fetchers';
import { integrationKeys, resourceKeys, scopeKeys } from './queryKeys';

export const fetchUserProfile = fetchUserProfileFactory(createClient);
export const fetchIntegrations = fetchIntegrationsFactory(createClient);
export const fetchResources = fetchResourcesFactory(createClient);
export const fetchScopes = fetchScopesFactory(createClient);
export const updateProfile = updateProfileFactory(createClient);
export const logout = logoutFactory(createClient);
export const saveScope = saveScopeFactory(createClient);
export const saveIntegration = saveIntegrationFactory(createClient);
export const saveTag = saveTagFactory(createClient);

export const [userAtom] = atomsWithQuery(() => ({
  queryKey: ['userProfile'],
  queryFn: fetchUserProfile,
}));

export const [, updateUserProfile] = atomsWithMutation((get) => ({
  mutationKey: ['updateUserProfile'],
  mutationFn: async (data: UpdateProfileData) => {
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
  return useMutation(() => logout(), {
    onSuccess: () => {
      queryClient.removeQueries();
      router.push('/login');
    },
  });
}

export const [resourcesAtom] = atomsWithQuery(() => ({
  queryKey: resourceKeys.lists(),
  queryFn: fetchResources,
}));

export const [scopesAtom] = atomsWithQuery(() => ({
  queryKey: scopeKeys.lists(),
  queryFn: fetchScopes,
}));

export const [, saveScopeAtom] = atomsWithMutation((get) => ({
  mutationKey: ['saveScope'],
  mutationFn: async (data: SaveScopeData) => {
    return saveScope(data);
  },
  onMutate: async (newScopeData: Scope) => {
    const queryClient = get(queryClientAtom);
    // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
    await queryClient.cancelQueries(scopeKeys.lists());

    // Snapshot the previous value
    const previousScopes = queryClient.getQueryData<Scope[]>(scopeKeys.lists());
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

export const [integrationsAtom] = atomsWithQuery(() => ({
  queryKey: integrationKeys.lists(),
  queryFn: fetchIntegrations,
}));

export const [, saveIntegrationAtom] = atomsWithMutation((get) => ({
  mutationKey: ['saveIntegration'],
  mutationFn: async (data: SaveIntegrationData) => {
    return saveIntegration(data);
  },
  onMutate: async (newIntegrationData: Integration) => {
    const queryClient = get(queryClientAtom);
    // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
    await queryClient.cancelQueries(integrationKeys.lists());

    // Snapshot the previous value
    const previousIntegrations = queryClient.getQueryData<Integration[]>(integrationKeys.lists());
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
