"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "./ui/Button";
import { useSession, signOut } from 'next-auth/react'
import { Trophy, Plus as PlusIcon, X as CloseIcon } from 'lucide-react'

export default function Header() {
  const { data: session } = useSession()
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [coins, setCoins] = useState(null)
  const [coinDelta, setCoinDelta] = useState(null)
  const lastCoinsRef = useRef(null)
  const coinsRef = useRef(null)
  const pollingRef = useRef(null)
  const profileMenuRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch coins once user logged in
  const fetchCoins = useCallback(async () => {
    if (!session?.user?.id) return
    try {
      const res = await fetch(`/api/coins?userId=${session.user.id}`)
      if (!res.ok) return
      const data = await res.json()
      const prev = lastCoinsRef.current
      setCoins(data.coins)
  coinsRef.current = data.coins
      if (prev != null && data.coins > prev) {
        setCoinDelta(`+${data.coins - prev}`)
        setTimeout(() => setCoinDelta(null), 2500)
      }
      lastCoinsRef.current = data.coins
    } catch (e) { /* ignore */ }
  }, [session?.user?.id])

  useEffect(() => {
    if (session?.user?.id) {
      fetchCoins()
      pollingRef.current = setInterval(fetchCoins, 10000)
      return () => pollingRef.current && clearInterval(pollingRef.current)
    }
  }, [session?.user?.id, fetchCoins])

  // Listen for manual coin update events dispatched from other components (e.g., article view reward)
  useEffect(() => {
    const handler = () => fetchCoins()
    window.addEventListener('coins:update', handler)
    // Direct award event with detail { awarded, total }
    const awardHandler = (e) => {
      try {
        const detail = e.detail || {}
        if (typeof detail.total === 'number') {
          const prev = lastCoinsRef.current
          setCoins(detail.total)
          coinsRef.current = detail.total
          if (prev != null && detail.total > prev) {
            const inc = detail.total - prev
            setCoinDelta(`+${inc}`)
            setTimeout(() => setCoinDelta(null), 2500)
          } else if (prev == null && typeof detail.awarded === 'number') {
            // First load but we know award delta
            setCoinDelta(`+${detail.awarded}`)
            setTimeout(() => setCoinDelta(null), 2500)
          }
          lastCoinsRef.current = detail.total
        } else if (typeof detail.awarded === 'number' && coinsRef.current != null) {
          // Fallback: increment locally if total not supplied
            const newTotal = coinsRef.current + detail.awarded
            setCoins(newTotal)
            coinsRef.current = newTotal
            setCoinDelta(`+${detail.awarded}`)
            setTimeout(() => setCoinDelta(null), 2500)
            lastCoinsRef.current = newTotal
        }
      } catch (_) { /* ignore */ }
    }
    window.addEventListener('coins:award', awardHandler)
    return () => {
      window.removeEventListener('coins:update', handler)
      window.removeEventListener('coins:award', awardHandler)
    }
  }, [fetchCoins])

  // Keep coinsRef in sync
  useEffect(() => { coinsRef.current = coins }, [coins])

  // Close profile dropdown on outside click
  useEffect(() => {
    if (!profileMenuOpen) return
    const handler = (e) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setProfileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [profileMenuOpen])

  // Menutup menu mobile saat mengklik link
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-lg border-b border-[#f3d099]/20' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-3 group" onClick={handleLinkClick}>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-[#a92d23] to-[#f3d099] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <Image src="/InculturaLogo.svg" alt="logo" width={24} height={24} />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-[#f3d099] to-[#a92d23] rounded-full animate-pulse-slow"></div>
              </div>
              <div className="hidden sm:block">
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-[#a92d23] to-[#f3d099] bg-clip-text text-transparent">
                  <Image src="/InculturaTeks.svg" alt="logo" width={100} height={20} />
                </h1>
                <p className="text-xs text-[#a92d23] font-medium">Digitalisasi Budaya Indonesia</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {[
                { href: "/articles", label: "Artikel" },
                { href: "/quiz", label: "Kuis" },
                { href: "/marketplace", label: "Marketplace" },
                { href: "/leaderboard", label: "Leaderboard" },
              ].map((item) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className="text-sm font-medium text-[#a92d23] hover:text-[#7a1f1a] transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#a92d23] to-[#f3d099] group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </nav>

            {/* Desktop Auth, Coins & Avatar Dropdown */}
            <div className="hidden md:flex items-center gap-4" ref={profileMenuRef}>
              {session ? (
                <>
                  <div className="relative flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-yellow-900 px-4 py-2 rounded-full text-sm font-semibold shadow group select-none">
                    <Trophy className="w-4 h-4" />
                    <span>{coins != null ? coins : '...'}</span>
                    {coinDelta && (
                      <span className="absolute -top-3 right-0 translate-y-0 text-green-600 text-xs font-bold animate-bounce">
                        {coinDelta}
                      </span>
                    )}
                  </div>
                  <button
                    aria-haspopup="menu"
                    aria-expanded={profileMenuOpen}
                    onClick={() => setProfileMenuOpen(o => !o)}
                    className="relative w-10 h-10 rounded-full bg-gradient-to-br from-[#a92d23] to-[#7a1f1a] text-white font-semibold flex items-center justify-center shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#a92d23]/40 transition"
                    title="Menu Profil"
                  >
                    {session.user?.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={session.user.image} alt="avatar" className="w-full h-full object-cover rounded-full" />
                    ) : (
                      (session.user?.name?.[0] || session.user?.email?.[0] || '?').toUpperCase()
                    )}
                  </button>
                  {profileMenuOpen && (
                    <div role="menu" className="absolute top-14 right-0 w-56 bg-white/95 backdrop-blur-md border border-[#f3d099]/40 rounded-xl shadow-xl py-2 z-[70] animate-fade-in">
                      <div className="px-4 py-2 border-b border-[#f3d099]/30">
                        <p className="text-sm font-semibold text-[#a92d23] truncate">{session.user?.name || session.user?.email}</p>
                        <p className="text-[11px] text-gray-500 truncate">Level Penjelajah</p>
                      </div>
                      <Link href="/profile" role="menuitem" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-[#f3d099]/20 transition">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Z"/><path d="M4 20c0-2.67 3.58-4 8-4s8 1.33 8 4"/></svg>
                        Profil
                      </Link>
                      <Link href="/leaderboard" role="menuitem" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-[#f3d099]/20 transition">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10"/><path d="M17 8h-3a2 2 0 0 0-2 2v5h-4a2 2 0 0 1-2-2V8"/></svg>
                        Leaderboard
                      </Link>
                      <button onClick={() => signOut()} role="menuitem" className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition text-left">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>
                        Keluar
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <Link 
                    href="/register" 
                    className="text-sm font-medium text-[#a92d23] hover:text-[#7a1f1a] transition-colors"
                  >Daftar</Link>
                  <Button 
                    className="bg-gradient-to-r from-[#a92d23] to-[#7a1f1a] text-white hover:from-[#7a1f1a] hover:to-[#a92d23] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0" 
                    onClick={() => (window.location.href = '/login')}
                  >Masuk</Button>
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
              
              {/* Mobile Auth / Coins */}
              <div className="pt-4 border-t border-[#f3d099]/30 flex flex-col gap-4">
                {session ? (
                  <>
                    <div className="flex items-center gap-3">
                      <div className="relative flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-yellow-900 px-4 py-2 rounded-full text-sm font-semibold shadow">
                        <Trophy className="w-4 h-4" />
                        <span>{coins != null ? coins : '...'}</span>
                        {coinDelta && (
                          <span className="absolute -top-3 right-0 text-green-600 text-xs font-bold animate-bounce">{coinDelta}</span>
                        )}
                      </div>
                      <Link
                        href="/profile"
                        onClick={handleLinkClick}
                        className="text-sm text-[#a92d23] hover:text-[#7a1f1a] font-medium truncate max-w-[140px] underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-[#a92d23]/40 rounded"
                      >
                        {session.user?.name || session.user?.email}
                      </Link>
                    </div>
                    <Link
                      href="/profile"
                      onClick={handleLinkClick}
                      className="w-full text-left text-sm font-medium py-2 text-[#a92d23] hover:text-[#7a1f1a] flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Z"/><path d="M4 20c0-2.67 3.58-4 8-4s8 1.33 8 4"/></svg>
                      Profil
                    </Link>
                    <button
                      onClick={() => { signOut(); handleLinkClick(); }}
                      className="w-full text-left text-sm font-medium py-2 text-[#a92d23] hover:text-[#7a1f1a]"
                    >Keluar</button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/register"
                      className="block text-center text-sm font-medium py-2 text-[#a92d23] hover:text-[#7a1f1a]"
                      onClick={handleLinkClick}
                    >Daftar</Link>
                    <Button
                      className="bg-gradient-to-r from-[#a92d23] to-[#7a1f1a] text-white hover:from-[#7a1f1a] hover:to-[#a92d23] transition-all duration-300 border-0 w-full"
                      onClick={() => { window.location.href = '/login'; setMobileMenuOpen(false); }}
                    >Masuk</Button>
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
  );
}