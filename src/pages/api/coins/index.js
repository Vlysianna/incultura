import prisma from '../../../../lib/prisma'
import getServerUser from '../../../../lib/getServerUser'

export default async function handler(req, res) {
  try {
    const queryUserId = req.query.userId
    let userId
    if (queryUserId) userId = parseInt(queryUserId)
    else {
      const user = await getServerUser(req, res)
      if (!user) return res.status(401).json({ error: 'Authentication required' })
      userId = user.id
    }

    const u = await prisma.user.findUnique({
      where: { id: userId },
      include: { activity: { orderBy: { createdAt: 'desc' } } }
    })
    if (!u) return res.status(404).json({ error: 'user not found' })
    return res.json({ coins: u.coins, activities: u.activity || [] })
  } catch (e) {
    console.error('Coins API error', e)
    return res.status(500).json({ error: 'internal server error' })
  }
}
