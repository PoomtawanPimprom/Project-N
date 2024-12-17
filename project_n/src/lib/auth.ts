import { randomBytes } from 'crypto'

export async function generateResetToken(): Promise<{token: string, expires: Date}> {
  const token = randomBytes(32).toString('hex')
  const expires = new Date(Date.now() + 3600000) // Token expires in 1 hour
  
  return { token, expires }
}