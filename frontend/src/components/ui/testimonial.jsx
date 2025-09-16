import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Sarah Johnson",
    rating: 5,
    comment: "Amazing quality products and fast shipping. I've been a customer for over a year now!",
    avatar: "/professional-woman-avatar.png",
  },
  {
    name: "Mike Chen",
    rating: 5,
    comment: "Great customer service and competitive prices. Highly recommend this store.",
    avatar: "/professional-man-avatar.png",
  },
  {
    name: "Emily Davis",
    rating: 4,
    comment: "Love the variety of products available. Easy to find exactly what I need.",
    avatar: "/young-woman-avatar.png",
  },
]

export function Testimonials() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-foreground mb-4">What Our Customers Say</h3>
          <p className="text-muted-foreground text-lg">Real reviews from real customers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                />
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.comment}"</p>
                <p className="font-semibold text-card-foreground">{testimonial.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
