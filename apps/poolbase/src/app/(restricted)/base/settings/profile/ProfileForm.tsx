'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Database, UserProfileData, UserProfileSchema } from 'src/types';
import { Button } from 'ui';

import { FormElementText } from '@/components/Form';
import { UpdateProfileData, useUpdateProfile, useUserProfile } from '@/lib/api';

type Profiles = Database['public']['Tables']['profiles']['Row'];

export default function ProfileFormWrapper({ user }: { user: Profiles }) {
  const { data, isLoading, isIdle, isError } = useUserProfile({ initialData: user });
  if (isLoading || isIdle) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return <ProfileForm user={data} />;
}
function ProfileForm({ user }: { user: Profiles }) {
  const mutation = useUpdateProfile();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: user as UserProfileData,
  });

  return (
    <form
      onSubmit={handleSubmit((values) => {
        mutation.mutate({ ...user, ...values } as UpdateProfileData);
      })}
    >
      <FormElementText id="full_name" label="Full Name" {...register('full_name')} error={errors.full_name} />
      <FormElementText id="username" label="Username" {...register('username')} error={errors.username} />
      <FormElementText id="website" label="Website" {...register('website')} error={errors.website} />
      <div className="mt-8">
        <Button type="submit" intent="primary" disabled={!isValid}>
          Save
        </Button>
      </div>
    </form>
  );
}
