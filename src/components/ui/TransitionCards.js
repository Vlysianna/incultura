export function TransitionStatCard({ number, label, icon, delay }) {
  return (
    <div 
      className="bg-white border border-[#D4AF37]/20 rounded-2xl p-6 text-center hover:border-[#D4AF37] hover:shadow-lg transition-all duration-500 hover:scale-105 animate-slideUp"
      style={{ animationDelay: delay }}
    >
      <div className="text-4xl mb-3">{icon}</div>
      <div className="text-3xl font-bold text-[#D4AF37] mb-2">{number}</div>
      <div className="text-gray-600 font-medium text-sm">{label}</div>
    </div>
  );
}

export function CulturalElement({ icon, name, delay }) {
  return (
    <div 
      className="bg-white border border-[#D4AF37]/20 rounded-2xl p-4 text-center hover:border-[#D4AF37] hover:shadow-lg transition-all duration-500 hover:scale-105 animate-slideUp"
      style={{ animationDelay: delay }}
    >
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-[#8B5E3C] font-semibold text-sm">{name}</div>
    </div>
  );
}
