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

  // fetch user with activities and coins
  const u = await prisma.user.findUnique({
    where: { id: userId },
    include: { activities: { orderBy: { createdAt: 'desc' } } }
  })
  if (!u) return res.status(404).json({ error: 'user not found' })
  // respond with a small payload: coins and recent activities
  res.json({ coins: u.coins, activities: u.activities || [] })
}
