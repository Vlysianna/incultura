import Link from "next/link";
import { BenefitCard } from "../ui/BenefitCard";

export default function CallToActionSection() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-[#D4AF37] via-[#8B5E3C] to-[#3A5FCD]">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl p-12 shadow-2xl animate-fadeIn">
          <h3 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Bergabunglah dengan Gerakan Pelestarian Budaya
          </h3>
          <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
            Lebih dari 10,000 pengguna telah memulai perjalanan mereka. Mulai sekarang dan dapatkan akses ke:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <BenefitCard 
              icon="🎓" 
              title="Pembelajaran Gratis" 
              desc="Akses semua artikel dan kuis tanpa biaya"
            />
            <BenefitCard 
              icon="🏅" 
              title="Sertifikat Digital" 
              desc="Dapatkan pengakuan atas pencapaian Anda"
            />
            <BenefitCard 
              icon="🎁" 
              title="Merchandise Eksklusif" 
              desc="Tukarkan koin dengan hadiah menarik"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/register" 
              className="group relative inline-flex items-center gap-3 bg-white text-[#8B5E3C] hover:text-[#D4AF37] px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#F5F5DC]/50 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative">🚀 Daftar Gratis Sekarang</span>
            </Link>
            
            <Link 
              href="/leaderboard" 
              className="inline-flex items-center gap-3 border-2 border-white text-white hover:bg-white hover:text-[#8B5E3C] px-10 py-5 rounded-2xl font-semibold text-lg transition-all duration-500"
            >
              <span>🏆 Lihat Leaderboard</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
