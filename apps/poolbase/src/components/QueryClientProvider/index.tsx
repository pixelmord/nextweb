'use client';

import { QueryClientProvider as QCProvider, Hydrate as QHydrate, QueryCache, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import toast from 'react-hot-toast';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: Error) => {
      const message = error.message ? error.message : 'server data error';
      toast.error(`Something went wrong: ${message}`);
    },
  }),
});

export const Hydrate = ({ children, state }) => {
  return <QHydrate state={state}>{children}</QHydrate>;
};

export default function QueryClientProvider({ children }: React.PropsWithChildren) {
  return (
    <QCProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QCProvider>
  );
}
