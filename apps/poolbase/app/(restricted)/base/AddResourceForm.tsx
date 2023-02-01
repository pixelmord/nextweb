'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button, H2 } from 'ui';
import { z } from 'zod';

import { FormElementText } from '@/components/Form';
import { Database } from '@/types';
import { ResourceSchema } from '@/types';

export type Integration = Database['public']['Tables']['resources']['Row'];

export default function AddResourceForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(ResourceSchema.pick({ url: true })),
  });
  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        const res = await fetch('/api/add-resource', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        if (!res.ok) {
          console.error('error');
        }
      })}
    >
      <FormElementText id="url" label="URL" {...register('url')} error={errors.url} />
      <div className="mt-8">
        <Button type="submit" intent="primary">
          Save
        </Button>
      </div>
    </form>
  );
}
