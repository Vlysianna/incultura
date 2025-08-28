"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Palette,
  Theater,
  Music,
  Drama,
  MapPin,
  Users,
  Languages,
  BookOpen,
} from "lucide-react";

// Komponen CulturalTransition
function CulturalTransition() {
  return (
    <div className="relative h-32 md:h-40 lg:h-48 overflow-hidden">
      {/* Gradient Background */}
 <div className="absolute inset-0 bg-gradient-to-b from-[#f3d099] via-[#d4a574] to-[#a92d23]"></div>
      
      {/* Motif Batik Background */}
      <div className="absolute inset-0 opacity-20">
       <div
            className="w-full h-full  "
            style={{
              backgroundImage: `url("/mendung1.png")`,
              backgroundSize: "100px 100px",
            }}
          ></div>
      </div>

      {/* Ornamen Budaya */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center gap-8 md:gap-12 lg:gap-16">
          {/* Ornamen Kiri */}
          <div className="animate-float-slow">
            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 shadow-lg">
              <Palette className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white" />
            </div>
          </div>

          {/* Logo/Simbol Tengah */}
          <div className="animate-float-medium">
            <div className="relative">
              <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/40 shadow-2xl">
                <img src="/InculturaLogo.svg" alt="Logo" className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" />
              </div>
              {/* Ornamen berputar di sekitar logo */}
              <div className="absolute inset-0 animate-spin-slow">
                <div className="relative w-full h-full">
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#f3d099] rounded-full shadow-lg"></div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#a92d23] rounded-full shadow-lg"></div>
                  <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg"></div>
                  <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-4 h-4 bg-[#d4a574] rounded-full shadow-lg"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Ornamen Kanan */}
          <div className="animate-float-slow-reverse">
            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 shadow-lg">
              <Theater className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Partikel mengambang */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-white/40 rounded-full animate-float-particle-${(i % 3) + 1}`}
            style={{
              left: `${20 + i * 12}%`,
              top: `${30 + (i % 2) * 40}%`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Wave effect untuk transisi mulus */}
      <div className="absolute bottom-0 left-0 right-0 h-8">
        <svg className="w-full h-16 -mb-1" viewBox="0 0 1200 120" preserveAspectRatio="none">
  <path 
    d="M0,120 C300,80 900,160 1200,120 V120 H0 Z" 
    fill="#f3d099" 
    className="animate-wave"
  />
</svg>

      </div>
    </div>
  );
}

// Komponen CulturalStatCard
const CulturalStatCard = ({ number, label, icon }) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20 hover:bg-white/20 transition-all duration-300">
      <div className="flex justify-center mb-2">
        <div className="bg-[#a92d23] p-2 rounded-lg">{icon}</div>
      </div>
      <div className="text-2xl md:text-3xl font-bold text-white">{number}</div>
      <div className="text-sm md:text-base text-[#fdf6e3] mt-1">{label}</div>
    </div>
  );
};

// Komponen CultureShowcaseCard
const CultureShowcaseCard = ({ title, desc, icon, delay }) => {
  return (
    <div
      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 h-full flex flex-col items-center justify-center text-center"
      style={{ animationDelay: delay }}
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
      <p className="text-[#fdf6e3] text-sm">{desc}</p>
    </div>
  );
};

// Carousel dengan fitur swipe
function Carousel({ culturalSlides }) {
  const [current, setCurrent] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef(null);
  const length = culturalSlides.length;

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % length);
  }, [length]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + length) % length);
  }, [length]);

  // Auto slide setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Event handlers untuk swipe
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diffX = startX - currentX;

    // Jika pergeseran cukup signifikan, ganti slide
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Juga tambahkan event handlers untuk mouse (desktop)
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diffX = startX - currentX;

    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative animate-slideInRight w-full">
      <div
        className="rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl group w-full"
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {culturalSlides.map((slide, idx) => (
          <div
            key={slide.id}
  className={`transition-opacity duration-700 absolute inset-0 ${
    idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
  } h-60 sm:h-80 md:h-96`}
  style={{ position: "absolute" }}
>
  <img 
    src={slide.image} 
    alt={slide.title} 
    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] rounded-2xl" 
  />
  <div className="absolute inset-0 bg-gradient-to-t from-[#a92d23]/100 via-[#a92d23]/10 to-transparent shadow-inner rounded-2xl" />

            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 text-white">
              <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                <div className="bg-white/20 p-1 sm:p-2 rounded-lg backdrop-blur-md shadow-md">
                  {slide.icon}
                </div>
                <h3 className="text-base sm:text-xl md:text-2xl font-extrabold drop-shadow-lg">
                  {slide.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm md:text-base drop-shadow-md">
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}
        <div className="relative flex justify-center items-center h-60 sm:h-80 md:h-96">
          {/* Tombol Navigasi Kiri (Previous) */}
<button
  onClick={prevSlide}
  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/90 hover:bg-[#a92d23] border border-white/30 shadow-lg transition-all hover:scale-110 z-20 group/btn backdrop-blur-sm"
  aria-label="Sebelumnya"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 text-[#a92d23] group-hover/btn:text-white transition-colors"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M12.293 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L8.414 10l3.879 3.879a1 1 0 010 1.414z"
      clipRule="evenodd"
    />
  </svg>
</button>

{/* Tombol Navigasi Kanan (Next) */}
<button
  onClick={nextSlide}
  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/90 hover:bg-[#a92d23] border border-white/30 shadow-lg transition-all hover:scale-110 z-20 group/btn backdrop-blur-sm"
  aria-label="Selanjutnya"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 text-[#a92d23] group-hover/btn:text-white transition-colors"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M7.707 4.293a1 1 0 010 1.414L12.586 10l-4.879 4.293a1 1 0 001.414 1.414l6-6a1 1 0 000-1.414l-6-6a1 1 0 00-1.414 0z"
      clipRule="evenodd"
    />
  </svg>
</button>

        </div>

        {/* Pagination yang lebih menarik */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 ">
          {culturalSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                idx === current
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/80 hover:scale-110"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Komponen utama yang menggabungkan semuanya
export default function CombinedCulturalHeritage() {
  const culturalSlides = [
    {
      id: 1,
      image: "/batik.png",
      title: "Seni Batik",
      subtitle: "Warisan Budaya UNESCO",
      icon: <Palette className="w-8 h-8" />,
    },
    {
      id: 2,
      image: "/wayang1.jpg",
      title: "Wayang Kulit",
      subtitle: "Seni Pertunjukan Tradisional",
      icon: <Theater className="w-8 h-8" />,
    },
    {
      id: 3,
      image: "/tari.jpg",
      title: "Tari Tradisional",
      subtitle: "Keindahan Gerak dan Makna",
      icon: <Drama className="w-8 h-8" />,
    },
    {
      id: 4,
      image: "/gamelan.jpg",
      title: "Musik Gamelan",
      subtitle: "Harmoni Nusantara",
      icon: <Music className="w-8 h-8" />,
    },
    {
      id: 5,
      image: "/rumah-gadang.jpg",
      title: "Arsitektur Tradisional",
      subtitle: "Kearifan Lokal dalam Bangunan",
      icon: <MapPin className="w-8 h-8" />,
    },
  ];

  return (
    <div className="relative">
      {/* CulturalTransition sebagai header */}
      <CulturalTransition />
      
      {/* CulturalHeritageSection sebagai konten utama */}
      <section className="relative py-10 sm:py-16 md:py-24 bg-[#a92d23] overflow-hidden">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div className="space-y-6 sm:space-y-8 text-white animate-slideInLeft">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                  Kekayaan Budaya yang Tak Ternilai
                </h2>
                <p className="text-base sm:text-lg md:text-xl leading-relaxed text-[#fdf6e3] mb-6 sm:mb-8">
                  Dari Sabang sampai Merauke, Indonesia memiliki ribuan kearifan
                  lokal yang perlu dilestarikan. Mari bersama-sama menjaga warisan
                  leluhur untuk generasi mendatang.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                <CulturalStatCard
                  number="17,508"
                  label="Pulau di Indonesia"
                  icon={<MapPin className="w-5 h-5" />}
                />
                <CulturalStatCard
                  number="1,340"
                  label="Suku Bangsa"
                  icon={<Users className="w-5 h-5" />}
                />
                <CulturalStatCard
                  number="718"
                  label="Bahasa Daerah"
                  icon={<Languages className="w-5 h-5" />}
                />
                <CulturalStatCard
                  number="5,000+"
                  label="Warisan Budaya"
                  icon={<BookOpen className="w-5 h-5" />}
                />
              </div>

              <Link
                href="/articles"
                className="inline-flex items-center gap-2 sm:gap-3 bg-white text-[#a92d23] hover:bg-[#fdf6e3] px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-lg sm:rounded-xl md:rounded-2xl font-bold text-sm sm:text-base md:text-lg shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group"
              >
                <span>Jelajahi Sekarang</span>
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>

            {/* Visual Showcase - Slider */}
            <Carousel culturalSlides={culturalSlides} />
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("/mendung1.png")`,
              backgroundSize: "100px 100px",
            }}
          ></div>
        </div>
      </section>

      {/* Styles untuk animasi */}
      <style jsx global>{`
        @keyframes floatSlow {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(2deg);
          }
        }

        @keyframes floatMedium {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-12px) scale(1.05);
          }
        }

        @keyframes floatSlowReverse {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(-2deg);
          }
        }

        @keyframes spinSlow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes floatParticle1 {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.4;
          }
          33% {
            transform: translateY(-15px) translateX(5px);
            opacity: 0.8;
          }
          66% {
            transform: translateY(-8px) translateX(-3px);
            opacity: 0.6;
          }
        }

        @keyframes floatParticle2 {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) translateX(-8px);
            opacity: 0.7;
          }
        }

        @keyframes floatParticle3 {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.5;
          }
          25% {
            transform: translateY(-10px) translateX(8px);
            opacity: 0.8;
          }
          75% {
            transform: translateY(-18px) translateX(-5px);
            opacity: 0.4;
          }
        }

        @keyframes wave {
          0%, 100% {
            transform: translateX(0px);
          }
          50% {
            transform: translateX(-20px);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-float-slow {
          animation: floatSlow 4s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: floatMedium 3.5s ease-in-out infinite;
        }

        .animate-float-slow-reverse {
          animation: floatSlowReverse 4.2s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spinSlow 20s linear infinite;
        }

        .animate-float-particle-1 {
          animation: floatParticle1 6s ease-in-out infinite;
        }

        .animate-float-particle-2 {
          animation: floatParticle2 7s ease-in-out infinite;
        }

        .animate-float-particle-3 {
          animation: floatParticle3 5.5s ease-in-out infinite;
        }

        .animate-wave {
          animation: wave 8s ease-in-out infinite;
        }

        .animate-slideInLeft {
          animation: slideInLeft 1s ease-out forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 1s ease-out forwards;
        }

        /* Responsive improvements */
        @media (max-width: 768px) {
          .animate-float-slow,
          .animate-float-medium,
          .animate-float-slow-reverse {
            animation-duration: 6s;
          }
          
          .animate-spin-slow {
            animation-duration: 30s;
          }
        }
      `}</style>
    </div>
  );
}