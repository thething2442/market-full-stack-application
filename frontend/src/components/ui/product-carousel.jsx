"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviews: 124,
    image: "/premium-wireless-headphones.png",
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.6,
    reviews: 89,
    image: "/smart-fitness-watch.png",
  },
  {
    id: 3,
    name: "Minimalist Backpack",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.9,
    reviews: 156,
    image: "/minimalist-backpack.png",
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: 149.99,
    originalPrice: 179.99,
    rating: 4.7,
    reviews: 203,
    image: "/bluetooth-speaker.png",
  },
  {
    id: 5,
    name: "Ergonomic Office Chair",
    price: 449.99,
    originalPrice: 599.99,
    rating: 4.5,
    reviews: 67,
    image: "/ergonomic-office-chair.png",
  },
]

export function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 3
  const maxIndex = Math.max(0, products.length - itemsPerView)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-foreground mb-4">Featured Products</h3>
          <p className="text-muted-foreground text-lg">Discover our most popular items</p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out gap-6"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {products.map((product) => (
                <div key={product.id} className="flex-shrink-0 w-1/3">
                  <Card className="group hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.originalPrice > product.price && (
                          <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground px-2 py-1 rounded text-sm font-medium">
                            Sale
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h4 className="font-semibold text-lg mb-2 text-card-foreground">{product.name}</h4>
                        <div className="flex items-center mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground ml-2">
                            {product.rating} ({product.reviews} reviews)
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-primary">${product.price}</span>
                            {product.originalPrice > product.price && (
                              <span className="text-sm text-muted-foreground line-through">
                                ${product.originalPrice}
                              </span>
                            )}
                          </div>
                          <Button size="sm">Add to Cart</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-card hover:bg-primary hover:text-primary-foreground"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-card hover:bg-primary hover:text-primary-foreground"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? "bg-primary" : "bg-border"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
