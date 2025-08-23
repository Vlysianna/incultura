import prisma from '../../../../../lib/prisma'

export default async function handler(req, res) {
  const top = await prisma.user.findMany({ orderBy: { coins: 'desc' }, take: 20, select: { id: true, name: true, email: true, coins: true } })
  res.json(top)
}
