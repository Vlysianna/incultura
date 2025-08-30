import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [animationPhase, setAnimationPhase] = useState('initial');
  const [showFloatingElements, setShowFloatingElements] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const zoomInTimer = setTimeout(() => {
      setAnimationPhase("zoomed");
      setIsZoomed(true);
    }, 1000);

    return () => clearTimeout(zoomInTimer);
  }, []);

  useEffect(() => {
    if (isZoomed) {
      // Setelah zoom in, tampilkan floating elements
      const showFloatingTimer = setTimeout(() => {
        setShowFloatingElements(true);
      }, 2000);
      
      // Setelah 5 detik, mulai zoom out
      const zoomOutTimer = setTimeout(() => {
        setAnimationPhase("zooming-out");
        setShowFloatingElements(false);
        
        // Setelah zoom out selesai, reset ke awal
        const resetTimer = setTimeout(() => {
          setAnimationPhase("initial");
          setIsZoomed(false);
        }, 4000);
        
        return () => clearTimeout(resetTimer);
      }, 10000);
      
      return () => {
        clearTimeout(showFloatingTimer);
        clearTimeout(zoomOutTimer);
      };
    }
  }, [isZoomed]);

  // Restart animasi setelah selesai satu siklus
  useEffect(() => {
    if (animationPhase === "initial" && !isZoomed) {
      const restartTimer = setTimeout(() => {
        setAnimationPhase("zoomed");
        setIsZoomed(true);
      }, 2000);
      
      return () => clearTimeout(restartTimer);
    }
  }, [animationPhase, isZoomed]);

  const floatingElements = [
    { 
      id: 1, 
      image: '/borobudur.png', 
      label: 'Borobudur', 
      x: 65, 
      y: 45, 
      delay: 0 
    },
    { 
      id: 2, 
      image: '/prambanan.png', 
      label: 'Prambanan', 
      x: 57, 
      y: 65, 
      delay: 0.5 
    },
    { id: 3, 
      image: '/ondel-ondel.png', 
      label: 'Ondel - Ondel', 
      x: 20, 
      y: 50, 
      delay: 1 
    },
    { 
      id: 4, 
      image: '/mega-mendung.png', 
      label: 'Mega Mendung', 
      x: 33, 
      y: 65, 
      delay: 1.5 
    },
    { 
      id: 5, 
      image: '/angklung.png', 
      label: 'Angklung', 
      x: 35, 
      y: 45, 
      delay: 2 
    },
    { 
      id: 6, 
      image: '/reog-ponorogo.png', 
      label: 'Wayang', 
      x: 75, 
      y: 60, 
      delay: 2.5 
    },
  ];

  const highlight = { x: 20, y: 52, w: 25, h: 10 };
  const centerX = highlight.x + highlight.w / 2;
  const centerY = highlight.y + highlight.h / 2;
  const zoomScale = 3;
  const translateX = 50 - centerX;
  const translateY = 50 - centerY;

  // Tentukan transform berdasarkan fase animasi
  const getTransform = () => {
    switch(animationPhase) {
      case "initial":
        return "scale(1) translate(0%, 0%)";
      case "zoomed":
        return `scale(${zoomScale}) translate(${translateX}%, ${translateY}%)`;
      case "zooming-out":
        return "scale(1) translate(0%, 0%)";
      default:
        return "scale(1) translate(0%, 0%)";
    }
  };

  // Tentukan transition duration berdasarkan fase animasi
  const getTransitionDuration = () => {
    switch(animationPhase) {
      case "zoomed":
        return "4000ms";
      case "zooming-out":
        return "4000ms";
      default:
        return "0ms";
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Login Form with Javanese Cloud Pattern */}
      <div className="w-full lg:w-1/2 bg-gradient-to-b from-[#fef8ec] to-[#f9e5c8] flex items-center justify-center p-4 md:p-8 relative overflow-hidden order-2 lg:order-1">

        {/* Javanese Cloud Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-[5%] top-[8%] w-24 h-12 md:w-40 md:h-20 bg-no-repeat bg-contain" style={{ backgroundImage: "url('/mendung1.png')" }}></div>
          <div className="absolute left-[55%] top-[5%] w-28 h-14 md:w-48 md:h-24 bg-no-repeat bg-contain" style={{ backgroundImage: "url('/mendung2.png')" }}></div>
          <div className="absolute left-[25%] top-[70%] w-20 h-10 md:w-36 md:h-18 bg-no-repeat bg-contain" style={{ backgroundImage: "url('/mendung1.png')" }}></div>
          <div className="absolute left-[70%] top-[75%] w-24 h-12 md:w-44 md:h-22 bg-no-repeat bg-contain" style={{ backgroundImage: "url('/mendung2.png')" }}></div>
          <div className="absolute left-[10%] top-[40%] w-16 h-8 md:w-32 md:h-16 bg-no-repeat bg-contain" style={{ backgroundImage: "url('/mendung1.png')" }}></div>
          <div className="absolute left-[65%] top-[45%] w-20 h-10 md:w-40 md:h-20 bg-no-repeat bg-contain" style={{ backgroundImage: "url('/mendung2.png')" }}></div>
        </div>

        {/* Animated Floating Clouds */}
        <div className="absolute inset-0">
          <div className="absolute left-[10%] top-[15%] w-20 md:w-32 opacity-70 animate-float-auth" style={{ animationDelay: '0s', animationDuration: '20s' }}>
            <img src="/mendung1.png" alt="Cloud 1" className="w-full h-auto" />
          </div>
          <div className="absolute left-[60%] top-[10%] w-24 md:w-40 opacity-60 animate-float-auth" style={{ animationDelay: '3s', animationDuration: '25s' }}>
            <img src="/mendung2.png" alt="Cloud 2" className="w-full h-auto" />
          </div>
          <div className="absolute left-[20%] top-[70%] w-20 md:w-36 opacity-80 animate-float-auth" style={{ animationDelay: '6s', animationDuration: '22s' }}>
            <img src="/mendung1.png" alt="Cloud 3" className="w-full h-auto" />
          </div>
          <div className="absolute left-[75%] top-[65%] w-24 md:w-44 opacity-65 animate-float-auth" style={{ animationDelay: '9s', animationDuration: '28s' }}>
            <img src="/mendung2.png" alt="Cloud 4" className="w-full h-auto" />
          </div>
        </div>

        <div className="absolute inset-0">
          <div className="absolute left-[1%] top-[70%] blur-[3px] rotate-345 w-20 md:w-40 opacity-70 animate-float-auth" style={{ animationDelay: '0s', animationDuration: '20s' }}>
            <img src="/wayang-2.png" alt="Wayang 2" className="w-full h-auto" />
          </div>
          <div className="absolute left-[70%] top-[24%] blur-[3px] rotate-345 w-20 md:w-40 opacity-70 animate-float-auth" style={{ animationDelay: '0s', animationDuration: '20s' }}>
            <img src="/wayang-1.png" alt="Wayang 1" className="w-full h-auto" />
          </div>
        </div>

        {/* Traditional Javanese Border */}
        <div className="absolute top-0 left-0 right-0 h-1 md:h-2 bg-gradient-to-r from-[#a92e23] via-[#d9b45f] to-[#a92e23]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1 md:h-2 bg-gradient-to-r from-[#a92e23] via-[#d9b45f] to-[#a92e23]"></div>

        <div className="w-full max-w-md relative z-10">
          {/* Logo with Javanese Touch */}
          <Link href="./" className="flex items-center gap-2 md:gap-3 group mb-6 md:mb-8 justify-start">
            <div className="relative">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#a92e23] to-[#d9b45f] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 border-2 border-white">
                <Image src="/InculturaLogo.svg" alt="logo" width={24} height={24} className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 md:w-5 md:h-5 bg-gradient-to-br from-[#d9b45f] to-[#a92e23] rounded-full animate-pulse-slow border border-white"></div>
            </div>
            <div className="text-center">
              <h1 className="text-lg md:text-xl font-bold tracking-tight bg-gradient-to-r from-[#a92d23] to-[#f3d099] bg-clip-text text-transparent">
                <Image src="/InculturaTeks.svg" alt="logo" width={80} height={16} className="w-16 h-4 md:w-20 md:h-5" />
              </h1>
              <p className="text-xs text-[#a92d23] font-medium">Digitalisasi Budaya Indonesia</p>
            </div>
          </Link>

          {/* Welcome Text with Javanese Style */}
          <div className="mb-6 md:mb-8 text-start">
            <div className="inline-block bg-[#a92e23] text-white px-3 py-1 md:px-4 md:py-1 rounded-full text-xs md:text-sm mb-3 md:mb-4">
              Sugeng Rawuh
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#a92d23] mb-2">Selamat Datang</h1>
            <p className="text-[#6b4c48] text-sm md:text-base">Masuk ke akun Incultura Anda</p>
          </div>

          {/* Login Form with Javanese Elements */}
          <div className="space-y-4 md:space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#6b4c48] mb-2">Email atau nama pengguna</label>
              <input
                type="text"
                placeholder="Contoh: wayan@email.com"
                className="w-full px-4 py-2 md:py-3 border border-[#d9b45f] rounded-lg focus:ring-2 focus:ring-[#a92e23] focus:border-transparent outline-none transition-all bg-white/80 text-[#6b4c48] text-sm md:text-base"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-[#6b4c48] mb-2">Kata sandi</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan kata sandi Anda"
                className="w-full px-4 py-2 md:py-3 pr-10 md:pr-12 border border-[#d9b45f] rounded-lg focus:ring-2 focus:ring-[#a92e23] focus:border-transparent outline-none transition-all bg-white/80 text-[#6b4c48] text-sm md:text-base"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[55%] md:right-4 md:top-2/3 transform -translate-y-1/2 text-[#a92e23] hover:text-[#88241b] cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} className="md:w-5 md:h-5 w-4 h-4" /> : <Eye size={18} className="md:w-5 md:h-5 w-4 h-4" />}
              </button>
            </div>

              <div className="text-center">
                <button
                    type="button"
                    className="w-full bg-[#a92d23] text-white font-semibold py-2 md:py-2.5 rounded-xl shadow-lg hover:shadow-[#a92d23] hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 relative before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 overflow-hidden cursor-pointer text-sm md:text-base"
                >
                    <span className="relative z-10">Masuk</span>
                </button>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-6 md:mt-8 text-center space-y-2 md:space-y-3">
            <div className="space-x-2 md:space-x-3">
              <a href="#" className="text-[#a92e23] hover:underline text-xs md:text-sm">Lupa kata sandi?</a>
            </div>
            <div>
              <span className="text-[#6b4c48] text-xs md:text-sm">Belum punya akun? </span>
              <a href="#" className="text-[#a92e23] hover:underline font-medium text-xs md:text-sm">Daftar di sini</a>
            </div>
          </div>

        </div>
      </div>

      {/* Right Side - Map Animation */}
      <div className="w-full lg:w-1/2 h-64 md:h-96 lg:h-auto bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 relative overflow-hidden order-1 lg:order-2">
        {/* Indonesia Map Container */}
        <div
          className="absolute inset-0 transition-all ease-in-out"
          style={{
            transform: getTransform(),
            transitionDuration: getTransitionDuration()
          }}
        >
          <img src="/map-indonesia.png" alt="Indonesia Map" className="w-full h-full object-contain" />

          {/* Highlight Box */}
          {animationPhase === "zoomed" && (
            <div className="absolute left-[20%] top-[52%] w-[25%] h-[10%] border-2 border-yellow-400 rounded-lg animate-pulse"></div>
          )}
        </div>

        {/* Floating Elements - hanya muncul saat zoomed */}
        {showFloatingElements && (
          <div className="absolute inset-0">
            {floatingElements.map((element) => (
              <div
                key={element.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${element.x}%`,
                  top: `${element.y}%`,
                  animationDelay: `${element.delay}s`,
                }}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-1.5 md:p-2 shadow-lg hover:scale-110 transition-transform cursor-pointer animate-float-element"
                  style={{ 
                    animation: `floatElement 3s ease-in-out ${element.delay}s infinite both`,
                  }}>
                  <div className="relative w-6 h-6 md:w-8 md:h-8">
                    <Image 
                      src={element.image} 
                      alt={element.label} 
                      fill
                      className="object-contain" 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Decorative Elements */}
        <div className="absolute bottom-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-yellow-400 rounded-full transform translate-x-16 translate-y-16 md:translate-x-32 md:translate-y-32 opacity-80"></div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                              radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>
      </div>

      {/* Tambahkan style untuk animasi floating elements */}
      <style jsx>{`
        @keyframes floatElement {
          0% {
            transform: translateY(0) rotate(0deg);
            box-shadow: 0 5px 15px 0px rgba(0,0,0,0.2);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
            box-shadow: 0 15px 15px 0px rgba(0,0,0,0.1);
          }
          100% {
            transform: translateY(0) rotate(0deg);
            box-shadow: 0 5px 15px 0px rgba(0,0,0,0.2);
          }
        }
        
        .animate-float-element {
          animation: floatElement 3s ease-in-out infinite both;
        }
        
        @media (max-width: 768px) {
          @keyframes floatElement {
            0% {
              transform: translateY(0) rotate(0deg);
              box-shadow: 0 3px 10px 0px rgba(0,0,0,0.2);
            }
            50% {
              transform: translateY(-5px) rotate(3deg);
              box-shadow: 0 10px 10px 0px rgba(0,0,0,0.1);
            }
            100% {
              transform: translateY(0) rotate(0deg);
              box-shadow: 0 3px 10px 0px rgba(0,0,0,0.2);
            }
          }
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;