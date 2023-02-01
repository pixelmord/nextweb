'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button, H2 } from 'ui/client-only';

import { FormElementText } from '@/components/Form';
import { UpdateProfileData, useUpdateProfile, useUserProfile } from '@/lib/api';
import { Database, UserProfileData, UserProfileSchema } from '@/types';

import AvatarForm from './AvatarForm';

type Profiles = Database['public']['Tables']['profiles']['Row'];

export default function ProfileForm({ user }: { user: Profiles }) {
  const { data, isLoading, isIdle, isError } = useUserProfile({ initialData: user });
  const mutation = useUpdateProfile();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: user as UserProfileData,
  });
  if (isLoading || isIdle) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <AvatarForm
        url={data.avatar_url as string}
        uid={data.id as string}
        size={150}
        onUpload={(url) => {
          mutation.mutate({ ...data, avatar_url: url } as UpdateProfileData);
        }}
      />
      <form
        onSubmit={handleSubmit((values) => {
          mutation.mutate({ ...data, ...values } as UpdateProfileData);
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
    </>
  );
}
