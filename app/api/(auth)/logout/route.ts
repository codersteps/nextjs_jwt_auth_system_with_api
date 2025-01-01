import { cookies } from 'next/headers'

export async function POST() {
  const cookieStore = await cookies()
  cookieStore.set('token', '', {
    path: '/',
    domain: process.env.APP_HOST || '',
    secure: true,
    expires: new Date('0000'),
    httpOnly: true,
    sameSite: 'strict',
  })

  return new Response()
}
