import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Articles() {
  const { data: session } = useSession()
  const [list, setList] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [region, setRegion] = useState('')
  const [scrolled, setScrolled] = useState(false)
  
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
    fetch('/api/articles').then(r => r.json()).then(setList)
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 to-white">
      {/* Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-lg border-b border-[#f3d099]/20' 
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
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-[#f3d099] to-[#a92d23] rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-[#a92d23] to-[#f3d099] bg-clip-text text-transparent">
                  Incultura
                </h1>
                <p className="text-xs text-[#a92d23] font-medium">Digitalisasi Budaya Indonesia</p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {[
                { href: "/", label: "Home" },
                { href: "/articles", label: "Artikel", active: true },
                { href: "/quiz", label: "Kuis" },
                { href: "/marketplace", label: "Marketplace" },
                { href: "/leaderboard", label: "Leaderboard" },                
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

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <Link 
                href="/register" 
                className="text-sm font-medium text-[#a92d23] hover:text-[#7a1f1a] transition-colors hidden sm:block"
              >
                Daftar
              </Link>
              <button 
                className="bg-gradient-to-r from-[#a92d23] to-[#7a1f1a] text-white hover:from-[#7a1f1a] hover:to-[#a92d23] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 px-4 py-2 rounded-lg text-sm font-medium"
              >
                Masuk
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-28 pb-12 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-[#a92d23] to-[#7a1f1a] bg-clip-text text-transparent">
          Artikel Budaya Indonesia
        </h2>
        
        {session && (
          <form onSubmit={submit} className="mb-12 bg-white p-6 rounded-xl shadow border border-[#f3d099]">
            <h3 className="font-semibold text-lg mb-4">Tambah Artikel Baru</h3>
            <input 
              value={title}
              onChange={e=>setTitle(e.target.value)}
              placeholder="Judul Artikel"
              className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a92d23]"
            />
            <textarea 
              value={content}
              onChange={e=>setContent(e.target.value)}
              placeholder="Isi Artikel"
              className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a92d23] min-h-[120px]"
            />
            <input 
              value={region}
              onChange={e=>setRegion(e.target.value)}
              placeholder="Wilayah / Daerah"
              className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a92d23]"
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

        {list.length === 0 && (
          <p className="text-center text-gray-500 mt-10">Belum ada artikel.</p>
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
