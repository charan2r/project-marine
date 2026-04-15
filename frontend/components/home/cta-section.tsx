import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Scan, ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-[#0a1628]">
      <div className="w-full mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance">
            Ready to Explore the Ocean?
          </h2>
          <p className="mt-4 text-lg text-gray-300 text-pretty">
            Start identifying marine species today with our AI-powered
            recognition tool. Upload a photo and discover the wonders of marine
            life.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="h-12 px-8" asChild>
              <Link href="/recognize">
                <Scan className="mr-2 h-5 w-5" />
                Try AI Recognition
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 border-white/20 text-white hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link href="/register">
                Create Free Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
