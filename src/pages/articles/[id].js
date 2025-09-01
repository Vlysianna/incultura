import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import Nav from '../components/Nav'

export default function ArticleDetail() {
  const router = useRouter()
  const { id } = router.query
  const [article, setArticle] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const { data: session } = useSession()
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [musicInfo, setMusicInfo] = useState({
    title: "Kopi dan Kue",
    artist: "Masdito Bachtiar"
  })

  // Scroll navbar shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll progress untuk artikel
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.body.scrollHeight - window.innerHeight
      const scrolledPercent = (scrollTop / docHeight) * 100
      setProgress(scrolledPercent)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Ambil artikel berdasarkan ID
  useEffect(() => {
    if (!id) return
    fetch('/api/articles').then(r => r.json()).then(list => {
      const a = list.find(x => String(x.id) === String(id))
      setArticle(a)
      if (session?.user) {
        // Use localStorage to prevent duplicate notifications for the same article/user
        const coinKey = `article_coin_${id}_${session.user.id}`
        if (!localStorage.getItem(coinKey)) {
          fetch('/api/articles/view', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ articleId: id })
          }).then(r => r.json()).then(j => {
            if (j.success) {
              const notification = document.createElement('div')
              notification.innerHTML = `
                <div class="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg z-50 flex items-center">
                  <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  <span>Kamu mendapat +10 koin untuk membaca!</span>
                </div>
              `
              document.body.appendChild(notification)
              setTimeout(() => document.body.removeChild(notification), 3000)
              localStorage.setItem(coinKey, 'awarded')
            } else if (j.message && j.message.includes('already awarded')) {
              // Show a subtle info notification if already read
              const notification = document.createElement('div')
              notification.innerHTML = `
                <div class="fixed top-4 right-4 bg-gray-100 border border-gray-300 text-gray-700 px-4 py-3 rounded-lg shadow-lg z-50 flex items-center">
                  <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  <span>Kamu sudah pernah membaca artikel ini. Tidak ada koin tambahan.</span>
                </div>
              `
              document.body.appendChild(notification)
              setTimeout(() => document.body.removeChild(notification), 3000)
              localStorage.setItem(coinKey, 'already')
            }
          }).catch((err) => { console.error('Error calling /api/articles/view', err) })
        }
      }
    })
  }, [id, session])

  // Kontrol musik
  const toggleMusic = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  if (!article) return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/80 backdrop-blur-md shadow-lg border-b border-[#f3d099]/20'
        : 'bg-transparent'
        }`}>
        {/* Logo Section */}
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
      </header>
      <main className="pt-28 pb-12 px-6 max-w-4xl mx-auto">
        <div className="text-center py-16">
          <div className="animate-pulse bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <p className="text-gray-600">Memuat artikel...</p>
        </div>
      </main>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Progress Bar Membaca */}
      <div className="fixed top-0 left-0 h-1 bg-[#a92d23] z-[60]" style={{ width: `${progress}%` }}></div>

      {/* Navbar */}
      <Nav />
      {/* Konten Artikel */}
      <main className="pt-28 pb-20 px-6 max-w-4xl mx-auto">
        <Link href="/articles" className="inline-flex items-center text-[#a92d23] hover:text-[#7a1f1a] mb-6 transition-colors group">
          <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Kembali ke Artikel
        </Link>

        <motion.article
          className="bg-white rounded-xl shadow-md p-8 border border-[#f3d099]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
              {article.region}
            </span>
            <span className="text-sm text-gray-500">
              {new Date(article.createdAt).toLocaleDateString('id-ID', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
              })}
            </span>
          </div>

          <h1 className="text-3xl font-bold mb-6 text-[#a92d23]">{article.title}</h1>

          <div className="prose max-w-none article-content" dangerouslySetInnerHTML={{ __html: article.content }} />

          {session?.user && (
            <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-[#f3d099] flex items-center">
              <svg className="w-6 h-6 text-amber-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p className="text-amber-800">Kamu telah mendapatkan 10 koin karena telah membaca artikel ini!</p>
            </div>
          )}
        </motion.article>
      </main>

      {/* Player Musik */}
      <audio ref={audioRef} src="/A Space For The Unbound (Original Soundtrack) Kopi dan Kue.mp3" loop></audio>
      
      {/* Container untuk Player dan Info Lagu */}
      <div className="fixed bottom-6 right-6 flex items-end gap-3 z-50">
        {/* Info Lagu */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-lg p-3 max-w-xs border border-amber-200"
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-r from-[#a92d23] to-[#7a1f1a] rounded flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{musicInfo.title}</p>
                  <p className="text-xs text-gray-500 truncate">oleh {musicInfo.artist}</p>
                </div>
              </div>
              
              {/* Progress bar sederhana */}
              <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
                <div className="bg-[#a92d23] h-1 rounded-full animate-pulse"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tombol Play/Pause */}
        <button
          onClick={toggleMusic}
          className="bg-gradient-to-r from-[#a92d23] to-[#7a1f1a] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex-shrink-0"
          aria-label={isPlaying ? "Jeda musik" : "Putar musik"}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#a92d23] to-[#7a1f1a] text-white py-2 px-6 mt-6 bottom-0">
        <div className="mt-12 py-2 text-center">
          <p className="text-[#f3d099]">
            © {new Date().getFullYear()} Incultura. Hak Cipta Dilindungi.
          </p>
        </div>
      </footer>

      <style jsx>{`
        .article-content {
          line-height: 1.8;
          color: #374151;
        }
        .article-content h2 {
          font-size: 1.5rem;
          font-weight: bold;
          color: #a92d23;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .article-content h3 {
          font-size: 1.25rem;
          font-weight: bold;
          color: #a92d23;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .article-content p {
          margin-bottom: 1rem;
        }
        .article-content a {
          color: #a92d23;
          text-decoration: underline;
        }
        .article-content blockquote {
          border-left: 4px solid #f3d099;
          padding-left: 1rem;
          font-style: italic;
          color: #6b7280;
        }
      `}</style>
    </div>
  )
}