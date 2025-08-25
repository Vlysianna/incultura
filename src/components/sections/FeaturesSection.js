"use client";

import { EnhancedFeatureCard } from "../ui/EnhancedFeatureCard";
import useScrollAnimation from "../../hooks/useScrollAnimation";

export default function FeaturesSection() {
  const titleRef = useScrollAnimation(0.2);
  const gridRef = useScrollAnimation(0.1);

  return (
    <section className="relative py-24 bg-[#F5F5DC] overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#D4AF37]/5 to-[#8B5E3C]/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-[#3A5FCD]/5 to-[#708238]/5 rounded-full blur-2xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div ref={titleRef} className="text-center mb-16 animate-delayed">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#D4AF37]/20 rounded-full px-6 py-2 mb-6 shadow-lg">
            <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-[#8B5E3C] tracking-wide">FITUR UNGGULAN</span>
            <div className="w-2 h-2 bg-[#3A5FCD] rounded-full animate-pulse"></div>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-[#8B5E3C] mb-6">
            Jelajahi Budaya Indonesia
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Platform lengkap untuk mempelajari, melestarikan, dan merayakan kekayaan budaya Indonesia dengan cara yang interaktif dan menyenangkan
          </p>
        </div>
        
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-delayed">
          <div className="animate-slideUp" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
            <EnhancedFeatureCard 
              icon="📖" 
              title="Artikel Mendalam" 
              description="Konten berkualitas tentang sejarah, tradisi, dan filosofi budaya Indonesia" 
              reward="+10 Koin"
              gradient="from-[#D4AF37] to-[#8B5E3C]"
              delay="0s"
            />
          </div>
          
          <div className="animate-slideUp" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
            <EnhancedFeatureCard 
              icon="🧠" 
              title="Kuis Interaktif" 
              description="Uji pengetahuan budaya Anda dengan kuis yang menarik dan edukatif" 
              reward="+20 Koin"
              gradient="from-[#3A5FCD] to-[#708238]"
              delay="0.2s"
            />
          </div>
          
          <div className="animate-slideUp" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
            <EnhancedFeatureCard 
              icon="🏆" 
              title="Sistem Reward" 
              description="Kumpulkan koin dan tukarkan dengan merchandise budaya eksklusif" 
              reward="+50 Koin"
              gradient="from-[#708238] to-[#A0522D]"
              delay="0.4s"
            />
          </div>
          
          <div className="animate-slideUp" style={{animationDelay: '0.4s', animationFillMode: 'both'}}>
            <EnhancedFeatureCard 
              icon="👥" 
              title="Komunitas Aktif" 
              description="Bergabung dengan 10,000+ pengguna yang peduli budaya Indonesia" 
              reward="Gratis"
              gradient="from-[#A0522D] to-[#8B5E3C]"
              delay="0s"
            />
          </div>
          
          <div className="animate-slideUp" style={{animationDelay: '0.5s', animationFillMode: 'both'}}>
            <EnhancedFeatureCard 
              icon="📱" 
              title="Berbagi Mudah" 
              description="Sebarkan pengetahuan budaya ke teman dan keluarga" 
              reward="+5 Koin"
              gradient="from-[#8B5E3C] to-[#D4AF37]"
              delay="0.2s"
            />
          </div>
          
          <div className="animate-slideUp" style={{animationDelay: '0.6s', animationFillMode: 'both'}}>
            <EnhancedFeatureCard 
              icon="🎯" 
              title="Progress Tracking" 
              description="Pantau perkembangan pembelajaran dan pencapaian Anda" 
              reward="Dashboard"
              gradient="from-[#3A5FCD] to-[#D4AF37]"
              delay="0.4s"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
