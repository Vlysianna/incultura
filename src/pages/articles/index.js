import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Nav from '../components/Nav'

export default function Articles() {
  const { data: session } = useSession()
  const [list, setList] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [region, setRegion] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  
  useEffect(() => { 
    fetch('/api/articles').then(r => r.json()).then(setList) 
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  async function submit(e){
    e?.preventDefault()
    if (!session) return alert('Silakan login terlebih dahulu!')
    const res = await fetch('/api/articles', { 
      method: 'POST', 
      headers: {'content-type':'application/json'}, 
      body: JSON.stringify({ title, content, region }) 
    })
    await res.json()
    setTitle(''); setContent(''); setRegion('')
    setShowForm(false)
    fetch('/api/articles').then(r=>r.json()).then(setList)
  }

  const filteredArticles = list.filter(article => 
    article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.region?.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 to-white">
      {/* Navbar */}
      <Nav />

      {/* Main Content */}
      <main className="flex-1 pt-28 pb-12 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-[#a92d23] to-[#7a1f1a] bg-clip-text text-transparent">
          Artikel Budaya Indonesia
        </h2>
        
        {session && (
          <form onSubmit={submit} className="mb-12 bg-white p-6 rounded-xl shadow border border-[#f3d099]">
            <h3 className="font-semibold text-lg mb-4 text-[#a92d23]">Tambah Artikel Baru</h3>
            <input 
              value={title}
              onChange={e=>setTitle(e.target.value)}
              placeholder="Judul Artikel"
              className="w-full text-[#a92d23] p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a92d23]"
            />
            <textarea 
              value={content}
              onChange={e=>setContent(e.target.value)}
              placeholder="Isi Artikel"
              className="w-full text-[#a92d23] p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a92d23] min-h-[120px]"
            />
            <input 
              value={region}
              onChange={e=>setRegion(e.target.value)}
              placeholder="Wilayah / Daerah"
              className="w-full text-[#a92d23] p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a92d23]"
            />
            <button 
              type="submit"
              className="bg-gradient-to-r from-[#f3d099] to-[#a92d23] text-white px-6 py-2 rounded-lg hover:scale-105 transition-transform shadow"
            >
              Simpan Artikel
            </button>
          </form>
        )}
        
        <div className="grid gap-6">
          {list.map((a, idx) => {
            const fromLeft = idx % 2 === 0
            return (
              <motion.div 
                key={a.id}
                initial={{ opacity: 0, x: fromLeft ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative p-6 rounded-xl bg-white border border-[#f3d099] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                {a.image && (
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <Image 
                      src={a.image} 
                      alt={a.title} 
                      width={800} 
                      height={400} 
                      className="rounded-lg object-cover h-48 w-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <h3 className="font-bold text-xl text-[#a92d23] mb-2 line-clamp-2 group-hover:text-[#7a1f1a] transition-colors">
                  {a.title}
                </h3>
                
                <div className="flex items-center mb-3 text-sm text-gray-500">
                  <span className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-medium mr-3">
                    {a.region}
                  </span>
                  {new Date(a.createdAt).toLocaleDateString('id-ID', { 
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
                  })}
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {a.content.replace(/<[^>]+>/g, '').substring(0, 150)}...
                </p>

                <Link 
                  href={`/articles/${a.id}`} 
                  className="inline-flex items-center bg-gradient-to-r from-[#f3d099] to-[#a92d23] text-white px-4 py-2 rounded-lg transition-all duration-300 transform group-hover:scale-105 shadow hover:shadow-lg"
                >
                  Baca Selengkapnya
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>

                <span className="absolute top-4 right-4 bg-[#a92d23] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  Baru
                </span>
              </motion.div>
            )
          })}
        </div>

        {/* Controls Section */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-12">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari artikel atau daerah..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a92d23] focus:border-transparent bg-white/80 backdrop-blur-sm"
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

              <form onSubmit={submit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Judul Artikel</label>
                  <input 
                    value={title}
                    onChange={e=>setTitle(e.target.value)}
                    placeholder="Masukkan judul artikel yang menarik..."
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a92d23] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Daerah/Wilayah</label>
                  <input 
                    value={region}
                    onChange={e=>setRegion(e.target.value)}
                    placeholder="Contoh: Jawa Barat, Bali, Sumatera Utara..."
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a92d23] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Isi Artikel</label>
                  <textarea 
                    value={content}
                    onChange={e=>setContent(e.target.value)}
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
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-[#a92d23] to-[#7a1f1a] text-white py-3 px-6 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                  >
                    Publikasikan
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* Articles Grid */}
        <div className="grid gap-8 md:gap-10">
          {filteredArticles.map((article, idx) => (
            <motion.article 
              key={article.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden border border-white/50"
            >
              <div className="p-8">
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

                    <h2 className="text-2xl md:text-3xl font-bold text-[#a92d23] mb-4 group-hover:text-[#7a1f1a] transition-colors">
                      {article.title}
                    </h2>

                    <p className="text-gray-600 text-lg leading-relaxed mb-6 line-clamp-3">
                      {article.content.replace(/<[^>]+>/g, '').substring(0, 200)}...
                    </p>

                    <div className="flex items-center justify-between">
                      <Link 
                        href={`/articles/${article.id}`} 
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#a92d23] to-[#7a1f1a] text-white px-6 py-3 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                      >
                        <Eye className="w-5 h-5" />
                        Baca Selengkapnya
                      </Link>

                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <User className="w-4 h-4" />
                        <span>{article.author?.name || 'Admin'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Element */}
                  <div className="hidden md:block w-32">
                    <div className="w-full h-full bg-gradient-to-br from-[#f3d099]/20 to-[#a92d23]/20 rounded-xl flex items-center justify-center">
                      <FileText className="w-16 h-16 text-[#a92d23]/60" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
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

      {/* Footer sticky di bawah */}
      <footer className="bg-gradient-to-r from-[#a92d23] to-[#7a1f1a] text-white py-4 mt-auto">
        <div className="text-center">
          <p className="text-[#f3d099]">
            © {new Date().getFullYear()} Incultura. Hak Cipta Dilindungi.
          </p>
        </div>
      </footer>
    </div>
  )
}
