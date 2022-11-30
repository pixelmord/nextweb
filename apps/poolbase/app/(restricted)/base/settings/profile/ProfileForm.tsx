'use client';
import { useUserProfile, useUpdateProfile, UpdateProfileData } from '@/lib/api';
import { Button, H2 } from 'ui/client-only';
import { Formik, Form } from 'formik';
import { FormElementText } from '@/components/Form';
import AvatarForm from './AvatarForm';
export default function ProfileForm() {
  const { data, isLoading, isIdle, isError } = useUserProfile();
  const mutation = useUpdateProfile();

  if (isLoading || isIdle) {
    return <div>Loading</div>;
  }
  if (isError || !data) {
    return <div>Error</div>;
  }

  return (
    <div className="container">
      <H2>Edit your Profile </H2>
      <AvatarForm
        url={data.avatar_url as string}
        uid={data.id as string}
        size={150}
        onUpload={(url) => {
          mutation.mutate({ ...data, avatar_url: url } as UpdateProfileData);
        }}
      />
      <Formik
        initialValues={data}
        onSubmit={(values) => {
          mutation.mutate({ ...data, ...values } as UpdateProfileData);
        }}
      >
        <Form>
          <FormElementText id="full_name" label="Full Name" />
          <FormElementText id="username" label="Username" />
          <FormElementText id="website" label="Website" />
          <div className="mt-8">
            <Button type="submit">Save</Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
