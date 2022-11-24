import QueryClientProvider from '@/components/QueryClientProvider';
import SessionContextProvider from '@/components/SessionContextProvider';
import { setSession } from '@/lib/ssrApi';
export default async function RestrictedLayout({ children }: React.PropsWithChildren) {
  const data = await setSession();

  return (
    <SessionContextProvider session={data?.session}>
      <QueryClientProvider>{children}</QueryClientProvider>
    </SessionContextProvider>
  );
}
