import * as React from 'react';

import { fetchUserProfile } from '@/lib/ssrApi';

import MainNavigation from './MainNavigation';

export default async function BaseLayout({ children }: React.PropsWithChildren) {
  const { data: user } = await fetchUserProfile();
  return (
    <div className="dark:bg-base-800 bg-base-100 flex flex-row h-full">
      <header>
        <MainNavigation user={user} />
      </header>
      <main className="flex-grow">{children}</main>
    </div>
  );
}
