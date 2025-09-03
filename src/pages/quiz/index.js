import { useState, useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Trophy, Users, Clock, CheckCircle, XCircle, RotateCcw, Sparkles, User } from 'lucide-react'
import Header from '../../components/Header'

export default function QuizPage() {
  const { data: session } = useSession()
  const [quiz, setQuiz] = useState(null)
  const [selected, setSelected] = useState(null)
  const [message, setMessage] = useState('')
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [loading, setLoading] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [category, setCategory] = useState('all')
  const [progress, setProgress] = useState({ answered: 0, total: 0 })
  const [finished, setFinished] = useState(false)
  const categories = [
    { id: 'all', label: 'Semua' },
    { id: 'budaya', label: 'Budaya' },
    { id: 'makanan', label: 'Makanan Daerah' },
    { id: 'musik', label: 'Musik' },
    { id: 'pakaian', label: 'Pakaian' },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const loadQuiz = () => {
    setLoading(true)
    const qs = category !== 'all' ? `?category=${encodeURIComponent(category)}` : ''
    fetch(`/api/quiz${qs}`)
      .then(r => r.json())
      .then(data => {
        if (data?.progress) setProgress(data.progress)
        if (data?.finished) {
          setFinished(true)
          setQuiz(null)
          return
        }
        setFinished(false)
        setQuiz(data)
        setSelected(null)
        setAnswered(false)
        setMessage('')
      })
      .catch(error => {
        console.error('Error loading quiz:', error)
        setMessage('Gagal memuat pertanyaan. Silakan coba lagi.')
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => { 
    loadQuiz() 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category])

  const submitAnswer = async () => {
    if (!selected || answered) return;

    const userId = session?.user?.id;
    if (!userId) {
      setMessage('Silakan login terlebih dahulu untuk berpartisipasi');
      return;
    }

    setLoading(true);
    setAnswered(true);

    try {
      const resp = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ quizId: quiz.id, answer: selected })
      })
      const data = await resp.json()
      if (!resp.ok) {
        setMessage(data.error || 'Jawaban gagal diproses')
        setAnswered(false)
        return
      }
      if (data.alreadyAnswered) {
        setMessage(data.correct ? 'Kuis ini sudah pernah kamu jawab benar.' : 'Kuis ini sudah kamu jawab.')
        return
      }
      if (data.correct) {
        setScore(prev => prev + 1)
        setMessage('Benar! Kamu mendapatkan 20 koin 🎉')
        if (data.awarded > 0) {
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('coins:award', { detail: { awarded: data.awarded, total: data.totalCoins } }))
          } else {
            window.dispatchEvent(new Event('coins:update'))
          }
        }
      } else {
        setMessage(`Salah. Jawaban benar: ${data.correctAnswer}`)
      }
      setProgress(p => ({ ...p, answered: Math.min(p.answered + 1, p.total) }))
      setTimeout(() => {
        setMessage('')
        loadQuiz()
      }, 3000)
    } catch (error) {
      console.error('Error submitting answer:', error);
      setMessage('Terjadi kesalahan. Silakan coba lagi.');
      setAnswered(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-96 bg-gradient-to-bl from-blue-200/20 to-transparent rounded-bl-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-64 bg-gradient-to-tr from-[#a92d23]/10 to-transparent rounded-tr-[80px] pointer-events-none"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-32 left-10 animate-float">
        <Brain className="w-8 h-8 text-[#a92d23]" />
      </div>
      <div className="absolute top-1/3 right-20 animate-bounce">
        <Sparkles className="w-6 h-6 text-[#a92d23]" />
      </div>

  {/* Header (Unified) */}
  <Header />

      {/* Main Content */}
      <main className="pt-28 pb-16 px-6 max-w-4xl mx-auto relative z-10">
        
  {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl md:text-5xl font-black mb-6 bg-[#a92d23] bg-clip-text text-transparent"
          >
            Kuis Budaya Indonesia
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Uji pengetahuan Anda tentang kekayaan budaya Nusantara. 
            Jawab pertanyaan dan kumpulkan koin sebagai reward!
          </motion.p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition ${category === c.id ? 'bg-[#a92d23] text-white border-[#a92d23]' : 'bg-white/70 border-gray-200 hover:border-[#a92d23]/40 text-gray-700'}`}
            >{c.label}</button>
          ))}
        </div>

        {/* Quiz Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50"
          >
            <div className="flex items-center gap-3 mb-2">
              <Brain className="w-8 h-8 text-[#a92d23]" />
              <h3 className="font-bold text-gray-800">Pertanyaan</h3>
            </div>
            <p className="text-3xl font-black text-[#a92d23]">{progress.total || 0}</p>
            <p className="text-sm text-gray-600">Total Soal</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50"
          >
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-8 h-8 text-[#a92d23]" />
              <h3 className="font-bold text-gray-800">Reward</h3>
            </div>
            <p className="text-3xl font-black text-[#a92d23]">20</p>
            <p className="text-sm text-gray-600">Koin per Jawaban Benar</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50"
          >
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-8 h-8 text-[#a92d23]" />
              <h3 className="font-bold text-gray-800">Peserta</h3>
            </div>
            <p className="text-3xl font-black text-[#a92d23]">{progress.answered}</p>
            <p className="text-sm text-gray-600">Sudah Dijawab</p>
          </motion.div>
        </div>

        {/* Quiz Section */}
        <AnimatePresence mode="wait">
          {finished ? (
            <motion.div
              key="finished"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-10 shadow-lg border border-white/50 text-center"
            >
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Semua kuis selesai!</h3>
              <p className="text-gray-600 mb-6">Kamu telah menjawab semua pertanyaan yang tersedia untuk kategori ini.</p>
              <button
                onClick={() => { setCategory('all'); }}
                className="bg-gradient-to-r from-[#a92d23] to-[#7a1f1a] text-white px-6 py-3 rounded-xl hover:scale-105 transition-all shadow-lg"
              >Reset Kategori</button>
            </motion.div>
          ) : loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50 text-center"
            >
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a92d23] mx-auto mb-4"></div>
              <p className="text-gray-600">Memuat pertanyaan...</p>
            </motion.div>
          ) : quiz ? (
            <motion.div 
              key={quiz.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-[#a92d23] to-[#7a1f1a] p-6">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-3">
                    <Brain className="w-6 h-6" />
                    <h3 className="text-xl font-bold">Pertanyaan Budaya</h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>Tidak ada batas waktu</span>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-8 leading-relaxed">
                  {quiz.question}
                </h2>

                <div className="space-y-4 mb-8">
                  {quiz.options.map((option, index) => (
                    <motion.button
                      key={option}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      onClick={() => !answered && setSelected(option)}
                      disabled={answered}
                      className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 ${
                        selected === option
                          ? answered
                            ? quiz.correctAnswer === option
                              ? 'border-green-500 bg-green-50 text-green-800'
                              : 'border-red-500 bg-red-50 text-red-800'
                            : 'border-[#a92d23] bg-[#a92d23]/10 text-[#a92d23]'
                          : answered && quiz.correctAnswer === option
                          ? 'border-green-500 bg-green-50 text-green-800'
                          : 'border-gray-200 bg-gray-50 hover:border-[#a92d23] hover:bg-[#a92d23]/5 text-gray-700'
                      } ${answered ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-[1.02]'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                          selected === option
                            ? answered
                              ? quiz.correctAnswer === option
                                ? 'border-green-500 bg-green-500 text-white'
                                : 'border-red-500 bg-red-500 text-white'
                              : 'border-[#a92d23] bg-[#a92d23] text-white'
                            : answered && quiz.correctAnswer === option
                            ? 'border-green-500 bg-green-500 text-white'
                            : 'border-gray-300'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="flex-1">{option}</span>
                        {answered && selected === option && (
                          quiz.correctAnswer === option ? 
                          <CheckCircle className="w-6 h-6 text-green-500" /> : 
                          <XCircle className="w-6 h-6 text-red-500" />
                        )}
                        {answered && quiz.correctAnswer === option && selected !== option && (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>

                {message && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl mb-6 text-center font-medium ${
                      message.includes('Benar') 
                        ? 'bg-green-100 text-green-800 border border-green-200' 
                        : 'bg-red-100 text-red-800 border border-red-200'
                    }`}
                  >
                    {message}
                  </motion.div>
                )}

                <div className="flex gap-4">
                  <button
                    onClick={submitAnswer}
                    disabled={!selected || answered || loading}
                    className={`flex-1 py-4 px-6 rounded-xl font-medium transition-all duration-300 ${
                      !selected || answered || loading
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#a92d23] to-[#7a1f1a] text-white hover:scale-105 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {loading ? 'Memproses...' : answered ? 'Sudah Dijawab' : 'Jawab'}
                  </button>

                  <button
                    onClick={loadQuiz}
                    disabled={loading}
                    className="px-6 py-4 border-2 border-[#a92d23] text-[#a92d23] rounded-xl hover:bg-[#a92d23] hover:text-white transition-all duration-300 hover:scale-105"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="no-quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <Brain className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-600 mb-4">Tidak ada pertanyaan tersedia</h3>
              <p className="text-gray-500 mb-8">Silakan coba lagi nanti atau hubungi administrator.</p>
              <button
                onClick={loadQuiz}
                className="bg-gradient-to-r from-[#a92d23] to-[#7a1f1a] text-white px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
              >
                Muat Ulang
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Login prompt for non-authenticated users */}
        {!session && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 text-center"
          >
            <User className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-amber-800 mb-2">Login untuk Mengumpulkan Koin</h3>
            <p className="text-amber-700 mb-4">
              Daftar atau masuk untuk menyimpan progres dan mengumpulkan koin dari setiap jawaban benar!
            </p>
            <div className="flex gap-3 justify-center">
              <Link 
                href="/register"
                className="bg-amber-500 text-white px-6 py-3 rounded-xl hover:bg-amber-600 transition-colors font-medium"
              >
                Daftar Sekarang
              </Link>
              <button 
                onClick={() => signIn('credentials', { callbackUrl: '/quiz' })}
                className="border border-amber-500 text-amber-600 px-6 py-3 rounded-xl hover:bg-amber-50 transition-colors font-medium"
              >
                Masuk
              </button>
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-gradient-to-r from-[#a92d23] to-[#7a1f1a] text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Image src="/InculturaLogo.svg" alt="logo" width={32} height={32} />
                <h3 className="text-xl font-bold">Incultura</h3>
              </div>
              <p className="text-white/80 leading-relaxed">
                Platform digital untuk melestarikan dan mengenalkan kekayaan budaya Indonesia kepada generasi muda melalui teknologi modern.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Menu</h4>
              <div className="space-y-2 text-white/80">
                <Link href="/" className="block hover:text-white transition-colors">Home</Link>
                <Link href="/articles" className="block hover:text-white transition-colors">Artikel</Link>
                <Link href="/quiz" className="block hover:text-white transition-colors">Kuis</Link>
                <Link href="/marketplace" className="block hover:text-white transition-colors">Marketplace</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kontak</h4>
              <div className="space-y-2 text-white/80">
                <p>info@incultura.id</p>
                <p>+62 21 1234 5678</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
            &copy; {new Date().getFullYear()} Incultura. Semua Hak Dilindungi.
          </div>
        </div>
      </footer>
    </div>
  )
}