"use client"

import { useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, MapPin, Calendar, User, CheckCircle, Clock, Plus, Grid3X3, Map, Eye } from "lucide-react"

const observations = [
  {
    id: 1,
    species: "Blue Tang",
    scientificName: "Paracanthurus hepatus",
    image: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400&h=300&fit=crop",
    location: "Great Barrier Reef, Australia",
    coordinates: { lat: -18.2871, lng: 147.6992 },
    date: "2024-03-15",
    user: "MarineLover42",
    verified: true,
    aiConfidence: 94,
  },
  {
    id: 2,
    species: "Hawksbill Turtle",
    scientificName: "Eretmochelys imbricata",
    image: "https://images.unsplash.com/photo-1591025207163-942350e47db2?w=400&h=300&fit=crop",
    location: "Maldives",
    coordinates: { lat: 3.2028, lng: 73.2207 },
    date: "2024-03-14",
    user: "TurtleWatcher",
    verified: true,
    aiConfidence: 98,
  },
  {
    id: 3,
    species: "Manta Ray",
    scientificName: "Mobula birostris",
    image: "https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=400&h=300&fit=crop",
    location: "Hawaii, USA",
    coordinates: { lat: 19.8968, lng: -155.5828 },
    date: "2024-03-13",
    user: "OceanExplorer",
    verified: false,
    aiConfidence: 87,
  },
  {
    id: 4,
    species: "Clownfish",
    scientificName: "Amphiprioninae",
    image: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400&h=300&fit=crop",
    location: "Red Sea, Egypt",
    coordinates: { lat: 27.2578, lng: 33.8116 },
    date: "2024-03-12",
    user: "ReefDiver",
    verified: true,
    aiConfidence: 96,
  },
  {
    id: 5,
    species: "Great White Shark",
    scientificName: "Carcharodon carcharias",
    image: "https://images.unsplash.com/photo-1560275619-4662e36fa65c?w=400&h=300&fit=crop",
    location: "South Africa",
    coordinates: { lat: -34.0869, lng: 18.8335 },
    date: "2024-03-11",
    user: "SharkResearcher",
    verified: true,
    aiConfidence: 92,
  },
  {
    id: 6,
    species: "Bottlenose Dolphin",
    scientificName: "Tursiops truncatus",
    image: "https://images.unsplash.com/photo-1607153333879-c174d265f1d2?w=400&h=300&fit=crop",
    location: "Florida, USA",
    coordinates: { lat: 25.7617, lng: -80.1918 },
    date: "2024-03-10",
    user: "DolphinFan",
    verified: false,
    aiConfidence: 89,
  },
  {
    id: 7,
    species: "Jellyfish",
    scientificName: "Aurelia aurita",
    image: "https://images.unsplash.com/photo-1460904577954-8fadb262612c?w=400&h=300&fit=crop",
    location: "Japan",
    coordinates: { lat: 35.6762, lng: 139.6503 },
    date: "2024-03-09",
    user: "JellyObserver",
    verified: true,
    aiConfidence: 95,
  },
  {
    id: 8,
    species: "Sea Otter",
    scientificName: "Enhydra lutris",
    image: "https://images.unsplash.com/photo-1579380656108-f98e4724b155?w=400&h=300&fit=crop",
    location: "California, USA",
    coordinates: { lat: 36.6002, lng: -121.8947 },
    date: "2024-03-08",
    user: "WildlifeWatcher",
    verified: true,
    aiConfidence: 91,
  },
]

const verificationStatus = ["All", "Verified", "Pending"]

export default function ObservationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredObservations = observations.filter((obs) => {
    const matchesSearch = obs.species.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         obs.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         obs.user.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === "All" || 
                         (selectedStatus === "Verified" && obs.verified) ||
                         (selectedStatus === "Pending" && !obs.verified)
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-[#0a1628] py-16 md:py-20">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Citizen Science Observations
            </h1>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Browse observations submitted by our community of marine enthusiasts from around the world. 
              Every observation contributes to marine research and conservation.
            </p>
            <Button size="lg" className="mt-6" asChild>
              <Link href="/observations/new">
                <Plus className="mr-2 h-5 w-5" />
                Submit Observation
              </Link>
            </Button>
          </div>
        </section>

        {/* Stats */}
        <section className="py-6 bg-card border-b">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">245,000+</div>
                <div className="text-sm text-muted-foreground">Total Observations</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">35,000+</div>
                <div className="text-sm text-muted-foreground">Contributors</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">12,500+</div>
                <div className="text-sm text-muted-foreground">Species Recorded</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">180+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-6 border-b">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="relative flex-1 max-w-md w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by species, location, or user..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex flex-wrap gap-3 items-center">
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {verificationStatus.map((status) => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
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
                    <Map className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Eye className="h-4 w-4" />
              <span>Showing {filteredObservations.length} observations</span>
            </div>
          </div>
        </section>

        {/* Observations Grid */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            {filteredObservations.length === 0 ? (
              <div className="text-center py-12">
                <Eye className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No observations found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredObservations.map((obs) => (
                  <Link key={obs.id} href={`/observations/${obs.id}`}>
                    <Card className="group overflow-hidden h-full hover:shadow-lg transition-shadow">
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={obs.image}
                          alt={obs.species}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3">
                          {obs.verified ? (
                            <Badge className="bg-green-500 text-white">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          ) : (
                            <Badge variant="secondary">
                              <Clock className="h-3 w-3 mr-1" />
                              Pending
                            </Badge>
                          )}
                        </div>
                        <div className="absolute bottom-3 right-3">
                          <Badge className="bg-black/60 text-white">
                            {obs.aiConfidence}% AI
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          {obs.species}
                        </h3>
                        <p className="text-sm text-muted-foreground italic">
                          {obs.scientificName}
                        </p>
                        <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            <span className="truncate">{obs.location}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <User className="h-3.5 w-3.5" />
                              <span>{obs.user}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>{new Date(obs.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}

            {/* Load More */}
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg">
                Load More Observations
              </Button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-card">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Contribute to Science</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Your observations help researchers track species distribution, monitor population changes, 
              and identify areas in need of protection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/observations/new">
                  <Plus className="mr-2 h-5 w-5" />
                  Submit Observation
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/recognize">
                  Use AI Recognition
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
