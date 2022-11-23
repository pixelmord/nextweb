'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
const menuLinks = [{ href: '/#features', text: 'Features' }];
export default function MainNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();
  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="#">
              <span className="sr-only">Your Company</span>
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
              className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
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
                  pathname === link.href ? ' text-green-900 hover:text-green-700' : 'text-gray-500 hover:text-gray-900'
                }  text-base font-medium`}
              >
                {link.text}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            {/* <Link href="/login" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
              Sign in
            </Link> */}
            <Link
              href="/#join-waitlist"
              className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Join Waitlist
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`${
          mobileMenuOpen ? '' : 'hidden'
        } absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden`}
      >
        <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
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
                  className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>

                  <FiX className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="mt-6">
              <nav className="grid gap-y-8">
                <a href="#" className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50">
                  <span className="ml-3 text-base font-medium text-gray-900">Analytics</span>
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
                      ? ' text-green-900 hover:text-green-700'
                      : ' text-gray-900 hover:text-gray-700'
                  }  text-base font-medium`}
                >
                  {link.text}
                </Link>
              ))}
            </div>
            <div>
              <Link
                href="/#join-waitlist"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Join Waitlist
              </Link>
              <p className="mt-6 text-center text-base font-medium text-gray-500">
                Existing customer?
                <Link href="/login" className="text-indigo-600 hover:text-indigo-500">
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
