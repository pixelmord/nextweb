'use client';

import { Button, H2 } from 'ui';
import { Formik, Form } from 'formik';
import { FormElementText } from '@/components/Form';
import { Database } from '@/types';
export type Integration = Database['public']['Tables']['integrations']['Row'];

export default function IntegrationForm({ initialData }: { initialData: Integration }) {
  return (
    <div className="container">
      <H2>Edit your Profile </H2>
      <Formik initialValues={initialData} onSubmit={(values) => {}}>
        <Form>
          <FormElementText id="display_name" label="Display Name" />
          <FormElementText id="provider" label="Provider" />
          <FormElementText id="api_username" label="Provider Username" />
          <FormElementText id="access_token" label="Access Token" />
          <div className="mt-8">
            <Button type="submit">Save</Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
