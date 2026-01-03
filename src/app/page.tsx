import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { TourismSection } from "@/components/landing/TourismSection";
import { UmkmSection } from "@/components/landing/UmkmSection";
import { GallerySection } from "@/components/landing/GallerySection";
import { StatsSection } from "@/components/landing/StatsSection";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <TourismSection />
      <UmkmSection />
      <GallerySection />
      <StatsSection />
      <Footer />
    </main>
  );
}
