'use client'

import { AuthContext } from '@/context/auth.context'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useContext } from 'react'

export function Navbar() {
  const pathname = usePathname()
  const { authUser } = useContext(AuthContext)

  return (
    <nav className="bg-white border-b border-gray-300 py-4">
      <div className="container px-4 flex items-center gap-4">
        <Link
          className={`text-sm font-medium hover:text-sky-500 ${
            pathname === '/' ? 'text-sky-500' : ''
          }`}
          href="/"
        >
          Home
        </Link>
        {authUser && (
          <Link
            className="text-sm font-medium hover:text-sky-500"
            href="/dashboard"
          >
            Dashboard
          </Link>
        )}
        {!authUser && (
          <>
            <Link
              className={`text-sm font-medium hover:text-sky-500 ${
                pathname === '/login' ? 'text-sky-500' : ''
              }`}
              href="/login"
            >
              Login
            </Link>
            <Link
              className={`text-sm font-medium hover:text-sky-500 ${
                pathname === '/register' ? 'text-sky-500' : ''
              }`}
              href="/register"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
