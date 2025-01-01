import type { Metadata } from 'next'
import { checkAuthenticated } from '@/lib/server/auth'
import { Navbar } from '@/components/common/Navbar'

export const metadata: Metadata = {
  title: 'JWT Auth Rest API | Guest Pages',
}

export default async function GuestLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  await checkAuthenticated('/dashboard')
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="py-10">
        <div className="container px-3">{children}</div>
      </main>
    </div>
  )
}
