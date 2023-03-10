'use client';

import { QueryClient } from '@tanstack/react-query';

export * from './user';
export * from './resource';
export * from './scope';
export * from './integration';
export async function optimisticallyUpdateList<T extends Record<string, unknown> & { id: string }>(
  queryClient: QueryClient,
  listKey: readonly string[],
  newItem: T
) {
  await queryClient.cancelQueries(listKey);

  // Snapshot the previous value
  const previousList = queryClient.getQueryData<T[]>(listKey) || [];
  const newList = [...previousList];
  const scopeIndex = previousList.findIndex((item) => item.id === newItem.id);
  if (scopeIndex > -1) {
    newList[scopeIndex] = { ...previousList[scopeIndex], ...newItem };
  } else {
    newList.push(newItem);
  }

  // Optimistically update to the new value
  queryClient.setQueryData(listKey, newList);
  return previousList;
}
