import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, AlertTriangle, Fish, Thermometer } from "lucide-react"

const ecosystems = [
  {
    id: "coral-reefs",
    name: "Coral Reefs",
    description: "Often called the rainforests of the sea, coral reefs are among the most biodiverse ecosystems on Earth, supporting about 25% of all marine species.",
    image: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=800&h=500&fit=crop",
    speciesCount: 4000,
    temperature: "23-29°C",
    depth: "0-50m",
    threats: ["Ocean acidification", "Coral bleaching", "Overfishing", "Pollution"],
    status: "Endangered",
    coverage: "Less than 1% of ocean floor",
  },
  {
    id: "mangroves",
    name: "Mangrove Forests",
    description: "Coastal forests that thrive in salty conditions, serving as crucial nurseries for fish and protecting shorelines from erosion and storms.",
    image: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&h=500&fit=crop",
    speciesCount: 1500,
    temperature: "20-35°C",
    depth: "0-5m",
    threats: ["Coastal development", "Aquaculture expansion", "Pollution", "Climate change"],
    status: "Vulnerable",
    coverage: "150,000 km² globally",
  },
  {
    id: "deep-sea",
    name: "Deep Sea",
    description: "The largest habitat on Earth, the deep sea remains largely unexplored and hosts unique creatures adapted to extreme pressure and darkness.",
    image: "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=800&h=500&fit=crop",
    speciesCount: 10000,
    temperature: "1-4°C",
    depth: "200-11,000m",
    threats: ["Deep-sea mining", "Bottom trawling", "Climate change", "Plastic pollution"],
    status: "Data Deficient",
    coverage: "65% of Earth's surface",
  },
  {
    id: "kelp-forests",
    name: "Kelp Forests",
    description: "Underwater forests of giant algae that provide shelter and food for a diverse array of marine life, from invertebrates to marine mammals.",
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&h=500&fit=crop",
    speciesCount: 800,
    temperature: "5-20°C",
    depth: "2-30m",
    threats: ["Overgrazing by urchins", "Ocean warming", "Storm damage", "Pollution"],
    status: "Declining",
    coverage: "25% of world coastlines",
  },
  {
    id: "seagrass-meadows",
    name: "Seagrass Meadows",
    description: "Underwater flowering plants that form dense meadows, sequestering carbon and providing critical habitat for seahorses, turtles, and dugongs.",
    image: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&h=500&fit=crop",
    speciesCount: 1000,
    temperature: "10-30°C",
    depth: "0-40m",
    threats: ["Coastal development", "Water quality decline", "Boat anchoring", "Climate change"],
    status: "Declining",
    coverage: "300,000 km² globally",
  },
  {
    id: "polar-seas",
    name: "Polar Seas",
    description: "Arctic and Antarctic waters that support unique ecosystems adapted to extreme cold, including iconic species like polar bears and penguins.",
    image: "https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?w=800&h=500&fit=crop",
    speciesCount: 5000,
    temperature: "-2 to 4°C",
    depth: "0-5,000m",
    threats: ["Ice loss", "Ocean acidification", "Shipping traffic", "Oil exploration"],
    status: "Threatened",
    coverage: "15% of world oceans",
  },
]

const statusColors: Record<string, string> = {
  "Endangered": "bg-orange-500 text-white",
  "Vulnerable": "bg-yellow-500 text-black",
  "Declining": "bg-amber-400 text-black",
  "Threatened": "bg-red-400 text-white",
  "Data Deficient": "bg-gray-500 text-white",
}

export default function EcosystemsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-[#0a1628] py-16 md:py-24">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Marine Ecosystems
            </h1>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Explore the diverse habitats that make up our ocean world. Learn about the unique 
              characteristics, species, and conservation challenges of each ecosystem.
            </p>
          </div>
        </section>

        {/* Ecosystems Grid */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ecosystems.map((ecosystem) => (
                <Link key={ecosystem.id} href={`/ecosystems/${ecosystem.id}`}>
                  <Card className="group h-full overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={ecosystem.image}
                        alt={ecosystem.name}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                      <Badge 
                        className={`absolute top-3 right-3 ${statusColors[ecosystem.status] || "bg-muted text-muted-foreground"}`}
                      >
                        {ecosystem.status}
                      </Badge>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {ecosystem.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4 line-clamp-2">
                        {ecosystem.description}
                      </CardDescription>
                      
                      <div className="grid grid-cols-3 gap-2 text-sm mb-4">
                        <div className="flex flex-col items-center p-2 bg-muted rounded-lg">
                          <Fish className="h-4 w-4 text-primary mb-1" />
                          <span className="font-medium">{ecosystem.speciesCount.toLocaleString()}</span>
                          <span className="text-xs text-muted-foreground">Species</span>
                        </div>
                        <div className="flex flex-col items-center p-2 bg-muted rounded-lg">
                          <Thermometer className="h-4 w-4 text-primary mb-1" />
                          <span className="font-medium text-xs">{ecosystem.temperature}</span>
                          <span className="text-xs text-muted-foreground">Temp</span>
                        </div>
                        <div className="flex flex-col items-center p-2 bg-muted rounded-lg">
                          <span className="font-medium text-primary mb-1">~</span>
                          <span className="font-medium text-xs">{ecosystem.depth}</span>
                          <span className="text-xs text-muted-foreground">Depth</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-primary">
                        Learn more
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-12 bg-card">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <AlertTriangle className="h-12 w-12 mx-auto text-amber-500 mb-4" />
              <h2 className="text-2xl font-bold mb-4">Why Ecosystems Matter</h2>
              <p className="text-muted-foreground leading-relaxed">
                Marine ecosystems provide essential services including oxygen production, carbon sequestration, 
                coastal protection, and food security for billions of people. Understanding and protecting 
                these habitats is crucial for maintaining ocean health and biodiversity.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
