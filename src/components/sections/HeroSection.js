import Link from "next/link";
import { FeatureCard } from "../ui/FeatureCard";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative pt-20 px-6 bg-gradient-to-b from-white to-white/95">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Main Content */}
          <div className="space-y-8 animate-slideInLeft">
            {/* Cultural Badge */}
            <div className="inline-flex items-center gap-3 bg-[#F5F5DC] border border-[#D4AF37] rounded-full px-6 py-3 shadow-lg">
              <div className="w-3 h-3 bg-[#3A5FCD] rounded-full animate-pulse-slow"></div>
              <span className="text-sm font-semibold text-[#8B5E3C] tracking-wide">🇮🇩 WARISAN BUDAYA NUSANTARA</span>
              <div className="w-3 h-3 bg-[#3A5FCD] rounded-full animate-pulse-slow"></div>
            </div>
            
            {/* Main Title */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                <span className="block bg-gradient-to-r from-[#8B5E3C] via-[#D4AF37] to-[#3A5FCD] bg-clip-text text-transparent">
                  INCULTURA
                </span>
                <span className="block text-2xl lg:text-3xl font-normal text-[#8B5E3C] mt-4 tracking-wide">
                  Menghidupkan Budaya Indonesia di Era Digital
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl font-light">
                Jelajahi keindahan tradisi Nusantara melalui perjalanan digital yang imersif. 
                <span className="text-[#D4AF37] font-medium"> Belajar, bermain, dan berkontribusi</span> dalam melestarikan warisan leluhur.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 py-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#D4AF37]">10K+</div>
                <div className="text-sm text-gray-500">Pengguna Aktif</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#D4AF37]">500+</div>
                <div className="text-sm text-gray-500">Artikel Budaya</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#D4AF37]">100+</div>
                <div className="text-sm text-gray-500">Kuis Interaktif</div>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
              <Link 
                href="/register" 
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#D4AF37] to-[#8B5E3C] hover:from-[#8B5E3C] hover:to-[#D4AF37] text-white px-8 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 font-bold text-lg overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative">🚀 Mulai Petualangan</span>
                <svg className="w-5 h-5 relative group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </Link>
              
              <Link 
                href="/articles" 
                className="inline-flex items-center gap-3 bg-[#F5F5DC] border-2 border-[#8B5E3C] hover:border-[#D4AF37] text-[#8B5E3C] hover:bg-[#F5F5DC]/80 px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 font-semibold text-lg group"
              >
                <span>📚 Jelajahi Artikel</span>
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Column - Interactive Visual */}
          <div className="relative animate-slideInRight">
            <div className="relative">
              {/* Main Visual Container */}
              <div className="relative bg-gradient-to-br from-[#F5F5DC] to-[#F5F5DC]/50 border border-[#D4AF37]/30 rounded-3xl p-8 shadow-2xl">
                
                {/* Interactive Cultural Cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <FeatureCard 
                    icon="🎨" 
                    title="Seni Batik" 
                    color="from-[#D4AF37] to-[#8B5E3C]"
                    delay="0s"
                  />
                  <FeatureCard 
                    icon="🏛️" 
                    title="Arsitektur" 
                    color="from-[#3A5FCD] to-[#708238]"
                    delay="0.2s"
                  />
                  <FeatureCard 
                    icon="🎵" 
                    title="Musik Tradisional" 
                    color="from-[#708238] to-[#A0522D]"
                    delay="0.4s"
                  />
                  <FeatureCard 
                    icon="🍜" 
                    title="Kuliner" 
                    color="from-[#A0522D] to-[#8B5E3C]"
                    delay="0.6s"
                  />
                </div>

                {/* Progress Indicator */}
                <div className="bg-white border border-[#D4AF37]/20 rounded-2xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[#8B5E3C] font-medium">Progress Pembelajaran</span>
                    <span className="text-[#D4AF37] font-bold">85%</span>
                  </div>
                  <div className="w-full bg-[#F5F5DC] rounded-full h-3">
                    <div className="bg-gradient-to-r from-[#D4AF37] to-[#8B5E3C] h-3 rounded-full transition-all duration-1000" style={{width: '85%'}}></div>
                  </div>
                </div>

                {/* Floating Achievement Badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-br from-[#D4AF37] to-[#3A5FCD] rounded-full p-4 shadow-xl animate-bounce-gentle">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -z-10 top-8 left-8 w-full h-full bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-3xl"></div>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator with smooth transition hint */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-gray-500 text-sm font-medium">Gulir untuk menjelajah</span>
            <div className="w-8 h-12 border-2 border-gray-400 rounded-full flex justify-center relative overflow-hidden">
              <div className="w-1 h-3 bg-gradient-to-b from-[#D4AF37] to-[#8B5E3C] rounded-full mt-2 animate-pulse"></div>
              {/* Subtle hint of transition colors */}
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-[#F5F5DC]/30 to-transparent rounded-b-full"></div>
            </div>
            <div className="text-xs text-gray-400 flex items-center gap-1">
              <span>Temukan fitur unggulan</span>
              <svg className="w-3 h-3 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
