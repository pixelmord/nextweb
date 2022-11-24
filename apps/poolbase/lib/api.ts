'use client';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import supabase from './supabaseClient';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import type { Database } from '@/types/supabase';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
type Profiles = Database['public']['Tables']['profiles']['Row'];

export async function getUserProfile(userId) {
  try {
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
  const user = useUser();
  const userId = user?.id;
  return useQuery(['userProfile', userId], () => getUserProfile(userId), {
    // The query will not execute until the userId exists
    enabled: !!userId,
  });
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
export async function updateProfile(client, data: UpdateProfileData) {
  try {
    const updates = {
      ...data,
      updated_at: new Date().toISOString(),
    };

    let { error } = await client.from('profiles').upsert(updates);
    if (error) throw error;
  } catch (error) {
    console.log(error);
  }
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const client = useSupabaseClient();
  return useMutation((data: UpdateProfileData) => updateProfile(client, data), {
    onMutate: async (newProfileData) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(['userProfile', newProfileData.id]);

      // Snapshot the previous value
      const previousProfile = queryClient.getQueryData<UpdateProfileData>(['userProfile', newProfileData.id]);

      // Optimistically update to the new value
      queryClient.setQueryData(['userProfile', newProfileData.id], { ...previousProfile, ...newProfileData });

      // Return a context object with the snapshotted value
      return { previousProfile };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, newProfileData, context) => {
      queryClient.setQueryData(['userProfile', newProfileData.id], context.previousProfile);
    },
    // Always refetch after error or success:
    onSettled: (data, err, variables) => {
      queryClient.invalidateQueries(['userProfile', variables.id]);
    },
  });
}

const logout = async (client) => {
  const { error } = await client.auth.signOut();

  if (error) {
    throw error;
  }
};

export function useLogOut() {
  const queryClient = useQueryClient();
  const client = useSupabaseClient();
  const router = useRouter();
  return useMutation(() => logout(client), {
    onSuccess: () => {
      queryClient.removeQueries();
      router.push('/login');
    },
  });
}
