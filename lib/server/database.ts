import 'server-only'
import { join } from 'node:path'
import { readFile, writeFile } from 'node:fs/promises'

type User = {
  id: number
  username: string
  password: string
}

type Database = { users: User[] }

export type SafeUser = Omit<User, 'password'>

const databasePath = join(process.cwd(), 'lib/server/database.json')

async function readDatabase(): Promise<Database> {
  return JSON.parse(await readFile(databasePath, { encoding: 'utf8' }))
}

async function writeToDatabase(database: Database) {
  await writeFile(databasePath, JSON.stringify(database))
}

export async function getUserById(id: number): Promise<User | null> {
  const database = await readDatabase()
  return database.users.find((user) => user.id === id) || null
}

export async function getUserByUsername(
  username: string
): Promise<User | null> {
  const database = await readDatabase()
  return database.users.find((user) => user.username === username) || null
}

export async function saveNewUser(user: Omit<User, 'id'>) {
  const database = await readDatabase()
  const recentUser = database.users.slice(-1).pop()
  const id = recentUser ? recentUser.id + 1 : 1

  database.users.push({ id, ...user })

  await writeToDatabase(database)
}
