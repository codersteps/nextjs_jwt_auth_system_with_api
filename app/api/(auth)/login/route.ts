import { z } from 'zod'
import bcrypt from 'bcrypt'
import { addDays } from 'date-fns'
import { cookies } from 'next/headers'
import { signJWT } from '@/lib/server/jwt'
import { getUserByUsername } from '@/lib/server/database'

const schema = z.object({
  username: z.string(),
  password: z.string().min(3),
  remember: z
    .string()
    .transform((val) => val === 'on')
    .catch(false),
})

export async function POST(request: Request) {
  const formData = await request.formData()

  const parsed = schema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
    remember: formData.get('remember'),
  })

  if (!parsed.success) {
    return Response.json({ success: false })
  }

  const { username, password, remember } = parsed.data

  const user = await getUserByUsername(username)
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return Response.json({ success: false })
  }

  const token = await signJWT(
    { sub: `${user.id}` },
    { exp: remember ? '7d' : '1d' }
  )

  const cookieStore = await cookies()
  cookieStore.set('token', token, {
    path: '/',
    domain: process.env.APP_HOST || '',
    secure: true,
    expires: remember ? addDays(new Date(), 7) : addDays(new Date(), 1),
    httpOnly: true,
    sameSite: 'strict',
  })

  return Response.json({ success: true })
}
