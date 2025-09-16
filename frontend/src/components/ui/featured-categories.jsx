import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    name: "Electronics",
    image: "/modern-electronics.png",
    itemCount: 245,
  },
  {
    name: "Fashion",
    image: "/fashion-clothing-accessories.png",
    itemCount: 189,
  },
  {
    name: "Home & Garden",
    image: "/home-garden-furniture-decor.jpg",
    itemCount: 156,
  },
  {
    name: "Sports & Fitness",
    image: "/sports-fitness-equipment.png",
    itemCount: 98,
  },
]

export function FeaturedCategories() {
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-foreground mb-4">Shop by Category</h3>
          <p className="text-muted-foreground text-lg">Explore our diverse product categories</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card key={category.name} className="group hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 text-center">
                  <h4 className="font-semibold text-xl mb-2 text-card-foreground">{category.name}</h4>
                  <p className="text-muted-foreground">{category.itemCount} items</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
