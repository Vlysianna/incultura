import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { signIn } from 'next-auth/react'
import { User, Mail, Lock, UserPlus, Eye, EyeOff, CheckCircle, AlertCircle, ArrowRight, Sparkles } from 'lucide-react'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    setMsg('')
    
    try {
      const res = await fetch('/api/register', { 
        method: 'POST', 
        headers: {'content-type':'application/json'}, 
        body: JSON.stringify({ name, email, password }) 
      })
      const j = await res.json()
      
      if (j.error) {
        setMsg(j.error)
        setLoading(false)
        return
      }
      
      // auto sign in
      const signInResult = await signIn('credentials', { 
        redirect: false, 
        email, 
        password 
      })
      
      if (signInResult?.ok) {
        setSuccess(true)
        setMsg('Berhasil mendaftar dan masuk!')
        setTimeout(() => {
          window.location.href = '/'
        }, 2000)
      } else {
        setMsg('Pendaftaran berhasil, silakan login manual')
      }
    } catch (error) {
      setMsg('Terjadi kesalahan, silakan coba lagi')
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50/30 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-96 bg-gradient-to-bl from-indigo-200/20 to-transparent rounded-bl-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-64 bg-gradient-to-tr from-[#a92d23]/10 to-transparent rounded-tr-[80px] pointer-events-none"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-32 left-10 animate-float">
        <UserPlus className="w-8 h-8 text-indigo-400" />
      </div>
      <div className="absolute top-1/3 right-20 animate-bounce">
        <Sparkles className="w-6 h-6 text-[#a92d23]" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-lg border-b border-indigo-200/20">
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
                { href: "/profile", label: "Profile" },               
              ].map((item) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className="text-sm font-medium transition-colors relative group text-[#a92d23] hover:text-[#7a1f1a]"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#a92d23] to-[#f3d099] transition-all duration-300 w-0 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Auth Section */}
            <div className="flex items-center gap-3">
              <Link 
                href="/api/auth/signin" 
                className="text-sm font-medium text-[#a92d23] hover:text-[#7a1f1a] transition-colors"
              >
                Masuk
              </Link>
              <span className="px-4 py-2 bg-gradient-to-r from-[#a92d23] to-[#7a1f1a] text-white rounded-lg text-sm font-medium">
                Daftar
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-28 pb-16 px-6 max-w-4xl mx-auto relative z-10">
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/50">
              <UserPlus className="w-5 h-5 text-indigo-600" />
              <span className="text-sm font-medium text-gray-600">Bergabung Sekarang</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Mulai Perjalanan <span className="bg-gradient-to-r from-[#a92d23] to-[#f3d099] bg-clip-text text-transparent">Budaya</span> Anda
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Bergabunglah dengan komunitas pelestari budaya Indonesia. Pelajari, eksplorasi, dan kumpulkan koin dari aktivitas pembelajaran yang menyenangkan.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Akses artikel budaya Indonesia</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Ikuti kuis interaktif</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Marketplace produk budaya</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Kompetisi leaderboard</span>
              </div>
            </div>

            {/* Cultural Elements Preview */}
            <div className="flex items-center gap-4 pt-4">
              <Image src="/batik.png" alt="Batik" width={40} height={40} className="rounded-lg shadow-md" />
              <Image src="/wayang.png" alt="Wayang" width={40} height={40} className="rounded-lg shadow-md" />
              <Image src="/angklung.png" alt="Angklung" width={40} height={40} className="rounded-lg shadow-md" />
              <Image src="/barong.png" alt="Barong" width={40} height={40} className="rounded-lg shadow-md" />
              <span className="text-sm text-gray-500 ml-2">dan masih banyak lagi...</span>
            </div>
          </motion.div>

          {/* Right Content - Registration Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Buat Akun Baru</h2>
              <p className="text-gray-600">Isi data diri untuk bergabung dengan Incultura</p>
            </div>

            <form onSubmit={submit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#a92d23] focus:border-transparent transition-all duration-300 bg-white/50"
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#a92d23] focus:border-transparent transition-all duration-300 bg-white/50"
                    placeholder="nama@email.com"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#a92d23] focus:border-transparent transition-all duration-300 bg-white/50"
                    placeholder="Minimal 6 karakter"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || success}
                className="w-full bg-gradient-to-r from-[#a92d23] to-[#7a1f1a] text-white py-3 rounded-xl hover:from-[#7a1f1a] hover:to-[#a92d23] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Mendaftar...
                  </>
                ) : success ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Berhasil! Mengarahkan...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    Daftar Sekarang
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Message Display */}
            {msg && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-4 rounded-xl flex items-center gap-3 ${
                  success 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {success ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600" />
                )}
                <span className="text-sm font-medium">{msg}</span>
              </motion.div>
            )}

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Sudah punya akun?{' '}
                <Link 
                  href="/api/auth/signin" 
                  className="text-[#a92d23] hover:text-[#7a1f1a] font-medium transition-colors"
                >
                  Masuk di sini
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
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
