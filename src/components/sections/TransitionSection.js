export default function TransitionSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Gradient transition from hero to features with enhanced depth */}
      <div className="h-40 bg-gradient-to-b from-white via-[#F5F5DC]/30 via-[#F5F5DC]/60 to-[#F5F5DC]"></div>
      
      {/* Floating cultural elements for visual continuity */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large floating batik patterns with parallax effect */}
        <div className="absolute top-8 left-1/4 w-12 h-12 bg-gradient-to-br from-[#D4AF37]/15 to-[#8B5E3C]/15 rounded-full animate-parallaxFloat backdrop-blur-sm"></div>
        <div className="absolute top-16 right-1/3 w-8 h-8 bg-gradient-to-br from-[#3A5FCD]/15 to-[#708238]/15 rounded-full animate-float-delayed backdrop-blur-sm"></div>
        <div className="absolute top-24 left-1/2 w-6 h-6 bg-gradient-to-br from-[#708238]/15 to-[#A0522D]/15 rounded-full animate-float backdrop-blur-sm"></div>
        <div className="absolute top-4 right-1/6 w-10 h-10 bg-gradient-to-br from-[#A0522D]/10 to-[#8B5E3C]/10 rounded-full animate-parallaxFloat backdrop-blur-sm"></div>
        
        {/* Traditional pattern elements with improved animations */}
        <div className="absolute top-12 right-1/4 opacity-20 animate-scaleIn" style={{animationDelay: '0.5s'}}>
          <svg width="32" height="32" viewBox="0 0 24 24" className="text-[#D4AF37] animate-wave">
            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        
        <div className="absolute top-20 left-1/6 opacity-20 animate-scaleIn" style={{animationDelay: '0.8s'}}>
          <svg width="28" height="28" viewBox="0 0 24 24" className="text-[#8B5E3C] animate-float">
            <path fill="currentColor" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        
        <div className="absolute top-6 left-3/4 opacity-20 animate-scaleIn" style={{animationDelay: '1s'}}>
          <svg width="24" height="24" viewBox="0 0 24 24" className="text-[#3A5FCD] animate-wave">
            <path fill="currentColor" d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
        </div>
      </div>
      
      {/* Enhanced wave pattern for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-auto">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F5F5DC" />
              <stop offset="50%" stopColor="#F5F5DC" />
              <stop offset="100%" stopColor="#F5F5DC" />
            </linearGradient>
          </defs>
          <path 
            fill="url(#waveGradient)" 
            d="M0,60L48,65C96,70,192,80,288,75C384,70,480,50,576,45C672,40,768,50,864,60C960,70,1056,80,1152,85C1248,90,1344,90,1392,90L1440,90L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
        </svg>
      </div>
      
      {/* Subtle dotted pattern overlay for cultural texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #8B5E3C 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
    </section>
  );
}
