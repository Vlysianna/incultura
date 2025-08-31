"use client";
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Heart, ShoppingCart, Eye, Filter, Search, MapPin, RefreshCw, AlertCircle, Sparkles, X } from 'lucide-react'
import Nav from '../components/Nav';

// Komponen Card yang lebih inovatif - DIUBAH untuk menggunakan data dari API
function InnovativeCard({ item, index, onRedeem }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [redeeming, setRedeeming] = useState(false)

  const handleRedeem = async () => {
    setRedeeming(true);
    try {
      const response = await fetch('/api/marketplace', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId: item.id }),
      });

      if (response.ok) {
        alert('Penukaran berhasil!');
        if (onRedeem) onRedeem();
      } else {
        const error = await response.json();
        alert(`Penukaran gagal: ${error.error}`);
      }
    } catch (error) {
      alert('Terjadi kesalahan saat menukar item');
    } finally {
      setRedeeming(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -8 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Container dengan efek shadow dan border yang unik */}
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-[#a92e23]/20">

        {/* Ornament corner - Motif Jawa */}
        <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-[#a92e23] to-[#f3d099] transform rotate-45 translate-x-2 -translate-y-2"></div>
          <svg className="absolute top-1 right-1 w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15.09 8.26L22 9L16.5 14.74L18.18 22L12 18.27L5.82 22L7.5 14.74L2 9L8.91 8.26L12 2Z" />
          </svg>
        </div>

        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={item.image || "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400"}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Overlay dengan motif batik */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-[#a92e23]/90 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
              {item.category?.toUpperCase() || "BUDAYA"}
            </span>
          </div>

          {/* Like button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm"
          >
            <Heart
              className={`w-4 h-4 transition-colors duration-200 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'
                }`}
            />
          </motion.button>

          {/* Quick actions overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3"
              >
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#f3d099] transition-colors"
                >
                  <Eye className="w-5 h-5 text-[#a92e23]" />
                </motion.button>
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  onClick={handleRedeem}
                  disabled={redeeming}
                  className="w-10 h-10 bg-[#a92e23] rounded-full flex items-center justify-center hover:bg-[#a92e23]/80 transition-colors disabled:opacity-50"
                >
                  <ShoppingCart className="w-5 h-5 text-white" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title and Price */}
          <div className="mb-3">
            <h3 className="font-bold text-lg text-gray-800 mb-1 line-clamp-1">
              {item.name}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-[#a92e23]">
                {item.cost || item.price || 100} Koin
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-gray-600">{item.rating || "4.8"}</span>
                <span className="text-xs text-gray-500">({item.reviews || 10})</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {item.description || "Merchandise budaya Indonesia eksklusif yang dapat ditukar dengan koin yang Anda kumpulkan."}
          </p>

          {/* Seller Info */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-800">{item.seller || "Toko Budaya"}</p>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500">{item.location || "Indonesia"}</span>
              </div>
            </div>
          </div>

          {/* Ornamental divider */}
          <div className="flex items-center mb-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#a92e23]/30 to-transparent"></div>
            <div className="w-2 h-2 bg-[#a92e23] rounded-full mx-2"></div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#a92e23]/30 to-transparent"></div>
          </div>

          {/* Action Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRedeem}
            disabled={redeeming}
            className="w-full bg-gradient-to-r from-[#a92e23] to-[#a92e23]/80 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {redeeming ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Memproses...
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                Tukar dengan Koin
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default function MarketplacePage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [mounted, setMounted] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => setMounted(true), [])

  // Mengambil data dari API yang benar - DIUBAH ke /api/marketplace
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/marketplace')
        if (!response.ok) {
          throw new Error(`Gagal mengambil data: ${response.status} ${response.statusText}`)
        }
        const data = await response.json()
        setItems(data)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [])

  // Fungsi untuk refresh data setelah penukaran
  const handleRedeemSuccess = async () => {
    try {
      const response = await fetch('/api/marketplace')
      if (response.ok) {
        const data = await response.json()
        setItems(data)
      }
    } catch (err) {
      console.error('Gagal memperbarui data:', err)
    }
  }

  // Filter items berdasarkan kategori dan pencarian
  const filteredItems = items.filter(item => {
    const matchesCategory = activeFilter === 'all' || (item.category && item.category === activeFilter)
    const matchesSearch = item.name && (
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    return matchesCategory && matchesSearch
  })

  const categories = [
    { id: 'all', name: 'Semua', icon: '🏛️' },
    { id: 'batik', name: 'Batik', icon: '🎨' },
    { id: 'pin', name: 'Pin', icon: '📌' },
    { id: 'pakaian', name: 'Pakaian', icon: '👘' }
  ]

  const popularSearches = [
    'Pin Wayang',
    'Syal Batik',
  ];


  if (!mounted) return null

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gradient-to-br from-[#f3d099] via-[#f9e6c9] to-[#f3d099] relative overflow-hidden pt-20">

        {/* Floating Batik Patterns */}
        <div className="fixed inset-0 pointer-events-none">
          {/* Large floating batik motif */}
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-20 left-10 w-32 h-32 opacity-5"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <g fill="#a92e23">
                <circle cx="50" cy="50" r="40" />
                <circle cx="50" cy="30" r="15" fill="#f3d099" />
                <circle cx="35" cy="60" r="10" fill="#f3d099" />
                <circle cx="65" cy="60" r="10" fill="#f3d099" />
                <path d="M20,20 Q50,10 80,20 Q90,50 80,80 Q50,90 20,80 Q10,50 20,20" fill="none" stroke="#f3d099" strokeWidth="3" />
              </g>
            </svg>
          </motion.div>

          {/* Medium floating elements */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/3 right-16 w-24 h-24 opacity-10"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M50,10 L70,40 L90,30 L70,60 L90,70 L70,60 L50,90 L30,60 L10,70 L30,60 L10,30 L30,40 Z"
                fill="#a92e23" />
            </svg>
          </motion.div>

          {/* Small floating patterns */}
          <motion.div
            animate={{
              rotate: [0, -360],
              y: [0, 15, 0]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-32 left-1/4 w-16 h-16 opacity-8"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <rect x="20" y="20" width="60" height="60" fill="#a92e23" rx="10" />
              <circle cx="50" cy="50" r="20" fill="#f3d099" />
              <circle cx="50" cy="50" r="8" fill="#a92e23" />
            </svg>
          </motion.div>
        </div>

        <div className="relative z-10">
          {/* Hero Header dengan ornamen Jawa */}
          <motion.header
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative pt-8 pb-12"
          >
            <div className="container mx-auto px-4">
              {/* Ornamental top border */}
              <div className="flex justify-center mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-px bg-[#a92e23]"></div>
                  <div className="w-3 h-3 bg-[#a92e23] rounded-full"></div>
                  <div className="w-16 h-px bg-[#a92e23]"></div>
                  <div className="w-4 h-4 bg-[#a92e23] rotate-45"></div>
                  <div className="w-16 h-px bg-[#a92e23]"></div>
                  <div className="w-3 h-3 bg-[#a92e23] rounded-full"></div>
                  <div className="w-8 h-px bg-[#a92e23]"></div>
                </div>
              </div>

              <div className="text-center">
                <motion.h1
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-5xl md:text-7xl font-bold mb-4 text-[#a92e23] relative"
                  style={{ fontFamily: 'serif' }}
                >
                  ꦥꦱꦂ ꦧꦸꦢꦪ ꦗꦮ
                  <div className="text-2xl md:text-3xl mt-15 text-gray-700 font-normal">
                    Pasar Budaya Jawa
                  </div>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-lg text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed"
                >
                  Lestarikan warisan nenek moyang melalui karya seni tradisional yang memukau.
                  Setiap produk membawa cerita dan filosofi mendalam dari tanah Jawa.
                </motion.p>
              </div>
            </div>
          </motion.header>

          {/* Search and Filter Section */}
          <div className="container mx-auto px-4 mb-10">
            <div className="relative">
              {/* Main Search Container */}
              <div className="p-8">

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#a92e23]/20 via-transparent to-amber-500/20"></div>
                  <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-[#a92e23]/10 to-amber-500/10 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-br from-amber-500/10 to-[#a92e23]/10 rounded-full blur-2xl"></div>
                </div>

                {/* Search Header */}
                <div className="relative mb-8 text-center">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <Sparkles className="w-6 h-6 text-[#a92e23] animate-pulse" />
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-[#a92e23] to-amber-600 bg-clip-text text-transparent">
                      Tukarkan Koinmu di Pasar Budaya
                    </h2>
                    <Sparkles className="w-6 h-6 text-amber-500 animate-pulse" />
                  </div>
                  <p className="text-gray-600 text-sm">Tidak Mendapatkan Koin? Baca Artikel Untuk Mendapatkan Koin</p>
                </div>

                {/* Enhanced Search Bar */}
                <div className="relative mb-8">
                  <div className={`relative transition-all duration-500 transform ${isSearchFocused ? 'scale-100' : 'scale-100'}`}>
                    <div className={`absolute inset-0 bg-gradient-to-r from-[#a92e23]/20 via-amber-500/20 to-[#a92e23]/20 rounded-2xl blur-xl transition-opacity duration-300 ${isSearchFocused ? 'opacity-100' : 'opacity-0'}`}></div>

                    <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-transparent bg-gradient-to-r from-white via-white to-white p-1 shadow-xl">
                      <div className={`bg-white rounded-xl border transition-all duration-300 ${isSearchFocused ? 'border-[#a92e23]/50 shadow-lg' : 'border-gray-200'}`}>

                        {/* Search Input Container */}
                        <div className="flex items-center">
                          <div className={`flex items-center justify-center w-12 h-12 ml-2 rounded-xl transition-all duration-300 ${isSearchFocused ? 'bg-gradient-to-br from-[#a92e23] to-amber-600 text-white shadow-lg' : 'bg-gray-50 text-gray-400'}`}>
                            <Search className="w-5 h-5" />
                          </div>

                          <input
                            type="text"
                            placeholder="Ketik untuk mencari produk..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            className="flex-1 px-4 py-4 text-gray-800 placeholder-gray-400 bg-transparent text-lg outline-none focus:outline-none focus:ring-0 focus:border-transparent"
                            style={{ outline: "none", boxShadow: "none" }}
                          />

                          {searchQuery && (
                            <button
                              onClick={() => setSearchQuery('')}
                              className="flex items-center justify-center w-10 h-10 mr-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200 cursor-pointer"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}

                          <button className="flex items-center cursor-pointer gap-2 bg-gradient-to-r from-[#a92e23] to-amber-600 text-white px-6 py-3 rounded-xl mr-2 font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                            <Filter className="w-4 h-4" />
                            Cari
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Search Suggestions */}
                  {isSearchFocused && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 p-4 z-50">
                      <p className="text-sm font-medium text-gray-700 mb-3">Pencarian Populer:</p>
                      <div className="flex flex-wrap gap-2">
                        {popularSearches.map((search, index) => (
                          <button
                            key={index}
                            onClick={() => setSearchQuery(search)}
                            className="px-3 py-1.5 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-[#a92e23]/10 hover:to-amber-500/10 text-gray-700 text-sm rounded-full border border-gray-200 hover:border-[#a92e23]/30 transition-all duration-300 hover:shadow-md"
                          >
                            {search}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Modern Categories Filter */}
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-[#a92e23]/50 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-600 px-3">Kategori Produk</span>
                    <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-[#a92e23]/50 rounded-full"></div>
                  </div>

                  {/* Categories Grid */}
                  <div className="flex flex-wrap justify-center gap-3">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setActiveFilter(category.id)}
                        className={`group relative overflow-hidden rounded-2xl py-4 px-10 transition-all duration-500 hover:scale-105 cursor-pointer ${activeFilter === category.id
                          ? 'bg-gradient-to-br from-[#a92e23] via-[#a92e23] to-amber-600 text-white shadow-2xl scale-105'
                          : 'bg-white/70 hover:bg-white/90 text-gray-700 border border-gray-200/50 hover:border-[#a92e23]/30 shadow-md hover:shadow-lg'
                          }`}
                      >
                        {/* Background Glow Effect */}
                        <div className={`absolute inset-0 bg-gradient-to-br from-[#a92e23]/20 to-amber-500/20 rounded-2xl blur-xl transition-opacity duration-300 ${activeFilter === category.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-30'
                          }`}></div>

                        {/* Content */}
                        <div className="relative flex flex-col items-center gap-2">
                          <span className="text-2xl transform transition-transform duration-300 group-hover:scale-110">
                            {category.icon}
                          </span>
                          <span className="text-sm font-medium text-center leading-tight">
                            {category.name}
                          </span>

                          {/* Active Indicator */}
                          {activeFilter === category.id && (
                            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-[#a92e23] to-red-600 rounded-full opacity-15 animate-pulse delay-1000"></div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="container mx-auto px-4 pb-20">
            {loading && (
              <div className="flex justify-center items-center h-64">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 border-4 border-[#a92e23]/20 border-t-[#a92e23] rounded-full"
                />
                <span className="ml-4 text-gray-700">Memuat produk...</span>
              </div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 border-l-4 border-red-400 text-red-700 p-6 mb-6 rounded-lg max-w-2xl mx-auto"
              >
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-8 h-8" />
                  <div>
                    <h4 className="font-semibold mb-1">Terjadi Kesalahan</h4>
                    <p className="text-sm">{error}</p>
                    <button
                      onClick={() => window.location.reload()}
                      className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition-colors"
                    >
                      Coba Lagi
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {!loading && !error && (
              <>
                {/* Results count */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6 text-center"
                >
                  <p className="text-gray-600">
                    Menampilkan <span className="font-semibold text-[#a92e23]">{filteredItems.length}</span> produk budaya
                  </p>
                </motion.div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredItems.map((item, index) => (
                    <InnovativeCard
                      key={item.id}
                      item={item}
                      index={index}
                      onRedeem={handleRedeemSuccess}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Empty State */}
            {!loading && filteredItems.length === 0 && !error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="text-8xl mb-6">🏺</div>
                <h3 className="text-2xl font-bold text-gray-700 mb-3">Belum Ada Produk</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Produk yang Anda cari belum tersedia. Coba gunakan filter yang berbeda atau kembali lagi nanti.
                </p>
                <button
                  onClick={() => {
                    setActiveFilter('all')
                    setSearchQuery('')
                  }}
                  className="bg-[#a92e23] text-white px-6 py-3 rounded-xl hover:bg-[#a92e23]/90 transition-colors duration-300 cursor-pointer"
                >
                  Reset Filter
                </button>
              </motion.div>
            )}
          </div>

          {/* Floating Action Buttons */}
          <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-30">
            {/* Refresh Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.location.reload()}
              className="w-14 h-14 bg-white text-[#a92e23] rounded-full shadow-lg flex items-center justify-center border-2 border-[#a92e23]/20 cursor-pointer"
            >
              <RefreshCw className="w-6 h-6" />
            </motion.button>

            {/* Filter Toggle (mobile) */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="lg:hidden w-14 h-14 bg-white text-[#a92e23] rounded-full shadow-lg flex items-center justify-center border-2 border-[#a92e23]/20"
            >
              <Filter className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Decorative bottom border */}
          <div className="relative">
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#a92e23] via-[#f3d099] to-[#a92e23]"></div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
              {[1, 2, 3, 4, 5].map(i => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-2 h-2 bg-[#a92e23] rounded-full"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}