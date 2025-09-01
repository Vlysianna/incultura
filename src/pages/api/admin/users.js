import prisma from '../../../../lib/prisma'
import getServerUser from '../../../../lib/getServerUser'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()
  
  const user = await getServerUser(req, res)
  if (!user || !user.isAdmin) {
    return res.status(403).json({ error: 'Admin access required' })
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        coins: true,
        createdAt: true,
        isAdmin: true,
        activity: { select: { id: true } }
      },
      orderBy: { createdAt: 'desc' }
    })

    // Transform data to include activity count (relation name is 'activity' in schema)
    const usersWithStats = users.map(u => ({
      ...u,
      activityCount: u.activity?.length || 0,
      // Remove raw relation array if not needed by frontend; keep only count
      activity: undefined
    }))

    res.json(usersWithStats)
  } catch (error) {
    console.error('Admin users error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
