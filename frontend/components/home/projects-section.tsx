import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MapPin, Users } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Coral Reef Restoration",
    location: "Great Barrier Reef, Australia",
    description: "Restoring damaged coral ecosystems through innovative transplantation techniques.",
    progress: 68,
    goal: 50000,
    raised: 34000,
    volunteers: 245,
    status: "Active",
    image: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Sea Turtle Nesting Protection",
    location: "Costa Rica",
    description: "Protecting critical nesting sites for endangered sea turtle species.",
    progress: 82,
    goal: 30000,
    raised: 24600,
    volunteers: 128,
    status: "Active",
    image: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Mangrove Reforestation",
    location: "Indonesia",
    description: "Replanting mangrove forests to protect coastlines and marine habitats.",
    progress: 45,
    goal: 75000,
    raised: 33750,
    volunteers: 312,
    status: "Active",
    image: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=600&h=400&fit=crop",
  },
]

export function ProjectsSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
              Conservation Projects
            </h2>
            <p className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
              Make a Real Impact
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <Card className="group h-full overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <Badge className="absolute top-3 right-3 bg-secondary text-secondary-foreground">
                    {project.status}
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {project.location}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {project.description}
                  </CardDescription>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
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
      </div>
    </section>
  )
}
