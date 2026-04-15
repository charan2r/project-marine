import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Users,
  Calendar,
  Target,
  Heart,
  Share2,
  Clock,
  CheckCircle,
} from "lucide-react";

const projectsData: Record<
  string,
  {
    id: number;
    title: string;
    location: string;
    description: string;
    fullDescription: string;
    image: string;
    gallery: string[];
    progress: number;
    goal: number;
    raised: number;
    volunteers: number;
    status: string;
    category: string;
    startDate: string;
    endDate: string;
    updates: Array<{ date: string; title: string; content: string }>;
    milestones: Array<{ title: string; completed: boolean; date: string }>;
    team: Array<{ name: string; role: string; avatar: string }>;
  }
> = {
  "1": {
    id: 1,
    title: "Coral Reef Restoration Initiative",
    location: "Great Barrier Reef, Australia",
    description:
      "A comprehensive program to restore damaged coral ecosystems through innovative transplantation techniques and community engagement.",
    fullDescription:
      "The Coral Reef Restoration Initiative is a pioneering conservation program focused on rebuilding the Great Barrier Reef&apos;s damaged coral ecosystems. Using cutting-edge coral gardening techniques, we cultivate heat-resistant coral fragments in underwater nurseries before transplanting them to degraded reef areas. Our program combines scientific research with community engagement, training local volunteers and indigenous communities in coral restoration methods. Since launching, we have successfully transplanted over 50,000 coral fragments and established 15 underwater nurseries.",
    image:
      "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=1200&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
    ],
    progress: 68,
    goal: 150000,
    raised: 102000,
    volunteers: 245,
    status: "Active",
    category: "Restoration",
    startDate: "2023-06-01",
    endDate: "2025-06-01",
    updates: [
      {
        date: "2024-03-01",
        title: "10,000 Corals Milestone",
        content:
          "We&apos;re thrilled to announce that we&apos;ve successfully transplanted our 10,000th coral fragment this month!",
      },
      {
        date: "2024-02-15",
        title: "New Nursery Established",
        content:
          "Our team has completed the setup of a new underwater nursery in the northern section of the reef.",
      },
      {
        date: "2024-01-20",
        title: "Community Training Program",
        content:
          "50 new volunteers completed our coral restoration training program this month.",
      },
    ],
    milestones: [
      { title: "Project Launch", completed: true, date: "Jun 2023" },
      { title: "First Nursery Established", completed: true, date: "Aug 2023" },
      { title: "1,000 Corals Transplanted", completed: true, date: "Dec 2023" },
      { title: "Community Program Launch", completed: true, date: "Feb 2024" },
      { title: "50,000 Corals Goal", completed: false, date: "Dec 2024" },
      { title: "Project Completion", completed: false, date: "Jun 2025" },
    ],
    team: [
      {
        name: "Dr. Sarah Mitchell",
        role: "Project Lead",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      },
      {
        name: "James Cook",
        role: "Marine Biologist",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      },
      {
        name: "Emily Wong",
        role: "Community Coordinator",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      },
    ],
  },
};

