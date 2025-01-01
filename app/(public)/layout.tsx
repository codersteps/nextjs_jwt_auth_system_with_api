import { Navbar } from '@/components/common/Navbar'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <header className="bg-gray-100">
        <Navbar />
      </header>
      <main className="py-10">
        <div className="container px-3 space-y-8">{children}</div>
      </main>
    </>
  )
}
