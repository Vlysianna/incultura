import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [animationPhase, setAnimationPhase] = useState('initial'); // initial, zooming, final
  const [showFloatingElements, setShowFloatingElements] = useState(false);

  useEffect(() => {
    // Start zoom animation after 1 second
    const timer1 = setTimeout(() => {
      setAnimationPhase('zooming');
    }, 1000);

    // Show Java island and floating elements after zoom
    const timer2 = setTimeout(() => {
      setAnimationPhase('final');
      setShowFloatingElements(true);
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const floatingElements = [
    { id: 1, icon: '🏛️', label: 'Borobudur', x: 65, y: 45, delay: 0 },
    { id: 2, icon: '🌋', label: 'Merapi', x: 70, y: 35, delay: 0.5 },
    { id: 3, icon: '🏯', label: 'Prambanan', x: 75, y: 50, delay: 1 },
    { id: 4, icon: '🎭', label: 'Wayang', x: 55, y: 55, delay: 1.5 },
    { id: 5, icon: '🍜', label: 'Gudeg', x: 80, y: 40, delay: 2 },
    { id: 6, icon: '🏰', label: 'Yogyakarta', x: 60, y: 60, delay: 2.5 },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="w-1/2 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center mb-12">
            <span className="text-3xl font-bold text-gray-900">Linktree</span>
            <span className="text-green-500 text-4xl ml-2">🌿</span>
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back</h1>
            <p className="text-gray-500">Log in to your Linktree</p>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Email or username"
                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-4 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              type="button"
              className="w-full bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Continue
            </button>

            <div className="text-center text-gray-500">OR</div>

            <button
              type="button"
              className="w-full border border-gray-300 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
            >
              <span className="text-blue-500">G</span>
              <span>Continue with Google</span>
            </button>

            <button
              type="button"
              className="w-full border border-gray-300 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
            >
              <span className="text-gray-900">🍎</span>
              <span>Continue with Apple</span>
            </button>
          </div>

          {/* Footer Links */}
          <div className="mt-8 text-center space-y-2">
            <div className="space-x-1">
              <a href="#" className="text-purple-600 hover:underline">Forgot password?</a>
              <span className="text-gray-400">•</span>
              <a href="#" className="text-purple-600 hover:underline">Forgot username?</a>
            </div>
            <div>
              <span className="text-gray-500">Don't have an account? </span>
              <a href="#" className="text-purple-600 hover:underline">Sign up</a>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Map Animation */}
      <div className="w-1/2 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 relative overflow-hidden">
        {/* Indonesia Map Container */}
        <div className={`absolute inset-0 transition-all duration-3000 ease-in-out ${
          animationPhase === 'initial' ? 'scale-100' : 
          animationPhase === 'zooming' ? 'scale-300 translate-x-32 translate-y-24' :
          'scale-500 translate-x-48 translate-y-32'
        }`}>
          {/* Simplified Indonesia Map */}
          <svg 
            viewBox="0 0 400 200" 
            className="w-full h-full opacity-90"
            style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}
          >
            {/* Sumatra */}
            <path d="M20 40 Q30 35 35 45 Q40 60 35 80 Q30 90 25 85 Q15 75 20 40" fill="#2d5016" className="transition-colors duration-1000" />
            
            {/* Kalimantan */}
            <path d="M80 30 Q120 25 140 40 Q145 60 135 80 Q120 90 100 85 Q75 70 80 30" fill="#2d5016" className="transition-colors duration-1000" />
            
            {/* Sulawesi */}
            <path d="M180 35 Q190 30 200 40 Q195 50 185 55 Q190 65 185 75 Q175 70 180 35" fill="#2d5016" className="transition-colors duration-1000" />
            
            {/* Papua */}
            <path d="M250 50 Q300 45 330 60 Q340 70 335 85 Q300 90 270 80 Q245 65 250 50" fill="#2d5016" className="transition-colors duration-1000" />
            
            {/* Java (highlighted) */}
            <path 
              d="M60 90 Q120 85 160 95 Q170 100 165 110 Q120 115 80 110 Q55 105 60 90" 
              fill={animationPhase === 'final' ? "#4ade80" : "#2d5016"}
              className="transition-all duration-1000"
              style={{ filter: animationPhase === 'final' ? 'drop-shadow(0 0 10px #4ade80)' : 'none' }}
            />
            
            {/* Bali */}
            <path d="M170 105 Q175 100 180 105 Q175 110 170 105" fill="#2d5016" />
          </svg>
        </div>

        {/* Floating Elements */}
        {showFloatingElements && (
          <div className="absolute inset-0">
            {floatingElements.map((element) => (
              <div
                key={element.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-bounce"
                style={{
                  left: `${element.x}%`,
                  top: `${element.y}%`,
                  animationDelay: `${element.delay}s`,
                  animationDuration: '2s'
                }}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg hover:scale-110 transition-transform cursor-pointer">
                  <div className="text-2xl mb-1">{element.icon}</div>
                  <div className="text-xs font-semibold text-gray-700">{element.label}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Social Media Icons */}
        <div className="absolute top-6 right-6 space-y-4">
          <div className="bg-orange-500 p-3 rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <span className="text-orange-500 font-bold text-sm">f</span>
            </div>
          </div>
          <div className="bg-red-500 p-3 rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer">
            <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
              <span className="text-red-500 font-bold text-sm">▶</span>
            </div>
          </div>
          <div className="bg-green-500 p-3 rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <span className="text-green-500 font-bold text-sm">♪</span>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-400 rounded-full transform translate-x-32 translate-y-32 opacity-80"></div>
        <div className="absolute bottom-20 right-20 bg-white/20 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white rounded-xl overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                <span className="text-2xl">🧴</span>
              </div>
            </div>
            <div>
              <div className="text-white font-bold text-lg">$36</div>
              <div className="text-white/80 text-sm">Premium Product</div>
            </div>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                              radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;