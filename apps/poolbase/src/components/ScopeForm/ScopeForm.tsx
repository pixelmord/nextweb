'use client';

import { FiSave } from 'react-icons/fi';
import { Button } from 'ui';
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
      formProps={{ className: 'flex' }}
      onSubmit={onSubmit}
      renderAfter={() => (
        <Button type="submit" className="ml-3 flex-grow-0">
          <span className="sr-only">Save</span>
          <FiSave aria-hidden />
        </Button>
      )}
      // optional typesafe props forwarded to your components
    />
  );
};
export default ScopeForm;
