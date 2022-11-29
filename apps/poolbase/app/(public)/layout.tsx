import Link from 'next/link';
import MainNavigation from './MainNavigation';
// import { fetchUserProfile, setSession } from '@/lib/ssrApi';
export default async function Layout({ children }: { children: React.ReactNode }) {
  // const data = await setSession();
  // const user = await fetchUserProfile();

  return (
    <>
      <MainNavigation user={null} />
      <main className="mx-auto max-w-7xl px-4 sm:px-6">{children}</main>

      <footer className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav>
          <Link href="/blog">Blog</Link>
        </nav>
      </footer>
    </>
  );
}
