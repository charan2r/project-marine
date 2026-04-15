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
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Plus,
  MessageSquare,
  Eye,
  ThumbsUp,
  Pin,
  Flame,
  Clock,
  TrendingUp,
  Fish,
  Anchor,
  Camera,
  BookOpen,
  HelpCircle,
  Users,
} from "lucide-react";

const categories = [
  { id: "all", name: "All Topics", icon: MessageSquare, count: 1234 },
  { id: "species", name: "Species Discussion", icon: Fish, count: 456 },
  { id: "conservation", name: "Conservation", icon: Anchor, count: 234 },
  { id: "photography", name: "Photography", icon: Camera, count: 189 },
  { id: "research", name: "Research", icon: BookOpen, count: 167 },
  { id: "help", name: "Help & Support", icon: HelpCircle, count: 123 },
  { id: "community", name: "Community", icon: Users, count: 65 },
];

const discussions = [
  {
    id: 1,
    title:
      "Has anyone spotted the rare Blue-ringed Octopus in the Great Barrier Reef recently?",
    category: "species",
    author: {
      name: "Marina Chen",
      avatar: "/avatars/marina.jpg",
      initials: "MC",
    },
    replies: 47,
    views: 1234,
    likes: 89,
    lastActivity: "2 hours ago",
    isPinned: true,
    isHot: true,
    tags: ["octopus", "great-barrier-reef", "sighting"],
  },
  {
    id: 2,
    title: "Best practices for underwater photography with natural lighting",
    category: "photography",
    author: { name: "Alex Reef", avatar: "/avatars/alex.jpg", initials: "AR" },
    replies: 32,
    views: 892,
    likes: 67,
    lastActivity: "5 hours ago",
    isPinned: false,
    isHot: true,
    tags: ["photography", "tips", "lighting"],
  },
  {
    id: 3,
    title: "New research paper on coral bleaching - discussion thread",
    category: "research",
    author: {
      name: "Dr. Sarah Waters",
      avatar: "/avatars/sarah.jpg",
      initials: "SW",
    },
    replies: 28,
    views: 567,
    likes: 45,
    lastActivity: "1 day ago",
    isPinned: true,
    isHot: false,
    tags: ["coral", "research", "climate-change"],
  },
  {
    id: 4,
    title: "How to properly identify juvenile sea turtles?",
    category: "help",
    author: { name: "Tom Diver", avatar: "/avatars/tom.jpg", initials: "TD" },
    replies: 19,
    views: 345,
    likes: 23,
    lastActivity: "2 days ago",
    isPinned: false,
    isHot: false,
    tags: ["sea-turtles", "identification", "beginner"],
  },
  {
    id: 5,
    title: "Volunteer opportunities at the Mediterranean Marine Sanctuary",
    category: "conservation",
    author: {
      name: "Elena Costa",
      avatar: "/avatars/elena.jpg",
      initials: "EC",
    },
    replies: 56,
    views: 1023,
    likes: 112,
    lastActivity: "3 days ago",
    isPinned: false,
    isHot: true,
    tags: ["volunteer", "mediterranean", "sanctuary"],
  },
  {
    id: 6,
    title: "Weekly species spotlight: The magnificent Manta Ray",
    category: "species",
    author: {
      name: "OceanWatch Team",
      avatar: "/avatars/team.jpg",
      initials: "OW",
    },
    replies: 73,
    views: 2341,
    likes: 234,
    lastActivity: "4 days ago",
    isPinned: true,
    isHot: false,
    tags: ["manta-ray", "spotlight", "education"],
  },
  {
    id: 7,
    title: "Community meetup in San Diego - Marine biology enthusiasts",
    category: "community",
    author: { name: "Jake Shore", avatar: "/avatars/jake.jpg", initials: "JS" },
    replies: 34,
    views: 456,
    likes: 45,
    lastActivity: "5 days ago",
    isPinned: false,
    isHot: false,
    tags: ["meetup", "san-diego", "networking"],
  },
  {
    id: 8,
    title: "AI species recognition giving wrong results - help needed",
    category: "help",
    author: { name: "New Diver", avatar: "/avatars/new.jpg", initials: "ND" },
    replies: 12,
    views: 189,
    likes: 8,
    lastActivity: "6 days ago",
    isPinned: false,
    isHot: false,
    tags: ["ai", "help", "troubleshooting"],
  },
];

