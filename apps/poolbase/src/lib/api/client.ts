'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { Integration, Scope, UserProfileSchema } from '@/types/index';

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

export const useSession = () => {
  const supabase = createClient();
  return useQuery({
    queryKey: ['session'],
    queryFn: () => supabase.auth.getSession().then((data) => data.data.session),
    enabled: !!supabase.auth,
  });
};
export const useUser = (session) => {
  const supabase = createClient();
  const uid = session?.user?.id;
  const fetchUserProfile = fetchUserProfileFactory(supabase);
  return useQuery({
    queryKey: userKeys.detail(uid as string),
    queryFn: () => fetchUserProfile(uid as string),
    enabled: !!uid,
  });
};

export const useUpdateUserProfile = () => {
  const supabase = createClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['updateUserProfile'],
    mutationFn: async (data: UpdateProfileData) => {
      const updateProfile = updateProfileFactory(supabase);
      return updateProfile(data);
    },
    onMutate: async (newProfileData: UpdateProfileData) => {
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
      queryClient.setQueryData(['userProfile'], context.previousProfile);
      queryClient.invalidateQueries(['userProfile']);
    },
    // Always refetch after error or success:
    onSuccess: () => {
      return queryClient.invalidateQueries(['userProfile']);
    },
  });
};

export function useLogOut() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const supabase = createClient();
  const logout = logoutFactory(supabase);
  return useMutation(() => logout(), {
    onSuccess: () => {
      queryClient.removeQueries();
      router.push('/login');
    },
  });
}

export const useResourcesByUser = (session) => {
  const supabase = createClient();

  const uid = session?.user?.id;
  const fetchResources = fetchResourcesFactory(supabase);
  return useQuery({
    queryKey: resourceKeys.listsByUser(uid as string),
    queryFn: () => fetchResources(uid as string),
    enabled: !!uid,
  });
};

export const useScopesByUser = (session) => {
  const supabase = createClient();
  const uid = session?.user?.id;
  const fetchScopes = fetchScopesFactory(supabase);
  return useQuery({
    queryKey: scopeKeys.listsByUser(uid as string),
    queryFn: () => fetchScopes(uid as string),
    enabled: !!uid,
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
      queryClient.setQueryData(scopeKeys.lists(), context.previousScopes);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(scopeKeys.lists());
    },
  });
};

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
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(integrationKeys.lists());

      // Snapshot the previous value
      const previousIntegrations = queryClient.getQueryData<Integration[]>(integrationKeys.lists()) || [];
      const newIntegrations = [...previousIntegrations];
      const integrationIndex = previousIntegrations.findIndex(
        (integration) => integration.id === newIntegrationData.id
      );
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
      queryClient.setQueryData(integrationKeys.lists(), context.previousIntegrations);
      queryClient.invalidateQueries(integrationKeys.lists());
    },
    onSuccess: () => {
      return queryClient.invalidateQueries(integrationKeys.lists());
    },
  });
};
