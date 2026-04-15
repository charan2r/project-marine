"use client";

import { useState } from "react";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings,
  MapPin,
  Calendar,
  Award,
  Camera,
  Eye,
  Fish,
  MessageSquare,
  Heart,
  Share2,
  ExternalLink,
  CheckCircle,
  Star,
  Trophy,
  Target,
  Waves,
} from "lucide-react";

const userProfile = {
  name: "Marina Chen",
  username: "@marinachen",
  avatar: "/avatars/marina.jpg",
  initials: "MC",
  bio: "Marine biologist and underwater photographer. Passionate about ocean conservation and citizen science. Currently researching coral reef ecosystems in the Indo-Pacific region.",
  location: "Sydney, Australia",
  joined: "March 2021",
  website: "marinachen.com",
  stats: {
    observations: 234,
    species: 156,
    contributions: 89,
    followers: 1234,
    following: 456,
  },
  badges: [
    {
      id: 1,
      name: "Verified Researcher",
      icon: CheckCircle,
      color: "text-primary",
    },
    { id: 2, name: "Top Contributor", icon: Star, color: "text-yellow-500" },
    {
      id: 3,
      name: "Photography Expert",
      icon: Camera,
      color: "text-purple-500",
    },
    {
      id: 4,
      name: "Conservation Champion",
      icon: Award,
      color: "text-green-500",
    },
  ],
  level: {
    current: 12,
    xp: 2340,
    nextLevel: 3000,
    title: "Ocean Guardian",
  },
};

const achievements = [
  {
    id: 1,
    name: "First Observation",
    description: "Submit your first species observation",
    completed: true,
    icon: Eye,
  },
  {
    id: 2,
    name: "Species Expert",
    description: "Correctly identify 50 different species",
    completed: true,
    icon: Fish,
  },
  {
    id: 3,
    name: "Community Builder",
    description: "Help 25 members with identifications",
    completed: true,
    icon: MessageSquare,
  },
  {
    id: 4,
    name: "Rare Find",
    description: "Spot an endangered species",
    completed: true,
    icon: Trophy,
  },
  {
    id: 5,
    name: "Globe Trotter",
    description: "Submit observations from 5 different countries",
    completed: false,
    progress: 3,
    total: 5,
    icon: MapPin,
  },
  {
    id: 6,
    name: "Master Photographer",
    description: "Receive 100 likes on your photos",
    completed: false,
    progress: 78,
    total: 100,
    icon: Camera,
  },
];

const recentObservations = [
  {
    id: 1,
    species: "Blue-ringed Octopus",
    scientificName: "Hapalochlaena maculosa",
    location: "Great Barrier Reef",
    date: "2 days ago",
    image: "/observations/octopus.jpg",
    likes: 45,
    verified: true,
  },
  {
    id: 2,
    species: "Manta Ray",
    scientificName: "Mobula birostris",
    location: "Raja Ampat",
    date: "1 week ago",
    image: "/observations/manta.jpg",
    likes: 89,
    verified: true,
  },
  {
    id: 3,
    species: "Whale Shark",
    scientificName: "Rhincodon typus",
    location: "Ningaloo Reef",
    date: "2 weeks ago",
    image: "/observations/whaleshark.jpg",
    likes: 123,
    verified: true,
  },
  {
    id: 4,
    species: "Leafy Sea Dragon",
    scientificName: "Phycodurus eques",
    location: "Kangaroo Island",
    date: "3 weeks ago",
    image: "/observations/seadragon.jpg",
    likes: 67,
    verified: true,
  },
];

