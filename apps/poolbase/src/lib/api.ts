'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { atom, useAtom } from 'jotai';
import { atomsWithMutation, atomsWithQuery, queryClientAtom } from 'jotai-tanstack-query';
import { useRouter } from 'next/navigation';
import type { Database } from 'src/types/supabase';

import { createClient } from './supabaseBrowserClient';

const supabase = createClient();

type Profiles = Database['public']['Tables']['profiles']['Row'];

export async function getUserProfile() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const userId = user?.id;
    if (!userId) {
      return null;
    }
    const { data, error, status } = await supabase.from('profiles').select(`*`).eq('id', userId).single();
    if (error && status !== 406) {
      console.log(error);
      return null;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
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
  // // If the mutation fails, use the context returned from onMutate to roll back
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
