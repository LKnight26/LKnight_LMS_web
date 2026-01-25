import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import FeaturedCoursesSection from "@/components/FeaturedCoursesSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import CEOSection from "@/components/CEOSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <CategoriesSection />
      <FeaturedCoursesSection />
      <WhyChooseSection />
      <CEOSection />
      <CTASection />
      <Footer />
    </div>
  );
}
