import { getSession } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import prisma from './prisma'
import { authOptions } from '../src/pages/api/auth/[...nextauth]'

export async function getServerUser(req, res) {
  // Prefer getServerSession (stable in API route context)
  let session = null
  try {
    session = await getServerSession(req, res, authOptions)
  } catch (_) {
    // fallback
    session = await getSession({ req })
  }
  if (!session?.user?.id) return null
  const id = parseInt(session.user.id)
  const user = await prisma.user.findUnique({ where: { id }, select: { id: true, email: true, name: true, isAdmin: true } })
  if (!user) return null
  return { id: user.id, email: user.email, name: user.name, isAdmin: user.isAdmin }
}

export default getServerUser
