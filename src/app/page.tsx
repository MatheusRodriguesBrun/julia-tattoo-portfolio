import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import OrnamentSection from "@/components/sections/OrnamentSection";
import DualitySection from "@/components/sections/DualitySection";
import LocationSection from "@/components/sections/LocationSection";
import FinalCTASection from "@/components/sections/FinalCTASection";

export default function Home() {
  return (
    <main className="w-full flex flex-col bg-background">
      <HeroSection />
      <AboutSection />
      <OrnamentSection />
      <DualitySection />
      <LocationSection />
      <FinalCTASection />
    </main>
  );
}
