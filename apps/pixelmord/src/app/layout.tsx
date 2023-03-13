import { Lato } from 'next/font/google';

import '@/styles/global.css';
import 'focus-visible';

import { Metadata } from 'next';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

const _modeScript = `
  let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  updateMode()
  darkModeMediaQuery.addEventListener('change', updateModeWithoutTransitions)
  window.addEventListener('storage', updateModeWithoutTransitions)

  function updateMode() {
    let isSystemDarkMode = darkModeMediaQuery.matches
    let isDarkMode = window.localStorage.isDarkMode === 'true' || (!('isDarkMode' in window.localStorage) && isSystemDarkMode)

    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    if (isDarkMode === isSystemDarkMode) {
      delete window.localStorage.isDarkMode
    }
  }

  function disableTransitionsTemporarily() {
    document.documentElement.classList.add('[&_*]:!transition-none')
    window.setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none')
    }, 0)
  }

  function updateModeWithoutTransitions() {
    disableTransitionsTemporarily()
    updateMode()
  }
`;
const lato = Lato({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-lato' });
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${lato.variable}`} lang="de">
      <body className="flex h-full flex-col bg-zinc-50 dark:bg-black">
        <div className="fixed inset-0 flex justify-center sm:px-8">
          <div className="flex w-full max-w-7xl lg:px-8">
            <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
          </div>
        </div>
        <div className="relative">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
export const metadata: Metadata = {
  title: {
    default: 'Andreas Adam - @pixelmord',
    template: '%s | Andreas Adam - @pixelmord',
  },
  description: 'Private Homepage von Andreas Adam mit Rezepten, Fotos und kreativen Experimenten',
  icons: [
    { rel: 'shortcut icon', url: '/favicon.ico' },
    { rel: 'icon', url: '/static/icons/favicon-32x32.png', sizes: '32x32' },
    { rel: 'icon', url: '/static/icons/favicon-16x16.png', sizes: '16x16' },
    { rel: 'apple-touch-icon', url: '/static/icons/apple-touch-icon.png', sizes: '180x180' },
  ],
  manifest: '/manifest.json',
};
