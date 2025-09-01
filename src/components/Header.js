"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "./ui/Button";
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [coins, setCoins] = useState(null)
  const { data: session } = useSession()
  const router = useRouter()
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!session?.user?.id) return setCoins(null)
    const fetchCoins = async () => {
      try {
        const res = await fetch(`/api/coins?userId=${session.user.id}`)
        if (!res.ok) return setCoins(null)
        const data = await res.json()
        setCoins(data.coins ?? data.coins === 0 ? data.coins : data.coins)
      } catch (e) {
        setCoins(null)
      }
    }
    fetchCoins()
  }, [session])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/80 backdrop-blur-md shadow-lg border-b border-[#f3d099]/20' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
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

          {/* Navigation */}
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

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {!session ? (
              <>
                <Link 
                  href="/register" 
                  className="text-sm font-medium text-[#a92d23] hover:text-[#7a1f1a] transition-colors hidden sm:block"
                >
                  Daftar
                </Link>
                <Button 
                  className="bg-gradient-to-r from-[#a92d23] to-[#7a1f1a] text-white hover:from-[#7a1f1a] hover:to-[#a92d23] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0" 
                  onClick={() => router.push('/login')}
                >
                  Masuk
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-4 border border-transparent rounded-lg px-3 py-1 bg-white/70 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  {session.user?.image ? (
                    <Image src={session.user.image} alt="avatar" width={36} height={36} className="rounded-full" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-[#a92d23] text-white flex items-center justify-center font-semibold">{(session.user?.name || session.user?.email || 'U').charAt(0)}</div>
                  )}
                </div>
                <div className="text-sm text-[#7a1f1a]">
                  <div className="font-medium">{session.user?.name || session.user?.email}</div>
                  <div className="text-xs text-yellow-600">{coins ?? '...'} koin</div>
                </div>
                <button onClick={() => signOut()} className="text-sm text-[#a92d23] hover:text-[#7a1f1a] ml-2">Keluar</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Login modal removed: using dedicated /login page now */}
    </header>
  );
}
