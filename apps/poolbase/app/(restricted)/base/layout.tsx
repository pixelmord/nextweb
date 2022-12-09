import * as React from 'react';

import MainNavigation from './MainNavigation';
export default async function BaseLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="dark:bg-base-800 bg-base-100 flex h-full flex-col">
      <header>
        <MainNavigation />
      </header>
      <main className="flex-grow">{children}</main>
    </div>
  );
}
