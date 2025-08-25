export function FeatureCard({ icon, title, color, delay }) {
  return (
    <div 
      className={`group bg-gradient-to-br ${color} rounded-2xl p-6 hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-xl animate-fadeIn`}
      style={{ animationDelay: delay }}
    >
      <div className="text-center">
        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-white font-bold text-lg group-hover:text-[#F5F5DC] transition-colors">
          {title}
        </h3>
      </div>
    </div>
  );
}
