"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Scan, ArrowRight, Waves } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0a1628]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="wave-pattern"
              x="0"
              y="0"
              width="100"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 10 Q25 0 50 10 T100 10"
                stroke="currentColor"
                fill="none"
                strokeWidth="0.5"
                className="text-primary"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wave-pattern)" />
        </svg>
      </div>

      {/* Content */}
      <div className="w-full mx-auto relative z-10 px-4 md:px-6 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary-foreground">
            <Waves className="h-4 w-4" />
            <span>Protecting Marine Biodiversity</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl text-balance">
            Discover and Protect{" "}
            <span className="text-secondary">Our Oceans</span>
          </h1>

          <p className="mt-6 text-lg text-gray-300 md:text-xl max-w-2xl mx-auto leading-relaxed text-pretty">
            Join our community of marine enthusiasts using AI-powered species
            recognition, citizen science, and conservation projects to safeguard
            ocean ecosystems.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="h-12 px-8 text-base" asChild>
              <Link href="/recognize">
                <Scan className="mr-2 h-5 w-5" />
                Identify Species
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 text-base border-white/20 text-white hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link href="/species">
                Explore Species
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
