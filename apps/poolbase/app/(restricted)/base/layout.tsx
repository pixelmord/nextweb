import * as React from 'react';
import MainNavigation from './MainNavigation';
export default async function BaseLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="h-full flex flex-col">
      <header>
        <MainNavigation />
      </header>
      <main className="flex-grow">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
