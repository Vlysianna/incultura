import prisma from '../../../../lib/prisma'

export default async function handler(req, res) {
  try {
    // Fetch top users with activity types (to allow filtering by activity categories)
    const topUsers = await prisma.user.findMany({
      where: { isAdmin: false },
      orderBy: { coins: 'desc' },
      take: 50,
      select: {
        id: true,
        name: true,
        email: true,
        coins: true,
        activity: { select: { type: true } }
      }
    })

    const users = topUsers.map(u => {
      const activities = Array.isArray(u.activity) ? u.activity : []
      const quizCount = activities.filter(a => typeof a.type === 'string' && a.type.startsWith('quiz_')).length
      const articleCount = activities.filter(a => a.type === 'article_view').length
      const redeemCount = activities.filter(a => a.type === 'redeem').length
      return {
        id: u.id,
        name: u.name,
        email: u.email,
        coins: u.coins,
        activitiesCount: activities.length,
        quizCount,
        articleCount,
        redeemCount
      }
    })

    res.json({ users })
  } catch (e) {
    console.error('Leaderboard API error', e)
    res.status(500).json({ error: 'Failed to load leaderboard' })
  }
}
