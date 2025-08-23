import prisma from '../../../../../lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const articles = await prisma.article.findMany({ orderBy: { createdAt: 'desc' } })
    return res.json(articles)
  }
  if (req.method === 'POST') {
    const { title, content, image, region } = req.body
    const a = await prisma.article.create({ data: { title, content, image, region } })
    return res.json(a)
  }
  res.status(405).end()
}
