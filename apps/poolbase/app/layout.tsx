import { Lato } from '@next/font/google'
import '@/styles/global.css'
import Link from 'next/link'
const lato = Lato({weight: ['400', '700'], subsets: ['latin']})
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={`${lato.className}`}>
      <body><header><nav><Link href="/blog">Blog</Link></nav></header><main>{children}</main></body>
    </html>
  )
}
