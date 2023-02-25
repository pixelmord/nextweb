export const scopeKeys = {
  all: ['resources'] as const,
  lists: () => [...scopeKeys.all, 'list'] as const,
  list: (filters: string) => [...scopeKeys.lists(), { filters }] as const,
  details: () => [...scopeKeys.all, 'detail'] as const,
  detail: (id: number) => [...scopeKeys.details(), id] as const,
};
export const resourceKeys = {
  all: ['resources'] as const,
  lists: () => [...resourceKeys.all, 'list'] as const,
  list: (filters: string) => [...resourceKeys.lists(), { filters }] as const,
  details: () => [...resourceKeys.all, 'detail'] as const,
  detail: (id: number) => [...resourceKeys.details(), id] as const,
};
export const tagKeys = {
  all: ['tags'] as const,
  lists: () => [...tagKeys.all, 'list'] as const,
  list: (filters: string) => [...tagKeys.lists(), { filters }] as const,
  details: () => [...tagKeys.all, 'detail'] as const,
  detail: (id: number) => [...tagKeys.details(), id] as const,
};
export const integrationKeys = {
  all: ['integrations'] as const,
  lists: () => [...integrationKeys.all, 'list'] as const,
  list: (filters: string) => [...integrationKeys.lists(), { filters }] as const,
  details: () => [...integrationKeys.all, 'detail'] as const,
  detail: (id: number) => [...integrationKeys.details(), id] as const,
};
