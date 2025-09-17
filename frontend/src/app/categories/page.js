'use client';

import { useState } from "react";
import { Header } from "@/components/ui/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Grid3X3, Smartphone, Headphones, Watch, Camera, Gamepad2, Laptop, Home, Shirt, Book } from "lucide-react"

const categories = [
  {
    id: 1,
    name: "Electronics",
    description: "Latest gadgets and tech accessories",
    icon: Smartphone,
    itemCount: 245,
    color: "bg-blue-500",
    tags: ['tech', 'electronics']
  },
  {
    id: 2,
    name: "Audio & Headphones",
    description: "Premium sound equipment",
    icon: Headphones,
    itemCount: 89,
    color: "bg-purple-500",
    tags: ['tech', 'electronics', 'audio']
  },
  {
    id: 3,
    name: "Wearables",
    description: "Smart watches and fitness trackers",
    icon: Watch,
    itemCount: 67,
    color: "bg-green-500",
    tags: ['tech', 'electronics', 'fashion']
  },
  {
    id: 4,
    name: "Photography",
    description: "Cameras and photography gear",
    icon: Camera,
    itemCount: 134,
    color: "bg-orange-500",
    tags: ['tech', 'electronics']
  },
  {
    id: 5,
    name: "Gaming",
    description: "Gaming accessories and peripherals",
    icon: Gamepad2,
    itemCount: 156,
    color: "bg-red-500",
    tags: ['tech', 'electronics']
  },
  {
    id: 6,
    name: "Computers",
    description: "Laptops, desktops and accessories",
    icon: Laptop,
    itemCount: 198,
    color: "bg-indigo-500",
    tags: ['tech', 'electronics']
  },
  {
    id: 7,
    name: "Home & Living",
    description: "Smart home and lifestyle products",
    icon: Home,
    itemCount: 312,
    color: "bg-teal-500",
    tags: ['lifestyle', 'home']
  },
  {
    id: 8,
    name: "Fashion",
    description: "Clothing and accessories",
    icon: Shirt,
    itemCount: 423,
    color: "bg-pink-500",
    tags: ['lifestyle', 'fashion']
  },
  {
    id: 9,
    name: "Books & Media",
    description: "Books, magazines and digital content",
    icon: Book,
    itemCount: 278,
    color: "bg-yellow-500",
    tags: ['lifestyle', 'media']
  },
]


const filterTags = [`All`, 'Tech', 'Lifestyle', 'Fashion', 'Home'];

export default function CategoriesPage() {
  const [selectedTag, setSelectedTag] = useState('All');

  const filteredCategories = categories.filter(category => {
    if (selectedTag === 'All') return true;
    return category.tags.includes(selectedTag.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Shop by Category</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our wide range of products organized by category. Find exactly what you&apos;re looking for.
          </p>
        </div>

        <div className="flex justify-center mb-8 space-x-2">
            {filterTags.map(tag => (
                <Button key={tag} variant={selectedTag === tag ? 'default' : 'outline'} onClick={() => setSelectedTag(tag)}>
                    {tag}
                </Button>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => {
            const IconComponent = category.icon
            return (
              <Card
                key={category.id}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/20"
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {category.name}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Badge variant="secondary" className="mb-4">
                    {category.itemCount} items
                  </Badge>
                  <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Browse Category
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-card rounded-lg p-8 border">
            <Grid3X3 className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-4">Can&apos;t find what you&apos;re looking for?</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Use our advanced search or contact our support team for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline">Advanced Search</Button>
              <Button>Contact Support</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}