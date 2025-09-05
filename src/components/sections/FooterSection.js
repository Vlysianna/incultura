"use client";

import { useEffect, useState } from "react";
import { SocialLink, FooterLink } from "../ui/FooterComponents";
import Image from "next/image";

export default function FooterSection() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
  <footer className="relative z-0 bg-[#a92d23]  border-[#7a1f1a] overflow-hidden">
      {/* Wave Background Parallax dengan warna #f3d099 */}
      <div
        className="wave absolute top-0 left-0 w-full h-[100px] opacity-70 rotate-180 pointer-events-none z-0"
        style={{
          backgroundColor: "#f3d099",
          WebkitMaskImage: "url('/wave.png')",
          WebkitMaskRepeat: "repeat-x",
          WebkitMaskSize: "1000px 100px",
          WebkitMaskPositionX: `${offset * 1}px`,
          maskImage: "url('/wave.png')",
          maskRepeat: "repeat-x",
          maskSize: "1000px 100px",
          maskPositionX: `${offset * 1}px`,
        }}
      ></div>
      <div
        className="wave absolute top-0 left-0 w-full h-[100px] opacity-50 rotate-180 pointer-events-none z-0"
        style={{
          backgroundColor: "#f3d099",
          WebkitMaskImage: "url('/wave.png')",
          WebkitMaskRepeat: "repeat-x",
          WebkitMaskSize: "1000px 100px",
          WebkitMaskPositionX: `${offset * 1.5}px`,
          maskImage: "url('/wave.png')",
          maskRepeat: "repeat-x",
          maskSize: "1000px 100px",
          maskPositionX: `${offset * 1.5}px`,
        }}
      ></div>
      <div
        className="wave absolute top-0 left-0 w-full h-[100px] opacity-30 rotate-180 pointer-events-none z-0"
        style={{
          backgroundColor: "#f3d099",
          WebkitMaskImage: "url('/wave.png')",
          WebkitMaskRepeat: "repeat-x",
          WebkitMaskSize: "1000px 100px",
          WebkitMaskPositionX: `${offset * 0.5}px`,
          maskImage: "url('/wave.png')",
          maskRepeat: "repeat-x",
          maskSize: "1000px 100px",
          maskPositionX: `${offset * 0.5}px`,
        }}
      ></div>

      {/* Isi Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 pt-30 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-[#a92d23] to-[#f3d099] rounded-2xl flex items-center justify-center overflow-hidden">
                <Image 
                  src="/InculturaLogo.svg" 
                  alt="Logo Incultura" 
                  width={40} 
                  height={40} 
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">INCULTURA</h3>
                <p className="text-[#f3d099]">Menghidupkan Budaya Indonesia di Era Digital</p>
              </div>
            </div>
            <p className="text-[#f3d099] mb-6 max-w-md leading-relaxed">
              Platform digital terdepan untuk melestarikan dan mempromosikan kekayaan budaya Indonesia 
              melalui teknologi modern dan pendekatan pembelajaran yang inovatif.
            </p>
            <div className="flex items-center gap-4">
              <SocialLink href="#" icon="twitter" />
              <SocialLink href="#" icon="instagram" />
              <SocialLink href="#" icon="facebook" />
              <SocialLink href="#" icon="youtube" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Fitur Utama</h4>
            <div className="space-y-3">
              <FooterLink href="/articles" text="Artikel Budaya" />
              <FooterLink href="/quiz" text="Kuis Interaktif" />
              <FooterLink href="/marketplace" text="Marketplace" />
              <FooterLink href="/leaderboard" text="Leaderboard" />
            </div>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Bantuan</h4>
            <div className="space-y-3">
              <FooterLink href="/profile" text="Profil Saya" />
              <FooterLink href="/register" text="Daftar Akun" />
              <FooterLink href="#" text="Pusat Bantuan" />
              <FooterLink href="#" text="Hubungi Kami" />
            </div>
          </div>
        </div>

        <div className="border-t border-[#7a1f1a] mt-12 pt-8 text-center">
          <p className="text-[#f3d099]">
            © {new Date().getFullYear()} Incultura. Hak Cipta Dilindungi. Melestarikan Budaya Indonesia untuk Generasi Mendatang.
          </p>
        </div>
      </div>
    </footer>
  );
}
