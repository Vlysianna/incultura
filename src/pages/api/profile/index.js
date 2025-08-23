import prisma from '../../../../lib/prisma'

export default async function handler(req, res) {
  const { userId } = req.query
  if (!userId) return res.status(400).json({ error: 'userId required' })
  const u = await prisma.user.findUnique({ where: { id: parseInt(userId) }, include: { activities: { orderBy: { createdAt: 'desc' } } } })
  if (!u) return res.status(404).json({ error: 'user not found' })
  res.json(u)
}
