import { useState, useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Brain, Trophy, Users, Clock, CheckCircle, XCircle, RotateCcw, Sparkles, User } from 'lucide-react'

export default function QuizPage() {
  const { data: session } = useSession()
  const [q, setQ] = useState(null)
  const [selected, setSelected] = useState(null)
  const [message, setMessage] = useState('')
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [loading, setLoading] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const load = () => {
    setLoading(true)
    fetch('/api/quiz')
      .then(r => r.json())
      .then(data => {
        setQ(data)
        setSelected(null)
        setAnswered(false)
        setMessage('')
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const submit = async () => {
    if (!selected || answered) return
    
    const userId = session?.user?.id
    if (!userId) return setMessage('Silakan login terlebih dahulu untuk berpartisipasi')
    
    setLoading(true)
    setAnswered(true)
    
    try {
      const res = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ quizId: q.id, answer: selected, userId })
      })
      const result = await res.json()
      
      if (result.correct) {
        setMessage('🎉 Benar! +20 koin')
        setScore(prev => prev + 20)
      } else {
        setMessage('❌ Salah! Jawaban yang benar: ' + result.correctAnswer)
      }
      
      setTimeout(() => {
        setMessage('')
        load()
      }, 3000)
    } catch (error) {
      setMessage('Terjadi kesalahan. Silakan coba lagi.')
      setAnswered(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/30 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-96 bg-gradient-to-bl from-blue-200/20 to-transparent rounded-bl-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-64 bg-gradient-to-tr from-[#a92d23]/10 to-transparent rounded-tr-[80px] pointer-events-none"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-32 left-10 animate-float">
        <Brain className="w-8 h-8 text-blue-400" />
      </div>
      <div className="absolute top-1/3 right-20 animate-bounce">
        <Sparkles className="w-6 h-6 text-[#a92d23]" />
      </div>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-blue-200/20' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
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
                <p className="text-xs text-[#a92d23] font-medium">Digitalisasi Budaya Indonesia</p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {[
                { href: "/", label: "Home" },
                { href: "/articles", label: "Artikel" },
                { href: "/quiz", label: "Kuis", active: true },
                { href: "/marketplace", label: "Marketplace" },
                { href: "/leaderboard", label: "Leaderboard" },
                { href: "/profile", label: "Profile" },               
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

            {/* Auth Section */}
            <div className="flex items-center gap-3">
              {session ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium">
                    <Trophy className="w-4 h-4" />
                    {score} koin
                  </div>
                  <span className="text-sm text-[#a92d23] font-medium">
                    Hi, {session.user?.name || session.user?.email}
                  </span>
                  <button 
                    onClick={() => signOut()}
                    className="text-sm font-medium text-[#a92d23] hover:text-[#7a1f1a] transition-colors"
                  >
                    Keluar
                  </button>
                </div>
              ) : (
                <>
                  <Link 
                    href="/register" 
                    className="text-sm font-medium text-[#a92d23] hover:text-[#7a1f1a] transition-colors hidden sm:block"
                  >
                    Daftar
                  </Link>
                  <button 
                    onClick={() => signIn()}
                    className="bg-gradient-to-r from-[#a92d23] to-[#7a1f1a] text-white hover:from-[#7a1f1a] hover:to-[#a92d23] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    Masuk
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-28 pb-16 px-6 max-w-4xl mx-auto relative z-10">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-blue-600 to-[#a92d23] bg-clip-text text-transparent"
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

        {/* Quiz Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50"
          >
            <div className="flex items-center gap-3 mb-2">
              <Brain className="w-8 h-8 text-blue-500" />
              <h3 className="font-bold text-gray-800">Pertanyaan</h3>
            </div>
            <p className="text-3xl font-black text-blue-600">100+</p>
            <p className="text-sm text-gray-600">Soal Tersedia</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50"
          >
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <h3 className="font-bold text-gray-800">Reward</h3>
            </div>
            <p className="text-3xl font-black text-yellow-600">20</p>
            <p className="text-sm text-gray-600">Koin per Jawaban Benar</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50"
          >
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-8 h-8 text-green-500" />
              <h3 className="font-bold text-gray-800">Peserta</h3>
            </div>
            <p className="text-3xl font-black text-green-600">1000+</p>
            <p className="text-sm text-gray-600">Pengguna Aktif</p>
          </motion.div>
        </div>

        {/* Quiz Section */}
        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50 text-center"
          >
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a92d23] mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat pertanyaan...</p>
          </motion.div>
        ) : q ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
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
                {q.question}
              </h2>

              <div className="space-y-4 mb-8">
                {q.options.map((option, index) => (
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
                          ? q.correctAnswer === option
                            ? 'border-green-500 bg-green-50 text-green-800'
                            : 'border-red-500 bg-red-50 text-red-800'
                          : 'border-[#a92d23] bg-[#a92d23]/10 text-[#a92d23]'
                        : answered && q.correctAnswer === option
                        ? 'border-green-500 bg-green-50 text-green-800'
                        : 'border-gray-200 bg-gray-50 hover:border-[#a92d23] hover:bg-[#a92d23]/5 text-gray-700'
                    } ${answered ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-[1.02]'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                        selected === option
                          ? answered
                            ? q.correctAnswer === option
                              ? 'border-green-500 bg-green-500 text-white'
                              : 'border-red-500 bg-red-500 text-white'
                            : 'border-[#a92d23] bg-[#a92d23] text-white'
                          : answered && q.correctAnswer === option
                          ? 'border-green-500 bg-green-500 text-white'
                          : 'border-gray-300'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="flex-1">{option}</span>
                      {answered && selected === option && (
                        q.correctAnswer === option ? 
                        <CheckCircle className="w-6 h-6 text-green-500" /> : 
                        <XCircle className="w-6 h-6 text-red-500" />
                      )}
                      {answered && q.correctAnswer === option && selected !== option && (
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
                  onClick={submit}
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
                  onClick={load}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Brain className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-600 mb-4">Tidak ada pertanyaan tersedia</h3>
            <p className="text-gray-500 mb-8">Silakan coba lagi nanti atau hubungi administrator.</p>
            <button
              onClick={load}
              className="bg-gradient-to-r from-[#a92d23] to-[#7a1f1a] text-white px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
            >
              Muat Ulang
            </button>
          </motion.div>
        )}

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
                onClick={() => signIn()}
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
