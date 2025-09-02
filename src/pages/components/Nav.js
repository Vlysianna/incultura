import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Brain, Trophy, Users, Clock, CheckCircle, XCircle, RotateCcw, Sparkles, User } from 'lucide-react'
import Image from 'next/image'

export default function Nav() {
  const { data: session } = useSession()
  const [coins, setCoins] = useState(null)
  const [score, setScore] = useState(0)
  const [isAdmin, setIsAdmin] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (session?.user?.id) {
      fetch(`/api/coins?userId=${session.user.id}`).then(r => r.json()).then(d => setCoins(d.coins))
      fetch(`/api/profile?userId=${session.user.id}`).then(r => r.json()).then(d => setIsAdmin(!!d.user?.isAdmin)).catch(() => { })
    }
  }, [session])

  // Menutup menu mobile saat mengklik link
  const handleLinkClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/80 backdrop-blur-md shadow-lg border-b border-[#f3d099]/20'
        : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group" onClick={handleLinkClick}>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-[#a92d23] to-[#f3d099] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <Image src="/InculturaLogo.svg" alt="logo" width={24} height={24} />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-[#f3d099] to-[#a92d23] rounded-full animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-[#a92d23] to-[#f3d099] bg-clip-text text-transparent">
                  Incultura
                </h1>
                <p className="text-xs text-[#a92d23] font-medium">Digitalisasi Budaya Indonesia</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {[
                { href: "/", label: "Home" },
                { href: "/articles", label: "Artikel" },
                { href: "/quiz", label: "Kuis" },
                { href: "/marketplace", label: "Marketplace" },
                { href: "/leaderboard", label: "Leaderboard" },
                { href: "/profile", label: "Profile" },
                ...(isAdmin ? [{ href: "/admin/articles", label: "Admin" }] : []),
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors relative group text-[#a92d23] hover:text-[#7a1f1a]`}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#a92d23] to-[#f3d099] transition-all duration-300 w-0 group-hover:w-full`}></span>
                </Link>
              ))}
            </nav>

            {/* Desktop Auth Buttons - disembunyikan di mobile */}
            <div className="hidden md:flex items-center gap-3">
              {session ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium">
                    <Trophy className="w-4 h-4" />
                    {coins !== null ? coins : score} koin
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
                    className="text-sm font-medium text-[#a92d23] hover:text-[#7a1f1a] transition-colors"
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

            {/* Mobile Menu Button - hanya tombol hamburger di mobile */}
            <button 
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 relative"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`bg-[#a92d23] h-0.5 w-6 rounded transform transition duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`bg-[#a92d23] h-0.5 w-6 rounded my-1.5 transition duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`bg-[#a92d23] h-0.5 w-6 rounded transform transition duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <nav className="px-6 py-4 bg-white/95 backdrop-blur-md border-t border-[#f3d099]/30">
            <div className="flex flex-col space-y-4">
              {[
                { href: "/", label: "Home" },
                { href: "/articles", label: "Artikel" },
                { href: "/quiz", label: "Kuis" },
                { href: "/marketplace", label: "Marketplace" },
                { href: "/leaderboard", label: "Leaderboard" },
                { href: "/profile", label: "Profile" },
                ...(isAdmin ? [{ href: "/admin/articles", label: "Admin" }] : []),
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-base font-medium py-2 transition-colors text-[#a92d23] hover:text-[#7a1f1a] border-b border-[#f3d099]/20`}
                  onClick={handleLinkClick}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Auth Section */}
              <div className="pt-4 border-t border-[#f3d099]/30">
                {session ? (
                  <>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium">
                        <Trophy className="w-4 h-4" />
                        {coins !== null ? coins : score} koin
                      </div>
                    </div>
                    <p className="text-sm text-[#a92d23] mb-2">
                      Hi, {session.user.name || session.user.email}
                    </p>
                    <button 
                      onClick={() => {
                        signOut();
                        handleLinkClick();
                      }}
                      className="w-full text-left text-base font-medium py-2 transition-colors text-[#a92d23] hover:text-[#7a1f1a]"
                    >
                      Keluar
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      href="/register" 
                      className="block text-base font-medium py-2 transition-colors text-[#a92d23] hover:text-[#7a1f1a]"
                      onClick={handleLinkClick}
                    >
                      Daftar
                    </Link>
                    <button 
                      onClick={() => {
                        signIn();
                        handleLinkClick();
                      }}
                      className="w-full bg-gradient-to-r from-[#a92d23] to-[#7a1f1a] text-white hover:from-[#7a1f1a] hover:to-[#a92d23] transition-all duration-300 border-0 px-4 py-2 rounded-lg text-base font-medium mt-2"
                    >
                      Masuk
                    </button>
                  </>
                )}
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Overlay ketika menu mobile terbuka */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </>
  )
}