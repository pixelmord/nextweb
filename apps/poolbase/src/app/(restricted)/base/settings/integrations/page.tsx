import PageHeader from '@/components/PageHeader';
import Link from 'next/link';
import { Container, H1, H2 } from 'ui';
import { FiEdit, FiGithub, FiPlusSquare } from 'react-icons/fi';
import { RxNotionLogo } from 'react-icons/rx';
import { CgLinear } from 'react-icons/cg';

const availableIntegrations = [
  { provider: 'github', icon: FiGithub, setupUrl: 'https://', bgColor: 'bg-gray-800' },
  { provider: 'linear', icon: CgLinear, setupUrl: 'https://', bgColor: 'bg-indigo-600' },
  { provider: 'notion', icon: RxNotionLogo, setupUrl: 'https://', bgColor: 'bg-gray-500' },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
export default async function Integrations() {
  return (
    <>
      <PageHeader>
        <H1>Integrations</H1>
      </PageHeader>
      <Container>
        <H2 className="mt-6">Your Integrations</H2>
        <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {availableIntegrations.map((integration) => (
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
                  <Link
                    href={`/base/settings/integrations/add/${integration.provider}`}
                    className="font-medium text-gray-900 hover:text-gray-600"
                  >
                    {integration.provider}
                  </Link>
                </div>
                <div className="flex-shrink-0 pr-2">
                  <button
                    type="button"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white bg-transparent text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">Edit</span>
                    <FiPlusSquare className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
