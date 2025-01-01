import 'server-only'
import { verifyJWT } from './jwt'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getUserById, SafeUser } from './dummyDatabase'

/**
 * Redirect when a user is unauthenticated
 */
export async function checkUnAuthenticated(url: string = '/') {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')

  if (!token || !token.value) {
    redirect(url)
  }

  const jwtPayload = await verifyJWT(token.value)
  if (jwtPayload === false) {
    redirect(url)
  }
}

/**
 * Redirect when a user is authenticated
 */
export async function checkAuthenticated(url: string = '/login') {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')

  if (token && token.value) {
    const jwtPayload = await verifyJWT(token.value)
    if (jwtPayload !== false) {
      redirect(url)
    }
  }
}

/**
 * Get authenticated user from cookie token
 */
export async function getAuthenticatedUser(): Promise<SafeUser | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')

  if (!token || !token.value) {
    return null
  }

  const jwtPayload = await verifyJWT(token.value)
  if (jwtPayload === false || !jwtPayload.sub) {
    return null
  }

  return getUserById(+jwtPayload.sub) || null
}
