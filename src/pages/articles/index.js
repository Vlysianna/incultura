import { useState, useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FileText, Plus, Search, Eye, Calendar, User, MapPin, Sparkles, X, Upload } from 'lucide-react'
import Nav from '../components/Nav'

export default function Articles() {
  const { data: session } = useSession()
  const [articles, setArticles] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [region, setRegion] = useState('')
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => { 
    fetchArticles()
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  async function fetchArticles() {
    try {
      setIsLoading(true)
      const response = await fetch('/api/articles')
      const data = await response.json()
      setArticles(data)
    } catch (error) {
      console.error('Error fetching articles:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5000000) { // 5MB limit
        alert('Ukuran file terlalu besar. Maksimal 5MB.')
        return
      }
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImage(null)
    setImagePreview(null)
  }

  async function submitArticle(e) {
    e.preventDefault()
    if (!session) return alert('Silakan login terlebih dahulu!')

    setIsSubmitting(true)
    try {
      let imageUrl = null

      // Upload image if exists
      if (image) {
        const formData = new FormData()
        formData.append('image', image)

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })

        if (uploadRes.ok) {
          const uploadData = await uploadRes.json()
          imageUrl = uploadData.url
        }
      }

      const res = await fetch('/api/articles', { 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({ title, content, region, image: imageUrl }) 
      })

      if (res.ok) {
        setTitle('')
        setContent('')
        setRegion('')
        setImage(null)
  // ...existing code...
        setImagePreview(null)
        setShowForm(false)
        fetchArticles() // Refresh articles list
      } else {
        throw new Error('Failed to submit article')
      }
    } catch (error) {
      console.error('Error submitting article:', error)
      alert('Terjadi kesalahan saat menyimpan artikel')
    } finally {
      setIsSubmitting(false)
    }
  }

  const filteredArticles = articles.filter(article => {
    // Artikel APPROVED selalu muncul
    if (article.status === 'APPROVED') {
      return (
        article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.region?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    // Artikel PENDING hanya muncul untuk author
    if (article.status === 'PENDING' && session?.user && article.user?.id === session.user.id) {
      return (
        article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.region?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    // Artikel lain tidak ditampilkan
    return false;
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-96 bg-gradient-to-bl from-[#f3d099]/20 to-transparent rounded-bl-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-64 bg-gradient-to-tr from-[#a92d23]/10 to-transparent rounded-tr-[80px] pointer-events-none"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-32 left-10 animate-float">
        <Sparkles className="w-8 h-8 text-[#f3d099]" />
      </div>
      <div className="absolute top-1/3 right-20 animate-bounce">
        <Sparkles className="w-6 h-6 text-[#a92d23]" />
      </div>

    <Nav />

      {/* Main Content */}
      <main className="pt-28 pb-16 px-6 max-w-6xl mx-auto relative z-10">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-[#a92d23] to-[#f3d099] bg-clip-text text-transparent"
          >
            Artikel Budaya Indonesia
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Jelajahi kekayaan budaya Nusantara melalui artikel-artikel informatif dan inspiratif. 
            Belajar, berbagi, dan lestarikan warisan leluhur.
          </motion.p>
        </div>

        {/* Controls Section */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-12">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#a92d23] w-5 h-5" />
            <input
              type="text"
              placeholder="Cari artikel atau daerah..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-[#a92d23] border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a92d23] focus:border-transparent bg-white/80 backdrop-blur-sm"
            />
          </div>

          {/* Add Article Button */}
          {session && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-[#a92d23] to-[#7a1f1a] text-white px-6 py-3 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
            >
              <Plus className="w-5 h-5" />
              Tulis Artikel
            </button>
          )}
        </div>

        {/* Add Article Form Modal */}
        {showForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowForm(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-[#a92d23]">Tulis Artikel Baru</h3>
                <button 
                  onClick={() => setShowForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={submitArticle} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Judul Artikel</label>
                  <input 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Masukkan judul artikel yang menarik..."
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a92d23] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Daerah/Wilayah</label>
                  <input 
                    value={region}
                    onChange={e => setRegion(e.target.value)}
                    placeholder="Contoh: Jawa Barat, Bali, Sumatera Utara..."
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a92d23] focus:border-transparent"
                    required
                  />
                </div>

                {/* Image Upload Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gambar Artikel (Opsional)</label>
                  <div className="space-y-4">
                    {!imagePreview ? (
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          id="image-upload"
                        />
                        <label
                          htmlFor="image-upload"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl hover:border-[#a92d23] transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100"
                        >
                          <Upload className="w-8 h-8 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-600 font-medium">Klik untuk upload gambar</span>
                          <span className="text-xs text-gray-400">PNG, JPG, JPEG (Max 5MB)</span>
                        </label>
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="relative w-full h-48 rounded-xl overflow-hidden">
                          <Image
                            src={imagePreview}
                            alt="Preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-sm text-gray-600">Gambar terpilih</span>
                          <button
                            type="button"
                            onClick={() => document.getElementById('image-upload-replace').click()}
                            className="text-sm text-[#a92d23] hover:underline"
                          >
                            Ganti gambar
                          </button>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          id="image-upload-replace"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Isi Artikel</label>
                  <textarea 
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="Ceritakan tentang budaya yang ingin Anda bagikan..."
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a92d23] focus:border-transparent min-h-[200px] resize-vertical"
                    required
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                    disabled={isSubmitting}
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-[#a92d23] to-[#7a1f1a] text-white py-3 px-6 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                        Menyimpan...
                      </div>
                    ) : (
                      'Publikasikan'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#a92d23]"></div>
          </div>
        )}

        {/* Articles Grid */}
        {!isLoading && (
          <div className="grid gap-8 md:gap-10">
            {filteredArticles.map((article, idx) => (
              <motion.article 
                key={article.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`group rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden border 
                  ${article.status === 'PENDING' ? 'bg-yellow-50 border-yellow-300' : 'bg-white/80 border-white/50 backdrop-blur-sm'}`}
              >
                <div className="p-8 relative">
                  {/* Badge Pending */}
                  {article.status === 'PENDING' && (
                    <div className="absolute top-6 right-6 flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold shadow">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z" /></svg>
                      Pending Review
                    </div>
                  )}
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="inline-flex items-center gap-1 bg-gradient-to-r from-[#f3d099] to-[#a92d23] text-white px-4 py-2 rounded-full text-sm font-medium">
                          <MapPin className="w-4 h-4" />
                          {article.region}
                        </span>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(article.createdAt).toLocaleDateString('id-ID', { 
                            day: 'numeric', month: 'long', year: 'numeric' 
                          })}
                        </span>
                      </div>

                      <h2 className={`text-2xl md:text-3xl font-bold mb-4 group-hover:text-[#7a1f1a] transition-colors ${article.status === 'PENDING' ? 'text-yellow-800' : 'text-[#a92d23]'}`}>
                        {article.title}
                      </h2>

                      {article.status === 'PENDING' && (
                        <div className="mb-2 text-yellow-700 text-sm font-medium flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z" /></svg>
                          Artikel ini masih menunggu persetujuan admin.
                        </div>
                      )}

                      <p className={`text-lg leading-relaxed mb-6 line-clamp-3 ${article.status === 'PENDING' ? 'text-yellow-900' : 'text-gray-600'}`}>
                        {article.content.replace(/<[^>]+>/g, '').substring(0, 200)}...
                      </p>

                      <div className="flex items-center justify-between">
                        <Link 
                          href={`/articles/${article.id}`} 
                          className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl 
                            ${article.status === 'PENDING' ? 'bg-yellow-400 text-yellow-900 hover:bg-yellow-500' : 'bg-gradient-to-r from-[#a92d23] to-[#7a1f1a] text-white'}`}
                        >
                          <Eye className="w-5 h-5" />
                          Baca Selengkapnya
                        </Link>

                        <div className={`flex items-center gap-2 text-sm ${article.status === 'PENDING' ? 'text-yellow-800' : 'text-gray-500'}`}>
                          <User className="w-4 h-4" />
                          <span>{article.user?.name || 'Admin'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Image or Decorative Element */}
                    <div className="hidden md:block w-32">
                      {article.image ? (
                        <div className="w-full h-32 rounded-xl overflow-hidden">
                          <Image
                            src={article.image}
                            alt={article.title}
                            width={128}
                            height={128}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className={`w-full h-32 rounded-xl flex items-center justify-center 
                          ${article.status === 'PENDING' ? 'bg-yellow-100' : 'bg-gradient-to-br from-[#f3d099]/20 to-[#a92d23]/20'}`}>
                          {article.status === 'PENDING' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z" /></svg>
                          ) : (
                            <FileText className="w-16 h-16 text-[#a92d23]/60" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredArticles.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <FileText className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-600 mb-4">
              {searchTerm ? 'Artikel tidak ditemukan' : 'Belum ada artikel'}
            </h3>
            <p className="text-gray-500 mb-8">
              {searchTerm 
                ? 'Coba ubah kata kunci pencarian Anda' 
                : 'Jadilah yang pertama untuk berbagi cerita budaya!'
              }
            </p>
            {session && !searchTerm && (
              <button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-[#a92d23] to-[#7a1f1a] text-white px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
              >
                Tulis Artikel Pertama
              </button>
            )}
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