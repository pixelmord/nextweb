'use client';

import { z } from 'zod';

import { useSaveScope } from '@/lib/api/client';

import BaseForm from '../BaseForm';

const ScopeSchema = z.object({
  title: z.string().min(2), // renders TextField
});

export const ScopeForm: React.FC = () => {
  const { mutate } = useSaveScope();
  function onSubmit(data: z.infer<typeof ScopeSchema>) {
    // gets typesafe data when form is submitted
    mutate(data);
  }

  return (
    <BaseForm
      schema={ScopeSchema}
      onSubmit={onSubmit}
      renderAfter={() => <button type="submit">Submit</button>}
      // optional typesafe props forwarded to your components
    />
  );
};
export default ScopeForm;
