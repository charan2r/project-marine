import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, Fish, Thermometer, Waves, AlertTriangle, Shield, MapPin } from "lucide-react"

const ecosystemsData: Record<string, {
  id: string
  name: string
  description: string
  longDescription: string
  image: string
  speciesCount: number
  temperature: string
  depth: string
  threats: string[]
  status: string
  coverage: string
  keySpecies: Array<{ name: string; image: string; id: number }>
  conservationEfforts: string[]
  locations: string[]
}> = {
  "coral-reefs": {
    id: "coral-reefs",
    name: "Coral Reefs",
    description: "Often called the rainforests of the sea, coral reefs are among the most biodiverse ecosystems on Earth.",
    longDescription: "Coral reefs are underwater ecosystems characterized by reef-building corals. Reefs are formed of colonies of coral polyps held together by calcium carbonate. Most coral reefs are built from stony corals, whose polyps cluster in groups. Coral belongs to the class Anthozoa in the animal phylum Cnidaria, which includes sea anemones and jellyfish. Unlike sea anemones, corals secrete hard carbonate exoskeletons that support and protect the coral. Most reefs grow best in warm, shallow, clear, sunny and agitated water. Often called rainforests of the sea, shallow coral reefs form some of Earth&apos;s most diverse ecosystems. They occupy less than 0.1% of the world&apos;s ocean area, about half the area of France, yet they provide a home for at least 25% of all marine species.",
    image: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=1200&h=600&fit=crop",
    speciesCount: 4000,
    temperature: "23-29°C",
    depth: "0-50m",
    threats: [
      "Ocean acidification reducing coral calcification rates",
      "Rising ocean temperatures causing coral bleaching",
      "Overfishing disrupting ecosystem balance",
      "Coastal development and pollution",
      "Destructive fishing practices",
      "Invasive species",
    ],
    status: "Endangered",
    coverage: "Less than 1% of ocean floor",
    keySpecies: [
      { name: "Clownfish", image: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=200&h=200&fit=crop", id: 4 },
      { name: "Hawksbill Turtle", image: "https://images.unsplash.com/photo-1591025207163-942350e47db2?w=200&h=200&fit=crop", id: 2 },
      { name: "Manta Ray", image: "https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=200&h=200&fit=crop", id: 3 },
    ],
    conservationEfforts: [
      "Marine Protected Areas (MPAs) establishment",
      "Coral restoration and transplantation programs",
      "Sustainable tourism practices",
      "Reducing land-based pollution",
      "Climate change mitigation efforts",
    ],
    locations: ["Great Barrier Reef, Australia", "Coral Triangle, Southeast Asia", "Red Sea", "Caribbean", "Maldives"],
  },
}

const defaultEcosystem = {
  id: "unknown",
  name: "Marine Ecosystem",
  description: "A diverse marine habitat supporting various species.",
  longDescription: "This ecosystem information is being compiled. Marine ecosystems are complex communities of organisms that interact with their physical environment. They range from coastal areas to the deep sea, each supporting unique species adapted to their specific conditions.",
  image: "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=1200&h=600&fit=crop",
  speciesCount: 1000,
  temperature: "Varies",
  depth: "Varies",
  threats: ["Climate change", "Pollution", "Overfishing"],
  status: "Unknown",
  coverage: "Data being collected",
  keySpecies: [],
  conservationEfforts: ["Research and monitoring", "Protected area establishment"],
  locations: ["Various locations worldwide"],
}

const statusColors: Record<string, string> = {
  "Endangered": "bg-orange-500 text-white",
  "Vulnerable": "bg-yellow-500 text-black",
  "Declining": "bg-amber-400 text-black",
  "Threatened": "bg-red-400 text-white",
  "Data Deficient": "bg-gray-500 text-white",
  "Unknown": "bg-gray-500 text-white",
}

export default async function EcosystemDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const ecosystem = ecosystemsData[id] || { ...defaultEcosystem, id }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px]">
          <img
            src={ecosystem.image}
            alt={ecosystem.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="container px-4 md:px-6 pb-8">
              <Button variant="ghost" className="mb-4 text-white hover:text-white hover:bg-white/20" asChild>
                <Link href="/ecosystems">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Ecosystems
                </Link>
              </Button>
              <Badge className={`mb-2 ${statusColors[ecosystem.status]}`}>
                {ecosystem.status}
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {ecosystem.name}
              </h1>
              <p className="text-xl text-gray-300 mt-2 max-w-2xl">{ecosystem.description}</p>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-card border-b">
          <div className="container px-4 md:px-6 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Fish className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Species</p>
                  <p className="font-semibold">{ecosystem.speciesCount.toLocaleString()}+</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Thermometer className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Temperature</p>
                  <p className="font-semibold">{ecosystem.temperature}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Waves className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Depth Range</p>
                  <p className="font-semibold">{ecosystem.depth}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Coverage</p>
                  <p className="font-semibold">{ecosystem.coverage}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>About This Ecosystem</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{ecosystem.longDescription}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                      Threats
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {ecosystem.threats.map((threat, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="h-2 w-2 rounded-full bg-destructive mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{threat}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-green-500" />
                      Conservation Efforts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {ecosystem.conservationEfforts.map((effort, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="h-2 w-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{effort}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {ecosystem.keySpecies.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Key Species</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {ecosystem.keySpecies.map((species) => (
                          <Link 
                            key={species.id} 
                            href={`/species/${species.id}`}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                          >
                            <img
                              src={species.image}
                              alt={species.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <span className="font-medium text-sm">{species.name}</span>
                          </Link>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full mt-4" asChild>
                        <Link href={`/species?habitat=${ecosystem.name}`}>
                          View All Species
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Key Locations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {ecosystem.locations.map((location, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 text-primary" />
                          {location}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-4" asChild>
                      <Link href={`/map?ecosystem=${ecosystem.id}`}>
                        View on Map
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Get Involved</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/projects">
                        Conservation Projects
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/observations/new">
                        Submit Observation
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
  )
}
