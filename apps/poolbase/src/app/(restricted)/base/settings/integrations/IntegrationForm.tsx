'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Database } from 'src/types';
import { IntegrationSchema } from 'src/types';
import { Button, H2 } from 'ui';
import { z } from 'zod';

import { FormElementText } from '@/components/Form';
import supabase from '@/lib/supabaseBrowserClient';

export type Integration = Database['public']['Tables']['integrations']['Row'];

export default function IntegrationForm({ initialData }: { initialData: Integration }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(IntegrationSchema),
    defaultValues: initialData,
  });
  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        console.log(values);
        const { error } = await supabase.from('integrations').upsert(values);
        if (error) {
          console.error(error);
        }
      })}
    >
      <FormElementText
        id="display_name"
        label="Display Name"
        {...register('display_name')}
        error={errors.display_name}
      />
      <FormElementText id="provider" label="Provider" disabled {...register('provider')} error={errors.provider} />
      <FormElementText
        id="api_username"
        label="Provider Username"
        {...register('api_username')}
        error={errors.api_username}
      />
      <FormElementText
        id="access_token"
        label="Access Token"
        {...register('access_token')}
        error={errors.access_token}
      />
      <div className="mt-8">
        <Button type="submit" intent="primary">
          Save
        </Button>
      </div>
    </form>
  );
}
