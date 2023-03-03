'use client';

import { Disclosure } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX } from 'react-icons/fi';

const menuLinks = [{ href: '/recipes', text: 'Kochrezepte' }];

export default function Head() {
  const pathname = usePathname();
  return (
    <Disclosure as="nav" className="bg-white shadow dark:bg-black">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/">
                    <Image
                      className="block h-10 w-10 rounded-full"
                      src="/static/favicons/android-chrome-192x192.png"
                      width="40"
                      height="40"
                      alt="@pixelmord - Andreas Adam"
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {/* Current: "border-indigo-500 text-base-900", Default: "border-transparent text-base-500 hover:border-base-300 hover:text-base-700" */}
                  {menuLinks.map((link) => (
                    <Link
                      href={link.href}
                      key={link.href}
                      className={`${
                        pathname.startsWith(`${link.href}`)
                          ? 'border-accent-500 text-base-900 hover:text-base-900 dark:text-base-300 dark:hover:text-base-100 '
                          : 'text-base-900 hover:text-bse-800 dark:text-base-200 dark:hover:text-accent-400 border-transparent'
                      }  inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium `}
                    >
                      {link.text}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="text-base-400 hover:bg-base-100 hover:text-base-500 inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <FiX className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <FiMenu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-base-500 hover:bg-base-50 hover:border-base-300 hover:text-base-700" */}
              {menuLinks.map((link) => (
                <Disclosure.Button
                  as={Link}
                  href={link.href}
                  key={link.href}
                  className={`${
                    pathname.startsWith(`${link.href}`)
                      ? 'border-accent-500 bg-accent-50 text-base-900 hover:text-base-900 dark:bg-accent-800 dark:text-base-200 dark:hover:text-base-100'
                      : 'text-base-500 hover:border-base-300 hover:bg-base-50 dark:hover:bg-base-700 hover:text-base-700 dark:text-base-200 dark:hover:text-base-100 border-transparent'
                  }  block border-l-4 py-2 pl-3 pr-4 text-base font-medium`}
                >
                  {link.text}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
