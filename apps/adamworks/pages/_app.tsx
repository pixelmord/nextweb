import { Lora } from '@next/font/google';
import '@/styles/global.css';
import type { AppProps } from 'next/app';
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${lora.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
