import { Lora } from '@next/font/google';
import '@/styles/global.css';
import Link from 'next/link';
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' });
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${lora.variable}`}>
      <body>
        <header>
          <nav>
            <Link href="/blog">Blog</Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
