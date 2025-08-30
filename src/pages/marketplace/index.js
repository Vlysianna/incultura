import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShoppingBag, Search, Filter, Sparkles, Star, Eye, Heart, ShoppingCart, User, Package } from 'lucide-react'
import { apiGet } from '../../services/api'

export default function MarketplacePage() {
  const { data: session } = useSession()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    apiGet('/api/marketplace')
      .then(setItems)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  const filteredItems = items.filter(item => 
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50/30 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-96 bg-gradient-to-bl from-purple-200/20 to-transparent rounded-bl-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-64 bg-gradient-to-tr from-[#a92d23]/10 to-transparent rounded-tr-[80px] pointer-events-none"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-32 left-10 animate-float">
        <ShoppingBag className="w-8 h-8 text-purple-400" />
      </div>
      <div className="absolute top-1/3 right-20 animate-bounce">
        <Sparkles className="w-6 h-6 text-[#a92d23]" />
      </div>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-purple-200/20' 
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
                { href: "/marketplace", label: "Marketplace", active: true },
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
      <main className="pt-28 pb-16 px-6 max-w-6xl mx-auto relative z-10">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-purple-600 to-[#a92d23] bg-clip-text text-transparent"
          >
            Marketplace Budaya
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Jelajahi dan koleksi produk budaya Indonesia autentik. 
            Gunakan koin yang Anda kumpulkan untuk mendapatkan item eksklusif!
          </motion.p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-12">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari produk budaya..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a92d23] focus:border-transparent bg-white/80 backdrop-blur-sm"
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              <Filter className="w-5 h-5" />
              Filter
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a92d23] mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat produk...</p>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Package className="w-20 h-20 text-red-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-red-600 mb-4">Terjadi Kesalahan</h3>
            <p className="text-red-500 mb-8">{String(error)}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-[#a92d23] to-[#7a1f1a] text-white px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
            >
              Coba Lagi
            </button>
          </motion.div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden border border-white/50"
              >
                {/* Product Image */}
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                  
                  {/* Favorite Button */}
                  <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                    <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
                  </button>

                  {/* Category Badge */}
                  {item.category && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-gradient-to-r from-[#a92d23] to-[#7a1f1a] text-white px-3 py-1 rounded-full text-sm font-medium">
                        {item.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#a92d23] transition-colors">
                    {item.name || 'Produk Budaya'}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {item.description || 'Deskripsi produk budaya Indonesia yang autentik dan berkualitas tinggi.'}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">(4.0)</span>
                  </div>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-[#a92d23]">
                        {item.price || '100'} koin
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Eye className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="flex items-center gap-2 bg-gradient-to-r from-[#a92d23] to-[#7a1f1a] text-white px-4 py-2 rounded-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                        <ShoppingCart className="w-4 h-4" />
                        Beli
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredItems.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-600 mb-4">
              {searchTerm ? 'Produk tidak ditemukan' : 'Belum ada produk tersedia'}
            </h3>
            <p className="text-gray-500 mb-8">
              {searchTerm 
                ? 'Coba ubah kata kunci pencarian Anda' 
                : 'Produk budaya akan segera tersedia di marketplace kami!'
              }
            </p>
          </motion.div>
        )}

        {/* Call to Action for Non-authenticated Users */}
        {!session && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-8 text-center"
          >
            <User className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-purple-800 mb-2">Bergabunglah untuk Berbelanja</h3>
            <p className="text-purple-700 mb-6 max-w-2xl mx-auto">
              Daftar sekarang untuk mengakses marketplace lengkap, menggunakan koin dari kuis, 
              dan mendapatkan produk budaya eksklusif!
            </p>
            <div className="flex gap-4 justify-center">
              <Link 
                href="/register"
                className="bg-purple-600 text-white px-8 py-4 rounded-xl hover:bg-purple-700 transition-colors font-medium"
              >
                Daftar Gratis
              </Link>
              <button 
                onClick={() => signIn()}
                className="border border-purple-600 text-purple-600 px-8 py-4 rounded-xl hover:bg-purple-50 transition-colors font-medium"
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
