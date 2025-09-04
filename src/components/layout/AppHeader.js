"use client"
import React, { useState, useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Trophy } from 'lucide-react'

export default function AppHeader() {
  const { data: session } = useSession()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [coins, setCoins] = useState(null)
  const [score, setScore] = useState(0)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (session?.user?.id) {
      fetch(`/api/coins?userId=${session.user.id}`).then(r => r.json()).then(d => setCoins(d.coins)).catch(() => {})
      fetch(`/api/profile?userId=${session.user.id}`).then(r => r.json()).then(d => setIsAdmin(!!d.user?.isAdmin)).catch(() => {})
    }
  }, [session])

  const navigationItems = [
    { href: "/", label: "Home" },
    { href: "/articles", label: "Artikel" },
    { href: "/quiz", label: "Kuis" },
    { href: "/marketplace", label: "Marketplace" },
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/profile", label: "Profile" },
  ]

  const isActiveRoute = (href) => {
    return pathname === href || (pathname || '').startsWith(href)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-indigo-200/20' 
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
            {navigationItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className={`text-sm font-medium transition-colors relative group ${
                  isActiveRoute(item.href)
                    ? 'text-[#a92d23] font-semibold' 
                    : 'text-[#a92d23] hover:text-[#7a1f1a]'
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#a92d23] to-[#f3d099] transition-all duration-300 ${
                  isActiveRoute(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 relative"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`bg-[#a92d23] h-0.5 w-6 rounded transform transition duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`bg-[#a92d23] h-0.5 w-6 rounded my-1.5 transition duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`bg-[#a92d23] h-0.5 w-6 rounded transform transition duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>

          <div className="flex items-center gap-3">
      {/* Mobile Navigation Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <nav className="px-6 py-4 bg-white/95 backdrop-blur-md border-t border-[#f3d099]/30">
          <div className="flex flex-col space-y-4">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-base font-medium py-2 transition-colors text-[#a92d23] hover:text-[#7a1f1a] border-b border-[#f3d099]/20`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile Auth Section */}
            <div className="pt-4 border-t border-[#f3d099]/30">
              {session ? (
                <>
                  <p className="text-sm text-[#a92d23] mb-2">Hi, {session.user?.name || session.user?.email}</p>
                  <Link href="/profile" className={`block w-full text-left text-base font-medium py-2 text-[#a92d23] hover:text-[#7a1f1a]`} onClick={() => setMobileMenuOpen(false)}>Profile</Link>
                </>
              ) : (
                <>
                  <Link href="/register" className="block text-base font-medium py-2 transition-colors text-[#a92d23] hover:text-[#7a1f1a]" onClick={() => setMobileMenuOpen(false)}>Daftar</Link>
                  <Link href="/login" className="block w-full bg-gradient-to-r from-[#a92d23] to-[#7a1f1a] text-white px-4 py-2 rounded-lg mt-2 text-base font-medium text-center" onClick={() => setMobileMenuOpen(false)}>Masuk</Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* Overlay when mobile menu open */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/20 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)}></div>
      )}
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
        </div>
      </div>
    </header>
  )
}
