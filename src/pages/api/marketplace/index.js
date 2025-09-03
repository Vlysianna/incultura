import prisma from '../../../../lib/prisma'
import getServerUser from '../../../../lib/getServerUser'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const items = await prisma.merchandise.findMany()
    return res.json(items)
  }
  if (req.method === 'POST') {
    try {
      const user = await getServerUser(req, res)
      if (!user) return res.status(401).json({ error: 'Authentication required' })
      const userId = user.id
      const { itemId } = req.body || {}
      if (!itemId) return res.status(400).json({ error: 'itemId required' })

      const item = await prisma.merchandise.findUnique({ where: { id: itemId } })
      if (!item) return res.status(404).json({ error: 'item not found' })
      if (item.inStock === false) return res.status(400).json({ error: 'item out of stock' })

      const price = typeof item.price === 'number' ? item.price : 0
      if (price <= 0) return res.status(400).json({ error: 'invalid item price' })

      const dbUser = await prisma.user.findUnique({ where: { id: userId } })
      if (!dbUser) return res.status(404).json({ error: 'user not found' })
      if (dbUser.coins < price) return res.status(400).json({ error: 'insufficient coins' })

      await prisma.$transaction([
        prisma.user.update({ where: { id: userId }, data: { coins: { decrement: price } } }),
        prisma.activity.create({ data: { userId, type: 'redeem', detail: item.name, coins: -price } })
      ])

      const updated = await prisma.user.findUnique({ where: { id: userId }, select: { coins: true } })
      return res.json({ success: true, remainingCoins: updated?.coins ?? null })
    } catch (err) {
      console.error('Redeem error:', err)
      return res.status(500).json({ error: 'internal server error', message: err?.message })
    }
  }
  res.status(405).end()
}
