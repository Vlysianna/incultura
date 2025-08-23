import prisma from '../../../../../lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const quizzes = await prisma.quiz.findMany()
    if (quizzes.length === 0) return res.json([])
    const idx = Math.floor(Math.random() * quizzes.length)
    const q = quizzes[idx]
    return res.json({ id: q.id, question: q.question, options: JSON.parse(q.options) })
  }
  if (req.method === 'POST') {
    const { quizId, answer, userId } = req.body
    const q = await prisma.quiz.findUnique({ where: { id: quizId } })
    if (!q) return res.status(404).json({ error: 'quiz not found' })
    const correct = q.correctAnswer === answer
    if (correct) {
      await prisma.$transaction([
        prisma.activity.create({ data: { userId, type: 'quiz_correct', detail: String(quizId), coins: 20 } }),
        prisma.user.update({ where: { id: userId }, data: { coins: { increment: 20 } } })
      ])
    }
    res.json({ correct })
  }
  res.status(405).end()
}
