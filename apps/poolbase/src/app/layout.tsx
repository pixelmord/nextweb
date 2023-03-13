import { Lato } from 'next/font/google';

import '@/styles/global.css';

import { Metadata } from 'next';

const lato = Lato({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-lato' });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${lato.variable} h-full dark:text-base-200`} lang="en">
      <body className="h-full flex flex-col">{children}</body>
    </html>
  );
}
// TODO: complete the set of meta defaults
export const metadata: Metadata = {
  title: {
    default: 'Poolbase',
    template: '%s | Poolbase',
  },
  description: 'Project tools for the future',
  icons: [
    { rel: 'shortcut icon', url: '/favicon.ico' },
    { rel: 'icon', url: '/static/icons/favicon-32x32.png', sizes: '32x32' },
    { rel: 'icon', url: '/static/icons/favicon-16x16.png', sizes: '16x16' },
    { rel: 'apple-touch-icon', url: '/static/icons/apple-touch-icon.png', sizes: '180x180' },
  ],
  manifest: '/manifest.json',
};
