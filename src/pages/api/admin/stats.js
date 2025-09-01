import prisma from '../../../../lib/prisma'
import getServerUser from '../../../../lib/getServerUser'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()
  
  const user = await getServerUser(req)
  if (!user || !user.isAdmin) {
    return res.status(403).json({ error: 'Admin access required' })
  }

  try {
    // Get basic counts
    const [
      totalUsers,
      totalArticles,
      totalQuiz,
      totalMerchandise,
      totalActivities,
      pendingArticles,
      approvedArticles,
      newUsersThisMonth
    ] = await Promise.all([
      prisma.user.count(),
      prisma.article.count(),
      prisma.quiz.count(),
      prisma.merchandise.count(),
      prisma.activity.count(),
      prisma.article.count({ where: { status: 'PENDING' } }),
      prisma.article.count({ where: { status: 'APPROVED' } }),
      prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          }
        }
      })
    ])

    // Calculate active users (users with activities in last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    const activeUsersResult = await prisma.activity.findMany({
      where: {
        createdAt: { gte: thirtyDaysAgo }
      },
      select: { userId: true },
      distinct: ['userId']
    })
    const activeUsers = activeUsersResult.length

    // Calculate quiz accuracy
    const quizActivities = await prisma.activity.findMany({
      where: {
        type: { in: ['quiz_correct', 'quiz_incorrect'] }
      }
    })
    
    const correctAnswers = quizActivities.filter(a => a.type === 'quiz_correct').length
    const totalQuizAttempts = quizActivities.length
    const avgQuizAccuracy = totalQuizAttempts > 0 ? Math.round((correctAnswers / totalQuizAttempts) * 100) : 0

    // Calculate total sales (redeems)
    const totalSales = await prisma.activity.count({
      where: { type: 'redeem' }
    })

    const stats = {
      totalUsers,
      totalArticles,
      totalQuiz,
      totalMerchandise,
      totalActivities,
      pendingArticles,
      approvedArticles,
      newUsersThisMonth,
      activeUsers,
      avgQuizAccuracy,
      totalSales
    }

    res.json(stats)
  } catch (error) {
    console.error('Admin stats error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
