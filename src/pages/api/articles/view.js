import prisma from '../../../../../lib/prisma'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { articleId, userId } = req.body
  if (!articleId || !userId) return res.status(400).json({ error: 'articleId and userId required' })

  const tx = await prisma.$transaction([
    prisma.activity.create({ data: { userId, type: 'read_article', detail: String(articleId), coins: 10 } }),
    prisma.user.update({ where: { id: userId }, data: { coins: { increment: 10 } } })
  ])

  res.json({ success: true })
}
