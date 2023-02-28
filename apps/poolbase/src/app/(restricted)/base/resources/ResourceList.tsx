'use client';

import { H2 } from 'ui';

import { useSession } from '@/lib/api/client';
import { useResourcesByUser } from '@/lib/api/client';

export default function ResourceList() {
  const { data: session } = useSession();
  const { data: resources } = useResourcesByUser(session);
  return (
    <>
      {!!resources &&
        resources.map((star) => (
          <H2 key={star.resource_id.id} styling="h4">
            <a href={star.resource_id.url}>{star.resource_id.title}</a>
          </H2>
        ))}
      {resources?.length === 0 && <p>No resources found</p>}
    </>
  );
}
