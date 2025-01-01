import { AuthProvider } from '@/context/auth.context'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'JWT Auth Rest API | Public Pages',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
