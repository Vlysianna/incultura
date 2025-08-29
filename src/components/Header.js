"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "./ui/Button";
import LoginModal from "./ui/LoginModal";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            <Link 
              href="/register" 
              className="text-sm font-medium text-[#a92d23] hover:text-[#7a1f1a] transition-colors hidden sm:block"
            >
              Daftar
            </Link>
            <Button 
              className="bg-gradient-to-r from-[#a92d23] to-[#7a1f1a] text-white hover:from-[#7a1f1a] hover:to-[#a92d23] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0" 
              onClick={() => setOpen(true)}
            >
              Masuk
            </Button>
          </div>
        </div>
      </div>

      <LoginModal open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
