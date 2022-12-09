'use client';
import { useUserProfile, useUpdateProfile, UpdateProfileData } from '@/lib/api';
import { Button, H2 } from 'ui/client-only';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormElementText } from '@/components/Form';
import AvatarForm from './AvatarForm';
const ProfileFormSchema = z.object({
  full_name: z.string().min(1).max(255),
  username: z.string().min(1).max(255),
  website: z.string().min(1).max(255),
});

export default function ProfileForm() {
  const { data, isLoading, isIdle, isError } = useUserProfile();
  const mutation = useUpdateProfile();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(ProfileFormSchema),
  });
  if (isLoading || isIdle) {
    return <div>Loading</div>;
  }
  if (isError || !data) {
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
          <Button type="submit" intent="primary">
            Save
          </Button>
        </div>
      </form>
    </>
  );
}
