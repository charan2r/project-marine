import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Heart,
  Share2,
  Bookmark,
  MessageSquare,
} from "lucide-react";

const articlesData: Record<
  string,
  {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    author: { name: string; avatar: string; bio: string };
    date: string;
    readTime: string;
    category: string;
    tags: string[];
    relatedSpecies: Array<{ id: number; name: string; image: string }>;
  }
> = {
  "1": {
    id: 1,
    title: "The Future of Coral Reef Conservation",
    excerpt:
      "Exploring innovative techniques and technologies being used to restore and protect coral reef ecosystems around the world.",
    content: `
      <p>Coral reefs, often called the rainforests of the sea, are facing unprecedented challenges. Rising ocean temperatures, acidification, and human activities have put these vital ecosystems under severe stress. However, scientists and conservationists around the world are developing innovative solutions to protect and restore these underwater wonderlands.</p>

      <h2>The Current State of Coral Reefs</h2>
      <p>According to recent studies, we have lost nearly 50% of the world&apos;s coral reefs in the past 30 years. The Great Barrier Reef alone has experienced multiple mass bleaching events, with the most severe occurring in recent years. This alarming trend has spurred urgent action from the scientific community.</p>

      <h2>Innovative Restoration Techniques</h2>
      <p>One of the most promising approaches is coral gardening, where fragments of healthy coral are grown in underwater nurseries before being transplanted to degraded reefs. Organizations like the Coral Restoration Foundation have successfully planted over 100,000 corals using this method.</p>

      <p>Another exciting development is the use of 3D-printed reef structures. These artificial substrates provide a foundation for coral larvae to settle and grow, accelerating the natural recovery process. Researchers are also experimenting with heat-resistant coral strains that can better withstand warming oceans.</p>

      <h2>Technology in Conservation</h2>
      <p>Artificial intelligence and machine learning are revolutionizing how we monitor reef health. Autonomous underwater vehicles equipped with cameras can survey vast areas of reef, while AI algorithms analyze the images to track changes over time. This data helps scientists identify areas most in need of intervention.</p>

      <h2>Community Involvement</h2>
      <p>Perhaps the most crucial element of coral conservation is community engagement. Local communities that depend on reefs for food and income are often the best stewards of these ecosystems. Programs that combine traditional knowledge with modern science have shown remarkable success in protecting reef areas.</p>

      <h2>Looking Forward</h2>
      <p>While the challenges facing coral reefs are immense, the combination of scientific innovation, technological advancement, and community action gives us hope. By supporting conservation efforts and reducing our carbon footprint, we can all play a part in ensuring these magnificent ecosystems survive for future generations.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=1200&h=600&fit=crop",
    author: {
      name: "Dr. Maria Santos",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      bio: "Marine biologist specializing in coral reef ecology and conservation. 15+ years of field research experience.",
    },
    date: "2024-03-15",
    readTime: "8 min read",
    category: "Conservation",
    tags: ["Coral Reefs", "Climate Change", "Restoration", "Technology"],
    relatedSpecies: [
      {
        id: 4,
        name: "Clownfish",
        image:
          "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=200&h=200&fit=crop",
      },
      {
        id: 2,
        name: "Hawksbill Turtle",
        image:
          "https://images.unsplash.com/photo-1591025207163-942350e47db2?w=200&h=200&fit=crop",
      },
    ],
  },
};

const defaultArticle = {
  id: 0,
  title: "Article",
  excerpt: "Article content is being prepared.",
  content:
    "<p>This article content is being prepared. Check back soon for the full article.</p>",
  image:
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=600&fit=crop",
  author: {
    name: "OceanWatch Team",
    avatar: "",
    bio: "The OceanWatch editorial team brings you the latest in marine conservation news and research.",
  },
  date: new Date().toISOString().split("T")[0],
  readTime: "5 min read",
  category: "General",
  tags: ["Marine", "Ocean"],
  relatedSpecies: [],
};

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = articlesData[id] || { ...defaultArticle, id: parseInt(id) };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[400px]">
          <img
            src={article.image}
            alt={article.title}
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
                <Link href="/articles">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Articles
                </Link>
              </Button>
              <Badge className="mb-3">{article.category}</Badge>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl max-w-4xl text-balance">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-4 text-gray-300">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={article.author.avatar} />
                    <AvatarFallback>
                      {article.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span>{article.author.name}</span>
                </div>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(article.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {article.readTime}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="w-full mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Action Bar */}
                <div className="flex items-center gap-2 mb-8 pb-4 border-b">
                  <Button variant="ghost" size="sm">
                    <Heart className="mr-2 h-4 w-4" />
                    Like
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Bookmark className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>

                {/* Article Content */}
                <article
                  className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Tags */}
                <div className="mt-8 pt-8 border-t">
                  <h4 className="text-sm font-medium mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Author Bio */}
                <Card className="mt-8">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={article.author.avatar} />
                        <AvatarFallback className="text-lg">
                          {article.author.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{article.author.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {article.author.bio}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Comments Section */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Comments
                  </h3>
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-center text-muted-foreground py-8">
                        Sign in to join the discussion and share your thoughts.
                      </p>
                      <div className="flex justify-center">
                        <Button asChild>
                          <Link href="/login">Sign In to Comment</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {article.relatedSpecies.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        Related Species
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {article.relatedSpecies.map((species) => (
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
                            <span className="font-medium text-sm">
                              {species.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      More in {article.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/articles?category=${article.category}`}>
                        View All Articles
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Get Involved</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full" asChild>
                      <Link href="/projects">Support Conservation</Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/recognize">Try AI Recognition</Link>
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
