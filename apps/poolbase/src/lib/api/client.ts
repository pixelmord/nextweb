'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { atomsWithMutation, atomsWithQuery, queryClientAtom } from 'jotai-tanstack-query';
import { useRouter } from 'next/navigation';

import { createClient } from '../supabaseBrowserClient';
import {
  SaveScopeData,
  UpdateProfileData,
  fetchIntegrationFactory,
  fetchResourcesFactory,
  fetchScopesFactory,
  fetchUserProfileFactory,
  logoutFactory,
  saveScopeFactory,
  updateProfileFactory,
} from './fetchers';

export const fetchUserProfile = fetchUserProfileFactory(createClient);
export const fetchIntegration = fetchIntegrationFactory(createClient);
export const fetchResources = fetchResourcesFactory(createClient);
export const fetchScopes = fetchScopesFactory(createClient);
export const updateProfile = updateProfileFactory(createClient);
export const logout = logoutFactory(createClient);
export const saveScope = saveScopeFactory(createClient);

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
  },
  // Always refetch after error or success:
  onSettled: () => {
    const queryClient = get(queryClientAtom);
    queryClient.invalidateQueries(['userProfile']);
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
  queryKey: ['resources'],
  queryFn: fetchResources,
}));

export const [scopesAtom] = atomsWithQuery(() => ({
  queryKey: ['scopes'],
  queryFn: fetchScopes,
}));

export const [, saveScopeAtom] = atomsWithMutation((get) => ({
  mutationKey: ['saveScope'],
  mutationFn: async (data: SaveScopeData) => {
    return saveScope(data);
  },
  onMutate: async (newScopeData: SaveScopeData) => {
    const queryClient = get(queryClientAtom);
    // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
    await queryClient.cancelQueries(['scopes']);

    // Snapshot the previous value
    const previousScopes = queryClient.getQueryData<SaveScopeData>(['scopes']);

    // Optimistically update to the new value
    queryClient.setQueryData(['scopes'], { ...previousScopes, ...newScopeData });

    // Return a context object with the snapshotted value
    return { previousScopes };
  },

  onError: (err, newProfileData: SaveScopeData, context: { previousScopes: SaveScopeData }) => {
    const queryClient = get(queryClientAtom);
    queryClient.setQueryData(['scopes'], context.previousScopes);
  },
  // Always refetch after error or success:
  onSettled: () => {
    const queryClient = get(queryClientAtom);
    queryClient.invalidateQueries(['scopes']);
  },
}));
