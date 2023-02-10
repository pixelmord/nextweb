import { Archivo_Narrow, Barlow } from '@next/font/google';

import '@/styles/global.css';

import Image from 'next/image';
import Link from 'next/link';

import config from '@/config';

import MainNavigation from './MainNavigation';

const archivo = Archivo_Narrow({ subsets: ['latin'], variable: '--font-archivo' });
const barlow = Barlow({ weight: '400', subsets: ['latin'], variable: '--font-barlow' });
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${archivo.variable} ${barlow.variable} h-full`}>
      <body className="flex flex-col lg:flex-row bg-base-50 dark:bg-base-800 h-full">
        <header className="relative shrink-0 w-full lg:w-[350px] xl:w-[450px]">
          <div className="bg-primary-200 dark:bg-primary-900/25 flex flex-col relative lg:fixed justify-start lg:justify-between  h-full top-0 left-0 bottom-0 z-10  w-full lg:w-[350px] xl:w-[450px]">
            <div className="flex flex-row lg:flex-col lg:text-center lg:m-1 lg:mt-5 h-[60px] lg:h-auto opacity-75 items-center">
              <Link href="/" className="inline-block mr-1 sm:mr-4 lg:mr-0 ">
                <Image
                  src="/static/favicons/android-chrome-192x192.png"
                  alt={config.common.title}
                  width={192}
                  height={192}
                  className="inline-block w-12 lg:w-[160px]"
                />
              </Link>
              <h2 className="text-base-800 dark:text-base-100 lg:my-0 leading-tight font-headline text-base lg:text-4xl">
                {config.common.title.toLowerCase()}
              </h2>
              <h3 className="text-base-800 dark:text-base-100 hidden lg:block leading-tight font-headline text-xs lg:text-xl">
                {config.common.tagline}
              </h3>
            </div>
            <MainNavigation links={config.links} />
          </div>
        </header>
        <main className="flex flex-grow">{children}</main>
      </body>
    </html>
  );
}
