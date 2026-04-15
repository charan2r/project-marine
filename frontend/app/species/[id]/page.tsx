import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Ruler,
  Weight,
  Calendar,
  Eye,
  Heart,
  Share2,
} from "lucide-react";

// Mock data - in a real app this would come from a database
const speciesData: Record<
  string,
  {
    id: number;
    name: string;
    scientificName: string;
    status: string;
    habitat: string;
    category: string;
    image: string;
    gallery: string[];
    description: string;
    size: string;
    weight: string;
    lifespan: string;
    diet: string;
    distribution: string;
    threats: string[];
    conservation: string[];
    funFacts: string[];
    observations: number;
  }
> = {
  "1": {
    id: 1,
    name: "Blue Whale",
    scientificName: "Balaenoptera musculus",
    status: "Endangered",
    habitat: "Open Ocean",
    category: "Mammals",
    image:
      "https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1607153333879-c174d265f1d2?w=400&h=300&fit=crop",
    ],
    description:
      "The blue whale is the largest animal known to have ever existed on Earth. These magnificent marine mammals rule the oceans at up to 100 feet long and upwards of 200 tons. Their tongues alone can weigh as much as an elephant, and their hearts as much as an automobile.",
    size: "Up to 100 feet (30 meters)",
    weight: "Up to 200 tons (181 metric tons)",
    lifespan: "80-90 years",
    diet: "Krill (small shrimp-like crustaceans)",
    distribution: "Found in all oceans except the Arctic",
    threats: [
      "Ship strikes",
      "Entanglement in fishing gear",
      "Ocean noise pollution",
      "Climate change affecting krill populations",
    ],
    conservation: [
      "Protected under the Endangered Species Act",
      "International whaling moratorium",
      "Marine protected areas",
      "Ship speed restrictions in critical habitats",
    ],
    funFacts: [
      "A blue whale&apos;s heart is the size of a small car",
      "They can consume up to 6 tons of krill per day",
      "Their calls can be heard over 1,000 miles away",
      "Baby blue whales gain about 200 pounds per day",
    ],
    observations: 1247,
  },
};

const statusColors: Record<string, string> = {
  "Critically Endangered": "bg-destructive text-destructive-foreground",
  Endangered: "bg-orange-500 text-white",
  Vulnerable: "bg-yellow-500 text-black",
  "Near Threatened": "bg-amber-400 text-black",
  "Least Concern": "bg-green-500 text-white",
};

// Default species data for IDs not in our mock database
const defaultSpecies = {
  id: 0,
  name: "Marine Species",
  scientificName: "Species marina",
  status: "Least Concern",
  habitat: "Ocean",
  category: "Fish",
  image:
    "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800&h=600&fit=crop",
  gallery: [
    "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400&h=300&fit=crop",
  ],
  description:
    "This species information is being compiled. Check back soon for detailed information about this fascinating marine creature.",
  size: "Varies",
  weight: "Varies",
  lifespan: "Varies",
  diet: "Varies by species",
  distribution: "Various ocean habitats",
  threats: ["Habitat loss", "Overfishing", "Pollution"],
  conservation: ["Marine protected areas", "Sustainable fishing practices"],
  funFacts: ["Marine biodiversity is essential for healthy ocean ecosystems"],
  observations: 0,
};

export default async function SpeciesDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const species = speciesData[id] || { ...defaultSpecies, id: parseInt(id) };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px]">
          <img
            src={species.image}
            alt={species.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="w-full mx-auto px-4 md:px-6 pb-8">
              <Button
                variant="ghost"
                className="mb-4 text-white hover:text-white hover:bg-white/20"
                asChild
              >
                <Link href="/species">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Species
                </Link>
              </Button>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <Badge
                    className={`mb-2 ${statusColors[species.status] || "bg-muted text-muted-foreground"}`}
                  >
                    {species.status}
                  </Badge>
                  <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                    {species.name}
                  </h1>
                  <p className="text-xl text-gray-300 italic mt-1">
                    {species.scientificName}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="secondary" size="sm">
                    <Heart className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="secondary" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="w-full mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {species.description}
                    </p>
                  </CardContent>
                </Card>

                <Tabs defaultValue="characteristics" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="characteristics">
                      Characteristics
                    </TabsTrigger>
                    <TabsTrigger value="conservation">Conservation</TabsTrigger>
                    <TabsTrigger value="facts">Fun Facts</TabsTrigger>
                  </TabsList>
                  <TabsContent value="characteristics" className="mt-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="grid sm:grid-cols-2 gap-6">
                          <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                              <Ruler className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Size
                              </p>
                              <p className="font-medium">{species.size}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                              <Weight className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Weight
                              </p>
                              <p className="font-medium">{species.weight}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                              <Calendar className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Lifespan
                              </p>
                              <p className="font-medium">{species.lifespan}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                              <MapPin className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Distribution
                              </p>
                              <p className="font-medium">
                                {species.distribution}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 pt-6 border-t">
                          <h4 className="font-medium mb-2">Diet</h4>
                          <p className="text-muted-foreground">
                            {species.diet}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="conservation" className="mt-4">
                    <Card>
                      <CardContent className="pt-6 space-y-6">
                        <div>
                          <h4 className="font-medium mb-3">Threats</h4>
                          <ul className="space-y-2">
                            {species.threats.map((threat, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2 text-muted-foreground"
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
                                {threat}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-3">
                            Conservation Efforts
                          </h4>
                          <ul className="space-y-2">
                            {species.conservation.map((effort, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2 text-muted-foreground"
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                                {effort}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="facts" className="mt-4">
                    <Card>
                      <CardContent className="pt-6">
                        <ul className="space-y-4">
                          {species.funFacts.map((fact, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-sm font-medium flex-shrink-0">
                                {index + 1}
                              </span>
                              <p className="text-muted-foreground">{fact}</p>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                {/* Gallery */}
                <Card>
                  <CardHeader>
                    <CardTitle>Gallery</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      {species.gallery.map((img, index) => (
                        <div
                          key={index}
                          className="aspect-square rounded-lg overflow-hidden"
                        >
                          <img
                            src={img}
                            alt={`${species.name} ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Quick Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Category
                      </span>
                      <Badge variant="outline">{species.category}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Habitat
                      </span>
                      <Badge variant="outline">{species.habitat}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Status
                      </span>
                      <Badge
                        className={
                          statusColors[species.status] ||
                          "bg-muted text-muted-foreground"
                        }
                      >
                        {species.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Observations
                      </span>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          {species.observations.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Contribute</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full" asChild>
                      <Link href="/observations/new">Submit Observation</Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/map?species=${species.id}`}>
                        View on Map
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Related Species</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Explore other species in the {species.category} category.
                    </p>
                    <Button variant="link" className="p-0 h-auto mt-2" asChild>
                      <Link href={`/species?category=${species.category}`}>
                        View all {species.category}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
