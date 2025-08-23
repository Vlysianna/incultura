import prisma from '../../../../../lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const items = await prisma.merchandise.findMany()
    return res.json(items)
  }
  if (req.method === 'POST') {
    const { userId, itemId } = req.body
    if (!userId || !itemId) return res.status(400).json({ error: 'userId and itemId required' })
    const item = await prisma.merchandise.findUnique({ where: { id: itemId } })
    if (!item) return res.status(404).json({ error: 'item not found' })
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) return res.status(404).json({ error: 'user not found' })
    if (user.coins < item.cost) return res.status(400).json({ error: 'insufficient coins' })

    await prisma.$transaction([
      prisma.user.update({ where: { id: userId }, data: { coins: { decrement: item.cost } } }),
      prisma.activity.create({ data: { userId, type: 'redeem', detail: item.name, coins: -item.cost } })
    ])

    res.json({ success: true })
  }
  res.status(405).end()
}
