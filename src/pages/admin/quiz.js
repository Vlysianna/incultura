import { FooterSection } from '../../components/sections';

import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Shield, 
  Plus,
  Edit3,
  Trash2,
  ArrowLeft,
  Search,
  CheckCircle,
  XCircle,
  Crown,
  Sparkles,
  Save,
  X
} from 'lucide-react'

export default function AdminQuiz(){
  const { data: session } = useSession()
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [editingQuiz, setEditingQuiz] = useState(null)
  const [showNewQuizForm, setShowNewQuizForm] = useState(false)
  const [newQuiz, setNewQuiz] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: ''
  })
  
  useEffect(() => { 
    if (session?.user) {
      fetchQuizzes()
    } else {
      setLoading(false)
    }
  }, [session])

  const fetchQuizzes = () => {
    fetch('/api/admin/quiz')
      .then(r => r.ok ? r.json() : [])
      .then(setQuizzes)
      .finally(() => setLoading(false))
  }

  const handleSaveQuiz = async (quiz) => {
    try {
      const response = await fetch('/api/admin/quiz', {
        method: quiz.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quiz)
      })
      
      if (response.ok) {
        fetchQuizzes()
        setEditingQuiz(null)
        setShowNewQuizForm(false)
        setNewQuiz({ question: '', options: ['', '', '', ''], correctAnswer: '' })
      } else {
        alert('Error saving quiz')
      }
    } catch (error) {
      console.error('Error saving quiz:', error)
      alert('Error saving quiz')
    }
  }

  const handleDeleteQuiz = async (id) => {
    if (!confirm('Are you sure you want to delete this quiz?')) return
    
    try {
      const response = await fetch('/api/admin/quiz', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
      
      if (response.ok) {
        fetchQuizzes()
      } else {
        alert('Error deleting quiz')
      }
    } catch (error) {
      console.error('Error deleting quiz:', error)
      alert('Error deleting quiz')
    }
  }

  const filteredQuizzes = quizzes.filter(quiz => 
    quiz.question?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-white/95 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-[#f3d099]/60 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Admin Access Required</h1>
          <p className="text-gray-600 mb-4">Please sign in as admin to access this page</p>
          <Link 
            href="/login"
            className="bg-gradient-to-r from-[#a92d23] to-[#f3d099] text-white px-6 py-3 rounded-xl hover:scale-105 transition-all duration-300 font-medium"
          >
            Login as Admin
          </Link>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-white/95 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a92d23] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quizzes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-white/95 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-96 bg-gradient-to-bl from-[#f3d099]/20 to-transparent rounded-bl-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-64 bg-gradient-to-tr from-[#a92d23]/10 to-transparent rounded-tr-[80px] pointer-events-none"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-32 left-10 animate-float">
        <Crown className="w-8 h-8 text-[#f3d099]" />
      </div>
      <div className="absolute top-1/3 right-20 animate-bounce">
        <Sparkles className="w-6 h-6 text-[#a92d23]" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-lg border-b border-[#f3d099]/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-[#a92d23] to-[#f3d099] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <Image src="/InculturaLogo.svg" alt="logo" width={24} height={24} />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-[#f3d099] to-[#a92d23] rounded-full animate-pulse-slow"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-[#a92d23] to-[#f3d099] bg-clip-text text-transparent">
                  <Image src="/InculturaTeks.svg" alt="logo" width={100} height={20} />
                </h1>
                <p className="text-xs text-[#a92d23] font-medium">Quiz Management</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {[
                { href: "/admin", label: "Dashboard" },
                { href: "/admin/users", label: "Users" },
                { href: "/admin/articles", label: "Articles" },
                { href: "/admin/quiz", label: "Quiz", active: true },
                { href: "/admin/merchandise", label: "Merchandise" },
              ].map((item) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className={`text-sm font-medium transition-colors relative group ${
                    item.active 
                      ? 'text-[#a92d23] font-semibold' 
                      : 'text-[#a92d23] hover:text-[#7a1f1a]'
                  }`}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#a92d23] to-[#f3d099] transition-all duration-300 ${
                    item.active ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <span className="text-sm text-[#a92d23] font-medium flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Admin: {session.user?.name || session.user?.email}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="ml-4 px-4 py-2 bg-gradient-to-r from-[#a92d23] to-[#f3d099] text-white rounded-lg font-medium hover:scale-105 transition-transform shadow"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-28 pb-16 px-6 max-w-7xl mx-auto relative z-10">
        
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/admin"
                className="p-2 hover:bg-[#f3d099]/20 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-[#a92d23]" />
              </Link>
              <div className="p-3 bg-gradient-to-br from-[#a92d23] to-[#f3d099] rounded-full">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Quiz Management</h1>
                <p className="text-gray-600">Create and manage quiz questions</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowNewQuizForm(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-[#a92d23] to-[#f3d099] text-white px-6 py-3 rounded-xl hover:scale-105 transition-all duration-300 font-medium"
              >
                <Plus className="w-5 h-5" />
                Add New Quiz
              </button>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#a92d23]">{quizzes.length}</div>
                <div className="text-sm text-gray-500">Total Questions</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 mb-8"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search quiz questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#a92d23] focus:border-transparent outline-none transition-all"
            />
          </div>
        </motion.div>

        {/* Quiz List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6"
        >
          {filteredQuizzes.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-12 text-center">
              <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600 mb-2">No Quiz Questions Found</h3>
              <p className="text-gray-500">Start by creating your first quiz question.</p>
            </div>
          ) : (
            filteredQuizzes.map((quiz, index) => (
              <motion.div
                key={quiz.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 hover:shadow-xl transition-all duration-300"
              >
                {editingQuiz?.id === quiz.id ? (
                  <QuizEditForm 
                    quiz={editingQuiz} 
                    onChange={setEditingQuiz}
                    onSave={() => handleSaveQuiz(editingQuiz)}
                    onCancel={() => setEditingQuiz(null)}
                  />
                ) : (
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-800 flex-1">{quiz.question}</h3>
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => setEditingQuiz({...quiz, options: JSON.parse(quiz.options)})}
                          className="p-2 text-[#a92d23] hover:bg-[#f3d099]/20 rounded-lg transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteQuiz(quiz.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {JSON.parse(quiz.options).map((option, optionIndex) => (
                        <div 
                          key={optionIndex}
                          className={`flex items-center gap-2 p-3 rounded-lg border ${
                            option === quiz.correctAnswer
                              ? 'border-[#a92d23] bg-[#a92d23]/5 text-[#a92d23]'
                              : 'border-gray-200 bg-gray-50'
                          }`}
                        >
                          {option === quiz.correctAnswer ? (
                            <CheckCircle className="w-4 h-4 text-[#a92d23]" />
                          ) : (
                            <XCircle className="w-4 h-4 text-gray-400" />
                          )}
                          <span className="text-sm">{option}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </motion.div>

        {/* New Quiz Form Modal */}
        {showNewQuizForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Add New Quiz Question</h2>
                  <button
                    onClick={() => setShowNewQuizForm(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <QuizEditForm 
                  quiz={newQuiz} 
                  onChange={setNewQuiz}
                  onSave={() => handleSaveQuiz(newQuiz)}
                  onCancel={() => setShowNewQuizForm(false)}
                />
              </div>
            </motion.div>
          </div>
        )}
      </main>

  {/* Footer */}
  <FooterSection />
    </div>
  )
}

// Quiz Edit Form Component
function QuizEditForm({ quiz, onChange, onSave, onCancel }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
        <textarea
          value={quiz.question}
          onChange={(e) => onChange({...quiz, question: e.target.value})}
          placeholder="Enter the quiz question..."
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#a92d23] focus:border-transparent outline-none resize-none"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
        <div className="space-y-3">
          {quiz.options.map((option, index) => (
            <div key={index} className="flex gap-3">
              <input
                type="text"
                value={option}
                onChange={(e) => {
                  const newOptions = [...quiz.options]
                  newOptions[index] = e.target.value
                  onChange({...quiz, options: newOptions})
                }}
                placeholder={`Option ${index + 1}`}
                className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#a92d23] focus:border-transparent outline-none"
              />
              <button
                onClick={() => onChange({...quiz, correctAnswer: option})}
                className={`p-3 rounded-xl transition-colors ${
                  quiz.correctAnswer === option
                    ? 'bg-[#a92d23] text-white'
                    : 'border border-[#a92d23] text-[#a92d23] hover:bg-[#f3d099]/10'
                }`}
              >
                <CheckCircle className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-2">Click the check button to mark the correct answer</p>
      </div>

      <div className="flex gap-3 justify-end">
        <button
          onClick={onCancel}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          disabled={!quiz.question || !quiz.correctAnswer || quiz.options.some(opt => !opt)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#a92d23] to-[#f3d099] text-white rounded-xl hover:scale-105 transition-all duration-300 font-medium disabled:opacity-50 disabled:hover:scale-100"
        >
          <Save className="w-4 h-4" />
          Save Quiz
        </button>
      </div>
    </div>
  )
}
