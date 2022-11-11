import { Lato } from '@next/font/google';
import '../styles/global.css';

const lato = Lato({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-lato' });
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${lato.variable}`}>
      <body>{children}</body>
    </html>
  );
}
