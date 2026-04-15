"use client";

import { useState } from "react";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Calendar, Clock, User, BookOpen } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "The Future of Coral Reef Conservation",
    excerpt:
      "Exploring innovative techniques and technologies being used to restore and protect coral reef ecosystems around the world.",
    image:
      "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=600&h=400&fit=crop",
    author: "Dr. Maria Santos",
    date: "2024-03-15",
    readTime: "8 min read",
    category: "Conservation",
    tags: ["Coral Reefs", "Climate Change", "Restoration"],
    featured: true,
  },
  {
    id: 2,
    title: "Understanding Marine Migration Patterns",
    excerpt:
      "How satellite tracking is revolutionizing our understanding of whale, turtle, and shark migration across oceans.",
    image:
      "https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=600&h=400&fit=crop",
    author: "James Wilson",
    date: "2024-03-12",
    readTime: "6 min read",
    category: "Research",
    tags: ["Migration", "Technology", "Whales"],
    featured: true,
  },
  {
    id: 3,
    title: "Plastic Pollution: A Deep Dive",
    excerpt:
      "Examining the impact of plastic pollution on marine ecosystems and the solutions being developed to address this crisis.",
    image:
      "https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=600&h=400&fit=crop",
    author: "Sarah Chen",
    date: "2024-03-10",
    readTime: "10 min read",
    category: "Environment",
    tags: ["Pollution", "Plastic", "Solutions"],
    featured: false,
  },
  {
    id: 4,
    title: "The Role of Mangroves in Climate Mitigation",
    excerpt:
      "Discover how mangrove forests are becoming crucial allies in the fight against climate change.",
    image:
      "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=600&h=400&fit=crop",
    author: "Dr. Ahmed Hassan",
    date: "2024-03-08",
    readTime: "7 min read",
    category: "Climate",
    tags: ["Mangroves", "Carbon Sequestration", "Climate"],
    featured: false,
  },
  {
    id: 5,
    title: "Citizen Science: How You Can Help",
    excerpt:
      "Learn about the growing movement of citizen scientists contributing to marine research and conservation efforts.",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop",
    author: "Emily Roberts",
    date: "2024-03-05",
    readTime: "5 min read",
    category: "Community",
    tags: ["Citizen Science", "Volunteering", "Research"],
    featured: false,
  },
  {
    id: 6,
    title: "Deep Sea Discoveries of 2024",
    excerpt:
      "A look at the most fascinating new species and ecosystems discovered in the deep ocean this year.",
    image:
      "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=600&h=400&fit=crop",
    author: "Dr. Lisa Park",
    date: "2024-03-01",
    readTime: "9 min read",
    category: "Discovery",
    tags: ["Deep Sea", "New Species", "Exploration"],
    featured: false,
  },
];

const categories = [
  "All",
  "Conservation",
  "Research",
  "Environment",
  "Climate",
  "Community",
  "Discovery",
];

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const featuredArticles = articles.filter((a) => a.featured);
  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-[#0a1628] py-16 md:py-24">
          <div className="w-full mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Articles & Insights
            </h1>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Dive into the latest research, conservation news, and educational
              content about our ocean world and marine life.
            </p>
          </div>
        </section>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <section className="py-12 border-b">
            <div className="w-full mx-auto px-4 md:px-6">
              <h2 className="text-2xl font-bold mb-6">Featured</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {featuredArticles.map((article) => (
                  <Link key={article.id} href={`/articles/${article.id}`}>
                    <Card className="group h-full overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        />
                        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                          Featured
                        </Badge>
                      </div>
                      <CardHeader>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Badge variant="outline">{article.category}</Badge>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {article.readTime}
                          </span>
                        </div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                          {article.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {article.excerpt}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="h-4 w-4" />
                          <span>{article.author}</span>
                          <span className="mx-1">·</span>
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(article.date).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Filters */}
        <section className="py-8 border-b bg-card">
          <div className="w-full mx-auto px-4 md:px-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative flex-1 max-w-md w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>Showing {filteredArticles.length} articles</span>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-12">
          <div className="w-full mx-auto px-4 md:px-6">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No articles found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search query.
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                  <Link key={article.id} href={`/articles/${article.id}`}>
                    <Card className="group h-full overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Badge variant="outline">{article.category}</Badge>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {article.readTime}
                          </span>
                        </div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                          {article.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="line-clamp-2 mb-4">
                          {article.excerpt}
                        </CardDescription>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="h-4 w-4" />
                          <span>{article.author}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
