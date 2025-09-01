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

    res.json(activities)
  } catch (error) {
    console.error('Admin activities error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
