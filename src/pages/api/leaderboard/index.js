import prisma from '../../../../lib/prisma'

export default async function handler(req, res) {
  try {
    // Fetch top users with activity count
    const topUsers = await prisma.user.findMany({
      where: { isAdmin: false },
      orderBy: { coins: 'desc' },
      take: 20,
      select: {
        id: true,
        name: true,
        email: true,
        coins: true,
        activity: { select: { id: true } }
      }
    })

    const users = topUsers.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      coins: u.coins,
      activitiesCount: u.activity.length
    }))

    res.json({ users })
  } catch (e) {
    console.error('Leaderboard API error', e)
    res.status(500).json({ error: 'Failed to load leaderboard' })
  }
}
