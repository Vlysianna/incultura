import prisma from '../../../../lib/prisma'
import getServerUser from '../../../../lib/getServerUser'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const user = await getServerUser(req)
  if (!user) return res.status(401).json({ error: 'Authentication required' })
  const userId = user.id
  const { articleId } = req.body
  if (!articleId) return res.status(400).json({ error: 'articleId required' })
  // prevent double-award for same article
  const existing = await prisma.activity.findFirst({ where: { userId, type: 'read_article', detail: String(articleId) } })
  if (existing) return res.json({ success: false, message: 'Already awarded for this article' })

  await prisma.$transaction([
    prisma.activity.create({ data: { userId, type: 'read_article', detail: String(articleId), coins: 10 } }),
    prisma.user.update({ where: { id: userId }, data: { coins: { increment: 10 } } })
  ])

  res.json({ success: true })
}
