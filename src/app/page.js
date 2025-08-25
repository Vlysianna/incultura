import Header from "../components/Header";
import {
  HeroSection,
  TransitionSection,
  FeaturesSection,
  CulturalHeritageSection,
  CallToActionSection,
  FooterSection
} from "../components/sections";

export default function Home() {
  return (
    <div className="min-h-screen font-indonesian bg-white">
      
      <Header />

      <main className="relative z-10">
        <HeroSection />
        <TransitionSection />
        <FeaturesSection />
        <CulturalHeritageSection />
        <CallToActionSection />
      </main>

      <FooterSection />
    </div>
  );
}
