import Hero from "@/components/hero"
import ServicesSection from "@/components/services-section"
import AboutPreview from "@/components/about-preview"
import ProjectsGallery from "@/components/projects-gallery"
import Testimonials from "@/components/testimonials"
import StatsSection from "@/components/stats-section"
import CallToAction from "@/components/call-to-action"
import ChatBot from "@/components/chat-bot"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <AboutPreview />
      <ServicesSection />
      <ProjectsGallery />
      <StatsSection />
      <Testimonials />
      <CallToAction />
      <ChatBot />
    </main>
  )
}

