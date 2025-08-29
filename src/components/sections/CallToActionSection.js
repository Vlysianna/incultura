"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  GraduationCap, 
  Award, 
  Gift, 
  BookOpen, 
  Search, 
  Smartphone,
  PenTool,
  MessageCircle,
  BarChart3,
  Rocket,
  Trophy,
  Globe,
  Star,
  Users,
  Heart,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function CallToActionSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const slides = [
    {
      title: "Bergabunglah dengan Gerakan Pelestarian Budaya",
      description: "Lebih dari 10,000 pengguna telah memulai perjalanan mereka. Mulai sekarang dan dapatkan akses ke:",
      benefits: [
        { icon: GraduationCap, title: "Pembelajaran Gratis", desc: "Akses semua artikel dan kuis tanpa biaya" },
        { icon: Award, title: "Sertifikat Digital", desc: "Dapatkan pengakuan atas pencapaian Anda" },
        { icon: Gift, title: "Merchandise Eksklusif", desc: "Tukarkan koin dengan hadiah menarik" }
      ],
      ctaPrimary: { text: "Daftar Gratis Sekarang", href: "/register", icon: Rocket },
      ctaSecondary: { text: "Lihat Leaderboard", href: "/leaderboard", icon: Trophy }
    },
    {
      title: "Jelajahi Kekayaan Budaya Nusantara",
      description: "Temukan keindahan dan keunikan budaya Indonesia dari berbagai daerah",
      benefits: [
        { icon: BookOpen, title: "Koleksi Lengkap", desc: "Ribuan konten budaya terkumpul dalam satu platform" },
        { icon: Search, title: "Pencarian Cerdas", desc: "Temukan konten budaya dengan mudah melalui fitur pencarian" },
        { icon: Smartphone, title: "Akses Dimana Saja", desc: "Akses platform kami melalui perangkat mobile dan desktop" }
      ],
      ctaPrimary: { text: "Jelajahi Sekarang", href: "/explore", icon: Globe },
      ctaSecondary: { text: "Favorit Saya", href: "/favorites", icon: Star }
    },
    {
      title: "Kontribusi untuk Pelestarian Budaya",
      description: "Jadilah bagian dari komunitas yang aktif melestarikan warisan budaya Indonesia",
      benefits: [
        { icon: PenTool, title: "Kontribusi Konten", desc: "Bagikan pengetahuan budaya Anda dengan komunitas" },
        { icon: MessageCircle, title: "Forum Diskusi", desc: "Berdiskusi dengan pecinta budaya lainnya" },
        { icon: BarChart3, title: "Progress Tracking", desc: "Lacak perkembangan pembelajaran budaya Anda" }
      ],
      ctaPrimary: { text: "Mulai Berkontribusi", href: "/contribute", icon: Heart },
      ctaSecondary: { text: "Komunitas", href: "/community", icon: Users }
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative pt-12 pb-20 bg-gradient-to-b from-[#a92d23] via-[#d4642a] to-[#f3d099] overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#f3d099] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#a92d23] rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-[#d4642a] rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <div className="relative h-[100vh] flex items-center justify-center -translate-y-60">
            {/* atur lebar tinggi */}
          <div className="relative w-sm max-w-md mx-auto"> 
            {slides.map((slide, index) => {
              let transformClass = "";
              let opacityClass = "";
              let zIndexClass = "";
              
              if (index === activeIndex) {
                transformClass = "translate-x-0 scale-100 rotate-0";
                opacityClass = "opacity-100";
                zIndexClass = "z-20";
              } else if (index === (activeIndex - 1 + slides.length) % slides.length) {
                transformClass = "-translate-x-72 scale-90 -rotate-12";
                opacityClass = "opacity-60";
                zIndexClass = "z-10";
              } else if (index === (activeIndex + 1) % slides.length) {
                transformClass = "translate-x-72 scale-90 rotate-12";
                opacityClass = "opacity-60";
                zIndexClass = "z-10";
              } else {
                transformClass = "translate-x-0 scale-75";
                opacityClass = "opacity-0";
                zIndexClass = "z-0";
              }
              
              return (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${transformClass} ${opacityClass} ${zIndexClass}`}
                >
                  {/* Phone/Card Frame */}
                  <div className="bg-gradient-to-br from-[#f3d099] to-[#fff6e6] rounded-3xl shadow-2xl p-8 max-w-md mx-auto border-8 border-[#a92d23] relative overflow-hidden">
                    {/* Phone camera notch */}
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-[#a92d23] rounded-full"></div>
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#a92d23]/10 via-transparent to-[#f3d099]/10 rounded-3xl"></div>
                    
                    <div className="relative pt-6">
                      <h3 className="text-2xl lg:text-3xl font-bold text-[#a92d23] mb-4 leading-tight">
                        {slide.title}
                      </h3>
                      <p className="text-[#7a1b14] mb-6 text-sm leading-relaxed">
                        {slide.description}
                      </p>
                      
                      {/* Benefits */}
                      <div className="space-y-4 mb-6">
                        {slide.benefits.map((benefit, i) => {
                          const IconComponent = benefit.icon;
                          return (
                            <div key={i} className="flex items-start gap-3 p-3 bg-[#a92d23]/10 rounded-xl hover:bg-[#a92d23]/20 transition-colors">
                              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#a92d23] to-[#d4642a] rounded-xl flex items-center justify-center">
                                <IconComponent className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1 text-left">
                                <h4 className="font-semibold text-[#a92d23] text-sm">{benefit.title}</h4>
                                <p className="text-xs text-[#7a1b14] mt-1">{benefit.desc}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* CTAs */}
                      {/* <div className="space-y-3">
                        <Link 
                          href={slide.ctaPrimary.href} 
                          className="group relative w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#a92d23] to-[#d4642a] hover:from-[#d4642a] hover:to-[#a92d23] text-white px-6 py-4 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                          <slide.ctaPrimary.icon className="w-4 h-4 relative z-10" />
                          <span className="relative z-10">{slide.ctaPrimary.text}</span>
                        </Link>
                        
                        <Link 
                          href={slide.ctaSecondary.href} 
                          className="w-full inline-flex items-center justify-center gap-2 border-2 border-[#a92d23] text-[#a92d23] hover:bg-[#a92d23] hover:text-white px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300"
                        >
                          <slide.ctaSecondary.icon className="w-4 h-4" />
                          <span>{slide.ctaSecondary.text}</span>
                        </Link>
                      </div> */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation buttons */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-gradient-to-br from-[#a92d23] to-[#d4642a] hover:opacity-90 p-4 rounded-full transition-all duration-300 hover:scale-110 group"
          aria-label="Slide sebelumnya"
        >
          <ChevronLeft className="w-6 h-6 text-[#f3d099] group-hover:text-white" />
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-gradient-to-br from-[#a92d23] to-[#d4642a] hover:opacity-90 p-4 rounded-full transition-all duration-300 hover:scale-110 group"
          aria-label="Slide berikutnya"
        >
          <ChevronRight className="w-6 h-6 text-[#f3d099] group-hover:text-white" />
        </button>

        {/* Indicators */}
        <div className="flex justify-center mt-10 space-x-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative overflow-hidden rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'w-12 h-3 bg-[#f3d099]' 
                  : 'w-3 h-3 bg-[#a92d23]/50 hover:bg-[#a92d23]/70'
              }`}
              aria-label={`Pergi ke slide ${index + 1}`}
            >
              {index === activeIndex && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
