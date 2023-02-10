'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';

export const MainNavigation = ({ links }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();

  return (
    <nav className="relative mx-auto w-[90%] md:w-[80%]">
      <button
        type="button"
        className="absolute right-0 bottom-[calc(100%+10px)] lg:hidden text-base-400 hover:bg-base-100 hover:text-base-500 focus:ring-accent-500 inline-flex items-center justify-center  p-2 focus:outline-none focus:ring-2 focus:ring-inset"
        aria-expanded="false"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <span className="sr-only">Open menu</span>
        <FiMenu className="h-6 w-6" />
      </button>
      <div className={`${mobileMenuOpen ? 'block' : 'sr-only'} lg:block lg:not-sr-only mx-auto`}>
        {links.map((link) => (
          <Link
            href={link.href}
            key={link.href}
            className={`${
              pathname === link.href
                ? 'text-accent-900 hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-500 border-accent-500/50'
                : 'text-base-500 hover:text-base-900 dark:text-base-100 dark:hover:text-accent-200 border-accent-50/25'
            } font-medium align-middle block border-b pb-3 mb-3 last:border-transparent`}
          >
            {link.text}
          </Link>
        ))}
      </div>
    </nav>
  );
};
export default MainNavigation;
