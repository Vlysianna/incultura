import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [animationPhase, setAnimationPhase] = useState('initial');
  const [showFloatingElements, setShowFloatingElements] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const zoomInTimer = setTimeout(() => {
      setAnimationPhase("zoomed");
      setIsZoomed(true);
    }, 1000);

    return () => clearTimeout(zoomInTimer);
  }, []);

  useEffect(() => {
    if (isZoomed) {
      const showFloatingTimer = setTimeout(() => {
        setShowFloatingElements(true);
      }, 2000);
      
      const zoomOutTimer = setTimeout(() => {
        setAnimationPhase("zooming-out");
        setShowFloatingElements(false);
        
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
      y: 43, 
      mobileX: 65,
      mobileY:47,
      delay: 0 
    },
    { 
      id: 2, 
      image: '/prambanan.png', 
      label: 'Prambanan', 
      x: 57, 
      y: 63, 
      mobileX: 57,
      mobileY: 67,
      delay: 0.5 
    },
    { id: 3, 
      image: '/ondel-ondel.png', 
      label: 'Ondel - Ondel', 
      x: 20, 
      y: 48, 
      mobileX: 20,
      mobileY: 52,
      delay: 1 
    },
    { 
      id: 4, 
      image: '/mega-mendung.png', 
      label: 'Mega Mendung', 
      x: 33, 
      y: 63, 
      mobileX: 33,
      mobileY: 62,
      delay: 1.5 
    },
    { 
      id: 5, 
      image: '/angklung.png', 
      label: 'Angklung', 
      x: 35, 
      y: 43, 
      mobileX: 35,
      mobileY: 47,
      delay: 2 
    },
    { 
      id: 6, 
      image: '/reog-ponorogo.png', 
      label: 'Wayang', 
      x: 75, 
      y: 58, 
      mobileX: 75,
      mobileY: 57,
      delay: 2.5 
    },
  ];

  const highlight = { x: 20, y: 52, w: 25, h: 10 };
  const centerX = highlight.x + highlight.w / 2;
  const centerY = highlight.y + highlight.h / 2;
  const zoomScale = 3;
  const translateX = 50 - centerX;
  const translateY = 50 - centerY;

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
      <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-[#fef8ec] to-[#f9e5c8] p-4 md:p-8 relative overflow-hidden order-2 lg:order-1">

        {/* Javanese Cloud Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-[5%] top-[8%] w-16 h-8 md:w-40 md:h-20 bg-no-repeat bg-contain" style={{ backgroundImage: "url('/mendung1.png')" }}></div>
          <div className="absolute left-[55%] top-[5%] w-20 h-10 md:w-48 md:h-24 bg-no-repeat bg-contain" style={{ backgroundImage: "url('/mendung2.png')" }}></div>
          <div className="absolute left-[25%] top-[70%] w-14 h-7 md:w-36 md:h-18 bg-no-repeat bg-contain" style={{ backgroundImage: "url('/mendung1.png')" }}></div>
          <div className="absolute left-[70%] top-[75%] w-16 h-8 md:w-44 md:h-22 bg-no-repeat bg-contain" style={{ backgroundImage: "url('/mendung2.png')" }}></div>
          <div className="absolute left-[10%] top-[40%] w-12 h-6 md:w-32 md:h-16 bg-no-repeat bg-contain" style={{ backgroundImage: "url('/mendung1.png')" }}></div>
          <div className="absolute left-[65%] top-[45%] w-14 h-7 md:w-40 md:h-20 bg-no-repeat bg-contain" style={{ backgroundImage: "url('/mendung2.png')" }}></div>
        </div>

        {/* Animated Floating Clouds */}
        <div className="absolute inset-0">
          <div className="absolute left-[10%] top-[15%] w-12 md:w-32 opacity-70 animate-float-auth" style={{ animationDelay: '0s', animationDuration: '20s' }}>
            <img src="/mendung1.png" alt="Cloud 1" className="w-full h-auto" />
          </div>
          <div className="absolute left-[60%] top-[10%] w-16 md:w-40 opacity-60 animate-float-auth" style={{ animationDelay: '3s', animationDuration: '25s' }}>
            <img src="/mendung2.png" alt="Cloud 2" className="w-full h-auto" />
          </div>
          <div className="absolute left-[20%] top-[70%] w-12 md:w-36 opacity-80 animate-float-auth" style={{ animationDelay: '6s', animationDuration: '22s' }}>
            <img src="/mendung1.png" alt="Cloud 3" className="w-full h-auto" />
          </div>
          <div className="absolute left-[75%] top-[65%] w-16 md:w-44 opacity-65 animate-float-auth" style={{ animationDelay: '9s', animationDuration: '28s' }}>
            <img src="/mendung2.png" alt="Cloud 4" className="w-full h-auto" />
          </div>
        </div>

        <div className="absolute inset-0">
          <div className="absolute left-[1%] top-[70%] blur-[2px] md:blur-[3px] rotate-345 w-12 md:w-40 opacity-70 animate-float-auth" style={{ animationDelay: '0s', animationDuration: '20s' }}>
            <img src="/wayang-2.png" alt="Wayang 2" className="w-full h-auto" />
          </div>
          <div className="absolute left-[70%] top-[24%] blur-[2px] md:blur-[3px] rotate-345 w-12 md:w-40 opacity-70 animate-float-auth" style={{ animationDelay: '0s', animationDuration: '20s' }}>
            <img src="/wayang-1.png" alt="Wayang 1" className="w-full h-auto" />
          </div>
        </div>

        {/* Traditional Javanese Border */}
        <div className="absolute top-0 left-0 right-0 h-1 md:h-2 bg-gradient-to-r from-[#a92e23] via-[#d9b45f] to-[#a92e23]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1 md:h-2 bg-gradient-to-r from-[#a92e23] via-[#d9b45f] to-[#a92e23]"></div>

        <div className="w-full max-w-md relative z-10 py-4">
          {/* Logo with Javanese Touch */}
          <Link href="./" className="flex items-center gap-2 md:gap-3 group mb-4 md:mb-6 justify-start">
            <div className="relative">
              <div className="w-10 h-10 md:w-16 md:h-16 bg-gradient-to-br from-[#a92e23] to-[#d9b45f] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 border-2 border-white">
                <Image src="/InculturaLogo.svg" alt="logo" width={24} height={24} className="w-5 h-5 md:w-12 md:h-12" />
              </div>
              <div className="absolute -top-1 -right-1 w-2 h-2 md:w-5 md:h-5 bg-gradient-to-br from-[#d9b45f] to-[#a92e23] rounded-full animate-pulse-slow border border-white"></div>
            </div>
            <div className="text-center">
              <h1 className="text-base md:text-xl font-bold tracking-tight bg-gradient-to-r from-[#a92d23] to-[#f3d099] bg-clip-text text-transparent">
                <Image src="/InculturaTeks.svg" alt="logo" width={80} height={16} className="w-[60px] h-[30px] md:w-[80px] md:h-[40px]" />
              </h1>
              <p className="text-[10px] md:text-xs text-[#a92d23] font-medium">Digitalisasi Budaya Indonesia</p>
            </div>
          </Link>

          {/* Welcome Text with Javanese Style */}
          <div className="mb-4 md:mb-6 text-start">
            <div className="inline-block bg-[#a92e23] text-white px-2 py-1 md:px-4 md:py-1 rounded-full text-[10px] md:text-sm mb-2 md:mb-3">
              Sugeng Rawuh
            </div>
            <h1 className="text-xl md:text-3xl font-bold text-[#a92d23] mb-1 md:mb-2">Selamat Datang</h1>
            <p className="text-[#6b4c48] text-xs md:text-base">Masuk ke akun Incultura Anda</p>
          </div>

          {/* Login Form with Javanese Elements */}
          <form onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            setError(null);
            try {
              const res = await signIn('credentials', { redirect: false, email, password });
              if (res?.error) {
                setLoading(false);
                setError(res.error || 'Gagal masuk. Periksa kembali kredensial Anda.');
                return;
              }

              // helper: try to get session a few times since session creation can be async
              const getSessionWithRetry = async (attempts = 6, delay = 200) => {
                for (let i = 0; i < attempts; i++) {
                  const s = await getSession();
                  if (s && s.user && s.user.id) return s;
                  await new Promise(r => setTimeout(r, delay));
                }
                return null;
              };

              const session = await getSessionWithRetry();
              if (!session || !session.user) {
                // fallback: navigate to home if session couldn't be retrieved
                setLoading(false);
                router.push('/');
                return;
              }

              // fetch profile to get authoritative isAdmin flag
              try {
                const profileRes = await fetch(`/api/profile?userId=${session.user.id}`);
                const profileData = await profileRes.json();
                const isAdmin = !!profileData?.isAdmin || !!profileData?.user?.isAdmin || !!profileData?.is_admin;
                setLoading(false);
                if (isAdmin) {
                  router.push('/admin');
                } else {
                  router.push('/');
                }
                return;
              } catch (pfErr) {
                // if profile fetch fails, just go to homepage
                setLoading(false);
                router.push('/');
                return;
              }
            } catch (err) {
              setLoading(false);
              setError('Terjadi kesalahan saat mencoba masuk.');
            }
          }} className="space-y-3 md:space-y-4">
            <div>
              <label className="block text-xs md:text-sm font-medium text-[#6b4c48] mb-1 md:mb-2">Email atau nama pengguna</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Contoh: wayan@email.com"
                className="w-full px-3 py-2 md:px-4 md:py-2.5 border border-[#d9b45f] rounded-lg focus:ring-2 focus:ring-[#a92e23] focus:border-transparent outline-none transition-all bg-white/80 text-[#6b4c48] text-xs md:text-sm"
              />
            </div>

            <div className="relative">
              <label className="block text-xs md:text-sm font-medium text-[#6b4c48] mb-1 md:mb-2">Kata sandi</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi Anda"
                className="w-full px-3 py-2 md:px-4 md:py-2.5 pr-8 md:pr-12 border border-[#d9b45f] rounded-lg focus:ring-2 focus:ring-[#a92e23] focus:border-transparent outline-none transition-all bg-white/80 text-[#6b4c48] text-xs md:text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2/3 md:right-3 transform -translate-y-1/2 text-[#a92e23] hover:text-[#88241b] cursor-pointer"
              >
                {showPassword ? <EyeOff size={16} className="md:w-5 md:h-5 w-4 h-4" /> : <Eye size={16} className="md:w-5 md:h-5 w-4 h-4" />}
              </button>
            </div>

            {error && (
              <div className="text-sm text-red-600">{error}</div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-[#a92d23] text-white font-semibold py-2 md:py-2.5 rounded-xl shadow-lg transform transition-all duration-300 relative before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 overflow-hidden cursor-pointer text-xs md:text-sm ${loading ? 'opacity-60 cursor-wait' : 'hover:shadow-[#a92d23] hover:shadow-xl hover:scale-[1.02]'}`}
              >
                <span className="relative z-10">{loading ? 'Sedang masuk...' : 'Masuk'}</span>
              </button>
            </div>
          </form>

          {/* Footer Links */}
          <div className="mt-4 md:mt-6 text-center space-y-2 md:space-y-3">
            <div>
              <a href="#" className="text-[#a92e23] hover:underline text-xs md:text-sm">Lupa kata sandi?</a>
            </div>
            <div>
              <span className="text-[#6b4c48] text-xs md:text-sm">Belum punya akun? </span>
              <Link href="/register" className="text-[#a92e23] hover:underline font-medium text-xs md:text-sm">Daftar di sini</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Map Animation */}
      <div className="w-full h-[400px] md:flex-1 lg:h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 relative overflow-hidden order-1 lg:order-2">
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
            <div className="absolute left-[20%] top-[54%] w-[25%] h-[10%] md:left-[20%] md:top-[52%] md:w-[25%] md:h-[10%] border-2 border-yellow-400 rounded-lg animate-pulse"></div>
          )}
        </div>

        {/* Floating Elements */}
        {showFloatingElements && (
          <div className="absolute inset-0">
            {floatingElements.map((element) => (
              <div
                key={element.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${window.innerWidth < 768 ? element.mobileX : element.x}%`,
                  top: `${window.innerWidth < 768 ? element.mobileY : element.y}%`,
                  animationDelay: `${element.delay}s`,
                }}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-lg md:rounded-xl p-1 md:p-2 shadow-lg hover:scale-110 transition-transform cursor-pointer animate-float-element"
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
        <div className="absolute bottom-0 right-0 w-20 h-20 md:w-64 md:h-64 bg-yellow-400 rounded-full transform translate-x-10 translate-y-10 md:translate-x-32 md:translate-y-32 opacity-80"></div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px),
                              radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
      </div>

      {/* Tambahkan style untuk animasi floating elements */}
      <style jsx>{`
        @keyframes floatElement {
          0% {
            transform: translateY(0) rotate(0deg);
            box-shadow: 0 3px 10px 0px rgba(0,0,0,0.2);
          }
          50% {
            transform: translateY(-8px) rotate(3deg);
            box-shadow: 0 8px 15px 0px rgba(0,0,0,0.1);
          }
          100% {
            transform: translateY(0) rotate(0deg);
            box-shadow: 0 3px 10px 0px rgba(0,0,0,0.2);
          }
        }
        
        .animate-float-element {
          animation: floatElement 3s ease-in-out infinite both;
        }
        
        @media (min-width: 768px) {
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
        }
      `}</style>
    </div>
  );
};

export default LoginPage;