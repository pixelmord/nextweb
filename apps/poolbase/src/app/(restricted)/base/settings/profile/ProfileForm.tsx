'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { useForm } from 'react-hook-form';
import { Database, UserProfileData, UserProfileSchema } from 'src/types';
import { Button } from 'ui';

import { FormElementText } from '@/components/Form';
import { UpdateProfileData, updateUserProfile, userAtom } from '@/lib/api';

type Profiles = Database['public']['Tables']['profiles']['Row'];

export default function ProfileFormWrapper() {
  const [profile] = useAtom(userAtom);
  const userProfile = profile?.data;
  if (!userProfile) {
    return null;
  }

  return <ProfileForm user={userProfile} />;
}
function ProfileForm({ user }: { user: Profiles }) {
  const [, mutate] = useAtom(updateUserProfile);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: user as UserProfileData,
  });

  return (
    <form
      onSubmit={handleSubmit((values) => {
        mutate([{ ...user, ...values } as UpdateProfileData]);
      })}
    >
      <FormElementText id="full_name" label="Full Name" {...register('full_name')} error={errors.full_name} />
      <FormElementText id="username" label="Username" {...register('username')} error={errors.username} />
      <FormElementText id="website" label="Website" {...register('website')} error={errors.website} />
      <div className="mt-8">
        <Button type="submit" intent="primary" disabled={!isValid}>
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  );
}
