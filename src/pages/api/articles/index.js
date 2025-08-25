import prisma from '../../../../lib/prisma'
import getServerUser from '../../../../lib/getServerUser'

export default async function handler(req, res) {
  if (req.method === 'GET') {
  const user = await getServerUser(req)
  const where = user?.isAdmin ? {} : { status: 'APPROVED' }
  const articles = await prisma.article.findMany({ where, include: { author: { select: { id: true, name: true, email: true } } }, orderBy: { createdAt: 'desc' } })
  return res.json(articles)
  }
  if (req.method === 'POST') {
  const user = await getServerUser(req)
  if (!user) return res.status(401).json({ error: 'Authentication required' })
  const { title, content, image, region } = req.body
  if (!title || !content) return res.status(400).json({ error: 'title and content required' })
  const a = await prisma.article.create({ data: { title, content, image, region, authorId: user.id, status: 'PENDING' } })
  return res.json(a)
  }
  res.status(405).end()
}
