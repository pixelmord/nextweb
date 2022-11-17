import QueryClientProvider from '@/components/QueryClientProvider';
import SessionContextProvider from '@/components/SessionContextProvider';
export default async function RestrictedLayout({ children }: React.PropsWithChildren) {
  return (
    <SessionContextProvider>
      <QueryClientProvider>{children}</QueryClientProvider>
    </SessionContextProvider>
  );
}
