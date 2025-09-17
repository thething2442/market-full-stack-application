'use client'
import { Header } from "@/components/ui/header"
import { HeroSection } from "@/components/ui/hero-section"
import { ProductCarousel } from "@/components/ui/product-carousel"
import { FeaturedCategories } from "@/components/ui/featured-categories"
import { Testimonials } from "@/components/ui/testimonial"
import { Footer } from "@/components/ui/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ProductCarousel />
        <FeaturedCategories />

      </main>
      <Footer />
    </div>
  )
}
