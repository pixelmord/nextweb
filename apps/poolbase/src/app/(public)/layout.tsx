import Link from 'next/link';

import MainNavigation from './MainNavigation';

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-base-100 dark:bg-base-800 h-full">
      <MainNavigation />
      <main className="mx-auto max-w-7xl px-4 sm:px-6">{children}</main>

      <footer className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav>
          <Link href="/blog">Blog</Link>
        </nav>
      </footer>
    </div>
  );
}
