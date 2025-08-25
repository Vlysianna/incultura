import prisma from '../../../../lib/prisma'
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { name, email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'email and password required' })
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) return res.status(400).json({ error: 'user already exists' })
  const hashed = await bcrypt.hash(password, 10)
  const u = await prisma.user.create({ data: { name, email, password: hashed, coins: 0 } })
  res.json({ id: u.id, email: u.email })
}
