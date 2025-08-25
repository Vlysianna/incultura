import prisma from '../../../../lib/prisma'
import getServerUser from '../../../../lib/getServerUser'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const user = await getServerUser(req)
  if (!user || !user.isAdmin) return res.status(403).json({ error: 'Admin required' })
  const { articleId, action } = req.body
  if (!articleId || !action) return res.status(400).json({ error: 'articleId and action required' })
  if (!['APPROVED','REJECTED'].includes(action)) return res.status(400).json({ error: 'invalid action' })
  const a = await prisma.article.update({ where: { id: articleId }, data: { status: action }, include: { author: { select: { id: true, name: true, email: true } } } })
  res.json({ success: true, article: a })
}
