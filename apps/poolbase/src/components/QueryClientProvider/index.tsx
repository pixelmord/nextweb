'use client';

import { QueryClientProvider as QCProvider, Hydrate as QHydrate, QueryCache, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClientAtom } from 'jotai-tanstack-query';
import { Provider } from 'jotai/react';
import { useHydrateAtoms } from 'jotai/react/utils';
import toast from 'react-hot-toast';

export const Hydrate = ({ children, state }) => {
  return <QHydrate state={state}>{children}</QHydrate>;
};
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: Error) => {
      const message = error.message ? error.message : 'server data error';
      toast.error(`Something went wrong: ${message}`);
    },
  }),
});
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
