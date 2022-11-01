import { Archivo_Narrow, Barlow } from '@next/font/google'
import '../styles/global.css'
const archivo = Archivo_Narrow({subsets: ['latin']})
const barlow = Barlow({weight: '400', subsets: ['latin']})
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={`${archivo.className} ${barlow.className}`}>
      <body>{children}</body>
    </html>
  )
}
