import prisma from '../../../../lib/prisma'

export default async function handler(req, res) {
  const { userId } = req.query
  if (!userId) return res.status(400).json({ error: 'userId required' })
  const user = await prisma.user.findUnique({ where: { id: parseInt(userId) }, select: { coins: true, activities: true } })
  if (!user) return res.status(404).json({ error: 'user not found' })
  res.json(user)
}
