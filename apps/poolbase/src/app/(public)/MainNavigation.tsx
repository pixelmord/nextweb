'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import type { Database } from 'src/types/supabase';
import { LinkButton } from 'ui';

type Profile = Database['public']['Tables']['profiles']['Row'];
const menuLinks = [{ href: '/#features', text: 'Features' }];

export default function MainNavigation({ user }: { user: null | Profile }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();
  return (
    <div className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="border-base-100 dark:border-base-700 flex items-center justify-between border-b-2 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="#">
              <span className="sr-only">Poolbase</span>
              <Image
                className="h-8 w-8"
                width="32"
                height="32"
                src="/images/icons/poolbase-icon.svg"
                alt="Your Company"
              />
            </a>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <button
              type="button"
              className="text-base-400 hover:bg-base-100 hover:text-base-500 focus:ring-accent-500 inline-flex items-center justify-center rounded-md bg-white p-2 focus:outline-none focus:ring-2 focus:ring-inset"
              aria-expanded="false"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              <FiMenu className="h-6 w-6" />
            </button>
          </div>
          <nav className="hidden space-x-10 md:flex">
            {menuLinks.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                className={`${
                  pathname === link.href
                    ? ' text-accent-900 hover:text-accent-700'
                    : 'text-base-500 hover:text-base-900 dark:text-base-100 dark:hover:text-base-300'
                }  text-base font-medium`}
              >
                {link.text}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            {!user ? (
              <LinkButton href="/#join-waitlist" intent="primary">
                Join Waitlist
              </LinkButton>
            ) : (
              <LinkButton href="/base" intent="primary">
                Dashboard
              </LinkButton>
            )}
          </div>
        </div>
      </div>

      <div
        className={`${
          mobileMenuOpen ? '' : 'hidden'
        } absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden`}
      >
        <div className="divide-base-50 divide-y-2 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="px-5 pt-5 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <Image
                  className="h-8 w-auto"
                  width="32"
                  height="32"
                  src="/images/icons/poolbase-icon.svg"
                  alt="Your Company"
                />
              </div>
              <div className="-mr-2">
                <button
                  type="button"
                  className="text-base-400 hover:bg-base-100 hover:text-base-500 focus:ring-accent-500 inline-flex items-center justify-center rounded-md bg-white p-2 focus:outline-none focus:ring-2 focus:ring-inset"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>

                  <FiX className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="mt-6">
              <nav className="grid gap-y-8">
                <a href="#" className="hover:bg-base-50 -m-3 flex items-center rounded-md p-3">
                  <span className="text-base-900 ml-3 text-base font-medium">Analytics</span>
                </a>
              </nav>
            </div>
          </div>
          <div className="space-y-6 py-6 px-5">
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              {menuLinks.map((link) => (
                <Link
                  href={link.href}
                  key={link.href}
                  className={`${
                    pathname === link.href
                      ? ' text-accent-900 hover:text-accent-700'
                      : ' text-base-900 hover:text-base-700'
                  }  text-base font-medium`}
                >
                  {link.text}
                </Link>
              ))}
            </div>
            <div>
              <Link
                href="/#join-waitlist"
                className="bg-accent-600 hover:bg-accent-700 flex w-full items-center justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm"
              >
                Join Waitlist
              </Link>
              <p className="text-base-500 mt-6 text-center text-base font-medium">
                Existing customer?
                <Link href="/login" className="text-accent-600 hover:text-accent-500">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
