'use client';

import Link from "next/link";
import { FeatureCard } from "../ui/FeatureCard";
import { 
  Rocket, 
  BookOpen, 
  CheckCircle, 
  ChevronDown, 
  Users, 
  FileText, 
  Brain,
  Sparkles,
  Palette,
  Building2,
  Music,
  Utensils
} from "lucide-react";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const progressBarRef = useRef(null);
  
  useEffect(() => {
    // Animasi progress bar setelah komponen dimount
    if (progressBarRef.current) {
      setTimeout(() => {
        progressBarRef.current.style.width = '85%';
      }, 300);
    }
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative pt-20 px-6 bg-gradient-to-b from-white to-white/95 overflow-hidden">
      {/* Background Decoration */}
      <img 
        src="/batik.png" 
        alt="Batik" 
        className="absolute -top-5 -right-70 w-full lg:w-auto pointer-events-none z-0 blur-sm opacity-50"
      />
      
      {/* Animated floating elements */}
      <div className="absolute top-20 left-10 animate-float">
        <Sparkles className="w-8 h-8 text-[#f3d099]" />
      </div>
      <div className="absolute top-1/3 right-20 animate-float-delayed">
        <Sparkles className="w-6 h-6 text-[#a92d23]" />
      </div>
      <div className="absolute bottom-1/4 left-20 animate-float-more-delayed">
        <Sparkles className="w-5 h-5 text-[#f3d099]" />
      </div>

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Main Content */}
          <div className="space-y-8 animate-slideInLeft">          
            
            {/* Main Title */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                <span className="block">
                  <img 
                    src="/InculturaTeks.svg" 
                    alt="Budaya Indonesia" 
                    className="h-auto w-auto object-cover mx-auto"
                  />
                </span>

                <span className="block text-2xl lg:text-3xl font-normal text-[#a92d23] mt-4 tracking-wide animate-pulse-slow">
                  Menghidupkan Budaya Indonesia di Era Digital
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl font-light">
                Jelajahi keindahan tradisi Nusantara melalui perjalanan digital yang imersif. 
                <span className="text-[#a92d23] font-medium"> Belajar, bermain, dan berkontribusi</span> dalam melestarikan warisan leluhur.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 py-6">
              <div className="text-center transition-all duration-500 hover:scale-105">
                <div className="text-3xl font-bold text-[#a92d23] flex items-center justify-center gap-2">
                  <Users className="w-8 h-8" /> 10K+
                </div>
                <div className="text-sm text-gray-500 mt-1">Pengguna Aktif</div>
              </div>
              <div className="text-center transition-all duration-500 hover:scale-105">
                <div className="text-3xl font-bold text-[#a92d23] flex items-center justify-center gap-2">
                  <FileText className="w-7 h-7" /> 500+
                </div>
                <div className="text-sm text-gray-500 mt-1">Artikel Budaya</div>
              </div>
              <div className="text-center transition-all duration-500 hover:scale-105">
                <div className="text-3xl font-bold text-[#a92d23] flex items-center justify-center gap-2">
                  <Brain className="w-7 h-7" /> 100+
                </div>
                <div className="text-sm text-gray-500 mt-1">Kuis Interaktif</div>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
              <Link 
                href="/register" 
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#a92d23] to-[#f3d099] hover:from-[#f3d099] hover:to-[#a92d23] text-white px-8 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 font-bold text-lg overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <Rocket className="w-5 h-5 relative group-hover:animate-bounce" />
                <span className="relative">Mulai Petualangan</span>
              </Link>
              
              <Link 
                href="/articles" 
                className="group inline-flex items-center gap-3 bg-[#f3d099] border-2 border-[#a92d23] hover:border-[#a92d23]/80 text-[#a92d23] hover:bg-[#f3d099]/80 px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 font-semibold text-lg hover:scale-105"
              >
                <BookOpen className="w-5 h-5 group-hover:animate-pulse" />
                <span>Jelajahi Artikel</span>
              </Link>
            </div>
          </div>

          {/* Right Column - Interactive Visual */}
          <div className="relative animate-fadeInRight">
            <div className="relative">
              {/* Main Visual Container */}
              <div className="relative bg-gradient-to-br from-[#f3d099] to-[#f3d099]/50 border border-[#a92d23]/30 rounded-3xl p-8 shadow-2xl">
                
                {/* Interactive Cultural Cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <FeatureCard icon={<Palette className="w-6 h-6" />} title="Seni Batik" color="from-[#a92d23] to-[#f3d099]" delay="0s" />
                  <FeatureCard icon={<Building2 className="w-6 h-6" />} title="Arsitektur" color="from-[#f3d099] to-[#a92d23]" delay="0.2s" />
                  <FeatureCard icon={<Music className="w-6 h-6" />} title="Musik Tradisional" color="from-[#a92d23] to-[#f3d099]" delay="0.4s" />
                  <FeatureCard icon={<Utensils className="w-6 h-6" />} title="Kuliner" color="from-[#f3d099] to-[#a92d23]" delay="0.6s" />
                </div>

                {/* Progress Indicator */}
                <div className="bg-white border border-[#a92d23]/20 rounded-2xl p-4 transition-all duration-500 hover:shadow-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[#a92d23] font-medium">Progress Pembelajaran</span>
                    <span className="text-[#a92d23] font-bold">85%</span>
                  </div>
                  <div className="w-full bg-[#f3d099] rounded-full h-3 overflow-hidden">
                    <div 
                      ref={progressBarRef}
                      className="bg-gradient-to-r from-[#a92d23] to-[#f3d099] h-3 rounded-full transition-all duration-1000 ease-out w-0"
                    ></div>
                  </div>
                </div>

                {/* Floating Achievement Badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-br from-[#a92d23] to-[#f3d099] rounded-full p-3 shadow-xl animate-gentle-bounce">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -z-10 top-8 left-8 w-full h-full bg-gradient-to-br from-[#a92d23]/20 to-transparent rounded-3xl"></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-gentle-bounce">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-gray-500 text-sm font-medium">Gulir untuk menjelajah</span>
            <div className="w-8 h-12 border-2 border-gray-400 rounded-full flex justify-center relative overflow-hidden">
              <div className="w-1 h-3 bg-gradient-to-b from-[#a92d23] to-[#f3d099] rounded-full mt-2 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-[#f3d099]/30 to-transparent rounded-b-full"></div>
            </div>
            <div className="text-xs text-gray-400 flex items-center gap-1">
              <span>Temukan fitur unggulan</span>
              <ChevronDown className="w-3 h-3 animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* Tambahkan style untuk animasi baru */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes gentleBounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
        @keyframes pulseSlow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 5s ease-in-out infinite;
          animation-delay: 1s;
        }
        .animate-float-more-delayed {
          animation: float 5s ease-in-out infinite;
          animation-delay: 2s;
        }
        .animate-fadeInRight {
          animation: fadeInRight 1s ease-out forwards;
        }
        .animate-gentle-bounce {
          animation: gentleBounce 2s infinite;
        }
        .animate-pulse-slow {
          animation: pulseSlow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}