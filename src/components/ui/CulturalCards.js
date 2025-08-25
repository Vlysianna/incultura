export function CulturalStatCard({ number, label }) {
  return (
    <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 text-center hover:bg-white/30 transition-all duration-300 hover:scale-105">
      <div className="text-3xl font-bold text-white mb-2">{number}</div>
      <div className="text-blue-100 font-medium text-sm">{label}</div>
    </div>
  );
}

export function CultureShowcaseCard({ title, desc, icon, delay }) {
  return (
    <div 
      className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 hover:bg-white/30 transition-all duration-500 hover:scale-105 animate-slideUp"
      style={{ animationDelay: delay }}
    >
      <div className="text-center space-y-3">
        <div className="text-4xl">{icon}</div>
        <h4 className="font-bold text-white">{title}</h4>
        <p className="text-[#F5F5DC] text-sm">{desc}</p>
      </div>
    </div>
  );
}
