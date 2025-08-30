import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function AppFooter() {
  return (
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
  )
}
