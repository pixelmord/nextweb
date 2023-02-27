import type { AppProps } from 'next/app';
import { Lora } from 'next/font/google';

import '@/styles/global.css';

const lora = Lora({ subsets: ['latin'], variable: '--font-lora' });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div id="font-wrapper" className={`${lora.variable} bg-base-200 dark:bg-base-800 h-full`}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
