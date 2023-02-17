'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { atom, useAtom } from 'jotai';
import { atomsWithMutation, atomsWithQuery, queryClientAtom } from 'jotai-tanstack-query';
import { useRouter } from 'next/navigation';
import type { Database } from 'src/types/supabase';

import { createClient } from './supabaseBrowserClient';

export async function createClientWithSession() {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return { session, supabase };
}
type Profiles = Database['public']['Tables']['profiles']['Row'];

export async function getUserProfile() {
  const { session, supabase } = await createClientWithSession();
  if (!session) {
    return { data: null, error: new Error('No session') };
  }
  const { data, error } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();

  return { data, error };
}
export const [userAtom] = atomsWithQuery(() => ({
  queryKey: ['userProfile'],
  queryFn: () => getUserProfile(),
}));

export type UpdateProfileData = Pick<
  Profiles,
  'avatar_url' | 'avatar_storage_path' | 'full_name' | 'id' | 'username' | 'website'
>;
export async function updateProfile(data: UpdateProfileData) {
  const { supabase } = await createClientWithSession();
  const updates = {
    ...data,
    updated_at: new Date().toISOString(),
  };

  const { data: profile, error } = await supabase.from('profiles').upsert(updates).select();
  if (error) console.log(error);
  return profile;
}

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

const logout = async () => {
  const { supabase } = await createClientWithSession();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
};

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

export async function getResources() {
  const { session, supabase } = await createClientWithSession();
  if (!session) {
    return { data: null, error: new Error('No session') };
  }
  const { data, error } = await supabase
    .from('resource_user')
    .select('created_at, resource_id(*)')
    .eq('user_id', session.user.id);
  return { data, error };
}
export const [resourcesAtom] = atomsWithQuery(() => ({
  queryKey: ['resources'],
  queryFn: () => getResources(),
}));
