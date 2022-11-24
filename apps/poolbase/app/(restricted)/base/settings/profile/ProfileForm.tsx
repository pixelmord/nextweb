'use client';
import { useUserProfile, useUpdateProfile } from '@/lib/api';
import { H2 } from 'ui';
import { Formik, Form } from 'formik';
import { Button, FormElementText } from '@/components/Form';
import AvatarForm from './AvatarForm';
export default function ProfileForm() {
  const { data, isLoading, isIdle, isError } = useUserProfile();
  const mutation = useUpdateProfile();

  if (isLoading || isIdle) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="container">
      <H2>Edit your Profile </H2>
      <AvatarForm
        url={data.avatar_url}
        uid={data.id}
        size={150}
        onUpload={(url) => {
          mutation.mutate({ ...data, avatar_url: url });
        }}
      />
      <Formik
        initialValues={data}
        onSubmit={(values) => {
          mutation.mutate({ ...data, ...values });
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
