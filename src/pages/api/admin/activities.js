import prisma from '../../../../lib/prisma'
import getServerUser from '../../../../lib/getServerUser'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()
  
  const user = await getServerUser(req)
  if (!user || !user.isAdmin) {
    return res.status(403).json({ error: 'Admin access required' })
  }

  try {
    const activities = await prisma.activity.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    // For article_view activities, fetch the article title
    const articleViewActivities = activities.filter(a => a.type === 'article_view' && a.detail)
    let articleTitles = {}
    if (articleViewActivities.length > 0) {
      const articleIds = articleViewActivities.map(a => parseInt(a.detail)).filter(id => !isNaN(id))
      const articles = await prisma.article.findMany({
        where: { id: { in: articleIds } },
        select: { id: true, title: true }
      })
      articleTitles = Object.fromEntries(articles.map(a => [a.id, a.title]))
    }

    // Attach articleTitle to each activity if applicable
    const activitiesWithTitles = activities.map(a => {
      if (a.type === 'article_view' && a.detail) {
        const articleId = parseInt(a.detail)
        return { ...a, articleTitle: articleTitles[articleId] || null }
      }
      return a
    })

    res.json(activitiesWithTitles)
  } catch (error) {
    console.error('Admin activities error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
