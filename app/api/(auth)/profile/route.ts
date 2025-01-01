import { cookies } from 'next/headers'
import { getAuthenticatedUser } from '@/lib/server/auth'

export async function GET() {
  const user = await getAuthenticatedUser()

  if (!user) {
    /** Remove expired token from the user's browser  */
    const cookieStore = await cookies()
    cookieStore.set('token', '', {
      path: '/',
      domain: process.env.APP_HOST || '',
      secure: true,
      expires: new Date('0000'),
      httpOnly: true,
      sameSite: 'strict',
    })

    return Response.json({
      authUser: null,
    })
  }

  return Response.json({
    authUser: { ...user, password: undefined },
  })
}
