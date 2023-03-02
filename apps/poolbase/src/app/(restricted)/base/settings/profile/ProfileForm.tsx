'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from 'ui';

import { FormElementText } from '@/components/Form';
import { useSession } from '@/lib/api/client';
import { useUpdateUserProfile, useUser } from '@/lib/api/client';
import { UpdateProfileData } from '@/lib/api/fetchers';
import { Profile, UserProfileSchema } from '@/types';

export default function ProfileFormWrapper() {
  const { data: session } = useSession();
  const { data: userProfile } = useUser(session);
  if (!userProfile) {
    return null;
  }

  return <ProfileForm user={userProfile} />;
}
function ProfileForm({ user }: { user?: Profile }) {
  const { mutate } = useUpdateUserProfile();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: user,
  });

  return (
    <form
      onSubmit={handleSubmit((values) => {
        mutate({ ...user, ...values } as UpdateProfileData);
      })}
    >
      <pre>{JSON.stringify(errors, null, 2)}</pre>
      <pre>{isValid + ''}</pre>
      <FormElementText id="full_name" label="Full Name" {...register('full_name')} error={errors.full_name} />
      <FormElementText id="username" label="Username" {...register('username')} error={errors.username} />
      <FormElementText id="website" label="Website" {...register('website')} error={errors.website} />
      <div className="mt-8">
        <Button type="submit" intent="primary" disabled={!isValid} submitting={isSubmitting}>
          Save
        </Button>
      </div>
    </form>
  );
}
