'use client';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import supabase from './supabaseBrowserClient';
import type { Database } from '@/types/supabase';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
type Profiles = Database['public']['Tables']['profiles']['Row'];

export async function getUserProfile() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const userId = user?.id;
    let { data, error, status } = await supabase.from('profiles').select(`*`).eq('id', userId).single();
    if (error && status !== 406) {
      throw error;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}
export function useUserProfile() {
  return useQuery(['userProfile'], () => getUserProfile());
}

export function useProfileImage(url: string) {
  const [avatarUrl, setAvatarUrl] = useState<Profiles['avatar_url']>(null);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path: string) {
    try {
      const {
        data: { publicUrl: url },
      } = await supabase.storage.from('avatars').getPublicUrl(`${path}`);

      setAvatarUrl(url);
    } catch (error) {
      console.log('Error downloading image: ', error);
    }
  }
  return avatarUrl;
}
export type UpdateProfileData = Pick<Profiles, 'avatar_url' | 'full_name' | 'id' | 'username' | 'website'>;
export async function updateProfile(data: UpdateProfileData) {
  try {
    const updates = {
      ...data,
      updated_at: new Date().toISOString(),
    };

    let { error } = await supabase.from('profiles').upsert(updates);
    if (error) throw error;
  } catch (error) {
    console.log(error);
  }
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation((data: UpdateProfileData) => updateProfile(data), {
    onMutate: async (newProfileData) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(['userProfile']);

      // Snapshot the previous value
      const previousProfile = queryClient.getQueryData<UpdateProfileData>(['userProfile']);

      // Optimistically update to the new value
      queryClient.setQueryData(['userProfile'], { ...previousProfile, ...newProfileData });

      // Return a context object with the snapshotted value
      return { previousProfile };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, newProfileData, context) => {
      queryClient.setQueryData(['userProfile'], context.previousProfile);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(['userProfile']);
    },
  });
}

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
