'use client'

import { SafeUser } from '@/lib/server/dummyDatabase'
import { createContext, ReactNode, useEffect, useState } from 'react'

type Props = {
  children: ReactNode
}

type AuthState = {
  authUser: SafeUser | null
}

export const AuthContext = createContext<AuthState>({ authUser: null })

export function AuthProvider({ children }: Props) {
  const [authUser, setAuthUser] = useState<SafeUser | null>(null)

  useEffect(() => {
    fetch('/api/profile', { cache: 'no-store' })
      .then((res) => res.json())
      .then((json: { authUser: SafeUser | null }) => {
        setAuthUser(json.authUser)
      })
      .catch(() => {
        console.error('Sorry! something went wrong.')
      })
  }, [])

  return (
    <AuthContext.Provider value={{ authUser }}>{children}</AuthContext.Provider>
  )
}
