'use client';

import { useScopes } from '@/lib/api/client';

export default function ScopeList() {
  const { data: scopes } = useScopes();
  return (
    <>
      {!!scopes && scopes.map((scope) => <span key={scope.id}>{scope.title}</span>)}
      {scopes?.length === 0 && <p>No scopes found</p>}
    </>
  );
}
