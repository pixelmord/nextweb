import { dehydrate } from '@tanstack/query-core';

import QueryClientProvider, { Hydrate } from '@/components/QueryClientProvider';
import SupabaseListener from '@/components/SupabaseListener';
import SupabaseProvider from '@/components/SupabaseProvider';
import Toaster from '@/components/Toaster';
import { userKeys } from '@/lib/api/client/queryKeys';
import { fetchUserProfileFactory } from '@/lib/api/fetchers';
import getQueryClient from '@/lib/getQueryClient';
import { createClient } from '@/lib/supabaseServerClient';

// do not cache this layout
export const revalidate = 0;
export default async function RestrictedLayout({ children }: React.PropsWithChildren) {
  const queryClient = getQueryClient();
  const supabase = createClient();
  const fetchUserProfile = fetchUserProfileFactory(supabase);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    await queryClient.prefetchQuery(['session'], () => Promise.resolve(session));
  }
  if (session?.user?.id) {
    const userProfile = await fetchUserProfile(session.user.id);
    await queryClient.prefetchQuery(userKeys.detail(session.user.id), () => Promise.resolve(userProfile));
  }
  const dehydratedState = dehydrate(queryClient);
  return (
    <div className="flex flex-col flex-grow grainy-bg dark:bg-base-900/75 bg-base-100/75">
      {' '}
      <SupabaseProvider>
        <SupabaseListener serverAccessToken={session?.access_token} />
        <QueryClientProvider>
          <Hydrate state={dehydratedState}>
            {children}
            <Toaster />
          </Hydrate>
        </QueryClientProvider>
      </SupabaseProvider>
    </div>
  );
}
