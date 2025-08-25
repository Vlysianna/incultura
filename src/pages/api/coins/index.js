import prisma from '../../../../lib/prisma'
import getServerUser from '../../../../lib/getServerUser'

export default async function handler(req, res) {
  const queryUserId = req.query.userId
  let userId
  if (queryUserId) userId = parseInt(queryUserId)
  else {
    const user = await getServerUser(req)
    if (!user) return res.status(401).json({ error: 'Authentication required' })
    userId = user.id
  }

  const user = await prisma.user.findUnique({ where: { id: userId }, select: { coins: true }, include: { activities: { orderBy: { createdAt: 'desc' } } } })
  if (!user) return res.status(404).json({ error: 'user not found' })
  res.json(user)
}
