'use client';

import { QueryClientProvider as QCProvider, Hydrate as QHydrate, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClientAtom } from 'jotai-tanstack-query';
import { Provider } from 'jotai/react';
import { useHydrateAtoms } from 'jotai/react/utils';

export const Hydrate = ({ children, state }) => {
  return <QHydrate state={state}>{children}</QHydrate>;
};
const queryClient = new QueryClient();
const HydrateAtoms = ({ children }) => {
  useHydrateAtoms([[queryClientAtom, queryClient]] as const);
  return children;
};

export default function QueryClientProvider({ children }: React.PropsWithChildren) {
  return (
    <QCProvider client={queryClient}>
      <Provider>
        <HydrateAtoms>{children}</HydrateAtoms>
      </Provider>
      <ReactQueryDevtools />
    </QCProvider>
  );
}