const forumActivity = [
  {
    id: 1,
    type: "post",
    title: "Has anyone spotted the rare Blue-ringed Octopus recently?",
    replies: 47,
    date: "2 hours ago",
  },
  {
    id: 2,
    type: "reply",
    title: "Best diving spots in Raja Ampat for beginners",
    date: "1 day ago",
  },
  {
    id: 3,
    type: "post",
    title: "Tips for photographing fast-moving marine life",
    replies: 23,
    date: "3 days ago",
  },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("observations");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1">
        {/* Profile Header */}
        <section className="bg-primary/5 border-b">
          <div className="w-full mx-auto px-4 py-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              {/* Avatar & Basic Info */}
              <div className="flex flex-col items-center md:items-start gap-4 md:flex-row">
                <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background shadow-lg">
                  <AvatarImage
                    src={userProfile.avatar}
                    alt={userProfile.name}
                  />
                  <AvatarFallback className="text-2xl">
                    {userProfile.initials}
                  </AvatarFallback>
                </Avatar>

                <div className="text-center md:text-left">
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <h1 className="text-2xl font-bold text-foreground">
                      {userProfile.name}
                    </h1>
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary"
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">
                    {userProfile.username}
                  </p>

                  <p className="mt-3 text-sm text-foreground max-w-lg">
                    {userProfile.bio}
                  </p>

                  <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground justify-center md:justify-start flex-wrap">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {userProfile.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Joined {userProfile.joined}
                    </span>
                    <a
                      href={`https://${userProfile.website}`}
                      className="flex items-center gap-1 hover:text-primary"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {userProfile.website}
                    </a>
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-2 mt-4 justify-center md:justify-start flex-wrap">
                    {userProfile.badges.map((badge) => {
                      const Icon = badge.icon;
                      return (
                        <Badge
                          key={badge.id}
                          variant="outline"
                          className="gap-1"
                        >
                          <Icon className={`h-3 w-3 ${badge.color}`} />
                          {badge.name}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 justify-center md:ml-auto">
                <Button>Follow</Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <Link href="/profile/settings">
                    <Settings className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
              <Card className="text-center">
                <CardContent className="py-4">
                  <p className="text-2xl font-bold text-foreground">
                    {userProfile.stats.observations}
                  </p>
                  <p className="text-sm text-muted-foreground">Observations</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="py-4">
                  <p className="text-2xl font-bold text-foreground">
                    {userProfile.stats.species}
                  </p>
                  <p className="text-sm text-muted-foreground">Species</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="py-4">
                  <p className="text-2xl font-bold text-foreground">
                    {userProfile.stats.contributions}
                  </p>
                  <p className="text-sm text-muted-foreground">Contributions</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="py-4">
                  <p className="text-2xl font-bold text-foreground">
                    {userProfile.stats.followers}
                  </p>
                  <p className="text-sm text-muted-foreground">Followers</p>
                </CardContent>
              </Card>
              <Card className="text-center col-span-2 md:col-span-1">
                <CardContent className="py-4">
                  <p className="text-2xl font-bold text-foreground">
                    {userProfile.stats.following}
                  </p>
                  <p className="text-sm text-muted-foreground">Following</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="w-full mx-auto px-4 py-8">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Sidebar */}
            <aside className="lg:w-80 shrink-0 space-y-6">
              {/* Level Progress */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    Level {userProfile.level.current}
                  </CardTitle>
                  <CardDescription>{userProfile.level.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Progress to Level {userProfile.level.current + 1}
                      </span>
                      <span className="font-medium text-foreground">
                        {userProfile.level.xp} / {userProfile.level.nextLevel}{" "}
                        XP
                      </span>
                    </div>
                    <Progress
                      value={
                        (userProfile.level.xp / userProfile.level.nextLevel) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    Achievements
                  </CardTitle>
                  <CardDescription>4 of 6 completed</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {achievements.map((achievement) => {
                    const Icon = achievement.icon;
                    return (
                      <div
                        key={achievement.id}
                        className="flex items-start gap-3"
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                            achievement.completed
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm font-medium ${
                              achievement.completed
                                ? "text-foreground"
                                : "text-muted-foreground"
                            }`}
                          >
                            {achievement.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {achievement.description}
                          </p>
                          {!achievement.completed &&
                            achievement.progress !== undefined && (
                              <div className="mt-2">
                                <Progress
                                  value={
                                    (achievement.progress /
                                      achievement.total!) *
                                    100
                                  }
                                  className="h-1.5"
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                  {achievement.progress} / {achievement.total}
                                </p>
                              </div>
                            )}
                        </div>
                        {achievement.completed && (
                          <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full justify-start">
                  <TabsTrigger
                    value="observations"
                    className="flex items-center gap-1"
                  >
                    <Camera className="h-4 w-4" />
                    Observations
                  </TabsTrigger>
                  <TabsTrigger
                    value="species"
                    className="flex items-center gap-1"
                  >
                    <Fish className="h-4 w-4" />
                    Species List
                  </TabsTrigger>
                  <TabsTrigger
                    value="activity"
                    className="flex items-center gap-1"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Activity
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="observations" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recentObservations.map((observation) => (
                      <Card
                        key={observation.id}
                        className="overflow-hidden group"
                      >
                        <div className="aspect-video bg-muted relative">
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                          <Waves className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 text-muted-foreground/30" />
                          {observation.verified && (
                            <Badge className="absolute top-3 right-3 bg-primary/90">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                          <div className="absolute bottom-3 left-3 right-3">
                            <h3 className="font-semibold text-white">
                              {observation.species}
                            </h3>
                            <p className="text-sm text-white/80 italic">
                              {observation.scientificName}
                            </p>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5" />
                                {observation.location}
                              </span>
                              <span>{observation.date}</span>
                            </div>
                            <span className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Heart className="h-3.5 w-3.5" />
                              {observation.likes}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="mt-6 text-center">
                    <Button variant="outline">Load More Observations</Button>
                  </div>
                </TabsContent>

                <TabsContent value="species" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Species Identified</CardTitle>
                      <CardDescription>
                        A collection of all marine species you have observed and
                        identified
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[
                          "Blue Whale",
                          "Manta Ray",
                          "Whale Shark",
                          "Clownfish",
                          "Sea Turtle",
                          "Octopus",
                          "Jellyfish",
                          "Seahorse",
                        ].map((species) => (
                          <div
                            key={species}
                            className="flex items-center gap-2 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer"
                          >
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <Fish className="h-4 w-4 text-primary" />
                            </div>
                            <span className="text-sm font-medium text-foreground">
                              {species}
                            </span>
                          </div>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full mt-4">
                        View All 156 Species
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="activity" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Forum Activity</CardTitle>
                      <CardDescription>
                        Your recent discussions and contributions
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {forumActivity.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50"
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                              activity.type === "post"
                                ? "bg-primary/10 text-primary"
                                : "bg-secondary/20 text-secondary"
                            }`}
                          >
                            <MessageSquare className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm">
                              <span className="text-muted-foreground">
                                {activity.type === "post"
                                  ? "Posted: "
                                  : "Replied to: "}
                              </span>
                              <Link
                                href={`/forum/${activity.id}`}
                                className="font-medium text-foreground hover:text-primary"
                              >
                                {activity.title}
                              </Link>
                            </p>
                            <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                              <span>{activity.date}</span>
                              {activity.replies && (
                                <span>{activity.replies} replies</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
