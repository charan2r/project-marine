"use client"

import { useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, MapPin, Users, Calendar, TreePine, Target } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Coral Reef Restoration Initiative",
    location: "Great Barrier Reef, Australia",
    description: "A comprehensive program to restore damaged coral ecosystems through innovative transplantation techniques and community engagement.",
    image: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=600&h=400&fit=crop",
    progress: 68,
    goal: 150000,
    raised: 102000,
    volunteers: 245,
    status: "Active",
    category: "Restoration",
    startDate: "2023-06-01",
    endDate: "2025-06-01",
  },
  {
    id: 2,
    title: "Sea Turtle Nesting Protection",
    location: "Costa Rica",
    description: "Protecting critical nesting sites for endangered sea turtle species through beach patrols, nest monitoring, and community education.",
    image: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=600&h=400&fit=crop",
    progress: 82,
    goal: 75000,
    raised: 61500,
    volunteers: 128,
    status: "Active",
    category: "Protection",
    startDate: "2023-03-01",
    endDate: "2024-12-31",
  },
  {
    id: 3,
    title: "Mangrove Reforestation Project",
    location: "Indonesia",
    description: "Large-scale mangrove planting initiative to restore coastal ecosystems, protect shorelines, and provide habitat for marine species.",
    image: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=600&h=400&fit=crop",
    progress: 45,
    goal: 200000,
    raised: 90000,
    volunteers: 312,
    status: "Active",
    category: "Restoration",
    startDate: "2024-01-01",
    endDate: "2026-12-31",
  },
  {
    id: 4,
    title: "Whale Migration Monitoring",
    location: "Pacific Ocean",
    description: "Tracking and studying whale migration patterns using satellite technology to inform conservation strategies and reduce ship strikes.",
    image: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=600&h=400&fit=crop",
    progress: 55,
    goal: 100000,
    raised: 55000,
    volunteers: 45,
    status: "Active",
    category: "Research",
    startDate: "2023-09-01",
    endDate: "2025-09-01",
  },
  {
    id: 5,
    title: "Plastic Cleanup Caribbean",
    location: "Caribbean Sea",
    description: "Community-driven initiative to remove plastic pollution from beaches and coastal waters across multiple Caribbean islands.",
    image: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=600&h=400&fit=crop",
    progress: 78,
    goal: 50000,
    raised: 39000,
    volunteers: 520,
    status: "Active",
    category: "Cleanup",
    startDate: "2023-04-01",
    endDate: "2024-10-31",
  },
  {
    id: 6,
    title: "Deep Sea Research Expedition",
    location: "Mariana Trench",
    description: "Scientific expedition to document deep sea biodiversity and discover new species in one of the least explored regions on Earth.",
    image: "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=600&h=400&fit=crop",
    progress: 30,
    goal: 500000,
    raised: 150000,
    volunteers: 28,
    status: "Fundraising",
    category: "Research",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
  },
]

const categories = ["All", "Restoration", "Protection", "Research", "Cleanup", "Education"]
const statuses = ["All", "Active", "Fundraising", "Completed", "Planning"]
const locations = ["All", "Australia", "Costa Rica", "Indonesia", "Pacific Ocean", "Caribbean Sea", "Mariana Trench"]

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory
    const matchesStatus = selectedStatus === "All" || project.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const totalRaised = projects.reduce((sum, p) => sum + p.raised, 0)
  const totalVolunteers = projects.reduce((sum, p) => sum + p.volunteers, 0)

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-[#0a1628] py-16 md:py-24">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Conservation Projects
            </h1>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Join us in making a real impact. Support conservation initiatives around the world 
              and help protect our ocean ecosystems for future generations.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-8 bg-card border-b">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary">{projects.length}</div>
                <div className="text-sm text-muted-foreground">Active Projects</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">${(totalRaised / 1000).toFixed(0)}K</div>
                <div className="text-sm text-muted-foreground">Funds Raised</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">{totalVolunteers.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Volunteers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">12</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="relative flex-1 max-w-md w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex flex-wrap gap-3 items-center">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <TreePine className="h-4 w-4" />
              <span>Showing {filteredProjects.length} of {projects.length} projects</span>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <TreePine className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No projects found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <Link key={project.id} href={`/projects/${project.id}`}>
                    <Card className="group h-full overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 flex gap-2">
                          <Badge className="bg-secondary text-secondary-foreground">
                            {project.status}
                          </Badge>
                          <Badge variant="outline" className="bg-background/80">
                            {project.category}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                          {project.title}
                        </CardTitle>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" />
                          {project.location}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="mb-4 line-clamp-2">
                          {project.description}
                        </CardDescription>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Funding Progress</span>
                            <span className="font-medium">{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">
                              ${project.raised.toLocaleString()} of ${project.goal.toLocaleString()}
                            </span>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Users className="h-3.5 w-3.5" />
                              {project.volunteers}
                            </div>
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

        {/* CTA */}
        <section className="py-12 bg-card">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Want to Start a Project?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Have an idea for a conservation initiative? We support communities and organizations 
              in launching impactful marine conservation projects.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">Propose a Project</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
