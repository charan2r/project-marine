"use client";

import { useState } from "react";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Grid3X3, List, Fish } from "lucide-react";

const allSpecies = [
  {
    id: 1,
    name: "Blue Whale",
    scientificName: "Balaenoptera musculus",
    status: "Endangered",
    habitat: "Open Ocean",
    category: "Mammals",
    image:
      "https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Hawksbill Turtle",
    scientificName: "Eretmochelys imbricata",
    status: "Critically Endangered",
    habitat: "Coral Reefs",
    category: "Reptiles",
    image:
      "https://images.unsplash.com/photo-1591025207163-942350e47db2?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Manta Ray",
    scientificName: "Mobula birostris",
    status: "Vulnerable",
    habitat: "Tropical Waters",
    category: "Fish",
    image:
      "https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Clownfish",
    scientificName: "Amphiprioninae",
    status: "Least Concern",
    habitat: "Coral Reefs",
    category: "Fish",
    image:
      "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    name: "Great White Shark",
    scientificName: "Carcharodon carcharias",
    status: "Vulnerable",
    habitat: "Coastal Waters",
    category: "Fish",
    image:
      "https://images.unsplash.com/photo-1560275619-4662e36fa65c?w=400&h=300&fit=crop",
  },
  {
    id: 6,
    name: "Bottlenose Dolphin",
    scientificName: "Tursiops truncatus",
    status: "Least Concern",
    habitat: "Coastal Waters",
    category: "Mammals",
    image:
      "https://images.unsplash.com/photo-1607153333879-c174d265f1d2?w=400&h=300&fit=crop",
  },
  {
    id: 7,
    name: "Giant Pacific Octopus",
    scientificName: "Enteroctopus dofleini",
    status: "Least Concern",
    habitat: "Deep Sea",
    category: "Invertebrates",
    image:
      "https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?w=400&h=300&fit=crop",
  },
  {
    id: 8,
    name: "Emperor Penguin",
    scientificName: "Aptenodytes forsteri",
    status: "Near Threatened",
    habitat: "Antarctic Waters",
    category: "Birds",
    image:
      "https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?w=400&h=300&fit=crop",
  },
  {
    id: 9,
    name: "Jellyfish",
    scientificName: "Aurelia aurita",
    status: "Least Concern",
    habitat: "Open Ocean",
    category: "Invertebrates",
    image:
      "https://images.unsplash.com/photo-1460904577954-8fadb262612c?w=400&h=300&fit=crop",
  },
  {
    id: 10,
    name: "Hammerhead Shark",
    scientificName: "Sphyrnidae",
    status: "Endangered",
    habitat: "Coastal Waters",
    category: "Fish",
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
  },
  {
    id: 11,
    name: "Sea Otter",
    scientificName: "Enhydra lutris",
    status: "Endangered",
    habitat: "Coastal Waters",
    category: "Mammals",
    image:
      "https://images.unsplash.com/photo-1579380656108-f98e4724b155?w=400&h=300&fit=crop",
  },
  {
    id: 12,
    name: "Lionfish",
    scientificName: "Pterois volitans",
    status: "Least Concern",
    habitat: "Coral Reefs",
    category: "Fish",
    image:
      "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=400&h=300&fit=crop",
  },
];

const statusColors: Record<string, string> = {
  "Critically Endangered": "bg-destructive text-destructive-foreground",
  Endangered: "bg-orange-500 text-white",
  Vulnerable: "bg-yellow-500 text-black",
  "Near Threatened": "bg-amber-400 text-black",
  "Least Concern": "bg-green-500 text-white",
};

const categories = [
  "All",
  "Fish",
  "Mammals",
  "Reptiles",
  "Birds",
  "Invertebrates",
];
const habitats = [
  "All",
  "Open Ocean",
  "Coral Reefs",
  "Coastal Waters",
  "Deep Sea",
  "Tropical Waters",
  "Antarctic Waters",
];
const statuses = [
  "All",
  "Critically Endangered",
  "Endangered",
  "Vulnerable",
  "Near Threatened",
  "Least Concern",
];

export default function SpeciesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedHabitat, setSelectedHabitat] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredSpecies = allSpecies.filter((species) => {
    const matchesSearch =
      species.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      species.scientificName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || species.category === selectedCategory;
    const matchesHabitat =
      selectedHabitat === "All" || species.habitat === selectedHabitat;
    const matchesStatus =
      selectedStatus === "All" || species.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesHabitat && matchesStatus;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-[#0a1628] py-16 md:py-24">
          <div className="w-full mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Marine Species Database
            </h1>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Explore our comprehensive database of marine life from around the
              world. Learn about different species, their habitats, and
              conservation status.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b bg-card">
          <div className="w-full mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="relative flex-1 max-w-md w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search species by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex flex-wrap gap-3 items-center">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-[140px]">
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

                <Select
                  value={selectedHabitat}
                  onValueChange={setSelectedHabitat}
                >
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Habitat" />
                  </SelectTrigger>
                  <SelectContent>
                    {habitats.map((hab) => (
                      <SelectItem key={hab} value={hab}>
                        {hab}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex items-center border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Fish className="h-4 w-4" />
              <span>
                Showing {filteredSpecies.length} of {allSpecies.length} species
              </span>
            </div>
          </div>
        </section>

        {/* Species Grid/List */}
        <section className="py-12">
          <div className="w-full mx-auto px-4 md:px-6">
            {filteredSpecies.length === 0 ? (
              <div className="text-center py-12">
                <Fish className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No species found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search query.
                </p>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredSpecies.map((species) => (
                  <Link key={species.id} href={`/species/${species.id}`}>
                    <Card className="group overflow-hidden h-full hover:shadow-lg transition-shadow">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={species.image}
                          alt={species.name}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        />
                        <Badge
                          className={`absolute top-3 right-3 ${statusColors[species.status] || "bg-muted text-muted-foreground"}`}
                        >
                          {species.status}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                          {species.name}
                        </h3>
                        <p className="text-sm text-muted-foreground italic">
                          {species.scientificName}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {species.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {species.habitat}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredSpecies.map((species) => (
                  <Link key={species.id} href={`/species/${species.id}`}>
                    <Card className="group hover:shadow-lg transition-shadow">
                      <CardContent className="p-4 flex gap-4">
                        <div className="relative w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={species.image}
                            alt={species.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                {species.name}
                              </h3>
                              <p className="text-sm text-muted-foreground italic">
                                {species.scientificName}
                              </p>
                            </div>
                            <Badge
                              className={`flex-shrink-0 ${statusColors[species.status] || "bg-muted text-muted-foreground"}`}
                            >
                              {species.status}
                            </Badge>
                          </div>
                          <div className="mt-2 flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {species.category}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {species.habitat}
                            </Badge>
                          </div>
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
