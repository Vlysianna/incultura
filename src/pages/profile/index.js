import { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { User, Trophy, Activity, Calendar, Coins, Award, BookOpen, Brain, ShoppingBag, Edit, Sparkles } from 'lucide-react'
import Header from '../../components/Header';
import { FooterSection } from '../../components/sections';

export default function Profile() {
  const { data: session } = useSession()
  const [u, setU] = useState(null)
  const [loading, setLoading] = useState(true)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (session?.user?.id) {
      fetch(`/api/profile?userId=${session.user.id}`)
        .then(r => r.json())
        .then(setU)
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [session])

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-white/95 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-96 bg-gradient-to-bl from-[#f3d099]/20 to-transparent rounded-bl-[100px] pointer-events-none"></div>
        
  <Header />

        {/* Login Required Content */}
        <main className="pt-28 pb-16 px-6 max-w-4xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <User className="w-24 h-24 text-[#f3d099]/60 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Akses Terbatas</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Silakan masuk atau daftar untuk mengakses halaman profil Anda dan melihat progres pembelajaran budaya.
            </p>
            <div className="flex gap-4 justify-center">
              <Link 
                href="/register"
                className="bg-gradient-to-r from-[#a92d23] to-[#f3d099] text-white px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
              >
                Daftar Sekarang
              </Link>
              <button 
                onClick={() => signIn('credentials', { callbackUrl: '/profile' })}
                className="border border-[#a92d23] text-[#a92d23] px-8 py-4 rounded-xl hover:bg-[#f3d099]/10 transition-colors font-medium"
              >
                Masuk
              </button>
            </div>
          </motion.div>
        </main>
      <FooterSection />
    </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-white/95 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a92d23] mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat profil...</p>
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
        <Trophy className="w-8 h-8 text-[#f3d099]" />
      </div>
      <div className="absolute top-1/3 right-20 animate-bounce">
        <Sparkles className="w-6 h-6 text-[#a92d23]" />
      </div>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-[#f3d099]/20' 
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
                { href: "/quiz", label: "Kuis" },
                { href: "/marketplace", label: "Marketplace" },
                { href: "/leaderboard", label: "Leaderboard" },
                { href: "/profile", label: "Profile", active: true },               
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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-28 pb-16 px-6 max-w-6xl mx-auto relative z-10">
        {/* Compute dynamic statistics once data loaded */}
        {u && !u._stats && (() => {
          const quizActivities = u.activities?.filter(a => a.type.startsWith('quiz')) || []
          const quizAnswered = quizActivities.length
          const quizCorrect = quizActivities.filter(a => a.type === 'quiz_correct').length
          const quizAccuracy = quizAnswered ? Math.round((quizCorrect / quizAnswered) * 100) : 0
          const articleReads = u.activities?.filter(a => a.type === 'article_view').length || 0
          const articleWrites = Array.isArray(u.articles) ? u.articles.length : 0
          const redeemActs = u.activities?.filter(a => a.type === 'redeem') || []
          const itemsBought = redeemActs.length
          const coinsSpent = redeemActs.reduce((s, a) => s + (a.coins < 0 ? -a.coins : 0), 0)
          u._stats = { quizAnswered, quizAccuracy, articleReads, articleWrites, itemsBought, coinsSpent }
          return null
        })()}

        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-[#a92d23] to-[#f3d099] rounded-full flex items-center justify-center shadow-lg">
                <User className="w-16 h-16 text-white" />
              </div>
              <button className="absolute -bottom-2 -right-2 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                <Edit className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {u?.name || session.user?.name || 'Pengguna'}
              </h1>
              <p className="text-gray-600 mb-4">{u?.email || session.user?.email}</p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Coins className="w-5 h-5 text-yellow-500" />
                    <span className="text-2xl font-bold text-yellow-600">{u?.coins || 0}</span>
                  </div>
                  <p className="text-sm text-gray-500">Total Koin</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Award className="w-5 h-5 text-[#a92d23]" />
                    <span className="text-2xl font-bold text-[#a92d23]">{u?.activities?.length || 0}</span>
                  </div>
                  <p className="text-sm text-gray-500">Aktivitas</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Calendar className="w-5 h-5 text-[#f3d099]" />
                    <span className="text-2xl font-bold text-[#f3d099]">
                      {u?.createdAt ? Math.floor((Date.now() - new Date(u.createdAt).getTime()) / (1000 * 60 * 60 * 24)) : 0}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">Hari Bergabung</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Quiz Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-[#f3d099]/20 rounded-full">
                <Brain className="w-6 h-6 text-[#a92d23]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Kuis</h3>
                <p className="text-sm text-gray-600">Progres Belajar</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Soal Dijawab</span>
                <span className="font-medium">{u?._stats?.quizAnswered ?? 0}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Akurasi</span>
                <span className="font-medium text-[#a92d23]">{u?._stats?.quizAccuracy ?? 0}%</span>
              </div>
            </div>
          </motion.div>

          {/* Articles Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-[#a92d23]/20 rounded-full">
                <BookOpen className="w-6 h-6 text-[#a92d23]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Artikel</h3>
                <p className="text-sm text-gray-600">Kontribusi</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Dibaca</span>
                <span className="font-medium">{u?._stats?.articleReads ?? 0}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Ditulis</span>
                <span className="font-medium text-[#f3d099]">{u?._stats?.articleWrites ?? 0}</span>
              </div>
            </div>
          </motion.div>

          {/* Marketplace Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-[#f3d099]/20 rounded-full">
                <ShoppingBag className="w-6 h-6 text-[#a92d23]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Marketplace</h3>
                <p className="text-sm text-gray-600">Pembelian</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Item Dibeli</span>
                <span className="font-medium">{u?._stats?.itemsBought ?? 0}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Koin Digunakan</span>
                <span className="font-medium text-[#a92d23]">{u?._stats?.coinsSpent ?? 0}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Activity History */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-6 h-6 text-[#a92d23]" />
            <h2 className="text-2xl font-bold text-gray-800">Riwayat Aktivitas</h2>
          </div>

          {u?.activities && u.activities.length > 0 ? (
            <div className="space-y-4">
              {u.activities.slice(0, 10).map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className={`p-2 rounded-full ${
                    activity.type === 'quiz' ? 'bg-[#f3d099]/20' :
                    activity.type === 'article' ? 'bg-[#a92d23]/20' :
                    'bg-[#f3d099]/20'
                  }`}>
                    {activity.type === 'quiz' && <Brain className="w-5 h-5 text-[#a92d23]" />}
                    {activity.type === 'article' && <BookOpen className="w-5 h-5 text-[#a92d23]" />}
                    {activity.type === 'marketplace' && <ShoppingBag className="w-5 h-5 text-[#a92d23]" />}
                  </div>
                  
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 capitalize">
                      {activity.type} — {activity.description || 'Aktivitas'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(activity.createdAt).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  
                  <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                    activity.coins > 0 ? 'bg-[#f3d099]/20 text-[#a92d23]' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <Coins className="w-4 h-4" />
                    {activity.coins > 0 ? `+${activity.coins}` : activity.coins}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600 mb-2">Belum Ada Aktivitas</h3>
              <p className="text-gray-500 mb-6">Mulai menjelajahi artikel, mengikuti kuis, atau berbelanja di marketplace!</p>
              <div className="flex gap-3 justify-center">
                <Link 
                  href="/quiz"
                  className="bg-[#a92d23] text-white px-6 py-3 rounded-xl hover:bg-[#7a1f1a] transition-colors"
                >
                  Mulai Kuis
                </Link>
                <Link 
                  href="/articles"
                  className="border border-[#a92d23] text-[#a92d23] px-6 py-3 rounded-xl hover:bg-[#f3d099]/10 transition-colors"
                >
                  Baca Artikel
                </Link>
              </div>
            </div>
          )}
        </motion.div>
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
