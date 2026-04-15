import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scan, Map, BookOpen, Users, ArrowRight } from "lucide-react";

const features = [
  {
    title: "AI Species Recognition",
    description:
      "Upload photos or videos of marine life and let our AI identify the species with detailed information.",
    icon: Scan,
    href: "/recognize",
    color: "bg-secondary/10 text-secondary",
  },
  {
    title: "Interactive GIS Map",
    description:
      "Explore species distribution, conservation areas, and community observations on our interactive map.",
    icon: Map,
    href: "/map",
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Learn & Discover",
    description:
      "Access comprehensive articles, species guides, and ecosystem information from marine experts.",
    icon: BookOpen,
    href: "/articles",
    color: "bg-accent/10 text-accent-foreground",
  },
  {
    title: "Join the Community",
    description:
      "Connect with marine enthusiasts, share observations, and participate in conservation discussions.",
    icon: Users,
    href: "/forum",
    color: "bg-chart-4/10 text-chart-4",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="w-full mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            Platform Features
          </h2>
          <p className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Everything You Need to Explore and Protect
          </p>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-pretty">
            Our platform combines cutting-edge AI technology with citizen
            science to create a comprehensive marine conservation toolkit.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group relative overflow-hidden border-border/50 hover:border-primary/30 transition-colors"
            >
              <CardHeader>
                <div
                  className={`mb-2 flex h-12 w-12 items-center justify-center rounded-lg ${feature.color}`}
                >
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="ghost"
                  className="group/btn p-0 h-auto"
                  asChild
                >
                  <Link href={feature.href}>
                    <span className="text-primary">Learn more</span>
                    <ArrowRight className="ml-2 h-4 w-4 text-primary transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
