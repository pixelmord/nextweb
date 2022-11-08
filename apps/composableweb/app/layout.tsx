import { Archivo_Narrow, Barlow } from '@next/font/google'
import '@/styles/global.css'
import Link from 'next/link'
const archivo = Archivo_Narrow({subsets: ['latin'], variable: '--font-archivo'})
const barlow = Barlow({weight: '400', subsets: ['latin'], variable: '--font-barlow'})
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={`${archivo.variable} ${barlow.variable}`}>
      <body><header><nav><Link href="/writing">Writing</Link></nav></header><main>{children}</main></body>
    </html>
  )
}
