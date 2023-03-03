'use client';

import { Disclosure } from '@headlessui/react';
import { FiPlusSquare, FiXSquare } from 'react-icons/fi';

import ScopeForm from '@/components/ScopeForm';
import { useScopes } from '@/lib/api/client';

export default function ScopeList() {
  const { data: scopes } = useScopes();
  return (
    <div className="flex items-center">
      {!!scopes && scopes.map((scope) => <span key={scope.id}>{scope.title}</span>)}
      {scopes?.length === 0 && <span>No scopes found</span>}
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="inline-block ml-3">
              <span className="sr-only">Add New Scope</span>
              {open ? (
                <FiXSquare className="inline-block w-6 h-6" />
              ) : (
                <FiPlusSquare className="inline-block w-6 h-6" />
              )}
            </Disclosure.Button>
            <Disclosure.Panel className="px-4">
              <ScopeForm />
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
