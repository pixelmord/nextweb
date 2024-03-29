export const scopeKeys = {
  all: ['resources'] as const,
  lists: () => [...scopeKeys.all, 'list'] as const,
  list: (filters: string) => [...scopeKeys.lists(), { filters }] as const,
  details: () => [...scopeKeys.all, 'detail'] as const,
  detail: (id: string) => [...scopeKeys.details(), id] as const,
  allByUser: (uid: string) => [...scopeKeys.all, uid] as const,
  listsByUser: (uid: string) => [...scopeKeys.allByUser(uid), 'list'] as const,
  listByUser: (uid: string, filters: string) => [...scopeKeys.listsByUser(uid), { filters }] as const,
  detailsByUser: (uid: string) => [...scopeKeys.allByUser(uid), 'detail'] as const,
  detailByUser: (uid: string, id: string) => [...scopeKeys.detailsByUser(uid), id] as const,
};
export const resourceKeys = {
  all: ['resources'] as const,
  lists: () => [...resourceKeys.all, 'list'] as const,
  list: (filters: string) => [...resourceKeys.lists(), { filters }] as const,
  details: () => [...resourceKeys.all, 'detail'] as const,
  detail: (id: string) => [...resourceKeys.details(), id] as const,
  allByUser: (uid: string) => [...resourceKeys.all, uid] as const,
  listsByUser: (uid: string) => [...resourceKeys.allByUser(uid), 'list'] as const,
  listByUser: (uid: string, filters: string) => [...resourceKeys.listsByUser(uid), { filters }] as const,
  detailsByUser: (uid: string) => [...resourceKeys.allByUser(uid), 'detail'] as const,
  detailByUser: (uid: string, id: string) => [...resourceKeys.detailsByUser(uid), id] as const,
};
export const tagKeys = {
  all: ['tags'] as const,
  lists: () => [...tagKeys.all, 'list'] as const,
  list: (filters: string) => [...tagKeys.lists(), { filters }] as const,
  details: () => [...tagKeys.all, 'detail'] as const,
  detail: (id: string) => [...tagKeys.details(), id] as const,
  allByUser: (uid: string) => [...tagKeys.all, uid] as const,
  listsByUser: (uid: string) => [...tagKeys.allByUser(uid), 'list'] as const,
  listByUser: (uid: string, filters: string) => [...tagKeys.listsByUser(uid), { filters }] as const,
  detailsByUser: (uid: string) => [...tagKeys.allByUser(uid), 'detail'] as const,
  detailByUser: (uid: string, id: string) => [...tagKeys.detailsByUser(uid), id] as const,
};
export const integrationKeys = {
  all: ['integrations'] as const,
  lists: () => [...integrationKeys.all, 'list'] as const,
  list: (filters: string) => [...integrationKeys.lists(), { filters }] as const,
  details: () => [...integrationKeys.all, 'detail'] as const,
  detail: (id: string) => [...integrationKeys.details(), id] as const,
  allByUser: (uid: string) => [...integrationKeys.all, uid] as const,
  listsByUser: (uid: string) => [...integrationKeys.allByUser(uid), 'list'] as const,
  listByUser: (uid: string, filters: string) => [...integrationKeys.listsByUser(uid), { filters }] as const,
  detailsByUser: (uid: string) => [...integrationKeys.allByUser(uid), 'detail'] as const,
  detailByUser: (uid: string, id: string) => [...integrationKeys.detailsByUser(uid), id] as const,
};
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: string) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
  allByUser: (uid: string) => [...userKeys.all, uid] as const,
  listsByUser: (uid: string) => [...userKeys.allByUser(uid), 'list'] as const,
  listByUser: (uid: string, filters: string) => [...userKeys.listsByUser(uid), { filters }] as const,
  detailsByUser: (uid: string) => [...userKeys.allByUser(uid), 'detail'] as const,
  detailByUser: (uid: string, id: string) => [...userKeys.detailsByUser(uid), id] as const,
};
