'use client';

import { useAtom } from 'jotai';
import { H2 } from 'ui';

import { resourcesAtom } from '@/lib/api/client';

export default function ResourceList() {
  const [resources] = useAtom(resourcesAtom);
  return (
    <>
      {!!resources &&
        resources.map((star) => (
          <H2 key={star.resource_id.id} styling="h4">
            <a href={star.resource_id.url}>{star.resource_id.title}</a>
          </H2>
        ))}
      {resources.length === 0 && <p>No resources found</p>}
    </>
  );
}
