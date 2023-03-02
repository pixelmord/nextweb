'use client';

import { useEffect, useState } from 'react';

import { useProcessResource, useSession } from '@/lib/api/client';
import { useResourcesByUser } from '@/lib/api/client';

import ResourceItem from './ResourceItem';

export default function ResourceList() {
  const { data: session } = useSession();
  const { data: resources } = useResourcesByUser(session);
  const { mutate } = useProcessResource(session?.user.id);

  useEffect(() => {
    const index = resources?.findIndex((r) => !r.processed || !r.processed.includes('html'));
    if (index && index > -1) {
      mutate(resources![index]);
    }
  }, [resources, mutate]);
  return (
    <>
      {!!resources && resources.map((resource) => <ResourceItem key={resource.id} resource={resource} />)}
      {resources?.length === 0 && <p>No resources found</p>}
    </>
  );
}
