"use client";

import { EnhancedFeatureCard } from "../ui/EnhancedFeatureCard";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import { 
  BookOpen, 
  Brain, 
  Trophy, 
  Users, 
  Share2, 
  BarChart3,
  Sparkles
} from "lucide-react";
import { useRef, useEffect } from "react";

// Data konstan untuk semua fitur
const FEATURES_DATA = [
  {
    icon: <BookOpen className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />,
    title: "Artikel Mendalam", 
    description: "Konten berkualitas tentang sejarah, tradisi, dan filosofi budaya Indonesia", 
    reward: "+10 Koin",
    gradient: "from-[#a92d23] to-[#f3d099]",
    delay: "0s",
    decorationImage: "/barong.png",
    decorationAlt: "Barong"
  },
  {
    icon: <Brain className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />,
    title: "Kuis Interaktif", 
    description: "Uji pengetahuan budaya Anda dengan kuis yang menarik dan edukatif", 
    reward: "+20 Koin",
    gradient: "from-[#f3d099] to-[#a92d23]",
    delay: "0.2s",
    decorationImage: "/wayang.png",
    decorationAlt: "Wayang"
  },
  {
    icon: <Trophy className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />,
    title: "Sistem Reward", 
    description: "Kumpulkan koin dan tukarkan dengan merchandise budaya eksklusif", 
    reward: "+50 Koin",
    gradient: "from-[#a92d23] to-[#f3d099]",
    delay: "0.4s",
    decorationImage: "/reog.png",
    decorationAlt: "reog"
  },
  {
    icon: <Users className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />,
    title: "Komunitas Aktif", 
    description: "Bergabung dengan 10,000+ pengguna yang peduli budaya Indonesia", 
    reward: "Gratis",
    gradient: "from-[#f3d099] to-[#a92d23]",
    delay: "0s",
    decorationImage: "/rendang.png",
    decorationAlt: "Rendang"
  },
  {
    icon: <Share2 className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />,
    title: "Berbagi Mudah", 
    description: "Sebarkan pengetahuan budaya ke teman dan keluarga", 
    reward: "+5 Koin",
    gradient: "from-[#a92d23] to-[#f3d099]",
    delay: "0.2s",
    decorationImage: "/angklung.png",
    decorationAlt: "Angklung"
  },
  {
    icon: <BarChart3 className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />,
    title: "Progress Tracking", 
    description: "Pantau perkembangan pembelajaran dan pencapaian Anda", 
    reward: "Dashboard",
    gradient: "from-[#f3d099] to-[#a92d23]",
    delay: "0.4s",
    decorationImage: "/batik2.png",
    decorationAlt: "batik"
  }
];

export default function FeaturesSection() {
  const titleRef = useScrollAnimation(0.2);
  const gridRef = useScrollAnimation(0.1);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-float-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll('.feature-item');
      elements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-12 md:py-16 lg:py-24 bg-[#f3d099] overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-gradient-to-br from-[#a92d23]/5 to-[#f3d099]/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-[#f3d099]/5 to-[#a92d23]/5 rounded-full blur-2xl"></div>
      </div>            
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div ref={titleRef} className="text-center mb-12 md:mb-16 opacity-0 transition-all duration-700">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#a92d23]/20 rounded-full px-4 py-1 md:px-6 md:py-2 mb-4 md:mb-6 shadow-lg">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#a92d23] rounded-full animate-pulse"></div>
            <span className="text-xs md:text-sm font-semibold text-[#a92d23] tracking-wide">FITUR UNGGULAN</span>
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#f3d099] rounded-full animate-pulse"></div>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#a92d23] mb-4 md:mb-6 transform transition-all duration-700">
            Jelajahi Budaya Indonesia
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed transform transition-all duration-700 delay-100">
            Platform lengkap untuk mempelajari, melestarikan, dan merayakan kekayaan budaya Indonesia dengan cara yang interaktif dan menyenangkan
          </p>
        </div>
        
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 opacity-0 transition-all duration-700 delay-200">
          {FEATURES_DATA.map((feature, index) => (
            <div 
              key={index} 
              className="feature-item transform transition-all duration-700 relative"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Dekorasi gambar di pojok kiri atas */}
              <div className="absolute -top-10 -left-10 z-20 w-20 h-20 md:w-26 md:h-26 lg:w-30 lg:h-30">
                <img 
                  src={feature.decorationImage} 
                  alt={feature.decorationAlt} 
                  className="w-full h-full object-contain rotate-[-12deg] animate-float-delayed" 
                />
              </div>
              
              <EnhancedFeatureCard 
                icon={feature.icon}
                title={feature.title} 
                description={feature.description} 
                reward={feature.reward}
                gradient={feature.gradient}
                delay={feature.delay}
                className="h-full min-h-[280px] md:min-h-[300px] lg:min-h-[320px]"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes floatIn {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float-in {
          animation: floatIn 0.7s ease-out forwards;
        }

        .animate-float-delayed {
          animation: float 4s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .feature-item {
          opacity: 0;
        }
        
        .features-visible .title-container > * {
          opacity: 1;
          transform: translateY(0);
        }
        
        .features-visible .title-container h2 {
          transition-delay: 0.1s;
        }
        
        .features-visible .title-container p {
          transition-delay: 0.2s;
        }
        
        .features-visible .grid-container {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}