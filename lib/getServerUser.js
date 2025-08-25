import { getSession } from 'next-auth/react'
import prisma from './prisma'

export async function getServerUser(req) {
  const session = await getSession({ req })
  if (!session?.user?.id) return null
  const id = parseInt(session.user.id)
  const user = await prisma.user.findUnique({ where: { id }, select: { id: true, email: true, name: true, isAdmin: true } })
  if (!user) return null
  return { id: user.id, email: user.email, name: user.name, isAdmin: user.isAdmin }
}

export default getServerUser
