export default function TransitionSection() {
  return (
    <section className="relative overflow-hidden ">
      {/* Gradient transition from hero to features */}
      <div className="h-20 md:h-32 lg:h-40 bg-gradient-to-b from-white via-[#f3d099]/30 via-[#f3d099]/60 to-[#f3d099]"></div>
      
      {/* Floating cultural elements - batik mega mendung */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Baris atas - ukuran dan posisi diubah untuk mobile */}
        <img src="/mendung2.png" alt="" 
            className="absolute top-1 left-[5%] w-12 md:w-16 lg:w-20 animate-float rotate-[-6deg]"
            style={{animationDelay: '0.2s'}} />
        <img src="/mendung2.png" alt="" 
            className="absolute top-17 left-[30%] w-14 md:w-20 lg:w-24 animate-float-delayed rotate-[4deg]"
            style={{animationDelay: '0.4s'}} />
        <img src="/mendung2.png" alt="" 
            className="absolute top-1 right-[10%] w-12 md:w-16 lg:w-20 animate-parallaxFloat rotate-[7deg]"
            style={{animationDelay: '0.6s'}} />

        {/* Baris tengah - diatur ulang untuk tampilan mobile */}
        <img src="/mendung2.png" alt="" 
            className="absolute top-3 left-[15%] w-16 md:w-24 lg:w-28 animate-float rotate-[-3deg]"
            style={{animationDelay: '0.8s'}} />
        <img src="/mendung2.png" alt="" 
            className="absolute top-4 left-[45%] w-20 md:w-28 lg:w-32 animate-float-delayed rotate-[2deg]"
            style={{animationDelay: '1s'}} />
        <img src="/mendung2.png" alt="" 
            className="absolute top-5 right-[15%] w-16 md:w-24 lg:w-28 animate-parallaxFloat rotate-[-5deg]"
            style={{animationDelay: '1.2s'}} />

        {/* Baris bawah - diatur ulang untuk tampilan mobile */}
        <img src="/mendung2.png" alt="" 
            className="absolute top-15 left-[2%] w-14 md:w-20 lg:w-24 animate-float rotate-[5deg]"
            style={{animationDelay: '1.4s'}} />
        <img src="/mendung2.png" alt="" 
            className="absolute top-7 left-[35%] w-12 md:w-16 lg:w-20 animate-float-delayed rotate-[-4deg]"
            style={{animationDelay: '1.6s'}} />
        <img src="/mendung2.png" alt="" 
            className="absolute top-8 right-[5%] w-16 md:w-24 lg:w-28 animate-parallaxFloat rotate-[6deg]"
            style={{animationDelay: '1.8s'}} />
      </div>
      
      {/* Wave pattern */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-auto">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f3d099" />
              <stop offset="50%" stopColor="#f3d099" />
              <stop offset="100%" stopColor="#f3d099" />
            </linearGradient>
          </defs>
          <path 
            fill="url(#waveGradient)" 
            d="M0,60L48,65C96,70,192,80,288,75C384,70,480,50,576,45C672,40,768,50,864,60C960,70,1056,80,1152,85C1248,90,1344,90,1392,90L1440,90L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
        </svg>
      </div>
      
      {/* Subtle dotted pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #a92d23 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
    </section>
  );
}