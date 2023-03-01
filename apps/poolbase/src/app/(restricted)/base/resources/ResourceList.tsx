'use client';

import { useSession } from '@/lib/api/client';
import { useResourcesByUser } from '@/lib/api/client';

import ResourceItem from './ResourceItem';

export default function ResourceList() {
  const { data: session } = useSession();
  const { data: resources } = useResourcesByUser(session);
  return (
    <>
      {!!resources && resources.map(({ resource_id }) => <ResourceItem key={resource_id.id} resource={resource_id} />)}
      {resources?.length === 0 && <p>No resources found</p>}
    </>
  );
}
