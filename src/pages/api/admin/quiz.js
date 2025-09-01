import prisma from '../../../../lib/prisma'

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET':
        return await getQuizzes(req, res)
      case 'POST':
        return await createQuiz(req, res)
      case 'PUT':
        return await updateQuiz(req, res)
      case 'DELETE':
        return await deleteQuiz(req, res)
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
        return res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Quiz API error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

async function getQuizzes(req, res) {
  try {
    const quizzes = await prisma.quiz.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return res.status(200).json(quizzes)
  } catch (error) {
    console.error('Error fetching quizzes:', error)
    return res.status(500).json({ error: 'Failed to fetch quizzes' })
  }
}

async function createQuiz(req, res) {
  try {
    const { question, options, correctAnswer } = req.body
    
    // Validation
    if (!question || !Array.isArray(options) || !correctAnswer) {
      return res.status(400).json({ 
        error: 'Missing required fields: question, options, correctAnswer' 
      })
    }
    
    if (options.length !== 4) {
      return res.status(400).json({ 
        error: 'Quiz must have exactly 4 options' 
      })
    }
    
    if (!options.includes(correctAnswer)) {
      return res.status(400).json({ 
        error: 'Correct answer must be one of the options' 
      })
    }
    
    const quiz = await prisma.quiz.create({
      data: {
        question: question.trim(),
        options: JSON.stringify(options),
        correctAnswer: correctAnswer.trim()
      }
    })
    
    return res.status(201).json(quiz)
  } catch (error) {
    console.error('Error creating quiz:', error)
    return res.status(500).json({ error: 'Failed to create quiz' })
  }
}

async function updateQuiz(req, res) {
  try {
    const { id, question, options, correctAnswer } = req.body
    
    if (!id) {
      return res.status(400).json({ error: 'Quiz ID is required' })
    }
    
    // Validation
    if (!question || !Array.isArray(options) || !correctAnswer) {
      return res.status(400).json({ 
        error: 'Missing required fields: question, options, correctAnswer' 
      })
    }
    
    if (options.length !== 4) {
      return res.status(400).json({ 
        error: 'Quiz must have exactly 4 options' 
      })
    }
    
    if (!options.includes(correctAnswer)) {
      return res.status(400).json({ 
        error: 'Correct answer must be one of the options' 
      })
    }
    
    // Check if quiz exists
    const existingQuiz = await prisma.quiz.findUnique({
      where: { id: parseInt(id) }
    })
    
    if (!existingQuiz) {
      return res.status(404).json({ error: 'Quiz not found' })
    }
    
    const quiz = await prisma.quiz.update({
      where: { id: parseInt(id) },
      data: {
        question: question.trim(),
        options: JSON.stringify(options),
        correctAnswer: correctAnswer.trim()
      }
    })
    
    return res.status(200).json(quiz)
  } catch (error) {
    console.error('Error updating quiz:', error)
    return res.status(500).json({ error: 'Failed to update quiz' })
  }
}

async function deleteQuiz(req, res) {
  try {
    const { id } = req.body
    
    if (!id) {
      return res.status(400).json({ error: 'Quiz ID is required' })
    }
    
    // Check if quiz exists
    const existingQuiz = await prisma.quiz.findUnique({
      where: { id: parseInt(id) }
    })
    
    if (!existingQuiz) {
      return res.status(404).json({ error: 'Quiz not found' })
    }
    
    await prisma.quiz.delete({
      where: { id: parseInt(id) }
    })
    
    return res.status(200).json({ message: 'Quiz deleted successfully' })
  } catch (error) {
    console.error('Error deleting quiz:', error)
    return res.status(500).json({ error: 'Failed to delete quiz' })
  }
}
