import prisma from '../../../../lib/prisma'
import getServerUser from '../../../../lib/getServerUser'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { category } = req.query
    const where = category ? { category: String(category) } : {}
    const total = await prisma.quiz.count({ where })

    // Try get user (optional) for progress
    const user = await getServerUser(req, res)
    let answeredIds = []
    if (user) {
      const acts = await prisma.activity.findMany({
        where: { userId: user.id, type: { in: ['quiz_correct', 'quiz_incorrect'] } },
        select: { detail: true }
      })
      answeredIds = [...new Set(acts.map(a => parseInt(a.detail)).filter(Boolean))]
    }

    const remainingQuizzes = await prisma.quiz.findMany({
      where: {
        ...where,
        id: answeredIds.length ? { notIn: answeredIds } : undefined
      }
    })

    if (remainingQuizzes.length === 0) {
      return res.json({ finished: true, progress: { answered: answeredIds.length, total } })
    }

    const idx = Math.floor(Math.random() * remainingQuizzes.length)
    const q = remainingQuizzes[idx]
    return res.json({ id: q.id, question: q.question, options: JSON.parse(q.options), category: q.category, progress: { answered: answeredIds.length, total } })
  }

  if (req.method === 'POST') {
    const user = await getServerUser(req, res)
    if (!user) return res.status(401).json({ error: 'Authentication required' })
    const userId = user.id
    const { quizId, answer } = req.body || {}
    if (!quizId || !answer) return res.status(400).json({ error: 'quizId and answer required' })

    const q = await prisma.quiz.findUnique({ where: { id: quizId } })
    if (!q) return res.status(404).json({ error: 'quiz not found' })
    const correct = q.correctAnswer === answer

    // Check any previous attempt (correct or incorrect)
    const existingAttempt = await prisma.activity.findFirst({
      where: { userId, type: { in: ['quiz_correct', 'quiz_incorrect'] }, detail: String(quizId) }
    })
    if (existingAttempt) {
      const userCoins = await prisma.user.findUnique({ where: { id: userId }, select: { coins: true } })
      return res.json({ alreadyAnswered: true, correct: existingAttempt.type === 'quiz_correct', correctAnswer: q.correctAnswer, awarded: 0, totalCoins: userCoins?.coins ?? null })
    }

    let awarded = 0
    if (correct) {
      await prisma.$transaction([
        prisma.activity.create({ data: { userId, type: 'quiz_correct', detail: String(quizId), coins: 20 } }),
        prisma.user.update({ where: { id: userId }, data: { coins: { increment: 20 } } })
      ])
      awarded = 20
    } else {
      // Record incorrect attempt (no coins)
      await prisma.activity.create({ data: { userId, type: 'quiz_incorrect', detail: String(quizId), coins: 0 } })
    }

    const updatedUser = await prisma.user.findUnique({ where: { id: userId }, select: { coins: true } })
    return res.json({ correct, correctAnswer: q.correctAnswer, awarded, totalCoins: updatedUser?.coins ?? null })
  }

  res.status(405).end()
}
