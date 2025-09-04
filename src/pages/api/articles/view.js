import prisma from '../../../../lib/prisma'
import getServerUser from '../../../../lib/getServerUser'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  
  // Need both req & res for getServerSession to work correctly
  const user = await getServerUser(req, res)
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

    // Ensure article exists and is approved before awarding coins
    const article = await prisma.article.findUnique({ where: { id: parsedArticleId }, select: { status: true } })
    if (!article) return res.status(404).json({ error: 'article not found' })
    if (article.status !== 'APPROVED') {
      // Don't award coins for pending/rejected articles. Return current total so client can sync UI.
      const currentUser = await prisma.user.findUnique({ where: { id: userId }, select: { coins: true } })
      return res.json({ success: false, message: 'Article not approved. No coins awarded.', totalCoins: currentUser?.coins ?? null })
    }

    if (existingActivity) {
      // Return current coin total so client can still sync UI
      const currentUser = await prisma.user.findUnique({ where: { id: userId }, select: { coins: true } })
      return res.json({ success: false, message: 'Coins already awarded for this article.', totalCoins: currentUser?.coins ?? null })
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
