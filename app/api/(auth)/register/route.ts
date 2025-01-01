import { z } from 'zod'
import bcrypt from 'bcrypt'
import { saveNewUser } from '@/lib/server/dummyDatabase'

const schema = z.object({
  username: z.string(),
  password: z.string().min(3),
})

export async function POST(request: Request) {
  const formData = await request.formData()

  const parsed = schema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    return Response.json({ success: false })
  }

  const { username, password } = parsed.data

  saveNewUser({
    username,
    password: bcrypt.hashSync(password, 10),
  })

  return Response.json({ success: true })
}
