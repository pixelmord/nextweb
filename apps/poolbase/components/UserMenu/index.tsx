'use client';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Fragment } from 'react';

import { usePathname } from 'next/navigation';
import { useLogOut, useProfileImage, useUserProfile } from '@/lib/api';
import Image from 'next/image';
import { IconType } from 'react-icons';
import { Button } from 'ui';

export default function UserMenu({ links }: { links: { href: string; text: string; icon: IconType }[] }) {
  const pathname = usePathname();
  const { data: userProfile, isLoading, isIdle, isError } = useUserProfile();
  const avatarUrl = useProfileImage(userProfile?.avatar_url);
  const logoutMutation = useLogOut();
  return (
    <Menu as="div">
      <div>
        <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="sr-only">Open user menu</span>
          {!!avatarUrl && !!userProfile && (
            <Image
              className="h-8 w-8 rounded-full"
              src={avatarUrl}
              alt={userProfile.full_name}
              width="32"
              height="32"
            />
          )}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {links.map((link) => (
            <Menu.Item key={link.href}>
              {({ active }) => (
                <Link
                  href={link.href}
                  className={`${
                    active || pathname === link.href ? 'bg-violet-500 text-white' : 'text-gray-700'
                  } group flex px-4 py-2 text-sm `}
                >
                  <link.icon className="mr-2 h-5 w-5" aria-hidden="true" />
                  {link.text}
                </Link>
              )}
            </Menu.Item>
          ))}
          <Menu.Item>
            <Button onClick={() => logoutMutation.mutate()}>Logout</Button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
