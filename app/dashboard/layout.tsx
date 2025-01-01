import Link from 'next/link'
import type { Metadata } from 'next'
import { Logout } from '@/components/auth/Logout'
import { checkUnAuthenticated } from '@/lib/server/auth'

export const metadata: Metadata = {
  title: 'JWT Auth Rest API | Dashboard Pages',
}

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  await checkUnAuthenticated('/')

  return (
    <>
      <header className="bg-white border-b border-mercury">
        <nav>
          <div className="container h-16 flex items-center justify-between">
            <Link href="/">JWT Auth Rest API</Link>
            <Logout />
          </div>
        </nav>
      </header>
      <main className="py-10">
        <div className="container">{children}</div>
      </main>
    </>
  )
}
