import prisma from '../../../../lib/prisma'
import getServerUser from '../../../../lib/getServerUser'

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const user = await getServerUser(req, res)
      let where = {}
      if (!user?.isAdmin) {
        where = {
          OR: [
            { status: 'APPROVED' },
            { status: 'PENDING', authorId: user?.id }
          ]
        }
      }
      const articles = await prisma.article.findMany({
        where,
        include: { user: { select: { id: true, name: true, email: true } } },
        orderBy: { createdAt: 'desc' }
      })

      // Map `user` relation to `author` to keep response shape consistent with frontend expectations
      const mapped = articles.map(a => ({ ...a, author: a.user }))
      return res.json(mapped)
    }
    if (req.method === 'POST') {
      const user = await getServerUser(req, res)
      if (!user) return res.status(401).json({ error: 'Authentication required' })
      const { title, content, image, region } = req.body
      if (!title || !content) return res.status(400).json({ error: 'title and content required' })
      const a = await prisma.article.create({ data: { title, content, image, region, authorId: user.id, status: 'PENDING' } })
      return res.json(a)
    }
    res.status(405).end()
  } catch (error) {
    console.error('API /articles error:', error && error.message, error && error.stack)
    res.status(500).json({ error: 'Internal server error', detail: error && error.message })
  }
}
