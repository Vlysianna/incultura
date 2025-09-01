import prisma from '../../../../lib/prisma'
import getServerUser from '../../../../lib/getServerUser'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()
  const { id } = req.query
  if (!id) return res.status(400).json({ error: 'Missing article id' })
  try {
    const user = await getServerUser(req, res)
    const article = await prisma.article.findUnique({
      where: { id: parseInt(id) },
      include: { user: { select: { id: true, name: true, email: true } } }
    })
    if (!article) return res.status(404).json({ error: 'Article not found' })
    // Only allow if approved, or if user is author, or admin
    if (
      article.status !== 'APPROVED' &&
      (!user || (!user.isAdmin && user.id !== article.user?.id))
    ) {
      return res.status(403).json({ error: 'Not authorized to view this article' })
    }
    res.json(article)
  } catch (error) {
    console.error('Article preview error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
