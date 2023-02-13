'use client';
import { QueryClient, QueryClientProvider as Provider } from 'react-query';

const queryClient = new QueryClient();

export default function QueryClientProvider({ children }: React.PropsWithChildren) {
  return <Provider client={queryClient}>{children}</Provider>;
}
