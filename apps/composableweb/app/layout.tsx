import { Archivo_Narrow, Barlow } from '@next/font/google'
import '@/styles/global.css'
import Link from 'next/link'
const archivo = Archivo_Narrow({subsets: ['latin']})
const barlow = Barlow({weight: '400', subsets: ['latin']})
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={`${archivo.className} ${barlow.className}`}>
      <body><header><nav><Link href="/writing">Writing</Link></nav></header><main>{children}</main></body>
    </html>
  )
}
