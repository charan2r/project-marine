import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { StatsSection } from "@/components/home/stats-section"
import { FeaturesSection } from "@/components/home/features-section"
import { FeaturedSpecies } from "@/components/home/featured-species"
import { ProjectsSection } from "@/components/home/projects-section"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <FeaturedSpecies />
        <ProjectsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
