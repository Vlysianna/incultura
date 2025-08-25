export function BenefitCard({ icon, title, desc }) {
  return (
    <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 hover:bg-white/30 transition-all duration-300">
      <div className="text-center space-y-3">
        <div className="text-3xl">{icon}</div>
        <h4 className="font-bold text-white">{title}</h4>
        <p className="text-white/90 text-sm">{desc}</p>
      </div>
    </div>
  );
}
