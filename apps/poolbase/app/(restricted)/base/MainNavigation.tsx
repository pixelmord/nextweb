'use client';
import { useUserProfile, useLogOut, useProfileImage } from '@/lib/api';
import type { Database } from '@/types/supabase';
type Profiles = Database['public']['Tables']['profiles']['Row'];
import UserMenu from '@/components/UserMenu';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FiBell, FiMenu, FiUser, FiPackage } from 'react-icons/fi';
import { useState } from 'react';
import { Button } from 'ui';
const menuLinks = [{ href: '/base', text: 'Dashboard' }];
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
  const { data: userProfile, isLoading, isIdle, isError } = useUserProfile();
  const avatarUrl = useProfileImage(userProfile?.avatar_url as string);
  const logoutMutation = useLogOut();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  if (logoutMutation.isSuccess) {
    router.push('/login');
  }
  const pathname = usePathname();
  return (
    <nav className="bg-gray-800">
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
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
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
                className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
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
              className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
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
                pathname === link.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }  block rounded-md px-3 py-2 text-base font-medium`}
            >
              {link.text}
            </Link>
          ))}
        </div>
        <div className="border-t border-gray-700 pt-4 pb-3">
          <div className="flex items-center px-5">
            {!!userProfile && (
              <>
                <div className="flex-shrink-0">
                  {!!avatarUrl && (
                    <Image
                      width="40"
                      height="40"
                      className="rounded-full"
                      priority
                      src={avatarUrl}
                      alt={userProfile.full_name || ''}
                    />
                  )}
                </div>
                <div className="ml-3">
                  {!!userProfile.full_name && (
                    <div className="text-base font-medium leading-none text-white">{userProfile.full_name}</div>
                  )}
                  {!!userProfile.website && (
                    <div className="text-sm font-medium leading-none text-gray-400">{userProfile.website}</div>
                  )}
                </div>
              </>
            )}
            <button
              type="button"
              className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
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
                  pathname === link.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
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
