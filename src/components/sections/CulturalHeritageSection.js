import Link from "next/link";
import { CulturalStatCard, CultureShowcaseCard } from "../ui/CulturalCards";

export default function CulturalHeritageSection() {
  return (
    <section className="relative py-24 bg-gradient-to-r from-[#8B5E3C] via-[#3A5FCD] to-[#A0522D]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Content */}
          <div className="space-y-8 text-white animate-slideInLeft">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Kekayaan Budaya yang Tak Ternilai
              </h2>
              <p className="text-xl leading-relaxed text-[#F5F5DC] mb-8">
                Dari Sabang sampai Merauke, Indonesia memiliki ribuan kearifan lokal yang perlu dilestarikan. 
                Mari bersama-sama menjaga warisan leluhur untuk generasi mendatang.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <CulturalStatCard number="17,508" label="Pulau di Indonesia" />
              <CulturalStatCard number="1,340" label="Suku Bangsa" />
              <CulturalStatCard number="718" label="Bahasa Daerah" />
              <CulturalStatCard number="5,000+" label="Warisan Budaya" />
            </div>

            <Link 
              href="/articles" 
              className="inline-flex items-center gap-3 bg-white text-[#8B5E3C] hover:bg-[#F5F5DC] px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
            >
              <span>Jelajahi Sekarang</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </Link>
          </div>
          
          {/* Visual Showcase */}
          <div className="relative animate-slideInRight">
            <div className="grid grid-cols-2 gap-4">
              <CultureShowcaseCard 
                title="Seni Batik" 
                desc="Warisan UNESCO" 
                icon="🎨"
                delay="0s"
              />
              <CultureShowcaseCard 
                title="Wayang Kulit" 
                desc="Seni Pertunjukan" 
                icon="🎭"
                delay="0.2s"
              />
              <CultureShowcaseCard 
                title="Tari Tradisional" 
                desc="Gerak dan Makna" 
                icon="💃"
                delay="0.4s"
              />
              <CultureShowcaseCard 
                title="Musik Gamelan" 
                desc="Harmoni Nusantara" 
                icon="🎵"
                delay="0.6s"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
