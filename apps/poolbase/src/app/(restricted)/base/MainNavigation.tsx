'use client';

import { useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiBell, FiMenu, FiPackage, FiUser } from 'react-icons/fi';
import { Button } from 'ui';

import UserMenu from '@/components/UserMenu';
import { useLogOut, userAtom } from '@/lib/api';

const menuLinks = [
  { href: '/base', text: 'Dashboard' },
  { href: '/base/resources', text: 'Resources' },
];
const userLinks = [
  {
    href: '/base/settings/profile',
    text: 'Profile',
    icon: FiUser,
  },
  {
    href: '/base/settings/integrations',
    text: 'Integrations',
    icon: FiPackage,
  },
];
export default function MainNavigation() {
  const [profile] = useAtom(userAtom);
  const userProfile = profile?.data;
  const avatarUrl = userProfile?.avatar_url;
  const logoutMutation = useLogOut();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  if (logoutMutation.isSuccess) {
    router.push('/login');
  }
  const pathname = usePathname();
  return (
    <nav className="bg-base-800 dark:bg-base-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Image
                className="h-8 w-8"
                width="32"
                height="32"
                src="/images/icons/poolbase-icon.svg"
                alt="Your Company"
              />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {menuLinks.map((link) => (
                  <Link
                    href={link.href}
                    key={link.href}
                    className={`${
                      pathname === link.href
                        ? 'bg-base-900 text-white'
                        : 'text-base-200 hover:bg-base-700 hover:text-white'
                    } rounded-md px-3 py-2 text-sm font-medium`}
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                className="bg-base-800 text-base-400 focus:ring-offset-base-800 rounded-full p-1 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
              >
                <span className="sr-only">View notifications</span>
                <FiBell className="h-6 w-6" />
              </button>

              <div className="relative ml-3">
                <UserMenu links={userLinks} />
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              className="bg-base-800 text-base-400 hover:bg-base-700 focus:ring-offset-base-800 inline-flex items-center justify-center rounded-md p-2 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>

              <FiMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <div className={`${mobileMenuOpen ? '' : 'hidden'} md:hidden`} id="mobile-menu">
        <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
          {menuLinks.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className={`${
                pathname === link.href ? 'bg-base-900 text-white' : 'text-base-300 hover:bg-base-700 hover:text-white'
              }  block rounded-md px-3 py-2 text-base font-medium`}
            >
              {link.text}
            </Link>
          ))}
        </div>
        <div className="border-base-700 border-t pt-4 pb-3">
          <div className="flex items-center px-5">
            {!!userProfile && (
              <>
                <div className="flex-shrink-0">
                  {!!avatarUrl ? (
                    <Image
                      width="40"
                      height="40"
                      className="rounded-full"
                      priority
                      src={avatarUrl}
                      alt={userProfile.full_name || ''}
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-base-600 text-center text-base font-bold flex flex-col text-base-50 uppercase items-center justify-center">
                      <span>{userProfile?.username?.slice(0, 2)}</span>
                    </div>
                  )}
                </div>
                <div className="ml-3">
                  {!!userProfile.full_name && (
                    <div className="text-base font-medium leading-none text-white">{userProfile.full_name}</div>
                  )}
                  {!!userProfile.website && (
                    <div className="text-base-400 text-sm font-medium leading-none">{userProfile.website}</div>
                  )}
                </div>
              </>
            )}
            <button
              type="button"
              className="bg-base-800 text-base-400 focus:ring-offset-base-800 ml-auto flex-shrink-0 rounded-full p-1 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            >
              <span className="sr-only">View notifications</span>

              <FiBell className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-3 space-y-1 px-2">
            {userLinks.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                className={`${
                  pathname === link.href ? 'bg-base-900 text-white' : 'text-base-300 hover:bg-base-700 hover:text-white'
                }  block rounded-md px-3 py-2 text-base font-medium`}
              >
                {link.text}
              </Link>
            ))}
            <Button onClick={() => logoutMutation.mutate()}>Logout</Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
