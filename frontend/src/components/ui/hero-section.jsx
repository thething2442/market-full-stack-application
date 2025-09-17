"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ShoppingCart, Heart } from "lucide-react"

const heroProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: "$299.99",
    originalPrice: "$399.99",
    image: "/premium-wireless-headphones.png",
    badge: "Best Seller",
    description: "Experience crystal-clear audio with our flagship wireless headphones",
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: "$199.99",
    originalPrice: "$249.99",
    image: "/smart-fitness-watch.png",
    badge: "New Arrival",
    description: "Track your fitness goals with advanced health monitoring",
  },
  {
    id: 3,
    name: "Professional Camera Lens",
    price: "$899.99",
    originalPrice: "$1099.99",
    image: "/professional-camera-lens.jpg",
    badge: "Limited Edition",
    description: "Capture stunning photos with professional-grade optics",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroProducts.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroProducts.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroProducts.length) % heroProducts.length)
  }

  return (
    <section className="bg-gradient-to-br from-secondary to-secondary/80 py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative max-w-6xl mx-auto">
          {/* Carousel Container */}
          <div className="relative h-[500px] rounded-2xl overflow-hidden bg-background shadow-2xl">
            {heroProducts.map((product, index) => (
              <div
                key={product.id}
                className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
                  index === currentSlide
                    ? "translate-x-0"
                    : index < currentSlide
                      ? "-translate-x-full"
                      : "translate-x-full"
                }`}
              >
                <div className="grid md:grid-cols-2 h-full">
                  {/* Product Info */}
                  <div className="flex flex-col justify-center p-8 md:p-12 space-y-6">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium w-fit">
                      {product.badge}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">{product.name}</h1>
                    <p className="text-lg text-muted-foreground text-pretty">{product.description}</p>
                    <div className="flex items-center gap-4">
                      <span className="text-3xl font-bold text-primary">{product.price}</span>
                      <span className="text-lg text-muted-foreground line-through">{product.originalPrice}</span>
                    </div>
                    <div className="flex gap-4">
                      <Button size="lg" className="text-lg px-8">
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Add to Cart
                      </Button>
                      <Button variant="outline" size="lg">
                        <Heart className="w-5 h-5 mr-2" />
                        Wishlist
                      </Button>
                    </div>
                  </div>

                  {/* Product Image */}
                  <div className="relative flex items-center justify-center p-8 bg-gradient-to-br from-secondary/50 to-secondary">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="max-w-full max-h-full object-contain drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background border rounded-full p-3 transition-all duration-200 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background border rounded-full p-3 transition-all duration-200 shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {heroProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide ? "bg-primary scale-125" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