const defaultProject = {
  id: 0,
  title: "Conservation Project",
  location: "Global",
  description: "A marine conservation initiative.",
  fullDescription:
    "Project details are being compiled. Please check back soon for more information about this conservation initiative.",
  image:
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=600&fit=crop",
  gallery: [],
  progress: 0,
  goal: 100000,
  raised: 0,
  volunteers: 0,
  status: "Planning",
  category: "Conservation",
  startDate: new Date().toISOString().split("T")[0],
  endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
  updates: [],
  milestones: [],
  team: [],
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projectsData[id] || { ...defaultProject, id: parseInt(id) };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[400px]">
          <img
            src={project.image}
            alt={project.title}
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
                <Link href="/projects">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Projects
                </Link>
              </Button>
              <div className="flex gap-2 mb-3">
                <Badge className="bg-secondary text-secondary-foreground">
                  {project.status}
                </Badge>
                <Badge variant="outline" className="text-white border-white/30">
                  {project.category}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl max-w-4xl">
                {project.title}
              </h1>
              <div className="flex items-center gap-2 mt-3 text-gray-300">
                <MapPin className="h-4 w-4" />
                {project.location}
              </div>
            </div>
          </div>
        </section>

        {/* Funding Progress Bar */}
        <section className="bg-card border-b py-6">
          <div className="w-full mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-4 gap-6 items-center">
              <div className="md:col-span-2">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">
                    ${project.raised.toLocaleString()} raised
                  </span>
                  <span className="text-muted-foreground">
                    of ${project.goal.toLocaleString()} goal
                  </span>
                </div>
                <Progress value={project.progress} className="h-3" />
                <p className="text-sm text-muted-foreground mt-2">
                  {project.progress}% funded
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">{project.volunteers}</div>
                  <div className="text-sm text-muted-foreground">
                    Volunteers
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">
                  <Heart className="mr-2 h-4 w-4" />
                  Donate
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
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
                    <CardTitle>About This Project</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.fullDescription}
                    </p>
                  </CardContent>
                </Card>

                <Tabs defaultValue="updates" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="updates">Updates</TabsTrigger>
                    <TabsTrigger value="milestones">Milestones</TabsTrigger>
                    <TabsTrigger value="gallery">Gallery</TabsTrigger>
                  </TabsList>
                  <TabsContent value="updates" className="mt-4">
                    <Card>
                      <CardContent className="pt-6">
                        {project.updates.length > 0 ? (
                          <div className="space-y-6">
                            {project.updates.map((update, index) => (
                              <div
                                key={index}
                                className={
                                  index !== project.updates.length - 1
                                    ? "pb-6 border-b"
                                    : ""
                                }
                              >
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                  <Calendar className="h-4 w-4" />
                                  {new Date(update.date).toLocaleDateString(
                                    "en-US",
                                    {
                                      month: "long",
                                      day: "numeric",
                                      year: "numeric",
                                    },
                                  )}
                                </div>
                                <h4 className="font-semibold mb-2">
                                  {update.title}
                                </h4>
                                <p className="text-muted-foreground">
                                  {update.content}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-center text-muted-foreground py-8">
                            No updates yet.
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="milestones" className="mt-4">
                    <Card>
                      <CardContent className="pt-6">
                        {project.milestones.length > 0 ? (
                          <div className="space-y-4">
                            {project.milestones.map((milestone, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-3"
                              >
                                <div
                                  className={`flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0 ${
                                    milestone.completed
                                      ? "bg-green-100 text-green-600"
                                      : "bg-muted text-muted-foreground"
                                  }`}
                                >
                                  {milestone.completed ? (
                                    <CheckCircle className="h-5 w-5" />
                                  ) : (
                                    <Clock className="h-4 w-4" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p
                                    className={`font-medium ${milestone.completed ? "" : "text-muted-foreground"}`}
                                  >
                                    {milestone.title}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {milestone.date}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-center text-muted-foreground py-8">
                            No milestones defined.
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="gallery" className="mt-4">
                    <Card>
                      <CardContent className="pt-6">
                        {project.gallery.length > 0 ? (
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {project.gallery.map((img, index) => (
                              <div
                                key={index}
                                className="aspect-square rounded-lg overflow-hidden"
                              >
                                <img
                                  src={img}
                                  alt={`${project.title} ${index + 1}`}
                                  className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                                />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-center text-muted-foreground py-8">
                            No gallery images yet.
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Project Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Start Date
                      </span>
                      <span className="font-medium">
                        {new Date(project.startDate).toLocaleDateString(
                          "en-US",
                          { month: "short", year: "numeric" },
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        End Date
                      </span>
                      <span className="font-medium">
                        {new Date(project.endDate).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Duration
                      </span>
                      <span className="font-medium">
                        {Math.ceil(
                          (new Date(project.endDate).getTime() -
                            new Date(project.startDate).getTime()) /
                            (1000 * 60 * 60 * 24 * 30),
                        )}{" "}
                        months
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {project.team.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Project Team</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {project.team.map((member, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <img
                              src={member.avatar}
                              alt={member.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <p className="font-medium text-sm">
                                {member.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {member.role}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Get Involved</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full">
                      <Heart className="mr-2 h-4 w-4" />
                      Donate Now
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Users className="mr-2 h-4 w-4" />
                      Volunteer
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/map?project=${project.id}`}>
                        <MapPin className="mr-2 h-4 w-4" />
                        View Location
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
