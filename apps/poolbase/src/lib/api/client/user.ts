'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { createClient } from '../../supabaseBrowserClient';
import { UpdateProfileData, fetchUserProfileFactory, logoutFactory, updateProfileFactory } from '../fetchers';
import { userKeys } from './queryKeys';

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
      const uid = newProfileData.id;
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(userKeys.detail(uid as string));

      // Snapshot the previous value
      const previousProfile = queryClient.getQueryData<UpdateProfileData>(userKeys.detail(uid as string));

      // Optimistically update to the new value
      queryClient.setQueryData(userKeys.detail(uid as string), { ...previousProfile, ...newProfileData });

      // Return a context object with the snapshotted value
      return { previousProfile };
    },

    onError: (err, newProfileData: UpdateProfileData, context: { previousProfile: UpdateProfileData }) => {
      const uid = newProfileData.id;
      queryClient.setQueryData(userKeys.detail(uid as string), context.previousProfile);
      queryClient.invalidateQueries(userKeys.detail(uid as string));
    },
    // Always refetch after error or success:
    onSuccess: () => {
      return queryClient.invalidateQueries(userKeys.all);
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
