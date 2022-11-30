import QueryClientProvider from '@/components/QueryClientProvider';
import SessionContextProvider from '@/components/SessionContextProvider';
import { setSession } from '@/lib/ssrApi';
import { Session } from '@supabase/supabase-js';
export default async function RestrictedLayout({ children }: React.PropsWithChildren) {
  const data = await setSession();

  return (
    <SessionContextProvider session={data?.session as Session}>
      <QueryClientProvider>{children}</QueryClientProvider>
    </SessionContextProvider>
  );
}
