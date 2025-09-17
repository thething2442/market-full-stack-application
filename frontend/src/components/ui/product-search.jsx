"use client";

import { Input } from "@/components/ui/input";
import * as s from "@/components/ui/select";
import { useProductSearch } from "@/hooks/use-product-search";
import { products, categories } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export function ProductSearch() {
  const {
    filteredProducts,
    setSearchTerm,
    setSelectedCategory,
    selectedCategory,
    searchTerm,
  } = useProductSearch(products);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Search Products
          </h3>
          <p className="text-muted-foreground text-lg">
            Find what you're looking for.
          </p>
        </div>

        <div className="flex justify-center mb-8 gap-4">
          <Input
            type="text"
            placeholder="Search by product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <s.Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <s.SelectTrigger className="w-[180px]">
              <s.SelectValue placeholder="Select a category" />
            </s.SelectTrigger>
            <s.SelectContent>
              {categories.map((category) => (
                <s.SelectItem key={category.name} value={category.name}>
                  {category.name}
                </s.SelectItem>
              ))}
            </s.SelectContent>
          </s.Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
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
            ))
          ) : (
            <p className="col-span-full text-center text-muted-foreground">
              No products found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