const topContributors = [
  {
    name: "Dr. Sarah Waters",
    posts: 234,
    avatar: "/avatars/sarah.jpg",
    initials: "SW",
    badge: "Expert",
  },
  {
    name: "Marina Chen",
    posts: 189,
    avatar: "/avatars/marina.jpg",
    initials: "MC",
    badge: "Top Contributor",
  },
  {
    name: "Alex Reef",
    posts: 156,
    avatar: "/avatars/alex.jpg",
    initials: "AR",
    badge: "Photographer",
  },
  {
    name: "Elena Costa",
    posts: 134,
    avatar: "/avatars/elena.jpg",
    initials: "EC",
    badge: "Conservationist",
  },
  {
    name: "Tom Diver",
    posts: 98,
    avatar: "/avatars/tom.jpg",
    initials: "TD",
    badge: "Rising Star",
  },
];

export default function ForumPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  const filteredDiscussions = discussions.filter((discussion) => {
    const matchesCategory =
      selectedCategory === "all" || discussion.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    return matchesCategory && matchesSearch;
  });

  const sortedDiscussions = [...filteredDiscussions].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;

    if (sortBy === "popular") return b.likes - a.likes;
    if (sortBy === "most-replies") return b.replies - a.replies;
    if (sortBy === "most-viewed") return b.views - a.views;
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-primary/5 border-b">
          <div className="w-full mx-auto px-4 py-12">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Community Forum
              </h1>
              <p className="mt-3 text-lg text-muted-foreground">
                Connect with marine enthusiasts, share discoveries, ask
                questions, and learn from experts worldwide.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search discussions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button asChild>
                <Link href="/forum/new">
                  <Plus className="mr-2 h-4 w-4" />
                  New Discussion
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="w-full mx-auto px-4 py-8">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Sidebar */}
            <aside className="lg:w-64 shrink-0">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                          selectedCategory === category.id
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted text-foreground"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          {category.name}
                        </span>
                        <span
                          className={`text-xs ${
                            selectedCategory === category.id
                              ? "text-primary-foreground/80"
                              : "text-muted-foreground"
                          }`}
                        >
                          {category.count}
                        </span>
                      </button>
                    );
                  })}
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Top Contributors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topContributors.map((contributor, index) => (
                    <div
                      key={contributor.name}
                      className="flex items-center gap-3"
                    >
                      <span className="text-sm font-medium text-muted-foreground w-4">
                        {index + 1}
                      </span>
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={contributor.avatar}
                          alt={contributor.name}
                        />
                        <AvatarFallback className="text-xs">
                          {contributor.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {contributor.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {contributor.posts} posts
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </aside>

            {/* Discussions List */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <Tabs defaultValue="all" className="w-auto">
                  <TabsList>
                    <TabsTrigger
                      value="all"
                      className="flex items-center gap-1"
                    >
                      <Clock className="h-3.5 w-3.5" />
                      All
                    </TabsTrigger>
                    <TabsTrigger
                      value="trending"
                      className="flex items-center gap-1"
                    >
                      <TrendingUp className="h-3.5 w-3.5" />
                      Trending
                    </TabsTrigger>
                    <TabsTrigger
                      value="hot"
                      className="flex items-center gap-1"
                    >
                      <Flame className="h-3.5 w-3.5" />
                      Hot
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="most-replies">Most Replies</SelectItem>
                    <SelectItem value="most-viewed">Most Viewed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {sortedDiscussions.map((discussion) => (
                  <Card
                    key={discussion.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-5">
                      <div className="flex gap-4">
                        <Avatar className="h-10 w-10 shrink-0">
                          <AvatarImage
                            src={discussion.author.avatar}
                            alt={discussion.author.name}
                          />
                          <AvatarFallback>
                            {discussion.author.initials}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-2 flex-wrap">
                            {discussion.isPinned && (
                              <Badge
                                variant="secondary"
                                className="shrink-0 bg-primary/10 text-primary"
                              >
                                <Pin className="h-3 w-3 mr-1" />
                                Pinned
                              </Badge>
                            )}
                            {discussion.isHot && (
                              <Badge
                                variant="secondary"
                                className="shrink-0 bg-destructive/10 text-destructive"
                              >
                                <Flame className="h-3 w-3 mr-1" />
                                Hot
                              </Badge>
                            )}
                          </div>

                          <Link href={`/forum/${discussion.id}`}>
                            <h3 className="text-base font-semibold text-foreground hover:text-primary transition-colors mt-1">
                              {discussion.title}
                            </h3>
                          </Link>

                          <div className="flex items-center gap-2 mt-2 flex-wrap">
                            {discussion.tags.slice(0, 3).map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="text-xs"
                              >
                                #{tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                            <span>{discussion.author.name}</span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="h-3.5 w-3.5" />
                              {discussion.replies}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-3.5 w-3.5" />
                              {discussion.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="h-3.5 w-3.5" />
                              {discussion.likes}
                            </span>
                            <span className="hidden sm:inline">
                              {discussion.lastActivity}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 mt-8">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-primary text-primary-foreground"
                >
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <span className="text-muted-foreground">...</span>
                <Button variant="outline" size="sm">
                  12
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
