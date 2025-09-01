import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Nav() {
  const { data: session } = useSession()
  const [coins, setCoins] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
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

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {session ? (
              <>
                <div className="text-sm text-[#a92d23] hidden sm:block">
                  {session.user.name || session.user.email} {coins !== null && <span className="font-semibold">• {coins} koin</span>}
                </div>
                <button
                  onClick={() => signOut()}
                  className="bg-gradient-to-r from-[#a92d23] to-[#7a1f1a] text-white hover:from-[#7a1f1a] hover:to-[#a92d23] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Keluar
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  className="text-sm font-medium text-[#a92d23] hover:text-[#7a1f1a] transition-colors hidden sm:block"
                >
                  Daftar
                </Link>
                <Link
                  href="/login"
                  className="bg-gradient-to-r from-[#a92d23] to-[#7a1f1a] text-white hover:from-[#7a1f1a] hover:to-[#a92d23] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Masuk
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}