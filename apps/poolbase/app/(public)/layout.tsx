import Link from 'next/link';
import MainNavigation from './MainNavigation';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainNavigation />
      <main className="mx-auto max-w-7xl px-4 sm:px-6">{children}</main>

      <footer className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav>
          <Link href="/blog">Blog</Link>
        </nav>
      </footer>
    </>
  );
}
