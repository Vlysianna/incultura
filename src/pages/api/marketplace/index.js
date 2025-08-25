import prisma from '../../../../lib/prisma'
import getServerUser from '../../../../lib/getServerUser'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const items = await prisma.merchandise.findMany()
    return res.json(items)
  }
  if (req.method === 'POST') {
  const user = await getServerUser(req)
  if (!user) return res.status(401).json({ error: 'Authentication required' })
  const userId = user.id
    const { itemId } = req.body
    if (!itemId) return res.status(400).json({ error: 'itemId required' })
  const item = await prisma.merchandise.findUnique({ where: { id: itemId } })
  if (!item) return res.status(404).json({ error: 'item not found' })
  const dbUser = await prisma.user.findUnique({ where: { id: userId } })
  if (!dbUser) return res.status(404).json({ error: 'user not found' })
  if (dbUser.coins < item.cost) return res.status(400).json({ error: 'insufficient coins' })

    await prisma.$transaction([
      prisma.user.update({ where: { id: userId }, data: { coins: { decrement: item.cost } } }),
      prisma.activity.create({ data: { userId, type: 'redeem', detail: item.name, coins: -item.cost } })
    ])

    res.json({ success: true })
  }
  res.status(405).end()
}
