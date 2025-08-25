import { SocialLink, FooterLink } from "../ui/FooterComponents";

export default function FooterSection() {
  return (
    <footer className="relative z-10 bg-[#8B5E3C] border-t border-[#A0522D]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-[#3A5FCD] rounded-2xl flex items-center justify-center">
                <span className="text-2xl">🏛️</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Incultura</h3>
                <p className="text-[#F5F5DC]">Menghidupkan Budaya Indonesia di Era Digital</p>
              </div>
            </div>
            <p className="text-[#F5F5DC] mb-6 max-w-md leading-relaxed">
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
        
        <div className="border-t border-[#A0522D] mt-12 pt-8 text-center">
          <p className="text-[#F5F5DC]">
            © {new Date().getFullYear()} Incultura. Hak Cipta Dilindungi. Melestarikan Budaya Indonesia untuk Generasi Mendatang.
          </p>
        </div>
      </div>
    </footer>
  );
}
