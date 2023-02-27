'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { useForm } from 'react-hook-form';
import { Button } from 'ui';

import { FormElementText } from '@/components/Form';
import { saveIntegrationAtom } from '@/lib/api/client';
import { SaveIntegrationData } from '@/lib/api/fetchers';
import { Integration, IntegrationSchema } from '@/types';

export default function IntegrationForm({ initialData }: { initialData: Integration }) {
  const [, mutate] = useAtom(saveIntegrationAtom);
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
        mutate([{ ...initialData, ...values } as SaveIntegrationData]);
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
