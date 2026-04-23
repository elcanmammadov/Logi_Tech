import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ModulesSection from "@/components/ModulesSection";
import FeaturesSection from "@/components/FeaturesSection";
import StatsSection from "@/components/StatsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <ModulesSection />
    <FeaturesSection />
    <StatsSection />
    <CTASection />
    <Footer />
  </div>
);

export default Index;
