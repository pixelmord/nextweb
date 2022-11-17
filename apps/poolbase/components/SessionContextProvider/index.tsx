'use client';
import { useState } from 'react';

import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider as Provider } from '@supabase/auth-helpers-react';

export default function SessionContextProvider({ children }: React.PropsWithChildren) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return <Provider supabaseClient={supabaseClient}>{children}</Provider>;
}
