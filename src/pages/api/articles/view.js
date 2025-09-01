import prisma from '../../../../lib/prisma'
import getServerUser from '../../../../lib/getServerUser'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  
  const user = await getServerUser(req)
  if (!user) return res.status(401).json({ error: 'Authentication required' })
  
  const { articleId } = req.body
  if (!articleId) return res.status(400).json({ error: 'articleId required' })

  const userId = user.id
  try {
    const parsedArticleId = parseInt(articleId)
    if (Number.isNaN(parsedArticleId)) return res.status(400).json({ error: 'invalid articleId' })

    const existingActivity = await prisma.activity.findFirst({
      where: {
        userId,
        type: 'article_view',
        detail: String(parsedArticleId)
      }
    })

    if (existingActivity) {
      return res.json({ success: false, message: 'Coins already awarded for this article.' })
    }

    // Award coins (10)
    await prisma.$transaction([
      prisma.activity.create({ data: { userId, type: 'article_view', detail: String(parsedArticleId), coins: 10 } }),
      prisma.user.update({ where: { id: userId }, data: { coins: { increment: 10 } } })
    ])

    // return updated coin total to client for immediate UI update/debug
    const updatedUser = await prisma.user.findUnique({ where: { id: userId }, select: { coins: true } })
    res.json({ success: true, coinsAwarded: 10, totalCoins: updatedUser?.coins ?? null })
  } catch (err) {
    console.error('articles/view error:', err)
    res.status(500).json({ error: 'internal server error', message: err?.message })
  }
}
