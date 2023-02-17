'use client';

import { useAtom } from 'jotai';
import { H2 } from 'ui';

import { resourcesAtom } from '@/lib/api';

export default function ResourceList() {
  const [resources] = useAtom(resourcesAtom);
  return (
    <>
      {!!resources.data &&
        resources.data.map((star) => (
          <div>
            <H2 key={star.resource_id.id} styling="h4">
              {star.resource_id.title}
            </H2>
          </div>
        ))}
    </>
  );
}
