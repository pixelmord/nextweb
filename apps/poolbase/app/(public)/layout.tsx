import 'server-only';

import Link from 'next/link';

import { fetchUserProfile } from '@/lib/ssrApi';

import MainNavigation from './MainNavigation';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const { data: user } = await fetchUserProfile();

  return (
    <div className="bg-base-100 dark:bg-base-800 h-full">
      <MainNavigation user={user} />
      <main className="mx-auto max-w-7xl px-4 sm:px-6">{children}</main>

      <footer className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav>
          <Link href="/blog">Blog</Link>
        </nav>
      </footer>
    </div>
  );
}
