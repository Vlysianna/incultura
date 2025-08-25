export function EnhancedFeatureCard({ icon, title, description, reward, gradient, delay }) {
  return (
    <div 
      className={`group bg-white border border-[#D4AF37]/30 rounded-3xl p-8 hover:shadow-xl transition-all duration-500 hover:scale-105 animate-slideUp`}
      style={{ animationDelay: delay }}
    >
      <div className="text-center space-y-4">
        <div className={`w-20 h-20 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center text-4xl mb-6 mx-auto group-hover:rotate-12 transition-transform duration-500`}>
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-[#8B5E3C] group-hover:text-[#D4AF37] transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
        <div className="inline-flex items-center gap-2 bg-[#F5F5DC] text-[#8B5E3C] px-4 py-2 rounded-full font-semibold">
          <span>{reward}</span>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
