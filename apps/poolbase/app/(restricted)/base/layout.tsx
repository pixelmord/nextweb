import * as React from 'react';

import MainNavigation from './MainNavigation';
export default async function BaseLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex h-full flex-col bg-slate-100">
      <header>
        <MainNavigation />
      </header>
      <main className="flex-grow">{children}</main>
    </div>
  );
}
