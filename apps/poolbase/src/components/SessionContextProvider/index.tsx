'use client';
import { useState } from 'react';

import { createBrowserSupabaseClient, Session } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider as Provider } from '@supabase/auth-helpers-react';

export default function SessionContextProvider({ children, session }: React.PropsWithChildren<{ session: Session }>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <Provider supabaseClient={supabaseClient} initialSession={session}>
      {children}
    </Provider>
  );
}
