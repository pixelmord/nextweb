import Link from 'next/link';
import { FiEdit } from 'react-icons/fi';
import { classNames } from 'utils';

export default function IntegrationListItem({ integration, actionIcon = FiEdit, href }) {
  const ActionIcon = actionIcon;
  return (
    <li key={integration.provider} className="col-span-1 flex rounded-md shadow-sm">
      <div
        className={classNames(
          integration.bgColor,
          'flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white'
        )}
      >
        <integration.icon className="h-5 w-5" />
      </div>
      <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-gray-200 bg-white">
        <div className="flex-1 truncate px-4 py-2 text-sm">
          <Link href={href} className="font-medium text-gray-900 hover:text-gray-600">
            {!!integration.display_name ? integration.display_name : integration.provider}
          </Link>
        </div>
        <div className="flex-shrink-0 pr-2">
          <Link
            href={href}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white bg-transparent text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="sr-only">Edit</span>
            <ActionIcon className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </li>
  );
}
