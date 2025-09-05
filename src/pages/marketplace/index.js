"use client";
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Heart, ShoppingCart, Eye, Filter, Search, MapPin, RefreshCw, AlertCircle, Sparkles, X, Landmark, Palette, Pin, Shirt, Amphora } from 'lucide-react'
import Header from '../../components/Header';
import MarketPlaceCard from '../../components/MarketplaceCard';
import { FooterSection } from '../../components/sections';
import BackgroundDecorator from '../../components/common/BackgroundDecorator';

export default function MarketplacePage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [mounted, setMounted] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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

  // Filter items berdasarkan pencarian saja (kategori dihilangkan)
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name && (
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    return matchesSearch
  })

  const popularSearches = [
    'Songket Palembang',
    'Batik Solo', 
    'Tenun Ikat',
    'Keris Jawa',
    'Tapis Lampung',
    'Ulos Batak',
    'Anyaman Pandan'
  ];

  if (!mounted) return null

  return (
    <>
  <Header />
      <div className="min-h-screen bg-gradient-to-br from-[#f3d099] via-[#f9e6c9] to-[#f3d099] relative overflow-hidden pt-20">

        {/* Indonesian Cultural Background Decorations */}
        <BackgroundDecorator 
          theme="warm" 
          density="medium" 
          animated={true}
        />

        <div className="relative z-10">
          {/* Hero Header dengan ornamen Jawa */}
          <motion.header
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative pt-4 md:pt-8 pb-8 md:pb-12"
          >
            <div className="container mx-auto px-4">
              {/* Ornamental top border */}
              <div className="flex justify-center mb-4 md:mb-6">
                <div className="flex items-center gap-1 md:gap-2">
                  <div className="w-4 md:w-8 h-px bg-[#a92e23]"></div>
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-[#a92e23] rounded-full"></div>
                  <div className="w-8 md:w-16 h-px bg-[#a92e23]"></div>
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-[#a92e23] rotate-45"></div>
                  <div className="w-8 md:w-16 h-px bg-[#a92e23]"></div>
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-[#a92e23] rounded-full"></div>
                  <div className="w-4 md:w-8 h-px bg-[#a92e23]"></div>
                </div>
              </div>

              <div className="text-center">
                <motion.h1
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4 text-[#a92e23] relative"
                  style={{ fontFamily: 'serif' }}
                >
                  🇮🇩 Pasar Budaya Nusantara
                  <div className="text-lg md:text-xl lg:text-2xl mt-3 md:mt-4 text-gray-700 font-normal">
                    Marketplace Kerajinan Tradisional Indonesia
                  </div>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto mb-6 md:mb-8 leading-relaxed px-2 md:px-0"
                >
                  Dari Sabang sampai Merauke, temukan kerajinan tangan autentik dari seluruh Nusantara.
                  Setiap produk merupakan karya seni yang menggambarkan kekayaan budaya Indonesia.
                </motion.p>
              </div>
            </div>
          </motion.header>

          {/* Search and Filter Section */}
          <div className="container mx-auto px-4 mb-8 md:mb-10">
            <div className="relative">
              {/* Main Search Container */}
              <div className="p-4 md:p-6 lg:p-8">

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#a92e23]/20 via-transparent to-amber-500/20"></div>
                  <div className="absolute top-4 right-4 w-20 h-20 md:w-32 md:h-32 bg-gradient-to-br from-[#a92e23]/10 to-amber-500/10 rounded-full blur-xl md:blur-3xl"></div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-amber-500/10 to-[#a92e23]/10 rounded-full blur-xl md:blur-2xl"></div>
                </div>

                {/* Search Header */}
                <div className="relative mb-6 md:mb-8 text-center">
                  <div className="flex items-center justify-center gap-2 md:gap-3 mb-2 md:mb-3">
                    <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-[#a92e23] animate-pulse" />
                    <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#a92e23] to-amber-600 bg-clip-text text-transparent">
                      Koleksi Kerajinan Nusantara 🇮🇩
                    </h2>
                    <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-amber-500 animate-pulse" />
                  </div>
                  <p className="text-gray-600 text-xs md:text-sm">Tukarkan koin dengan kerajinan autentik dari seluruh Indonesia</p>
                </div>

                {/* Enhanced Search Bar */}
                <div className="relative mb-6 md:mb-8">
                  <div className={`relative transition-all duration-500 transform ${isSearchFocused ? 'scale-100' : 'scale-100'}`}>
                    <div className={`absolute inset-0 bg-gradient-to-r from-[#a92e23]/20 via-amber-500/20 to-[#a92e23]/20 rounded-xl md:rounded-2xl blur-lg md:blur-xl transition-opacity duration-300 ${isSearchFocused ? 'opacity-100' : 'opacity-0'}`}></div>

                    <div className="relative bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl border-2 border-transparent bg-gradient-to-r from-white via-white to-white p-1 shadow-lg md:shadow-xl">
                      <div className={`bg-white rounded-lg md:rounded-xl border transition-all duration-300 ${isSearchFocused ? 'border-[#a92e23]/50 shadow-md md:shadow-lg' : 'border-gray-200'}`}>

                        {/* Search Input Container */}
                        <div className="flex items-center">
                          <div className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 ml-1 md:ml-2 rounded-lg md:rounded-xl transition-all duration-300 ${isSearchFocused ? 'bg-gradient-to-br from-[#a92e23] to-amber-600 text-white shadow-md md:shadow-lg' : 'bg-gray-50 text-gray-400'}`}>
                            <Search className="w-4 h-4 md:w-5 md:h-5" />
                          </div>

                          <input
                            type="text"
                            placeholder="Cari kerajinan tradisional Indonesia..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            className="flex-1 px-3 md:px-4 py-3 md:py-4 text-gray-800 placeholder-gray-400 bg-transparent text-base md:text-lg outline-none focus:outline-none focus:ring-0 focus:border-transparent"
                            style={{ outline: "none", boxShadow: "none" }}
                          />

                          {searchQuery && (
                            <button
                              onClick={() => setSearchQuery('')}
                              className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 mr-1 md:mr-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200 cursor-pointer"
                            >
                              <X className="w-3 h-3 md:w-4 md:h-4" />
                            </button>
                          )}

                          <button className="hidden sm:flex items-center cursor-pointer gap-1 md:gap-2 bg-gradient-to-r from-[#a92e23] to-amber-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl mr-1 md:mr-2 font-medium shadow-md md:shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm md:text-base">
                            <Filter className="w-3 h-3 md:w-4 md:h-4" />
                            Cari
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Search Suggestions */}
                  {isSearchFocused && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl border border-white/30 p-3 md:p-4 z-50">
                      <p className="text-xs md:text-sm font-medium text-gray-700 mb-2 md:mb-3">Pencarian Populer:</p>
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {popularSearches.map((search, index) => (
                          <button
                            key={index}
                            onClick={() => setSearchQuery(search)}
                            className="px-2 py-1 md:px-3 md:py-1.5 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-[#a92e23]/10 hover:to-amber-500/10 text-gray-700 text-xs md:text-sm rounded-full border border-gray-200 hover:border-[#a92e23]/30 transition-all duration-300 hover:shadow-md"
                          >
                            {search}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Modern Categories Filter */}
                {/* Categories removed (backend doesn't provide categories) */}
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-10 h-10 md:w-20 md:h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 w-8 h-8 md:w-16 md:h-16 bg-gradient-to-br from-[#a92e23] to-red-600 rounded-full opacity-15 animate-pulse delay-1000"></div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="container mx-auto px-4 pb-16 md:pb-20">
            {loading && (
              <div className="flex justify-center items-center h-48 md:h-64">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-10 h-10 md:w-12 md:h-12 border-4 border-[#a92e23]/20 border-t-[#a92e23] rounded-full"
                />
                <span className="ml-3 md:ml-4 text-sm md:text-base text-gray-700">Memuat produk...</span>
              </div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 md:p-6 mb-6 rounded-lg max-w-2xl mx-auto"
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <AlertCircle className="w-6 h-6 md:w-8 md:h-8" />
                  <div>
                    <h4 className="font-semibold mb-1 text-sm md:text-base">Terjadi Kesalahan</h4>
                    <p className="text-xs md:text-sm">{error}</p>
                    <button
                      onClick={() => window.location.reload()}
                      className="mt-2 md:mt-3 px-3 py-1.5 md:px-4 md:py-2 bg-red-600 text-white rounded-md text-xs md:text-sm hover:bg-red-700 transition-colors"
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
                  className="mb-2 text-center"
                >
                  <p className="text-sm md:text-base text-gray-600">
                    Menampilkan <span className="font-semibold text-[#a92e23]">{filteredItems.length}</span> kerajinan tradisional Indonesia
                  </p>
                </motion.div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                  {filteredItems.map((item, index) => (
                    <MarketPlaceCard
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
                className="text-center py-12 md:py-16"
              >
                <div className="flex justify-center items-center mb-4 md:mb-6">
                  <Amphora className="w-16 h-16 md:w-20 md:h-20 text-[#a92e23]" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-2 md:mb-3">Belum Ada Kerajinan</h3>
                <p className="text-gray-600 mb-4 md:mb-6 max-w-md mx-auto text-sm md:text-base px-4 md:px-0">
                  Kerajinan tradisional yang Anda cari belum tersedia. Coba gunakan kata kunci yang berbeda atau kembali lagi nanti.
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="bg-[#a92e23] text-white px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl hover:bg-[#a92e23]/90 transition-colors duration-300 cursor-pointer text-sm md:text-base"
                >
                  Reset
                </button>
              </motion.div>
            )}
          </div>

          {/* Floating Action Buttons */}
          <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 flex flex-col gap-2 md:gap-3 z-50">
            {/* Refresh Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.location.reload()}
              className="w-12 h-12 md:w-14 md:h-14 bg-white text-[#a92e23] rounded-full shadow-lg flex items-center justify-center border-2 border-[#a92e23]/20 cursor-pointer"
            >
              <RefreshCw className="w-5 h-5 md:w-6 md:h-6" />
            </motion.button>

            {/* Filter Toggle (mobile) */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden w-12 h-12 md:w-14 md:h-14 bg-white text-[#a92e23] rounded-full shadow-lg flex items-center justify-center border-2 border-[#a92e23]/20"
            >
              <Filter className="w-5 h-5 md:w-6 md:h-6" />
            </motion.button>
          </div>

          {/* Decorative bottom border */}
          <div className="relative">
            <div className="absolute bottom-0 left-0 right-0 h-1 md:h-2 bg-gradient-to-r from-[#a92e23] via-[#f3d099] to-[#a92e23]"></div>
            {/* decorative dots removed on user request */}
          </div>
          {/* Wave transition filler (static) - matches FooterSection wave mask to smooth visual join */}
          <div className="relative z-0">
            <div
              className="absolute bottom-0 left-0 w-full h-[100px] rotate-0"
              style={{
                backgroundColor: '#f3d099',
                WebkitMaskImage: "url('/wave.png')",
                WebkitMaskRepeat: 'repeat-x',
                WebkitMaskSize: '1000px 100px',
                WebkitMaskPositionX: `0px`,
                maskImage: "url('/wave.png')",
                maskRepeat: 'repeat-x',
                maskSize: '1000px 100px',
                maskPositionX: `0px`,
                opacity: 0.7,
              }}
            />
            <div
              className="absolute bottom-0 left-0 w-full h-[100px] rotate-0"
              style={{
                backgroundColor: '#f3d099',
                WebkitMaskImage: "url('/wave.png')",
                WebkitMaskRepeat: 'repeat-x',
                WebkitMaskSize: '1000px 100px',
                WebkitMaskPositionX: `0px`,
                maskImage: "url('/wave.png')",
                maskRepeat: 'repeat-x',
                maskSize: '1000px 100px',
                maskPositionX: `0px`,
                opacity: 0.5,
              }}
            />
            <div
              className="absolute bottom-0 left-0 w-full h-[100px] rotate-0"
              style={{
                backgroundColor: '#f3d099',
                WebkitMaskImage: "url('/wave.png')",
                WebkitMaskRepeat: 'repeat-x',
                WebkitMaskSize: '1000px 100px',
                WebkitMaskPositionX: `0px`,
                maskImage: "url('/wave.png')",
                maskRepeat: 'repeat-x',
                maskSize: '1000px 100px',
                maskPositionX: `0px`,
                opacity: 0.3,
              }}
            />
          </div>
        </div>
  </div>
  <FooterSection />
    </>
  )
}