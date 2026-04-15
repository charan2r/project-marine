import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const species = [
  {
    id: 1,
    name: "Blue Whale",
    scientificName: "Balaenoptera musculus",
    status: "Endangered",
    habitat: "Open Ocean",
    image:
      "https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Hawksbill Turtle",
    scientificName: "Eretmochelys imbricata",
    status: "Critically Endangered",
    habitat: "Coral Reefs",
    image:
      "https://images.unsplash.com/photo-1591025207163-942350e47db2?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Manta Ray",
    scientificName: "Mobula birostris",
    status: "Vulnerable",
    habitat: "Tropical Waters",
    image:
      "https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Clownfish",
    scientificName: "Amphiprioninae",
    status: "Least Concern",
    habitat: "Coral Reefs",
    image:
      "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400&h=300&fit=crop",
  },
];

const statusColors: Record<string, string> = {
  "Critically Endangered": "bg-destructive text-destructive-foreground",
  Endangered: "bg-orange-500 text-white",
  Vulnerable: "bg-yellow-500 text-black",
  "Least Concern": "bg-green-500 text-white",
};

export function FeaturedSpecies() {
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="w-full mx-auto px-4 md:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
              Featured Species
            </h2>
            <p className="text-3xl font-bold tracking-tight sm:text-4xl">
              Discover Marine Life
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/species">
              View All Species
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {species.map((item) => (
            <Link key={item.id} href={`/species/${item.id}`}>
              <Card className="group overflow-hidden h-full hover:shadow-lg transition-shadow">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <Badge
                    className={`absolute top-3 right-3 ${statusColors[item.status] || "bg-muted text-muted-foreground"}`}
                  >
                    {item.status}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground italic">
                    {item.scientificName}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.habitat}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
